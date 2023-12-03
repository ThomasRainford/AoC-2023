import { readFileSync } from "node:fs";

const readInput = () => {
  const inputFileName = Bun.argv[3];
  if (inputFileName !== "sample" && inputFileName !== "input") {
    throw new Error("The filename must be 'sample' or 'input'.");
  }
  let data = readFileSync(`./src/day2/p1/${Bun.argv[3]}.txt`, "utf8").split(
    "\n"
  );
  return data;
};

type Cube = {
  colour: "red" | "green" | "blue";
  amount: number;
};

type Set = {
  cubes: Cube[];
};

type Game = {
  gameId: number;
  sets: Set[];
};

const required = {
  red: 12,
  green: 13,
  blue: 14,
};

const parseInput = (input: string[]) => {
  const games: Game[] = [];

  input.forEach((row) => {
    const rowSplit = row.split("");
    const indexOfSC = row.indexOf(":");
    let gameId = 0;
    if (rowSplit[indexOfSC - 2] === " ") {
      gameId = Number(rowSplit[indexOfSC - 1]);
    } else if (rowSplit[indexOfSC - 4] === " ") {
      gameId = Number(
        `${rowSplit[indexOfSC - 3]}${rowSplit[indexOfSC - 2]}${
          rowSplit[indexOfSC - 1]
        }`
      );
    } else {
      gameId = Number(`${rowSplit[indexOfSC - 2]}${rowSplit[indexOfSC - 1]}`);
    }
    const game: Game = {
      gameId,
      sets: [],
    };
    const setsString = row.split(": ")[1].split("; ");
    setsString.forEach((setString) => {
      const set: Set = {
        cubes: [],
      };
      const cubes = setString.split(", ");
      cubes.forEach((c) => {
        set.cubes.push({
          amount: Number(c.split(" ")[0]),
          colour: c.split(" ")[1] as "red" | "green" | "blue",
        });
        c.split(" ");
      });
      game.sets.push(set);
    });
    games.push(game);
  });
  return games;
};

export const p2 = () => {
  const input = readInput();

  const games: Game[] = parseInput(input);
  let result = 0;
  games.forEach((game) => {
    const allCubes: Cube[] = [];
    game.sets.forEach((set) => {
      set.cubes.forEach((c) => allCubes.push(c));
    });
    let maxRed = 0;
    allCubes.forEach((c) => {
      if (c.colour !== "red") return;
      if (c.amount > maxRed) maxRed = c.amount;
    });
    let maxGreen = 0;
    allCubes.forEach((c) => {
      if (c.colour !== "green") return;
      if (c.amount > maxGreen) maxGreen = c.amount;
    });
    let maxBlue = 0;
    allCubes.forEach((c) => {
      if (c.colour !== "blue") return;
      if (c.amount > maxBlue) maxBlue = c.amount;
    });
    result += maxRed * maxGreen * maxBlue;
  });
  console.log("\nResult:");
  return result;
};
