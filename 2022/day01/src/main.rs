use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(_) => panic!("couldn't open data file"),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

fn part_1() {
    let lines = read_data("src/data.txt");
    let mut total = 0;
    let mut totals: Vec<i32> = vec![];
    for line in lines.flatten() {
        if line.trim() == "" {
            totals.push(total);
            total = 0;
        } else {
            total += line.parse::<i32>().unwrap();
        }
    }
    totals.sort();
    println!("{}", totals.last().unwrap());
}

fn part_2() {
    let lines = read_data("src/data.txt");
    let mut total = 0;
    let mut totals: Vec<i32> = vec![];
    for line in lines.flatten() {
        if line.trim() == "" {
            totals.push(total);
            total = 0;
        } else {
            total += line.parse::<i32>().unwrap();
        }
    }
    totals.sort();
    let sum: i32 = totals.windows(3).last().unwrap().iter().sum();
    println!("{}", sum);
}

fn main() -> std::io::Result<()> {
    println!("Part 1:");
    part_1();

    println!("Part 2:");
    part_2();

    Ok(())
}
