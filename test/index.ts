import type { Interpret } from "../src";

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Expect<T extends true> = T;

type Result1 = Interpret<"++++[>+++++<-]>--.">;
type Test1 = Expect<Equals<Result1, "\u0012">>;

type Result2 = Interpret<"+++++++++[>++++++++>+++++++++++>+++>+<<<<-]>.>++.+++++++..+++.>+++++.<<+++++++++++++++.>.+++.------.--------.>+.>+.">;
type Test2 = Expect<Equals<Result2, "Hello World!\n">>;

type Result3 = Interpret<",>,<+.>+.", "AB">;
type Test3 = Expect<Equals<Result3, "BC">>;
