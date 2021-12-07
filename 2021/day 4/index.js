const { log } = require("console");
const fs = require("fs");
const { finished } = require("stream");

async function get_result() {
  return new Promise((resolve, reject) => {
    fs.readFile("day 4/input.txt", { encoding: "utf-8" }, (err, data) => {
      const arr = data.split("\r\n").map((n) => {
        return n;
      });

      function bingo(board) {
        // Check each row for straight across bingo
        for (let i = 0; i < 20; i += 5) {
          if (board.nums[i].chosen && board.nums[i + 1].chosen && board.nums[i + 2].chosen && board.nums[i + 3].chosen && board.nums[i + 4].chosen) {
            return true;
          }
        }
        // Check each column for vertical bingo
        for (let i = 0; i < 5; ++i) {
          if (board.nums[i].chosen && board.nums[i + 5].chosen && board.nums[i + 10].chosen && board.nums[i + 15].chosen && board.nums[i + 20].chosen) {
            return true;
          }
        }
        // Top-left to bottom-right diagonal
        if (board.nums[0].chosen && board.nums[6].chosen && board.nums[12].chosen && board.nums[18].chosen && board.nums[24].chosen) return true;

        // Top-right to bottom-left diagonal
        if (board.nums[4].chosen && board.nums[8].chosen && board.nums[12].chosen && board.nums[16].chosen && board.nums[20].chosen) return true;

        return false;
      }

      let numbers = arr[0].split(",").map((c) => {
        return {
          number: c,
          drawn: false,
        };
      });

      // Build the bingo boards
      let boards = [];
      for (let i = 2; i < arr.length; i += 6) {
        let currentBoard = {
            won: false,
          nums: [],
        };
        for (let j = 0; j < 5; ++j) {
          arr[i + j].split(/\s+/).forEach((c) => {
            if (c.trim().length > 0) {
              currentBoard.nums.push({
                n: c,
                chosen: false,
              });
            }
          });
        }
        boards.push(currentBoard);
      }

      // Part 1
        let part1Answer = null,
          part2Answer = null;
        {
          // Play bingo number by number
          numbers.forEach((n) => {
            n.drawn = true;
            boards.forEach((b) => {
              const index = -1;
              for (let k = 0; k < b.nums.length; ++k) {
                if (b.nums[k].n === n.number) {
                  b.nums[k].chosen = true;
                  break;
                }
              }
            });
            // Check for bingo on all boards
            for (let i = 0; i < boards.length; ++i) {
              const win = bingo(boards[i]);
              if (win) {
                let finalAnswer = 0;
                for (let k = 0; k < boards[i].nums.length; ++k) {
                  if (!boards[i].nums[k].chosen) {
                    finalAnswer += Number(boards[i].nums[k].n);
                  }
                }
                finalAnswer *= n.number;
                part1Answer = finalAnswer;
                //resolve(part1Answer);
              }
            }
          });
        }

      // Part 2
      {
        let finishedBoards = [];
        let lastNumberCalled = -1;
        for (let p = 0; p < numbers.length; ++p) {
          const n = numbers[p];
          n.drawn = true;
          boards.forEach((b) => {
            for (let k = 0; k < b.nums.length; ++k) {
              if (b.nums[k].n === n.number) {
                b.nums[k].chosen = true;
              }
            }
          });
          // Check for bingo on all boards
          for (let i = 0; i < boards.length; ++i) {
              if (boards[i].won) continue;
            const win = bingo(boards[i]);
            if (win) {
              finishedBoards.push(boards[i]);
              boards[i].won = true;
              lastNumberCalled = n.number;
            }
          }
          if (finishedBoards.length == boards.length) {
            break;
          }
        }

        let finalAnswer = 0;
        const b = finishedBoards[finishedBoards.length - 1];
        //console.log(JSON.stringify(b));
        for (let k = 0; k < b.nums.length; ++k) {
          if (!b.nums[k].chosen) {
            finalAnswer += Number(b.nums[k].n);
          }
        }
        finalAnswer *= lastNumberCalled;
        part2Answer = finalAnswer;
        resolve(part2Answer);
      }

      resolve("hi");
    });
  });
}

(async () => {
  const x = await get_result();
  console.log(x);
})();
