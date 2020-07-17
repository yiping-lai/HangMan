var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	axios = require('axios'),
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
	axios.get(dictApi)
	.then(function(response){
		var word=response.data[0];
		res.render("game",{word:word});
	}).catch(function(){
		console.log("ERROR!!!");
	});
});


if (process.env.DEVELOPER==='1'){
	app.listen(3000, function() { 
		console.log('Server listening on port 3000'); 
	});
}else{
	app.listen(process.env.PORT, process.env.IP, function(){
  		console.log('Server listening on port',process.env.PORT); 
	});
};




