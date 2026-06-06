import express from 'express';
import cors from 'cors';
import { configuracao } from './configuracao/ambiente';
import { rotaSaude } from './rotas/saude';
import { rotaQualidadeAr } from './rotas/qualidadeAr';
import { rotaClima } from './rotas/clima';
import { rotaResumo } from './rotas/resumo';
import { tratarErro } from './intermediarios/tratarErro';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', rotaSaude);
app.use('/api/air-quality', rotaQualidadeAr);
app.use('/api/weather', rotaClima);
app.use('/api/summary', rotaResumo);
app.use(tratarErro);

app.listen(configuracao.porta, () => {
  console.log(`ArLimpo API rodando na porta ${configuracao.porta}`);
});

export default app;
