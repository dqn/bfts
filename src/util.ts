import type { Chars, Numbers } from "./const";

export type Head<A> = A extends [infer Head, ...infer _] ? Head : never;

export type Append<A, E> = A extends any[] ? [...A, E] : never;

export type RRotate<A> = A extends [...infer Rest, infer Tail]
  ? [Tail, ...Rest]
  : never;

export type LRotate<A> = A extends [infer Head, ...infer Rest]
  ? [...Rest, Head]
  : never;

export type NextNumber<I> = I extends number ? LRotate<Numbers>[I] : never;

export type PrevNumber<I> = I extends number ? RRotate<Numbers>[I] : never;

export type CharAt<C> = C extends number ? Chars[C] : never

export type Stringify<O> = O extends [infer Head, ...infer Rest] ? `${CharAt<Head>}${Stringify<Rest>}` : "";
