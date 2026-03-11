// app/(tabs)/_layout.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OracleTabBar from '../../components/OracleTabBar';

function TopFade() {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[
        'rgba(220,221,216,1)',
        'rgba(220,221,216,0.72)',
        'rgba(220,221,216,0.25)',
        'rgba(220,221,216,0)',
      ]}
      locations={[0, 0.42, 0.72, 1]}
      style={[styles.topFade, { height: insets.top + 48 }]}
      pointerEvents="none"
    />
  );
}

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <OracleTabBar {...props} />}
      >
        <Tabs.Screen name="index" options={{ title: 'ASK' }} />
        <Tabs.Screen name="community" options={{ title: 'COMMUNITY' }} />
        <Tabs.Screen name="settings" options={{ title: 'PROFILE' }} />
      </Tabs>
      <TopFade />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});
