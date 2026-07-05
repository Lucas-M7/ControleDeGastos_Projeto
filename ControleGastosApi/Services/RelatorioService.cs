using ControleGastosApi.Data;
using ControleGastosApi.Dtos;
using ControleGastosApi.Interfaces;
using ControleGastosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosApi.Services;

public class RelatorioService : IRelatorioService
{
    private readonly AppDbContext _context;

    public RelatorioService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<RelatorioTotaisDto> ObterTotaisAsync()
    {
        // Busca todas as pessoas e faz um Join com as transações usando Include.
        // AsNoTracking() pra melhorar a performance de leitura.
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .AsNoTracking()
            .ToListAsync();

        var relatorio = new RelatorioTotaisDto();

        foreach (var pessoa in pessoas)
        {
            // Calcula as receitas e despesas usando LINQ pra separar pelo Enum.
            var receitas = pessoa.Transacoes.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
            var despesas = pessoa.Transacoes.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);

            var pessoaTotal = new PessoaTotalDto
            {
                Nome = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };

            relatorio.Pessoas.Add(pessoaTotal);

            // Acumula os valores no totalizador geral da aplicação.
            relatorio.TotalGeralReceitas += receitas;
            relatorio.TotalGeralDespesas += despesas;
        }

        relatorio.SaldoLiquidoGeral = relatorio.TotalGeralReceitas - relatorio.TotalGeralDespesas;

        return relatorio;
    }
}