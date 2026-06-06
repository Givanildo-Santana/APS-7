import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TelaInicial } from '../telas/TelaInicial';
import { TelaResumo } from '../telas/TelaResumo';
import { TelaQualidadeAr } from '../telas/TelaQualidadeAr';
import { TelaClima } from '../telas/TelaClima';
import { TelaSobre } from '../telas/TelaSobre';
import { ListaRotas } from '../tipos';
import { CORES } from '../constantes';

const Pilha = createStackNavigator<ListaRotas>();

export function NavegadorApp() {
  return (
    <NavigationContainer>
      <Pilha.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: { backgroundColor: CORES.primaria },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Pilha.Screen name="Inicio" component={TelaInicial} options={{ title: 'ArLimpo' }} />
        <Pilha.Screen name="Resumo" component={TelaResumo} options={{ title: 'Resumo ambiental' }} />
        <Pilha.Screen name="QualidadeAr" component={TelaQualidadeAr} options={{ title: 'Qualidade do ar' }} />
        <Pilha.Screen name="Clima" component={TelaClima} options={{ title: 'Clima' }} />
        <Pilha.Screen name="Sobre" component={TelaSobre} options={{ title: 'Sobre o ArLimpo' }} />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}
