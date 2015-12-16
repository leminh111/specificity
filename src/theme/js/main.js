/**
 * 
 *
 **/
function getParent(element, level) {
  var parent = element;
  for (var i = 0; i < level; i++) {
    parent = parent.parentNode;
  }
  return parent;
}

function add(element) {
  var list = document.getElementById("list");
  var contentBox = getParent(element, 2);
  list.appendChild(contentBox.cloneNode(true));
}

function remove(element) {
  var list = document.getElementById("list");
  var contentBox = getParent(element, 2);
  list.removeChild(contentBox);
}
