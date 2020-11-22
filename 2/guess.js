#!/usr/bin/env node

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const randomNumber = Math.floor(Math.random() * Math.floor(101))

console.log('Загадано число в диапазоне от 0 до 100')
rl.on('line', (line) => {
  if (line.trim() < randomNumber) {
    console.log('Больше')
  } else if (line.trim() > randomNumber) {
    console.log('Меньше')
  } else {
    console.log('Бинго! Это ' + line.trim())
    rl.close()
    console.log('Have a great day!');
    process.exit(0);
  }
})
