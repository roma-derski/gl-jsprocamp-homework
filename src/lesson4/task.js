/*
  Write a function that creates custom set object. Function
  accepts single optional parameter (array) do define initial
  set content.
  Set should have add(), has(), delete(), forEach(), clear() methods
  and size property. Should not use es6 objects Set, WeakSet,
  but work in similar way. Set should preserve addition order
  in forEach() method.
  mySet = createSet(['a', 'b', 'c'])
*/
export function createSet(arr) {
  
  const MSat = function(arr) {
    this.keys = [];
    this.values = this.keys;
    if (arr) {
      arr.forEach((val) => {
        this.add(val);
      });
    }
  };
  
  MSat.prototype.add = function(a) {
    const key = this.keys.indexOf(a);
    if (key !== -1) this.keys[key] = a;
    else this.keys.push(a);
    return this;
  };
  
  
  MSat.prototype.has = function(a) {
    const key = this.keys.indexOf(a);
    if (key !== -1) return true;
    return false;
  };
  
  MSat.prototype.delete = function(a) {
    const key = this.keys.indexOf(a);
    if (key !== -1) {
      this.keys.splice(key,1);
      return true;
    }
    return false;
  };
  
  MSat.prototype.forEach = function(fn, thisArg = null) {
    return this.keys.forEach((value1, value2, array = this.keys) => {
      return fn(value1, this.values[value2]);
    }, thisArg);
  };
  
  MSat.prototype.clear = function() {
    this.keys = [];
    return undefined;
  };
  
  Object.defineProperty(MSat.prototype, "size", {
    get: function () {
      return this.keys.length;
    }
  });
  
  return new MSat(arr);
}

/*
  Write a function that creates custom map object. Function
  accepts single optional parameter (array) do define initial
  map content.
  Map should have set(), get(), has(), delete(), forEach(), clear()
  methods and size property. Should not use es6 objects Map, WeakMap,
  but work in similar way. Map should preserve addition order
  in forEach() method.
  myMap = createMap([['a', 1], ['b', 2], ['c', 3]])
*/
export function createMap(arr) {
  
  const MMap = function(arr) {
    [this.keys, this.values] = [[], []];
    if (arr) {
      arr.forEach((pair) => {
        this.set(pair[0], pair[1]);
      });
    }
  };
  
  MMap.prototype.set = function(a,b) {
    const key = this.keys.indexOf(a);
    if (key !== -1) this.values[key] = b;
    else {
      this.keys.push(a);
      this.values.push(b);
    }
    return this;
  };
  
  MMap.prototype.get = function(a) {
    const key = this.keys.indexOf(a);
    if (key !== -1) return this.values[key];
    return undefined;
  };
  
  MMap.prototype.has = function(a) {
    const key = this.keys.indexOf(a);
    if (key !== -1) return true;
    return false;
  };
  
  MMap.prototype.delete = function(a) {
    const key = this.keys.indexOf(a);
    if (key !== -1) {
      this.keys.splice(key,1);
      this.values.splice(key,1);
      return true;
    }
    return false;
  };
  
  MMap.prototype.forEach = function(fn, thisArg = null) {
    return this.values.forEach((element, index, array = this.values) => {
      return fn(element, this.keys[index]);
    }, thisArg);
  };
  
  MMap.prototype.clear = function() {
    [this.keys, this.values] = [[], []];
    return undefined;
  };
  
  Object.defineProperty(MMap.prototype, "size", {
    get: function () {
      return this.keys.length;
    }
  });
  
  return new MMap(arr);
}

export default {
  createSet,
  createMap
};
