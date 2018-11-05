/* --- Question Functions ---
   -------------------------------------------------- */
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    if (vars==null){
       return null;
    }
    else{
       return vars;
    }
}

function next_q()
{
	if ( $('#end').hasClass('hide') == true )
	{
		//alert("change");
		var question = q.shift();
		
		QuestionTime[counter] = new Date();
		AnswerTime[counter] = (QuestionTime[counter] - QuestionTime[counter-1])/1000;
		
		if (question != 'done')
		{
			QuestionList[counter] = question;
    		
    		var qs = getUrlVars()["question"];  
			if(qs == "yes") 
    		{
				$('#question').html(question);
    		}
    		qs = getUrlVars()["speak"];  
			if(qs != "no") 
    		{
				var msg = new SpeechSynthesisUtterance(question);
				window.speechSynthesis.speak(msg);
    		}

			timer_restart();
			display_tip();
		} else
		{
			$('#question').addClass('hide');
			$('#timer').addClass('hide');
			$('.pg').addClass('hide');
			
			$('#end').removeClass('hide');
			$('#resulttable').addClass('resultclass');
			var totalTime = 0;
			for (var i = 0; i < counter; i++) {
				$('#resulttable').append("<tr><td>" + QuestionList[i] + "</td><td>" + AnswerTime[i+1] + "</td></tr>"); 
				totalTime = totalTime + AnswerTime[i+1];
			}
			$('#resulttable').append("<tr><td><b>Total</b></td><td><b>" + totalTime + "</b></td></tr>"); 
				
			
		}
		//var tip = tips.shift();
//		$('#tip').html(AnswerTime[counter] + list[counter]);
		counter++;
	}
}



/* --- Timer Functions ---
   -------------------------------------------------- */

function timer_tick()
{
	$('#timer').removeClass('warning');
	$('#timer').removeClass('fail');
	
	timer = timer - 1;
	
	$('#timer').html(timer + ' s');
	
	
	if (timer < 10)
	{
		$('#timer').addClass('warning');
	}
	if (timer < 5)
	{
		$('#timer').removeClass('warning');
		$('#timer').addClass('fail');
	}
	if (timer <= 0)
	{
		$('#timer').addClass('hide');
		//$('.pg').removeClass('hide');
	}
	
	 setTimeout('timer_tick();', 1000);
}

function timer_restart()
{
	$('#timer').removeClass('warning');
	$('#timer').removeClass('fail');
	$('.pg').addClass('hide');
	$('#timer').removeClass('hide');
	
	timer = 30;
	
	$('#timer').html('30 s');
}



/* --- Tip Functions ---
   -------------------------------------------------- */

function display_tip()
{
	var tip = tips.shift();
	
	$('#tip').html(tip);
	
	tips.push(tip);
}
