using ControleGastosApi.Dtos;
using ControleGastosApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosApi.Controllers;

[ApiController]
[Route("api/pessoas")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaService _pessoaService;

    public PessoaController(IPessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpPost]
    public async Task<IActionResult> CriarPessoa([FromBody] PessoaCreateDto dto)
    {
        try
        {
            var pessoa = await _pessoaService.CriarPessoaAsync(dto);
            // Retornar 201 Created, para criação de recursos.
            return CreatedAtAction(nameof(ListarPessoas), new {id = pessoa.Id }, pessoa);
        }
        catch (Exception ex)
        {
            // Em caso de erro genérico, retorna 400 Bad Request.
            return BadRequest(new { mensagem = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> ListarPessoas()
    {
        var pessoas = await _pessoaService.ListarPessoasAsync();
        return Ok(pessoas);
    }

    [HttpDelete("{id}")] // Id na URL: api/pessoa/1
    public async Task<IActionResult> DeletarPessoa(int id)
    {
        try
        {
            await _pessoaService.DeletarPessoaAsync(id);
            return NoContent(); // 204 No Content -> Sucesso, mas sem corpo de resposta.
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { mensagem = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { mensagem = ex.Message });
        }
    }
}