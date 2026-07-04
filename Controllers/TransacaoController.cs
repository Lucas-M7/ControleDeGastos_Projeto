using ControleGastosApi.Dtos;
using ControleGastosApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly ITransacaoService _transacaoService;

    public TransacaoController(ITransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpPost]
    public async Task<IActionResult> CriarTransacao([FromBody] TransacaoCreateDto dto)
    {
        try
        {
            var transacao = await _transacaoService.CriarTransacaoAsync(dto);
            return CreatedAtAction(nameof(ListarTransacoes), new { id = transacao.Id }, transacao);
        }
        catch (KeyNotFoundException ex)
        {
            // Se a pessoaId informada não existir.
            return NotFound(new { mensagem = ex.Message });
        }
        catch (ArgumentException ex)
        {
            // Se o menor de idade tentar registrar receita.
            return BadRequest( new { mensagem = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { mensagem = "Erro interno no servidor.", detalhe = ex.Message });
        }
    }

    [HttpGet]
    public async Task<IActionResult> ListarTransacoes()
    {
        var transacoes = await _transacaoService.ListarTransacoesAsync();
        return Ok(transacoes);
    }
}