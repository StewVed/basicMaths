var zAppPrefix = 'bm' // unique 2-char identifier for serviceworker/save/load
  , sumNum = 99 // maximum number allowed for sums
  , symbols = ['+', '-', 'x', '/']
  , currentSymbol = 0 // default to + for now (maybe save/load later)
  , answer = 0 // to hold the correct answer to the current sum.
  , correctButton = 0
  // for scaling, once the app is rendered, make a note of its size.
  , initScreenWidth
  , initScreenHeight
  , gs = 0 //make sure generateSum is only called once.
  , animing = 0; //ignore any inputs while answering.
;

function initContent() {
  var stuff =
    '<div id="contC">'
      + '<div id="a" class="button uButtonGreen">+</div>'
      + '<div id="b" class="button uButtonGrey">-</div>'
      + '<div id="c" class="button uButtonGrey">x</div>'
      + '<div id="d" class="button uButtonGrey">/</div>'
      + '<div id="sum">88&88</div>'
      + '<div id="1a" class="syb button">'
        + '<div id="1" class="backgroundOpacityGradient bInner">dsfg</div>'
      + '</div>'
      + '<div id="2a" class="syb button">'
        + '<div id="2" class="backgroundOpacityGradient bInner">dsfg</div>'
      + '</div>'
      + '<div id="3a" class="syb button">'
        + '<div id="3" class="backgroundOpacityGradient bInner">dsfg</div>'
      + '</div>'
    + '</div>'
  ;

  return stuff;
}

function runApp() {
  // while the widest 88&88 is shown, record the initial screen dimentions:
  initScreenWidth = document.getElementById('contC').offsetWidth;
  initScreenHeight = document.getElementById('contC').offsetHeight;

  // set the container dimentions as they are right now so they don't change.
  document.getElementById('contC').style.width = initScreenWidth + 'px';
  document.getElementById('contC').style.height = initScreenHeight + 'px';

  // add event listeners for the divs that animate:
  //document.getElementById('1a').addEventListener('animationend', animEnd);
  //document.getElementById('2a').addEventListener('animationend', animEnd);
  //document.getElementById('3a').addEventListener('animationend', animEnd);

  document.addEventListener('animationstart', animStart);
  document.addEventListener('animationend', animEnd);

  // now that the maximum size has been set, generate a new random sum.
  generateSum();
}


function generateSum() {
  var n1
    , n2
    , zNum = sumNum
    , sym
  ;

  // if no symble is selected, randomise the symble.
  if (currentSymbol === -1) {
    sym = Math.floor(Math.random() * 4);
  }
  else {
     sym = currentSymbol;
  }

  // if multiplying, set max to 12.
  if (sym === 2) {
    zNum = 12;
  }

  //ToDo: set rules for divide by.

  //pick two random numbers
  n1 = Math.floor(Math.random() * zNum + 1);
  n2 = Math.floor(Math.random() * zNum + 1);

  //answer = n1 symbols[sym] n2;
  // * is x, so case or if..else
  if (sym === 0) {
    answer = n1 + n2;
  }
  else if (sym === 1) {
    answer = n1 - n2;
  }
  else if (sym === 2) {
    answer = n1 * n2;
  }
  else if (sym === 3) {
    answer = n1 / n2;
  }

  // display the full sum:
  document.getElementById('sum').innerHTML = n1 + symbols[sym] + n2;

  // if the result of the sum is greater than the max set or less than 0,
  // do another sum.
  if (answer > sumNum || answer < 0) {
    generateSum();
  }
  else {
    generateAnswers();
  }
}

function generateAnswers() {
  //pick one of the buttons at random for the correct answer
  var a = Math.floor(Math.random() * 3) + 1
  //pick another random number
    , b = Math.floor(Math.random() * 3) + 1
    , c
    , d
  ;

  //if the same number was picked, pick again.
  while (a === b) {
    b = Math.floor(Math.random() * 3) + 1;
  }

  // c will be a number that is +/- 3 to the answer,
  // unless the answer is close to 0
  if (answer < 3 ) {
    c = Math.floor(Math.random() * 6);
  }
  else {
    c = Math.floor(Math.random() * 6) + (answer - 3);
  }

  while (answer === c) {
    if (answer < 3 ) {
      c = Math.floor(Math.random() * 6);
    }
    else {
      c = Math.floor(Math.random() * 6) + (answer - 3);
    }
  }

  //pick a random number:
  d = Math.floor(Math.random() * sumNum);

  // make sure that d is not the correct answer or the close number:
  while (d === answer || d === c) {
    d = Math.floor(Math.random() * sumNum);
  }

  // cycle through the buttons and add a number to them.
  for (var x = 1; x < 4; x++) {
    if (x === a) {
      //this button will be the correct answer:
      document.getElementById(x).innerText = answer;
      correctButton = x;
    }
    else if (x === b) {
      //this button will be close to the correct answer:
      document.getElementById(x).innerText = c;
    }
    else {
      // The button that is left will be any random number.
      document.getElementById(x).innerText = d;
    }
  }

  // now that it is all done, let another generateSum to happen.
  gs = 0;
  animing = 0; //just in case it wasn't sorted already.
}

function checkAnswer(targ) {

  //what is the number in the pressed button?
  var a = parseInt(targ.innerText);
  var inDivId = parseInt(targ.id).toString() + 'a';
  var inDiv = document.getElementById(inDivId);
  //is it the same as the answer to the sum?
  if (answer === a) {
    //correct
    inDiv.style.animation = 'cGreen 1s';
  }
  else {
    //nope show correct answer.
    inDiv.style.animation = 'cRed 1s';
    document.getElementById(correctButton + 'a').style.animation = 'cGreen 1s';
  }

}

function animStart() {
  animing = 1;
}

function animEnd() {

  document.getElementById('1a').style.animation = '';
  document.getElementById('2a').style.animation = '';
  document.getElementById('3a').style.animation = '';

  animing = 0;

  if (!gs) {
    gs = 1;
    //now put up a new sum.
    generateSum();
  }

}

function checkSymbol(targid) {
  // remove all green buttons
  document.getElementById('a').classList.remove('uButtonGreen');
  document.getElementById('b').classList.remove('uButtonGreen');
  document.getElementById('c').classList.remove('uButtonGreen');
  document.getElementById('d').classList.remove('uButtonGreen');

  //see what button was pressed.
  if (targid === 'a') {
    changeSymbol('a', 0);
  }
  else if (targid === 'b') {
    changeSymbol('b', 1);
  }
  else if (targid === 'c') {
    changeSymbol('c', 2);
  }
  else if (targid === 'd') {
    changeSymbol('d', 3);
  }

  //because the choice of symbol has change, do a new sum using it.
  generateSum();
}

function changeSymbol(a, b) {
  if (currentSymbol === b) {
    // button was on. selection goes random
    currentSymbol = -1;
  }
  else {
    // change the symbol to this one.
    currentSymbol = b;
    document.getElementById(a).classList.add('uButtonGreen');
  }
}
