using ControleGastosApi.Data;
using ControleGastosApi.Dtos;
using ControleGastosApi.Interfaces;
using ControleGastosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosApi.Services;

/// <summary>
/// Service com regras de negócios aplicadas.
/// </summary>
public class PessoaService : IPessoaService
{
    private readonly AppDbContext _context;

    // Injeção de Dependência do contexto do banco de dados.
    public PessoaService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Pessoa> CriarPessoaAsync(PessoaCreateDto dto)
    {
        // Mapeamento manual do DTO para Entidade que vai ao banco.
        var pessoa = new Pessoa
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        if (pessoa.Idade <= 0)
        {
            throw new ArgumentException("A idade não pode ser valor negativo e precisa ser maior que zero.");
        }

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return pessoa;
    }

    public async Task DeletarPessoaAsync(int id)
    {
        // Dispara erro se tentar deletar alguém inexistente.
        var pessoa = await _context.Pessoas.FindAsync(id) 
            ?? throw new KeyNotFoundException("Pessoa não encontrada.");

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Pessoa>> ListarPessoasAsync()
    {
        // AsNoTracking() para consulta de leitura.
        // Ele avisa ao EF Core que não precisa rastrear alterações nesses objetos = economiza memória.
        return await _context.Pessoas.AsNoTracking().ToListAsync();
    }
}