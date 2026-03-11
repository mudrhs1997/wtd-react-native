// components/community/ComposeModal.tsx
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (question: string, author: string) => void;
}

export default function ComposeModal({ visible, onClose, onSubmit }: Props) {
  const [question, setQuestion] = useState('');
  const [author, setAuthor] = useState('');
  const insets = useSafeAreaInsets();

  const canSubmit = question.trim().length >= 5 && author.trim().length >= 1;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit(question.trim(), author.trim());
    setQuestion('');
    setAuthor('');
    onClose();
  }

  function handleClose() {
    setQuestion('');
    setAuthor('');
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      {/* Background dim */}
      <Pressable style={styles.backdrop} onPress={handleClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.kavWrapper}
      >
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}>
          {/* Handle bar */}
          <View style={styles.handle} />

          <View style={styles.header}>
            <Text style={styles.title}>Post a Dilemma</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={12}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Nickname input */}
          <Text style={styles.label}>Nickname</Text>
          <TextInput
            style={styles.input}
            placeholder="ex. Curious1, Anonymous42"
            placeholderTextColor={COLORS.textMuted}
            value={author}
            onChangeText={setAuthor}
            maxLength={20}
            returnKeyType="next"
          />

          {/* Dilemma input */}
          <Text style={styles.label}>Dilemma</Text>
          <TextInput
            style={[styles.input, styles.questionInput]}
            placeholder={'Write your dilemma for\npeople to answer YES or NO.'}
            placeholderTextColor={COLORS.textMuted}
            value={question}
            onChangeText={setQuestion}
            multiline
            maxLength={200}
            textAlignVertical="top"
          />
          <Text style={styles.counter}>{question.length} / 200</Text>

          {/* Submit button */}
          <TouchableOpacity
            style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={!canSubmit}
          >
            <Text style={styles.submitText}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  kavWrapper: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.bgCard,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.borderGold,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.borderTabBar,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
  },
  cancelText: {
    fontSize: 15,
    color: COLORS.textAccent,
    fontWeight: '500',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textAccent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.borderGold,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.bgCardAlt,
    marginBottom: 16,
  },
  questionInput: {
    height: 110,
    marginBottom: 6,
  },
  counter: {
    fontSize: 12,
    color: COLORS.textAccent,
    textAlign: 'right',
    marginBottom: 20,
  },
  submitBtn: {
    height: 52,
    backgroundColor: COLORS.textAccent,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.bgTrack,
  },
  submitText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
    color: COLORS.bg,
  },
});
