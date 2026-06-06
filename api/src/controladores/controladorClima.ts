import { Request, Response, NextFunction } from 'express';
import { buscarCoordenadas, buscarClimaAtual } from '../servicos/servicoOpenWeather';

export async function obterClima(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { city } = req.query as { city: string };
    const { lat, lon, nome } = await buscarCoordenadas(city);
    const clima = await buscarClimaAtual(lat, lon);

    res.status(200).json({
      city: nome,
      temperature: clima.main.temp,
      feelsLike: clima.main.feels_like,
      humidity: clima.main.humidity,
      pressure: clima.main.pressure,
      windSpeed: clima.wind.speed,
      description: clima.weather[0]?.description ?? '',
    });
  } catch (erro) {
    next(erro);
  }
}
