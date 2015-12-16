//obj = {
//  types: {
//    0: [],
//    1: [],
//    2: []
//  }
//  segments: []
//}

describe('Parser', function() {
  describe('parser', function() {
    it('should be defined', function() {
      expect(parser).toBeDefined();
      var obj = parser('');
    })

    it('should return types', function() {
      var obj = parser('button.btn.btn-primary#btn1:hover > span');
      expect(typeof obj).toEqual('object');
      expect(obj.raw).toEqual('button.btn.btn-primary#btn1:hover > span');
      expect(obj.types).toEqual(
        {
          0: ['button', ' span'],
          1: ['.btn', '.btn-primary', ':hover'],
          2: ['#btn1']
        }
      );
      expect(obj.segments).toEqual(
        [
          {selector: 'button', type: 0},
          {selector: '.btn', type: 1},
          {selector: '.btn-primary', type: 1},
          {selector: '#btn1', type: 2},
          {selector: ':hover', type: 1},
          {selector: ' span', type: 0}
        ]
      );
    })

    it('should return correct types case 2', function() {
      var obj = parser('button.btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line');
      expect(typeof obj).toEqual('object');
      expect(obj.raw).toEqual('button.btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line');
      expect(obj.types).toEqual(
        {
          0: ['button', ' button', ' span', '::first-letter', '::first-line'],
          1: ['.btn', '.btn-primary', '[data-select="link"]', ':hover', ':hover'],
          2: ['#btn1', '#abc']
        }
      );
      expect(obj.segments).toEqual(
        [
          {selector: 'button', type: 0},
          {selector: '.btn', type: 1},
          {selector: '.btn-primary', type: 1},
          {selector: '[data-select="link"]', type: 1},
          {selector: ' button', type: 0},
          {selector: '#btn1', type: 2},
          {selector: ':hover', type: 1},
          {selector: ' span', type: 0},
          {selector: '::first-letter', type: 0},
          {selector: '#abc', type: 2},
          {selector: ':hover', type: 1},
          {selector: '::first-line', type: 0}
        ]
      );
    })
  })
})
