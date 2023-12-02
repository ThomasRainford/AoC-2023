import { readFileSync } from "node:fs";

const readInput = () => {
  const inputFileName = Bun.argv[3];
  if (inputFileName !== "sample" && inputFileName !== "input") {
    throw new Error("The filename must be 'sample' or 'input'.");
  }
  let data = readFileSync(`./src/day1/p2/${Bun.argv[3]}.txt`, "utf8").split(
    "\n"
  );
  return data;
};

const numString = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
};

const isNum = (value: string) => {
  return !Number.isNaN(Number(value));
};

export const p2 = () => {
  const input = readInput();
  const rowNums: number[][] = [];
  input.forEach((r) => {
    let _r = r;
    if (_r.includes("one")) {
      _r = _r.replaceAll("one", "o1ne");
    }
    if (_r.includes("two")) {
      _r = _r.replaceAll("two", "t2wo");
    }
    if (_r.includes("three")) {
      _r = _r.replaceAll("three", "thr3ee");
    }
    if (_r.includes("four")) {
      _r = _r.replaceAll("four", "fo4ur");
    }
    if (_r.includes("five")) {
      _r = _r.replaceAll("five", "fi5ve");
    }
    if (_r.includes("six")) {
      _r = _r.replaceAll("six", "si6x");
    }
    if (_r.includes("seven")) {
      _r = _r.replaceAll("seven", "se7ven");
    }
    if (_r.includes("eight")) {
      _r = _r.replaceAll("eight", "ei8ght");
    }
    if (_r.includes("nine")) {
      _r = _r.replaceAll("nine", "ni9ne");
    }
    if (_r.includes("zero")) {
      _r = _r.replaceAll("zero", "ze0ro");
    }
    console.log(r, _r);
    const row = _r.split("");
    const rowNum: number[] = [];
    row.forEach((value) => {
      if (isNum(value)) {
        const num = Number(value);
        rowNum.push(num);
      }
    });
    rowNums.push(rowNum);
  });
  console.log(rowNums);

  let result = 0;
  rowNums.forEach((row) => {
    if (row.length === 0) {
    } else if (row.length === 1) {
      const num = Number(`${row[0]}${row[0]}`);
      result += num;
    } else {
      result += Number(`${row[0]}${row[row.length - 1]}`);
    }
  });

  return result;
};
