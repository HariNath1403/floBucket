import * as helper from './helper.js';

/*
export const allGoals = {
  1: {
    active: true,
    content: {
      main: 'IT Courses',
      sub: {
        milestones: [
          'Complete JavaScript Course',
          'Complete Node Js Course',
          'Complete Flask Course',
        ],
        current: [100, 49, 2],
        total: [100, 100, 80],
        completion: [],
      },
      overall: null,
      icon: 'coding',
    },
  },
  2: {
    active: true,
    content: {
      main: 'KAPS Exam',
      sub: {
        milestones: [
          'Registration & Preparation',
          'Complete the KAPS Exam',
          'Complete IELTS',
        ],
        current: [5, 0, 0],
        total: [6, 1, 1],
        completion: [],
      },
      overall: null,
      icon: 'pets',
    },
  },
  3: {
    active: true,
    content: {
      main: 'Non - Fiction',
      sub: {
        milestones: [
          'Complete 7 Personal Growth Books',
          'Complete 5 Fiction Books',
          'Read 2 Books on Marketing',
        ],
        current: [3.5, 0, 0],
        total: [7, 5, 2],
        completion: [],
      },
      overall: null,
      icon: 'reading',
    },
  },
  4: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
  5: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
};
*/
export const allGoals = {
  1: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
  2: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
  3: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
  4: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
  5: {
    active: false,
    content: {
      main: null,
      sub: {
        milestones: [null, null, null],
        current: [null, null, null],
        total: [null, null, null],
        completion: [],
      },
      overall: null,
      icon: null,
    },
  },
};

let recGoal;

export const getRange = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const values = JSON.parse(data.substr(47).slice(0, -2))['table']['rows'];

    const myRange = [];
    for (let i = 0; i < values.length; i++) {
      const val = values[i]['c'][0]['v'];
      myRange.push(val);
    }

    return myRange;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const postToGoogleSheets = async function (postUrl, arrExport) {
  try {
    const formData = new FormData();
    arrExport.forEach((val, index) => {
      formData.append(index, val);
    });

    const response = await fetch(postUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const jsonResp = await response.json();
      console.log('Response from Google Sheets:', jsonResp);
    } else {
      throw new Error('Failed to post data to Google Sheets');
    }
  } catch (err) {
    console.error('Error: ', err);
  }
};

const relayData = function (no, arr) {
  allGoals[no].content.sub.completion = [];
  allGoals[no].content.overall = null;

  allGoals[no].active = arr[0] === 'TRUE' ? true : false;
  allGoals[no].content.main = arr[1];
  allGoals[no].content.icon = arr[arr.length - 1];
  const refMilestones = arr[2].split(',');
  const status = refMilestones.every((no) => +no < 1);
  if (status) {
    allGoals[no].content.sub.milestones = [null, null, null];
    allGoals[no].content.sub.current = [null, null, null];
    allGoals[no].content.sub.total = [null, null, null];
  } else {
    allGoals[no].content.sub.milestones = arr[2].split(',');
    const valsCur = arr[3].split(',').map((no) => no * 1);
    const valsTotal = arr[4].split(',').map((no) => no * 1);
    allGoals[no].content.sub.current = valsCur;
    allGoals[no].content.sub.total = valsTotal;
  }
};

export const fetchMasterData = async function () {
  const arrFetched = await getRange(helper.loadUrl);
  for (let i = 0; i <= helper.LAST_ROW_GOALS - 7; i = i + 7) {
    const refNo = arrFetched[i] * 1;
    const refArr = [];

    for (let i = refNo * 7 - 6; i < refNo * 7; i++) {
      refArr.push(arrFetched[i]);
    }
    relayData(refNo, refArr);
  }
  // console.log(allGoals);
};

export const getFullDataObj = async function () {
  for (let i = 1; i <= 5; i++) {
    if (allGoals[i].active) {
      allGoals[i].content = calcPercentages(allGoals[i].content);
    }
  }
};

const calcPercentages = function (obj) {
  obj.sub.completion.length = 0;

  for (let i = 0; i < 3; i++) {
    const valCur = obj.sub.current[i];
    const valTotal = obj.sub.total[i];
    const completed = Math.round((valCur * 100) / valTotal, 0);
    obj.sub.completion.push(completed);
  }

  const valOverall = obj.sub.completion.reduce((acc, val) => acc + val, 0);
  obj.overall = Math.round(valOverall / 3, 0);

  return obj;
};

export const updateGoal = async function (no, obj) {
  allGoals[no].active = true;
  allGoals[no].content.main = obj.main;
  allGoals[no].content.sub.milestones = obj.milestones;
  allGoals[no].content.sub.current = obj.current;
  allGoals[no].content.sub.total = obj.total;
  allGoals[no].content.icon = obj.icon;

  console.log(allGoals);

  const arrToExport = [
    no,
    true,
    obj.main,
    obj.milestones,
    obj.current,
    obj.total,
    obj.icon,
  ];

  await postToGoogleSheets(helper.urlGoals, arrToExport);
};

const nullifyRec = async function (status, obj, no) {
  if (!status) return;
  obj.main = null;
  obj.sub.milestones = [null, null, null];
  obj.sub.current = [null, null, null];
  obj.sub.total = [null, null, null];
  obj.sub.completion = [];
  obj.overall = null;
  obj.icon = null;

  const arrToExport = [no, false, 0, [0, 0, 0], [0, 0, 0], [0, 0, 0], 0];

  await postToGoogleSheets(helper.urlGoals, arrToExport);
};

export const delRec = async function (no) {
  const deletion = true;
  allGoals[no].active = false;
  await nullifyRec(deletion, allGoals[no].content, no);
};

export const exportHabitsData = async function (num, date) {
  const arrToExport = [num, date];
  await postToGoogleSheets(helper.urlHabits, arrToExport);
};

export const loadHabitsData = async function () {
  const arrFetched = await getRange(helper.loadUrl);
  return arrFetched.slice(35, 40);
};
