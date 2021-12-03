
document.body.style.height = window.innerHeight * 5;

// change the color of scroll thumb to feet with the track color
window.addEventListener('scroll', e => {
    if(window.scrollY > 1500){
        if(!document.body.classList.contains('scrolled')){
            document.body.classList.add('scrolled');
        }
    }else{
        if(document.body.classList.contains('scrolled')){
            document.body.classList.remove('scrolled');
        };
    };
});

// change the display type of the navbar on scroll
window.addEventListener('scroll', e => {

    let navbar = document.querySelector('#home .navbar');
    let targetHeight = document.querySelector('#home').clientHeight;

    if(window.scrollY >= targetHeight){
        if(!navbar.classList.contains('scrolled')){
            navbar.classList.add('scrolled');
        }
        //activate the skills animation
        document.querySelectorAll('#about .right .after div div').forEach(div => {
            div.setAttribute('style', 'animation-play-state: running !important');
        });
    }else{
        if(navbar.classList.contains('scrolled')){
            navbar.classList.remove('scrolled');
        }
    };
});

//active section on navbar
document.querySelectorAll('#home .navbar .sections div').forEach((div, index, array) => {
    div.onclick = function(){
        array.forEach(element => {
            if(element.classList.contains('active')){
                element.classList.remove('active')
            };
        });
        if(!div.classList.contains('active')){
            if(div.className == 'about'){
                document.querySelectorAll('#about .right .after div div').forEach(div => {
                    div.setAttribute('style', 'animation-play-state: running !important');
                });
            };
            div.classList.add('active');
        };
    };
});

//set the position of the skills div
document.querySelectorAll('#about .right .after div div').forEach(div => {
    div.onanimationend = function(e){
        div.classList.add('active');
    };
});

/**********************************contact section  ****************/
// send the message to the user
document.querySelector('#contact .left .form button').addEventListener(
    'click', e => {

        let form = document.querySelectorAll('#contact .left .form >*:not(button)');
        let successAlert = document.querySelector('.success');
        let errAlert = document.querySelector('.err');
        let checkArray = [];
        let formData = {};

        form.forEach((input, index) => {
            if(index < 3){
                if(input.firstElementChild.value == ''){
                    checkArray.push(false);
                }else{
                    checkArray.push(true);
                };
            }else{
                if(input.value == ''){
                    checkArray.push(false);
                }else{
                    checkArray.push(true);
                };
            };
        });

        if(checkArray.includes(false)){
            errAlert.children[1].lastElementChild.textContent = 'All fields must be filled out';
            if(!errAlert.classList.contains('active')){
                errAlert.classList.add('active');
            };
        }else{
            let emailValidation = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if(form[2].firstElementChild.value.match(emailValidation)){

                formData.title = form[0].firstElementChild.value;
                formData.name = form[1].firstElementChild.value;
                formData.email = form[2].firstElementChild.value;
                formData.message = form[3].value;
                console.log(formData)
                fetch( 
                    window.location.pathname +'/'+ window.location.hash.split('#')[1],
                    {   
                        method: 'POST',
                        headers:{'Content-Type': 'application/json'},
                        body: JSON.stringify(formData)
                    }
                ).then(res => {
                    if(res.status == 200){
                        if(!successAlert.classList.contains('active')){
                            successAlert.classList.add('active')
                        };
                        form.forEach((elem, index) => {
                            if(index < 3){
                                elem.firstElementChild.value = '';
                            }else{
                                elem.value = '';
                            };
                        });
                    }else{
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }else{
                errAlert.children[1].lastElementChild.textContent = 'Email address is not valid.';
                if(!errAlert.classList.contains('active')){
                    errAlert.classList.add('active');
                };
            };
        };
        
    }
);



