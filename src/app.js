const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
// express library export exposes only a single function
// calling it will create a new express application
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// run server with 'node src/app.js'

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Define paths for Express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup handlebars engine and views location
// set allows you to set a value for a given express setting
// set(key, value)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
// static takes the path to the folder we want to serve up 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // .render('name of view to render','object containing all values you want the view to access')
    // inject a value in hbs file {{reference access}}
    res.render('index', {
        title: 'Weather App',
        name: 'Frankie'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        name: 'Frankie'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: 'Please contact 1-800-000-000',
        title: 'Help',
        name: 'Frankie'
    })
})

// .get lets us configure what a server should do when someone
// tries to get the resource at a specific url (sending HTML or JSON)

// (req, res) req contains information about the incoming request to the server
// res contains a bunch of methods to customize what we send back to the requester
// app.get('', (req, res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Frankie',
//         age: 19
//     },{
//         name: 'Ronan',
//         age: 19
//     }])
// })

// app.get('/about', (req,res) =>{
//     res.send('<h1>About page</h1>')
// })

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided."
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })               
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    

    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'Markham',
    //     address: req.query.address
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Frankie',
        errorMessage: 'Help article not found.'
    })
})

// creating an end point that sets up products to be displayed in the browser in the site 
app.get('/products', (req,res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// .get('*', (req,res)) * means to match everything
// else that hasn't been matched so far, or, more explicitly
// * means everything is a match

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Frankie',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})

// Ex. app.com is a single domain runnning all on one server
// app.com
// app.com/about
// app.com/help
// these are multiple ROUTES

// res.render('404',{locals})
// optional {locals} parameter containing objects and variables
// for the view accessed