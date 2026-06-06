import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CORES } from '../constantes';

interface ItemBusca {
  id: string | number;
  nome: string;
  detalhe?: string;
}

interface Propriedades<T extends ItemBusca> {
  titulo: string;
  valor?: T | null;
  itens: T[];
  textoVazio: string;
  textoBusca: string;
  desabilitado?: boolean;
  carregando?: boolean;
  aoSelecionar: (item: T) => void;
}

export function SeletorComBusca<T extends ItemBusca>({
  titulo,
  valor,
  itens,
  textoVazio,
  textoBusca,
  desabilitado = false,
  carregando = false,
  aoSelecionar,
}: Propriedades<T>) {
  const [aberto, definirAberto] = useState(false);
  const [busca, definirBusca] = useState('');

  const itensFiltrados = useMemo(() => {
    const termo = normalizar(busca);

    if (!termo) {
      return itens;
    }

    return itens.filter((item) => normalizar(`${item.nome} ${item.detalhe ?? ''}`).includes(termo));
  }, [busca, itens]);

  function abrir() {
    if (!desabilitado && !carregando) {
      definirBusca('');
      definirAberto(true);
    }
  }

  function selecionar(item: T) {
    aoSelecionar(item);
    definirAberto(false);
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.82}
        style={[styles.campo, desabilitado && styles.campoDesabilitado]}
        onPress={abrir}
        disabled={desabilitado || carregando}
      >
        <View style={styles.areaTexto}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={[styles.valor, !valor && styles.valorVazio]}>
            {valor ? valor.nome : textoVazio}
          </Text>
        </View>
        {carregando ? (
          <ActivityIndicator color={CORES.primaria} />
        ) : (
          <Text style={styles.icone}>⌕</Text>
        )}
      </TouchableOpacity>

      <Modal visible={aberto} animationType="slide" transparent onRequestClose={() => definirAberto(false)}>
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <View style={styles.cabecalho}>
              <Text style={styles.tituloModal}>{titulo}</Text>
              <TouchableOpacity onPress={() => definirAberto(false)} style={styles.botaoFechar}>
                <Text style={styles.textoFechar}>Fechar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.busca}>
              <Text style={styles.lupa}>⌕</Text>
              <TextInput
                value={busca}
                onChangeText={definirBusca}
                placeholder={textoBusca}
                placeholderTextColor={CORES.textoSecundario}
                style={styles.entradaBusca}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <FlatList
              data={itensFiltrados}
              keyExtractor={(item) => String(item.id)}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => selecionar(item)}>
                  <Text style={styles.nomeItem}>{item.nome}</Text>
                  {!!item.detalhe && <Text style={styles.detalheItem}>{item.detalhe}</Text>}
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={styles.semResultado}>Nenhum resultado encontrado.</Text>}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

function normalizar(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const styles = StyleSheet.create({
  campo: {
    minHeight: 68,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
    backgroundColor: CORES.superficie,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  campoDesabilitado: {
    opacity: 0.58,
  },
  areaTexto: {
    flex: 1,
    paddingRight: 12,
  },
  titulo: {
    fontSize: 12,
    color: CORES.textoSecundario,
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    color: CORES.texto,
    fontWeight: '700',
  },
  valorVazio: {
    color: CORES.textoSecundario,
    fontWeight: '500',
  },
  icone: {
    fontSize: 28,
    color: CORES.primaria,
    lineHeight: 30,
  },
  fundoModal: {
    flex: 1,
    backgroundColor: CORES.camada,
    justifyContent: 'flex-end',
  },
  modal: {
    maxHeight: '82%',
    backgroundColor: CORES.fundo,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 18,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CORES.texto,
  },
  botaoFechar: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  textoFechar: {
    color: CORES.primaria,
    fontWeight: '700',
  },
  busca: {
    height: 48,
    borderWidth: 1,
    borderColor: CORES.borda,
    borderRadius: 8,
    backgroundColor: CORES.superficie,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  lupa: {
    fontSize: 22,
    color: CORES.primaria,
    marginRight: 8,
  },
  entradaBusca: {
    flex: 1,
    fontSize: 16,
    color: CORES.texto,
    paddingVertical: 8,
  },
  item: {
    minHeight: 56,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CORES.borda,
    justifyContent: 'center',
  },
  nomeItem: {
    fontSize: 16,
    color: CORES.texto,
    fontWeight: '600',
  },
  detalheItem: {
    fontSize: 13,
    color: CORES.textoSecundario,
    marginTop: 2,
  },
  semResultado: {
    paddingVertical: 22,
    textAlign: 'center',
    color: CORES.textoSecundario,
  },
});
