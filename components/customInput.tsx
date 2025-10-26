import { colors } from '@/constants';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

interface CustomInputProps extends TextInputProps {
  icon?: keyof typeof Feather.glyphMap;
  label?: string;
  error?: string;
  isPassword?: boolean;
  maskType?: 'phone';
}

export function CustomInput({
  icon,
  label,
  error,
  isPassword = false,
  maskType,
  value,
  onChangeText,
  ...props
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const applyPhoneMask = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    // Aplica a máscara de telefone brasileiro
    if (numbers.length <= 10) {
      // Formato: (XX) XXXX-XXXX
      return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      // Formato: (XX) XXXXX-XXXX
      return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15); // Limita o tamanho máximo
    }
  };

  const handleChangeText = (text: string) => {
    if (!onChangeText) return;

    if (maskType === 'phone') {
      const maskedText = applyPhoneMask(text);
      onChangeText(maskedText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        error && styles.inputContainerError
      ]}>
        {icon && (
          <Feather 
            name={icon} 
            size={20} 
            color={error ? '#ef4444' : '#999'} 
            style={styles.inputIcon} 
          />
        )}
        
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onChangeText={handleChangeText}
          keyboardType={maskType === 'phone' ? 'phone-pad' : props.keyboardType}
          {...props}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputContainerError: {
    borderColor: '#ef4444',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  eyeIcon: {
    padding: 5,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
    marginLeft: 4,
  },
});