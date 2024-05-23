import Master from './masterView.js';

class PopUpViews extends Master {
  btnExit = document.querySelector('.popup__exit--btn');
  btnYes = document.querySelector('.popup__commands--btn--yes');
  btnNo = document.querySelector('.popup__commands--btn--no');
  btnOk = document.querySelector('.popup__commands--btn--ok');
  allIcons = document.querySelectorAll('.icons__frame--icon');
  btnIconsExit = document.querySelector('.icons__exit--btn');

  popUpTxt = document.querySelector('.popup__message--text');

  btnLoginHabits = document.querySelector('.login__command--habits');
  btnLoginGoals = document.querySelector('.login__command--goals');
  loginPassword = document.querySelector('.login__password--input');

  loginHabits() {
    this.loginPg.style.display = 'none';
    this.habitsPg.style.display = 'block';
  }

  loginGoals() {
    this.loginPg.style.display = 'none';
    this.background.style.display = 'block';
  }

  showPopUp(content, decision = false) {
    this.workspacePopUp.style.display = 'block';
    this.background.style.filter = 'blur(5px) brightness(75%)';

    this.popUpTxt.innerHTML = content;

    if (decision) {
      this.btnOk.classList.add('popup__commands--btn--inactive');
      this.btnYes.classList.remove('popup__commands--btn--inactive');
      this.btnNo.classList.remove('popup__commands--btn--inactive');
    } else {
      this.btnOk.classList.remove('popup__commands--btn--inactive');
      this.btnYes.classList.add('popup__commands--btn--inactive');
      this.btnNo.classList.add('popup__commands--btn--inactive');
    }
  }

  hidePopUp() {
    this.workspacePopUp.style.display = 'none';
    this.background.style.filter = 'blur(0) brightness(100%)';
  }

  async awaitDeleteGoal(decision) {
    if (decision) {
      return true;
    }
  }

  closeIconsWorkspace() {
    this.workspaceIcon.style.display = 'none';
  }

  showSpinner() {
    this.workspaceSpinner.style.display = 'block';
  }

  hideSpinner() {
    this.workspaceSpinner.style.display = 'none';
  }

  handlerDisplayHabitsPg(handler) {
    this.btnLoginHabits.addEventListener('click', (ev) => {
      ev.preventDefault();
      const password = this.loginPassword.value;
      handler(password);
    });
  }

  handlerDisplayGoalsPg(handler) {
    this.btnLoginGoals.addEventListener('click', (ev) => {
      ev.preventDefault();
      const password = this.loginPassword.value;
      handler(password);
    });
  }

  handlerExit(handler) {
    [this.workspacePopUp, this.btnExit].forEach((el) =>
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        handler();
      })
    );
  }

  handlerSelectDel(handler) {
    this.btnYes.addEventListener('click', () => {
      handler(true);
    });
  }

  handlerCloseIconsPopup(handler) {
    this.btnIconsExit.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new PopUpViews();
