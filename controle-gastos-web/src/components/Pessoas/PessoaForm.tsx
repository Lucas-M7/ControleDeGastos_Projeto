import React, { useState } from "react";
import { api } from "../../services/api";

// Definindo uma interface para as propriedades do componente.
/* A função onPessoaAdicionada servirá para avisar o componente "Pai"
que uma nova pessoa foi criada, para que a listagem seja atualizada automaticamente.*/

interface PessoaFormProps {
  onPessoaAdicionada: () => void;
}

export function PessoaForm({ onPessoaAdicionada }: PessoaFormProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue ao envitar o formulário.
    setErro(null);

    if (!nome.trim() || idade === "" || idade <= 0) {
      setErro("Por favor, preencha um nome válido e uma idade maior que zero.");
      return;
    }

    try {
      setLoading(true);

      // Envio de dados no formato esperado pela PessoaCreateDto
      await api.post("/pessoas", {
        nome,
        idade: Number(idade),
      });

      // Limpa o formulário após o sucesso.
      setNome("");
      setIdade("");

      // Avisa ao componente pai para recarregar a lista.
      onPessoaAdicionada();
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "24px",
      }}
    >
      <h3>Cadastrar Nova Pessoa</h3>

      {/* Exibição de mensagem de erro condicional */}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "12px", alignItems: "flex-end" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Lucas Mateus"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="idade">Idade:</label>
          <input
            id="idade"
            type="number"
            value={idade}
            onChange={(e) =>
              setIdade(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Ex: 20"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
