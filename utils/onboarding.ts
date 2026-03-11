// utils/onboarding.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_complete';

/**
 * 개발 중에는 true로 유지 → 매번 온보딩 노출
 * 정상 흐름 테스트 시 false로 변경
 */
const DEV_FORCE_SHOW = false;

export async function hasCompletedOnboarding(): Promise<boolean> {
  if (__DEV__ && DEV_FORCE_SHOW) return false;

  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch {
    return false;
  }
}

export async function markOnboardingComplete(): Promise<void> {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (e) {
    console.warn('[onboarding] 저장 실패:', e);
  }
}

export async function resetOnboarding(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
  } catch (e) {
    console.warn('[onboarding] 리셋 실패:', e);
  }
}
