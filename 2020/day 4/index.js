const fs = require("fs");
const { exit } = require("process");

const fields = {
    byr: {
        required: true,
        regexp: /\b[0-9]{4}\b/,
        range: {
            min: 1920,
            max: 2002
        }
    },
    iyr: {
        required: true,
        regexp: /\b[0-9]{4}\b/,
        range: {
            min: 2010,
            max: 2020
        }
    },
    eyr: {
        required: true,
        regexp: /\b[0-9]{4}\b/,
        range: {
            min: 2020,
            max: 2030
        }
    },
    hgt: {
        required: true,
        regexp: /\b[0-9]+cm\b|\b[0-9]+in\b/,
        range: {
            cm: {
                min: 150,
                max: 193
            },
            in: {
                min: 59,
                max: 76
            }
        }
    },
    hcl: {
        required: true,
        regexp: /#([a-f0-9]{3}){2}\b/
    },
    ecl: {
        required: true,
        regexp: /\bamb\b|\bblu\b|\bbrn\b|\bgry\b|\bgrn\b|\bhzl\b|\both\b/,
    },
    pid: {
        required: true,
        regexp: /\b[0-9]{9}\b/
    },
    cid: {
        required: false,
    }
};

function is_valid(input) {
    let good = true;
    Object.keys(fields).filter((k) => {
        return fields[k].required;
    }).forEach(a => {
        if (input.indexOf(`${a}:`) < 0) {
            good = false;
        }
        const elements = input.split("\n");
        elements.forEach(e => {
            const items = e.split(":");
            if (items[0] != a) return;
            const val = items[1];
            if (fields[a].hasOwnProperty("regexp")) {
                if (!val.match(fields[a].regexp)) {
                    console.log(`${val} did not match regex: ${fields[a].regexp}`);
                    good = false;
                }
                if (fields[a].hasOwnProperty("range")) {
                    if (fields[a].range.hasOwnProperty("cm")) {
                        if (items[1].indexOf("cm") >= 0) {
                            // in cm
                            const num = items[1].split("cm")[0];
                            if (Number(num) < fields[a].range.cm.min || Number(num) > fields[a].range.cm.max) {
                                good = false;
                            }
                        }
                        else if (items[1].indexOf("in") >= 0) {
                            // in inches
                            const num = items[1].split("in")[0];
                            if (Number(num) < fields[a].range.in.min || Number(num) > fields[a].range.in.max) {
                                good = false;
                            }
                        }
                    }
                    else {
                        if (Number(items[1]) < fields[a].range.min || Number(items[1]) > fields[a].range.max) {
                            good = false;
                        }
                    }
                }
            }
        });
        
    });
    return good;
}

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 4/input.txt", { encoding: "utf-8"}, (err, data) => {
            data = data.split(" ").join("\n");
            const arr = data.split('\r\n\r\n');
            let total_valid = 0;
            arr.forEach(c => {
                if (is_valid(c)) 
                    ++total_valid;
            });
            
            resolve(total_valid);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

