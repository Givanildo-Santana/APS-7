import { Router, Request, Response } from 'express';

export const rotaSaude = Router();

rotaSaude.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
