using ControleGastosApi.Models;

namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para o envio de dados necessário da transação.
/// </summary>
public class TransacaoCreateDto
{
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacao Tipo { get; set; }
    public int PessoaId { get; set; }
}