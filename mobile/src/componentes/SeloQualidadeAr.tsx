import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Propriedades {
  indice: number;
  rotulo: string;
  cor: string;
}

export function SeloQualidadeAr({ indice, rotulo, cor }: Propriedades) {
  return (
    <View style={[styles.caixa, { backgroundColor: cor }]}>
      <Text style={styles.indice}>{indice}</Text>
      <Text style={styles.rotulo}>{rotulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
    minWidth: 104,
  },
  indice: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  rotulo: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
    marginTop: 2,
  },
});
