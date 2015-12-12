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

  while (matched = rgx(selector)) {
    var matchedSelector = matched[0].toString();
    if (rgxType0(matchedSelector)) {
      // Check if this is the El with space at the beginning
      // then add the space to the type none and push to the segment
      if (matched[6]){
        var objSpace = createSegment(matched[6].toString(), 'none');
        result.segments.push(objSpace);
      }

      var obj = createSegment(matchedSelector, 0);
      result.types[0].push(obj.selector);
    } else if (rgxType1(matchedSelector)) {
      var obj = createSegment(matchedSelector, 1);
      result.types[1].push(obj.selector);
    } else if (rgxType2(matchedSelector)) {
      var obj = createSegment(matchedSelector, 2);
      result.types[2].push(obj.selector);
    } else if (rgxTypeNone(matchedSelector)) {
      var obj = createSegment(matchedSelector, 'none');
    }

    result.segments.push(obj);
  }

  console.log(result);
  return result;
}

function createSegment(selector, type) {
  var obj = {
    selector: selector,
    type: type
  }
  return obj;
}

function createRegex(rgx) {
  var regexType = new RegExp(rgx);
  function regex(selector) {
    return regexType.exec(selector);
  }
  return regex;
}

var rgxClasses = '(\\.[a-z0-9-_]+)',
    rgxIds = '(#[a-z0-9-_]+)',
    rgxPseuClasses = '(\\:[a-z0-9-_]+)',
    rgxEl = '(^[a-z]+)|((\\s)([a-z])+)',
    rgxPseuEl = '(\\:\\:[a-z0-9-_]+)',
    rgxAttr = '(\\[[^>:#.\\s]+\\])',
    rgxNone = '(\\s+)|(>)|(~)',

    rgxTotal = rgxClasses + '|' + rgxIds + '|' + rgxPseuClasses + '|' + rgxEl + '|' + rgxPseuEl + '|' + rgxAttr + '|' + rgxNone;

var rgx = createRegex(rgxTotal),
    rgxType0 = createRegex(rgxEl+'|'+rgxPseuEl),
    rgxType1 = createRegex(rgxClasses+'|'+rgxAttr+'|'+rgxPseuClasses),
    rgxType2 = createRegex(rgxIds),
    rgxTypeNone = createRegex(rgxNone);

parser('button .btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line');
