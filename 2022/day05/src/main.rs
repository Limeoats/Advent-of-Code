use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(why) => panic!("couldn't open data file: {}", why),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

#[derive(PartialEq)]
enum Mode {
    Top,
    Bottom,
}

#[derive(Debug, Clone)]
struct Instruction {
    count: i32,
    original_stack: i32,
    new_stack: i32,
}

fn part1() {
    let lines = read_data("src/data.txt");
    let mut stacks: Vec<Vec<char>> = vec![vec![]];
    let mut instructions: Vec<Instruction> = vec![];
    let mut mode: Mode = Mode::Top;
    let mut instr: Instruction;

    for line in lines.flatten() {
        if !line.trim().is_empty() && line.chars().nth(1).unwrap() == '1' {
            mode = Mode::Bottom;
        }
        if mode == Mode::Top {
            for (i, ch) in line.chars().enumerate() {
                if ch != ' ' && i % 4 == 1 {
                    let stack_no = i / 4;
                    if stacks.len() < stack_no + 1 {
                        for _i in stacks.len()..stack_no + 1 {
                            stacks.push(vec![]);
                        }
                    }
                    stacks[stack_no].push(ch);
                }
            }
        } else if mode == Mode::Bottom && !line.is_empty() && !line.starts_with(' ') {
            let inst_v: Vec<i32> = line
                .split(' ')
                .skip(1)
                .step_by(2)
                .map(|s| s.parse::<i32>().unwrap())
                .collect::<Vec<i32>>();
            instr = Instruction {
                count: inst_v[0],
                original_stack: inst_v[1],
                new_stack: inst_v[2],
            };
            instructions.push(instr);
        }
    }

    for instruction in instructions {
        for _i in 0..instruction.count {
            let t = stacks[instruction.original_stack as usize - 1].remove(0);
            stacks[instruction.new_stack as usize - 1].insert(0, t);
        }
    }

    for item in &stacks {
        print!("{}", item[0]);
    }
    println!();
}

fn part2() {
    let lines = read_data("src/data.txt");
    let mut stacks: Vec<Vec<char>> = vec![vec![]];
    let mut instructions: Vec<Instruction> = vec![];
    let mut mode: Mode = Mode::Top;
    let mut instr: Instruction;

    for line in lines.flatten() {
        if !line.trim().is_empty() && line.chars().nth(1).unwrap() == '1' {
            mode = Mode::Bottom;
        }
        if mode == Mode::Top {
            for (i, ch) in line.chars().enumerate() {
                if ch != ' ' && i % 4 == 1 {
                    let stack_no = i / 4;
                    if stacks.len() < stack_no + 1 {
                        for _i in stacks.len()..stack_no + 1 {
                            stacks.push(vec![]);
                        }
                    }
                    stacks[stack_no].push(ch);
                }
            }
        } else if mode == Mode::Bottom && !line.is_empty() && !line.starts_with(' ') {
            let inst_v: Vec<i32> = line
                .split(' ')
                .skip(1)
                .step_by(2)
                .map(|s| s.parse::<i32>().unwrap())
                .collect::<Vec<i32>>();
            instr = Instruction {
                count: inst_v[0],
                original_stack: inst_v[1],
                new_stack: inst_v[2],
            };
            instructions.push(instr);
        }
    }

    for instruction in instructions {
        for i in (0..instruction.count).rev() {
            let t = stacks[instruction.original_stack as usize - 1].remove(i as usize);
            stacks[instruction.new_stack as usize - 1].insert(0, t);
        }
    }

    for item in &stacks {
        print!("{}", item[0]);
    }
    println!();
}

fn main() -> std::io::Result<()> {
    println!("Part 1: ");
    part1();
    println!("Part 2: ");
    part2();

    Ok(())
}
