using ControleGastosApi.Models;

namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para o envio de dados necessário da transação.
/// </summary>
public record TransacaoCreateDto(string Descricao, decimal Valor, TipoTransacao Tipo, int PessoaId);