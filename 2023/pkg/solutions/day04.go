package solutions

import (
	"bufio"
	"log"
	"math"
	"os"
	"slices"
	"strconv"
	"strings"
)

type card struct {
	id             int
	winningNumbers []int
	numbers        []int
}

func play(game card) int {
	wins := 0
	for _, num := range game.numbers {
		if slices.Contains(game.winningNumbers, num) {
			wins++
		}
	}
	return wins
}

func Day04() (string, string) {
	p1Ans := 0
	p2Ans := 0

	file, err := os.Open("data/day04_data.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	var games []card
	for scanner.Scan() {
		line := scanner.Text()
		var game card
		id := strings.Fields(strings.Split(line, ": ")[0])[1]
		idInt, err := strconv.Atoi(id)
		if err != nil {
			log.Fatal(err)
		}
		winningNums := strings.Split(strings.Split(line, ": ")[1], " | ")[0]
		winningNumStrs := strings.Fields(winningNums)
		for _, wn := range winningNumStrs {
			n, err := strconv.Atoi(wn)
			if err != nil {
				log.Fatal(err)
			}
			game.winningNumbers = append(game.winningNumbers, n)
		}
		ourNums := strings.Split(strings.Split(line, ": ")[1], " | ")[1]
		ourNumStrs := strings.Fields(ourNums)
		for _, on := range ourNumStrs {
			n, err := strconv.Atoi(on)
			if err != nil {
				log.Fatal(err)
			}
			game.numbers = append(game.numbers, n)
		}
		game.id = idInt

		games = append(games, game)
	}

	// Part 1
	{
		for _, game := range games {
			c := 0
			for _, num := range game.numbers {
				if slices.Contains(game.winningNumbers, num) {
					c++
				}
			}
			if c > 0 {
				p1Ans += int(math.Pow(float64(2), float64(c-1)))
			}
		}
	}

	// Part 2
	{
		m := make(map[int]int)
		for _, game := range games {
			res := play(game)
			m[game.id] += 1
			for i := game.id + 1; i < game.id+1+res; i++ {
				m[i] += m[game.id]
			}
		}

		for _, v := range m {
			p2Ans += v
		}
	}

	p1 := strconv.Itoa(p1Ans)
	p2 := strconv.Itoa(p2Ans)
	return p1, p2
}
