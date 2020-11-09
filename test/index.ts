import type { Interpret } from "../src";

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Expect<T extends true> = T;

type Result = Expect<Equals<Interpret<"+++++[>+++<-]>+++.">, "\u0012">>;
