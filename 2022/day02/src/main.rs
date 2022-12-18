use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(why) => panic!("couldn't open data file: {}", why),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

enum GameResult {
    Win,
    Loss,
    Draw,
    None,
}

enum Type {
    Rock,
    Paper,
    Scissor,
    None,
}

fn game_result(player: &str, opponent: &str) -> GameResult {
    match player {
        "X" => match opponent {
            "A" => GameResult::Draw,
            "B" => GameResult::Loss,
            "C" => GameResult::Win,
            _ => GameResult::None,
        },
        "Y" => match opponent {
            "A" => GameResult::Win,
            "B" => GameResult::Draw,
            "C" => GameResult::Loss,
            _ => GameResult::None,
        },
        "Z" => match opponent {
            "A" => GameResult::Loss,
            "B" => GameResult::Win,
            "C" => GameResult::Draw,
            _ => GameResult::None,
        },
        _ => GameResult::None,
    }
}

fn need_to_do(opponent: &str, result: &str) -> Type {
    match opponent {
        "A" => match result {
            "X" => Type::Scissor,
            "Y" => Type::Rock,
            "Z" => Type::Paper,
            _ => Type::None,
        },
        "B" => match result {
            "X" => Type::Rock,
            "Y" => Type::Paper,
            "Z" => Type::Scissor,
            _ => Type::None,
        },
        "C" => match result {
            "X" => Type::Paper,
            "Y" => Type::Scissor,
            "Z" => Type::Rock,
            _ => Type::None,
        },
        _ => Type::None,
    }
}

fn points(player: &str) -> i32 {
    match player {
        "X" => 1,
        "Y" => 2,
        "Z" => 3,
        _ => 0,
    }
}

fn points_by_type(t: Type) -> i32 {
    match t {
        Type::Rock => 1,
        Type::Paper => 2,
        Type::Scissor => 3,
        _ => 0,
    }
}

fn part1() {
    let lines = read_data("src/data.txt");
    let mut total_score: i32 = 0;
    for line in lines.flatten() {
        let mut total: i32 = 0;
        let (o, p) = line.split_once(' ').unwrap();
        let game = game_result(p, o);
        match game {
            GameResult::Win => total += 6,
            GameResult::Draw => total += 3,
            _ => total += 0,
        }
        total += points(p);
        total_score += total;
    }
    println!("{}", total_score);
}

fn part2() {
    let lines = read_data("src/data.txt");
    let mut total_score: i32 = 0;
    for line in lines.flatten() {
        let mut total: i32 = 0;
        let (o, r) = line.split_once(' ').unwrap();
        let need = need_to_do(o, r);
        match r {
            "Y" => total += 3,
            "Z" => total += 6,
            _ => total += 0,
        }
        total += points_by_type(need);
        total_score += total;
    }
    println!("{}", total_score);
}

pub fn main() -> std::io::Result<()> {
    println!("Part 1: ");
    part1();
    println!("Part 2: ");
    part2();

    Ok(())
}
