namespace ControleGastosApi.Dtos;

/// <summary>
/// DTO para o envio de dados necessários da Pessoa.
/// </summary>
public record PessoaCreateDto(string Nome, int Idade);