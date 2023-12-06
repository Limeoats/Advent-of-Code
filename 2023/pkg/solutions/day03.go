package solutions

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"unicode"
)

func isSymbol(c rune) bool {
	return c != '.' && !unicode.IsDigit(c)
}

type item struct {
	c   rune
	row int
	col int
	rn  int
}

func Day03() (string, string) {
	p1Ans := 0
	p2Ans := 0

	file, err := os.Open("data/day03_data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var arr [][]rune

	for scanner.Scan() {
		line := scanner.Text()
		var row []rune
		for _, c := range line {
			row = append(row, rune(c))
		}
		arr = append(arr, row)
	}

	var rowNumbers [][]item
	for ir, row := range arr {
		rn := 0
		for j := 0; j < len(row); j++ {
			c := row[j]
			if unicode.IsDigit(c) {
				var digits []item
				idx := j
				for {
					if unicode.IsDigit(row[idx]) {
						var digit item
						digit.c = row[idx]
						digit.row = ir
						digit.col = idx
						digit.rn = rn
						digits = append(digits, digit)
					} else {
						break
					}

					if idx == len(row)-1 {
						break
					}
					idx++
				}
				rowNumbers = append(rowNumbers, digits)

				rn += 1
				j += len(digits)
			}
		}
	}
	// Part 1
	{
		for _, rn := range rowNumbers {
			var nums []rune
			good := false
			for _, n := range rn {
				nums = append(nums, n.c)
				// Look left
				if n.col > 0 && isSymbol(arr[n.row][n.col-1]) {
					good = true
				}
				// Look right
				if n.col <= len(arr[0])-2 && isSymbol(arr[n.row][n.col+1]) {
					good = true
				}
				// Look up
				if n.row > 0 && isSymbol(arr[n.row-1][n.col]) {
					good = true
				}
				// Look down
				if n.row <= len(arr)-2 && isSymbol(arr[n.row+1][n.col]) {
					good = true
				}
				// Look up-left
				if n.row > 0 && n.col > 0 && isSymbol(arr[n.row-1][n.col-1]) {
					good = true
				}
				// Look up-right
				if n.row > 0 && n.col <= len(arr[0])-2 && isSymbol(arr[n.row-1][n.col+1]) {
					good = true
				}
				// Look down-left
				if n.row <= len(arr)-2 && n.col > 0 && isSymbol(arr[n.row+1][n.col-1]) {
					good = true
				}
				// Look down-right
				if n.row <= len(arr)-2 && n.col <= len(arr[0])-2 && isSymbol(arr[n.row+1][n.col+1]) {
					good = true
				}
			}

			if good {
				numInt, err := strconv.Atoi(string(nums))
				if err != nil {
					log.Fatal(err)
				}
				p1Ans += numInt
			}
		}

	}

	// Part 2
	{
		for ir, row := range arr {
			for j := 0; j < len(row); j++ {
				c := row[j]
				if c != '*' {
					continue
				}

				var touched []int
				for _, rn := range rowNumbers {
					var nums []rune
					touches := false
					for _, n := range rn {
						nums = append(nums, n.c)
						// Look left
						if n.col > 0 && n.row == ir && n.col-1 == j {
							touches = true
						}
						// Look right
						if n.col <= len(row)-2 && n.row == ir && n.col+1 == j {
							touches = true
						}
						// Look up
						if n.row > 0 && n.col == j && n.row-1 == ir {
							touches = true
						}
						// Look down
						if n.row <= len(arr)-2 && n.col == j && n.row+1 == ir {
							touches = true
						}
						// Look up-left
						if n.row > 0 && n.col > 0 && n.row-1 == ir && n.col-1 == j {
							touches = true
						}
						// Look up-right
						if n.row > 0 && n.col <= len(row)-2 && n.row-1 == ir && n.col+1 == j {
							touches = true
						}
						// Look down-left
						if n.row <= len(arr)-2 && n.col > 0 && n.row+1 == ir && n.col-1 == j {
							touches = true
						}
						// Look down-right
						if n.row <= len(arr)-2 && n.col <= len(row)-2 && n.row+1 == ir && n.col+1 == j {
							touches = true
						}
					}
					if touches {
						numInt, err := strconv.Atoi(string(nums))
						if err != nil {
							log.Fatal(err)
						}
						touched = append(touched, numInt)
					}
				}

				if len(touched) == 2 {
					ratio := touched[0] * touched[1]
					p2Ans += ratio
				}

			}
		}
	}

	p1 := strconv.Itoa(p1Ans)
	p2 := strconv.Itoa(p2Ans)
	return p1, p2
}
