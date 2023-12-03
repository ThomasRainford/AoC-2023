import { readFileSync } from "node:fs";

const readInput = () => {
  const inputFileName = Bun.argv[3];
  if (inputFileName !== "sample" && inputFileName !== "input") {
    throw new Error("The filename must be 'sample' or 'input'.");
  }
  let data = readFileSync(`./src/day1/p1/${Bun.argv[3]}.txt`, "utf8").split(
    "\n"
  );
  return data;
};
export const p1 = () => {
  const input = readInput();
  console.log(input);

  const result = 0;

  console.log("\nResult");
  return result;
};
