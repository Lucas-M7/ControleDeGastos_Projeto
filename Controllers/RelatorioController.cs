using ControleGastosApi.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RelatorioController : ControllerBase
{
    private readonly IRelatorioService _relatorioService;

    public RelatorioController(IRelatorioService relatorioService)
    {
        _relatorioService = relatorioService;
    }

    [HttpGet("totais")]
    public async Task<IActionResult> ObterTotais()
    {
        var totais = await _relatorioService.ObterTotaisAsync();
        return Ok(totais);
    }
}