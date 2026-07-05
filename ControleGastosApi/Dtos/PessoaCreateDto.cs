namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para o envio de dados necessários da Pessoa.
/// </summary>
public class PessoaCreateDto
{
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }
}