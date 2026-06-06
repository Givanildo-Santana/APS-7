import axios from 'axios';
import { DadosClima, DadosQualidadeAr, DadosResumo, ErroApi, Estado } from '../tipos';

const clienteGeocodificacao = axios.create({
  baseURL: 'https://geocoding-api.open-meteo.com/v1',
  timeout: 10000,
});

const clienteClima = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
  timeout: 10000,
});

const clienteQualidadeAr = axios.create({
  baseURL: 'https://air-quality-api.open-meteo.com/v1',
  timeout: 10000,
});

interface ResultadoGeocodificacao {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
}

interface RespostaGeocodificacao {
  results?: ResultadoGeocodificacao[];
}

interface RespostaClima {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    surface_pressure?: number;
    wind_speed_10m?: number;
    weather_code?: number;
  };
}

interface RespostaQualidadeAr {
  current?: {
    european_aqi?: number;
    pm10?: number;
    pm2_5?: number;
    carbon_monoxide?: number;
    nitrogen_dioxide?: number;
    ozone?: number;
    sulphur_dioxide?: number;
  };
}

interface Localizacao {
  nome: string;
  latitude: number;
  longitude: number;
}

export async function obterResumo(cidade: string, estado: Estado): Promise<DadosResumo> {
  try {
    const localizacao = await buscarLocalizacao(cidade, estado);
    const [qualidadeAr, clima] = await Promise.all([
      buscarQualidadeAr(localizacao),
      buscarClima(localizacao),
    ]);

    return { qualidadeAr, clima };
  } catch (erro) {
    if (ehErroApi(erro)) {
      throw erro;
    }

    throw {
      erro: 'Não foi possível consultar os dados. Verifique sua conexão e tente novamente.',
      status: 0,
    } as ErroApi;
  }
}

async function buscarLocalizacao(cidade: string, estado: Estado): Promise<Localizacao> {
  const resposta = await clienteGeocodificacao.get<RespostaGeocodificacao>('/search', {
    params: {
      name: cidade,
      count: 20,
      language: 'pt',
      format: 'json',
    },
  });

  const resultados = resposta.data.results ?? [];
  const resultado =
    resultados.find((item) => item.country_code === 'BR' && normalizar(item.admin1 ?? '') === normalizar(estado.nome)) ??
    resultados.find((item) => item.country_code === 'BR') ??
    resultados[0];

  if (!resultado) {
    throw {
      erro: 'Cidade não encontrada. Confira a cidade e o estado selecionados.',
      status: 404,
    } as ErroApi;
  }

  return {
    nome: [resultado.name, resultado.admin1, resultado.country].filter(Boolean).join(', '),
    latitude: resultado.latitude,
    longitude: resultado.longitude,
  };
}

async function buscarClima(localizacao: Localizacao): Promise<DadosClima> {
  const resposta = await clienteClima.get<RespostaClima>('/forecast', {
    params: {
      latitude: localizacao.latitude,
      longitude: localizacao.longitude,
      current: [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'surface_pressure',
        'wind_speed_10m',
        'weather_code',
      ].join(','),
      timezone: 'auto',
    },
  });

  const atual = resposta.data.current;

  if (!atual) {
    throw {
      erro: 'Dados de clima indisponíveis para esta cidade.',
      status: 502,
    } as ErroApi;
  }

  return {
    cidade: localizacao.nome,
    temperatura: atual.temperature_2m ?? 0,
    sensacaoTermica: atual.apparent_temperature ?? atual.temperature_2m ?? 0,
    umidade: atual.relative_humidity_2m ?? 0,
    pressao: atual.surface_pressure ?? 0,
    vento: atual.wind_speed_10m ?? 0,
    descricao: descreverClima(atual.weather_code),
  };
}

async function buscarQualidadeAr(localizacao: Localizacao): Promise<DadosQualidadeAr> {
  const resposta = await clienteQualidadeAr.get<RespostaQualidadeAr>('/air-quality', {
    params: {
      latitude: localizacao.latitude,
      longitude: localizacao.longitude,
      current: [
        'european_aqi',
        'pm10',
        'pm2_5',
        'carbon_monoxide',
        'nitrogen_dioxide',
        'ozone',
        'sulphur_dioxide',
      ].join(','),
      timezone: 'auto',
    },
  });

  const atual = resposta.data.current;

  if (!atual) {
    throw {
      erro: 'Dados de qualidade do ar indisponíveis para esta cidade.',
      status: 502,
    } as ErroApi;
  }

  const indice = classificarQualidadeAr(atual.european_aqi);

  return {
    cidade: localizacao.nome,
    aqi: indice.valor,
    rotuloAqi: indice.rotulo,
    corAqi: indice.cor,
    componentes: {
      pm2_5: normalizarNumero(atual.pm2_5),
      pm10: normalizarNumero(atual.pm10),
      co: normalizarNumero(atual.carbon_monoxide),
      no2: normalizarNumero(atual.nitrogen_dioxide),
      o3: normalizarNumero(atual.ozone),
      so2: normalizarNumero(atual.sulphur_dioxide),
    },
  };
}

function classificarQualidadeAr(valor?: number) {
  if (typeof valor !== 'number') {
    return { valor: 0, rotulo: 'Indisponível', cor: '#607D8B' };
  }

  if (valor <= 20) {
    return { valor: 1, rotulo: 'Boa', cor: '#2E7D32' };
  }

  if (valor <= 40) {
    return { valor: 2, rotulo: 'Razoável', cor: '#7CB342' };
  }

  if (valor <= 60) {
    return { valor: 3, rotulo: 'Moderada', cor: '#F9A825' };
  }

  if (valor <= 80) {
    return { valor: 4, rotulo: 'Ruim', cor: '#EF6C00' };
  }

  return { valor: 5, rotulo: 'Muito ruim', cor: '#C62828' };
}

function descreverClima(codigo?: number): string {
  const descricoes: Record<number, string> = {
    0: 'céu limpo',
    1: 'predomínio de sol',
    2: 'parcialmente nublado',
    3: 'nublado',
    45: 'neblina',
    48: 'neblina com geada',
    51: 'garoa fraca',
    53: 'garoa moderada',
    55: 'garoa intensa',
    61: 'chuva fraca',
    63: 'chuva moderada',
    65: 'chuva forte',
    80: 'pancadas de chuva',
    81: 'pancadas moderadas',
    82: 'pancadas fortes',
    95: 'trovoadas',
  };

  return descricoes[codigo ?? -1] ?? 'condição não informada';
}

function normalizarNumero(valor?: number): number | null {
  return typeof valor === 'number' ? valor : null;
}

function normalizar(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function ehErroApi(erro: unknown): erro is ErroApi {
  return typeof erro === 'object' && erro !== null && 'erro' in erro && 'status' in erro;
}
