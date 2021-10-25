/*const electron = require('electron');
const {ipcRenderer} = electron;*/

// set the height of overall div to be responsive and fit in all screens
document.querySelector('.overall').style.height = `${window.innerHeight}px`;
window.onresize = function(){
    document.querySelector('.overall').style.height = `${window.innerHeight}px`; 
};

// leftsection menu
document.querySelector('.leftsection .header .sub-header').onclick = function(){
    this.classList.toggle('active');
    document.querySelector('.leftsection').classList.toggle('active');
    document.querySelectorAll('.leftsection >div:not(:first-of-type) div i').forEach(icon => icon.classList.toggle('active'));
};

// leftsection handling click event on icon
document.querySelectorAll('.leftsection >div:not(:first-of-type) div').forEach(div => {

    div.addEventListener('click', e=> {

        document.querySelectorAll('.leftsection >div:not(:first-of-type) div').forEach(div => {

            div.classList.remove('active');
            div.parentElement.classList.remove('active');
            console.log(div.title);
            try{
                document.querySelector(`.overall .rightsection .${div.title}`).classList.remove('active'); 
            }catch{
                
            }
        });
        document.querySelector(`.overall .rightsection .${div.title}`).classList.toggle('active');
        div.classList.toggle('active');
        div.parentElement.classList.toggle('active');
    });
});

//rigthsection settings icon
document.querySelector('.rightsection .settings >i').addEventListener('click', ()=> {
    document.querySelector('.rightsection .settings .settingslist').classList.toggle('active');
});

//rightsection windowcontrollers
document.querySelector('.rightsection .windowcontroller').addEventListener('click', e=>{
    if(e.target.classList.contains('hide') || e.target.parentElement.classList.contains('hide')){
        ipcRenderer.send('window-hide');
    }else if(e.target.classList.contains('resize') || e.target.parentElement.classList.contains('resize')){
        ipcRenderer.send('window-resize', `${document.body.classList}`);
        document.body.classList.toggle('large');
    }else if(e.target.classList.contains('quit')){
        ipcRenderer.send('window-quit');
    };
});
document.querySelectorAll('.rightsection .windowcontroller .quit span').forEach(span =>{
    span.addEventListener('click', e=> ipcRenderer.send('window-quit'));
});

// log in window, styling the inputs on focusing
document.querySelectorAll('.overall .rightsection .loginwin input').forEach(input => {
    input.addEventListener('focus', e => {
        e.target.parentElement.classList.add('active');
    });
    input.addEventListener('blur', e => {
        e.target.parentElement.classList.remove('active');
    });
});

/********************************** stock  ************************************************************/

/**************************** css classes handling ************************/

// hide and show search section and display the right icon for each state 
document.querySelector('.overall .rightsection .stock .search h4 i').onclick = function(){
    this.parentElement.parentElement.classList.toggle('active');
    this.classList.toggle('active');
    document.querySelector('.overall .rightsection .stock .display').classList.toggle('active');
    if(this.classList.contains('active')){
        this.classList.replace('fa-caret-square-down', 'fa-caret-square-up');
        this.title = 'hide';
    }else{
        this.classList.replace('fa-caret-square-up', 'fa-caret-square-down');
        this.title = 'show';
    }
};

// Search input blur and focus event 
(function(){
    let inputs = document.querySelectorAll('.rightsection .stock >.search div:not(.expirationDate) input');
    inputs.forEach(input => {
        input.addEventListener('blur', function(e){
            if(input.value !== ''){
                input.nextElementSibling.style.display = 'none';
                input.style.paddingLeft = '0';
            };
        });
        input.addEventListener('focus', function(e){
            input.nextElementSibling.style.display = 'block';
            input.style.paddingLeft = '10px';
        });
    });
})();


//add the currency floeting point to inputs from type number
document.querySelectorAll('.rightsection .stock >.search div input').forEach(input => {
    input.addEventListener('blur', e => {
        if(input.type == 'number' && !input.parentElement.classList.contains('qnt')){
            if(input.value != '' && !input.value.includes('.')){
                input.value = input.value + '.00';
            };
        };
    });
});
// search input click
let searchicon = document.querySelector('.overall .rightsection .stock .display .options .searchinput i');
searchicon.addEventListener('click', e=>{
    searchicon.classList.toggle('active');
    searchicon.previousElementSibling.classList.toggle('active');
    if(searchicon.classList.contains('active')){
        searchicon.previousElementSibling.focus();
        searchicon.className = 'fas fa-times active';
    }else{
        searchicon.className = 'fas fa-search';
    };
});

// table cells width manipulating
let arrowsIcons = document.querySelectorAll('.overall .rightsection .stock .tableheader div:not(:last-of-type) i');
arrowsIcons.forEach(arrowicon => {
    arrowicon.addEventListener('click', e =>{
        if(arrowicon.classList.contains('fa-arrow-right')){
            //get the width
            let{width:parentWidth} = arrowicon.parentElement.parentElement.getBoundingClientRect();
            let{width:targetedElemWidth} = arrowicon.parentElement.getBoundingClientRect();
            //width with percentag
            let percentageOfTargetElem = (targetedElemWidth*100)/parentWidth;
            //increase the width of targeted element by 2%
            arrowicon.parentElement.style.width = `${percentageOfTargetElem + 3}%`;
            //apply same changes on the rows
            document.querySelectorAll('.rightsection .stock .display .row .productName').forEach(producnameDiv =>{
                producnameDiv.style.width = `${percentageOfTargetElem + 3}%`;
            });

        }else{
            //get the width
            let{width:parentWidth} = arrowicon.parentElement.parentElement.getBoundingClientRect();
            let{width:targetedElemWidth} = arrowicon.parentElement.getBoundingClientRect();
            //width with percentag
            let percentageOfTargetElem = (targetedElemWidth*100)/parentWidth;
            //decrease the width of targeted element by 2%
            arrowicon.parentElement.style.width = `${percentageOfTargetElem - 2}%`;
            //increase the width of siblings elements
            document.querySelectorAll('.rightsection .stock .tableheader div:not(:first-of-type)').forEach(div =>{

                if(!div.classList.contains('tools') && div.classList !== arrowicon.parentElement.classList && !div.classList.contains('qnt')){
                    let {width:divWidth} = div.getBoundingClientRect();
                    let percentageOfdivWidth = (divWidth*100)/parentWidth;
                    div.style.width = `${percentageOfdivWidth + 0.4}%`;
                };
            });
            // apply same changes on the rows
            document.querySelectorAll('.rightsection .stock .display .row .productName').forEach(producnameDiv =>{
                producnameDiv.style.width = `${percentageOfTargetElem -2}%`;
            });
            document.querySelectorAll('.rightsection .stock .display .row div:not(.productName)').forEach((div, index, array) =>{
                if(index !== 0 && index !== array.length - 1 && !div.classList.contains('qnt')){
                    let {width:divWidth} = div.getBoundingClientRect();
                    let percentageOfdivWidth = (divWidth*100)/parentWidth;
                    div.style.width = `${percentageOfdivWidth + 0.4}%`;
                };
            });
        };
    });
});

// display table rows options on click //////////////////////////
document.querySelectorAll('.rightsection .stock .display .table .row .tools span').forEach(rowtool => {
    rowtool.addEventListener('click', e => {
        //show edit section
        let parentrow;
        if(e.target.tagName == 'I') parentrow = e.target.parentElement.parentElement.parentElement
        else if(e.target.tagName == 'SPAN') parentrow = e.target.parentElement.parentElement
        parentrow.classList.toggle('active');
        
    });
});

// show more or less displayed products on the table
document.querySelector('.overall .rightsection .stock .display .viewmore').addEventListener('click', function(e){
    // toggle the active class and display the suitable title
    this.classList.toggle('active');
    if(this.classList.contains('active')) this.title = 'show less';
    else this.title = 'show more';

    // set the overflow to auto to let the user scroll down 
    let table = document.querySelector('.overall .rightsection .stock .display .table');
    let tableHeader = document.querySelector('.overall .rightsection .stock .display .tableheader');
    table.classList.toggle('active');
    tableHeader.classList.toggle('active');
});

// show and hide the tableheader tools list 
document.querySelector('.overall .rightsection .stock .display .tableheader >div:last-of-type').addEventListener('click', function(e){
    this.children[1].classList.toggle('active');
    this.children[2].classList.toggle('active');
});

/*handle the input's label on blur and focus events (we can't handle this event yet because the inputs does not exist yet 
so we have first to watch for any changes on the nodes or document hirarchy so we can know when inputs are added)*/
const observer = new MutationObserver(function(mutationList, mutationObserver){

    if(mutationList['0'].target.classList.contains('active')){

        Array.from(mutationList['0'].target.lastElementChild.children[1].children).forEach(element => {

            if(!element.classList.contains('category')){

                element.firstElementChild.addEventListener('blur', function(e){

                    if(this.value !== ''){
                        this.nextElementSibling.style.top = '-15px';
                        this.nextElementSibling.style.fontWeight = 'bold';
                        this.nextElementSibling.style.fontSize = '12px';
                    }else{
                        this.nextElementSibling.style.top = '8px';
                        this.nextElementSibling.style.fontWeight = 'normal';
                        this.nextElementSibling.style.fontSize = '14px';
                    }
                });
                element.firstElementChild.addEventListener('focus', function(e){
                    this.nextElementSibling.style.top = '-15px';
                });          
            };
        });
    };

});
Array.from(document.querySelectorAll('.overall .rightsection .stock .display .row')).forEach(row => {
    observer.observe(row, {childList: true, subtree: true, attributes: true});
});

//show the addProduct Window
document.querySelector('.overall .rightsection .stock .display .options .otheroptions .add').addEventListener(
    'click', e => {
        let addProductWin = document.querySelector('.overall .rightsection .stock .addProduct');
        let rightSectionInterface = document.querySelector('.overall .rightsection');

        addProductWin.classList.add('active');
        rightSectionInterface.style.pointerEvents = 'none';
        addProductWin.style.pointerEvents = 'auto';
    }
);


//handling the addProducts inputs
document.querySelectorAll('.overall .rightsection .stock .addProduct .right .inputs div').forEach(div => {
    div.firstElementChild.addEventListener('blur', e => {
        if(e.target.value == ''){
            e.target.nextElementSibling.classList.remove('active');
        }else{
            if(e.target.type == 'number' && !e.target.value.includes('.') && e.target.id != 'qnt'){
                e.target.value = e.target.value + '.00';
            };
        };
    });
    div.firstElementChild.addEventListener('focus', e => {
        if(!e.target.nextElementSibling.classList.contains('active')){
            e.target.nextElementSibling.classList.add('active');
        };
    });
});

//close the addProduct window
document.querySelector('.overall .rightsection .stock .addProduct .right .header .close i').addEventListener('click', e => {

    //delcare variables
    let inputs = document.querySelectorAll('.overall .rightsection .stock .addProduct .right .inputs div');
    let photoBtn = document.querySelector('.overall .rightsection .stock .addProduct .left .other .actions i.photoButton');
    let emptyTheGallery = document.querySelector('.overall .rightsection .stock .addProduct .left .other .actions i.deleteImages');
    let galleryimg = document.querySelector('.overall .rightsection .stock .addProduct .left .gallery img');
    let addProductWin = document.querySelector('.overall .rightsection .stock .addProduct');
    let rightSection = document.querySelector('.overall .rightsection');


    //empty all the inputs field and remove active class from label
    inputs.forEach(div => {
        div.firstElementChild.value = '';
        if(div.lastElementChild.classList.contains('active')){
            div.lastElementChild.classList.remove('active');
        };
    });

    //empty the gallery if there are images
    if(galleryimg.classList.contains('active')) emptyTheGallery.click();

    //turn off the camera if it's on
    if(photoBtn.classList.contains('active')) photoBtn.dispatchEvent(new MouseEvent('dblclick'));

    //close the window
    addProductWin.classList.remove('active');

    //set the rightSection pointer-events to auto
    rightSection.style.pointerEvents = 'auto'
});

////take a photo of a product using the pc cam
/*reequire user permission then provide the cam stream to the user by pass it as a video source to the video tag if 
promisse is fulfilld(permission is given) and if not we alert the error*/
//handling the turn off camera event to
let streaming;
document.querySelector('.overall .rightsection .stock .addProduct .left .other .actions i.photoButton').addEventListener(
    'dblclick', e => {
    
        if(e.target.classList.contains('active')){
            let capture = document.querySelector('.overall .rightsection .stock .addProduct .left .capture');
            capture.classList.remove('active');
            //declare variables
            let video = document.querySelector('.overall .rightsection .stock .addProduct .left .capture video');
            let img = document.querySelector('.overall .rightsection .stock .addProduct .left .capture img');
            let imgPlaceHolder = document.querySelector('.overall .rightsection .stock .addProduct .left .capture i');

            e.target.classList.remove('active');

            //stop the stream and hides video and img elements and display the img icon
            console.log(streaming.getTracks());
            streaming.getTracks()[0].stop();
            console.log(streaming.getTracks())
            streaming = null;

            video.classList.remove('active');
            video.srcObject = null;

            img.setAttribute('src', '');
            img.classList.remove('active');

            imgPlaceHolder.style.display = 'inline-block';
            imgPlaceHolder.parentElement.style.paddingTop = '32px';
            imgPlaceHolder.parentElement.title = 'Add an image';

        };
    }
);
document.querySelector('.overall .rightsection .stock .addProduct .left .other .actions i.photoButton').addEventListener(
    'click', e => {
        if(!e.target.classList.contains('active')){
            let capture = document.querySelector('.overall .rightsection .stock .addProduct .left .capture');
            capture.classList.add('active');        
            navigator.mediaDevices.getUserMedia({video: true, audio:false}).then(stream =>{
                e.target.classList.add('active');
                streaming = stream;
            
                let video = document.querySelector('.overall .rightsection .stock .addProduct .left .capture video');
                video.srcObject = stream;
                video.play();
            }).catch(err => alert(err));
        };
    }
);

//waiting for the video to start playback before we display it because it may take a while before the video stream start to flow
document.querySelector('.overall .rightsection .stock .addProduct .left .capture video').addEventListener('canplay', e =>{
    e.target.parentElement.style.paddingTop = '0';
    e.target.parentElement.title = 'take a photo';
    e.target.classList.add('active');
    e.target.previousElementSibling.style.display = 'none';

    let photo = document.querySelector('.overall .rightsection .stock .addProduct .left .capture img');
    if(photo.classList.contains('active')) photo.classList.remove('active');
});

//handling the click event on capture element
document.querySelector('.overall .rightsection .stock .addProduct .left .capture').addEventListener('click', e => {
    
    // it means the user is using a camera
    if(e.target.classList.contains('active')){
        //declare variables
        let video = document.querySelector('.overall .rightsection .stock .addProduct .left .capture video');
        let canvas = document.querySelector('.overall .rightsection .stock .addProduct .left .capture canvas');
        let photo = document.querySelector('.overall .rightsection .stock .addProduct .left .capture img');
        let gallery = document.querySelector('.overall .rightsection .stock .addProduct .left .gallery');
        let galleryImgCounter = document.querySelector('.overall .rightsection .stock .addProduct .left .other .imagesCount span');
        let imgArray = [...gallery.children];

        //if the gallery is already full we alert the user
        let checkingArray = [];
        imgArray.forEach(img =>{
            if(img.getAttribute('src') == '') checkingArray.push(true);
            else checkingArray.push(false);
        });
    
        if(checkingArray.includes(true)){
            //draw an image in canvas wich is basically a video frame 
            let context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, 300,150);
            
            //converting the canvas graphic to an image and display it
            let data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);

            //add the image to the gallery and increases the img counter
            for(let i = 0; i < imgArray.length; i++){
                if(imgArray[i].getAttribute('src') == ''){
                    imgArray[i].setAttribute('src', data);
                    imgArray[i].classList.add('active');
                    galleryImgCounter.textContent = `${i+1}/3`;
                    break;
                };
            };
            //handle classes
            video.classList.remove('active');
            photo.classList.add('active');
        }else{
            alert('you can add just 3 photos');
        };
     //the user is choosing from the storage 'dialog box'
    }else{
        e.currentTarget.children[3].click();
    };
});

//handling the files choosing from the dialog box
document.querySelector('.overall .rightsection .stock .addProduct .left .capture input').addEventListener('change', e => {
    if(!e.target.files[0].type.includes('image')) alert('file selected must be of type image')
    else{
        let galleryImg = [...document.querySelectorAll('.overall .rightsection .stock .addProduct .left .gallery img:not(.active)')];
        let imgCounter = document.querySelector('.overall .rightsection .stock .addProduct .left .other .imagesCount span');

        for(let i = 0; i < galleryImg.length; i++){

            if(galleryImg[i].getAttribute('src') == ''){

                galleryImg[i].setAttribute('src', e.target.files[0].path);
                galleryImg[i].classList.add('active');

                //increase the counter
                imgCounter.textContent = Number(imgCounter.textContent.split('/')[0]) + 1 + '/3';
                break;

            };
        };
    };
});

//delete the gallery's photos
document.querySelector('.overall .rightsection .stock .addProduct .left .other .actions i.deleteImages').addEventListener('click', e => {

    //delcaring variables
    let captureImg = document.querySelector('.overall .rightsection .stock .addProduct .left .capture img');
    let galleryPhotos = [...document.querySelector('.overall .rightsection .stock .addProduct .left .gallery').children];
    let imagesCounter = document.querySelector('.overall .rightsection .stock .addProduct .left .other .imagesCount span');

    // delete images
    galleryPhotos.forEach(photo => {
        if(photo.classList.contains('active') && photo.getAttribute('src') != ''){
            photo.classList.remove('active');
            photo.setAttribute('src', '');
        };
    });
    
    //hide the last displayed image
    if(captureImg.classList.contains('active')) captureImg.classList.remove('active');
    captureImg.parentElement.children[1].classList.add('active');

    //reset the counter to zero
    imagesCounter.textContent = '0/3'
    
});

//display the gallery images
document.querySelector('.overall .rightsection .stock .addProduct .left .other .actions i.viewImages').addEventListener('click', e => {

    //declare variables
    let diapo = document.querySelector('.overall .rightsection .stock .addProduct .diapo');
    let gallery = document.querySelector('.overall .rightsection .stock .addProduct .left .gallery')

    //check if there is at least one image to be displayed
    if(gallery.children[0].getAttribute('src') != '' && gallery.children[0].classList.contains('active')){

        //display the diapo window
        diapo.classList.add('active');

        //display the first photo in the gallery
        diapo.children[1].setAttribute('src', gallery.children[0].getAttribute('src'));

        //show the overlay
        document.querySelector('.rightsection .overlay').classList.add('active');

    }else{
        alert('There is no image to be displayed');
    }; 
});

//change the displayed image in the diapo when the user click next and previous btn and hide the user on exit event
document.querySelector('.overall .rightsection .stock .addProduct .diapo').addEventListener('click', e => {

    //previous image
    if(e.target.parentElement.classList.contains('previous')){

        //declaring usable variables
        let displayedImg = document.querySelector('.overall .rightsection .stock .addProduct .diapo img');
        let galleryImgs = [...document.querySelector('.overall .rightsection .stock .addProduct .left .gallery').children];

        //display the previous img if the displayed img is not the first one
        galleryImgs.forEach((img, index, array) => {
            if(img.getAttribute('src') ==  displayedImg.getAttribute('src') && index > 0){
                console.log(index);
                displayedImg.setAttribute('src', galleryImgs[index - 1].getAttribute('src'));
            };
        });

     //next image   
    }else if(e.target.parentElement.classList.contains('next') && e.target.title != 'close'){
        //declaring usable variables
        let displayedImg = document.querySelector('.overall .rightsection .stock .addProduct .diapo img');
        let galleryImgs = [...document.querySelector('.overall .rightsection .stock .addProduct .left .gallery').children];

        //display the next img if the displayed img is not the last
        for(let i=0; i < galleryImgs.length - 1; i++){
            if(galleryImgs[i].getAttribute('src') ==  displayedImg.getAttribute('src') && galleryImgs[i + 1].classList.contains('active')){
                displayedImg.setAttribute('src', galleryImgs[i + 1].getAttribute('src'));
                break;
            };
        };
     //close the diapo window   
    }else if(e.target.tagName == 'I' && e.target.title == 'close'){
        e.currentTarget.children[1].setAttribute('src', '');
        e.currentTarget.classList.remove('active');
        document.querySelector('.rightsection .overlay').classList.remove('active');
    };
});


/*********************************************************** checkOut *********************************************/

// show other info about the product button
document.querySelector('.overall .rightsection .checkout .left .tableheader .otherinfo').onclick = function(e){
    if(this.firstElementChild.classList.contains('fa-arrow-circle-right')){
        this.firstElementChild.classList.replace('fa-arrow-circle-right', 'fa-arrow-circle-left');
    }else{
        this.firstElementChild.classList.replace('fa-arrow-circle-left', 'fa-arrow-circle-right');
    }
    Array.from(this.parentElement.children).forEach((element, index, array) =>{
        if(index > 2 && index < array.length-1){
            element.classList.toggle('hidden');
        };
    });
    document.querySelectorAll('.overall .rightsection .checkout .left .table .row').forEach(element =>{
        Array.from(element.children).forEach((element, index, array)=>{
            if(index > 2){
                element.classList.toggle('hidden');
            };
        });
    });
};

// search settings
document.querySelector('.overall .rightsection .checkout .left .search .settings').addEventListener('click', function(e){
    this.parentElement.classList.toggle('active');
    Array.from(this.parentElement.children).forEach(child => {
        child.classList.toggle('active');
    });
});

// change the searching type
document.querySelectorAll('.overall .rightsection .checkout .left .search div .track').forEach((span,index,array)=> {
    span.addEventListener('click', e => {
        if(!span.classList.contains('active')){
            array.forEach(elem => elem.classList.remove('active'));
            span.classList.add('active');
            let searchinput = document.querySelector('.overall .rightsection .checkout .left .search input');
            if(span.parentElement.classList.contains('searchbyname')){
                searchinput.setAttribute('placeholder', 'Search a product by name...');
            }else{
                searchinput.setAttribute('placeholder', 'Search a product by selling price...');
            }
        };
    });
});

// able the table's inputs and disabled once the user focus on something else
document.querySelectorAll('.overall .rightsection .checkout .left .table .row').forEach(row => {

    
    row.addEventListener('dblclick', e =>{
        
        Array.from(row.children).forEach(input =>{
            if(input.hasAttribute('disabled')){
                input.addEventListener('keydown', e => {
                    if(e.keyCode != 37 && e.keyCode != 39) e.preventDefault();
                });
                input.removeAttribute('disabled');  
            }else{
                input.setAttribute('disabled', 'disabled');
                row.removeEventListener('hover', e => e.preventDefault());
            }
        });
        e.target.focus();

    });
});

// set the tableheader width to be equale to row's width
/*function setWidth (){
    let rowWidth = document.querySelector('.overall .rightsection .checkout .left .table .row').clientWidth;
    document.querySelector('.overall .rightsection .checkout .left .tableheader').style.width = rowWidth;
};
setWidth();*/

//payment info show and hide
document.querySelector('.overall .rightsection .checkout .right .paybutton').addEventListener('click', e=>{
    document.querySelector('.overall .rightsection .checkout .right .paymentinfo').style.display = 'block';
});
document.querySelector('.overall .rightsection .checkout .right .paymentinfo .right .close').addEventListener('click',function(){
    if(this.parentElement.parentElement.classList.contains('active')) this.parentElement.parentElement.classList.remove('active');
    this.parentElement.parentElement.style.display = 'none';
});

//payment info show the inputs for modifing process
document.querySelector('.overall .rightsection .checkout .right .paymentinfo .buttons .modify').addEventListener('click',function(){
    this.parentElement.parentElement.parentElement.classList.toggle('active')
})

// payment info inputs 
document.querySelectorAll('.overall .rightsection .checkout .right .paymentinfo input').forEach(input => {

    input.addEventListener('focus', (e)=>{
        if(!input.classList.contains('active')){
            input.previousElementSibling.classList.add('active');
        }
    });
    input.addEventListener('blur', (e)=>{
        if(input.value.length == 0){
            input.previousElementSibling.classList.remove('active');
        }
        
    });
});