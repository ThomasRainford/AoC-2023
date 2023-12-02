import { p1 } from "./src/day1/p1";
import { p2 } from "./src/day1/p2";

const part = Bun.argv[2];
if (part === "1") console.log(p1());
else if (part === "2") console.log(p2());
else throw new Error("The day part must be '1' or '2'");
