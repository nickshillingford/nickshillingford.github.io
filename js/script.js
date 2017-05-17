setTimeout(function() {
    var textArea = document.createElement("textarea");
    
    textArea.textContent = "hey!";
    
    document.getElementById("one").appendChild(textArea);
}, 1000);

/*
$(window).scroll(function(event) {
    scroll = $(window).scrollTop();
    
    if ((scroll > 300) && !(isVisible)) {
        document.getElementById("bubble0").className += " bubble";
        
        setTimeout(function() { 
            document.getElementById("bubble0").innerHTML = "javascript."; 
        }, 1200);
		
		isVisible = true;
    }
});
*/
