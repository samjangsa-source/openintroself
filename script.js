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
    answer: '지원동기는 “왜 이 회사인지”와 “왜 이 사람이 필요한지”를 함께 보여주는 문항입니다.\n\n예시:\n저는 문제를 해결하는 과정에서 성취감을 느끼는 사람입니다. 특히 사용자의 불편을 정확히 파악하고, 실질적인 개선을 만들어내는 일에 흥미를 느꼈습니다. 귀사의 서비스가 사용자에게 실질적인 도움을 주는 방향과 제가 가진 역량이 잘 맞는다고 생각해 지원하게 되었습니다.',
    tips: '회사명, 직무와의 연결, 본인의 경험을 함께 넣어 주세요.'
  },
  성장과정: {
    answer: '성장과정은 “어떤 경험을 통해 어떤 태도를 갖게 되었는지”를 보여주면 좋습니다.\n\n예시:\n학창 시절 다양한 프로젝트와 팀 활동을 통해 책임감과 협업의 중요성을 배웠습니다. 어려운 상황에서도 끝까지 해결하려는 태도를 익혔고, 스스로 배우는 습관을 길러왔습니다. 이러한 경험은 지금의 직무 태도와 연결됩니다.',
    tips: '단순한 일화보다, 그 경험이 만든 가치관을 함께 적어 주세요.'
  },
  강점: {
    answer: '강점은 “내 강점이 무엇인지”와 “실제로 어떻게 발휘했는지”를 함께 적는 것이 중요합니다.\n\n예시:\n저의 가장 큰 강점은 문제를 끝까지 파고드는 끈기입니다. 이전 경험에서는 새로운 도구를 빠르게 익혀 업무 효율을 높였고, 협업 과정에서 의견을 조율하며 좋은 결과를 만들어낸 경험이 있습니다.',
    tips: '강점 1개를 골라서 실제 사례로 뒷받침해 주세요.'
  },
  '협업 경험': {
    answer: '협업 경험은 “누구와, 어떤 역할을, 어떤 결과를 만들었는지”를 쓰면 이해하기 쉽습니다.\n\n예시:\n팀 프로젝트에서 저는 일정 조율과 역할 분배를 맡으며 원활한 소통을 이끌었습니다. 서로 다른 의견이 있을 때는 공통 목표를 기준으로 조율해 프로젝트를 성공적으로 마무리할 수 있었습니다.',
    tips: '본인의 역할과 팀의 성과를 함께 드러내 주세요.'
  },
  '입사 후 포부': {
    answer: '입사 후 포부는 “회사에서 무엇을 배우고, 어떤 성과를 내고 싶나”를 중심으로 쓰면 좋습니다.\n\n예시:\n입사 후에는 맡은 업무를 깊이 이해하고, 실제 문제를 해결하는 과정에서 빠르게 성장하고 싶습니다. 특히 맡은 역할을 책임감 있게 수행하며 팀의 목표를 함께 이뤄내는 인재가 되겠습니다.',
    tips: '회사와 연결된 목표, 본인의 성장 방향을 함께 적어 주세요.'
  },
  '도전 경험': {
    answer: '도전 경험은 “어떤 어려움이 있었고, 어떻게 극복했는지”가 핵심입니다.\n\n예시:\n처음 맡은 프로젝트에서 일정이 빠듯했던 상황이 있었습니다. 제한된 시간 속에서도 우선순위를 정리하고 협업을 조율하며 문제를 해결해 결과를 만들 수 있었습니다. 이 경험을 통해 책임감과 대응력을 배울 수 있었습니다.',
    tips: '문제 상황, 해결 과정, 배운 점을 순서대로 적어 주세요.'
  },
  '실패 경험': {
    answer: '실패 경험은 “실패했지만 무엇을 배웠는지”를 보여주는 문항입니다.\n\n예시:\n한 번은 계획을 세우고도 기대한 만큼 성과를 내지 못한 경험이 있었습니다. 이후에는 목표를 더 작게 나누고, 피드백을 자주 받는 방식으로 개선해 나갔습니다. 이 경험은 문제를 바라보는 태도를 바꿔준 계기가 되었습니다.',
    tips: '부정적인 표현보다 배움 중심으로 쓰는 것이 좋습니다.'
  },
  '직무 적합성': {
    answer: '직무 적합성은 “왜 이 직무에 맞는지”를 구체적으로 드러내는 문항입니다.\n\n예시:\n저는 분석과 실행을 모두 중요하게 생각하는 사람입니다. 특히 데이터를 바탕으로 문제를 파악하고, 실행 가능한 해결책을 제안하는 과정에 관심이 있습니다. 이런 역량은 해당 직무에서 실질적으로 활용될 수 있다고 생각합니다.',
    tips: '직무 핵심 역량과 본인의 경험을 연결해 주세요.'
  },
  '문제 해결 능력': {
    answer: '문제 해결 능력은 “어떤 문제가 있었고, 어떻게 판단했는지, 어떤 결과를 만들었는지”를 보여주는 문항입니다.\n\n예시:\n업무 중 반복적으로 발생하던 오류를 확인하던 과정에서 원인을 빠르게 파악하고, 우선순위를 정리해 해결책을 적용한 경험이 있습니다. 이 과정에서 문제를 구조적으로 보는 습관을 기를 수 있었습니다.',
    tips: '문제 상황, 판단 기준, 해결 행동, 결과를 순서대로 적어 주세요.'
  },
  '리더십 경험': {
    answer: '리더십 경험은 “누군을 이끌었고, 어떤 변화를 만들었는지”가 핵심입니다.\n\n예시:\n팀 프로젝트에서 의견 조율이 필요한 상황이 있었고, 저는 일정과 역할을 분배하며 각자의 장점을 살릴 수 있도록 분위기를 정리했습니다. 그 결과 협업 속도가 높아졌고, 프로젝트를 무사히 마무리할 수 있었습니다.',
    tips: '본인이 한 역할과 팀에 미친 변화를 함께 적어 주세요.'
  },
  '학습 능력': {
    answer: '학습 능력은 “새로운 것을 어떤 방식으로 익혔고, 실제로 활용했는지”를 보여주는 문항입니다.\n\n예시:\n새로운 툴을 배우는 과정에서 기본 개념을 먼저 이해한 뒤, 실제 업무에 바로 적용해 보았습니다. 그 과정에서 익숙하지 않은 환경에서도 빠르게 적응하는 능력이 필요하다는 점을 배웠습니다.',
    tips: '배우는 방식과 실제 적용 결과를 같이 적으면 설득력이 높습니다.'
  },
  가치관: {
    answer: '가치관은 “내가 무엇을 중요하게 생각하는지”를 자연스럽게 드러내는 문항입니다.\n\n예시:\n저는 책임감과 배려를 바탕으로 일하는 사람이라는 점을 중요하게 생각합니다. 누구보다 먼저 맡은 일을 끝까지 책임지고, 함께 일하는 사람을 배려하는 태도를 지키고 싶습니다.',
    tips: '가치관을 단순히 말하기보다, 실제 행동과 연결해서 적어 주세요.'
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
  if (lower.includes('도전') || lower.includes('극복') || lower.includes('어려움')) {
    return '도전 경험은 “어려운 상황이 있었고, 어떻게 해결했는지”를 중심으로 쓰면 좋습니다. 특히 본인이 한 행동과 결과를 함께 적어 주세요.';
  }
  if (lower.includes('직무') || lower.includes('적합')) {
    return '직무 적합성은 본인의 역량과 회사의 요구가 어떻게 연결되는지 보여주는 문항입니다. 직무 핵심 역량과 실제 경험을 함께 넣어 주세요.';
  }
  if (lower.includes('문제') || lower.includes('해결')) {
    return '문제 해결 능력은 실제 상황에서 어떤 판단을 했는지와 결과를 함께 적는 것이 중요합니다. 문제의 원인, 행동, 결과 순서로 정리해 보세요.';
  }
  if (lower.includes('리더') || lower.includes('주도') || lower.includes('이끌')) {
    return '리더십 경험은 본인이 어떤 역할을 했고, 그로 인해 팀이나 조직에 어떤 변화가 있었는지를 보여주는 문항입니다.';
  }
  if (lower.includes('배움') || lower.includes('학습') || lower.includes('습득')) {
    return '학습 능력은 새로운 것을 익힌 과정과 실제 적용 경험을 함께 적어야 합니다. “배운 것 → 적용한 것 → 결과” 흐름이 좋습니다.';
  }
  if (lower.includes('가치') || lower.includes('철학') || lower.includes('신념')) {
    return '가치관은 단순한 말보다, 실제 행동이나 선택과 연결해서 쓰면 더 설득력이 있습니다.';
  }
  return '예를 들면 “지원동기”, “강점”, “협업 경험”, “성장과정”, “도전 경험”, “실패 경험”, “직무 적합성”, “문제 해결 능력”, “리더십 경험”, “학습 능력”, “가치관”처럼 문항 키워드를 입력해 주세요. 제가 그에 맞는 답변 예시를 바로 만들어 드릴게요.';
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
