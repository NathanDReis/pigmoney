import { DrawerToggleButton } from '@react-navigation/drawer';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors } from '@/constants';
import { useAuth } from '@/context/AuthProvider';

export function Header({ page, children }: { page?:string, children?: React.ReactNode }) {
  const { user } = useAuth();
  
  return (
    <View style={styles.header}>
        <View>
          <Image
            style={styles.img}
            source={require("@/assets/pig.jpeg")}
          />
        </View>

        <View style={styles.user}>
          {!page ? (
            <>
              <Text style={styles.hi}>Olá,</Text>
              <Text style={styles.userName}>{ user ? user.userName : 'Pig Money'}</Text>
            </>
          ) : (
            <Text style={styles.page}>{page}</Text>
          )}
        </View>

        <DrawerToggleButton />
        {children}
      </View>
    );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 150,
    padding: 16,
    paddingTop: 40,
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 7,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  user: {
    flex: 1,
  },
  hi: {
    fontSize: 14,
    color: colors.white
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white
  },
  page: {
    fontSize: 18,
    letterSpacing: 2,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.white
  },
});