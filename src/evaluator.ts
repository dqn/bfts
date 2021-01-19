import type { Recurse } from "./recurse";
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

type EvaluateCore<Operators, Memory, Input, Result = []> = Operators extends [
  infer N,
  ...infer Rest
]
  ? N extends ">"
    ? { __rec: EvaluateCore<Rest, LRotate<Memory>, Input, Result> }
    : N extends "<"
    ? { __rec: EvaluateCore<Rest, RRotate<Memory>, Input, Result> }
    : N extends "+"
    ? {
        __rec: EvaluateCore<
          Rest,
          Write<Memory, NextNumber<Head<Memory>>>,
          Input,
          Result
        >;
      }
    : N extends "-"
    ? {
        __rec: EvaluateCore<
          Rest,
          Write<Memory, PrevNumber<Head<Memory>>>,
          Input,
          Result
        >;
      }
    : N extends ","
    ? Input extends `${infer S}${infer R}`
      ? { __rec: EvaluateCore<Rest, Write<Memory, AtoI<S>>, R, Result> }
      : never
    : N extends "."
    ? { __rec: EvaluateCore<Rest, Memory, Input, Append<Result, Head<Memory>>> }
    : N extends Operator[]
    ? 0 extends Head<Memory>
      ? { __rec: EvaluateCore<Rest, Memory, Input, Result> }
      : {
          __rec: Recurse<EvaluateCore<N, Memory, Input, Result>> extends [
            infer MResult,
            infer OResult
          ]
            ? { __rec: EvaluateCore<Operators, MResult, Input, OResult> }
            : never;
        }
    : never
  : [Memory, Result];

export type Evaluate<Operators, Memory, Input> = Recurse<
  EvaluateCore<Operators, Memory, Input>
>[1];
