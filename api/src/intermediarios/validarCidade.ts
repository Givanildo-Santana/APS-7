import { Request, Response, NextFunction } from 'express';

export function validarCidade(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { city } = req.query;

  if (!city || typeof city !== 'string' || city.trim().length === 0) {
    res.status(400).json({
      error: 'O parâmetro "city" é obrigatório e não pode estar vazio.',
      status: 400,
    });
    return;
  }

  next();
}
