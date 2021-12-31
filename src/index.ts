import * as fs from 'fs';
import readline from 'readline';

import Scanner from "./scanner.js";
import Token from "./token.js";

let [_nodePath, _scriptMain, ...args] = process.argv;

if (args.length > 1) {
  console.error("Usage: lox [filename]");
  process.exit(64);
} else if (args.length === 1) {
  runFile(args[0]);
} else {
  runPrompt();
}

async function runFile(filename: string) {
  let contents = await fs.promises.readFile(filename);
  run(contents.toString());
}

async function runPrompt() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const prompt = (query: string) => new Promise<string>((resolve) => rl.question(query, resolve));

  while (true) {
    let input = await prompt('> ');

    run(input);
  }
}

function run(source: string) {
  let scanner = new Scanner(source);
  let tokens = scanner.scanTokens();

  for (let token of tokens) {
    console.log(token);
  }
}
