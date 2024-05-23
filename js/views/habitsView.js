class HabitsView {
  btnTracker = document.querySelectorAll(
    '.habits__content--box--analysis--btn'
  );

  formatDate(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? '0' + day : day}/${
      month < 10 ? '0' + month : month
    }/${year}`;
  }

  formatCompareDate(refDate) {
    const [day, month, year] = refDate.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    const now = Date.now();

    const diffInMs = now - parsedDate.getTime();

    const diffInDays = Math.floor(diffInMs / (24 * 60 * 60 * 1000));

    return diffInDays;
  }

  updateLoadedTracker(item, num) {
    const location = document
      .querySelector(`.habits__content--box--${num}`)
      .querySelector('.habits__content--box--description')
      .querySelector('.habits__content--box--analysis h4');

    const diff = item;
    location.innerHTML = '';
    let displayTxt;

    if (diff === 0) {
      displayTxt = 'Tracked today. Great job! Stay focused';
    } else if (diff === 1) {
      displayTxt = 'Tracked yesterday. Good work!';
    } else if (diff === 2) {
      displayTxt = 'Tracked 2 days ago. Work harder.';
    } else if (diff > 5) {
      displayTxt = 'Last tracked more than 5 days ago. 😔';
    } else {
      displayTxt = `Tracked ${num} days ago. Don't give up!`;
    }

    location.insertAdjacentHTML('beforeend', displayTxt);
  }

  updateLastTracked(target) {
    let child = target.textContent;

    child = child.trim().replace(/\s+/g, ' ');
    child = 'Tracked today. Great job! Stay focused';
    return child;
  }

  track(num, target) {
    console.log(num);
    const curTime = Date.now();

    const location = target.closest(`.habits__content--box--${num}`);
    const trackerEl = location
      .querySelector('.habits__content--box--description')
      .querySelector('.habits__content--box--analysis h4');
    trackerEl.innerHTML = '';

    const child = this.updateLastTracked(location);
    trackerEl.insertAdjacentHTML('beforeend', child);

    return [num, this.formatDate(curTime)];
  }

  handlerTracker(handler) {
    this.btnTracker.forEach((btn) =>
      btn.addEventListener('click', (ev) => {
        ev.preventDefault();
        const num = ev.target.getAttribute('data-set');
        handler(num, ev.target);
      })
    );
  }
}

export default new HabitsView();
