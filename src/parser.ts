export type Parse<S, Operators extends any[] = []> = S extends `>${infer Rest}`
  ? Parse<Rest, [...Operators, ">"]>
  : S extends `<${infer Rest}`
  ? Parse<Rest, [...Operators, "<"]>
  : S extends `+${infer Rest}`
  ? Parse<Rest, [...Operators, "+"]>
  : S extends `-${infer Rest}`
  ? Parse<Rest, [...Operators, "-"]>
  : S extends `.${infer Rest}`
  ? Parse<Rest, [...Operators, "."]>
  : S extends `,${infer Rest}`
  ? Parse<Rest, [...Operators, ","]>
  : S extends `[${infer Rest}`
  ? Parse<Rest> extends [infer OperatorsResult, infer RestResult]
    ? Parse<RestResult, [...Operators, OperatorsResult]>
    : never
  : S extends `]${infer Rest}`
  ? [Operators, Rest]
  : Operators;
