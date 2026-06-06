import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ListaRotas } from '../tipos';
import { CartaoPoluente } from '../componentes/CartaoPoluente';
import { SeloQualidadeAr } from '../componentes/SeloQualidadeAr';
import { CORES, ROTULOS_POLUENTES } from '../constantes';

type Propriedades = {
  route: RouteProp<ListaRotas, 'QualidadeAr'>;
};

export function TelaQualidadeAr({ route }: Propriedades) {
  const { qualidadeAr } = route.params;

  const poluentes = Object.entries(qualidadeAr.componentes).map(([chave, valor]) => ({
    chave,
    nome: ROTULOS_POLUENTES[chave]?.nome ?? chave,
    unidade: ROTULOS_POLUENTES[chave]?.unidade ?? '',
    valor: valor as number | null,
  }));

  return (
    <View style={styles.tela}>
      <Text style={styles.cidade}>{qualidadeAr.cidade}</Text>
      <SeloQualidadeAr indice={qualidadeAr.aqi} rotulo={qualidadeAr.rotuloAqi} cor={qualidadeAr.corAqi} />
      <Text style={styles.tituloSecao}>Poluentes atmosféricos</Text>
      <FlatList
        data={poluentes}
        keyExtractor={(item) => item.chave}
        renderItem={({ item }) => (
          <CartaoPoluente nome={item.nome} valor={item.valor} unidade={item.unidade} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 24,
    backgroundColor: CORES.fundo,
  },
  cidade: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CORES.texto,
    marginBottom: 12,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: '600',
    color: CORES.textoSecundario,
    marginTop: 20,
    marginBottom: 8,
  },
});
