const form = document.querySelector('form');
const completedSection = document.querySelector('.completed-section')
const allInputs = document.querySelectorAll('input');
const errorMessages = document.querySelectorAll('.error-message')
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const monthInput = document.getElementById('mm');
const yearInput = document.getElementById('yy');
const cvcInput = document.getElementById('cvc-input');
const cardOwner = document.querySelector('.card-owner');
const cardNumber = document.querySelector('.card-number');
const monthOfTheCard = document.querySelector('.month');
const yearOfTheCard = document.querySelector('.year');
const cvc = document.querySelector('.cvc');
const submitB = document.querySelector('.submit-b')

let theRegexForName = /[A-Za-z]+\s[A-Za-z]+\s*/;
let theRegexForNumber = /([0-9]{4}\s){2,3}([0-9]{2,4})/;
let theSecondRegexForNumber = /[^0-9+\s*]/;
let theMonthsRegex = /0([0-9])/
let theMonthsRegexTwo = /1([0-2])/
let theYearRegex = /\d\d/
let theRegexForCvc = /\d{3}/

let red = "hsl(0, 100%, 66%)";
let grey = "hsla(279, 6%, 55%, 0.579)";
let cantBeBlank = "Can't be blank.";

nameInput.addEventListener('keyup', (event) => {
  if(!event.target.value) {
    cardOwner.textContent = "Jane Appleseed";
  } else {
    cardOwner.textContent = event.target.value
  }
  
});

const inputIndention = (e) => {
  if(!e.target.value) {
    cardNumber.textContent = "0000 0000 0000 0000";
  } else {
    const inputDigits = e.target.value.replaceAll(" ", "");
    cardNumber.textContent = e.target.value;
    if(e.target.value.length > 14) {
      e.target.value = inputDigits.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4")
    } else if(e.target.value.length > 9) {
      e.target.value = inputDigits.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3")
    } else if(e.target.value > 4) {
      e.target.value = inputDigits.replace(/(\d{4})(\d{0,4})/, "$1 $2")
    }
  }
}

const cardNumberMirror = (e) => {
  if(!e.target.value) {
    cardNumber.textContent = "0000 0000 0000 0000";
  } else {
    const inputDigits = e.target.value.replaceAll(" ", "");
    cardNumber.textContent = e.target.value;
    if(e.target.value.length > 14) {
      cardNumber.textContent = inputDigits.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4")
    } else if(e.target.value.length > 9) {
      cardNumber.textContent = inputDigits.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3")
    } else if(e.target.value > 4) {
      cardNumber.textContent = inputDigits.replace(/(\d{4})(\d{0,4})/, "$1 $2")
    }
  }

}

numberInput.addEventListener('keyup', (e) => {
    cardNumberMirror(e)  
})

numberInput.addEventListener('keypress', (e) => {
  inputIndention(e)   
})

mm.addEventListener('keyup', (e) => {
  if(!mm.value) {
    monthOfTheCard.textContent = "00";
  } else {
    monthOfTheCard.textContent = mm.value;
  }
  
});

yy.addEventListener('keyup', (e) => {
  if(!yy.value) {
    yearOfTheCard.textContent = "00";
  } else {
    yearOfTheCard.textContent = yy.value;
  }
})

cvcInput.addEventListener('keyup', (e) => {
  if(!cvcInput.value) {
    cvc.textContent = "000"
  } else {
    cvc.textContent = cvcInput.value;
  }
  
})

submitB.addEventListener('click', (e) => {
  e.preventDefault();
  
  let checker = true;
  //error checks
  switch(false) { //the name
    case Boolean(nameInput.value):
      forError(nameInput, errorMessages, 0, cantBeBlank);
      checker = false;
      break;
    case theRegexForName.test(nameInput.value):
     forError(nameInput, errorMessages, 0, "Wrong format(eg. John Smith)");
     checker = false;
     break;
    default: 
      forValid(nameInput, errorMessages, 0);
  }
  
  switch(false) { //The number
    case Boolean(numberInput.value):
      forError(numberInput, errorMessages, 1, cantBeBlank);
      checker = false;
      break;
    case !theSecondRegexForNumber.test(numberInput.value):
      forError(numberInput, errorMessages, 1, "Wrong format, numbers only")
      checker = false;
      break;
    case theRegexForNumber.test(numberInput.value):
      forError(numberInput, errorMessages, 1, "Must be at least 10 digits")
      checker = false;
      break;
    default: 
      forValid(numberInput, errorMessages, 1);
  }

  switch(false) { //the month
    case Boolean(monthInput.value):
      forError(monthInput, errorMessages, 2, cantBeBlank);
      checker = false;
      break;
    case !theMonthsRegex.test(monthInput.value):
      forValid(monthInput, errorMessages, 2);
      break;
    case !theMonthsRegexTwo.test(monthInput.value):
      forValid(monthInput, errorMessages, 2);
      break;
    default:
      forError(monthInput, errorMessages, 2, "Must be a valid month.");
      checker = false;
  }

  switch(false) { //the year
    case Boolean(yearInput.value):
      forError(yearInput, errorMessages, 3, cantBeBlank)
      checker = false;
      break;
    case theYearRegex.test(yearInput.value):
      forError(yearInput, errorMessages, 3, "Must be a valid year.");
      checker = false;
      break;
    default:
      forValid(yearInput, errorMessages, 3);
  }

  switch(false) { //the cvc
    case Boolean(cvcInput.value):
      forError(cvcInput, errorMessages, 4, cantBeBlank);
      checker = false;
      break;
    case theRegexForCvc.test(cvcInput.value):
      forError(cvcInput, errorMessages, 4, "Must contain 3 digits");
      checker = false;
      break;
    default:
      forValid(cvcInput, errorMessages, 4)
  }

  if(checker) {
    form.style.visibility = "hidden";
    form.style.width = "0";
    form.style.position = "absolute";
    form.style.top = "-500px"
    completedSection.style.visibility = "visible";
    completedSection.style.width = "100%";
    completedSection.style.height = "65%";
    completedSection.style.position = "static"
  }
})

const forError = (theInput, errorMessages, index, errorText) => {
  theInput.style.borderColor = red;
  errorMessages[index].textContent = errorText;
}

const forValid = (theInput, errorMessages, index) => {
  theInput.style.borderColor = grey;
  errorMessages[index].textContent = "";
}