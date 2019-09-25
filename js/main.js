function isEmpty(x) {
  return typeof x == 'undefined' || (typeof x == 'string' && x.length == 0);
}

const eventName = isEmpty(userEvent) ? 'Nice.' : userEvent;
const eventYear = isEmpty(userMonthNumber) ? '2069' : userMonthNumber;
const eventMonth = isEmpty(userDayNumber) ? '6' : userDayNumber;
const eventDay = isEmpty(userYear) ? '9' : userYear;
const eventTime = isEmpty(userTime) ? '4:20 PM' : userTime;

(() => {
  const UI = {
    event: document.getElementById('event'),
    years: document.getElementById('yearNumber'),
    days: document.getElementById('dayNumber'),
    hours: document.getElementById('hourNumber'),
    minutes: document.getElementById('minuteNumber'),
    seconds: document.getElementById('secondNumber'),
    canvas: document.getElementById('confetti'),
    groups: {
      years: document.querySelector('.years'),
      days: document.querySelector('.days'),
      hours: document.querySelector('.hours'),
      minutes: document.querySelector('.minutes'),
      seconds: document.querySelector('.seconds'),
    },
  };

  function count() {
    const deadline = new Date(`${eventYear}/${eventMonth}/${eventDay} ${eventTime}`);
    const now = new Date().getTime();
    const t = deadline - now;

    const time = {
      years: Math.floor(Math.floor(t / (1000 * 60 * 60 * 24)) / 365),
      days: Math.floor((t / (1000 * 60 * 60 * 24)) % 365),
      hours: Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((t % (1000 * 60)) / 1000),
    };

    UI.event.innerHTML = event;
    UI.years.innerHTML = time.years;
    UI.days.innerHTML = time.days;
    UI.hours.innerHTML = time.hours;
    UI.minutes.innerHTML = time.minutes;
    UI.seconds.innerHTML = time.seconds;
    UI.event.innerHTML = eventName;

    UI.years.style.display = time.years <= 0 ? 'none' : 'inline-block';
    UI.days.style.display = time.days <= 0 ? 'none' : 'inline-block';
    UI.hours.style.display = time.hours <= 0 ? 'none' : 'inline-block';
    UI.minutes.style.display = time.minutes <= 0 ? 'none' : 'inline-block';

    const elements = ['years', 'days', 'hours', 'minutes'];
    elements.forEach(el => {
      if (time[el] <= 0) {
        UI.groups[el].style.display = 'none';
      }
    });

    // event time has passed.
    if (t <= 0) {
      UI.seconds.innerHTML = '0';
      clearInterval(counter);
      celebrate();
      setTimeout(() => {
        UI.canvas.classList.add('fade');
      }, 10000);
    }

    // console.log(`${time.years}y ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`);
  }

  const counter = setInterval(count, 1000);
  count();
})();
