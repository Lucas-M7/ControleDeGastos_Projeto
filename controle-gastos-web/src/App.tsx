import { useState } from "react";
import { PessoaForm } from "./components/Pessoas/PessoaForm";
import { PessoaList } from "./components/Pessoas/PessoaList";
import { TransacaoForm } from "./components/Transacoes/TransacaoForm";
import { TransacaoList } from "./components/Transacoes/TransacaoList";
import { RelatorioTotais } from "./components/Relatorios/RelatorioTotais";

function App() {
  /*
   * Como o PessoaForm e o PessoaList são componentes irmãos, um não sabe o que o outro faz.
   * Cria esse estado numérico no componente Pai (App). Quando o formulário salvar uma pessoa com sucesso,
   * esse número será incrementado. A Listagem está "vigiando" esse número pelo useEffect dela,
   * então, quando o número muda, ela automaticamente faz uma nova busca na API.
   */

  const [atualizarPessoasTrigger, setAtualizarPessoasTrigger] = useState(0);
  const [atualizarTransacoesTrigger, setAtualizarTransacoesTrigger] =
    useState(0);

  // Função que será chamada pelo formulário após um cadastro com sucesso.
  const handlePessoaAdicionada = () => {
    setAtualizarPessoasTrigger((prev) => prev + 1);
  };

  const handleTransacaoAdicionada = () => {
    setAtualizarTransacoesTrigger((prev) => prev + 1);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      {/* Cabeçalho Principal do Sistema */}
      <header
        style={{
          borderBottom: "2px solid #ffffff",
          paddingBottom: "12px",
          marginBottom: "32px",
        }}
      >
        <h1 style={{ margin: 0, color: "#ffffff" }}>
          Controle de Gastos Residenciais
        </h1>
      </header>

      <main>
        {/* Bloco 1: Gerenciamento de Pessoas */}
        <section
          style={{
            backgroundColor: "#fcfcfc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            marginBottom: "32px",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
              color: "#333",
            }}
          >
            1. Cadastro e Gerenciamento de Pessoas
          </h2>

          {/* Passa a função de callback para o formulário */}
          <PessoaForm onPessoaAdicionada={handlePessoaAdicionada} />

          {/* Passa o estado de trigger para a lista monitorar */}
          <PessoaList atualizarTrigger={atualizarPessoasTrigger} />
        </section>

        {/* Bloco 2: Gerenciamento de Transações */}
        <section
          style={{
            backgroundColor: "#fcfcfc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginTop: 0,
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
              color: "#333",
            }}
          >
            2. Lançamento de Transações
          </h2>
          <TransacaoForm
            onTransacaoAdicionada={handleTransacaoAdicionada}
            pessoasTrigger={atualizarPessoasTrigger} // Avisa o select para recarregar se uma pessoa nova for criada.
          />
          <TransacaoList atualizarTrigger={atualizarTransacoesTrigger} />
        </section>

        {/* Bloco 3: Consulta de Totais */}
        <section
          style={{
            backgroundColor: "#fcfcfc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            marginTop: "32px"
          }}
        >
          <h2
            style={{
              marginTop: 0,
              borderBottom: "1px solid #eee",
              paddingBottom: "8px",
              color: "#333"
            }}
          >
            3. Resumo e Consulta de Totais
          </h2>
          {/* O trigger aqui soma as duas ações, recarregando o relatório se pessoa OU transação mudar */}
          <RelatorioTotais
            atualizarTrigger={
              atualizarPessoasTrigger + atualizarTransacoesTrigger
            }
          />
        </section>
      </main>

      <footer
        style={{
          marginTop: "48px",
          textAlign: "center",
          color: "#999",
          fontSize: "14px",
          borderTop: "1px solid #eee",
          paddingTop: "16px",
        }}
      >
        Desenvolvido com .NET Core C#, PostgreSQL, React e TypeScript.
      </footer>
    </div>
  );
}

export default App;
