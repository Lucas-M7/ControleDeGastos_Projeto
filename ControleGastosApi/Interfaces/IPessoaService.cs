using ControleGastosApi.Dtos;
using ControleGastosApi.Models;

namespace ControleGastosApi.Interfaces;

/// <summary>
/// Interface do Service da Pessoa.
/// Servindo como um contrato de um conjunto de métodos que o Service da Pessoa precisa ter.
/// </summary>
public interface IPessoaService
{
    Task<Pessoa> CriarPessoaAsync(PessoaCreateDto dto);
    Task<IEnumerable<Pessoa>> ListarPessoasAsync();
    Task DeletarPessoaAsync(int id);
}