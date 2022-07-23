const { pool } = require('./config/config')

const calculateCrowFlight = async (fromCity, forCity) => {
    let fromCityObj
    let forCityObj
    let calcResult

    const calculation = new Promise((resolve, reject) => {
        findCityByName(fromCity).then((cityFrom) => {
            findCityByName(forCity).then((cityFor) => {

                if (cityFrom == undefined || cityFor == undefined) {
                    calcResult == null
                    resolve()
                    return
                }

                fromCityObj = cityFrom
                forCityObj = cityFor

                let ph1 = cityFrom.latitude.toRad()
                let ph2 = cityFor.latitude.toRad()
    
                let l1 = cityFrom.longtitude.toRad()
                let l2 = cityFor.longtitude.toRad()
    
                let delyg = Math.acos(Math.sin(ph1) * Math.sin(ph2) + Math.cos(ph1) * Math.cos(ph2) * Math.cos(l1 - l2))
    
                let r = 6371
    
                let d = r * delyg
        
                calcResult = d
                resolve()
            })
        })
    })
    await calculation
    let result
    if (calcResult == null) {
        result == null
    } else {
        result = new DistanceBetweenCities(fromCityObj, forCityObj, calcResult)
    }
    return result
}

const findCityByName = async (name) => {
    let data;
    const query = new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM cities WHERE city_name = '${name}';`, (error, results) => {
            if (error) {
                resolve()
            }
            data = results.rows[0]
            resolve()
        });
    })
    await query;
    return data;
}

Number.prototype.toRad = function () { return this * Math.PI / 180; } 

class DistanceBetweenCities {
    constructor(fromCity, forCity, distance) {
        this.fromCity = fromCity
        this.forCity = forCity
        this.distance = distance
    }
}

module.exports = { calculateCrowFlight }

