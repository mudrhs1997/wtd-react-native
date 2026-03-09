# 변경 이력 (Code Review 개선)

> 작성일: 2026-03-05  
> 기준: 코드 리뷰 결과 우선순위별 개선 작업

---

## 🔴 P1 — 필수 수정

### 1. `USE_MOCK` 하드코딩 제거 → 환경변수 기반으로 전환

**파일:** `services/claude.ts`, `.env`

**변경 전:**
```ts
const USE_MOCK = true;
```

**변경 후:**
```ts
const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== 'false';
```

**`.env` 추가 항목:**
```
# Mock 모드 비활성화 시 false로 변경 (기본값: true)
EXPO_PUBLIC_USE_MOCK=true
```

**이유:**  
`true`로 하드코딩된 경우 프로덕션 빌드 시에도 실제 API가 호출되지 않아 앱이 동작하지 않는 치명적 문제 발생. 환경변수로 관리하면 `.env` 파일 수정만으로 Mock/실제 모드를 전환할 수 있어 배포 안전성이 높아짐.

---

### 2. 재시도 로직 오류 메시지 소실 문제 수정

**파일:** `services/claude.ts`

**변경 전:**
```ts
try {
  return await callClaude(question);
} catch {
  const retry = await callClaude(question);
  return retry;
}
```

**변경 후:**
```ts
try {
  return await callClaude(question);
} catch (firstError) {
  console.warn('[askClaude] 첫 번째 시도 실패, 재시도 중…', firstError);
  try {
    return await callClaude(question);
  } catch (retryError) {
    console.error('[askClaude] 재시도도 실패:', retryError);
    throw retryError;
  }
}
```

**이유:**  
기존 코드는 첫 번째 오류를 `catch` 블록에서 묵살(swallow)하고, 재시도 실패 시에도 원래 오류 원인을 추적하기 어려웠음. 개선 후에는 첫 번째 실패 원인을 `warn`으로 기록하고, 재시도도 실패할 경우 두 번째 오류를 `error`로 기록한 뒤 전파함.

---

## 🟡 P2 — 권장 수정

### 3. `ChatItem.id` 타입 `number` → `string` + `crypto.randomUUID()` 교체

**파일:** `components/ChatView.tsx`, `app/index.tsx`

**변경 전 (ChatView.tsx):**
```ts
export type ChatItem = {
  id: number;
  ...
};
```

**변경 후 (ChatView.tsx):**
```ts
export type ChatItem = {
  id: string;
  ...
};
```

**변경 전 (app/index.tsx):**
```ts
id: Date.now(),
```

**변경 후 (app/index.tsx):**
```ts
id: crypto.randomUUID(),
```

**이유:**  
`Date.now()`는 밀리초 단위 타임스탬프로, 빠른 연속 제출 시 동일한 값이 생성될 수 있음. 같은 `key`를 가진 React 요소가 존재하면 렌더링 오류 또는 예기치 않은 UI 동작 발생. `crypto.randomUUID()`는 충돌 확률이 사실상 0에 수렴하는 표준 UUID v4를 생성하며, React Native 0.74+ 및 Hermes에서 기본 지원됨.

---

## 🟢 P3 — 선택 수정

### 4. 미사용 컴포넌트 삭제

**삭제된 파일:**
- `components/ConversationHistory.tsx` (1,632 bytes)
- `components/QuestionBubble.tsx` (1,493 bytes)

**이유:**  
두 파일 모두 `app/index.tsx`나 다른 컴포넌트에서 import되지 않는 데드 코드. `ChatView.tsx`가 동일한 역할을 대체하는 것으로 확인됨. 불필요한 파일은 유지보수 혼란을 야기하므로 제거.

---

### 5. 미사용 의존성 제거

**파일:** `package.json`

**제거된 패키지:**
- `react-native-reanimated` (`^4.2.1`)
- `react-native-worklets` (`0.7.2`)

**이유:**  
전체 코드베이스에서 `react-native-reanimated` API(예: `useSharedValue`, `useAnimatedStyle` 등)를 사용하는 코드가 없음. 순수 React Native `Animated` API만 사용 중. 미사용 패키지는 번들 크기 증가, 빌드 시간 연장, 보안 취약점 노출 위험을 수반하므로 제거.

> **주의:** `npm install`을 실행하여 `node_modules`와 `package-lock.json`을 동기화해야 함.

---

## 미처리 항목 (수동 대응 필요)

| 항목 | 이유 |
|---|---|
| API 키 서버 프록시 적용 | 백엔드 서버 구축이 필요한 아키텍처 변경으로, 코드 수정 범위를 벗어남. 프로덕션 배포 전 별도 작업 필요. |
| `AnswerDisplay` `useNativeDriver: false` 개선 | `fontSize` 애니메이션을 `transform: [{ scale }]`로 교체해야 `useNativeDriver: true` 사용 가능. UX 영향이 크므로 충분한 검증 후 별도 작업 권장. |

---

## 영향받은 파일 요약

| 파일 | 변경 유형 |
|---|---|
| `services/claude.ts` | 수정 |
| `.env` | 수정 |
| `components/ChatView.tsx` | 수정 |
| `app/index.tsx` | 수정 |
| `package.json` | 수정 |
| `components/ConversationHistory.tsx` | 삭제 |
| `components/QuestionBubble.tsx` | 삭제 |
