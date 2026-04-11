USE MoneyFlowSystemDB;
GO

CREATE TABLE mfs.TipoDeGasto
(
    IdTipoDeGasto   INT IDENTITY(1,1) NOT NULL,
    Nombre          NVARCHAR(200) NOT NULL,
    Descripcion     NVARCHAR(150) NOT NULL,
    MontoMaximo     INT(5) NOT NULL,
    CONSTRAINT PK_TipoDeGasto PRIMARY KEY CLUSTERED (IdTipoDeGasto)
);
GO