import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/AuthProvider';
import { colors } from '@/src/constants';
import { 
  CustomInput,
  CustomSwitch,
  CustomButton
} from '@/src/components';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Register fields
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, senha);
      router.replace('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      console.error('As senhas não coincidem');
      return;
    }
    try {
      
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login');
  };

  const handleForgotPassword = () => {
    console.log('Esqueceu a senha');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Feather name="toggle-right" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/pig.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>{activeTab === 'login' ? 'Login' : 'Cadastro'}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Ao logar aqui, você concorda com nossos{' '}
        <Text style={styles.link}>Termos e Política de Privacidade</Text>
      </Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'login' && styles.activeTab]}
          onPress={() => setActiveTab('login')}
        >
          <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'register' && styles.activeTab]}
          onPress={() => setActiveTab('register')}
        >
          <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'login' ? (
        <>
          {/* Email Input */}
          <CustomInput 
            icon="mail" 
            placeholder="Insira seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password Input */}
          <CustomInput 
            isPassword={true}
            icon='lock'
            placeholder="Sua senha"
            value={senha}
            onChangeText={setSenha}
          />

          {/* Remember Me & Forgot Password */}
          <View style={styles.optionsContainer}>
            <View style={styles.rememberMeContainer}>
              <CustomSwitch
                value={rememberMe}
                onValueChange={setRememberMe}
              />
              <Text style={styles.rememberMeText}>lembrar senha</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <CustomButton
            onPress={handleLogin}
            title="Login"
          />
        </>
      ) : (
        <>
          {/* Nome Completo Input */}
          <CustomInput 
            icon="user" 
            placeholder="Nome completo"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            autoCapitalize="words"
          />

          {/* Email Input */}
          {/* Email Input */}
          <CustomInput 
            icon="mail" 
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />          

          {/* Nome de Usuário Input */}
          <CustomInput 
            icon="at-sign" 
            placeholder="Nome de usuário"
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
            autoCapitalize="none"
          />

          {/* Criar Senha Input */}
          <CustomInput 
            isPassword={true}
            icon='lock'
            placeholder="Criar senha"
            value={senha}
            onChangeText={setSenha}
          />

          {/* Confirmar Senha Input */}
          <CustomInput 
            isPassword={true}
            icon='lock'
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />

          {/* Register Button */}
          <CustomButton
            onPress={handleRegister}
            title="Cadastrar"
          />
        </>
      )}

      {/* Divider */}
      <Text style={styles.divider}>conectar com outras</Text>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <CustomButton
          onPress={handleFacebookLogin}
          icon="facebook"
          iconColor="#1877F2"
          color={colors.white}
          isShadow={true}
          variant="circle"
        />
        <CustomButton
          onPress={handleGoogleLogin}
          iconColor="#DB4437"
          color={colors.white}
          variant="circle"
          isShadow={true}
          title="G"
        />
      </View>

      {/* Decorative Wave */}
      <View style={styles.waveContainer}>
        <View style={styles.wave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  toggleButton: {
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 18,
  },
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.text,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 8,
  },
  forgotPassword: {
    fontSize: 13,
    color: colors.primary,
  },
  divider: {
    textAlign: 'center',
    fontSize: 13,
    color: '#999',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    transform: [{ scaleX: 2 }],
  },
});