import axios from 'axios';
import { configuracao } from '../configuracao/ambiente';
import {
  AirPollutionResponse,
  GeocodingResult,
  WeatherResponse,
} from '../tipos/openWeather';

const clienteHttp = axios.create({ baseURL: configuracao.urlOpenWeather });

export async function buscarCoordenadas(
  cidade: string,
): Promise<{ lat: number; lon: number; nome: string }> {
  const { data } = await clienteHttp.get<GeocodingResult[]>('/geo/1.0/direct', {
    params: { q: cidade, limit: 1, appid: configuracao.chaveOpenWeather },
  });

  if (!data.length) {
    const erro = new Error(`Cidade não encontrada: "${cidade}".`) as Error & { status: number };
    erro.status = 404;
    throw erro;
  }

  return { lat: data[0].lat, lon: data[0].lon, nome: data[0].name };
}

export async function buscarPoluicaoAr(
  lat: number,
  lon: number,
): Promise<AirPollutionResponse> {
  const { data } = await clienteHttp.get<AirPollutionResponse>('/data/2.5/air_pollution', {
    params: { lat, lon, appid: configuracao.chaveOpenWeather },
  });

  return data;
}

export async function buscarClimaAtual(
  lat: number,
  lon: number,
): Promise<WeatherResponse> {
  const { data } = await clienteHttp.get<WeatherResponse>('/data/2.5/weather', {
    params: {
      lat,
      lon,
      units: 'metric',
      lang: 'pt_br',
      appid: configuracao.chaveOpenWeather,
    },
  });

  return data;
}
