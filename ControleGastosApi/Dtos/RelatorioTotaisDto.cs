namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para o relatório final, tendo a lista de pessoas e o totalizador geral.
/// </summary>
public record RelatorioTotaisDto
{
    public List<PessoaTotalDto> Pessoas { get; init; } = new List<PessoaTotalDto>();
    public decimal TotalGeralReceitas { get; set; }
    public decimal TotalGeralDespesas { get; set; }
    public decimal SaldoLiquidoGeral { get; set; }
}