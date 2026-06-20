const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const guideCards = document.querySelectorAll('.guide-card');
const fontDown = document.getElementById('fontDown');
const fontReset = document.getElementById('fontReset');
const fontUp = document.getElementById('fontUp');
const root = document.documentElement;
let fontScale = 1;

function applyFontScale() {
  root.style.setProperty('--font-scale', fontScale);
  root.style.fontSize = `${fontScale}rem`;
}

fontDown.addEventListener('click', () => {
  fontScale = Math.max(0.9, +(fontScale - 0.1).toFixed(1));
  applyFontScale();
});

fontReset.addEventListener('click', () => {
  fontScale = 1;
  applyFontScale();
});

fontUp.addEventListener('click', () => {
  fontScale = Math.min(1.3, +(fontScale + 0.1).toFixed(1));
  applyFontScale();
});

const answerMap = {
  지원동기: {
    answer: '지원동기는 “저는 문제를 해결하는 데 흥미가 있고, 회사가 추구하는 가치와 제가 가진 역량을 연결해 기여하고 싶습니다.”라는 흐름으로 작성하면 설득력이 높습니다.\n\n예시:\n저는 사용자 경험을 개선하는 과정에서 성취감을 느끼는 개발자입니다. 특히 문제를 정확히 파악하고 데이터를 기반으로 해결책을 찾는 과정에 강점을 가지고 있습니다. 귀사의 혁신적인 서비스와 성장 가능성에 매력을 느껴, 제가 가진 역량으로 실제로 성과를 만들어내고 싶습니다.',
    tips: '구체적인 경험, 회사와의 연결고리, 미래 기여 포인트를 함께 넣어 주세요.'
  },
  성장과정: {
    answer: '성장과정은 “어떤 경험을 통해 어떤 가치관을 갖게 되었는지” 중심으로 써야 합니다.\n\n예시:\n학창 시절 다양한 프로젝트와 팀 활동을 통해 책임감과 협업의 중요성을 배웠습니다. 어려운 상황에서도 끝까지 해결하려는 태도를 익히며, 스스로 학습하고 성장하는 사람이 되었습니다. 이러한 경험은 지금의 직무 태도와 연결됩니다.',
    tips: '단순한 일화보다, 그 경험이 만든 태도나 가치관을 함께 적어 주세요.'
  },
  강점: {
    answer: '강점은 “어떤 역량을 가지고 있고, 어떻게 활용했는지”를 함께 적으면 좋습니다.\n\n예시:\n저의 가장 큰 강점은 문제를 끝까지 파고드는 끈기와 빠른 학습력입니다. 이전 경험에서는 새로운 도구를 익혀 업무 효율을 높였고, 협업 과정에서 서로의 의견을 조율하며 결과를 끌어낸 경험이 있습니다.',
    tips: '강점 하나를 선택하고, 실제 사례로 뒷받침해 주세요.'
  },
  '협업 경험': {
    answer: '협업 경험은 “누구와, 어떤 역할을, 어떤 결과를 만들었는지”로 쓰면 좋습니다.\n\n예시:\n팀 프로젝트에서 저는 일정 조율과 역할 분배를 맡으며 원활한 소통을 이끌었습니다. 서로 다른 의견이 있을 때도 데이터와 공통 목표를 기준으로 의견을 정리해 프로젝트를 성공적으로 마무리할 수 있었습니다.',
    tips: '본인의 역할과 함께 팀의 성과를 명확히 드러내 주세요.'
  }
};

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getReply(userText) {
  const normalized = userText.trim();
  if (!normalized) return '질문이나 키워드를 입력해 주세요.';
  const lower = normalized.toLowerCase();
  for (const key of Object.keys(answerMap)) {
    if (lower.includes(key.toLowerCase()) || lower.includes(key.replaceAll(' ', '').toLowerCase())) {
      const item = answerMap[key];
      return `${item.answer}\n\n작성 팁: ${item.tips}`;
    }
  }
  if (lower.includes('지원') || lower.includes('동기') || lower.includes('포부')) {
    return '지원동기와 입사 후 포부는 “왜 이 회사에 필요한 사람인지”를 중심으로 작성해 주세요. 예를 들면, 회사의 비전과 본인의 경험을 연결해 구체적으로 적으면 좋습니다.';
  }
  if (lower.includes('실패') || lower.includes('아쉬움') || lower.includes('보완')) {
    return '실패 경험은 단순히 부정적인 사례가 아니라, 그 과정에서 무엇을 배웠는지를 드러내는 것이 중요합니다. “문제 상황 → 해결 노력 → 배운 점” 순서로 쓰면 자연스럽습니다.';
  }
  return '예를 들면 “지원동기”, “강점”, “협업 경험”, “성장과정”처럼 문항 키워드를 입력해 주세요. 제가 그에 맞는 답변 예시를 바로 만들어 드릴게요.';
}

guideCards.forEach((button) => {
  button.addEventListener('click', () => {
    const question = button.dataset.question;
    addMessage(question, 'user');
    addMessage(getReply(question), 'bot');
  });
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  addMessage(getReply(text), 'bot');
  userInput.value = '';
});
