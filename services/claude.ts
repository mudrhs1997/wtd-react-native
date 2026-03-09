const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== 'false';

export type AnswerResult = {
  answer: string;
  reason: string;
};

type MockRule = {
  pattern: RegExp;
  yes: AnswerResult;
  no: AnswerResult;
};

const MOCK_RULES: MockRule[] = [
  {
    pattern: /읽/,
    yes: { answer: '읽어', reason: '읽으면 분명 남는 게 있어' },
    no: { answer: '읽지마', reason: '지금 네 시간이 더 소중해' },
  },
  {
    pattern: /볼까|볼지|봐야/,
    yes: { answer: '봐', reason: '한 번쯤은 볼 만한 가치가 있어' },
    no: { answer: '보지마', reason: '시간 아까워, 다른 걸 해' },
  },
  {
    pattern: /갈까|가야|가볼/,
    yes: { answer: '가', reason: '가면 후회 안 할 거야' },
    no: { answer: '가지마', reason: '굳이 지금 안 가도 돼' },
  },
  {
    pattern: /살까|사야|구매/,
    yes: { answer: '사', reason: '지금 아니면 후회할 것 같은데' },
    no: { answer: '사지마', reason: '지갑이 먼저야' },
  },
  {
    pattern: /먹/,
    yes: { answer: '먹어', reason: '먹고 싶을 땐 먹는 게 맞아' },
    no: { answer: '먹지마', reason: '나중에 더 맛있는 거 먹어' },
  },
  {
    pattern: /연락|전화|문자/,
    yes: { answer: '연락해', reason: '먼저 손 내미는 게 용기야' },
    no: { answer: '연락하지마', reason: '상대방도 준비가 필요할 수 있어' },
  },
  {
    pattern: /잘까|자야|잠/,
    yes: { answer: '자', reason: '몸이 쉬라고 하면 쉬어야 해' },
    no: { answer: '자지마', reason: '조금만 더 버텨봐' },
  },
  {
    pattern: /운동|헬스|달리/,
    yes: { answer: '해', reason: '움직이면 분명 기분이 나아져' },
    no: { answer: '쉬어', reason: '오늘은 몸이 회복할 시간이 필요해' },
  },
];

const FALLBACK_PAIRS: AnswerResult[][] = [
  [
    { answer: '해', reason: '망설일 시간에 그냥 하는 게 나아' },
    { answer: '하지마', reason: '직감이 하지 말라고 하잖아' },
  ],
  [
    { answer: '좋아', reason: '생각보다 잘 될 거야' },
    { answer: '별로야', reason: '더 나은 선택지가 있을 것 같아' },
  ],
  [
    { answer: '고고', reason: '일단 부딪혀 봐야 알아' },
    { answer: '그만둬', reason: '억지로 하면 결과도 안 좋아' },
  ],
  [
    { answer: '당연하지', reason: '이게 맞는 방향이야' },
    { answer: '절대안돼', reason: '지금은 아닌 것 같아' },
  ],
];

async function mockAnswer(question: string): Promise<AnswerResult> {
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));

  const matched = MOCK_RULES.find((rule) => rule.pattern.test(question));
  const isYes = Math.random() < 0.5;

  if (matched) {
    return isYes ? matched.yes : matched.no;
  }

  const pair = FALLBACK_PAIRS[Math.floor(Math.random() * FALLBACK_PAIRS.length)];
  return isYes ? pair[0] : pair[1];
}

const SYSTEM_PROMPT = `당신은 매우 간결한 조언자입니다. 사용자의 질문에 대해 아래 JSON 형식으로만 답변하세요.

{"answer": "짧은 답변", "reason": "한 줄 이유"}

규칙:
- answer: 2~5글자의 매우 짧은 한국어 (예: 해, 하지마, 읽어, 읽지마, 가, 가지마)
- reason: 15글자 이내의 짧은 이유 (예: 지금이 딱 좋은 타이밍이야)
- JSON 외 다른 텍스트는 절대 포함하지 마세요`;

const API_URL = 'https://api.anthropic.com/v1/messages';

async function callClaude(question: string): Promise<AnswerResult> {
  const apiKey = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('EXPO_PUBLIC_ANTHROPIC_API_KEY is not set');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 80,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: question }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error ${response.status}: ${error}`);
  }

  const data = await response.json();
  const text: string = data.content?.[0]?.text ?? '';
  const parsed = JSON.parse(text.trim());

  if (!parsed.answer || !parsed.reason) {
    throw new Error('응답 형식이 올바르지 않습니다.');
  }

  return { answer: parsed.answer, reason: parsed.reason };
}

export async function askClaude(question: string): Promise<AnswerResult> {
  if (USE_MOCK) {
    return mockAnswer(question);
  }

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
}
