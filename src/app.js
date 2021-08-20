const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const hbs = require('hbs')
const { checkPrimeSync } = require('crypto')

//console.log(__dirname)

const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handel bar egnine and view location
app.set('views', viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static dir
app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Eric Chen'
    })
})

//app.com/about
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Eric Chen'
    })
})

//app.com/help
app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Eric Chen',
        helptext: 'some useful trext'
    })
})


//app.com/weather  
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a location for the weather'
        })
    }
    geocode(req.query.address, (error, {Longtitude,Latitude,Location}={}) => {
        if (error){
            return res.send({error})
        }   
        forcast(Longtitude,Latitude, (error, fdata)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forcast: fdata,
                location: Location,
                Longtitude: Longtitude,
                Latitude: Latitude,
                address: req.query.address
            })
        })
            
        })
    })
//query string
app.get('/products', (req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You much provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Eric Chen',
        errormsg: 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Eric Chen',
        errormsg: '404 Page not found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})


