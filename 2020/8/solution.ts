#!/usr/bin/env ts-node-script
import * as fs from 'fs';

const [, , inputFile] = process.argv;

type Command = 'acc' | 'jmp' | 'nop';
type Instruction = [Command, number];

const rawInput = fs.readFileSync(inputFile, { encoding: 'utf-8' });
const input: Instruction[] = rawInput.split('\n').map((d) => {
  const [command, argument] = d.split(' ');
  return [command, parseInt(argument, 10)] as Instruction;
});

function runProgram(instructions: Instruction[]) {
  const executedCommands = new Set<number>();
  let accumulator = 0;
  let nextCommandIndex = 0;

  while (!executedCommands.has(nextCommandIndex)) {
    if (!instructions[nextCommandIndex]) {
      return { accumulator, success: true };
    }

    const [command, argument] = instructions[nextCommandIndex];
    executedCommands.add(nextCommandIndex);

    switch (command) {
      case 'nop': {
        nextCommandIndex += 1;
        break;
      }
      case 'acc': {
        accumulator += argument;
        nextCommandIndex += 1;
        break;
      }
      case 'jmp': {
        nextCommandIndex += argument;
        break;
      }
      default: {
        throw new Error(`Invalid command ${command}`);
      }
    }
  }

  return { accumulator, success: false };
}

console.log(`Initial run: accumulator: ${runProgram(input)?.accumulator}`);

for (let i = 0; i < input.length; i++) {
  const [command, argument] = input[i];
  if (command === 'acc') {
    continue;
  }

  const alteredInput = [...input];
  alteredInput[i] = [command === 'jmp' ? 'nop' : 'jmp', argument];

  const { success, accumulator } = runProgram(alteredInput);

  if (success) {
    console.log(
      `Program completed! Accumulator: ${accumulator} (iteration: ${i})`
    );
    break;
  }
}
