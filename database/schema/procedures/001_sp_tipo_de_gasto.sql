USE MoneyFlowSystemDB;
GO

-- Procedimiento para insertar un nuevo TipoDeGasto
CREATE PROCEDURE mfs.spInsertarTipoDeGasto
    @Nombre NVARCHAR(150),
    @Descripcion NVARCHAR(200),
    @MontoMaximo DECIMAL(7,2)
AS
BEGIN
    SET NOCOUNT ON;
    -- Nueva lógica: validación simple
    IF @MontoMaximo <= 0
    BEGIN
        RAISERROR('El monto máximo debe ser mayor a cero.', 16, 1);
        RETURN;
    END

    INSERT INTO mfs.TipoDeGasto (Nombre, Descripcion, MontoMaximo)
    VALUES (@Nombre, @Descripcion, @MontoMaximo);

    SELECT SCOPE_IDENTITY() AS NuevoId;
END;
GO

--ALTER PROCEDURE mfs.spInsertarTipoDeGasto END;

-- Procedimiento para actualizar un TipoDeGasto existente
CREATE PROCEDURE mfs.spActualizarTipoDeGasto
    @IdTipoDeGasto INT,
    @Nombre NVARCHAR(200),
    @Descripcion NVARCHAR(150),
    @MontoMaximo DECIMAL(7,2)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE mfs.TipoDeGasto
    SET Nombre = @Nombre,
        Descripcion = @Descripcion,
        MontoMaximo = @MontoMaximo
    WHERE IdTipoDeGasto = @IdTipoDeGasto;
END;
GO

-- Procedimiento para eliminar un TipoDeGasto
CREATE PROCEDURE mfs.spEliminarTipoDeGasto
    @IdTipoDeGasto INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM mfs.TipoDeGasto
    WHERE IdTipoDeGasto = @IdTipoDeGasto;
END;
GO

-- Procedimiento para consultar todos los TiposDeGasto
CREATE PROCEDURE mfs.spObtenerTiposDeGasto
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdTipoDeGasto, Nombre, Descripcion, MontoMaximo
    FROM mfs.TipoDeGasto;
END;
GO

-- Procedimiento para consultar un TipoDeGasto por Id
CREATE PROCEDURE mfs.spObtenerTipoDeGastoPorId
    @IdTipoDeGasto INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT IdTipoDeGasto, Nombre, Descripcion, MontoMaximo
    FROM mfs.TipoDeGasto
    WHERE IdTipoDeGasto = @IdTipoDeGasto;
END;
GO

-- Consulta con filtros y paginación
CREATE PROCEDURE mfs.spBuscarTiposDeGasto
    @Nombre NVARCHAR(200) = NULL,
    @MontoMaximoMin DECIMAL(18,2) = NULL,
    @MontoMaximoMax DECIMAL(18,2) = NULL,
    @PageNumber INT = 1,
    @PageSize INT = 50
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH Result AS
    (
        SELECT 
            IdTipoDeGasto, Nombre, Descripcion, MontoMaximo,
            ROW_NUMBER() OVER (ORDER BY IdTipoDeGasto) AS RowNum
        FROM mfs.TipoDeGasto
        WHERE (@Nombre IS NULL OR Nombre LIKE '%' + @Nombre + '%')
          AND (@MontoMaximoMin IS NULL OR MontoMaximo >= @MontoMaximoMin)
          AND (@MontoMaximoMax IS NULL OR MontoMaximo <= @MontoMaximoMax)
    )
    SELECT IdTipoDeGasto, Nombre, Descripcion, MontoMaximo
    FROM Result
    WHERE RowNum BETWEEN ((@PageNumber - 1) * @PageSize + 1)
                     AND (@PageNumber * @PageSize);
END;
GO
