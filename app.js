var express=require("express"),
	app=express(),
	bodyParser=require("body-parser"),
	port=process.env.PORT || 3000,
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
	// render home page 
	res.render('game');
});


app.listen(port, process.env.IP, function(){
	console.log('Server listening on port',port); 
});



