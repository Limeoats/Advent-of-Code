package solutions

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func replaceWordsWithNumbers(line string) []string {
	nums := map[string]string{"one": "1", "two": "2", "three": "3", "four": "4", "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"}
	digits := []string{}
	for i := 0; i < len(line); i++ {
		if unicode.IsDigit(rune(line[i])) {
			digits = append(digits, string(line[i]))
			continue
		}
		for key, value := range nums {
			if strings.HasPrefix(line[i:], key) {
				digits = append(digits, value)
				break
			}
		}
	}
	return digits
}

func Day01() (string, string) {
	p1Answer := 0
	p2Answer := 0

	// Part 1
	{
		file, err := os.Open("data/day01_data.txt")
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			ans := ""
			line := scanner.Text()
			digits := []string{}
			for i := 0; i < len(line); i++ {
				if unicode.IsDigit(rune(line[i])) {
					digits = append(digits, string(line[i]))
					continue
				}
			}

			ans = digits[0] + digits[len(digits)-1]

			ansInt, err := strconv.Atoi(ans)
			if err != nil {
				log.Fatal(err)
			}

			p1Answer += ansInt
		}
	}

	// Part 2

	{
		file, err := os.Open("data/day01_data.txt")
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			ans := ""
			line := scanner.Text()
			digits := replaceWordsWithNumbers(line)

			ans = digits[0] + digits[len(digits)-1]

			ansInt, err := strconv.Atoi(ans)
			if err != nil {
				log.Fatal(err)
			}

			p2Answer += ansInt
		}
	}

	p1 := strconv.Itoa(p1Answer)
	p2 := strconv.Itoa(p2Answer)

	return p1, p2
}
