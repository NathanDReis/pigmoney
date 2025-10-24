import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#777d9b',
        tabBarStyle: { backgroundColor: '#1d1f25' },
        sceneStyle: {
          backgroundColor: '#1d1f25',
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Feather name='home' size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='reports'
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ color }) => (
            <Feather name='bar-chart' size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color }) => (
            <Feather name='clock' size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='investments'
        options={{
          title: 'Investimentos',
          tabBarIcon: ({ color }) => (
            <Feather name='trending-up' size={20} color={color} />
          ),
        }}
      />
    </Tabs>
    
  );
}
