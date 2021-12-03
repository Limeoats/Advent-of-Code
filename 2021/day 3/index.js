const fs = require("fs");

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 3/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\r\n').map((n) => {
                return n;
            });
            // Part 1
            let part1Answer = null, part2Answer = null;
            {
                let gamma = "";
                let epsilon = "";
                for (let j = 0; j < arr[0].length; ++j) {
                    let zeroCount = 0, oneCount = 0;
                    for (let i = 0; i < arr.length; ++i) {
                        if (arr[i][j] === "0") {
                            ++zeroCount;
                        }
                        else if (arr[i][j] === "1") ++oneCount;
                    }
                    if (zeroCount > oneCount) {
                        gamma += "0";
                        epsilon += "1";
                    }
                    else {
                        gamma += "1";
                        epsilon += "0";
                    }
                }
                part1Answer = parseInt(gamma, 2) * parseInt(epsilon, 2);
                //resolve(part1Answer);
            }

            // Part 2
            {
                let oxygen = "";
                let co2 = "";
                const result = arr.map((n) => {
                    return {
                        key: n,
                        valid: true,
                    };
                });
                // Oxygen
                for (let j = 0; j < arr[0].length; ++j) {
                    let zeroCount = 0, oneCount = 0;
                    for (let i = 0; i < result.length; ++i) {
                        if (!result[i].valid) continue;
                        if (result[i].key[j] === "0") ++zeroCount;
                        else if (result[i].key[j] === "1") ++oneCount;
                    }
                    if (zeroCount > oneCount) {
                        result.forEach(c => {
                            if (c.key[j] === "1") c.valid = false;
                        });
                    }
                    else {
                        result.forEach(c => {
                            if (c.key[j] === "0") c.valid = false;
                        });
                    }
                }
                oxygen = result.filter(c => c.valid)[0].key;
                
                // Reset
                result.forEach(c => {
                    c.valid = true;
                });

                // CO2
                for (let j = 0; j < arr[0].length; ++j) {
                    if (result.filter(c => c.valid).length === 1) break;
                    let zeroCount = 0, oneCount = 0;
                    for (let i = 0; i < result.length; ++i) {
                        if (!result[i].valid) continue;
                        if (result[i].key[j] === "0") ++zeroCount;
                        else if (result[i].key[j] === "1") ++oneCount;
                    }
                    if (zeroCount < oneCount) {
                        result.forEach(c => {
                            if (c.key[j] === "1") c.valid = false;
                        });
                    }
                    else if (oneCount < zeroCount) {
                        result.forEach(c => {
                            if (c.key[j] === "0") c.valid = false;
                        });
                    }
                    else {
                        result.forEach(c => {
                            if (c.key[j] === "1") c.valid = false;
                        });
                    }
                }
                co2 = result.filter(c => c.valid)[0].key;
                
                part2Answer = parseInt(oxygen, 2) * parseInt(co2, 2);

            }
            
            resolve(part2Answer);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

