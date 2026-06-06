import { Router } from 'express';
import { validarCidade } from '../intermediarios/validarCidade';
import { obterResumo } from '../controladores/controladorResumo';

export const rotaResumo = Router();

rotaResumo.get('/', validarCidade, obterResumo);
