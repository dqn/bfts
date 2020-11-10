# bfts

[![CI](https://github.com/dqn/bfts/workflows/CI/badge.svg)](https://github.com/dqn/bfts/actions)
[![npm version](https://img.shields.io/npm/v/bfts.svg)](https://www.npmjs.com/package/bfts)

Type-Level Brainfuck interpreter written in TypeScript 4.1.

## Prerequirement

- TypeScript >= 4.1

If you use it as is, it will immediately exceed the recursion limit. You can force the recursion limit to be disabled in order to run a larger program.

```bash
$ sed -i -e 's/instantiationDepth === 50 || instantiationCount >= 5000000/false/' node_modules/typescript/lib/{tsc,tsserver}.js
```

## Installation

Using npm:

```bash
$ npm install bfts
```

Using yarn:

```bash
$ yarn add bfts
```

## Example

```ts
import type { Interpret } from "bfts";

type Result1 = Interpret<"++++[>+++++<-]>--.">;
// type Result1 = "\u0012"

type Result2 = Interpret<
  "+++++++++[>++++++++>+++++++++++>+++>+<<<<-]>.>++.+++++++..+++.>+++++.<<+++++++++++++++.>.+++.------.--------.>+.>+."
>;
// type Result2 = "Hello World!\n"

// With input
type Result3 = Interpret<",+>,+>,+<<.>.>.", "ABC">;
// type Result3 = "BCD"
```

## License

MIT
