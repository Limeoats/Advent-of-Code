const fs = require("fs");

function num_trees(arr, width, right, down) {
    let trees = 0;
    let xpos = 0;
    let ypos = 0;
    while (ypos < arr.length - 1) {
        // Go right 3 and down 1
        // Wrap if necessary
        if (xpos + right > width - 1) {
            xpos = xpos + right - width;
        }
        else {
            xpos += right;
        }
        ypos += down;
        if (arr[ypos].charAt(xpos) === '#') {
            ++trees;
        }
    }
    return trees;
}

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 3/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\n');
            let trees = 0;
            const width = arr[0].length - 1;
            
            const first = num_trees(arr, width, 1, 1);
            const second = num_trees(arr, width, 3, 1);
            const third = num_trees(arr, width, 5, 1);
            const fourth = num_trees(arr, width, 7, 1);
            const fifth = num_trees(arr, width, 1, 2);

            trees = first * second * third * fourth * fifth;
            
            resolve(trees);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

