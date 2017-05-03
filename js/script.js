$(document).ready(function() {
    var input = document.getElementById('input');
    var input2 = document.getElementById('input2');
    var output = document.getElementById('output');
    
    setTimeout(function() {
        output.innerHTML = 'welcome to my personal website!';
        
        input.innerHTML = '|';
        input.classList.remove("intro");
        input.style.borderLeftWidth = "2px";
        input.style.borderLeft = 'solid';
        input.style.color = "#34495E";
        input.className = "waiting";
    }, 2250);
    
    $('.ls').each(function() {
        hoverAnimation(this, 'pulse');
    });
    
     function hoverAnimation(element, animation) {
        element = $(element);
        element.hover(function() {
            element.addClass('animated ' + animation);
        },
        function() {
            window.setTimeout(function() {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
    }
});

var kv = {'about':'console.log(bio);', 'work':'console.log(projects);', 'contact':'console.log(info);'};

var kv2 = {'about':'im nick, a JavaScript enthusiast. i love to build things with code.<br>' +
    ' im addicted to creating and watching ideas come to life.', 'work':'projects will go here',
    'contact':'Thanks for checking out my site! You can find me online here:'};

function tab(str) {
    //output.className = '';
    output.innerHTML = '';
    
    input.classList.remove('waiting');
    input.style.border = 'none';
    input.style.borderRightWidth = "2px";
    input.style.borderRight = 'solid';
    input.style.whiteSpace = "nowrap";
    input.style.overflow = "hidden";
    input.style.color = "#ECF0F1";
    input.innerHTML = kv[str];
    input.className = str;
    
    setTimeout(function() {
        output.innerHTML = kv2[str];
        
        input.innerHTML = '|';
        input.className = '';
   
        input.style.borderLeftWidth = "2px";
        input.style.borderLeft = 'solid';
        input.style.color = "#34495E";
        input.className = "waiting";
        
        if (str === 'contact') {
            document.getElementById('github').style.visibility = "visible";
            document.getElementById('twitter').style.visibility = "visible";
            document.getElementById('email').style.visibility = "visible";
        }
        else {
            document.getElementById('github').style.visibility = "hidden";
            document.getElementById('twitter').style.visibility = "hidden";
            document.getElementById('email').style.visibility = "hidden";
        }
    }, 2000);
}

function skills() {
    //output.className = '';
    output.innerHTML = '';
    input.classList.remove('waiting');
    input.style.border = 'none';
    input.style.borderRightWidth = "2px";
    input.style.borderRight = 'solid';
    input.style.whiteSpace = "nowrap";
    input.style.overflow = "hidden";
    input.style.color = "#ECF0F1";
    input.innerHTML = 'for (var i = 0; i < 4; i++)';
    input.className = 'skills';
    
    setTimeout(function() {
        input.innerHTML = 'for (var i = 0; i < 4; i++)';
        input.className = '';
        input.style.border = 'none';
        input2.classList.remove('waiting');
        input2.style.border = 'none';
        input2.style.borderRightWidth = "2px";
        input2.style.borderRight = 'solid';
        input2.style.whiteSpace = "nowrap";
        input2.style.overflow = "hidden";
        input2.style.color = "#ECF0F1";
        input2.innerHTML = 'console.log(skills[i]);';
        input2.className = 'skills2';
        
        setTimeout(function() {
            output.innerHTML = '- python<br>- javascript<br>- html<br>- css';
            input.innerHTML = '|';
            input.className = '';
            input.style.borderLeftWidth = "2px";
            input.style.borderLeft = 'solid';
            input.style.color = "#34495E";
            input.className = "waiting";
            input2.className = "waiting";
            input2.style.border = 'none';
            input2.innerHTML = '';
        }, 2100);
    }, 1600);
}
