import type { Stringify } from "./util";
import type { Parse } from "./parser";
import type { Evaluate } from "./evaluator";

type Memory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

type Execute<S> = Evaluate<Parse<S>, Memory>;

export type Interpret<S> = Stringify<Execute<S>[1]>;
