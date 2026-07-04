using ControleGastosApi.Data;
using ControleGastosApi.Dtos;
using ControleGastosApi.Interfaces;
using ControleGastosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosApi.Services;

public class TransacaoService : ITransacaoService
{
    private readonly AppDbContext _context;

    public TransacaoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Transacao> CriarTransacaoAsync(TransacaoCreateDto dto)
    {
        // 1. REGRA: Verificar o valor da PessoaId no cadastro de pessoas.
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId)
            ?? throw new KeyNotFoundException("A pessoa informada não existe no cadastro.");

        // 2. REGRA: Menor de 18 anos só pode registrar despesas.
        if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
        {
            // Exceção será capturada no Controller e retornada como erro Bad Request - 400
            throw new ArgumentException("Pessoa menores de 18 anos só podem registrar despesas.");
        }

        // 3. Mapeamento
        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            PessoaId = dto.PessoaId
        };

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return transacao;
    }

    public async Task<IEnumerable<Transacao>> ListarTransacoesAsync()
    {
        return await _context.Transacoes
            .Include(t => t.Pessoa) // Include para trazer os dados da Pessoa junto com a Transação.
            .AsNoTracking()
            .ToListAsync();
    }
}