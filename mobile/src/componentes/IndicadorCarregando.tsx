import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { CORES } from '../constantes';

export function IndicadorCarregando() {
  return (
    <View style={styles.caixa}>
      <ActivityIndicator size="large" color={CORES.primaria} />
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CORES.fundo,
  },
});
