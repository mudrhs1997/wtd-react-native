// app/(tabs)/settings.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface SettingRowProps {
  icon: IoniconsName;
  label: string;
  value?: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  isLast?: boolean;
}

function SettingRow({
  icon,
  label,
  value,
  hasToggle,
  toggleValue,
  onToggle,
  isLast,
}: SettingRowProps) {
  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      activeOpacity={hasToggle ? 1 : 0.6}
    >
      <View style={styles.rowIcon}>
        <Ionicons name={icon} size={18} color={COLORS.textAccent} />
      </View>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        {value && <Text style={styles.rowValue}>{value}</Text>}
        {hasToggle && (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: COLORS.bgTrack, true: COLORS.textAccent }}
            thumbColor={COLORS.textLight}
          />
        )}
        {!hasToggle && !value && (
          <Ionicons name="chevron-forward" size={16} color={COLORS.textAccent} />
        )}
      </View>
    </TouchableOpacity>
  );
}

interface SettingSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBox}>{children}</View>
    </View>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = React.useState(true);
  const [haptics, setHaptics] = React.useState(true);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.heading}>Settings</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile card */}
        <TouchableOpacity style={styles.profileCard} activeOpacity={0.7}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color={COLORS.textAccent} />
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Login required</Text>
            <Text style={styles.profileSub}>Tap to log in</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textAccent} />
        </TouchableOpacity>

        <SettingSection title="General">
          <SettingRow
            icon="notifications-outline"
            label="Notifications"
            hasToggle
            toggleValue={notifications}
            onToggle={setNotifications}
          />
          <SettingRow
            icon="phone-portrait-outline"
            label="Haptic Feedback"
            hasToggle
            toggleValue={haptics}
            onToggle={setHaptics}
          />
          <SettingRow
            icon="language-outline"
            label="Language"
            value="English"
            isLast
          />
        </SettingSection>

        <SettingSection title="App Info">
          <SettingRow
            icon="information-circle-outline"
            label="Version"
            value="1.0.0"
          />
          <SettingRow
            icon="document-text-outline"
            label="Terms of Service"
          />
          <SettingRow
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            isLast
          />
        </SettingSection>

        <SettingSection title="Feedback">
          <SettingRow
            icon="star-outline"
            label="Rate the App"
          />
          <SettingRow
            icon="chatbox-outline"
            label="Send Feedback"
            isLast
          />
        </SettingSection>
      </ScrollView>

      {/* 상단 그라디언트 — 마지막에 두어 z-order 최상위 */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.borderTabBar,
    padding: 16,
    gap: 14,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.bgCardAlt,
    borderWidth: 1,
    borderColor: COLORS.borderGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  profileSub: {
    fontSize: 13,
    color: COLORS.textAccent,
    marginTop: 2,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textAccent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    paddingHorizontal: 4,
  },
  sectionBox: {
    backgroundColor: COLORS.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderTabBar,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.borderTabBar,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.bgCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowValue: {
    fontSize: 14,
    color: COLORS.textAccent,
  },
});
