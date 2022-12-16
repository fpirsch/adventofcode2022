# Advent Of Code 2022

I've been doing the [advent of code](https://adventofcode.com/) for a few years now. Never made it to the
[global leaderboard](https://adventofcode.com/2022/leaderboard) because of the time zone difference. And also because I'm not _that_ fast. However I still wanted to share some of my experience, solutions and tools.

# Installation

`npm install`

If you want to use the downloading tool `npm run get`, you will have to provide your session cookie:

1. Log in to https://adventofcode.com/2022 with your browser
2. Use the dev tools to copy the value of the session cookie (a 128-char hex code, don't copy the quotes if any)
3. Save this cookie in a file called `aoc-session-cookie` at the root of this project. It will stay valid for the whole month.

# Solutions

Each `day<n>` folder contains my input, some example data automatically extracted from the problem page, and the code of my solution.

```bash
% node day1
star 1: 12345 (0ms)
star 2: 123456 (3ms)
```

Same but reads example input in the `data1.txt` file instead of `input.txt`

```bash
% node day1 data1
star 1: 1234 (0ms)
star 2: 12345 (3ms)
```

# Automatic coding template setup

Each day during the challenge, you can run the command

`npm run get`

It will create the appropriate folder, an `index.js` file to start to code quickly, download your input of the day and save it to an `input.txt` file.
It will also scrape example data blocks on the problem page, and save them locally in a bunch of `data<n>.txt` files.

The lib has some functions to read the input data locally.

`readLines()` reads the input file and returns its content as an array of strings.

# What library should you use ?

One that you know well. You don't want to spend your time reading docs.

A good lib matters in this event, especially if you choose JS as your language, if you want to spend your time actually solving the problems instead of writing trivial things that already exist.

JS doesn't have a good standard library for algorithmics and data structures, like e.g. Python has. [Lodash](https://lodash.com/) does a pretty good job, so I went with it, and added my own super small library, with some generic functions, and some very specific to the advent of code.

# Tips

Solving 50 problems in 25 days is a lot of work. It can be tedious at times.
If you want to keep the fun and get all of the 50 stars,

- keep your code short. The shorter your solution, the less code you write, the less code you debug, the faster you get that solution.
- try to keep up, don't skip days. You won't come back to solve them later, so a skipped day means 2 stars lost.
- know your language and your libs. This saves a lot of time. You may not use lodash's `zip`or `chunk` functions often, but they can make a lot of difference.
