/**
 * this version manually ignores the click callback after a touchend is registered
 * @param {string} element - target element denoted by class ('.class') or id ('#id')
 * @param {function} callback - the function to attach to the element
 */

var touchclick = function(element, callback){
  var touched = false;
  var symbol = element[0];
  var name = element.substr(1);

  if (symbol == '.'){
    element = document.getElementsByClassName(name);
  } else if (symbol == '#'){
    element = document.getElementById(name);
  }

  if (element.length != 'undefined' && element.length > 0){
    for (var i = 0; i < element.length; i++){
      addTouch(element[i]);
      addClick(element[i]);
    }
  } else {
    addTouch(element);
    addClick(element);
  }

  function addTouch(elem){
    elem.addEventListener('touchend', handleTouchStart, false);
  }
  function addClick(elem){
    elem.addEventListener('click', handleClick, false);
  }

  function handleTouchStart(){
    touched = true;
    callback(this);
  }
  function handleClick(){
    if (touched){
      touched = false;
      return;
    }
    callback(this);
  }
}
