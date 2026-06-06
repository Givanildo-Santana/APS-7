import axios from 'axios';
import { Cidade, Estado } from '../tipos';

const clienteIbge = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
  timeout: 12000,
});

interface MunicipioIbge {
  id: number;
  nome: string;
}

export async function obterCidadesPorEstado(estado: Estado): Promise<Cidade[]> {
  const resposta = await clienteIbge.get<MunicipioIbge[]>(`/estados/${estado.sigla}/municipios`, {
    params: { orderBy: 'nome' },
  });

  return resposta.data.map((municipio) => ({
    id: municipio.id,
    nome: municipio.nome,
  }));
}
