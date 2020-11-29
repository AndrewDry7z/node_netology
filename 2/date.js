#!/usr/bin/env node

const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .alias('y', 'year')
    .alias('m', 'month')
    .alias('d', 'date')
    .argv

let result
let newDate = new Date();

const {year, month, date} = argv;

if (argv._.includes('current')) {
  if (year)
    result = newDate.getFullYear()
  else if (month)
    result = newDate.getMonth()
  else if (date)
    result = newDate.getDate()
  else
    result = newDate
} else if (argv._.includes('add')) {
  if (year)
    result = new Date(newDate.setFullYear(newDate.getFullYear() + parseInt(year),
        newDate.getMonth(), newDate.getDate())).toISOString()
  else if (month)
    result = new Date(newDate.setFullYear(newDate.getFullYear(),
        newDate.getMonth() + parseInt(month), newDate.getDate())).toISOString()
  else if (date)
    result = new Date(newDate.setFullYear(newDate.getFullYear(),
        newDate.getMonth(), newDate.getDate() + parseInt(date))).toISOString()
  else
    result = newDate
} else if (argv._.includes('sub')) {
  if (year)
    result = new Date(newDate.setFullYear(newDate.getFullYear() - parseInt(year),
        newDate.getMonth(), newDate.getDate())).toISOString()
  else if (month)
    result = new Date(newDate.setFullYear(newDate.getFullYear(),
        newDate.getMonth() - parseInt(month), newDate.getDate())).toISOString()
  else if (date)
    result = new Date(newDate.setFullYear(newDate.getFullYear(),
        newDate.getMonth(), newDate.getDate() - parseInt(date))).toISOString()
  else
    result = newDate
}

console.log(result)
//https://cs9.pikabu.ru/post_img/big/2019/05/22/10/155854110312571616.jpg
