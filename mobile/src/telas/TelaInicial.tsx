import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SeletorComBusca } from '../componentes/SeletorComBusca';
import { ESTADOS_BRASIL, CORES } from '../constantes';
import { obterCidadesPorEstado } from '../servicos/servicoLocalidades';
import { obterResumo } from '../servicos/servicoResumo';
import { Cidade, ErroApi, Estado, ListaRotas } from '../tipos';

type Navegacao = StackNavigationProp<ListaRotas, 'Inicio'>;

interface Propriedades {
  navigation: Navegacao;
}

export function TelaInicial({ navigation }: Propriedades) {
  const [estadoSelecionado, definirEstadoSelecionado] = useState<Estado | null>(null);
  const [cidadeSelecionada, definirCidadeSelecionada] = useState<Cidade | null>(null);
  const [cidades, definirCidades] = useState<Cidade[]>([]);
  const [carregandoCidades, definirCarregandoCidades] = useState(false);
  const [consultando, definirConsultando] = useState(false);

  async function selecionarEstado(estado: Estado) {
    definirEstadoSelecionado(estado);
    definirCidadeSelecionada(null);
    definirCidades([]);
    definirCarregandoCidades(true);

    try {
      const lista = await obterCidadesPorEstado(estado);
      definirCidades(lista);
    } catch {
      Alert.alert('Erro', 'Não foi possível carregar as cidades deste estado.');
    } finally {
      definirCarregandoCidades(false);
    }
  }

  async function consultar() {
    if (!estadoSelecionado || !cidadeSelecionada) {
      Alert.alert('Atenção', 'Selecione o estado e a cidade.');
      return;
    }

    definirConsultando(true);

    try {
      const dados = await obterResumo(cidadeSelecionada.nome, estadoSelecionado);
      navigation.navigate('Resumo', {
        cidade: `${cidadeSelecionada.nome} - ${estadoSelecionado.sigla}`,
        dados,
      });
    } catch (erro) {
      const erroApi = erro as ErroApi;
      Alert.alert('Erro', erroApi.erro ?? 'Não foi possível consultar os dados agora.');
    } finally {
      definirConsultando(false);
    }
  }

  const podeConsultar = !!estadoSelecionado && !!cidadeSelecionada && !consultando;

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>ArLimpo</Text>
      <Text style={styles.subtitulo}>Qualidade do ar e clima em cidades brasileiras</Text>

      <SeletorComBusca
        titulo="Estado"
        valor={estadoSelecionado}
        itens={ESTADOS_BRASIL}
        textoVazio="Selecione um estado"
        textoBusca="Buscar estado"
        aoSelecionar={selecionarEstado}
      />

      {!!estadoSelecionado && (
        <SeletorComBusca
          titulo="Cidade"
          valor={cidadeSelecionada}
          itens={cidades}
          textoVazio={carregandoCidades ? 'Carregando cidades' : 'Selecione uma cidade'}
          textoBusca="Buscar cidade"
          carregando={carregandoCidades}
          desabilitado={carregandoCidades || cidades.length === 0}
          aoSelecionar={definirCidadeSelecionada}
        />
      )}

      <TouchableOpacity
        style={[styles.botao, !podeConsultar && styles.botaoDesabilitado]}
        onPress={consultar}
        disabled={!podeConsultar}
      >
        {consultando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Consultar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkSobre} onPress={() => navigation.navigate('Sobre')}>
        <Text style={styles.textoSobre}>Sobre o aplicativo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 24,
    backgroundColor: CORES.fundo,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: CORES.primaria,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 15,
    color: CORES.textoSecundario,
    textAlign: 'center',
    marginBottom: 34,
  },
  botao: {
    backgroundColor: CORES.primaria,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 2,
  },
  botaoDesabilitado: {
    backgroundColor: CORES.primariaClara,
    opacity: 0.55,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkSobre: {
    marginTop: 24,
    alignItems: 'center',
  },
  textoSobre: {
    color: CORES.primaria,
    fontSize: 14,
    fontWeight: '600',
  },
});
