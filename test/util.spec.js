const utils = require("../src/util");
const should = require('should');

//decribe로 테스트 환경을 구현
describe('utils.js 모듈은', ()=>{
    it('문자열의 첫번째 문자를 대문자로 변환한다.', ()=>{
        const result = utils.capitalize('hello');
        //assert.equal(result, "Hello");
        result.should.be.equal('Hello');
    })
})