
const fs = require("fs");

function calculate_surface_area(l, w, h) {
    return (2 * l * w) + (2 * w * h) + (2 * h * l);
}

function calculate_smallest_side(l, w, h) {
    return Math.min(l * w, l * h, w * h);
}

function calculate_smallest_perimeter(l, w, h) {
    let r = [l, w, h];
    r.sort((a, b) => a - b);
    return (r[0] + r[0] + r[1] + r[1]);
}

function calculate_volume(l, w, h) {
    return l * w * h;
}

function calculate_paper() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 2/input.txt", { encoding: "utf-8" }, (err, data) => {
            const arr = data.split("\n");
            let total = 0;
            arr.forEach((p) => {
                const dims = p.split('x').map(Number);
                const surface_area = calculate_surface_area(dims[0], dims[1], dims[2]);
                total += surface_area;
                total += calculate_smallest_side(dims[0], dims[1], dims[2]);
            });
            resolve(total);
        });
    });
}

function calculate_ribbon() {
    return new Promise((resolve, reject) => {
        fs.readFile("day 2/input.txt", { encoding: "utf-8" }, (err, data) => {
            const arr = data.split("\n");
            let total = 0;
            arr.forEach((p) => {
                const dims = p.split('x').map(Number);
                const smallest_perimeter = calculate_smallest_perimeter(dims[0], dims[1], dims[2]);
                total += smallest_perimeter;
                total += calculate_volume(dims[0], dims[1], dims[2]);
            });
            resolve(total);
        });
    });
}

(async () => {
    const result = await calculate_ribbon();
    console.log(result);
})();