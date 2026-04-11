USE MoneyFlowSystemDB;
GO

-- Tabla Libro
CREATE TABLE mfs.BitacoraGastos
(
    IdBitacoraGasots INT IDENTITY(1,1) NOT NULL,
    IdTipoDeGasto    INT NOT NULL,
    ingreso          BIT,
    salida           BIT,
    Descripcion      NVARCHAR(150),
    MontoMaximo      DECIMAL(10,2) NOT NULL,
    CONSTRAINT PK_TipoDeGasto PRIMARY KEY CLUSTERED (IdTipoDeGasto)
    CONSTRAINT FK_TipoDeGasto PRIMARY KEY CLUSTERED (IdTipoDeGasto)
);
GO