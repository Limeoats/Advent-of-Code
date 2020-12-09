const fs = require("fs");
const { exit } = require("process");

async function get_result() {
    return new Promise( async (resolve, reject) => {

        const data = await fs.promises.readFile("day 8/input.dat", { encoding: "utf-8"});
        const arr = data.split("\r\n");
        let instructions = arr.map((line) => {
            const [instruction, val] = line.split(" ");
            return {
                instruction,
                val
            };
        });

        let accumulator = 0;
        let instruction_index = 0;
        let indices_used = [];

        let last_index_changed = 0;

        path = [];

        const original_list = JSON.parse(JSON.stringify(instructions));

        while (true) {
            if (instruction_index == instructions.length) {
                // gone too far, so the program ended successfully
                console.log(`Done. Last instruction ran was ${instructions[instruction_index - 1].instruction} ${instructions[instruction_index - 1].val}}`);
                break;
            }
            if (indices_used.indexOf(instruction_index) > -1) {
                console.log(`Starting over. Last index changed is ${last_index_changed}`);
                
                // start over
                accumulator = 0;
                instruction_index = 0;
                indices_used = [];
                changed = false;
                path = [];
                instructions = JSON.parse(JSON.stringify(original_list));


                while (instructions[last_index_changed].instruction === "acc") {
                    ++last_index_changed;
                }
                if (instructions[last_index_changed] === "nop") {
                    instructions[last_index_changed].instruction = "jmp";
                    console.log("set to jmp");
                    ++last_index_changed;
                }
                else {
                    instructions[last_index_changed].instruction = "nop";
                    console.log("set to nop");
                    ++last_index_changed;
                }
            }
            const instr = instructions[instruction_index];
            indices_used.push(instruction_index);

            path.push(instr);
            
            // Do the instruction
            if (instr.instruction === "acc") {
                accumulator += Number(instr.val);
                ++instruction_index;
            }
            else if (instr.instruction === "jmp") {
                instruction_index += Number(instr.val);
            }
            else if (instr.instruction === "nop") {
                ++instruction_index;
            }
        }

        path.forEach(a => {
            console.log(`${a.instruction} ${a.val}`);
        });

        resolve(accumulator);
    });
    
};

(async() => {
    const x = await get_result();
    console.log(x);
})();

