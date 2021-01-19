import type { Recurse } from "./recurse";
import type {
  NextNumber,
  PrevNumber,
  RotateLeft,
  RotateRight,
  Head,
  Append,
  AtoI,
} from "./util";
import type { InitializedMemory } from "./memory";

type Operator = ">" | "<" | "+" | "-" | "." | "," | Operator[];

type Write<M, N> = {
  [K in keyof M]: K extends "0" ? N : M[K];
};

type EvaluateCore<
  Operators,
  Input extends string = "",
  Memory = InitializedMemory,
  Result = []
> = Operators extends [infer N, ...infer Rest]
  ? N extends ">"
    ? { __rec: EvaluateCore<Rest, Input, RotateLeft<Memory>, Result> }
    : N extends "<"
    ? { __rec: EvaluateCore<Rest, Input, RotateRight<Memory>, Result> }
    : N extends "+"
    ? {
        __rec: EvaluateCore<
          Rest,
          Input,
          Write<Memory, NextNumber<Head<Memory>>>,
          Result
        >;
      }
    : N extends "-"
    ? {
        __rec: EvaluateCore<
          Rest,
          Input,
          Write<Memory, PrevNumber<Head<Memory>>>,
          Result
        >;
      }
    : N extends ","
    ? Input extends `${infer S}${infer R}`
      ? { __rec: EvaluateCore<Rest, R, Write<Memory, AtoI<S>>, Result> }
      : never
    : N extends "."
    ? { __rec: EvaluateCore<Rest, Input, Memory, Append<Result, Head<Memory>>> }
    : N extends Operator[]
    ? 0 extends Head<Memory>
      ? { __rec: EvaluateCore<Rest, Input, Memory, Result> }
      : {
          __rec: Recurse<EvaluateCore<N, Input, Memory, Result>> extends [
            infer Memory2,
            infer Result2
          ]
            ? { __rec: EvaluateCore<Operators, Input, Memory2, Result2> }
            : never;
        }
    : never
  : [Memory, Result];

export type Evaluate<Operators, Input extends string> = Recurse<
  EvaluateCore<Operators, Input>
>[1];
