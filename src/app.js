const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

// difine paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partial');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.set('', partialPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'VKG'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Vishal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help page created by Vishal',
        title: 'Help Page',
        name: 'Vishal'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//             name: 'vishal',
//             age: 37
//         },
//         {
//             name: 'akash',
//             age: 30
//         }
//     ]);
// });

// app.get('/about', (req, res) => {
//     res.send("About Page");
// });

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You need to insert an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ // plz use return keyward here 
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: 'Error 404',
        name: 'vishal',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'vishal',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log("Server is on port no : 3000");
});