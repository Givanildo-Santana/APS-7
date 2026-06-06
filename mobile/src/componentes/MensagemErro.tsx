import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CORES } from '../constantes';

interface Propriedades {
  mensagem: string;
}

export function MensagemErro({ mensagem }: Propriedades) {
  return (
    <View style={styles.caixa}>
      <Text style={styles.texto}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    padding: 16,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: CORES.erro,
  },
  texto: {
    color: CORES.erro,
    fontSize: 14,
    lineHeight: 20,
  },
});
