namespace Features.BitacoraGasto.Models;

public class BitacoraGastoModel
{
    public int IdBitacoraGastos { get; set; }

    public int IdTipoDeGasto { get; set; }

    public string? Descripcion { get; set; }

    public bool Debitado { get; set; }

    public bool Acreditado { get; set; }

    public decimal Monto { get; set; }

    public int Mes { get; set; }

    public int Anio { get; set; }

    public DateTime Insertado { get; set; }

    public DateTime? Actualizado { get; set; }

    public string? Observaciones { get; set; }
}
