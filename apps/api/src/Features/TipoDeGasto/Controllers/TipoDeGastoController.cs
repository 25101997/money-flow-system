using Infrastructure.Data;
using Features.TipoDeGasto.Models;
using Features.TipoDeGasto.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Features.TipoDeGasto.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TipoDeGastoController : ControllerBase
{
    private readonly SqlServerConnectionFactory _connectionFactory;

    public TipoDeGastoController(SqlServerConnectionFactory connectionFactory)
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

            await using var command = new SqlCommand("mfs.spObtenerTiposDeGasto", connection);
            command.CommandType = CommandType.StoredProcedure;

            var lista = new List<TipoDeGastoReadDTO>();

            using (var reader = await command.ExecuteReaderAsync())
            {
                while (await reader.ReadAsync())
                {
                    lista.Add(new TipoDeGastoReadDTO
                    {
                        IdTipoDeGasto = reader.GetInt32(0),
                        Nombre = reader.GetString(1),
                        Descripcion = reader.GetString(2),
                        MontoMaximo = reader.GetDecimal(3)
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

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.spObtenerTipoDeGastoPorId", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@IdTipoDeGasto", id);
            using var reader = await command.ExecuteReaderAsync();

            if (await reader.ReadAsync())
            {
                var tipoDeGasto = new TipoDeGastoReadDTO
                {
                    IdTipoDeGasto = reader.GetInt32(0),
                    Nombre = reader.GetString(1),
                    Descripcion = reader.GetString(2),
                    MontoMaximo = reader.GetDecimal(3)
                };

                return Ok(tipoDeGasto);
            }

            return NotFound(new { message = "Tipo de gasto no encontrado" });
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TipoDeGastoCreateDTO dto)
    {
        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.spInsertarTipoDeGasto", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@Nombre", dto.Nombre);
            command.Parameters.AddWithValue("@Descripcion", dto.Descripcion);
            command.Parameters.AddWithValue("@MontoMaximo", dto.MontoMaximo);

            var result = await command.ExecuteScalarAsync();

            return Ok(new
            {
                message = "Creado correctamente",
                id = Convert.ToInt32(result)
            });
        }
        catch (SqlException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] TipoDeGastoUpdateDTO dto)
    {
        if (id != dto.IdTipoDeGasto)
        {
            return BadRequest(new
            {
                message = "El id de la URL no coincide con el del cuerpo."
            });
        }

        try
        {
            await using var connection = _connectionFactory.CreateConnection();
            await connection.OpenAsync();

            await using var command = new SqlCommand("mfs.spActualizarTipoDeGasto", connection);
            command.CommandType = CommandType.StoredProcedure;

            command.Parameters.AddWithValue("@IdTipoDeGasto", dto.IdTipoDeGasto);
            command.Parameters.AddWithValue("@Nombre", dto.Nombre);
            command.Parameters.AddWithValue("@Descripcion", dto.Descripcion);
            command.Parameters.AddWithValue("@MontoMaximo", dto.MontoMaximo);

            await command.ExecuteNonQueryAsync();

            return Ok(new
            {
                message = "Actualizado correctamente"
            });
        }
        catch (SqlException ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}