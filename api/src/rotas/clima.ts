import { Router } from 'express';
import { validarCidade } from '../intermediarios/validarCidade';
import { obterClima } from '../controladores/controladorClima';

export const rotaClima = Router();

rotaClima.get('/', validarCidade, obterClima);
