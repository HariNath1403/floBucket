export default class Master {
  background = document.getElementById('workspace');
  habitsPg = document.getElementById('habits');
  loginPg = document.getElementById('login');
  workspaceGoals = document.getElementById('goals');
  workspacePopUp = document.getElementById('popup');
  workspaceIcon = document.getElementById('icons');
  workspaceSpinner = document.getElementById('spinner');

  formGoals = document.querySelector('.goals__workspace--form');
  containerGoals = document.querySelector('.dashboard__goals');
  boxesCharts = document.querySelectorAll('.dashboard__goals--box--chart');
  formNthGoal = document.querySelector('.goals__workspace--form');
  iconsFrame = document.querySelector('.icons__frame');

  // allInputs = document.querySelectorAll('input');
  mainInput = document.querySelector('.goals__workspace--form--input--main');
  allMilestoneInputs = document.querySelectorAll(
    '.goals__workspace--form--input--sub'
  );
  allTrackerInputsCur = document.querySelectorAll(
    '.goals__workspace--form--trackers--input--cur'
  );
  allTrackerInputsTotal = document.querySelectorAll(
    '.goals__workspace--form--trackers--input--total'
  );

  // prettier-ignore
  iconNames = ['badminton', 'baking', 'boxing', 'camping', 'coding', 'construction', 'cooking', 'dieting','djing', 'drinking', 'electronics',   'filming', 'fishing', 'fitness', 'gaming', 'gardening', 'gym', 'hiking', 'journaling',   'language', 'music', 'netflix', 'painting',   'pets', 'photography', 'reading', 'sailing',   'sewing', 'sleeping', 'smoking', 'volley',   'swimming', 'ubering', 'vacation', 'youtubing', 'romance', 'trading', 'archery', 'mechanic', 'tech', 'stockoverflow', 'solar', 'soccer', 'jersey', 'cart'].sort();
}
