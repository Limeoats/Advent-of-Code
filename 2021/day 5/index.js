const fs = require("fs");

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 5/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\r\n').map((n) => {
                return n;
            });

            const coordinates = arr.map(str => {
                const [c1, , c2] = str.split(" ");
                const [x1, y1] = c1.split(",");
                const [x2, y2] = c2.split(",");
                return {
                    p1: {
                        x: Number(x1),
                        y: Number(y1)
                    },
                    p2: {
                        x: Number(x2),
                        y: Number(y2),
                    },
                };
            });

            // Generate the lines
            const s = 1000;
            const lines = Array(s).fill().map(() => Array(s).fill(0));

            // Part 1
            let part1Answer = null, part2Answer = null;
            {
                for (let i = 0; i < coordinates.length; ++i) {
                    const coordSet = coordinates[i];
                    // either x1 will equal x2 or y1 will equal y2
                    if (coordSet.p1.x == coordSet.p2.x) {
                        lines[coordSet.p1.x][coordSet.p1.y]++;
                        lines[coordSet.p2.x][coordSet.p2.y]++;
                        if (coordSet.p1.y < coordSet.p2.y) {
                            for (let y = coordSet.p1.y + 1; y < coordSet.p2.y; ++y) {
                                lines[coordSet.p1.x][y]++;
                            }
                        }
                        else if (coordSet.p1.y > coordSet.p2.y) {
                            for (let y = coordSet.p2.y + 1; y < coordSet.p1.y; ++y) {
                                lines[coordSet.p2.x][y]++;
                            }
                        }
                    }
                    else if (coordSet.p1.y == coordSet.p2.y) {
                        lines[coordSet.p1.x][coordSet.p1.y]++;
                        lines[coordSet.p2.x][coordSet.p2.y]++;
                        if (coordSet.p1.x < coordSet.p2.x) {
                            for (let x = coordSet.p1.x + 1; x < coordSet.p2.x; ++x) {
                                lines[x][coordSet.p1.y]++;
                            }
                        }
                        else if (coordSet.p1.x > coordSet.p2.x) {
                            for (let x = coordSet.p2.x + 1; x < coordSet.p1.x; ++x) {
                                lines[x][coordSet.p1.y]++;
                            }
                        }
                    }
                }

                let result = 0;
                for (let i = 0; i < lines.length; ++i) {
                    for (let j = 0; j < lines[i].length; ++j) {
                        if (lines[i][j] >= 2) {
                            ++result;
                        }
                    }
                }
                resolve(result);
            }

            // Part 2
            {
                
                for (let i = 0; i < coordinates.length; ++i) {
                    let tmparr = [];
                    const coordSet = coordinates[i];
                    // either x1 will equal x2 or y1 will equal y2
                    if (coordSet.p1.x == coordSet.p2.x) {
                        lines[coordSet.p1.x][coordSet.p1.y]++;
                        lines[coordSet.p2.x][coordSet.p2.y]++;
                        if (coordSet.p1.y < coordSet.p2.y) {
                            for (let y = coordSet.p1.y + 1; y < coordSet.p2.y; ++y) {
                                lines[coordSet.p1.x][y]++;
                            }
                        }
                        else if (coordSet.p1.y > coordSet.p2.y) {
                            for (let y = coordSet.p2.y + 1; y < coordSet.p1.y; ++y) {
                                lines[coordSet.p2.x][y]++;
                            }
                        }
                    }
                    else if (coordSet.p1.y == coordSet.p2.y) {
                        lines[coordSet.p1.x][coordSet.p1.y]++;
                        lines[coordSet.p2.x][coordSet.p2.y]++;
                        if (coordSet.p1.x < coordSet.p2.x) {
                            for (let x = coordSet.p1.x + 1; x < coordSet.p2.x; ++x) {
                                lines[x][coordSet.p1.y]++;
                            }
                        }
                        else if (coordSet.p1.x > coordSet.p2.x) {
                            for (let x = coordSet.p2.x + 1; x < coordSet.p1.x; ++x) {
                                lines[x][coordSet.p1.y]++;
                            }
                        }
                    }
                    else {
                        // Diagonal!
                        if (coordSet.p1.x > coordSet.p2.x) {
                            lines[coordSet.p1.x][coordSet.p1.y]++;
                            lines[coordSet.p2.x][coordSet.p2.y]++;
                            if (coordSet.p1.y < coordSet.p2.y) {
                                for (let x = coordSet.p1.x - 1; x > coordSet.p2.x; --x) {
                                    for (let y = coordSet.p1.y + 1; y < coordSet.p2.y; ++y) {
                                        lines[x][y]++;
                                        --x;
                                    }
                                }
                            }
                            else if (coordSet.p1.y > coordSet.p2.y) {
                                for (let x = coordSet.p1.x - 1; x > coordSet.p2.x; --x) {
                                    for (let y = coordSet.p1.y - 1; y > coordSet.p2.y; --y) {
                                        lines[x][y]++;
                                        --x;
                                    }
                                }
                            }
                        }
                        else if (coordSet.p1.x < coordSet.p2.x) {
                            lines[coordSet.p1.x][coordSet.p1.y]++;
                            lines[coordSet.p2.x][coordSet.p2.y]++;
                            if (coordSet.p1.y < coordSet.p2.y) {
                                for (let x = coordSet.p1.x + 1; x < coordSet.p2.x; ++x) {
                                    for (let y = coordSet.p1.y + 1; y < coordSet.p2.y; ++y) {
                                        lines[x][y]++;
                                        ++x;
                                    }
                                }
                            }
                            else if (coordSet.p1.y > coordSet.p2.y) {
                                for (let x = coordSet.p1.x + 1; x < coordSet.p2.x; ++x) {
                                    for (let y = coordSet.p1.y - 1; y > coordSet.p2.y; --y) {
                                        lines[x][y]++;
                                        ++x;
                                    }
                                }
                            }
                        }
                    }
                }

                let result = 0;
                for (let i = 0; i < lines.length; ++i) {
                    for (let j = 0; j < lines[i].length; ++j) {
                        if (lines[i][j] >= 2) {
                            ++result;
                        }
                    }
                }
                resolve(result);
            }
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

