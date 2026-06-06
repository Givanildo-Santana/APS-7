import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ListaRotas } from '../tipos';
import { CORES } from '../constantes';

type Propriedades = {
  route: RouteProp<ListaRotas, 'Clima'>;
};

interface Linha {
  rotulo: string;
  valor: string;
}

export function TelaClima({ route }: Propriedades) {
  const { clima } = route.params;

  const linhas: Linha[] = [
    { rotulo: 'Temperatura', valor: `${clima.temperatura.toFixed(1)} °C` },
    { rotulo: 'Sensação térmica', valor: `${clima.sensacaoTermica.toFixed(1)} °C` },
    { rotulo: 'Umidade', valor: `${clima.umidade} %` },
    { rotulo: 'Vento', valor: `${clima.vento.toFixed(1)} km/h` },
    { rotulo: 'Pressão', valor: `${clima.pressao} hPa` },
    { rotulo: 'Condição', valor: clima.descricao },
  ];

  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.cidade}>{clima.cidade}</Text>
      {linhas.map((linha) => (
        <View key={linha.rotulo} style={styles.linha}>
          <Text style={styles.rotulo}>{linha.rotulo}</Text>
          <Text style={styles.valor}>{linha.valor}</Text>
        </View>
      ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: CORES.texto,
    marginBottom: 24,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
  },
  rotulo: {
    fontSize: 14,
    color: CORES.textoSecundario,
    flex: 1,
    paddingRight: 12,
  },
  valor: {
    fontSize: 14,
    fontWeight: '600',
    color: CORES.texto,
    textTransform: 'capitalize',
    flexShrink: 1,
    textAlign: 'right',
  },
});
