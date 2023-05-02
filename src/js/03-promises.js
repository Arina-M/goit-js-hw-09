import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
}

refs.formEl.addEventListener('input', onFormInputValue);
refs.formEl.addEventListener('submit', onPromisesStart);

let delayTime = 0;
let amount = 0;
let stepTime = 0;


function onFormInputValue(evt) {
  if(evt.target.name === 'delay'){
    delayTime = Number(evt.target.value);
  }

  if(evt.target.name === 'amount'){
    amount = Number(evt.target.value);
  }

  if(evt.target.name === 'step'){
    stepTime = Number(evt.target.value);
  }
};

function onPromisesStart(evt) {
  evt.preventDefault()
  if(delayTime <=0 || amount <= 0 || stepTime <= 0){
    Notiflix.Notify.failure('First delay, Delay step and Amount must be greater than 0!');
  } else {
    makePromises(delayTime, amount, stepTime)
  }
};


function makePromises(delayValue, amountValue, stepValue) {
  let delay = delayValue;
  let i = 1;
  while (i <= amountValue) {
    createPromise(i, delay).then((value) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${value.position} in ${value.delay}ms`);
    }).catch((value) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${value.position} in ${value.delay}ms`);
    });
    delay += stepValue;
    i += 1;
  }
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => { 
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}