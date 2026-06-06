import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CORES } from '../constantes';

interface Propriedades {
  temperatura: number;
  descricao: string;
  umidade: number;
}

export function CartaoClima({ temperatura, descricao, umidade }: Propriedades) {
  return (
    <View style={styles.caixa}>
      <Text style={styles.temperatura}>{temperatura.toFixed(1)}°C</Text>
      <Text style={styles.descricao}>{descricao}</Text>
      <Text style={styles.umidade}>Umidade: {umidade}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    padding: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  temperatura: {
    fontSize: 36,
    fontWeight: 'bold',
    color: CORES.primaria,
  },
  descricao: {
    fontSize: 16,
    color: CORES.texto,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  umidade: {
    fontSize: 13,
    color: CORES.textoSecundario,
    marginTop: 6,
  },
});
