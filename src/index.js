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
      console.log(rexType0.toString());
      console.log(rexType1.toString());
      console.log(rexType2.toString());

  while (matched = rex.exec(selector)) {
    console.log(matched[0].toString());
    if (rexType0.exec(matched[0].toString())) {
      var obj = {
        selector: matched[0].toString(),
        type: 0
      }
    } else if (rexType1.exec(matched[0].toString())) {
      var obj = {
        selector: matched[0].toString(),
        type: 1
      }
    } else if (rexType2.exec(matched[0].toString())) {
      var obj = {
        selector: matched[0].toString(),
        type: 2
      }
    }

    result.segments.push(obj);
  }
  console.log(result.segments);
  return result;
}
