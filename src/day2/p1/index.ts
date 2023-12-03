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

export const p1 = () => {
  const input = readInput();

  const games: Game[] = parseInput(input);
  let result = 0;
  games.forEach((game) => {
    let found = false;
    for (let index = 0; index < game.sets.length; index++) {
      const set = game.sets[index];
      for (let index = 0; index < set.cubes.length; index++) {
        const cube = set.cubes[index];
        if (cube.colour === "red" && cube.amount > required["red"]) {
          found = true;
          break;
        } else if (cube.colour === "green" && cube.amount > required["green"]) {
          found = true;
          break;
        } else if (cube.colour === "blue" && cube.amount > required["blue"]) {
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) {
      console.log(game.gameId);
      result += game.gameId;
    }
  });
  console.log("\nResult:");
  return result;
};
