using ControleGastosApi.Dtos;

namespace ControleGastosApi.Interfaces;

public interface IRelatorioService
{
    Task<RelatorioTotaisDto> ObterTotaisAsync();
}