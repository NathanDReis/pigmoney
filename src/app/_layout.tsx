import { Slot } from 'expo-router';

import { AuthProvider } from '@/src/context/AuthProvider';
import { SQLiteProvider } from '@/src/context/SQLiteProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SQLiteProvider>
        <Slot />
      </SQLiteProvider>
    </AuthProvider>
  );
}
