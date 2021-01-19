import type { CharMap, Chars, Numbers } from "./const";

export type Head<A> = A extends [infer Head, ...infer _] ? Head : never;

export type Append<A, E> = A extends any[] ? [...A, E] : never;

export type RotateLeft<A> = A extends [infer Head, ...infer Rest]
  ? [...Rest, Head]
  : never;

export type RotateRight<A> = A extends [...infer Rest, infer Tail]
  ? [Tail, ...Rest]
  : never;

export type NextNumber<I> = I extends number ? RotateLeft<Numbers>[I] : never;

export type PrevNumber<I> = I extends number ? RotateRight<Numbers>[I] : never;

export type CharAt<C> = C extends number ? Chars[C] : never;

export type Stringify<O> = O extends [infer Head, ...infer Rest]
  ? `${CharAt<Head>}${Stringify<Rest>}`
  : "";

export type AtoI<A> = A extends keyof CharMap ? CharMap[A] : never;
