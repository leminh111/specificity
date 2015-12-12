//document.addEventListener("DOMContentLoaded", function(event) {
//parser('button .btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line');
function parser(selector) {
  var result = {
    raw: selector,
    types: {
      0: [],
      1: [],
      2: []
    },
    segments: []
  };

  var rgxClasses = '(\\.[a-z0-9-_]+)',
      rgxIds = '(#[a-z0-9-_]+)',
      rgxPseuClasses = '(\\:[a-z0-9-_]+)',
      rgxEl = '(^[a-z]+)|((\\s)([a-z])+)',
      rgxPseuEl = '(\\:\\:[a-z0-9-_]+)',
      rgxAttr = '(\\[[^>:#.\\s]+\\])',
      rgxNone = '(\\s+)|(>)|(~)',

      rgxTotal = rgxClasses + '|' + rgxIds + '|' + rgxPseuClasses + '|' + rgxEl + '|' + rgxPseuEl + '|' + rgxAttr + '|' + rgxNone;

  var rex = new RegExp(rgxTotal, 'g'),

      rgxType0 = rgxEl + '|' + rgxPseuEl,
      rexType0 = new RegExp(rgxType0);

      rgxType1 = rgxClasses + '|' + rgxAttr + '|' + rgxPseuClasses,
      rexType1 = new RegExp(rgxType1);

      rgxType2 = rgxIds,
      rexType2 = new RegExp(rgxType2);

      rgxTypeNone = rgxNone,
      rexTypeNone = new RegExp(rgxTypeNone);

  while (matched = rex.exec(selector)) {

    if (rexType0.exec(matched[0].toString())) {
      // Check if this is the El with space at the beginning
      // then add the space to the type none and push to the segment
      if (matched[6]){
        var objSpace = {
          selector: matched[6].toString(),
          type: 'none'
        }
        result.segments.push(objSpace);
      }

      var obj = {
        selector: matched[0].toString(),
        type: 0
      }
      result.types[0].push(obj.selector);
    } else if (rexType1.exec(matched[0].toString())) {
      var obj = {
        selector: matched[0].toString(),
        type: 1
      }
      result.types[1].push(obj.selector);
    } else if (rexType2.exec(matched[0].toString())) {
      var obj = {
        selector: matched[0].toString(),
        type: 2
      }
      result.types[2].push(obj.selector);
    } else if (rexTypeNone.exec(matched[0].toString())) {
      var obj = {
        selector: matched[0].toString(),
        type: 'none'
      }
    }

    result.segments.push(obj);
  }

  // Create a loop to append each selector to the text-field
//  var textField = document.getElementsByClassName("text-field")[0];
//
//  for (var i=0; i<result.segments.length; i++) {
//    var span = document.createElement("SPAN");
//    span.className = 'type-' + result.segments[i].type;
//    var selectorName = result.segments[i].selector;
//    var t = document.createTextNode(selectorName);
//    span.appendChild(t);
//    textField.appendChild(span);
//  }
  return result;
}
//});
