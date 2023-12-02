import { readFileSync } from "node:fs";

const readInput = () => {
  const inputFileName = Bun.argv[3];
  if (inputFileName !== "sample" && inputFileName !== "input") {
    throw new Error("The filename must be 'sample' or 'input'.");
  }
  let data = readFileSync(`./src/day2/p2/${Bun.argv[3]}.txt`, "utf8").split(
    "\n"
  );
  return data;
};
export const p2 = () => {
  const input = readInput();
  console.log(input);
};
