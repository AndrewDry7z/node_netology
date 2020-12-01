const http = require('http')
const url = `http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=Ulan-Ude`

const request = http.get(url, (response) => {
  const statusCode = response.statusCode

  if (statusCode !== 200) {
    console.error(`Status Code: ${statusCode}`)
    return
  }
  response.setEncoding('utf8')
  let rawData = ''
  response.on('data', (chunk) => rawData += chunk)
  response.on('end', () => {
    let parsedData = JSON.parse(rawData)
    const weather = parsedData.current
    console.log('Weather in Ulan-Ude:')
    console.log(`Temperature: ${weather.temperature}°C (feels like ${weather.feelslike}°C)`)
    console.log(weather.weather_descriptions[0])
  })
})
