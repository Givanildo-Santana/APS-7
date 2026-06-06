import { Router } from 'express';
import { validarCidade } from '../intermediarios/validarCidade';
import { obterQualidadeAr } from '../controladores/controladorQualidadeAr';

export const rotaQualidadeAr = Router();

rotaQualidadeAr.get('/', validarCidade, obterQualidadeAr);
