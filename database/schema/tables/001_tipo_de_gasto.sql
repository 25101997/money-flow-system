USE MoneyFlowSystemDB;
GO

CREATE TABLE mfs.TipoDeGasto
(
    IdTipoDeGasto   INT IDENTITY(1,1) NOT NULL,
    Nombre          NVARCHAR(200) NOT NULL,
    Descripcion     NVARCHAR(150) NOT NULL,
    MontoMaximo     DECIMAL(7,2) NOT NULL,
    CONSTRAINT PK_TipoDeGasto PRIMARY KEY CLUSTERED (IdTipoDeGasto)
);
GO

SELECT * FROM 

DROP TABLE mfs.TipoDeGasto;