#!/usr/bin/env ts-node-script

import * as fs from 'fs';

const [, , inputFile] = process.argv;

const rawInput = fs.readFileSync(inputFile, { encoding: 'utf-8' });
const input = rawInput.split('\n').map((d) => parseInt(d, 10));
const preamble = parseInt(process.argv[3], 10);

if (!Number.isFinite(preamble)) {
  throw Error('Invalid preable, must be a number');
}

const invalidNumberIndex = input.findIndex((sum, index) => {
  if (index < preamble) {
    return false;
  }

  const prev = input.slice(index - preamble, index);
  for (let i = 0; i < prev.length; i++) {
    for (let j = i + 1; j < prev.length; j++) {
      if (prev[i] + prev[j] === sum) {
        return false;
      }
    }
  }

  return true;
});
const invalidNumber = input[invalidNumberIndex];

console.log(`The invalid number is: ${invalidNumber}`);

outer: for (let i = 0; i < invalidNumberIndex; i++) {
  let sum = 0;
  for (let j = i; j < invalidNumberIndex; j++) {
    sum += input[j];
    if (sum > invalidNumber) {
      sum = 0;
      break;
    }
    if (sum === invalidNumber) {
      const range = input.slice(i, j + 1);
      const min = Math.min(...range);
      const max = Math.max(...range);
      console.log(`Found: ${min} + ${max} = ${min + max}`);
      break outer;
    }
  }
}
