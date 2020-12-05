const fs = require("fs");

function check_password_part_1(pw) {
    const elements = pw.split(' ');
    const occs = elements[0].split('-');
    const min_occs = occs[0];
    const max_occs = occs[1];

    const letter = elements[1][0];

    const password = elements[2];

    const letter_count = password.split(letter).length - 1;
    return (letter_count >= min_occs && letter_count <= max_occs);
}

function check_password_part_2(pw) {
    const elements = pw.split(' ');
    const positions = elements[0].split('-');
    const pos1 = positions[0];
    const pos2 = positions[1];

    const letter = elements[1][0];

    const password = elements[2];

    return (password[pos1 - 1] == letter && password[pos2 - 1] != letter) || 
        (password[pos2 - 1] == letter && password[pos1 - 1] != letter);
}

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 2/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\n');
            let total_valid = 0;
            arr.forEach(c => {
                if (check_password_part_2(c)) ++total_valid;
            });
            resolve(total_valid);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

