import type { Recurse } from "./recurse";

type ParseCore<S, Operators extends any[] = []> = S extends `>${infer Rest}`
  ? { __rec: ParseCore<Rest, [...Operators, ">"]> }
  : S extends `<${infer Rest}`
  ? { __rec: ParseCore<Rest, [...Operators, "<"]> }
  : S extends `+${infer Rest}`
  ? { __rec: ParseCore<Rest, [...Operators, "+"]> }
  : S extends `-${infer Rest}`
  ? { __rec: ParseCore<Rest, [...Operators, "-"]> }
  : S extends `.${infer Rest}`
  ? { __rec: ParseCore<Rest, [...Operators, "."]> }
  : S extends `,${infer Rest}`
  ? { __rec: ParseCore<Rest, [...Operators, ","]> }
  : S extends `[${infer Rest}`
  ? {
      __rec: Recurse<ParseCore<Rest>> extends [
        infer Operators2,
        `]${infer Rest2}`
      ]
        ? { __rec: ParseCore<Rest2, [...Operators, Operators2]> }
        : never;
    }
  : { __rec: [Operators, S] };

export type Parse<Source> = Recurse<ParseCore<Source>> extends [
  infer Operators,
  infer Rest
]
  ? Rest extends ""
    ? Operators
    : never
  : never;
