import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { TipoTransacao } from "../../types";
import type { Pessoa } from "../../types";

interface TransacaoFormProps {
  onTransacaoAdicionada: () => void;
  // Para saber quando as pessoas foram atualizadas para recarregar o dropdown.
  pessoasTrigger: number;
}

export function TransacaoForm({
  onTransacaoAdicionada,
  pessoasTrigger,
}: TransacaoFormProps) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState<number | "">("");

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Carrega as pessoas para preencher o <select>.
  useEffect(() => {
    const carregarPessoas = async () => {
      try {
        const response = await api.get("/pessoas");
        setPessoas(response.data);
      } catch (error) {
        console.error("Erro ao carregar pessoas para o select", error);
      }
    };
    carregarPessoas();
  }, [pessoasTrigger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!descricao.trim() || valor === "" || valor <= 0 || pessoaId === "") {
      setErro(
        "Preencha todos os campos corretamente. O valor deve ser maior que zero.",
      );
      return;
    }

    // Identifica a pessoa selecionada para validação do front-end.
    const pessoaSelecionada = pessoas.find((p) => p.id === Number(pessoaId));

    if (
      pessoaSelecionada &&
      pessoaSelecionada.idade < 18 &&
      tipo === TipoTransacao.Receita
    ) {
      setErro("Pessoas menores de 18 anos só podem registrar despesas.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/transacoes", {
        descricao,
        valor: Number(valor),
        tipo,
        pessoaId: Number(pessoaId),
      });

      setDescricao("");
      setValor("");
      // Reseta para o padrão
      setTipo(TipoTransacao.Despesa);
      setPessoaId("");
      onTransacaoAdicionada();
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de UX: se a pessoa escolhida for menor de idade, bloqueia "Receita"
  const pessoaSelecionada = pessoas.find((p) => p.id === Number(pessoaId));
  const isMenorDeIdade = pessoaSelecionada
    ? pessoaSelecionada.idade < 18
    : false;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "24px",
      }}
    >
      <h3>Lançar Nova Transação</h3>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Pessoa:</label>
          <select
            value={pessoaId}
            onChange={(e) => setPessoaId(e.target.value === '' ? '' : Number(e.target.value))}
            required
          >
            <option value="">Selecione...</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Conta de Luz"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Valor (R$):</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) =>
              setValor(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Ex: 150.50"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Tipo:</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(Number(e.target.value) as TipoTransacao)}
          >
            <option value={TipoTransacao.Despesa}>Despesa</option>
            <option value={TipoTransacao.Receita} disabled={isMenorDeIdade}>
              {isMenorDeIdade ? "Receita (Bloqueado p/ menor)" : "Receita"}
            </option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
