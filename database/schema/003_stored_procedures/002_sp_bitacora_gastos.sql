USE MoneyFlowSystemDB;
GO

-- INSERTAR
CREATE OR ALTER PROCEDURE mfs.sp_BitacoraGastos_Insertar
    @IdTipoDeGasto INT,
    @Descripcion NVARCHAR(500) = NULL,
    @Debitado BIT,
    @Acreditado BIT,
    @Monto DECIMAL(12,2),
    @Mes TINYINT,
    @Anio SMALLINT,
    @Observaciones NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        IF @IdTipoDeGasto IS NULL
            THROW 50001, 'El IdTipoDeGasto es obligatorio.', 1;

        IF @Monto IS NULL OR @Monto <= 0
            THROW 50002, 'El monto debe ser mayor que cero.', 1;

        IF @Mes IS NULL OR @Mes NOT BETWEEN 1 AND 12
            THROW 50003, 'El mes no es válido.', 1;

        IF @Anio IS NULL OR @Anio NOT BETWEEN 1900 AND 2100
            THROW 50004, 'El año no es válido.', 1;

        IF (@Debitado = 1 AND @Acreditado = 1) OR (@Debitado = 0 AND @Acreditado = 0)
            THROW 50005, 'Debe indicar solo un tipo de movimiento: debitado o acreditado.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM mfs.TipoDeGasto
            WHERE IdTipoDeGasto = @IdTipoDeGasto
        )
            THROW 50006, 'El tipo de gasto no existe.', 1;

        BEGIN TRAN;

            INSERT INTO mfs.BitacoraGastos
            (
                IdTipoDeGasto,
                Descripcion,
                Debitado,
                Acreditado,
                Monto,
                Mes,
                Anio,
                Observaciones
            )
            VALUES
            (
                @IdTipoDeGasto,
                NULLIF(LTRIM(RTRIM(@Descripcion)), ''),
                @Debitado,
                @Acreditado,
                @Monto,
                @Mes,
                @Anio,
                NULLIF(LTRIM(RTRIM(@Observaciones)), '')
            );

            DECLARE @IdBitacoraGastosGenerado INT = CAST(SCOPE_IDENTITY() AS INT);

        COMMIT TRAN;

        SELECT @IdBitacoraGastosGenerado AS IdBitacoraGastosGenerado;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRAN;

        THROW;
    END CATCH
END;
GO

-- ACTUALIZAR
CREATE OR ALTER PROCEDURE mfs.sp_BitacoraGastos_Actualizar
    @IdBitacoraGastos INT,
    @IdTipoDeGasto INT,
    @Descripcion NVARCHAR(500) = NULL,
    @Debitado BIT,
    @Acreditado BIT,
    @Monto DECIMAL(12,2),
    @Mes TINYINT,
    @Anio SMALLINT,
    @Observaciones NVARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        IF @IdBitacoraGastos IS NULL OR @IdBitacoraGastos <= 0
            THROW 50007, 'El IdBitacoraGastos es obligatorio.', 1;

        IF @IdTipoDeGasto IS NULL
            THROW 50008, 'El IdTipoDeGasto es obligatorio.', 1;

        IF @Monto IS NULL OR @Monto <= 0
            THROW 50009, 'El monto debe ser mayor que cero.', 1;

        IF @Mes IS NULL OR @Mes NOT BETWEEN 1 AND 12
            THROW 50010, 'El mes no es válido.', 1;

        IF @Anio IS NULL OR @Anio NOT BETWEEN 1900 AND 2100
            THROW 50011, 'El año no es válido.', 1;

        IF (@Debitado = 1 AND @Acreditado = 1) OR (@Debitado = 0 AND @Acreditado = 0)
            THROW 50012, 'Debe indicar solo un tipo de movimiento: debitado o acreditado.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM mfs.BitacoraGastos
            WHERE IdBitacoraGastos = @IdBitacoraGastos
        )
            THROW 50013, 'La bitácora de gastos no existe.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM mfs.TipoDeGasto
            WHERE IdTipoDeGasto = @IdTipoDeGasto
        )
            THROW 50014, 'El tipo de gasto no existe.', 1;

        BEGIN TRAN;

            UPDATE mfs.BitacoraGastos
            SET
                IdTipoDeGasto = @IdTipoDeGasto,
                Descripcion = NULLIF(LTRIM(RTRIM(@Descripcion)), ''),
                Debitado = @Debitado,
                Acreditado = @Acreditado,
                Monto = @Monto,
                Mes = @Mes,
                Anio = @Anio,
                Actualizado = SYSDATETIME(),
                Observaciones = NULLIF(LTRIM(RTRIM(@Observaciones)), '')
            WHERE IdBitacoraGastos = @IdBitacoraGastos;

        COMMIT TRAN;

        SELECT @IdBitacoraGastos AS IdBitacoraGastosActualizado;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRAN;

        THROW;
    END CATCH
END;
GO

-- ELIMINAR
CREATE OR ALTER PROCEDURE mfs.sp_BitacoraGastos_Eliminar
    @IdBitacoraGastos INT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    BEGIN TRY
        IF @IdBitacoraGastos IS NULL OR @IdBitacoraGastos <= 0
            THROW 50015, 'El IdBitacoraGastos es obligatorio.', 1;

        IF NOT EXISTS (
            SELECT 1
            FROM mfs.BitacoraGastos
            WHERE IdBitacoraGastos = @IdBitacoraGastos
        )
            THROW 50016, 'La bitácora de gastos no existe.', 1;

        BEGIN TRAN;

            DELETE FROM mfs.BitacoraGastos
            WHERE IdBitacoraGastos = @IdBitacoraGastos;

        COMMIT TRAN;

        SELECT @IdBitacoraGastos AS IdBitacoraGastosEliminado;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRAN;

        THROW;
    END CATCH
END;
GO

-- OBTENER POR ID
CREATE OR ALTER PROCEDURE mfs.sp_BitacoraGastos_ObtenerPorId
    @IdBitacoraGastos INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @IdBitacoraGastos IS NULL OR @IdBitacoraGastos <= 0
        THROW 50017, 'El IdBitacoraGastos es obligatorio.', 1;

    SELECT
        bg.IdBitacoraGastos,
        bg.IdTipoDeGasto,
        tg.Nombre AS TipoDeGasto,
        bg.Descripcion,
        bg.Debitado,
        bg.Acreditado,
        bg.Monto,
        bg.Mes,
        bg.Anio,
        bg.Insertado,
        bg.Actualizado,
        bg.Observaciones
    FROM mfs.BitacoraGastos bg
    INNER JOIN mfs.TipoDeGasto tg
        ON bg.IdTipoDeGasto = tg.IdTipoDeGasto
    WHERE bg.IdBitacoraGastos = @IdBitacoraGastos;
END;
GO

-- OBTENER TODOS
CREATE OR ALTER PROCEDURE mfs.sp_BitacoraGastos_Listar
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        bg.IdBitacoraGastos,
        bg.IdTipoDeGasto,
        tg.Nombre AS TipoDeGasto,
        bg.Descripcion,
        bg.Debitado,
        bg.Acreditado,
        bg.Monto,
        bg.Mes,
        bg.Anio,
        bg.Insertado,
        bg.Actualizado,
        bg.Observaciones
    FROM mfs.BitacoraGastos bg
    INNER JOIN mfs.TipoDeGasto tg
        ON bg.IdTipoDeGasto = tg.IdTipoDeGasto
    ORDER BY bg.Anio DESC, bg.Mes DESC, bg.IdBitacoraGastos DESC;
END;
GO

-- LISTAR POR TIPO DE GASTO
CREATE OR ALTER PROCEDURE mfs.sp_BitacoraGastos_ListarPorTipoDeGasto
    @IdTipoDeGasto INT
AS
BEGIN
    SET NOCOUNT ON;

    IF @IdTipoDeGasto IS NULL OR @IdTipoDeGasto <= 0
        THROW 50018, 'El IdTipoDeGasto es obligatorio.', 1;

    IF NOT EXISTS (
        SELECT 1
        FROM mfs.TipoDeGasto
        WHERE IdTipoDeGasto = @IdTipoDeGasto
    )
        THROW 50019, 'El tipo de gasto no existe.', 1;

    SELECT
        bg.IdBitacoraGastos,
        bg.IdTipoDeGasto,
        tg.Nombre AS TipoDeGasto,
        bg.Descripcion,
        bg.Debitado,
        bg.Acreditado,
        bg.Monto,
        bg.Mes,
        bg.Anio,
        bg.Insertado,
        bg.Actualizado,
        bg.Observaciones
    FROM mfs.BitacoraGastos bg
    INNER JOIN mfs.TipoDeGasto tg
        ON bg.IdTipoDeGasto = tg.IdTipoDeGasto
    WHERE bg.IdTipoDeGasto = @IdTipoDeGasto
    ORDER BY bg.Anio DESC, bg.Mes DESC, bg.IdBitacoraGastos DESC;
END;
GO