const readline = require('readline');
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const fs = require('fs')

const argv = yargs(hideBin(process.argv))
    .alias('p', 'play')
    .alias('s', 'stats')
    .argv

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const randomNumber = Math.floor(Math.random() * Math.floor(2)) + 1
const {play, stats} = argv

if (play) {
  const logFile = `./${(play.length > 0) ? play : 'log.txt'}`
  console.info(`Результат игры запишется в файл ${logFile}`)

  //game starts
  console.log('1 или 2?')
  let result
  rl.on('line', (line) => {
        const input = parseInt(line.trim())
        if ((input > 0) && (input < 3)) {
          if (parseInt(input) === randomNumber) {
            console.log('Угадал, молодец')
            result = '+'
          } else {
            console.log('Неправильно. Попробуй ещё раз!')
            result = '-'
          }

          //push result to log
          fs.appendFile(logFile, result, err => {
            if (err) throw new Error(err)
            process.exit(0)
          });
        } else {
          console.error('1 или 2?')
        }
      }
  )
} else if (stats) {
  const logFile = `./${(stats.length > 0) ? stats : 'log.txt'}`

  //read log file
  fs.readFile(logFile, 'utf-8', (err, logString) => {
    if (err) throw new Error(err)

    //form stats
    const statsArray = logString.split('')
    const gamesQuantity = statsArray.length
    const wonGames = statsArray.filter(win => win === '+').length
    const wonGamesPercent = ((wonGames / gamesQuantity) * 100).toFixed(2) + '%'
    const lostGames = statsArray.filter(win => win === '-').length
    const lostGamesPercent = ((lostGames / gamesQuantity) * 100).toFixed(2) + '%'

    //show stats
    console.log('СТАТИСТИКА')
    console.log('Кол-во сыгранных партий: ' + gamesQuantity)
    console.log(`Кол-во выигранных партий: ${wonGames} (${wonGamesPercent})`)
    console.log(`Кол-во проигранных партий: ${lostGames} (${lostGamesPercent})`)

    process.exit(0)
  });

} else {
  console.log('Аргументы программы:')
  console.log('--play (-p) log.txt => Играть и записать результат в файл log.txt (по умолчанию)')
  console.log('--stats (-s) log.txt => Показать статистику из файла log.txt')
  process.exit(0)
}

