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
    pattern: /read|book/i,
    yes: { answer: 'Read it', reason: "You'll definitely get something out of it" },
    no: { answer: 'Skip it', reason: 'Your time matters more right now' },
  },
  {
    pattern: /watch|see|movie|show/i,
    yes: { answer: 'Watch it', reason: "It's worth seeing at least once" },
    no: { answer: 'Skip it', reason: 'Not worth your time, do something else' },
  },
  {
    pattern: /go|visit|attend/i,
    yes: { answer: 'Go', reason: "You won't regret going" },
    no: { answer: 'Stay', reason: 'No need to go right now' },
  },
  {
    pattern: /buy|purchase|get/i,
    yes: { answer: 'Buy it', reason: "You'll regret it if you don't" },
    no: { answer: "Don't buy", reason: 'Your wallet comes first' },
  },
  {
    pattern: /eat|food|meal|lunch|dinner|breakfast/i,
    yes: { answer: 'Eat it', reason: "Eat when you're craving it" },
    no: { answer: 'Skip it', reason: 'Save it for something tastier later' },
  },
  {
    pattern: /call|text|contact|message|reach/i,
    yes: { answer: 'Reach out', reason: 'It takes courage to reach out first' },
    no: { answer: 'Hold off', reason: 'They might need space too' },
  },
  {
    pattern: /sleep|nap|rest/i,
    yes: { answer: 'Sleep', reason: 'Rest when your body tells you to' },
    no: { answer: 'Stay up', reason: 'Hang in there a little longer' },
  },
  {
    pattern: /workout|exercise|gym|run/i,
    yes: { answer: 'Do it', reason: 'Moving will definitely lift your mood' },
    no: { answer: 'Rest', reason: 'Your body needs time to recover' },
  },
];

const FALLBACK_PAIRS: AnswerResult[][] = [
  [
    { answer: 'Go for it', reason: 'Just doing it beats hesitating' },
    { answer: "Don't do it", reason: 'Your gut is saying no' },
  ],
  [
    { answer: 'Sounds good', reason: "It'll turn out better than you think" },
    { answer: 'Not really', reason: 'There might be a better option' },
  ],
  [
    { answer: "Let's go", reason: 'You gotta try to find out' },
    { answer: 'Stop it', reason: "Forced effort won't get results" },
  ],
  [
    { answer: 'Absolutely', reason: 'This is the right direction' },
    { answer: 'No way', reason: "Doesn't feel right for now" },
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

const SYSTEM_PROMPT = `You are a very concise advisor. Respond to the user's question only in the following JSON format.

{"answer": "short answer", "reason": "one-line reason"}

Rules:
- answer: a very short response in 2-5 words in English (e.g., Do it, Don't do it, Read it, Skip it, Go, Stay)
- reason: a short reason within 15 words (e.g., Now is the perfect timing)
- Do not include any text outside of JSON`;

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
    throw new Error('Invalid response format.');
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
    console.warn('[askClaude] First attempt failed, retrying…', firstError);
    try {
      return await callClaude(question);
    } catch (retryError) {
      console.error('[askClaude] Retry also failed:', retryError);
      throw retryError;
    }
  }
}
