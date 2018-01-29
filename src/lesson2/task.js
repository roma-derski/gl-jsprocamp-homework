/*
  Напишите функцию, которая параметрами принимает 2 числа и возвращает их сумму
*/
export function sum(a, b) {
  if (arguments.length !== 2) throw new Error('this function expects exactly TWO arguments');
  const args = Array.prototype.slice.call(arguments);
  for (let i of args) {
    if (i.constructor.name !== 'Number' || Number.isNaN(i)) return NaN;
  }
  return Number(a) + Number(b);
}

/*
  Напишите функцию, которая возвращает сумму всех чисел, что передаются параметрами
*/
function sumAll() {
  const args = Array.prototype.slice.call(arguments);
  for (let i of args) {
    if (i.constructor.name !== 'Number' || Number.isNaN(i)) return NaN;
  }
  const sum = args.reduce(function (a,b) {
    return a+b;
  });
  return sum;
}

/*
  Напишите функцию, которая возвращает число x в степень n
*/
export function pow(x, n) {
  if (arguments.length !== 2) throw new Error('this function expects exactly TWO arguments');
  const args = Array.prototype.slice.call(arguments);
  for (let i of args) {
    if (i.constructor.name !== 'Number' || Number.isNaN(i)) return NaN;
  }
  return Math.pow(x,n);
}

/*
  Напишите функцию, которая возвращает рандомное целое число от from до to
*/
export function random(from, to) {
  if (arguments.length !== 2) throw new Error('this function expects exactly TWO arguments');
  const args = Array.prototype.slice.call(arguments);
  for (let i of args) {
    if (i.constructor.name !== 'Number' || Number.isNaN(i)) return NaN;
  }
  if (arguments[0] > arguments[1]) throw new Error('provide lower boundary first');
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

export default {
  sum,
  sumAll,
  pow,
  random
};

