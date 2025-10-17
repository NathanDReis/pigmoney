import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthProvider';
import { useRouter } from 'expo-router';

export default function Layout() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <GestureHandlerRootView>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: 'transparent',
          drawerInactiveBackgroundColor: 'transparent',
          drawerInactiveTintColor: '#727d9b',
          drawerActiveTintColor: '#ffffff',
          drawerHideStatusBarOnOpen: true,
          overlayColor: 'transparent',
          drawerStyle: {
            backgroundColor: '#1d1f25',
            paddingTop: 32,
            width: '50%',
          },
          sceneStyle: {
            backgroundColor: '#1d1f25',
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Início',
            drawerIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: 'Notificações',
            drawerIcon: ({ color }) => (
              <Feather name="bell" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="setups"
          options={{
            drawerLabel: 'Configurações',
            drawerIcon: ({ color }) => (
              <Feather name="settings" size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={user ? 'logout' : 'login'}
          options={{
            drawerLabel: user ? 'Sair' : 'Entrar',
            drawerIcon: ({ color }) => (
              <Feather name={user ? 'log-out' : 'log-in'} size={20} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name={!user ? 'logout' : 'login'}
          options={{
            drawerLabel: user ? '' : '',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
