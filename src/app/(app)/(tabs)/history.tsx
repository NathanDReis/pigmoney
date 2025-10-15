import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
} from 'react-native';
import { Header } from '@/src/components/header';
import SaldoCard from '@/src/components/SaldoCard';
import { 
  Container, 
  DrawerSceneWrapper 
} from '@/src/components';

//  Mock Data
const DADOS_TRANSACOES: Transacao[] = [
  { id: '1', descricao: 'Salário de Setembro', valor: 4500.00, data: '2025-09-05', tipo: 'receita' },
  { id: '2', descricao: 'Compras no Supermercado', valor: -350.75, data: '2025-09-06', tipo: 'despesa' },
  { id: '3', descricao: 'Conta de Luz', valor: -120.50, data: '2025-09-10', tipo: 'despesa' },
  { id: '4', descricao: 'Venda de item usado', valor: 150.00, data: '2025-09-12', tipo: 'receita' },
  { id: '5', descricao: 'Cinema com a família', valor: -95.00, data: '2025-09-14', tipo: 'despesa' },
  { id: '6', descricao: 'Gasolina', valor: -180.00, data: '2025-09-18', tipo: 'despesa' },
  { id: '7', descricao: 'Mensalidade da faculdade', valor: -780.00, data: '2025-09-20', tipo: 'despesa' },
] 

// Tipos de dados
type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: 'receita' | 'despesa';
};

// Componente: Item da Lista
const TransacaoItem = ({ item }: { item: Transacao }) => {
  const corDoValor = item.tipo === 'receita' ? styles.valorReceita : styles.valorDespesa;

  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemDescricao}>{item.descricao}</Text>
        <Text style={styles.itemData}>{item.data}</Text>
      </View>
      <Text style={[styles.itemValor, corDoValor]}>
        {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </View>
  );
};

// Tela principal do Histórico
export default function History() {
  return (
    <DrawerSceneWrapper>
      <Container>
        <Header page='Histórico' />

        <SaldoCard />

        <Text style={styles.titulo}>Últimas Transações</Text>
        
        <ScrollView contentContainerStyle={styles.listContainer}>
          {DADOS_TRANSACOES.map(item => (
            <TransacaoItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </Container>
    </DrawerSceneWrapper>
  );
}

// Passo 4: Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemDescricao: {
    fontSize: 16,
    fontWeight: '500',
    color: '#444',
  },
  itemData: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  itemValor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  valorReceita: {
    color: '#2ecc71', // Verde
  },
  valorDespesa: {
    color: '#e74c3c', // Vermelho
  },
});