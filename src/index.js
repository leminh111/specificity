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
      rgxEl = '(\\s[a-z0-9-_]+)',
      rgxElBegin = '(^[a-z0-9-_]+)'
      rgxPseuEl = '(\\:\\:[a-z0-9-_]+)',
      rgxAttr = '(\\[[^>:#.\\s]+\\])',

      rgxTotal = rgxClasses + '|' + rgxIds + '|' + rgxPseuClasses + '|' + rgxEl + '|' + rgxElBegin + '|' + rgxPseuEl + '|' + rgxAttr;

  var rex = new RegExp(rgxTotal, 'g'),

      rgxType0 = rgxEl + '|' + rgxElBegin + '|' + rgxPseuEl,
      rexType0 = new RegExp(rgxType0);

      rgxType1 = rgxClasses + '|' + rgxAttr + '|' + rgxPseuClasses,
      rexType1 = new RegExp(rgxType1);

      rgxType2 = rgxIds,
      rexType2 = new RegExp(rgxType2);

  while (matched = rex.exec(selector)) {
    if (rexType0.exec(matched[0].toString())) {
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
    }

    result.segments.push(obj);
  }
  console.log(result);
  return result;
}
