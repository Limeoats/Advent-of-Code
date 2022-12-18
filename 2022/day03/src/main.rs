use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

fn intersects<T: PartialEq + std::clone::Clone>(v1: &[T], v2: &[T]) -> Vec<T> {
    v1.iter()
        .filter(|x| v2.contains(x))
        .cloned()
        .collect::<Vec<_>>()
}

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(why) => panic!("couldn't open data file: {}", why),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

fn letter_to_priority(letter: char) -> i32 {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    letters.find(letter).unwrap() as i32 + 1
}

fn part1() {
    let lines = read_data("src/data.txt");
    let mut sum = 0;
    for line in lines.flatten() {
        let (c1, c2) = line.split_at(line.len() / 2);
        let c = intersects(
            &c1.chars().collect::<Vec<_>>(),
            &c2.chars().collect::<Vec<_>>(),
        )[0];
        sum += letter_to_priority(c);
    }
    println!("{sum}");
}

fn part2() {
    let lines = read_data("src/data.txt");
    let mut sum = 0;
    let groups: Vec<Vec<Vec<char>>> = lines
        .flatten()
        .map(|s| s as String)
        .collect::<Vec<_>>()
        .chunks(3)
        .map(|s| s.iter().map(|v| v.chars().collect::<Vec<char>>()).collect())
        .collect::<Vec<_>>();
    for group in groups {
        let c = intersects(&group[0], &group[1]);
        let c2 = intersects(&c, &group[2])[0];
        sum += letter_to_priority(c2);
    }
    println!("{sum}");
}

fn main() -> std::io::Result<()> {
    println!("Part 1: ");
    part1();
    println!("Part 2: ");
    part2();

    Ok(())
}
