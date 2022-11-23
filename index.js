const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');

// Set EJS as templating engine
app.set('view engine', 'ejs');

// to make sure css and js file are added and work
app.use(express.static('local-tv-show'));
app.use(express.static(__dirname))



app.get('/tv-shows', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
})


const getSingleShow = async function (showId) {
    try {
        const result = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        return result.data;
    } catch (e) {
        console.log(e); 
    }
}

app.get('/tv-shows/:id', async (req, res) => {
    const { id } = req.params;
    showData = await getSingleShow(id)
    res.render('view.ejs', { showData } );    
})




app.listen(3000, () => {
    console.log('listening on port 3000')
})

