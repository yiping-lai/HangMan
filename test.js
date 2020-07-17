var url = "https://random-word-api.herokuapp.com/word?number=1";

var axios = require('axios');

axios.get(url).then(function(res){
	console.log(res.data[0]);
})