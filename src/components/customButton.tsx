import React from 'react';
import { 
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    TouchableOpacityProps, 
    ViewStyle 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/src/constants';

type ButtonVariant = 'square' | 'rounded' | 'circle';

type CustomButtonProps = TouchableOpacityProps & {
  title?: string;
  onPress: () => void;
  color?: string;
  icon?: keyof typeof Feather.glyphMap;
  iconSize?: number;
  iconColor?: string;
  variant?: ButtonVariant;
  style?: ViewStyle;
  isShadow?: boolean;
};

export function CustomButton({ 
  title, 
  onPress, 
  color = colors.primary,
  icon,
  iconSize = 20,
  iconColor = colors.white,
  variant = 'rounded',
  style,
  isShadow = false,
  ...props 
}: CustomButtonProps) {
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'square':
        return styles.squareButton;
      case 'rounded':
        return styles.roundedButton;
      case 'circle':
        return styles.circleButton;
      default:
        return styles.roundedButton;
    }
  };

  const isCircle = variant === 'circle';

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        getButtonStyle(),
        { backgroundColor: color },
        isCircle && styles.circleContainer,
        isShadow && styles.shadowContainer,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      {icon && (
        <Feather 
          name={icon} 
          size={iconSize} 
          color={iconColor}
          style={title && !isCircle ? styles.iconWithText : undefined}
        />
      )}
      {title && (
        <Text style={[styles.buttonText, { color: iconColor }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  squareButton: {
    borderRadius: 4,
  },
  roundedButton: {
    borderRadius: 8,
  },
  circleButton: {
    borderRadius: 50,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  circleContainer: {
    width: 50,
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconWithText: {
    marginRight: 8,
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});