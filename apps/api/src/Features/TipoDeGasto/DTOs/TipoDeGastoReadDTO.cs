namespace Features.TipoDeGasto.DTOs;

public class TipoDeGastoReadDTO
{
    public int IdTipoDeGasto { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Descripcion { get; set; } = string.Empty;
    public decimal MontoMaximo { get; set; }
}