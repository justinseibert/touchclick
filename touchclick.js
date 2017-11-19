/**
 * @param {array} buttons - nested array of [element,callback] pairs
 * @param {string} element - element denoted by class ('.class') or id ('#id')
 * @param {function} callback - the function to attach to the element
 */

var TouchClick = function(buttons){
  for (var button = 0; button < buttons.length; button++){
    var element = buttons[button][0];
    var callback = buttons[button][1];

    var symbol = element[0];
    var name = element.substr(1);

    if (symbol == '.'){
      element = document.getElementsByClassName(name);
    } else if (symbol == '#'){
      element = document.getElementById(name);
    }

    console.log(element);
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
      var move = false;
      elem.addEventListener('touchmove', function(evt){
        move = true;
      })
      elem.addEventListener('touchend', function(evt){
        if (!move){
          evt.preventDefault();
          elem.click();
        }
      })
    }

    function addClick(elem){
      elem.addEventListener('click', function(evt){
        callback(elem);
      })
    }
  }
}
