import dotenv from 'dotenv';

dotenv.config();

function exigirVariavel(nome: string): string {
  const valor = process.env[nome];

  if (!valor) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${nome}`);
  }

  return valor;
}

export const configuracao = {
  porta: parseInt(process.env.PORT ?? '3000', 10),
  chaveOpenWeather: exigirVariavel('OPENWEATHER_API_KEY'),
  urlOpenWeather: 'https://api.openweathermap.org',
};
