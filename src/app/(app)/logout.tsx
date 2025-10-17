import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthProvider";

export default function Login() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut();
      router.replace('/');
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});