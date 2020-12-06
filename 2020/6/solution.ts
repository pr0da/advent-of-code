#!/usr/bin/env ts-node-script

import * as fs from 'fs';

const [, , inputFile] = process.argv;

const rawInput = fs.readFileSync(inputFile, { encoding: 'utf-8' });
const input = rawInput.split('\n\n');

const answerCounts = input
  .map((d) => d.replace(/\n/g, '').split(''))
  .map((d) => new Set(d))
  .reduce((acc, d) => acc + d.size, 0);

console.log(`Sum of any 'yes' answers: ${answerCounts}`);

const getGroupEveryAnswerCount = (group: string[]) => {
  const groupSize = group.length;
  const answers = group.join('').split('');
  const answerCounts = answers.reduce(
    (acc, answer) => ({
      ...acc,
      [answer]: acc[answer] ? acc[answer] + 1 : 1,
    }),
    {}
  );
  return Object.keys(answerCounts).reduce(
    (acc, answer) => (answerCounts[answer] === groupSize ? acc + 1 : acc),
    0
  );
};

const everyAnswerCounts = input
  .map((d) => d.split('\n'))
  .map(getGroupEveryAnswerCount)
  .reduce((acc, d) => acc + d, 0);

console.log(`Sum of every 'yes' answers: ${everyAnswerCounts}`);
