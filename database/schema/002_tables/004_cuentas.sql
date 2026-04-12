USE MoneyFlowSystemDB;
GO

CREATE TABLE mfs.Cuenta
{
    CuentaId INT IDENTITY(1,1) NOT NULL,
    Nombre NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(200) NOT NULL,
    Tipo NVARCHAR(100) NOT NULL,
    Saldo DECIMAL(14,2) NOT NULL
};
GO

CREATE TABLE mfs.BitacoraCuenta
{
    CuentaId INT NOT NULL,
    Debitar BIT,
    Acreditar BIT,
    Cantidad DECIMAL(7,2) NOT NULL,
    FechaInsert DATETIME,
    FechaUpdate DATETIME
};
GO







