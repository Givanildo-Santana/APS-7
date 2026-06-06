import { Request, Response, NextFunction } from 'express';

interface ErroAplicacao extends Error {
  status?: number;
}

export function tratarErro(
  err: ErroAplicacao,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err.status ?? 500;
  const mensagem = err.message ?? 'Erro interno do servidor.';

  res.status(status).json({ error: mensagem, status });
}
