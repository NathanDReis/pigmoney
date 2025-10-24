// Cole este código em: src/components/SaldoCard.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { colors } from '@/constants';

export default function SaldoCard() {
  // Dados falsos
  const saldo = 4500.75;
  const receitas = 5000.00;
  const despesas = 499.25;

  return (
    <View style={styles.card}>
      <View style={styles.saldoContainer}>
        <Text style={styles.saldoLabel}>Saldo do Período</Text>
        <Text style={styles.saldoValor}>
          {saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>
      </View>

      <View style={styles.detalhesContainer}>
        {/* Seção de Receitas */}
        <View style={styles.detalheItem}>
          <Feather name="arrow-up-circle" size={24} color="#2ecc71" />
          <View style={styles.detalheTexto}>
            <Text style={styles.detalheLabel}>Receitas</Text>
            <Text style={[styles.detalheValor, styles.receita]}>
              {receitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>

        {/* Seção de Despesas */}
        <View style={styles.detalheItem}>
          <Feather name="arrow-down-circle" size={24} color="#e74c3c" />
          <View style={styles.detalheTexto}>
            <Text style={styles.detalheLabel}>Despesas</Text>
            <Text style={[styles.detalheValor, styles.despesa]}>
              {despesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  saldoContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 15,
  },
  saldoLabel: {
    color: '#000',
    fontSize: 16,
  },
  saldoValor: {
    color: '#000',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  detalhesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detalheItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detalheTexto: {
    marginLeft: 10,
  },
  detalheLabel: {
    color: '#000',
    fontSize: 14,
  },
  detalheValor: {
    fontSize: 18,
    fontWeight: '600',
  },
  receita: {
    color: '#2ecc71',
  },
  despesa: {
    color: '#e74c3c',
  },
});