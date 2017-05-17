setTimeout(function() {
    var textArea = document.createElement("textarea");
    
    textArea.textContent = "hey!";
    
    document.getElementById("one").appendChild(textArea);
}, 1000);
