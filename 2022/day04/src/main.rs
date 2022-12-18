use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(why) => panic!("couldn't open data file: {}", why),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

fn part1() {
    let lines = read_data("src/data.txt");
    let mut overlaps = 0;
    for line in lines.flatten() {
        let (p1, p2) = line.split_once(',').unwrap();
        let p1n: Vec<i32> = p1
            .split('-')
            .into_iter()
            .map(|v| v.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        let p2n: Vec<i32> = p2
            .split('-')
            .into_iter()
            .map(|v| v.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        let r1 = p1n[0]..p1n[1];
        let r2 = p2n[0]..p2n[1];
        if (r1.start >= r2.start && r1.end <= r2.end) || (r2.start >= r1.start && r2.end <= r1.end)
        {
            overlaps += 1;
        }
    }
    println!("{overlaps}");
}

fn part2() {
    let lines = read_data("src/data.txt");
    let mut overlaps = 0;
    for line in lines.flatten() {
        let (p1, p2) = line.split_once(',').unwrap();
        let p1n: Vec<i32> = p1
            .split('-')
            .into_iter()
            .map(|v| v.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        let p2n: Vec<i32> = p2
            .split('-')
            .into_iter()
            .map(|v| v.parse::<i32>().unwrap())
            .collect::<Vec<i32>>();
        let r1 = p1n[0]..p1n[1];
        let r2 = p2n[0]..p2n[1];
        if r1.start <= r2.end && r2.start <= r1.end {
            overlaps += 1;
        }
    }
    println!("{overlaps}");
}

fn main() -> std::io::Result<()> {
    println!("Part 1:");
    part1();

    println!("Part 2:");
    part2();

    Ok(())
}
