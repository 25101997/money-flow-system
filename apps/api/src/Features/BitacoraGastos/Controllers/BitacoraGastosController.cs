using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Features.BitacoraGastos.DTOs;
using Infrastructure.Data;

namespace Features.BitacoraGastos.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BitacoraGastosController : ControllerBase
{
    private readonly SqlServerConnectionFactory _connectionFactory;

    public BitacoraGastosController(SqlServerConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.sp_BitacoraGastos_Listar", connection);
            command.CommandType = CommandType.StoredProcedure;

            var lista = new List<BitacoraGastosReadDTO>();

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    lista.Add(new BitacoraGastosReadDTO
                    {
                        IdBitacoraGastos = reader.GetInt32(reader.GetOrdinal("IdBitacoraGastos")),
                        IdTipoDeGasto = reader.GetInt32(reader.GetOrdinal("IdTipoDeGasto")),
                        TipoDeGasto = reader.GetString(reader.GetOrdinal("TipoDeGasto")),
                        Descripcion = reader.IsDBNull(reader.GetOrdinal("Descripcion"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("Descripcion")),
                        Debitado = reader.GetBoolean(reader.GetOrdinal("Debitado")),
                        Acreditado = reader.GetBoolean(reader.GetOrdinal("Acreditado")),
                        Monto = reader.GetDecimal(reader.GetOrdinal("Monto")),
                        Mes = reader.GetByte(reader.GetOrdinal("Mes")),
                        Anio = reader.GetInt16(reader.GetOrdinal("Anio")),
                        Insertado = reader.GetDateTime(reader.GetOrdinal("Insertado")),
                        Actualizado = reader.IsDBNull(reader.GetOrdinal("Actualizado"))
                            ? null
                            : reader.GetDateTime(reader.GetOrdinal("Actualizado")),
                        Observaciones = reader.IsDBNull(reader.GetOrdinal("Observaciones"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("Observaciones"))
                    });
                }
            }

            return Ok(lista);
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.sp_BitacoraGastos_ObtenerPorId", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@IdBitacoraGastos", id);

            using var reader = await command.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return NotFound(new { message = "Bitácora de gastos no encontrada." });

            var item = new BitacoraGastosReadDTO
            {
                IdBitacoraGastos = reader.GetInt32(reader.GetOrdinal("IdBitacoraGastos")),
                IdTipoDeGasto = reader.GetInt32(reader.GetOrdinal("IdTipoDeGasto")),
                TipoDeGasto = reader.GetString(reader.GetOrdinal("TipoDeGasto")),
                Descripcion = reader.IsDBNull(reader.GetOrdinal("Descripcion"))
                    ? null
                    : reader.GetString(reader.GetOrdinal("Descripcion")),
                Debitado = reader.GetBoolean(reader.GetOrdinal("Debitado")),
                Acreditado = reader.GetBoolean(reader.GetOrdinal("Acreditado")),
                Monto = reader.GetDecimal(reader.GetOrdinal("Monto")),
                Mes = reader.GetByte(reader.GetOrdinal("Mes")),
                Anio = reader.GetInt16(reader.GetOrdinal("Anio")),
                Insertado = reader.GetDateTime(reader.GetOrdinal("Insertado")),
                Actualizado = reader.IsDBNull(reader.GetOrdinal("Actualizado"))
                    ? null
                    : reader.GetDateTime(reader.GetOrdinal("Actualizado")),
                Observaciones = reader.IsDBNull(reader.GetOrdinal("Observaciones"))
                    ? null
                    : reader.GetString(reader.GetOrdinal("Observaciones"))
            };

            return Ok(item);
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BitacoraGastosCreateDTO dto)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.sp_BitacoraGastos_Insertar", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@IdTipoDeGasto", dto.IdTipoDeGasto);
            command.Parameters.AddWithValue("@Descripcion", (object?)dto.Descripcion ?? DBNull.Value);
            command.Parameters.AddWithValue("@Debitado", dto.Debitado);
            command.Parameters.AddWithValue("@Acreditado", dto.Acreditado);
            command.Parameters.AddWithValue("@Monto", dto.Monto);
            command.Parameters.AddWithValue("@Mes", dto.Mes);
            command.Parameters.AddWithValue("@Anio", dto.Anio);
            command.Parameters.AddWithValue("@Observaciones", (object?)dto.Observaciones ?? DBNull.Value);

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                var idGenerado = reader.GetInt32(reader.GetOrdinal("IdBitacoraGastosGenerado"));

                return Ok(new BitacoraGastosIdResponseDTO
                {
                    Id = idGenerado,
                    Mensaje = "Bitácora de gastos creada correctamente."
                });
            }

            return BadRequest(new { message = "No se pudo crear la bitácora de gastos." });
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] BitacoraGastosUpdateDTO dto)
    {
        try
        {
            if (id != dto.IdBitacoraGastos)
                return BadRequest(new { message = "El id de la ruta no coincide con el del cuerpo." });

            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.sp_BitacoraGastos_Actualizar", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@IdBitacoraGastos", dto.IdBitacoraGastos);
            command.Parameters.AddWithValue("@IdTipoDeGasto", dto.IdTipoDeGasto);
            command.Parameters.AddWithValue("@Descripcion", (object?)dto.Descripcion ?? DBNull.Value);
            command.Parameters.AddWithValue("@Debitado", dto.Debitado);
            command.Parameters.AddWithValue("@Acreditado", dto.Acreditado);
            command.Parameters.AddWithValue("@Monto", dto.Monto);
            command.Parameters.AddWithValue("@Mes", dto.Mes);
            command.Parameters.AddWithValue("@Anio", dto.Anio);
            command.Parameters.AddWithValue("@Observaciones", (object?)dto.Observaciones ?? DBNull.Value);

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                var idActualizado = reader.GetInt32(reader.GetOrdinal("IdBitacoraGastosActualizado"));

                return Ok(new BitacoraGastosIdResponseDTO
                {
                    Id = idActualizado,
                    Mensaje = "Bitácora de gastos actualizada correctamente."
                });
            }

            return BadRequest(new { message = "No se pudo actualizar la bitácora de gastos." });
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpGet("tipo-de-gasto/{idTipoDeGasto:int}")]
    public async Task<IActionResult> GetByTipoDeGasto(int idTipoDeGasto)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.sp_BitacoraGastos_ListarPorTipoDeGasto", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@IdTipoDeGasto", idTipoDeGasto);

            var lista = new List<BitacoraGastosReadDTO>();

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    lista.Add(new BitacoraGastosReadDTO
                    {
                        IdBitacoraGastos = reader.GetInt32(reader.GetOrdinal("IdBitacoraGastos")),
                        IdTipoDeGasto = reader.GetInt32(reader.GetOrdinal("IdTipoDeGasto")),
                        TipoDeGasto = reader.GetString(reader.GetOrdinal("TipoDeGasto")),
                        Descripcion = reader.IsDBNull(reader.GetOrdinal("Descripcion"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("Descripcion")),
                        Debitado = reader.GetBoolean(reader.GetOrdinal("Debitado")),
                        Acreditado = reader.GetBoolean(reader.GetOrdinal("Acreditado")),
                        Monto = reader.GetDecimal(reader.GetOrdinal("Monto")),
                        Mes = reader.GetByte(reader.GetOrdinal("Mes")),
                        Anio = reader.GetInt16(reader.GetOrdinal("Anio")),
                        Insertado = reader.GetDateTime(reader.GetOrdinal("Insertado")),
                        Actualizado = reader.IsDBNull(reader.GetOrdinal("Actualizado"))
                            ? null
                            : reader.GetDateTime(reader.GetOrdinal("Actualizado")),
                        Observaciones = reader.IsDBNull(reader.GetOrdinal("Observaciones"))
                            ? null
                            : reader.GetString(reader.GetOrdinal("Observaciones"))
                    });
                }
            }

            return Ok(lista);
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.sp_BitacoraGastos_Eliminar", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@IdBitacoraGastos", id);

            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                var idEliminado = reader.GetInt32(reader.GetOrdinal("IdBitacoraGastosEliminado"));

                return Ok(new BitacoraGastosIdResponseDTO
                {
                    Id = idEliminado,
                    Mensaje = "Bitácora de gastos eliminada correctamente."
                });
            }

            return BadRequest(new { message = "No se pudo eliminar la bitácora de gastos." });
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}