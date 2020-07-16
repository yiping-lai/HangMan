var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	request = require("request"),
	dictApi = "https://random-word-api.herokuapp.com/word?number=1";


//=========================
// Config app
//=========================

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public")); 


//=========================
// Routes
//=========================
app.get("/",function(req,res){
	// get a random word from dictApi to start the game
	request.get(dictApi, (error, response, body) => {
		var word=body.substring(2,body.length-2).split('');
		res.render("game",{word:word});
	});	
});


app.listen(3000, function() { 
	console.log('Server listening on port 3000'); 
});




