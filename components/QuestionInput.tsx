import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onFocusChange?: (focused: boolean) => void;
  loading: boolean;
};

export default function QuestionInput({
  value,
  onChangeText,
  onSubmit,
  onFocusChange,
  loading,
}: Props) {
  const canSubmit = value.trim().length > 0 && !loading;

  return (
    <View style={styles.container}>
      <View style={styles.inputCard}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="type your question here..."
          placeholderTextColor={COLORS.textMuted}
          multiline
          editable={!loading}
          returnKeyType="default"
          onFocus={() => onFocusChange?.(true)}
          onBlur={() => onFocusChange?.(false)}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!canSubmit}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={canSubmit ? COLORS.gradCta : ['#D5D8CE', '#D5D8CE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.bg} />
          ) : (
            <Text style={[styles.buttonText, !canSubmit && styles.buttonTextDisabled]}>
              ASK THE ORACLE
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 12,
  },
  inputCard: {
    borderWidth: 1,
    borderColor: COLORS.borderGold,
    borderRadius: 16,
    backgroundColor: COLORS.bgCard,
    minHeight: 110,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    fontSize: 16,
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  button: {
    borderRadius: 29,
    overflow: 'hidden',
    height: 58,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.bg,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2.5,
  },
  buttonTextDisabled: {
    color: COLORS.textAccent,
  },
});
