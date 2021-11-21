
// add class active on page load to start animation
window.addEventListener('load', e => {
    //add active class to neon div
    document.querySelector('.neon').classList.add('active');
    document.querySelectorAll('#home >div:not(:last-of-type)').forEach(div => {
        div.classList.add('active');
    });
    
    let myjob = 'Full web stack developper /desktop app developper.';
    let aboutme = 'I love programming and designing, freelancer have built severel projects.';
    let jobDiv = document.querySelector('#home .job');
    document.querySelectorAll('.container >div:not(:last-of-type)').forEach((div,index) => {
        let mytarget = '';
        switch (index) {
            case 0:
                mytarget = myjob;
                break;
            case 1:
                mytarget = aboutme;
                break
            default:
                break;
        }
        if(index == 0 || index == 1){

            mytarget.split('').forEach(letter => {

                if(letter == '/' || letter == ','){

                    let span = document.createElement('span');
                    span.textContent = letter;
                    div.lastElementChild.appendChild(span);
                    let br = document.createElement('br');
                    div.lastElementChild.appendChild(br);
                }else{

                    let span = document.createElement('span');
                    span.textContent = letter;
                    div.lastElementChild.appendChild(span);
                }
            });
            setTimeout(() => {
                let delay = 0;
                [...div.lastElementChild.children].forEach(span => {
                    delay += 0.1;
                    span.style.transitionDelay = delay + "s";
                })
                if(index == 0) div.lastElementChild.classList.add('active');
            }, 1700);            
        }; 
    }); 
});

// we will use the under variable to set the event lestiner once to avoid missbehavers
let excuted = false;
document.querySelectorAll('.navbar div').forEach((div,index,array) => {

    let clickhandler = function(e){

        //navbar active section
        if(!div.classList.contains('active')){
            let curClass = div.className;
            div.classList.add('active');
            for(let i=0; i<array.length; i++){
                if(array[i].classList.contains('active') && !array[i].classList.contains(curClass)){
                    array[i].classList.remove('active');
                    break;
                };
            };
            //active section
            let sections = document.querySelectorAll('.container >div:not(.neon)');
            document.querySelector('.neon').classList.remove('active');

            for(let i=0; i<sections.length; i++){

                // loop through section 
                if(sections[i].id == curClass){

                    //set the active section
                    sections[i].classList.remove('unactive');
                    setTimeout(()=>{
            
                        [...sections[i].children].forEach(child => {
                            
                            //add active class to section's children
                            if(!child.classList.contains('active')){

                                child.classList.add('active');
                                document.querySelector('.neon').classList.add('active');

                                if(child.classList.contains('mySkills')){

                                    [...child.lastElementChild.children].forEach(child => {
                                        
                                        let barHeight = child.lastElementChild.clientHeight;
                                        let parentHeight = child.clientHeight;
                                        child.lastElementChild.style.transform = 
                                        `translateY(${parentHeight-barHeight}px)`;
                                    });
                                    window.addEventListener('resize', e => {
                                        [...child.lastElementChild.children].forEach(child => {
                                        
                                            let barHeight = child.lastElementChild.clientHeight;
                                            let parentHeight = child.clientHeight;
                                            child.lastElementChild.style.transform = 
                                            `translateY(${parentHeight-barHeight}px)`;
                                        });
                                    });

                                }else if(child.classList.contains('gallery')){
                                    (function(){
                                        let excuted = false;
                                        (function(){
                                            if(excuted == false){
                                                excuted = true;
                                                let target1 = child.firstElementChild.firstElementChild;
                                                let target2 = child.lastElementChild.firstElementChild;
                                                let target1Margin = target1.parentElement.clientHeight;
                                                let target2Margin = target2.parentElement.clientHeight;
                                                window.addEventListener('resize', e => {
                                                    target1Margin = target1.parentElement.clientHeight;
                                                    target2Margin = target2.parentElement.clientHeight;
                                                })
                                                let loopCount = 0;
                                                let animateGallery = setInterval(e => {
                                                    loopCount += 1;
                                                    switch (loopCount) {
                                                        case 1:
                                                            target1.style.marginTop = `-${target1Margin}`;
                                                            target2.style.marginTop = `-${target2Margin}`;
                                                            break;
                                                        case 2:
                                                            target1.style.marginTop = `-${target1Margin*2}`;
                                                            target2.style.marginTop = `-${target2Margin*2}`;
                                                            break;
                                                        default:
                                                            target1.style.marginTop = `0`;
                                                            target2.style.marginTop = `0`;
                                                            loopCount = 0;
                                                            break;
                                                    };

                                                },3000);
                                            }
                                        })()
                                    })()

                                }
                                
                            };
                        });
                    },100);
                    sections.forEach(section => {
                        
                        if(!section.classList.contains('unactive') && section.id != curClass){
                            [...section.children].forEach(child => {

                                if(child.classList.contains('active')){
                                    child.classList.remove('active');
                                };
                            });
                            section.classList.add('unactive');
                        };
                    });
                    break;
                };
            };
        };

    }
    if(excuted == false) div.addEventListener('click', clickhandler);
    if(index == array.length) excuted = true;

});

document.querySelector('#contact .addresses .telegram a').onclick = function(e){
    e.preventDefault();
};