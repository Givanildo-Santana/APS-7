import { Estado } from '../tipos';

export const ESTADOS_BRASIL: Estado[] = [
  { id: 'AC', sigla: 'AC', nome: 'Acre' },
  { id: 'AL', sigla: 'AL', nome: 'Alagoas' },
  { id: 'AP', sigla: 'AP', nome: 'Amapá' },
  { id: 'AM', sigla: 'AM', nome: 'Amazonas' },
  { id: 'BA', sigla: 'BA', nome: 'Bahia' },
  { id: 'CE', sigla: 'CE', nome: 'Ceará' },
  { id: 'DF', sigla: 'DF', nome: 'Distrito Federal' },
  { id: 'ES', sigla: 'ES', nome: 'Espírito Santo' },
  { id: 'GO', sigla: 'GO', nome: 'Goiás' },
  { id: 'MA', sigla: 'MA', nome: 'Maranhão' },
  { id: 'MT', sigla: 'MT', nome: 'Mato Grosso' },
  { id: 'MS', sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { id: 'MG', sigla: 'MG', nome: 'Minas Gerais' },
  { id: 'PA', sigla: 'PA', nome: 'Pará' },
  { id: 'PB', sigla: 'PB', nome: 'Paraíba' },
  { id: 'PR', sigla: 'PR', nome: 'Paraná' },
  { id: 'PE', sigla: 'PE', nome: 'Pernambuco' },
  { id: 'PI', sigla: 'PI', nome: 'Piauí' },
  { id: 'RJ', sigla: 'RJ', nome: 'Rio de Janeiro' },
  { id: 'RN', sigla: 'RN', nome: 'Rio Grande do Norte' },
  { id: 'RS', sigla: 'RS', nome: 'Rio Grande do Sul' },
  { id: 'RO', sigla: 'RO', nome: 'Rondônia' },
  { id: 'RR', sigla: 'RR', nome: 'Roraima' },
  { id: 'SC', sigla: 'SC', nome: 'Santa Catarina' },
  { id: 'SP', sigla: 'SP', nome: 'São Paulo' },
  { id: 'SE', sigla: 'SE', nome: 'Sergipe' },
  { id: 'TO', sigla: 'TO', nome: 'Tocantins' },
];

export const ROTULOS_AQI: Record<number, { rotulo: string; cor: string }> = {
  1: { rotulo: 'Boa', cor: '#00C853' },
  2: { rotulo: 'Razoável', cor: '#AEEA00' },
  3: { rotulo: 'Moderada', cor: '#FFD600' },
  4: { rotulo: 'Ruim', cor: '#FF6D00' },
  5: { rotulo: 'Muito ruim', cor: '#D50000' },
};

export const CORES = {
  primaria: '#176B5D',
  primariaClara: '#248575',
  fundo: '#F4F7F6',
  superficie: '#FFFFFF',
  erro: '#B00020',
  texto: '#1F2D2A',
  textoSecundario: '#62706D',
  borda: '#DDE6E3',
  camada: 'rgba(0, 0, 0, 0.42)',
};

export const ROTULOS_POLUENTES: Record<string, { nome: string; unidade: string }> = {
  pm2_5: { nome: 'Material particulado fino', unidade: 'µg/m³' },
  pm10: { nome: 'Material particulado', unidade: 'µg/m³' },
  co: { nome: 'Monóxido de carbono', unidade: 'µg/m³' },
  no2: { nome: 'Dióxido de nitrogênio', unidade: 'µg/m³' },
  o3: { nome: 'Ozônio', unidade: 'µg/m³' },
  so2: { nome: 'Dióxido de enxofre', unidade: 'µg/m³' },
};
