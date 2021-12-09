const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/cryptos/ng-blog'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/cryptos/ng-blog/index.html'));
});

app.listen(process.env.PORT || 8080);