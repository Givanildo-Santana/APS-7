import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ListaRotas } from '../tipos';
import { SeloQualidadeAr } from '../componentes/SeloQualidadeAr';
import { CartaoClima } from '../componentes/CartaoClima';
import { CORES } from '../constantes';

type Navegacao = StackNavigationProp<ListaRotas, 'Resumo'>;
type Rota = RouteProp<ListaRotas, 'Resumo'>;

interface Propriedades {
  navigation: Navegacao;
  route: Rota;
}

export function TelaResumo({ navigation, route }: Propriedades) {
  const { dados } = route.params;
  const { qualidadeAr, clima } = dados;

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.cidade}>{qualidadeAr.cidade}</Text>

      <SeloQualidadeAr indice={qualidadeAr.aqi} rotulo={qualidadeAr.rotuloAqi} cor={qualidadeAr.corAqi} />

      <TouchableOpacity
        style={styles.botaoDetalhe}
        onPress={() => navigation.navigate('QualidadeAr', { qualidadeAr })}
      >
        <Text style={styles.textoDetalhe}>Ver qualidade do ar</Text>
      </TouchableOpacity>

      <CartaoClima
        temperatura={clima.temperatura}
        descricao={clima.descricao}
        umidade={clima.umidade}
      />

      <TouchableOpacity
        style={styles.botaoDetalhe}
        onPress={() => navigation.navigate('Clima', { clima })}
      >
        <Text style={styles.textoDetalhe}>Ver clima</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudo: {
    padding: 24,
  },
  cidade: {
    fontSize: 23,
    fontWeight: 'bold',
    color: CORES.texto,
    marginBottom: 16,
  },
  botaoDetalhe: {
    marginTop: 12,
    marginBottom: 24,
  },
  textoDetalhe: {
    color: CORES.primaria,
    fontSize: 15,
    fontWeight: '700',
  },
});
