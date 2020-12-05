#!/usr/bin/env ts-node-script

import * as fs from 'fs';

const [, , inputFile] = process.argv;

const rawInput = fs.readFileSync(inputFile, { encoding: 'utf-8' });
const input = rawInput.split('\n');

const boardingPasses = input.map((bp) => {
  let row = [0, 127];
  for (let i = 0; i < 7; i++) {
    const [lower, upper] = row;
    const half = Math.ceil((upper - lower) / 2);
    if (bp[i] === 'F') {
      row = [lower, upper - half];
    } else if (bp[i] === 'B') {
      row = [lower + half, upper];
    } else {
      throw new Error('Ivalid boarding pass');
    }
  }

  let column = [0, 7];
  for (let i = 7; i < 10; i++) {
    const [lower, upper] = column;
    const half = Math.ceil((upper - lower) / 2);
    if (bp[i] === 'L') {
      column = [lower, upper - half];
    } else if (bp[i] === 'R') {
      column = [lower + half, upper];
    } else {
      throw new Error('Ivalid boarding pass');
    }
  }

  return [row[0], column[0]];
});

const seatIds = boardingPasses.map(([r, c]) => r * 8 + c);
const sortedSeatIds = seatIds.sort((a, b) => a - b);
const lowestSeatId = sortedSeatIds[0];
const highestSeatId = sortedSeatIds[sortedSeatIds.length - 1];

let mySeatId: number;
for (let i = lowestSeatId; i < highestSeatId; i++) {
  if (!sortedSeatIds.includes(i)) {
    mySeatId = i;
    break;
  }
}

console.log('Lowest seat ID:', lowestSeatId);
console.log('Highest seat ID:', highestSeatId);
console.log(
  `My seat ID: ${mySeatId} (${Math.floor(mySeatId / 8)}/${mySeatId % 8})`
);
