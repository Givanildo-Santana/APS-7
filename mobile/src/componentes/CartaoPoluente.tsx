import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CORES } from '../constantes';

interface Propriedades {
  nome: string;
  valor: number | null;
  unidade: string;
}

export function CartaoPoluente({ nome, valor, unidade }: Propriedades) {
  return (
    <View style={styles.caixa}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.valor}>
        {valor !== null ? `${valor.toFixed(2)} ${unidade}` : 'Indisponível'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: CORES.superficie,
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
  },
  nome: {
    fontSize: 14,
    color: CORES.textoSecundario,
    flex: 1,
    paddingRight: 12,
  },
  valor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: CORES.texto,
  },
});
