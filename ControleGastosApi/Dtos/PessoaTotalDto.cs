namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para representar os totais individuais de cada pessoa.
/// </summary>
public class PessoaTotalDto
{
    public string Nome { get; set; } = string.Empty;
    public decimal TotalReceitas { get; set; }
    public decimal TotalDespesas { get; set; }
    public decimal Saldo { get; set; }
}