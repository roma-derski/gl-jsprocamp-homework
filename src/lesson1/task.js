/*
  Напишите функцию, которая принимает 1 аргумент и возварщает его тип
*/
function getDataType(variable) {
  if (arguments.length === 1) return typeof variable;
  console.log ('this function expects exactly ONE argument');
  return;
}

/*
  Напишите функцию, которая принимает 1 аргумент и возвращает:
  'primitive' если тип данных относится к примивным
  'primitive-special' если тип данных специальный
  'object' - если простой обьект
  'object-array' - если массив
  'object-function' - если функция
*/
function getDataTypePseudoName(variable) {
  if (arguments.length !== 1) return 'this function expects exactly ONE argument';
  if (variable && variable.constructor.name) {
    switch (variable.constructor.name) {
      case 'String':
      case 'Number':
      case 'Boolean':
        return 'primitive';
      
      case 'Object':
        return 'object';
      
      case 'Array':
        return 'object-array';
      
      case 'Function':
        return 'object-function';
    }
  }
  return 'primitive-special';
}


/*
  Напишите функцию, которая принимает 2 аргумента,
  и возврвщает 1 если их значения и их типы равны,
  0 если равны только значения
  и -1 в другом случае
*/
function compareByType(a, b) {
  if (arguments.length !== 2) return 'this function expects exactly TWO arguments';
  switch ((a === b) + (a == b)) {
    case 2:
      return 1;
    case 1:
      return 0;
    default:
      return -1;
  }
}

// Numbers

/*
  Напишите функцию, которая принимает 1 аргумент,
  и в случае если аргумент имеет числовой тип увеличивает его на 1
  и возврвщвет результат,
  в любом другом случае возврвщвет -1
*/
function increase(value) {
  if (arguments.length !== 1) return 'this function expects exactly ONE argument';
  if (value.constructor.name == 'Number' && isFinite(value)) return value+1;
  return -1;  
}

/*
  Напишите функцию, которая принимает 1 аргумент(число),
  и в случае если аргумент не Infinity или NaN возвращает строку 'safe' иначе 'danger'
*/
function testForSafeNumber(value) {
  if (arguments.length !== 1 || value.constructor.name !== 'Number') return 'this function expects exactly ONE Number argument';
  if (isFinite(value)) {
    return 'safe';
  }
  return 'danger';
}



// Strings

/*
  Напишите функцию, которая принимает 1 аргумент (строку),
  и возвращает массив из елементов строки разделенных по пробелу ' '
*/
function stringToArray(str) {
  if (arguments.length !== 1 || str.constructor.name !== 'String') return 'this function expects exactly ONE String argument';
  if (!str) return 'empty string is not allowed';
  const arr = str.trim().split(/\s+/);
  return arr;
}


/*
  Напишите функцию, которая принимает 1 аргумент (строку),
  и возвращает часть этой строки до первой запятой
*/
function getStringPart(str) {
  if (arguments.length !== 1 || str.constructor.name !== 'String') return 'this function expects exactly ONE String argument';
  if (!str) return 'empty string is not allowed';
  if (str.indexOf(',') === -1) return 'string without coma, nothing to do';
  const firstComaPosition = str.indexOf(',');
  const newString = str.substring(0, firstComaPosition);
  return newString;
}

/*
  Напишите функцию, которая принимает 2 аргумента (строку и симовл),
  и возвращает порядковый номер симовола в строе если символ встречается в строке 1 раз,
  false в противоположном случае
*/
function isSingleSymbolMatch(str, symbol) {
  if (arguments.length !== 2) return 'this function expects exactly TWO String arguments';
  if (!str || !symbol || str.constructor.name !== 'String' || symbol.constructor.name !== 'String') {
    return 'non-empty strings are required as arguments';
  }
  const re = new RegExp(symbol, "g");
  if (str.match(re).length === 1) return (str.indexOf(symbol));
  return false;
}

/*
  Напишите функцию, которая принимает 2 аргумента,
  массив в разделитель[опционально],
  и возвращает строку ввиде элементов массива c разделителями если разделитель задан
  или строку разделенную "-" если не задан
*/
function join(array, separator) {
  if (arguments.length !== 2) return 'this function expects exactly TWO arguments';
  if (!array || array.constructor.name !== 'Array' || separator.constructor.name !== 'String') {
    return 'non-empty array to join and string as separator are required as arguments';
  }
  return array.join(separator || '-');
}


/*
  Напишите функцию, которая принимает 2 массива,
  и возвращает один состоящий из элементов перового и второго (последовательно сначала первый потом второй)
*/
function glue(arrA, arrB) {
  if (arguments.length !== 2) return 'this function expects exactly TWO arguments';
  if (arrA.constructor.name !== 'Array' || arrB.constructor.name !== 'Array') {
    return 'arrays are required as arguments';
  }  
  return arrA.concat(arrB);
}


/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой массив отсортированный от большего к меньшему
*/
function order(arr) {
  if (arguments.length !== 1) return 'this function expects exactly ONE argument';
  if (arr.constructor.name !== 'Array' || arr.length === 0) {
    return 'non-empty array is required as argument';
  } 
  return arr.sort((a,b) => {
    return a < b;
  });
}


/*
  Напишите функцию, которая принимает 1 массив,
  и возвращает другой без чисел которые меньше 0
*/
function removeNegative(arr) {
  if (arguments.length !== 1) return 'this function expects exactly ONE argument';
  if (arr.constructor.name !== 'Array' || arr.length === 0) {
    return 'non-empty array is required as argument';
  }
  const filteredArr = [];
  for (let i=0; i<arr.length; i++) {
    if (arr[i].constructor.name === 'Number' && !Number.isNaN(arr[i])) {
      if (arr[i] >= 0) {
        filteredArr.push(arr[i]);
      }
    }
    else filteredArr.push(arr[i]);
  }
  return filteredArr;
}

/*
  Напишите функцию, которая принимает 2 числовых массива,
  и возвращает новый массив, состоящий из элементов первого но без элементов
  которые присутствуют во втром
  [1,2,3], [1, 3] => [2]
*/
function without(arrA, arrB) {
  if (arguments.length !== 2) return 'this function expects exactly TWO arguments';
  if (arrA.constructor.name !== 'Array' || arrB.constructor.name !== 'Array') {
    return 'arrays are required as arguments';
  } 
  const filteredArrA = [];
  arrA.forEach((a) => {
    let criterion = 0;
    arrB.forEach((b) => {
      criterion += (a === b);
    });
    if (!criterion) filteredArrA.push(a);
  });
  return filteredArrA;
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение математической операции с двумя
  операндами (поддерживаются 4 базовых оператора + - / *).
  Функция вычисляет выражение и возвращает число либо NaN.
  '12/6' => 2
*/
function calcExpression(expression) {
  if (!expression) return 'this function expects string of mathematical expression';
  const re = /\*|\/|\+|\-/;
  const operator = expression.match(re)[0];
  const operands = expression.split(operator);
  if (operands.length !== 2) return 'this function expects string of mathematical expression with 2 operands';
  const calcul = {
    '+': function (operands) { return Number(operands[0]) + Number(operands[1]) },
    '-': function (operands) { return Number(operands[0]) - Number(operands[1]) },
    '/': function (operands) { return Number(operands[0]) / Number(operands[1]) },
    '*': function (operands) { return Number(operands[0]) * Number(operands[1]) }
  };
  return calcul[operator](operands);
}

/*
  Напишите функцию, которая принимает строку,
  содержащую выражение логической операции с двумя
  операндами (поддерживаются 5 базовых операторов > < = >= <=).
  Функция вычисляет выражение и возвращает true / false,
  либо бросает exception в случае ошибки.
  '100>5' => true
*/
function calcComparison(expression) {
  if (!expression) return 'this function expects string of logical expression';
  const regex = />=|<=|>|<|=/;
  const operator = expression.match(regex)[0];
  const operands = expression.split(operator);
  if (operands.length !== 2) return 'this function expects string of logical expression with 2 operands';
  if (!isFinite(operands[0]) || !isFinite(operands[1])) throw new Error();
  const calcul = {
    '>=': function (operands) { return Number(operands[0]) >= Number(operands[1]) },
    '<=': function (operands) { return Number(operands[0]) <= Number(operands[1]) },
    '=': function (operands) { return Number(operands[0]) == Number(operands[1]) },
    '>': function (operands) { return Number(operands[0]) > Number(operands[1]) },
    '<': function (operands) { return Number(operands[0]) < Number(operands[1]) }
  };
  return calcul[operator](operands);
}

/*
  Напишите функцию, которая принимает обьект и строку,
  содержащую выражение доступа к свойствам обьекта.
  Функция возвращает значение запрашиваемого свойства либо
  бросает exception в случае ошибки.
  { a: { x: 2 }, b: 5 }, '.a.x' => 2
  { a: 1, b: 2 }, '.c' => exception
*/
function evalKey(obj, expression) {
  const keysArr = expression.split('.');
  keysArr.shift();
  let target;
  if (obj.hasOwnProperty(keysArr[0])) {
    target = obj[keysArr[0]];
  }
  else throw new Error();
  for (let i=1; i<keysArr.length; i++) {
    if (target.hasOwnProperty(keysArr[i])) {
      target = target[keysArr[i]];
    }
    else throw new Error();
  }
  return target;
}


export default {
  getDataType,
  getDataTypePseudoName,
  compareByType,
  increase,
  testForSafeNumber,
  stringToArray,
  getStringPart,
  isSingleSymbolMatch,
  join,
  glue,
  order,
  removeNegative,
  without,
  calcExpression,
  calcComparison,
  evalKey
};
