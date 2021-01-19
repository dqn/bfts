import type { Stringify } from "./util";
import type { Parse } from "./parser";
import type { Evaluate } from "./evaluator";

type Execute<Source, Input extends string = ""> = Evaluate<
  Parse<Source>,
  Input
>;

export type Interpret<S, Input extends string = ""> = Stringify<
  Execute<S, Input>
>;
