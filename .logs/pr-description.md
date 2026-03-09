# PR: feat(rn): add onboarding, tab navigation, and community screen

> **Branch:** `feature/app-restructure` → `develop`

---

## Summary

앱 전체 구조를 재설계하고 3가지 핵심 기능을 추가합니다.
온보딩 플로우(4단계), 탭 기반 네비게이션, 커뮤니티 YES/NO 투표 화면을 구현했습니다.

## Changes

- [x] RN screen/component implemented
- [ ] Design spec added (`design/<feature>.md`)
- [ ] Backend endpoint implemented
- [ ] Tests added
- [ ] Reviewed by RN Agent

### 커밋 상세
| 커밋 | 내용 |
|---|---|
| `chore(rn)` | @react-native-async-storage/async-storage 의존성 추가 |
| `feat(rn)` | 4단계 온보딩 화면 + 첫 실행 감지 (DEV_FORCE_SHOW 플래그) |
| `feat(rn)` | Stack > Tabs 구조 전환, 채팅·커뮤니티·설정 3탭 구성 |
| `feat(rn)` | 커뮤니티 탭: 고민 피드 + YES/NO 투표 + 스프링 버튼 애니메이션 |

## How to Test

1. `npm start` 또는 `expo start`로 앱 실행
2. **온보딩 확인**
   - `utils/onboarding.ts`의 `DEV_FORCE_SHOW = true` 상태에서 앱 실행 → 온보딩 노출
   - 4단계 슬라이드 이동, 건너뛰기/시작하기 동작 확인
   - `DEV_FORCE_SHOW = false`로 변경 후 재실행 → 온보딩 1회만 표시 확인
3. **탭 네비게이션 확인**
   - 하단 탭 3개 (채팅 / 커뮤니티 / 설정) 전환
4. **커뮤니티 투표 확인**
   - YES / NO 버튼 클릭 → 스프링 바운스 애니메이션
   - 투표 후 결과 바 reveal 애니메이션
   - 동일 버튼 재클릭 → 투표 취소
   - `+` 버튼 → 고민 작성 모달 → 피드 상단 추가

## Screenshots

<!-- 온보딩 / 커뮤니티 탭 스크린샷 첨부 -->

## Related Issues

<!-- Closes # -->
