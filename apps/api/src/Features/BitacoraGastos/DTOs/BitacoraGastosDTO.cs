namespace Features.BitacoraGastos.DTOs;

public class BitacoraGastosCreateDTO
{
    public int IdTipoDeGasto { get; set; }
    public string? Descripcion { get; set; }
    public bool Debitado { get; set; }
    public bool Acreditado { get; set; }
    public decimal Monto { get; set; }
    public byte Mes { get; set; }
    public short Anio { get; set; }
    public string? Observaciones { get; set; }
}

public class BitacoraGastosUpdateDTO
{
    public int IdBitacoraGastos { get; set; }
    public int IdTipoDeGasto { get; set; }
    public string? Descripcion { get; set; }
    public bool Debitado { get; set; }
    public bool Acreditado { get; set; }
    public decimal Monto { get; set; }
    public byte Mes { get; set; }
    public short Anio { get; set; }
    public string? Observaciones { get; set; }
}

public class BitacoraGastosReadDTO
{
    public int IdBitacoraGastos { get; set; }
    public int IdTipoDeGasto { get; set; }
    public string TipoDeGasto { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public bool Debitado { get; set; }
    public bool Acreditado { get; set; }
    public decimal Monto { get; set; }
    public byte Mes { get; set; }
    public short Anio { get; set; }
    public DateTime Insertado { get; set; }
    public DateTime? Actualizado { get; set; }
    public string? Observaciones { get; set; }
}

public class BitacoraGastosIdResponseDTO
{
    public int Id { get; set; }
    public string Mensaje { get; set; } = string.Empty;
}