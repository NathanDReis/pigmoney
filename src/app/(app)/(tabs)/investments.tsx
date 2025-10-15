import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '@/src/components/header';
import { Feather } from '@expo/vector-icons';
import { 
  Container, 
  DrawerSceneWrapper 
} from '@/src/components';

// Mock Data
const INVESTIMENTOS_SUGERIDOS = [
  { 
    id: '1', 
    nome: 'Tesouro Selic', 
    rendimento: '13.75%', 
    risco: 'Baixo',
    valorMinimo: 30.00,
    tipo: 'Renda Fixa'
  },
  { 
    id: '2', 
    nome: 'CDB Banco Inter', 
    rendimento: '14.50%', 
    risco: 'Baixo',
    valorMinimo: 100.00,
    tipo: 'Renda Fixa'
  },
  { 
    id: '3', 
    nome: 'Fundo Multimercado', 
    rendimento: '18.20%', 
    risco: 'Moderado',
    valorMinimo: 500.00,
    tipo: 'Fundo'
  },
  { 
    id: '4', 
    nome: 'ETF IVVB11', 
    rendimento: '12.80%', 
    risco: 'Moderado',
    valorMinimo: 200.00,
    tipo: 'Ações'
  },
];

const MEUS_INVESTIMENTOS = [
  {
    id: '1',
    nome: 'Tesouro Selic',
    valorInvestido: 1500.00,
    rendimentoAtual: 187.50,
    percentualGanho: 12.5,
    dataInvestimento: '2024-06-15'
  },
  {
    id: '2',
    nome: 'CDB Nubank',
    valorInvestido: 2000.00,
    rendimentoAtual: 280.00,
    percentualGanho: 14.0,
    dataInvestimento: '2024-05-20'
  },
];

// Tipos
type InvestimentoSugerido = {
  id: string;
  nome: string;
  rendimento: string;
  risco: string;
  valorMinimo: number;
  tipo: string;
};

type MeuInvestimento = {
  id: string;
  nome: string;
  valorInvestido: number;
  rendimentoAtual: number;
  percentualGanho: number;
  dataInvestimento: string;
};

// Componente: Card de Investimento Sugerido
const InvestimentoSugeridoCard = ({ item }: { item: InvestimentoSugerido }) => {
  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'Baixo': return '#2ecc71';
      case 'Moderado': return '#f39c12';
      case 'Alto': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <TouchableOpacity style={styles.investimentoCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.investimentoNome}>{item.nome}</Text>
        <View style={[styles.riscoBadge, { backgroundColor: getRiscoColor(item.risco) }]}>
          <Text style={styles.riscoText}>{item.risco}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Rendimento (a.a.):</Text>
          <Text style={styles.rendimentoText}>{item.rendimento}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Valor mínimo:</Text>
          <Text style={styles.valorText}>
            {item.valorMinimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.tipoText}>{item.tipo}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.investirButton}>
        <Text style={styles.investirButtonText}>Investir</Text>
        <Feather name="arrow-right" size={16} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// Componente: Card dos Meus Investimentos
const MeuInvestimentoCard = ({ item }: { item: MeuInvestimento }) => {
  const ganhoPositivo = item.rendimentoAtual > 0;
  
  return (
    <View style={styles.meuInvestimentoCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.investimentoNome}>{item.nome}</Text>
        <Text style={styles.dataInvestimento}>{item.dataInvestimento}</Text>
      </View>
      
      <View style={styles.valoresContainer}>
        <View style={styles.valorInfo}>
          <Text style={styles.valorLabel}>Investido</Text>
          <Text style={styles.valorInvestido}>
            {item.valorInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
        
        <View style={styles.valorInfo}>
          <Text style={styles.valorLabel}>Rendimento</Text>
          <Text style={[styles.rendimentoValor, ganhoPositivo ? styles.ganho : styles.perda]}>
            {item.rendimentoAtual.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
          <Text style={[styles.percentualGanho, ganhoPositivo ? styles.ganho : styles.perda]}>
            ({ganhoPositivo ? '+' : ''}{item.percentualGanho.toFixed(1)}%)
          </Text>
        </View>
      </View>
    </View>
  );
};

// Componente: Resumo dos Investimentos
const ResumoInvestimentos = () => {
  const totalInvestido = MEUS_INVESTIMENTOS.reduce((acc, inv) => acc + inv.valorInvestido, 0);
  const totalRendimento = MEUS_INVESTIMENTOS.reduce((acc, inv) => acc + inv.rendimentoAtual, 0);
  const totalPatrimonio = totalInvestido + totalRendimento;

  return (
    <View style={styles.resumoContainer}>
      <Text style={styles.resumoTitulo}>Meu Portfólio</Text>
      
      <View style={styles.resumoRow}>
        <View style={styles.resumoItem}>
          <Text style={styles.resumoLabel}>Total Investido</Text>
          <Text style={styles.resumoValor}>
            {totalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
        
        <View style={styles.resumoItem}>
          <Text style={styles.resumoLabel}>Rendimento</Text>
          <Text style={[styles.resumoValor, styles.ganho]}>
            +{totalRendimento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
      </View>
      
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Patrimônio Total</Text>
        <Text style={styles.totalValor}>
          {totalPatrimonio.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>
    </View>
  );
};

// Tela principal de Investimentos
export default function Investments() {
  return (
    <DrawerSceneWrapper>
      <Container>
        <Header page='Investimentos' />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ResumoInvestimentos />
          
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Meus Investimentos</Text>
            {MEUS_INVESTIMENTOS.map(item => (
              <MeuInvestimentoCard key={item.id} item={item} />
            ))}
          </View>
          
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>Investimentos Recomendados</Text>
            <Text style={styles.secaoSubtitulo}>
              Baseado no seu perfil e objetivos financeiros
            </Text>
            {INVESTIMENTOS_SUGERIDOS.map(item => (
              <InvestimentoSugeridoCard key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </Container>
    </DrawerSceneWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  // Resumo
  resumoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resumoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resumoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resumoItem: {
    flex: 1,
  },
  resumoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  resumoValor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  totalValor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  
  // Seções
  secao: {
    marginTop: 25,
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  secaoSubtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  
  // Cards dos Meus Investimentos
  meuInvestimentoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  investimentoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dataInvestimento: {
    fontSize: 12,
    color: '#888',
  },
  valoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valorInfo: {
    flex: 1,
  },
  valorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  valorInvestido: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rendimentoValor: {
    fontSize: 16,
    fontWeight: '600',
  },
  percentualGanho: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  ganho: {
    color: '#2ecc71',
  },
  perda: {
    color: '#e74c3c',
  },
  
  // Cards de Investimentos Sugeridos
  investimentoCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  riscoBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riscoText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  cardBody: {
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  rendimentoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
  },
  valorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  tipoText: {
    fontSize: 14,
    color: '#333',
  },
  investirButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  investirButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});