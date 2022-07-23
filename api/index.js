const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { calculateCrowFlight } = require('./calculation')
const { pool } = require('./config/config')
const { Response } = require("./util/respone")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getCities = (request, response) => {
  pool.query('SELECT * FROM cities', (error, results) => {
    if (error) {
        response.status(200).json(new Response(null, "Не удалось загрузить информацию"))
    }
    response.status(200).json(new Response(results.rows, null))
  })
}

const getDistance = (request, response) => {
    let nameFrom = request.param('fromCity')
    let nameFor = request.param('forCity')
    calculateCrowFlight(nameFrom, nameFor).then((distance) => {
        if (distance != null) {
            response.status(200).json(new Response(distance, null))
        } else {
            response.status(200).json(new Response(null, "Не удалось загрузить информацию"))
        }
    })
}

app.get("/cities", getCities)

app.get("/calc", getDistance)


// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
})
