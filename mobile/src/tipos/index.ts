export interface Estado {
  id: string;
  sigla: string;
  nome: string;
}

export interface Cidade {
  id: number;
  nome: string;
}

export interface DadosQualidadeAr {
  cidade: string;
  aqi: number;
  rotuloAqi: string;
  corAqi: string;
  componentes: {
    pm2_5: number | null;
    pm10: number | null;
    co: number | null;
    no2: number | null;
    o3: number | null;
    so2: number | null;
  };
}

export interface DadosClima {
  cidade: string;
  temperatura: number;
  sensacaoTermica: number;
  umidade: number;
  vento: number;
  pressao: number;
  descricao: string;
}

export interface DadosResumo {
  qualidadeAr: DadosQualidadeAr;
  clima: DadosClima;
}

export interface ErroApi {
  erro: string;
  status: number;
}

export type ListaRotas = {
  Inicio: undefined;
  Resumo: { cidade: string; dados: DadosResumo };
  QualidadeAr: { qualidadeAr: DadosQualidadeAr };
  Clima: { clima: DadosClima };
  Sobre: undefined;
};
