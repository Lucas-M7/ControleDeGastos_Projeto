// templates espelhados no enum, dtos e models do C#

// "as const" espelhado no enum do C#
export const TipoTransacao = {
    Despesa: 0,
    Receita: 1,
} as const;

export type TipoTransacao = typeof TipoTransacao[keyof typeof TipoTransacao];

export interface Pessoa {
    id: number;
    nome: string;
    idade: number;
}

export interface PessoaCreate {
    nome: string;
    idade: number;
}

export interface Transacao {
    id: number;
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    pessoaId: number;
    pessoa?: Pessoa; // Opcional, pois vem via Include no backend
}

export interface TransacaoCreate {
    descricao: string;
    valor: number;
    tipo: TipoTransacao;
    pessoaId: number;
}

export interface PessoaTotal {
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioTotais {
    pessoas: PessoaTotal[];
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoLiquidoGeral: number;
}