package solutions

import (
	"bufio"
	"log"
	"os"
	"strconv"
	"strings"
)

type pull struct {
	red   int
	blue  int
	green int
}

type game struct {
	id    int
	pulls []pull
}

func Day02() (string, string) {
	p1Ans := 0
	p2Ans := 0

	// Part 1
	{
		file, err := os.Open("data/day02_data.txt")
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)

		games := []game{}

		for scanner.Scan() {
			var g game

			// Parse the id
			s1 := strings.Split(scanner.Text(), ": ")
			id := strings.Split(s1[0], " ")[1]
			idInt, err := strconv.Atoi(id)
			if err != nil {
				log.Fatal(err)
			}
			g.id = idInt

			// Parse the pulls
			p1 := strings.Split(s1[1], "; ")
			for _, p := range p1 {
				var pull pull
				types := strings.Split(p, ", ")
				for _, t := range types {
					items := strings.Split(t, " ")
					n, err := strconv.Atoi(items[0])
					if err != nil {
						log.Fatal(err)
					}
					if items[1] == "blue" {
						pull.blue = n
					} else if items[1] == "red" {
						pull.red = n
					} else if items[1] == "green" {
						pull.green = n
					}
				}
				g.pulls = append(g.pulls, pull)
			}
			games = append(games, g)
		}

		for _, game := range games {
			// add up all blues
			validGame := true
			for _, pull := range game.pulls {
				if pull.red > 12 || pull.green > 13 || pull.blue > 14 {
					validGame = false
					break
				}
			}
			if validGame {
				p1Ans += game.id
			}
		}
	}

	// Part 2
	{
		file, err := os.Open("data/day02_data.txt")
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)

		games := []game{}

		for scanner.Scan() {
			var g game

			// Parse the id
			s1 := strings.Split(scanner.Text(), ": ")
			id := strings.Split(s1[0], " ")[1]
			idInt, err := strconv.Atoi(id)
			if err != nil {
				log.Fatal(err)
			}
			g.id = idInt

			// Parse the pulls
			p1 := strings.Split(s1[1], "; ")
			for _, p := range p1 {
				var pull pull
				types := strings.Split(p, ", ")
				for _, t := range types {
					items := strings.Split(t, " ")
					n, err := strconv.Atoi(items[0])
					if err != nil {
						log.Fatal(err)
					}
					if items[1] == "blue" {
						pull.blue = n
					} else if items[1] == "red" {
						pull.red = n
					} else if items[1] == "green" {
						pull.green = n
					}
				}
				g.pulls = append(g.pulls, pull)
			}
			games = append(games, g)
		}

		for _, game := range games {
			maxRed, maxGreen, maxBlue := 0, 0, 0
			for _, pull := range game.pulls {
				maxRed = max(maxRed, pull.red)
				maxGreen = max(maxGreen, pull.green)
				maxBlue = max(maxBlue, pull.blue)
			}
			p2Ans += (maxRed * maxGreen * maxBlue)
		}
	}

	p1 := strconv.Itoa(p1Ans)
	p2 := strconv.Itoa(p2Ans)

	return p1, p2
}
