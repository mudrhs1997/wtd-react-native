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
            placeholderTextColor="#9ca3af"
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
            placeholderTextColor="#9ca3af"
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
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  kavWrapper: {
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e5e7eb',
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
    color: '#111827',
    letterSpacing: -0.4,
  },
  cancelText: {
    fontSize: 15,
    color: '#9ca3af',
    fontWeight: '500',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#f9fafb',
    marginBottom: 16,
  },
  questionInput: {
    height: 110,
    marginBottom: 6,
  },
  counter: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'right',
    marginBottom: 20,
  },
  submitBtn: {
    height: 52,
    backgroundColor: '#111827',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: '#e5e7eb',
  },
  submitText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
});
