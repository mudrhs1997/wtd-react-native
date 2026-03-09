# Oracle — YES/NO AI App

A React Native app powered by Claude. Describe your situation, get exactly **YES** or **NO** — nothing else.

## Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 55 (managed workflow) |
| Navigation | Expo Router (file-based) |
| Language | TypeScript |
| AI | Anthropic Claude (`claude-haiku-4-5-20251001`) via REST |
| Runtime | React Native 0.83 / React 19 |

---

## Project Structure

```
├── app/
│   ├── _layout.tsx          # Root Stack navigator (header hidden)
│   └── index.tsx            # Main screen — holds all state
├── components/
│   ├── AnswerDisplay.tsx    # Animated YES (green) / NO (red) display
│   └── QuestionInput.tsx    # Multiline input + "Ask the Oracle" button
├── services/
│   └── claude.ts            # Anthropic API client (fetch-based, retry logic)
├── .env                     # API key (never committed)
└── app.json                 # Expo config (scheme, plugins)
```

---

## Getting Started

### 1. Prerequisites

- Node.js 18+
- Expo Go app on your phone, or Xcode/Android Studio for a simulator
- An [Anthropic API key](https://console.anthropic.com/)

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

Create a `.env` file in the project root:

```bash
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-YOUR_KEY_HERE
```

> The `EXPO_PUBLIC_` prefix is required — Expo uses it to expose the variable to the client bundle at build time.

### 4. Start the app

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `i` for iOS Simulator / `a` for Android emulator.

---

## How It Works

### API Call (`services/claude.ts`)

Calls the Anthropic Messages API directly via `fetch` — no SDK needed, which avoids Node.js polyfill issues in React Native.

```
POST https://api.anthropic.com/v1/messages
```

**Request:**
```json
{
  "model": "claude-haiku-4-5-20251001",
  "max_tokens": 5,
  "system": "You are a YES or NO oracle...",
  "messages": [{ "role": "user", "content": "<your question>" }]
}
```

**System prompt (strict YES/NO enforcement):**
```
You are a YES or NO oracle. When given any situation or question,
respond with exactly ONE word: either YES or NO.
Never explain. Never add punctuation. Never say anything else.
```

**Response handling:**
1. Trim and uppercase the response text
2. Validate it is exactly `"YES"` or `"NO"`
3. If not, retry the request once
4. If still invalid, throw an error shown to the user

### State flow (`app/index.tsx`)

```
user types question
  → answer resets to null
  → user taps "Ask the Oracle"
  → loading spinner shown, input disabled
  → askClaude() called
  → on success: answer set to YES | NO, fade-in animation plays
  → on error: error message shown below input
```

---

## Components

### `QuestionInput`

| Prop | Type | Description |
|---|---|---|
| `value` | `string` | Current text value |
| `onChangeText` | `(text: string) => void` | Called on every keystroke |
| `onSubmit` | `() => void` | Called when button tapped |
| `loading` | `boolean` | Disables input + shows spinner |

### `AnswerDisplay`

| Prop | Type | Description |
|---|---|---|
| `answer` | `'YES' \| 'NO' \| null` | Answer to display (null = hidden) |

- Fades in over 400ms using `Animated.Value`
- Green (`#16a34a`) for YES, red (`#dc2626`) for NO

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `EXPO_PUBLIC_ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |

> **Security note:** Embedding an API key in the client bundle is fine for personal/demo use. For production, route requests through a backend proxy so the key is never exposed.

---

## Security Considerations

- `.env` is listed in `.gitignore` — never committed
- API key is validated as non-empty before any network request
- `max_tokens: 5` limits response size and cost
- No user data is stored or logged

---

## Verification Checklist

- [ ] `npx expo start` launches without errors
- [ ] "Should I go to the gym today?" returns **YES** or **NO**
- [ ] Spinner shows while request is in-flight, input is disabled
- [ ] Typing a new question clears the previous answer
- [ ] Missing API key shows a clear error message
- [ ] Ambiguous/unexpected Claude response triggers retry then error state
