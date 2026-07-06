import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { RelatorioTotais as RelatorioTotaisType } from "../../types";

interface RelatorioTotaisProps {
  atualizarTrigger: number;
}

export function RelatorioTotais({ atualizarTrigger }: RelatorioTotaisProps) {
  const [relatorio, setRelatorio] = useState<RelatorioTotaisType | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregarTotais = async () => {
      try {
        setLoading(true);
        const response = await api.get("/relatorios/totais");
        setRelatorio(response.data);
      } catch (error: any) {
        setErro("Erro ao carregar o relatório de totais.");
      } finally {
        setLoading(false);
      }
    };
    carregarTotais();
  }, [atualizarTrigger]);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  if (loading) return <p>Carregando relatório de totais...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!relatorio) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "12px",
          marginBottom: "24px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Nome da Pessoa
            </th>
            <th
              style={{
                padding: "8px",
                borderBottom: "1px solid #ddd",
                color: "green",
              }}
            >
              Total de Receitas
            </th>
            <th
              style={{
                padding: "8px",
                borderBottom: "1px solid #ddd",
                color: "red",
              }}
            >
              Total de Despesas
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Saldo Líquido
            </th>
          </tr>
        </thead>
        <tbody>
          {relatorio.pessoas.map((pessoa, index) => (
            <tr key={index}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {pessoa.nome}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {formatarMoeda(pessoa.totalReceitas)}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {formatarMoeda(pessoa.totalDespesas)}
              </td>
              <td
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                  fontWeight: "bold",
                  color: pessoa.saldo >= 0 ? "green" : "red",
                }}
              >
                {formatarMoeda(pessoa.saldo)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr
            style={{
              backgroundColor: "#e9ecef",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            <td
              style={{
                padding: "12px 8px",
                borderTop: "2px solid #ccc",
                textAlign: "right",
              }}
            >
              Totalizador Geral:
            </td>
            <td
              style={{
                padding: "12px 8px",
                borderTop: "2px solid #ccc",
                color: "green",
              }}
            >
              {formatarMoeda(relatorio.totalGeralReceitas)}
            </td>
            <td
              style={{
                padding: "12px 8px",
                borderTop: "2px solid #ccc",
                color: "red",
              }}
            >
              {formatarMoeda(relatorio.totalGeralDespesas)}
            </td>
            <td
              style={{
                padding: "12px 8px",
                borderTop: "2px solid #ccc",
                color: relatorio.saldoLiquidoGeral >= 0 ? "green" : "red",
              }}
            >
              {formatarMoeda(relatorio.saldoLiquidoGeral)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
