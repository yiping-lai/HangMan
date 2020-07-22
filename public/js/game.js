var isOver=false,
	inputKeys=document.querySelectorAll(".inputKey"),
	mainImg=document.querySelector("#mainImg"),
	hiddenLetters,
	totalPoint,
	answer,
	isLoading=false;

const dictApi = "https://random-word-api.herokuapp.com/word?number=1",
	  images=[
		"/img/Hangman-0.png",
		"/img/Hangman-1.png",
		"/img/Hangman-2.png",
		"/img/Hangman-2.png",
		"/img/Hangman-3.png",
		"/img/Hangman-4.png",
		"/img/Hangman-5.png",
		"/img/Hangman-5.png",			
		"/img/Hangman-6.png"
		];


$(document).ready(init);


/*--------function definitions------*/

function init(){

	reset();
	
	// event listeners for keyboard
	for (var i=0;i<inputKeys.length;i++){
		inputKeys[i].addEventListener("click",function(){	
			if(!isOver && !this.classList.contains("disabled")){
		    	this.classList.add("disabled");	
				letterSelect(this.textContent);
			}			
		})
	}
	
	// evenet listener for newGame
	$("#newGame").on('click',function(){
		if(!isLoading){
			reset();	
		}
	})
}


// get a new word and reset page layout
function reset(){
	isLoading=true;
	$('#newGame').addClass('disabled');
	$.getJSON(dictApi)
	.then(function(data){
		// reset variables	
		answer=data[0].split('');
		isOver=false;
		hiddenLetters=answer.length;
		totalPoint=images.length-1;
		$("#guessLeft").text(totalPoint);	
		$("#endMsg").text('');

		// reset letter box
		$(".letterBox").empty();
		for (var i=0;i<answer.length;i++){
			var newletter=$("<span class='letter'>"+answer[i]+"</span>");
			$(".letterBox").append(newletter);
		}

		// enable all inputkeys
		for (var i=0;i<inputKeys.length;i++){
			$(inputKeys[i]).removeClass("disabled");
		}
		isLoading=false;
		$('#newGame').removeClass('disabled');
	})
	.catch(function(err){
		console.log(err);
	})
}


// control logic when user clicks an input key
function letterSelect(text){
	if(isOver){
		return;
	}
		
	if (!answer.includes(text)){
		// lose one point if no letter matched
		deductPoint();
		$("#guessLeft").text(totalPoint);	
		
	}else{
		// make letter guessed visible and update hidden letter count
		var elements=$(".letter:contains('"+text+"')");	
		elements.css('color','black');
		hiddenLetters-=elements.length;
		if (hiddenLetters===0){
			endGame();
		}
		
	}
}

// deduct point and update image for a miss
function deductPoint(){
	totalPoint-=1;
	mainImg.setAttribute('src', images[images.length-totalPoint-1]);
	if (totalPoint===0){
		endGame();
	}
}

// display end of game message and disable all event listeners by "isOver=true"
function endGame(){
	isOver=true;
	if (totalPoint===0){
		$("#endMsg").text(" You lose!");	
		// show hidden letters in red
		var letters=document.querySelectorAll(".letter");
		for (var i=0; i<letters.length; i++){
			if (letters[i].style.color==''){
				letters[i].style.color='red';
			}		
        }
	}else{
		$("#endMsg").text(" You win!");		
	}
}
