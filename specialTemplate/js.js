/* get elements */
let landingPage = document.querySelector('.landing-page');
let settingBox = document.querySelector('.setting-box');
let menu = document.querySelector('.hamburger-menu');
let spans = document.querySelectorAll('.setting-box .color span');
let backGround = document.querySelectorAll('.setting-box .background div');

/* controle local storage and check't */
// check the color choosed
if(localStorage.getItem('choosenClr')){
    document.body.style.setProperty('--color', localStorage.getItem('choosenClr'));
};

// set array of images name
let myImages = ['01', '02', '03', '04', '05'];

// set function to change background image every 5s
let i=1;

// define the settimeout var
let changebg;
// check if localstorage if user choose randombg or no
if(localStorage.getItem('randombg')){
    if(localStorage.getItem('randombg') == 'true'){
        changebg = setInterval(() => {
            landingPage.style.backgroundImage = 'url("./img/'+myImages[i]+'.jpg")';
            i++;
            if(i == 5) i=0;
        },7000);
    }else{
        backGround[0].classList.remove('active');
        backGround[1].classList.add('active');
    };
};

// add function when clicking on the menu
menu.addEventListener('click', () => {
    menu.firstElementChild.classList.toggle('active');
    settingBox.classList.toggle('active');
});

// add function when clicking on the spans
spans.forEach(span => {
    span.addEventListener('click', () => {
        span.parentElement.querySelectorAll('span').forEach(span => {
            span.classList.remove('active');
        });
        span.classList.add('active');
        document.body.style.setProperty('--color', span.getAttribute('data-color'));
        window.localStorage.setItem('choosenClr', span.getAttribute('data-color'));
    });
});

// add function to controle the background changes
backGround.forEach(div => {
    div.addEventListener('click', () =>{
        if(div.classList.contains('yes')){
            randombg(div);
        }else{
            preventRandombg(div);
        };
    });

});

// function to controle the the random background and classes
function randombg(div) {
    div.nextElementSibling.classList.remove('active');
    div.classList.add('active');
    changebg = setInterval(() => {
        landingPage.style.backgroundImage = 'url("./img/'+myImages[i]+'.jpg")';
        i++;
        if(i == 5) i=0;
    },7000);
    localStorage.setItem('randombg', 'true');
};

// functino to prevent random background
function preventRandombg(div) {
    div.previousElementSibling.classList.remove('active');
    div.classList.add('active');
    clearInterval(changebg);
    localStorage.setItem('randombg', 'false');
};

// set the skills animation 

let myskills = document.querySelectorAll('.myskills >div');
window.onscroll = function () {
    if(window.pageYOffset > 500 && window.pageYOffset < 1350 ){
        myskills.forEach( div => {
            div.firstElementChild.lastElementChild.style.opacity = 1;

            if(div.classList.contains('html')) div.firstElementChild.style.width = '80%';

            if(div.classList.contains('css')) div.firstElementChild.style.width = '70%';

            if(div.classList.contains('javaScript')) div.firstElementChild.style.width = '85%';

        });
    }else{
        myskills.forEach( div => {
            div.firstElementChild.style.width = '11%';
            div.firstElementChild.lastElementChild.style.opacity = 0;
        });
    };
};
    
