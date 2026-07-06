import { useEffect, useState } from "react";
import { api } from "../../services/api";
import type { Pessoa } from "../../types";

interface PessoaListProps {
  // Recebe uma chave de atualização. Quando ela mudar, o useEffecto roda novamente.
  atualizarTrigger: number;
}

export function PessoaList({ atualizarTrigger }: PessoaListProps) {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Função separada para buscar os dados -> facilitando a reutilização.
  const carregarPessoas = async () => {
    try {
      setLoading(true);
      setErro(null);
      const response = await api.get("/pessoas");
      setPessoas(response.data);
    } catch (error: any) {
      setErro("Erro ao carregar a lista de pessoas.");
    } finally {
      setLoading(false);
    }
  };

  // O useEffect observa o atualizarTrigger.
  /* Sempre que o formulário cadastrar alguém, o trigger no componente Pai será mudado,
    forçando a lista a se atualizar. */

  useEffect(() => {
    carregarPessoas();
  }, [atualizarTrigger]);

  const handleDelete = async (id: number) => {
    // Confirmação simples para evitar exclusão acidental.
    if (
      !window.confirm(
        "Tem certeza que deseja excluir esta pessoa? Todas as suas transações serão apagadas.",
      )
    ) {
      return;
    }

    try {
      await api.delete(`/pessoas/${id}`);
      // Atualiza o estado local removendo a pessoa deletada sem precisar recarregar a página.
      setPessoas(pessoas.filter((p) => p.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) return <p>Carregando pessoas...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (pessoas.length === 0) return <p>Nenhuma pessoa cadastrada ainda.</p>;

  return (
    <div>
      <h3>Lista de Pessoas</h3>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "12px" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              ID
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Nome
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Idade
            </th>
            <th style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {pessoa.id}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {pessoa.nome}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                {pessoa.idade}
              </td>
              <td style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                <button
                  onClick={() => handleDelete(pessoa.id)}
                  style={{
                    backgroundColor: "#ff4d4f",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
