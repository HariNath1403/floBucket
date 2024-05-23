import * as model from './model.js';
import * as helper from './helper.js';
import goalsView from './views/goalsView.js';
import popUpView from './views/popUpView.js';
import habitsView from './views/habitsView.js';

// Variables
let popUpMsg;
let activeNo;
let activeObj;
let activeIcon;
let dateDiff;

const loadSpinner = function () {
  popUpView.showSpinner();
};

const hideSpinner = function () {
  popUpView.hideSpinner();
};

// Goals Page

const loadDashboard = async function () {
  await model.getFullDataObj();
  goalsView.loadDashboardContent(model.allGoals);
};

const getLocation = async function (target) {
  activeNo = await goalsView.retrieveNo(target);
  activeIcon = await model.allGoals[activeNo].content.icon;
  await goalsView.loadNthGoalForm(model.allGoals[activeNo], activeNo);
};

const exitGoalForm = function () {
  goalsView.exitForm();
};

const deleteAGoal = function () {
  popUpMsg = goalsView.confirmDeleteQuery();
  popUpView.showPopUp(popUpMsg, true);
};

const initGoalsForm = async function () {
  await loadDashboard();
  goalsView.getNoHandler(getLocation);
  goalsView.exitHandler(exitGoalForm);
  goalsView.deleteHandler(deleteAGoal);
};

// initGoalsForm();

// Load Page
document.addEventListener('DOMContentLoaded', async () => {
  await model.fetchMasterData();
  hideSpinner();
  await initGoalsForm();
  let datesHabit = await model.loadHabitsData();
  dateDiff = datesHabit.map((date) => habitsView.formatCompareDate(date));
  dateDiff.forEach((date, i) => habitsView.updateLoadedTracker(date, 1 + i));
});

// All Popups
const closePopUp = function () {
  popUpView.hidePopUp();
};

const saveOrUpdateGoal = async function () {
  loadSpinner();
  activeObj = await goalsView.updateActiveObj();
  const checker = goalsView.validateSave(activeObj, activeIcon)[0];
  const errMessage = goalsView.validateSave(activeObj, activeIcon)[1];
  if (!checker) {
    popUpView.showPopUp(errMessage);
  } else {
    await model.updateGoal(activeNo, activeObj);
    exitGoalForm();
  }
  await initGoalsForm();
  hideSpinner();
};

const confirmToDeleteGoal = async function (decision) {
  loadSpinner();
  const status = await popUpView.awaitDeleteGoal(decision);
  goalsView.confirmedToDel(status, activeNo);
  await model.delRec(activeNo);
  exitGoalForm();
  await initGoalsForm();
  hideSpinner();
};

const closeIconsPopUp = function () {
  popUpView.closeIconsWorkspace();
};

const initPopUps = function () {
  popUpView.handlerExit(closePopUp);
  goalsView.saveHandler(saveOrUpdateGoal);
  popUpView.handlerSelectDel(confirmToDeleteGoal);
  popUpView.handlerCloseIconsPopup(closeIconsPopUp);
};

initPopUps();

const trackHabit = async function (num, target) {
  const refGoalNo = habitsView.track(num, target)[0];
  const refDate = habitsView.track(num, target)[1];
  await model.exportHabitsData(refGoalNo, refDate);
};

const initHabits = async function () {
  // await loadLastUpdated();
  habitsView.handlerTracker((num, target) => trackHabit(num, target));
};

initHabits();

const loadHabitsPg = function (password) {
  if (password === helper.myPassword) {
    popUpView.loginHabits();
  }
};

const loadGoalsPg = function (password) {
  if (password === helper.myPassword) {
    popUpView.loginGoals();
  }
};

const initLogin = function () {
  popUpView.handlerDisplayHabitsPg((pw) => loadHabitsPg(pw));
  popUpView.handlerDisplayGoalsPg((pw) => loadGoalsPg(pw));
};

initLogin();
