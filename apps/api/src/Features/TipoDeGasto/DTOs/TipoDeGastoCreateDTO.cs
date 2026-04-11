namespace Features.TipoDeGasto.DTOs;

public class TipoDeGastoCreateDTO
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; } = string.Empty;
    public decimal MontoMaximo { get; set; }
}