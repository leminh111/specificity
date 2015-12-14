module.exports = function parser(selector) {
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
      rgxNone = '(\\s+)|(>)|(~)|(\\:)|(#)|(\\.)|(.+\\])|(\\[.+(?!\\]))',

      rgxTotal = rgxClasses + '|' + rgxIds + '|' + rgxPseuClasses + '|' + rgxEl + '|' + rgxPseuEl + '|' + rgxAttr + '|' + rgxNone;

  var rex = new RegExp(rgxTotal, 'g'),

      rgxType0 = rgxEl + '|' + rgxPseuEl,
      rexType0 = new RegExp(rgxType0),

      rgxType1 = rgxClasses + '|' + rgxAttr + '|' + rgxPseuClasses,
      rexType1 = new RegExp(rgxType1),

      rgxType2 = rgxIds,
      rexType2 = new RegExp(rgxType2),

      rgxTypeNone = rgxNone,
      rexTypeNone = new RegExp(rgxTypeNone);

  while (matched = rex.exec(selector)) {
    var matchedSelector = matched[0].toString();
    if (rexType0.exec(matchedSelector)) {
      // Check if this is the El with space at the beginning
      // then add the space to the type none and push to the segment
      if (matched[6]){
        var objSpace = createSegment(matched[6].toString(), 'none');
        result.segments.push(objSpace);
      }

      var obj = createSegment(matchedSelector, 0);
      result.types[0].push(obj.selector);
    } else if (rexType1.exec(matchedSelector)) {
      var obj = createSegment(matchedSelector, 1);
      result.types[1].push(obj.selector);
    } else if (rexType2.exec(matchedSelector)) {
      var obj = createSegment(matchedSelector, 2);
      result.types[2].push(obj.selector);
    } else if (rexTypeNone.exec(matchedSelector)) {
      var obj = createSegment(matchedSelector, 'none');
    }

    result.segments.push(obj);
  }

  function createSegment(selector, type) {
    var obj = {
      selector: selector,
      type: type,
      id: uuid()
    }
    return obj;
  }

  function uuid() {
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  return result;
}

