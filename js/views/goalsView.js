import Master from './masterView.js';

class GoalsViews extends Master {
  btnExit = document.querySelector('.goals__workspace--exit--btn');
  btnSave = document.querySelector('.goals__workspace--commands--btn--save');
  btnDel = document.querySelector('.goals__workspace--commands--btn--del');
  // btnIcon = document.querySelector('.goals__workspace--form--btn');

  generateFullChart(no, obj) {
    const markup = `<div class="dashboard__goals--box">
    <h2
      class="dashboard__goals--box--header dashboard__goals--box--header--${no}"
    >
      <span class="dashboard__goals--box--header--pre">Goal #${no}:</span>
      <span class="dashboard__goals--box--header--goal"
        >${obj.main}</span
      >
    </h2>
    <div class="dashboard__goals--box--chart">
      <div
        class="dashboard__goals--box--chart--container dashboard__goals--box--chart--container--${no}" data-no="${no}"
      >
        <div
          class="dashboard__goals--box--chart--bar dashboard__goals--box--chart--bar--${no}"
          style="width: ${obj.overall}%"
        >
          <img
            src="../imgs/Icons/${obj.icon}.png"
            class="dashboard__goals--box--chart--icon"
          />
        </div>
        <h2
          class="dashboard__goals--box--chart--percentage dashboard__goals--box--chart--percentage--${no}"
        >
        ${obj.overall}%
        </h2>
      </div>
    </div>
  </div>`;

    return markup;
  }

  generateBlankChart(no) {
    const markup = `<div class="dashboard__goals--box dashboard__goals--box--inactive">
    <h2
      class="dashboard__goals--box--header dashboard__goals--box--header--${no}"
    >
      <span class="dashboard__goals--box--header--pre">Goal #${no}:</span>
    </h2>
    <div class="dashboard__goals--box--chart">
      <div
        class="dashboard__goals--box--chart--container dashboard__goals--box--chart--container--${no}" data-no="${no}"
      > 
        <div
          class="dashboard__goals--box--chart--bar dashboard__goals--box--chart--bar--${no}"
          style="width: 35%"
        >
          <button
            class="dashboard__goals--box--chart--add dashboard__goals--box--chart--add--${no}"
          >
            Add
          </button>
        </div>
        <h2
          class="dashboard__goals--box--chart--percentage dashboard__goals--box--chart--percentage--${no}"
        >
          -%
        </h2>
      </div>
    </div>
  </div>`;
    return markup;
  }

  loadDashboardContent(directory) {
    this.containerGoals.innerHTML = '';
    let fullMarkup = '';
    Object.keys(directory).forEach((no) => {
      if (directory[no].active) {
        fullMarkup += this.generateFullChart(no, directory[no].content);
      } else {
        fullMarkup += this.generateBlankChart(no);
      }
    });
    this.containerGoals.insertAdjacentHTML('beforeend', fullMarkup);
  }

  retrieveNo(target) {
    const parentEl = target.closest('.dashboard__goals--box--chart--container');

    return parentEl.getAttribute('data-no');
  }

  async generateNthGoalMarkup(obj, no) {
    const markup = `<div class="goals__workspace--form--row">
    <label
      for="goal-title"
      class="goals__workspace--form--label goals__workspace--form--label--main"
      ><span>Goal #${no}</span>
      <span id="goal-overall-percentage">${obj.overall}%</span>
    </label>
    <input
      type="text"
      id="goal-title"
      value="${obj.main}"
      maxlength="20"
      class="goals__workspace--form--input goals__workspace--form--input--main"
    />
  </div>
  <div class="goals__workspace--form--row">
    <label
      for="milestone-one"
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      ><span>Milestone #1</span>
      <span id="percentage-milestone-one">${obj.sub.completion[0]}%</span>
    </label>
    <input
      type="text"
      id="milestone-one"
      value="${obj.sub.milestones[0]}"
      class="goals__workspace--form--input goals__workspace--form--input--sub"
    />

    <div class="goals__workspace--form--trackers">
      <label
        for="milestone-one-cur"
        class="goals__workspace--form--trackers--label"
        ><span>Current</span>
      </label>
      <input
        type="number"
        id="milestone-one-cur"
        value="${obj.sub.current[0]}"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--cur"
      />
      <label
        for="milestone-one-total"
        class="goals__workspace--form--trackers--label"
        ><span>Total</span>
      </label>
      <input
        type="number"
        id="milestone-one-total"
        value="${obj.sub.total[0]}"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--total"
      />
    </div>
  </div>
  <div class="goals__workspace--form--row">
    <label
      for="milestone-two"
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      ><span>Milestone #2</span>
      <span id="percentage-milestone-two">${obj.sub.completion[1]}%</span>
    </label>
    <input
      type="text"
      id="milestone-two"
      value="${obj.sub.milestones[1]}"
      class="goals__workspace--form--input goals__workspace--form--input--sub"
    />

    <div class="goals__workspace--form--trackers">
      <label
        for="milestone-two-cur"
        class="goals__workspace--form--trackers--label"
        ><span>Current</span>
      </label>
      <input
        type="number"
        id="milestone-two-cur"
        value="${obj.sub.current[1]}"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--cur"
      />
      <label
        for="milestone-two-total"
        class="goals__workspace--form--trackers--label"
        ><span>Total</span>
      </label>
      <input
        type="number"
        id="milestone-two-total"
        value="${obj.sub.total[1]}"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--total"
      />
    </div>
  </div>
  <div class="goals__workspace--form--row">
    <label
      for="milestone-three"
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      ><span>Milestone #3</span>
      <span id="percentage-milestone-three">${obj.sub.completion[2]}%</span>
    </label>
    <input
      type="text"
      id="milestone-three"
      value="${obj.sub.milestones[2]}"
      class="goals__workspace--form--input goals__workspace--form--input--sub"
    />

    <div class="goals__workspace--form--trackers">
      <label
        for="milestone-three-cur"
        class="goals__workspace--form--trackers--label"
        ><span>Current</span>
      </label>
      <input
        type="number"
        id="milestone-three-cur"
        value="${obj.sub.current[2]}"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--cur"
      />
      <label
        for="milestone-three-total"
        class="goals__workspace--form--trackers--label"
        ><span>Total</span>
      </label>
      <input
        type="number"
        id="milestone-three-total"
        value="${obj.sub.total[2]}"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--total"
      />
    </div>
  </div>

  <div class="goals__workspace--form--row">
    <label
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      >Icon
    </label>
    <div class="goals__workspace--form--icon">
    <button id="icon-select" class="goals__workspace--form--btn">Select</button>
      <div class="goals__workspace--form--icon--backdrop">
      <img src="imgs/Icons/${obj.icon}.png" />
      </div>
    </div>
  </div>`;

    return markup;
  }

  async generateBlankGoalMarkup(no) {
    const markup = `<div class="goals__workspace--form--row">
    <label
      for="goal-title"
      class="goals__workspace--form--label goals__workspace--form--label--main"
      ><span>Goal #${no}</span>
      <span id="goal-overall-percentage">-%</span>
    </label>
    <input
      type="text"
      id="goal-title"
      value=""
      maxlength="20"
      class="goals__workspace--form--input goals__workspace--form--input--main"
    />
  </div>
  <div class="goals__workspace--form--row">
    <label
      for="milestone-one"
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      ><span>Milestone #1</span>
      <span id="percentage-milestone-one">-%</span>
    </label>
    <input
      type="text"
      id="milestone-one"
      class="goals__workspace--form--input goals__workspace--form--input--sub"
    />

    <div class="goals__workspace--form--trackers">
      <label
        for="milestone-one-cur"
        class="goals__workspace--form--trackers--label"
        ><span>Current</span>
      </label>
      <input
        type="number"
        id="milestone-one-cur"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--cur"
      />
      <label
        for="milestone-one-total"
        class="goals__workspace--form--trackers--label"
        ><span>Total</span>
      </label>
      <input
        type="number"
        id="milestone-one-total"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--total"
      />
    </div>
  </div>
  <div class="goals__workspace--form--row">
    <label
      for="milestone-two"
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      ><span>Milestone #2</span>
      <span id="percentage-milestone-two">-%</span>
    </label>
    <input
      type="text"
      id="milestone-two"
      class="goals__workspace--form--input goals__workspace--form--input--sub"
    />

    <div class="goals__workspace--form--trackers">
      <label
        for="milestone-two-cur"
        class="goals__workspace--form--trackers--label"
        ><span>Current</span>
      </label>
      <input
        type="number"
        id="milestone-two-cur"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--cur"
      />
      <label
        for="milestone-two-total"
        class="goals__workspace--form--trackers--label"
        ><span>Total</span>
      </label>
      <input
        type="number"
        id="milestone-two-total"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--total"
      />
    </div>
  </div>
  <div class="goals__workspace--form--row">
    <label
      for="milestone-three"
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      ><span>Milestone #3</span>
      <span id="percentage-milestone-three">-%</span>
    </label>
    <input
      type="text"
      id="milestone-three"
      class="goals__workspace--form--input goals__workspace--form--input--sub"
    />

    <div class="goals__workspace--form--trackers">
      <label
        for="milestone-three-cur"
        class="goals__workspace--form--trackers--label"
        ><span>Current</span>
      </label>
      <input
        type="number"
        id="milestone-three-cur"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--cur"
      />
      <label
        for="milestone-three-total"
        class="goals__workspace--form--trackers--label"
        ><span>Total</span>
      </label>
      <input
        type="number"
        id="milestone-three-total"
        class="goals__workspace--form--trackers--input goals__workspace--form--trackers--input--total"
      />
    </div>
  </div>

  <div class="goals__workspace--form--row">
    <label
      class="goals__workspace--form--label goals__workspace--form--label--sub"
      >Icon
    </label>
    <div class="goals__workspace--form--icon">
      <button id="icon-select" class="goals__workspace--form--btn">Select</button>
      <div class="goals__workspace--form--icon--backdrop">
      </div>
    </div>
  </div>`;

    return markup;
  }

  async updateActiveObj() {
    const floatObj = {
      main: null,
      milestones: [],
      current: [],
      total: [],
      icon: null,
    };

    const main = document.getElementById('goal-title');
    const arrVar = ['one', 'two', 'three'];

    floatObj.main = main.value;

    arrVar.forEach((no) => {
      floatObj.milestones.push(
        document.getElementById(`milestone-${no}`).value
      );
      floatObj.current.push(
        document.getElementById(`milestone-${no}-cur`).value
      );
      floatObj.total.push(
        document.getElementById(`milestone-${no}-total`).value
      );
    });

    floatObj.icon = document
      .querySelector('.goals__workspace--form--icon--backdrop img')
      ?.getAttribute('src')
      .split('/')
      .pop()
      .split('.png')[0];

    // console.log(floatObj);
    return floatObj;
  }

  async loadNthGoalForm(obj, no) {
    window.scroll(0, 0);

    const status = obj.active;
    let fullMarkup;
    this.formNthGoal.innerHTML = '';

    if (status) {
      fullMarkup = await this.generateNthGoalMarkup(obj.content, no);
    } else {
      fullMarkup = await this.generateBlankGoalMarkup(no);
    }
    await this.formNthGoal.insertAdjacentHTML('beforeend', fullMarkup);
    await this.showForm();

    const btnIcon = document.querySelector('.goals__workspace--form--btn');
    btnIcon.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.workspaceIcon.style.display = 'block';
      this.iconsFrame.innerHTML = '';
      let markup = '';
      this.iconNames.forEach((icon) => {
        markup += `<img src="../imgs/Icons/${icon}.png" class="icons__frame--icon" />`;
      });

      this.iconsFrame.insertAdjacentHTML('beforeend', markup);

      const allIcons = document.querySelectorAll('.icons__frame--icon');
      const iconBackdrop = document.querySelector(
        '.goals__workspace--form--icon--backdrop'
      );

      let iconName = '';

      allIcons.forEach((icon) =>
        icon.addEventListener('click', (ev) => {
          const src = ev.target.getAttribute('src');
          iconName = src.split('/').pop().split('.png')[0];
          iconBackdrop.innerHTML = '';
          iconBackdrop.insertAdjacentHTML(
            'beforeend',
            `<img src="imgs/Icons/${iconName}.png" />`
          );
          this.workspaceIcon.style.display = 'none';
        })
      );
      return iconName;
    });
  }

  showForm() {
    this.workspaceGoals.style.transform = 'translateX(0)';
  }

  exitForm() {
    this.workspaceGoals.style.transform = 'translateX(100%)';
  }

  validateSave(obj) {
    let validation = true;
    let errMsg = null;

    const icon = document
      .querySelector('.goals__workspace--form--icon--backdrop img')
      ?.getAttribute('src')
      .split('/')
      .pop()
      .split('.png')[0];

    if (!icon) {
      validation = false;
      errMsg = 'An icon is needed.';
    }

    if (!obj.main || obj.main.length > 15) {
      validation = false;
      errMsg = 'The main goal should be 15 characters or fewer.';
    }
    if (obj.milestones.some((val) => val == '')) {
      validation = false;
      errMsg = 'All milestone fields must not be blank.';
    }
    if (obj.current.some((val) => val == '')) {
      validation = false;
      errMsg = 'All current values must be entered as numerical inputs only.';
    }

    for (let i = 0; i < obj.total.length; i++) {
      const curTotal = obj.total[i] * 1;
      const curVal = obj.current[i] * 1;

      if (isNaN(curTotal) || curTotal < curVal) {
        validation = false;
        errMsg =
          'All total values must be greater than or equal to their corresponding current values.';
      }
    }

    return [validation, errMsg];
  }

  confirmDeleteQuery() {
    return 'Are you certain you want to delete this goal? [Once deleted, it cannot be recovered]';
  }

  confirmedToDel(status, no) {
    if (!status) return;

    const markup = this.generateBlankGoalMarkup(no);
    this.formNthGoal.innerHTML = '';
    this.formNthGoal.insertAdjacentHTML('beforeend', markup);
  }

  getNoHandler(handler) {
    document
      .querySelectorAll('.dashboard__goals--box--chart')
      .forEach((box) => {
        box.addEventListener('click', (ev) => {
          handler(ev.target);
        });
      });
  }

  saveHandler(handler) {
    this.btnSave.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  exitHandler(handler) {
    this.btnExit.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  deleteHandler(handler) {
    this.btnDel.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new GoalsViews();
