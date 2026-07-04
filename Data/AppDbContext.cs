using ControleGastosApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosApi.Data;

/// <summary>
/// Contexto do Banco de Dados da aplicação.
/// É responsável por gerenciar a conexão com PostgreSQL e mapear as entidades para as tabelas.
/// </summary>
public class AppDbContext : DbContext
{
    // O construtor recebe as configurações do Program.cs e passa para a base do EF Core.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {}

    // Definição dos DbSets, que representam as tabelas no banco de dados.
    public DbSet<Pessoa> Pessoas { get; set; }
    public DbSet<Transacao> Transacoes { get; set; }

    /// <summary>
    /// Método que permite configurar regras específicas do banco usando Fluent API.
    /// Usando para deixar explícita a regra de negócio do relacionamento.
    /// </summary>
    protected void OModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Mapeamento do Enum de TipoTransacao para ser salvo com String ou Inteiro no banco.
        // Pra maior performance e deixar mais simples, será salvo como inteiro (0 = Despesa, 1 = Receita).
        modelBuilder.Entity<Transacao>()
            .Property(t => t.Tipo)
            .HasConversion<int>();

        // Configuração EXPLÍCITA do relacionamento 1:N e Deleção em Cascata.
        // Mas o próprio EF Core já faz isso sozinho, seguindo as conveções de nomes (PessoaId, Id).
        modelBuilder.Entity<Transacao>()
            .HasOne(t => t.Pessoa)
            .WithMany(p => p.Transacoes)
            .HasForeignKey(t => t.PessoaId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}