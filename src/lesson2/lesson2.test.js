import lesson2 from '../src/lesson2';

const {
  sum,
  sumAll,
  pow,
  random
} = lesson2.task;

describe('Basic Jest', () => {

  describe('sum function', () => {
    it('should be possible to add numbers', () => {
      expect(sum(10, 3)).toBe(13);
      expect(sum(0, Infinity)).toBe(Infinity);
    });
    
    it('should return NaN if any of arguments is not a number', () => {
      expect(sum(11, 'a')).toEqual(NaN);
    });
      
    it('should throw exception if only one argument provided', () => {
      expect(() => sum(7)).toThrowError('this function expects exactly TWO arguments');
    });

  });
  
  
  describe('sumAll function', () => {
    it('should be possible to add all numbers provided as list of arguments', () => {
      expect(sumAll(1,2,3)).toBe(6);
      expect(sumAll(11)).toBe(11);
    });
    
    it('should return NaN if any of arguments is not a number', () => {
      expect(sumAll(11,2,'1')).toEqual(NaN);
    });
    
  });
  
  
  describe('pow function', () => {
    it('should be possible to calculate the base to the exponent power', () => {
      expect(pow(2,3)).toBe(8);
    });
    
    it('should return NaN if any of arguments is not a number', () => {
      expect(pow(3,'2')).toEqual(NaN);
    });
    
    it('should throw exception if only one argument provided', () => {
      expect(() => pow(4)).toThrowError('this function expects exactly TWO arguments');
    });
    
  });
  
  describe('random function', () => {
    it('should be possible to get random number within specified range', () => {
      
      const randomSet = [];
      for (let i=0; i<1000; i++) {
        randomSet.push(random(1,7));
      }
      const minSet = Math.min.apply(null,randomSet);
      const maxSet = Math.max.apply(null,randomSet);
      
      expect(minSet).toBeGreaterThanOrEqual(1);
      expect(maxSet).toBeLessThanOrEqual(7);
    });
    
    it('should return NaN if any of arguments is not a number', () => {
      expect(random(4,'2')).toEqual(NaN);
    });
    
    it('should trow exception if boundaries are reversed', () => {
      expect(() => random(100,1)).toThrowError('provide lower boundary first');
    });
    
    it('should throw exception if only one argument provided', () => {
      expect(() => random(7)).toThrowError('this function expects exactly TWO arguments');
    });
    
  });
  
})