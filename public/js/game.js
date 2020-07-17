var isOver=false,
	inputKeys=document.querySelectorAll(".inputKey"),
	mainImg=document.querySelector("#mainImg"),
	hiddenLetters,
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
	],
	totalPoint=images.length-1;

init();

// initialize all variables and event listeners for input key
function init(){
	isOver=false;
	hiddenLetters=$('.letter').length;
	$("#guessLeft").text(totalPoint);	
	
	for (var i=0;i<inputKeys.length;i++){
		inputKeys[i].addEventListener("click",function(){	
			if(!isOver && !this.classList.contains("disabled")){
		    	this.classList.add("disabled");	
				letterSelect(this.textContent);
			}			
		})
	}
}

// control logic when user clicks an input key
function letterSelect(text){
	if(isOver){
		return;
	}
	
	var elements=$(".letter:contains('"+text+"')");		
	if (elements.length==0){
		// lose one point if no letter matched
		deductPoint();
		$("#guessLeft").text(totalPoint);	
		
	}else{
		// make letter guessed visible and update hidden letter count
		elements.css('color','black');
		hiddenLetters-=elements.length;
		if (hiddenLetters==0){
			endGame();
		}
		
	}
}

// deduct point and update image for a miss
function deductPoint(){
	totalPoint-=1;
	mainImg.setAttribute('src', images[images.length-totalPoint-1]);
	if (totalPoint==0){
		endGame();
	}
}

// display end of game message and disable all event listeners by "isOver=true"
function endGame(){
	isOver=true;
	if (totalPoint==0){
		$("#endMsg").text(" You lose!");			
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
