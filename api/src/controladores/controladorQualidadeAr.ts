import { Request, Response, NextFunction } from 'express';
import { buscarCoordenadas, buscarPoluicaoAr } from '../servicos/servicoOpenWeather';
import { ROTULOS_AQI } from '../utilitarios/rotulosAqi';

export async function obterQualidadeAr(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { city } = req.query as { city: string };
    const { lat, lon, nome } = await buscarCoordenadas(city);
    const poluicao = await buscarPoluicaoAr(lat, lon);
    const item = poluicao.list[0];
    const informacaoAqi = ROTULOS_AQI[item.main.aqi] ?? { rotulo: 'Desconhecida', cor: '#9E9E9E' };

    res.status(200).json({
      city: nome,
      aqi: item.main.aqi,
      aqiLabel: informacaoAqi.rotulo,
      aqiColor: informacaoAqi.cor,
      components: {
        pm2_5: item.components.pm2_5 ?? null,
        pm10: item.components.pm10 ?? null,
        co: item.components.co ?? null,
        no2: item.components.no2 ?? null,
        o3: item.components.o3 ?? null,
        so2: item.components.so2 ?? null,
      },
    });
  } catch (erro) {
    next(erro);
  }
}
