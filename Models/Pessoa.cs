using System.Text.Json.Serialization;

namespace ControleGastosApi.Models;

/// <summary>
/// Entidade que representa uma Pessoa no sistema.
/// </summary>
public class Pessoa
{
    public int Id { get; set; } // Identificador único gerado automaticamente pelo banco
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }

    // Propriedade de navegação do Entity Framework.
    // Relacionamento 1:N (Uma pessoa pode ter várias transações).
    // O JsonIgnore evita loops infinitos ao retornar o JSON na API.
    [JsonIgnore]
    public List<Transacao> Transacoes { get; set; } = new List<Transacao>();
}