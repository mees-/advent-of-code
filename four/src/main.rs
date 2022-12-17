use std::{env, fs};

fn main() {
    let filename = &env::args().skip(1).take(1).collect::<Vec<String>>()[0];
    println!("reading file: '{}'", filename);
    let file_contents = fs::read_to_string(filename).expect("Unable to read file");
    let parsed_lines = file_contents
        .lines()
        .map(|line| line.split(","))
        .map(|line| line.collect::<Vec<&str>>())
        .map(|items| (items[0], items[1]))
        .map(|(a, b)| (a.split("-"), b.split("-")))
        .map(|(a, b)| (a.collect::<Vec<&str>>(), b.collect::<Vec<&str>>()))
        .map(|(a, b)| {
            (
                (a[0].parse::<u32>().unwrap(), a[1].parse::<u32>().unwrap()),
                (b[0].parse::<u32>().unwrap(), b[1].parse::<u32>().unwrap()),
            )
        });

    let redundant_count = parsed_lines
        .clone()
        .filter(|((a, b), (c, d))| (a <= c && b >= d) || (a >= c && b <= d))
        .count();

    let overlapping_count = parsed_lines
        .filter(|((a, b), (c, d))| (b >= c && a <= d) || (d >= a && c <= b))
        .count();

    println!("redundantCount: {}", redundant_count);
    println!("overlappingCount: {}", overlapping_count);
}
