const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const  app = express()

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew'
    })
} )

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew'
    })
} )

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew',
        msg: 'Help Page'
    })
} )


app.get('/weather',(req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {})=> {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({products: []})
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Andrew',
        error: 'Help article not found'
    })
})
app.get('*',(req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Andrew',
        error: 'Page not found'
    })
} )


app.listen(3000, () => {
    console.log("Server Started ....")
})