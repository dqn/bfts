import type {
  NextNumber,
  PrevNumber,
  LRotate,
  RRotate,
  Head,
  Append,
  AtoI,
} from "./util";

type Operator = ">" | "<" | "+" | "-" | "." | "," | Operator[];

type Write<M, N> = {
  [K in keyof M]: K extends "0" ? N : M[K];
};

// [Memory, Output]
export type Evaluate<Operators, M, I, O> = Operators extends [
  infer N,
  ...infer Rest
]
  ? N extends ">"
    ? Evaluate<Rest, LRotate<M>, I, O>
    : N extends "<"
    ? Evaluate<Rest, RRotate<M>, I, O>
    : N extends "+"
    ? Evaluate<Rest, Write<M, NextNumber<Head<M>>>, I, O>
    : N extends "-"
    ? Evaluate<Rest, Write<M, PrevNumber<Head<M>>>, I, O>
    : N extends ","
    ? I extends `${infer S}${infer R}`
      ? Evaluate<Rest, Write<M, AtoI<S>>, R, O>
      : never
    : N extends "."
    ? Evaluate<Rest, M, I, Append<O, Head<M>>>
    : N extends Operator[]
    ? 0 extends Head<M>
      ? Evaluate<Rest, M, I, O>
      : Evaluate<N, M, I, O> extends [infer MResult, infer OResult]
      ? Evaluate<Operators, MResult, I, OResult>
      : never
    : never
  : [M, O];
