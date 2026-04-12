USE MoneyFlowSystemDB;

CREATE TABLE mfs.BitacoraGastos
(
    IdBitacoraGastos INT IDENTITY(1,1) NOT NULL,
    IdTipoDeGasto    INT NOT NULL,
    Descripcion      NVARCHAR(500) NULL,
    Debitado         BIT NOT NULL CONSTRAINT DF_BitacoraGastos_Debitado DEFAULT (0),
    Acreditado       BIT NOT NULL CONSTRAINT DF_BitacoraGastos_Acreditado DEFAULT (0),
    Monto            DECIMAL(12,2) NOT NULL,
    Mes              TINYINT NOT NULL,
    Anio             SMALLINT NOT NULL,
    Insertado        DATETIME2(0) NOT NULL CONSTRAINT DF_BitacoraGastos_Insertado DEFAULT (SYSDATETIME()),
    Actualizado      DATETIME2(0) NULL,
    Observaciones    NVARCHAR(500) NULL,

    CONSTRAINT PK_BitacoraGastos
        PRIMARY KEY CLUSTERED (IdBitacoraGastos),

    CONSTRAINT FK_BitacoraGastos_TipoDeGasto
        FOREIGN KEY (IdTipoDeGasto)
        REFERENCES mfs.TipoDeGasto(IdTipoDeGasto),

    CONSTRAINT CK_BitacoraGastos_Monto
        CHECK (Monto > 0),

    CONSTRAINT CK_BitacoraGastos_Mes
        CHECK (Mes BETWEEN 1 AND 12),

    CONSTRAINT CK_BitacoraGastos_Anio
        CHECK (Anio BETWEEN 1900 AND 9999),

    CONSTRAINT CK_BitacoraGastos_Debitado_Acreditado
        CHECK (
            (Debitado = 1 AND Acreditado = 0)
            OR
            (Debitado = 0 AND Acreditado = 1)
        )
);

CREATE NONCLUSTERED INDEX IX_BitacoraGastos_Anio_Mes_IdTipoDeGasto
ON mfs.BitacoraGastos (Anio, Mes, IdTipoDeGasto)
INCLUDE (Monto, Debitado, Acreditado, Insertado);