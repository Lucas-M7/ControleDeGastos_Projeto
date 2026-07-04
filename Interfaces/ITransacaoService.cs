using ControleGastosApi.Dtos;
using ControleGastosApi.Models;

namespace ControleGastosApi.Interfaces;

public interface ITransacaoService
{
    Task<Transacao> CriarTransacaoAsync(TransacaoCreateDto dto);
    Task<IEnumerable<Transacao>> ListarTransacoesAsync();
}