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
      expect(obj.types).toBeDefined();
      expect(obj.types).toEqual('');
    })

    it('should return correct types case 2', function() {
      var obj = parser('button.btn.btn-primary[data-select="link"] button#btn1:hover > span::first-letter#abc:hover::first-line');
      expect(typeof obj).toEqual('object');
      expect(obj.types).toBeDefined();
      expect(obj.types).toEqual('');
    })
  })
})
