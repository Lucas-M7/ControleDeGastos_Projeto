using System.Text.Json.Serialization;

namespace ControleGastosApi.Models;

/// <summary>
/// Entidade que representa uma Transação financeira de uma Pessoa.
/// </summary>
public class Transacao
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; } // 'decimal' é o tipo mais seguro C# quando envolve dinheiro.
    public TipoTransacao Tipo { get; set; }

    // Chave estrangeira que conecta a Transação à Pessoa.
    public int PessoaId { get; set; }

    // Propriedade de navegação para acessar os dados da Pessoa a partir da Transação.
    [JsonIgnore]
    public Pessoa? Pessoa { get; set; }
}