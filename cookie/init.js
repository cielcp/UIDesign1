$(document).ready(function(){

    $("button").click(function(){
      $("body").toggleClass("random");
      $("#closed").toggleClass("hidden");
      $("#open").toggleClass("hidden");
      $("#click").toggleClass("hidden");
      $("#reload").toggleClass("hidden");
    });

    let url = "https://api.adviceslip.com/advice"
    fetch(url)
      .then(response => response.json())
      .then(data => {
		let advice = document.getElementById("advice");
        advice.innerHTML = data.slip.advice;
      });
    


    /* create arrays of random values 
	var colors = ['blue', 'red', 'yellow', 'green'];
	var greetings = ['Hello', '안녕하세요', 'こんにちは', 'Aloha'];
*/
	/* 
	get a random number from 0-3
	(the amount of items in the
	randomColor array starting
	with 0)
	
	const random = Math.floor(Math.random() * colors.length);
*/
	/*
	get the item from each array
	in the random position
	
	var randomColor = colors[random];
	var randomGreeting = greetings[random];
*/
	/* use the random values */

	/* change body tag's css 
	$('body').css('background', randomColor);

	 add greeting to h1 tag 
	$('h1').html(randomGreeting);
    */
  });

