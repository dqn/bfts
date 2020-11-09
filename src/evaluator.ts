import type {
  NextNumber,
  PrevNumber,
  LRotate,
  RRotate,
  Head,
  Append,
} from "./util";

type Operator = ">" | "<" | "+" | "-" | "." | "," | Operator[];

type IncrementHead<A> = A extends [infer Head, ...infer Rest]
  ? [NextNumber<Head>, ...Rest]
  : never;

type DecrementHead<A> = A extends [infer Head, ...infer Rest]
  ? [PrevNumber<Head>, ...Rest]
  : never;

// [Memory, Output]
export type Evaluate<Operators, M, O = []> = Operators extends [
  infer N,
  ...infer Rest
]
  ? N extends ">"
    ? Evaluate<Rest, LRotate<M>, O>
    : N extends "<"
    ? Evaluate<Rest, RRotate<M>, O>
    : N extends "+"
    ? Evaluate<Rest, IncrementHead<M>, O>
    : N extends "-"
    ? Evaluate<Rest, DecrementHead<M>, O>
    : N extends ","
    ? Evaluate<Rest, M, O>
    : N extends "."
    ? Evaluate<Rest, M, Append<O, Head<M>>>
    : N extends Operator[]
    ? 0 extends Head<M>
      ? Evaluate<Rest, M, O>
      : Evaluate<N, M, O> extends [infer MResult, infer OResult]
      ? Evaluate<Operators, MResult, OResult>
      : never
    : never
  : [M, O];
