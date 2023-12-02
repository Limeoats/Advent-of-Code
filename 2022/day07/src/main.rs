use std::fs::File;
use std::io::{BufRead, BufReader, Lines};

#[derive(PartialEq)]
enum Mode {
    List,
    Command,
}

#[derive(Debug, Clone)]
struct _File {
    size: i64,
    name: String,
}

#[derive(Debug, Clone)]
struct Directory {
    path: String,
    files: Vec<_File>,
    parent_dir: Option<Box<Directory>>,
    sub_dirs: Vec<Directory>,
}

impl Directory {
    fn new() -> Self {
        Directory {
            path: String::new(),
            files: vec![],
            parent_dir: None,
            sub_dirs: vec![],
        }
    }
}

fn read_data(path: &str) -> Lines<BufReader<File>> {
    let file = match File::open(path) {
        Err(why) => panic!("couldn't open data file: {}", why),
        Ok(file) => file,
    };

    BufReader::new(file).lines()
}

fn part1() {
    let lines = read_data("src/data.txt").flatten();
    let mut mode = Mode::Command;
    let mut directories: Vec<Directory> = vec![];

    let mut current_parent_directory = Directory::new();
    let mut current_directory = Directory::new();

    for line in lines {
        if line.starts_with("$ ls") {
            mode = Mode::List;
            continue;
        } else if line.starts_with("$ cd") {
            let new_path: String = line
                .split(' ')
                .skip(2)
                .map(|s| s.to_string())
                .next()
                .unwrap();
            current_parent_directory = current_directory.clone();
            current_directory.path = new_path.clone();

            // Check if this directory is already in directories vector
            let mut exists = false;
            for dir in &directories {
                if dir.path == new_path {
                    exists = true;
                    break;
                }
            }
            if !exists {
                directories.push(Directory {
                    path: new_path,
                    files: vec![],
                    parent_dir: None,
                    sub_dirs: vec![],
                })
            }

            // TODO: handle cd
            continue;
        }

        if mode == Mode::List {}
        println!("{}", line);
    }
    println!("{:?}", directories);
}

fn main() {
    println!("Part 1: ");
    part1();
}
