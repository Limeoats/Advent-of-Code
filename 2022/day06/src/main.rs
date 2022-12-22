use core::hash::Hash;
use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(why) => panic!("couldn't open data file: {}", why),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

fn has_unique_elements<T>(iter: T) -> bool
where
    T: IntoIterator,
    T::Item: Eq + Hash,
{
    let mut unique = HashSet::new();
    iter.into_iter().all(move |x| unique.insert(x))
}

fn part1() {
    let line = read_data("src/data.txt").flatten().next().unwrap();
    let x = line.chars().into_iter().collect::<Vec<char>>();
    let items = x.windows(4).collect::<Vec<_>>();
    let mut answer: i32 = 0;
    for (i, item) in items.iter().enumerate() {
        if has_unique_elements(item.iter()) {
            answer = i as i32 + 4;
            break;
        }
    }
    println!("{}", answer);
}

fn part2() {
    let line = read_data("src/data.txt").flatten().next().unwrap();
    let x = line.chars().into_iter().collect::<Vec<char>>();
    let items = x.windows(14).collect::<Vec<_>>();
    let mut answer: i32 = 0;
    for (i, item) in items.iter().enumerate() {
        if has_unique_elements(item.iter()) {
            answer = i as i32 + 14;
            break;
        }
    }
    println!("{}", answer);
}

fn main() -> std::io::Result<()> {
    println!("Part 1: ");
    part1();
    println!("Part 2: ");
    part2();

    Ok(())
}
