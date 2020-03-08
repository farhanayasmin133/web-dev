const express = require('express');
const bodyParser = require("body-parser");
const PlayPoker = require("./PlayPoker");

// Create a new express application instance
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//N: This is the way you are going to publish your website in server
app.use(express.static("www"));
//N: This code gets your name and shows it to you
app.get("/users/:uname", (req, res) => {
    res.end("Hello " + req.params.uname);
});

let oGames = {};
app.post("/sms", (req, res) =>{
    let sFrom = req.body.From || req.body.from;
    if(!oGames.hasOwnProperty(sFrom)){
        oGames[sFrom] = new PlayPoker();
    }
    let sMessage = req.body.Body|| req.body.body;
    //N: Have to implement makeAMove in assignment 1
    oGames[sFrom].makeAMove(sMessage, (aReply) =>{
        res.setHeader('content-type', 'text/xml');
        let sResponse = "<Response>";
        for(let n = 0; n < aReply.length; n++){
            sResponse += "<Message>";
            sResponse += aReply[n];
            sResponse += "</Message>";
        }
        res.end(sResponse + "</Response>");
    
    });

});

var port = process.env.PORT || parseInt(process.argv.pop()) || 3000;

app.listen(port, () => console.log('Example app listening on port ' + port + '!'));
