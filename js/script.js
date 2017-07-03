let menu = false;

$('.menu').on('click', function() {
    if (!menu) {
        $('.top').removeClass('flipDownRev');
        $('.mid').removeClass('fadeIn');
        $('.btm').removeClass('flipUpRev');
        
        $('.about').removeClass('aboutFadeOut');
        $('.personalWork').removeClass('workFadeOut');
        $('.contact').removeClass('contactFadeOut');
        
        $('.top').addClass('flipDown');
        $('.mid').addClass('fadeOut');
        $('.btm').addClass('flipUp');
        
        $('.about').addClass('aboutFadeIn');
        $('.personalWork').addClass('workFadeIn');
        $('.contact').addClass('contactFadeIn');
        menu = true;
    }
    else {
        $('.top').removeClass('flipDown');
        $('.mid').removeClass('fadeOut');
        $('.btm').removeClass('flipUp');
        
        $('.about').removeClass('aboutFadeIn');
        $('.personalWork').removeClass('workFadeIn');
        $('.contact').removeClass('contactFadeIn');
        
        $('.top').addClass('flipDownRev');
        $('.mid').addClass('fadeIn');
        $('.btm').addClass('flipUpRev');
        
        $('.about').addClass('aboutFadeOut');
        $('.personalWork').addClass('workFadeOut');
        $('.contact').addClass('contactFadeOut');
        menu = false; 
    }
});

const section = {
    0: '.aboutMe',
    1: '.work',
    2: '.social'
};

function scroll(num) {
    $('body').animate({
        scrollTop: $(section[num]).offset().top
    }, 1000);
}

const translateX = [222, 250, 211, 210, 250, 226, 207, 236, 216, 200, 180, 176, 150, 142, 123, 126, 130, 107, 133, 100, 138, 198, 200, 189, 177, 178];
const translateY = [155, 110, 151, 98, 80, 82, 64, 56, 50, 42, 34, 22, 34, 27, 38, 51, 87, 55, 74, 100, 97, 51, 167, 166, 188, 221];
const deg = [210, 40, 36, 10, 0, -5, 0, -40, -21, -80, -90, 80, -115, 50, 30, 0, 180, 15, 0, -80, 80, -45, -148, 30, 18, -180];
const scale = [1, 1, 0.65, 1, 1, 1, 1, 1, 1, 1, 0.6, 0.5, 0.5, 0.5, 0.6, 0.7, 0.8, 0.7, 0.7, 0.9, 0.7, 0.6, 0.65, 0.7, 0.6, 0.35];
const fill = '#446CB3';
const path1 = 'M3.6,5c0.6,0.2,1,0.4,1.4,0.6c1.8,0.8,2.4,1.9,2.2,3.7c-0.2,1.5-1.1,2.5-2.7,2.7c-1.7,0.3-3.2-0.4-4-1.9c-1.4-2.6-0.3-6.4,2.5-8.2c3.7-2.4,7.7-2.5,11.6-0.6c4.7,2.3,5.2,8.1,1,11.3c-0.4,0.3-0.8,0.6-1.2,0.9c-3.4,2.5-3.7,2.8-4.5,6.7c-0.6,0-1.2,0-1.9,0.1C8,17.5,8.6,15.2,9.9,13c1.1-1.9,2-3.9,1.8-6.3c-0.2-2-1.4-3.5-3.3-3.9C6.4,2.4,4.7,3.2,3.6,5z';
const path2 = 'M8.5,30.6c-2.1,0-3.7-1.7-3.6-3.8c0.1-2.1,1.7-3.7,3.8-3.6c2,0.1,3.6,1.7,3.6,3.7C12.2,29,10.6,30.6,8.5,30.6z';

const svgNS = 'http://www.w3.org/2000/svg';
const mainG = document.getElementById('questions');

for (var i = 0; i < deg.length; i++) {
    const group = document.createElementNS(svgNS, 'g');
    const top = document.createElementNS(svgNS, 'path');
    const btm = document.createElementNS(svgNS, 'path');
    
    group.setAttributeNS(null, 'transform', 'translate(' + translateX[i] + ',' + translateY[i] + ') rotate(' + deg[i] + ') scale(' + scale[i] + ')');
    top.setAttributeNS(null, 'd', path1);
    top.setAttributeNS(null, 'fill', fill);
    btm.setAttributeNS(null, 'd', path2);
    btm.setAttributeNS(null, 'fill', fill);
    
    group.appendChild(top);
    group.appendChild(btm);
    
    mainG.appendChild(group);
}

	
