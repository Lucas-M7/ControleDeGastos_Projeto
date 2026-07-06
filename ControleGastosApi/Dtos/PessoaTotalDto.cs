namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para representar os totais individuais de cada pessoa.
/// </summary>
public record PessoaTotalDto(string Nome, decimal TotalReceitas, decimal TotalDespesas, decimal Saldo);