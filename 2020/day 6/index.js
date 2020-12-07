const fs = require("fs");
const { exit } = require("process");

function get_total_anyone_yes(group_arr) {
    let total = 0;

    group_arr.forEach(g => {
        let group_total = 0;
        let items = {};
        g.forEach(p => {
            for (i = 0; i < p.length; ++i) {
                items[p[i]] = true;
            }
        });
        group_total = Object.keys(items).length;
        total += group_total;
    });
    return total;
}

function get_total_everyone_yes(group_arr) {
    let total = 0;

    group_arr.forEach(g => {
        let group_total = 0;
        let items = {};
        for (i = 0; i < 26; ++i) {
            items[String.fromCharCode(97 + i)] = 0;
        }
        g.forEach(p => {
            for (i = 0; i < p.length; ++i) {
                items[p[i]]++;
            }
        });
        Object.keys(items).forEach(a => {
            if (items[a] == g.length) {
                ++group_total;
            }
        });

        total += group_total;        
    });
    return total;
}


async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 6/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\r\n');
            const group_arr = [];

            let tmp_arr = [];
            arr.forEach(c => {
                if (c.trim() !== "") {
                    tmp_arr.push(c);
                }
                else {
                    group_arr.push(tmp_arr);
                    tmp_arr = [];
                }
            });

            const total = get_total_everyone_yes(group_arr);
            
            resolve(total);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

