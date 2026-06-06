import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { CORES } from '../constantes';

export function TelaSobre() {
  return (
    <ScrollView style={styles.tela} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Sobre o ArLimpo</Text>

      <Text style={styles.corpo}>
        O ArLimpo reúne informações de qualidade do ar e clima para consulta rápida
        das condições ambientais de cidades brasileiras.
      </Text>

      <Text style={styles.tituloSecao}>Fontes de dados</Text>
      <Text style={styles.corpo}>
        IBGE para estados e municípios. Open-Meteo para localização, clima e qualidade do ar.
      </Text>

      <Text style={styles.tituloSecao}>Informações exibidas</Text>
      <Text style={styles.corpo}>
        Índice de qualidade do ar, material particulado, gases atmosféricos,
        temperatura, umidade, pressão e vento.
      </Text>
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
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: CORES.primaria,
    marginBottom: 16,
  },
  tituloSecao: {
    fontSize: 15,
    fontWeight: 'bold',
    color: CORES.texto,
    marginTop: 20,
    marginBottom: 6,
  },
  corpo: {
    fontSize: 14,
    color: CORES.textoSecundario,
    lineHeight: 22,
  },
});
