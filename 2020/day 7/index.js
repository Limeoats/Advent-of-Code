const fs = require("fs");
const { exit } = require("process");

let rules = [];
let path = [];
let calc = "";

function check_contains(contains, bag_type) {
    if (contains.amount > 0 && contains.color === bag_type) return true;
    return false;
}

function check_all_contains(all_contains, bag_type) {
    for (let j = 0; j < all_contains.length; ++j) {
        if (check_contains(all_contains[j], bag_type)) return true;
    }
    return false;
}

function find_rule(type) {
    for (let q = 0; q < rules.length; ++q) {
        if (rules[q].color === type) {
            return rules[q];
        }
    }
    return null;
}

function recursively_check(rule, bag_type) {
    path.push(rule.color);
    if (rule.contains.length === 1 && rule.contains[0].color == "none") {
        return false;
    }
    if (check_all_contains(rule.contains, bag_type)) {
        return true;
    }
    for (let m = 0; m < rule.contains.length; ++m) {
        let r = find_rule(rule.contains[m].color);
        const s = recursively_check(r, bag_type);
        if (s) return true;
    }
    return false;
}

function check_bag(bag_type) {
    let amt = 0;
    for (let i = 0; i < rules.length; ++i) {
        if (recursively_check(rules[i], bag_type)) {
            let str = "";
            for (let a = 0; a < path.length; ++a) {
                str += (path[a] + " => ");
            }
            console.log(str);
            console.log("\n");
            ++amt;
        }
        path = [];
    }
    return amt;
}

function recursively_get_bag_count(rule, count, amt) {
    if (rule.contains.length === 1 && rule.contains[0].color == "none") {
        return true;
    }

    // xx is the total number of bags in the CURRENT bag
    let xx = 0;
    for (let n = 0; n < rule.contains.length; ++n) {
        xx += Number(rule.contains[n].amount);
    }

    amt.total += (xx * count);
    calc += (count);
    calc += ("*");
    calc += xx;
    calc += " + ";
    for (let m = 0; m < rule.contains.length; ++m) {
        let bags = count * Number(rule.contains[m].amount);
        // calc += (count);
        // calc += ("*");
        // calc += rule.contains[m].amount;
        // calc += " + ";
        // amt.total += bags;
        let r = find_rule(rule.contains[m].color);
        const s = recursively_get_bag_count(r, bags, amt);
    }
    return true;
}

function get_bag_total(bag_type) {
    let amt = {total: 0};
    const start_rule = find_rule(bag_type);

    recursively_get_bag_count(start_rule, 1, amt);

    console.log(calc);
    return amt.total;
}

async function get_result() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 7/input.txt", { encoding: "utf-8"}, (err, data) => {
            const arr = data.split('\r\n');
            
            // Build list of rules
            for (i = 0; i < arr.length; ++i) {
                const words = arr[i].split(" ");
                let rule = {};
                rule.color = `${words[0]} ${words[1]}`;
                rule.contains = [];
                const contains = arr[i].split(" contain ")[1];
                if (contains.indexOf(",") >= 0) {
                    // Handle multiple contains
                    const arr = contains.split(", ");
                    for (let b = 0; b < arr.length; ++b) {
                        const els = arr[b].split(" ");
                        rule.contains.push({
                            amount: els[0],
                            color: `${els[1]} ${els[2]}`
                        });
                    }
                }
                else {
                    if (contains === "no other bags.") {
                        rule.contains.push({
                            amount: 0,
                            color: "none"
                        });
                    }
                    else {
                        const arr = contains.split(" ");
                        rule.contains.push({
                            amount: arr[0],
                            color: `${arr[1]} ${arr[2]}`
                        });
                    }
                }
                rules.push(rule);
            }
            const total = get_bag_total("shiny gold");
            
            resolve(total);
        });
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

