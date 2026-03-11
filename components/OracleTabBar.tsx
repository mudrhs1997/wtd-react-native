// components/OracleTabBar.tsx
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconsName; inactive: IoniconsName }> = {
  index: { active: 'sparkles', inactive: 'sparkles-outline' } as any,
  community: { active: 'people', inactive: 'people-outline' },
  settings: { active: 'person', inactive: 'person-outline' },
};

const TAB_LABELS: Record<string, string> = {
  index: 'ASK',
  community: 'COMMUNITY',
  settings: 'PROFILE',
};

export default function OracleTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom + 9 }]}>
      <LinearGradient
        colors={[
          'rgba(220,221,216,0)',
          'rgba(220,221,216,0.25)',
          'rgba(220,221,216,0.72)',
          'rgba(220,221,216,1)',
        ]}
        locations={[0, 0.28, 0.58, 1]}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      <View style={styles.pill}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label = TAB_LABELS[route.name] ?? route.name.toUpperCase();
          const iconSet = TAB_ICONS[route.name];
          const iconName: IoniconsName = isFocused
            ? (iconSet?.active ?? 'ellipse')
            : (iconSet?.inactive ?? 'ellipse-outline');

          function onPress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.85}
              style={[styles.tabItem, isFocused && styles.tabItemActive]}
            >
              <Ionicons
                name={iconName}
                size={18}
                color={isFocused ? COLORS.textPrimary : COLORS.textInactive}
              />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 21,
    paddingTop: 28,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgTabBar,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.borderTabBar,
    height: 62,
    padding: 4,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 26,
    gap: 3,
  },
  tabItemActive: {
    backgroundColor: COLORS.textAccent,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textInactive,
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
});
