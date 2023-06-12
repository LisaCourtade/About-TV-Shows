const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

// Set EJS as templating engine
app.set('view engine', 'ejs');

// to make sure css and js file are added and work
app.use(express.static('local-tv-show'));
app.use(express.static(__dirname))

const getShows = async function (searchedText) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchedText}`);
        return result.data;
    } catch (e) {
        console.log(e); 
    }
}

const getSingleShow = async function (showId) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/shows/${showId}?embed=crew`);
        return result.data;
    } catch (e) {
        console.log(e); 
    }
}

const getSeasons = async function (showId) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/shows/${showId}/seasons`);
        return result.data;
    } catch (e) {
        console.log(e); 
    }
}

const getCast = async function (showId) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/shows/${showId}/cast`);
        return result.data;
    } catch (e) {
        console.log(e); 
    }
}

const getEpisodes = async function (seasonId) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/seasons/${seasonId}/episodes`);
        return result.data;
    } catch (e) {
        console.log(e); 
    }
}

app.get('/home', async (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
})

app.get('/tv-shows', async (req, res) => {
    const searchedText = req.query.title;
    const shows = await getShows(searchedText);
    res.render('index.ejs', { shows, searchedText });
})

app.get('/tv-shows/:id', async (req, res) => {
    const { id } = req.params;
    const showData = await getSingleShow(id);
    const seasonsData = await getSeasons(id);
    const castData = await getCast(id);
    res.render('view.ejs', { showData, seasonsData, castData } );    
})

app.get('/tv-shows/:id/seasons', async (req, res) => {
    const { id } = req.params;
    const seasonsData = await getSeasons(id);
    const showData = await getSingleShow(id);
    const showImage = showData.image ? showData.image.medium : null;
    res.render('seasons.ejs', { seasonsData, showImage } );    
})

app.get('/tv-shows/:id/episodes', async (req, res) => {
    const { id } = req.params;
    const seasonData = await getEpisodes(id);
    res.render('episodes.ejs', { seasonData } );    
})


app.listen(443, () => {
    console.log('listening on port 443')
})

