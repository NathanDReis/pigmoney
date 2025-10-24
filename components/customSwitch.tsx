import React from "react";
import { 
    View, 
    TouchableOpacity, 
    StyleSheet 
} from "react-native";

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function CustomSwitch({ value, onValueChange }: CustomSwitchProps) {
  return (
    <TouchableOpacity
      style={[styles.toggleButton, value ? styles.toggleAtivo : styles.toggleDesativado]}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.toggleCircle,
          value ? styles.toggleCircleAtivo : styles.toggleCircleDesativado,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    width: 50,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    padding: 3,
  },
  toggleAtivo: {
    backgroundColor: '#f85a69',
    alignItems: 'flex-end',
  },
  toggleDesativado: {
    backgroundColor: '#ccc',
    alignItems: 'flex-start',
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
  toggleCircleAtivo: {
    shadowColor: '#f85a69',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  toggleCircleDesativado: {},
});

export default CustomSwitch;