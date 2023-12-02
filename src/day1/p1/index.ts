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

const isNum = (value: string) => {
  return !Number.isNaN(Number(value));
};

export const p1 = () => {
  const input = readInput();
  const rowNums: number[][] = [];
  input.forEach((r) => {
    const row = r.split("");
    const rowNum: number[] = [];
    row.forEach((value) => {
      if (isNum(value)) {
        const num = Number(value);
        rowNum.push(num);
      }
    });
    rowNums.push(rowNum);
  });

  let result = 0;
  rowNums.forEach((row) => {
    if (row.length === 1) {
      const num = Number(`${row[0]}${row[0]}`);
      result += num;
    } else {
      result += Number(`${row[0]}${row[row.length - 1]}`);
    }
  });

  return result;
};
