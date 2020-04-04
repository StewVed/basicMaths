function keyDownEvents() {
  //this is for an editEnable input element
}
function keyDownGameEvents(theKey) {
  //this is for in-game events.
}
function keyUpEvents() {
  //this is for an editEnable input element
}
function keyUpGameEvents(theKey) {
  //this is for in-game events.
}
function mouseClickEvents() {
  // if animation is running, ignore input:
  if (animing || gs) {
    return;
  }

  var targ = mouseVars.start.target;
  if (isFinite(parseInt(targ.id))) {
    //is a button
    checkAnswer(targ);
  }//ToDo a regex version!
  else if (targ.id === 'a' || targ.id === 'b' || targ.id === 'c' || targ.id === 'd') {
    checkSymbol(targ.id);
  }
}

function mouseDownEvents() {
  //custom mouse/touch down events for your app go here
}
function mouseMoveEvents() {
  //custom mouse/touch move events for your app go here
}
function mouseMoveEnter(targ) {
  /*
   * use this for hovering over things.
   * eg. when you enter a new thing, highlight it.
  */
}
function mouseMoveOut(targ) {
  /*
   * opposite of enter...
   * eg. unhighlight something as the mouse moves off of it.
   *
  */
}
function mouseMoveOver(targ) {
  /*
   * for actively tracking while on an object.
   * eg. moving, dynamic tooltip.
  */
}
function mouseUpEvents() {
  //custom mouse/touch up events for your app go here
}

function mouseWheelEvents(targ, d) {
  //custom mouse wheell events go here
  /*
    note that scrolling is done in globalScripts
    and you put letScroll in the elements of stuff
    you want to scroll using upSetClass(element)
  */
}

function gamePadsButtonDown(zButton) {
  //custom gamepad button down events for your app go here
}
function gamePadsButtonUp(zButton) {
  //custom gamepad button down events for your app go here
}

function anEvent() {
  /*
    this one is for evergy-saving with static games.
    If your game waits for an input and then does something,
    then put something here to set it going.
  */

  /*
    If your game has a running animation loop, you can use this var
    in your main loop to trigger stuff happening!
  */
  //gameVars.go = 1; //obviously, you can call it whatever you want...lol
}

function resizeEvents() {
  //uses my super css-only scaling for awesomeness!!!!

}

function sliderEvents(sliderPercent, sve) {
  //volume control in Settings is already done.
}

function settinsCloseEvent() {
  //fires when the settings windows has closed.

  /*
    I could use this for:
    changing the amount of answers
    changing the highest number

    If I do, add save/load to project.
  */
}

