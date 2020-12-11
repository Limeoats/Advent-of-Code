const fs = require("fs");
const { exit } = require("process");

function is_occupied(seat) {
    return seat === "#";
}

function is_empty(seat) {
    return seat === "L";
}

function is_floor(seat) {
    return seat === ".";
}

function do_iteration_part_1(arr) {
    let new_arr = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr[i].length; ++j) {
            if (is_empty(arr[i][j])) {
                let should_occupy = true;
                // Check left
                if (j === 0) {
                    // Nothing to the left
                }
                else {
                    if (is_occupied(arr[i][j - 1])) should_occupy = false;
                }

                // Check up
                if (i === 0) {
                    // Nothing up
                }
                else {
                    if (is_occupied(arr[i - 1][j])) should_occupy = false;
                }

                // Check right
                if (j === arr[i].length - 1) {
                    // Nothing right
                }
                else {
                    if (is_occupied(arr[i][j + 1])) should_occupy = false;
                }

                // Check down
                if (i === arr.length - 1) {
                    // Nothing down
                }
                else {
                    if (is_occupied(arr[i + 1][j])) should_occupy = false;
                }

                // Check diagonal up-left
                if (i === 0 || j === 0) {
                    // No up-left
                }
                else {
                    if (is_occupied(arr[i - 1][j - 1])) should_occupy = false;
                }

                // Check diagonal up-right
                if (i === 0 || j === arr[i].length - 1) {
                    // No up-right
                }
                else {
                    if (is_occupied(arr[i - 1][j + 1])) should_occupy = false;
                }

                // Check diagonal down-left
                if (i === arr.length - 1 || j === 0) {
                    // No down-left
                }
                else {
                    if (is_occupied(arr[i + 1][j - 1])) should_occupy = false;
                }

                // Check diagonal down-right
                if (i === arr.length - 1 || j === arr[i].length - 1) {
                    // No down-right
                }
                else {
                    if (is_occupied(arr[i + 1][j + 1])) should_occupy = false;
                }


                if (should_occupy) {
                    // Set to occupied
                    new_arr[i][j] = "#";
                }
            }

            else if (is_occupied(arr[i][j])) {
                let occupied_counter = 0;
                // Check left
                if (j === 0) {
                    // Nothing to the left
                }
                else {
                    if (is_occupied(arr[i][j - 1])) ++occupied_counter;
                }

                // Check up
                if (i === 0) {
                    // Nothing up
                }
                else {
                    if (is_occupied(arr[i - 1][j])) ++occupied_counter;
                }

                // Check right
                if (j === arr[i].length - 1) {
                    // Nothing right
                }
                else {
                    if (is_occupied(arr[i][j + 1])) ++occupied_counter;
                }

                // Check down
                if (i === arr.length - 1) {
                    // Nothing down
                }
                else {
                    if (is_occupied(arr[i + 1][j])) ++occupied_counter;
                }

                // Check diagonal up-left
                if (i === 0 || j === 0) {
                    // No up-left
                }
                else {
                    if (is_occupied(arr[i - 1][j - 1])) ++occupied_counter;
                }

                // Check diagonal up-right
                if (i === 0 || j === arr[i].length - 1) {
                    // No up-right
                }
                else {
                    if (is_occupied(arr[i - 1][j + 1])) ++occupied_counter;
                }

                // Check diagonal down-left
                if (i === arr.length - 1 || j === 0) {
                    // No down-left
                }
                else {
                    if (is_occupied(arr[i + 1][j - 1])) ++occupied_counter;
                }

                // Check diagonal down-right
                if (i === arr.length - 1 || j === arr[i].length - 1) {
                    // No down-right
                }
                else {
                    if (is_occupied(arr[i + 1][j + 1])) ++occupied_counter;
                }


                if (occupied_counter >= 4) {
                    // Set to occupied
                    new_arr[i][j] = "L";
                }
            }
        }
    }
    return new_arr;
}

function do_iteration_part_2(arr) {
    let new_arr = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr[i].length; ++j) {
            if (is_empty(arr[i][j])) {
                let should_occupy = true;
                // Check left
                if (j === 0) {
                    // Nothing to the left
                }
                else {
                    for (let k = j - 1; k >= 0; --k) {
                        if (is_empty(arr[i][k])) break;
                        if (is_occupied(arr[i][k])){
                            should_occupy = false;
                            break;
                        }
                    }
                }

                // Check up
                if (i === 0) {
                    // Nothing up
                }
                else {
                    for (let k = i - 1; k >= 0; --k) {
                        if (is_empty(arr[k][j])) break;
                        if (is_occupied(arr[k][j])){
                            should_occupy = false;
                            break;
                        }
                    }
                }

                // Check right
                if (j === arr[i].length - 1) {
                    // Nothing right
                }
                else {
                    for (let k = j + 1; k <= arr[i].length - 1; ++k) {
                        if (is_empty(arr[i][k])) break;
                        if (is_occupied(arr[i][k])){
                            should_occupy = false;
                            break;
                        }
                    }
                }

                // Check down
                if (i === arr.length - 1) {
                    // Nothing down
                }
                else {
                    for (let k = i + 1; k <= arr.length - 1; ++k) {
                        if (is_empty(arr[k][j])) break;
                        if (is_occupied(arr[k][j])){
                            should_occupy = false;
                            break;
                        }
                    }
                }

                // Check diagonal up-left
                if (i === 0 || j === 0) {
                    // No up-left
                }
                else {
                    let k = i - 1;
                    for (let m = j - 1; m >= 0; --m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            should_occupy = false;
                            break;
                        }
                        --k;
                        if (k < 0) break;
                    }
                }

                // Check diagonal up-right
                if (i === 0 || j === arr[i].length - 1) {
                    // No up-right
                }
                else {
                    let k = i - 1;
                    for (let m = j + 1; m <= arr[i].length; ++m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            should_occupy = false;
                            break;
                        }
                        --k;
                        if (k < 0) break;
                    }
                }

                // Check diagonal down-left
                if (i === arr.length - 1 || j === 0) {
                    // No down-left
                }
                else {
                    let k = i + 1;
                    for (let m = j - 1; m >= 0; --m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            should_occupy = false;
                            break;
                        }
                        ++k;
                        if (k >= arr.length) break;
                    }
                }

                // Check diagonal down-right
                if (i === arr.length - 1 || j === arr[i].length - 1) {
                    // No down-right
                }
                else {
                    let k = i + 1;
                    for (let m = j + 1; m <= arr[i].length - 1; ++m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            should_occupy = false;
                            break;
                        }
                        ++k;
                        if (k >= arr.length) break;
                    }
                }


                if (should_occupy) {
                    // Set to occupied
                    new_arr[i][j] = "#";
                }
            }

            else if (is_occupied(arr[i][j])) {
                let occupied_counter = 0;
                // Check left
                if (j === 0) {
                    // Nothing to the left
                }
                else {
                    for (let k = j - 1; k >= 0; --k) {
                        if (is_empty(arr[i][k])) break;
                        if (is_occupied(arr[i][k])){
                            ++occupied_counter;
                            break;
                        }
                    }
                }

                // Check up
                if (i === 0) {
                    // Nothing up
                }
                else {
                    for (let k = i - 1; k >= 0; --k) {
                        if (is_empty(arr[k][j])) break;
                        if (is_occupied(arr[k][j])){
                            ++occupied_counter;
                            break;
                        }
                    }
                }

                // Check right
                if (j === arr[i].length - 1) {
                    // Nothing right
                }
                else {
                    for (let k = j + 1; k <= arr[i].length - 1; ++k) {
                        if (is_empty(arr[i][k])) break;
                        if (is_occupied(arr[i][k])){
                            ++occupied_counter;
                            break;
                        }
                    }
                }

                // Check down
                if (i === arr.length - 1) {
                    // Nothing down
                }
                else {
                    for (let k = i + 1; k <= arr.length - 1; ++k) {
                        if (is_empty(arr[k][j])) break;
                        if (is_occupied(arr[k][j])){
                            ++occupied_counter;
                            break;
                        }
                    }
                }

                // Check diagonal up-left
                if (i === 0 || j === 0) {
                    // No up-left
                }
                else {
                    let k = i - 1;
                    for (let m = j - 1; m >= 0; --m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            ++occupied_counter;
                            break;
                        }
                        --k;
                        if (k < 0) break;
                    }
                }

                // Check diagonal up-right
                if (i === 0 || j === arr[i].length - 1) {
                    // No up-right
                }
                else {
                    let k = i - 1;
                    for (let m = j + 1; m <= arr[i].length; ++m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            ++occupied_counter;
                            break;
                        }
                        --k;
                        if (k < 0) break;
                    }
                }

                // Check diagonal down-left
                if (i === arr.length - 1 || j === 0) {
                    // No down-left
                }
                else {
                    let k = i + 1;
                    for (let m = j - 1; m >= 0; --m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            ++occupied_counter;
                            break;
                        }
                        ++k;
                        if (k >= arr.length) break;
                    }
                }

                // Check diagonal down-right
                if (i === arr.length - 1 || j === arr[i].length - 1) {
                    // No down-right
                }
                else {
                    let k = i + 1;
                    for (let m = j + 1; m <= arr[i].length - 1; ++m) {
                        if (is_empty(arr[k][m])) break;
                        if (is_occupied(arr[k][m])) {
                            ++occupied_counter;
                            break;
                        }
                        ++k;
                        if (k >= arr.length) break;
                    }
                }


                if (occupied_counter >= 5) {
                    // Set to occupied
                    new_arr[i][j] = "L";
                }
            }
        }
    }
    return new_arr;
}

function part_1(arr) {
    let previous = JSON.stringify(arr);
    let new_a = JSON.parse(JSON.stringify(arr));
    while (true) {
        const n = do_iteration_part_1(new_a);
        new_a = JSON.parse(JSON.stringify(n));
        if (previous === JSON.stringify(new_a)) {
            break;
        }
        else {
            previous = JSON.stringify(new_a);
        }
    }

    let occupied = 0;
    for (let a = 0; a < new_a.length; ++a) {
        for (let b = 0; b < new_a[a].length; ++b) {
            if (is_occupied(new_a[a][b])) ++occupied;
        }
    }
    
    return occupied;

}

function part_2(arr) {
    let previous = JSON.stringify(arr);
    let new_a = JSON.parse(JSON.stringify(arr));
    while (true) {
        //console.log(new_a);
        const n = do_iteration_part_2(new_a);
        new_a = JSON.parse(JSON.stringify(n));
        if (previous === JSON.stringify(new_a)) {
            break;
        }
        else {
            previous = JSON.stringify(new_a);
        }
    }

    let occupied = 0;
    for (let a = 0; a < new_a.length; ++a) {
        for (let b = 0; b < new_a[a].length; ++b) {
            if (is_occupied(new_a[a][b])) ++occupied;
        }
    }
    
    return occupied;
}

async function get_result() {
    return new Promise( async (resolve, reject) => {

        const data = await fs.promises.readFile("day 11/input.dat", { encoding: "utf-8"});
        const arr = data.split("\r\n").map(a => { return a.split("")});

        const result = part_2(arr);
        
        resolve(result);
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

