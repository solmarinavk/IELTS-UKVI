// Band-9 skeletons used by Structure Mode. Each box has a label, a short guide,
// sentence frames and (optionally) suggested connectors. These are GENERIC per
// type and are attached to real exercises in the Structure views.

// ---- TASK 1 ----------------------------------------------------------------
const T1_DATA = {
  boxes: [
    {
      id: 'intro', label: 'INTRODUCTION — Paraphrase',
      guide: 'Rephrase the rubric in your own words. Say what the visual shows, what it measures and the time/place. Do NOT copy the question.',
      frames: [
        'The [bar chart / line graph / table] illustrates …',
        'The [chart] compares … between [X] and [Y].',
        'The given [chart] provides information about …',
      ],
      connectors: ['illustrates', 'compares', 'provides information about', 'gives a breakdown of'],
    },
    {
      id: 'overview', label: 'OVERVIEW — Main trends (NO figures)',
      guide: 'State the 2–3 most striking features. Do NOT include any numbers here — this is what earns a high Task Achievement score.',
      frames: [
        'Overall, it is clear that …',
        'The most striking feature is that …',
        'In general, … while …',
        'It is noticeable that … throughout the period.',
      ],
      connectors: ['Overall', 'In general', 'It is clear that', 'The most striking feature'],
    },
    {
      id: 'body1', label: 'BODY PARAGRAPH 1 — Key details + figures',
      guide: 'Describe one group of the data with specific numbers and comparisons.',
      frames: [
        'To begin with, …',
        'Regarding [X], the figure stood at … in [year].',
        'In [year], [X] reached …, compared with … for [Y].',
        '[X] rose / fell to … over the period.',
      ],
      connectors: ['To begin with', 'Regarding', 'compared with', 'whereas'],
    },
    {
      id: 'body2', label: 'BODY PARAGRAPH 2 — Remaining details + figures',
      guide: 'Describe the rest of the data with figures and contrasts.',
      frames: [
        'In contrast, …',
        'Meanwhile, [Y] …',
        'By [year], [X] had reached …',
        'A similar / opposite trend can be seen in …',
      ],
      connectors: ['In contrast', 'Meanwhile', 'By [year]', 'Similarly'],
    },
  ],
}

const T1_PROCESS = {
  boxes: [
    {
      id: 'intro', label: 'INTRODUCTION — Paraphrase',
      guide: 'Say what the diagram shows and what is being produced or what natural process is depicted.',
      frames: [
        'The diagram illustrates the process by which …',
        'The flowchart shows how … is produced / made.',
        'The picture depicts the various stages of …',
      ],
      connectors: ['illustrates the process', 'shows how', 'depicts the stages of'],
    },
    {
      id: 'overview', label: 'OVERVIEW — Number of stages + start & end',
      guide: 'State how many main stages there are and where the process begins and ends (or that it is a continuous cycle).',
      frames: [
        'Overall, the process consists of [number] main stages, beginning with … and ending with …',
        'It is clear that there are [number] distinct steps in total.',
        'Overall, this is a natural cycle with no clear beginning or end.',
      ],
      connectors: ['Overall', 'consists of … stages', 'beginning with', 'ending with'],
    },
    {
      id: 'body1', label: 'BODY 1 — First stages (in sequence)',
      guide: 'Describe the first half of the process step by step, using sequencing language and the passive voice.',
      frames: [
        'At the first stage, …',
        'Firstly, … is …',
        'Next, … / After that, …',
        'Once this has happened, …',
      ],
      connectors: ['First', 'Next', 'After that', 'Subsequently', 'Then'],
    },
    {
      id: 'body2', label: 'BODY 2 — Final stages (in sequence)',
      guide: 'Describe the remaining steps through to the end of the process.',
      frames: [
        'Following this, …',
        'In the penultimate stage, …',
        'Finally, …',
        'At the final stage, … before the cycle begins again.',
      ],
      connectors: ['Following this', 'Subsequently', 'Finally', 'At the final stage'],
    },
  ],
}

const T1_MAP = {
  boxes: [
    {
      id: 'intro', label: 'INTRODUCTION — Paraphrase',
      guide: 'Say what the two maps show and the two points in time / states being compared.',
      frames: [
        'The two maps illustrate the changes that took place in … between [year] and [year].',
        'The maps compare … as it was in [year] and how it is today.',
      ],
      connectors: ['illustrate the changes', 'compare', 'between … and …'],
    },
    {
      id: 'overview', label: 'OVERVIEW — General change',
      guide: 'Summarise the overall transformation in one or two sentences. No detail yet.',
      frames: [
        'Overall, the area became far more …',
        'It is clear that the most significant change was …',
        'Overall, while some features remained unchanged, the area was transformed from … into …',
      ],
      connectors: ['Overall', 'was transformed into', 'the most significant change'],
    },
    {
      id: 'body1', label: 'BODY 1 — The original layout',
      guide: 'Describe where the main features were located in the first map.',
      frames: [
        'In [year], … was located in the … of the area.',
        'Originally, there was a … where the … now stands.',
        'To begin with, the … occupied the …',
      ],
      connectors: ['Originally', 'was located in', 'to the north / south of'],
    },
    {
      id: 'body2', label: 'BODY 2 — What changed',
      guide: 'Describe the changes, zone by zone, using change verbs.',
      frames: [
        'By [year], the … had been replaced by …',
        'The … was converted into …',
        'A new … was built in the …',
        '… was demolished to make way for …',
      ],
      connectors: ['was replaced by', 'was converted into', 'was demolished', 'a new … was built', 'remained unchanged'],
    },
  ],
}

export const TASK1_SKELETONS = { data: T1_DATA, process: T1_PROCESS, map: T1_MAP }

export function skeletonGroupForType(type) {
  if (type === 'process') return 'process'
  if (type === 'map') return 'map'
  return 'data' // bar, line, pie, table, mixed
}

// ---- TASK 2 ----------------------------------------------------------------
export const TASK2_SKELETONS = {
  opinion: {
    label: 'Opinion (agree / disagree)',
    boxes: [
      { id: 'intro', label: 'INTRODUCTION — Paraphrase + thesis', guide: 'Rephrase the statement, then give a clear opinion.',
        frames: ['It is sometimes argued that …', 'While some people believe that …, I …', 'In my opinion, I completely agree / disagree because …'],
        connectors: ['It is sometimes argued that', 'In my opinion', 'I completely agree / disagree'] },
      { id: 'body1', label: 'BODY 1 — Reason 1 + explanation + example', guide: 'Give your first reason, explain it, and support it with an example.',
        frames: ['The main reason for this is …', 'This is largely because …', 'For instance, …', 'As a result, …'],
        connectors: ['The main reason', 'This is because', 'For instance', 'Consequently'] },
      { id: 'body2', label: 'BODY 2 — Reason 2 + explanation + example', guide: 'Give a second, different reason with explanation and example.',
        frames: ['Another reason is …', 'Furthermore, …', 'A clear example is …', 'This can be seen in …'],
        connectors: ['Another reason', 'Furthermore', 'Moreover', 'A clear example'] },
      { id: 'conclusion', label: 'CONCLUSION — Restate your position', guide: 'Restate your opinion; do not add new ideas.',
        frames: ['In conclusion, I firmly believe that …', 'To sum up, …', 'For the reasons given above, …'],
        connectors: ['In conclusion', 'To sum up', 'For the reasons given'] },
    ],
  },
  discussion: {
    label: 'Discussion (both views + opinion)',
    boxes: [
      { id: 'intro', label: 'INTRODUCTION — Paraphrase both views', guide: 'Introduce the two views and say you will discuss both before giving your opinion.',
        frames: ['People hold different views about whether …', 'It is often argued whether … or …', 'This essay will discuss both views before giving my opinion.'],
        connectors: ['People hold different views', 'discuss both views', 'before giving my opinion'] },
      { id: 'body1', label: 'BODY 1 — View A', guide: 'Explain the first viewpoint and support it.',
        frames: ['On the one hand, …', 'Supporters of … argue that …', 'Those in favour believe that …', 'For example, …'],
        connectors: ['On the one hand', 'Supporters argue', 'For example'] },
      { id: 'body2', label: 'BODY 2 — View B + your opinion', guide: 'Explain the second viewpoint, then state which you find more convincing.',
        frames: ['On the other hand, …', 'Others contend that …', 'Personally, I believe that …', 'In my view, … because …'],
        connectors: ['On the other hand', 'Others contend', 'Personally, I believe'] },
      { id: 'conclusion', label: 'CONCLUSION', guide: 'Summarise both views and confirm your opinion.',
        frames: ['In conclusion, while both views have merit, …', 'To conclude, I am inclined to believe that …'],
        connectors: ['In conclusion', 'while both views have merit', 'I am inclined to believe'] },
    ],
  },
  advdis: {
    label: 'Advantages / Disadvantages',
    boxes: [
      { id: 'intro', label: 'INTRODUCTION — Paraphrase + thesis (which side weighs more)', guide: 'Introduce the topic and signal whether advantages or disadvantages dominate.',
        frames: ['These days, it is increasingly common for …', 'While this trend has clear benefits, it also carries drawbacks.', 'This essay will outline both sides before concluding that the advantages / disadvantages are greater.'],
        connectors: ['It is increasingly common', 'has clear benefits', 'also carries drawbacks'] },
      { id: 'body1', label: 'BODY 1 — Advantages', guide: 'Present the main advantage(s) with explanation and example.',
        frames: ['One major advantage is that …', 'The primary benefit is …', 'For instance, …', 'As a result, …'],
        connectors: ['One major advantage', 'The primary benefit', 'As a result'] },
      { id: 'body2', label: 'BODY 2 — Disadvantages', guide: 'Present the main disadvantage(s) with explanation and example.',
        frames: ['However, a significant drawback is that …', 'On the negative side, …', 'This can lead to …', 'A clear example is …'],
        connectors: ['However', 'a significant drawback', 'This can lead to'] },
      { id: 'conclusion', label: 'CONCLUSION — Weigh them up', guide: 'State clearly which side outweighs the other and why.',
        frames: ['Overall, the benefits outweigh / are outweighed by the drawbacks because …', 'In conclusion, despite some disadvantages, …'],
        connectors: ['Overall', 'outweigh', 'are outweighed by'] },
    ],
  },
  problem: {
    label: 'Problem & Solution / Causes & Solutions',
    boxes: [
      { id: 'intro', label: 'INTRODUCTION — Paraphrase the problem', guide: 'Introduce the issue and say you will examine its causes and solutions.',
        frames: ['In recent years, … has become a serious problem.', 'It is true that … is an increasing concern.', 'This essay will examine the main causes of this issue and suggest some solutions.'],
        connectors: ['has become a serious problem', 'examine the causes', 'suggest some solutions'] },
      { id: 'body1', label: 'BODY 1 — Causes / Problems', guide: 'Explain the main cause(s) of the problem.',
        frames: ['The primary cause of this is …', 'One of the main reasons is …', 'This is largely due to …', 'Consequently, …'],
        connectors: ['The primary cause', 'This is largely due to', 'Consequently'] },
      { id: 'body2', label: 'BODY 2 — Solutions', guide: 'Propose realistic solutions to address the causes.',
        frames: ['An effective solution would be to …', 'One measure that could be taken is …', 'Governments should …', 'If this were done, …'],
        connectors: ['An effective solution', 'Governments should', 'If this were done'] },
      { id: 'conclusion', label: 'CONCLUSION', guide: 'Summarise the problem and the proposed solutions.',
        frames: ['In conclusion, although … is a complex problem, …', 'To conclude, with appropriate measures, …'],
        connectors: ['In conclusion', 'with appropriate measures'] },
    ],
  },
  twopart: {
    label: 'Two-part / Direct questions',
    boxes: [
      { id: 'intro', label: 'INTRODUCTION — Paraphrase both questions', guide: 'Introduce the topic and signal that you will answer both questions.',
        frames: ['There is no doubt that …', 'This essay will address two questions: first, … and second, …'],
        connectors: ['This essay will address', 'first', 'second'] },
      { id: 'body1', label: 'BODY 1 — Answer to Question 1 + example', guide: 'Answer the first question fully and give an example.',
        frames: ['Regarding the first question, …', 'To begin with, …', 'For example, …'],
        connectors: ['Regarding the first question', 'To begin with', 'For example'] },
      { id: 'body2', label: 'BODY 2 — Answer to Question 2 + example', guide: 'Answer the second question fully and give an example.',
        frames: ['As for the second question, …', 'In my opinion, …', 'A good illustration of this is …'],
        connectors: ['As for the second question', 'In my opinion', 'A good illustration'] },
      { id: 'conclusion', label: 'CONCLUSION', guide: 'Briefly restate your answers to both questions.',
        frames: ['In conclusion, …', 'To summarise, …'],
        connectors: ['In conclusion', 'To summarise'] },
    ],
  },
}
