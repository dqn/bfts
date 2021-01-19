import type { Stringify } from "./util";
import type { Parse } from "./parser";
import type { Evaluate } from "./evaluator";

type Memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

type Execute<Source, Input> = Evaluate<Parse<Source>, Memory, Input>;

export type Interpret<S, Input = ""> = Stringify<Execute<S, Input>>;
