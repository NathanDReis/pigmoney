import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants';

type ContainerProps = {
  children: ReactNode;
  style?: object;
};

export function Container({ children, style }: ContainerProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});