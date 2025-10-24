import { Slot } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';

import { AuthProvider, useAuth } from '@/context/AuthProvider';

function AppContent() {
  const { loading } = useAuth();

  // Aguarda o provider estar pronto
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
}
