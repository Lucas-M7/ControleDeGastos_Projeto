import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { TipoTransacao } from "../../types";
import type { Transacao } from "../../types";

interface TransacaoListProps {
  atualizarTrigger: number;
}

export function TransacaoList({ atualizarTrigger }: TransacaoListProps) {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarTransacoes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/transacoes");
        setTransacoes(response.data);
      } catch (error: any) {
        setErro("Erro ao carregar transações.");
      } finally {
        setLoading(false);
      }
    };

    carregarTransacoes();
  }, [atualizarTrigger]);

  // Função auxiliar pra formatar moeda brasileira
  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  if (loading) return <p>Carregando transações...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (transacoes.length === 0)
    return <p>Nenhuma transação cadastrada ainda.</p>;

  return (
    <div>
      <h3>Histórico de Transações</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              ID
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Pessoa
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Descrição
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Tipo
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((t) => (
            <tr key={t.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {t.id}
              </td>
              {/* O t.pessoa?.nome vem do .Include() feito no backend */}
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {t.pessoa?.nome || "N/A"}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {t.descricao}
              </td>
              <td
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                  color: t.tipo === TipoTransacao.Receita ? "green" : "red",
                }}
              >
                {t.tipo === TipoTransacao.Receita ? "Receita" : "Despesa"}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {formatarMoeda(t.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
