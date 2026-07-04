namespace ControleGastosApi.Models;

/// <summary>
/// Enum que representa o tipo de transação financeira.
/// Utilizando um Enum para garanti a integridade dos dados  e evitar strings soltas, como:
/// ("receita", "despesa").
/// </summary>
public enum TipoTransacao
{
    Despesa = 0,
    Receita = 1
}