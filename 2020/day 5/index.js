const fs = require("fs");
const { exit } = require("process");

function get_half(arr, lower) {
    if (lower) {
        return arr.slice(0, (arr.length / 2));
    }
    else {
        return arr.slice(arr.length / 2, arr.length);
    }
}

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 5/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\r\n');

            const total_seats = 128 * 8;

            const rows = Array.from({length: 128}, (_, i) => {
                return i;
            });
            const columns = Array.from({length: 8}, (_, i) => {
                return i;
            });

            let lowest_id = total_seats;
            let highest_id = 0;
            let seat_map = {};

            arr.forEach(l => {
                let current_row_array = rows;
                for (i = 0; i < 7; ++i) {
                    const letter = l.charAt(i);
                    current_row_array = get_half(current_row_array, (letter === "F" ? true : false));
                }
                let current_column_array = columns;
                for (i = 7; i < 10; ++i) {
                    const letter = l.charAt(i);
                    current_column_array = get_half(current_column_array, (letter === "L" ? true : false));
                }
                const row_id = (current_row_array[0] * 8) + current_column_array[0];
                highest_id = Math.max(row_id, highest_id);
                lowest_id = Math.min(row_id, lowest_id);

                seat_map[row_id] = true;

            });
            
            for (i = lowest_id; i < highest_id; ++i) {
                if (!seat_map.hasOwnProperty(i.toString())) {
                    resolve(i);       
                }
            }
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

