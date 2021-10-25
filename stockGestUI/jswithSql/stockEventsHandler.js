/************************************************************ stock  *******************************************/
/**************handling events and front-end back-end communication *********************************/
// advanced search 
document.querySelectorAll('.overall .rightsection .stock .search >div').forEach(div =>{

    if(div.firstElementChild.tagName == 'INPUT'){

        if(div.firstElementChild.type == 'date'){
            div.firstElementChild.addEventListener('keypress', e => e.preventDefault());
            div.firstElementChild.addEventListener('change', e => {
                if(e.target.value == ''){

                }
                else{
                    let [inputedDay,inputedMonth, inputedYear] = e.target.value.split('-').reverse();
                    let date = new Date();
                    if(Number(inputedDay) > 0 && Number(inputedMonth) > 0 && Number(inputedYear) >= date.getFullYear()){
                        document.querySelectorAll('.overall .rightsection .stock .display .table .row').forEach(row => {
                            [...row.children].forEach(child => {

                                if(child.className == 'expirationDate'){

                                    let [year, month, day] = child.textContent.split('-');
                                    if(Number(year) != inputedYear){
                                        child.parentElement.classList.add(`notSearchedBy${child.className}`);
                                    }else if(Number(year) == inputedYear && child.parentElement.classList.contains(`notSearchedBy${child.className}`)){
                                        child.parentElement.classList.remove(`notSearchedBy${child.className}`);
                                    };
                                };
                            });
                        });
                    };
                };
            });
        }else{
            div.firstElementChild.addEventListener('keyup', function(e){   
                
                if(this.value == ' '){
                    this.value = '';
                }else{
                    let searchValue = this.value;
                    document.querySelectorAll('.overall .rightsection .stock .display .table .row').forEach(row => {
                            [...row.children].forEach(child => {
                            if(child.className == this.id){
                                if(e.key != 'Backspace'){

                                    if(!child.textContent.toLocaleLowerCase().includes(searchValue)){
                                        child.parentElement.classList.add(`notSearchedBy${child.className}`);
                                    }else{
                                        if(child.parentElement.classList.contains(`notSearchedBy${child.className}`)){
                                            child.parentElement.classList.remove(`notSearchedBy${child.className}`);
                                        };
                                    }
                                }else{
                                    if(child.parentElement.classList.contains(`notSearchedBy${child.className}`) && child.textContent.toLocaleLowerCase().includes(searchValue)){
                                        child.parentElement.classList.remove(`notSearchedBy${child.className}`);
                                    }
    
                                }
    
                            }
                        });
                    });
                };
            });
            //listening to key hold 'prevent user from duplicating an escape key'
            div.firstElementChild.addEventListener('keydown', e =>{
            
                if(e.keyCode == 32 && e.target.value == '  '){
                    e.preventDefault();
                    e.target.value = '';
                };
            });
        };   
    }else if(div.firstElementChild.tagName == 'SELECT'){
        div.firstElementChild.addEventListener('change', e => {
            document.querySelectorAll('.overall .rightsection .stock .display .table .row').forEach(row => {
                if(row.dataset.category !== e.target.value) row.classList.add('notSearchedBycategory');
                if(row.dataset.category == e.target.value && row.classList.contains('notSearchedBycategory')){
                    row.classList.remove('notSearchedBycategory');
                };
                if(e.target.value == 'all' && row.classList.contains('notSearchedBycategory')) row.classList.remove('notSearchedBycategory');
            });
        });
    };
});

//simple search
document.querySelector('.overall .rightsection .stock .display .options .searchinput input').addEventListener('keyup', e =>{
    
    document.querySelectorAll('.overall .rightsection .stock .display .table .row').forEach(row => {
        [...row.children].forEach(child => {
            if(isNaN(e.target.value)){
                if(child.classList.contains('productName')){
                    if(e.key != 'Backspace'){
                        if(!child.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())){
                            child.parentElement.classList.add(`notSearchedByproductName`);
                        };
                    }else{
                        if(child.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) && 
                        child.parentElement.classList.contains('notSearchedByproductName')){
                            child.parentElement.classList.remove('notSearchedByproductName');
                        };
                    };
                };
            }else{
                if(child.classList.contains('sellingPrice')){
                    if(e.key != 'Backspace'){
                        if(!child.textContent.includes(e.target.value)){
                            child.parentElement.classList.add(`notSearchedBysellingPrice`);
                        };
                    }else{
                        if(child.textContent.includes(e.target.value) && child.parentElement.classList.contains('notSearchedBysellingPrice')){
                            child.parentElement.classList.remove('notSearchedBysellingPrice');
                        };
                    };
                };
            };
        });
        
    }); 
});

// delete a product from the stock (delete's button click event handling)
document.querySelector('.overall .rightsection .stock .display .options .otheroptions .delete').addEventListener('click', function(e){
    let products = document.querySelector('.overall .rightsection .stock .display .table');

    //check if the stock is not emty (there's at least a product to delete)
    if(products.childElementCount > 0){
        
        //check if the user selected at least one product
        let checkedProducts = [];
        [...products.children].forEach(row => {

            if(row.childElementCount > 0){
                if(!row.firstElementChild.firstElementChild.checked) checkedProducts.push('false')
                else checkedProducts.push('true');
            };
        });
        if(checkedProducts.includes('true')){
            checkedProducts = []; // empty the checkArray for later use 
            [...products.children].forEach(row => {
                if(row.childElementCount > 0){
                    if(row.firstElementChild.firstElementChild.checked) row.remove();
                };
            });

        }else{
            checkedProducts = []; // empty the checkArray for later use
             alert('No product has been selected');
        }
    }else{
        alert('Stock is empty');
    }
})

//add a product to the stock 'send an add request to the mainProcess(back-end)'
document.querySelector('.overall .rightsection .stock .addProduct .right .footer button').addEventListener(
    'click', e =>{

        //delcare variables
        let galleryImages = [...document.querySelectorAll('.overall .rightsection .stock .addProduct .left .gallery img')];
        let inputsDiv = document.querySelectorAll('.overall .rightsection .stock .addProduct .right .inputs div')
        let collector = {};

        //start collect the data of the new product in one object 'collector'
        //first collect images if exist
        let imagesCollector = [];
        console.log(galleryImages[0].classList);
        galleryImages.forEach(image =>{
            if(image.classList.contains('active') && image.getAttribute('src') != ''){
                imagesCollector.push(image.getAttribute('src'));
            };
        });
        //collect product's data
        let dataCollector = {};
        let isProductNameEmpty = [];
        [...inputsDiv].forEach((div,index) =>{
            if(div.firstElementChild.tagName == 'INPUT'){
                // productName must be entered
                if(index == 0 && div.firstElementChild.value == ''){
                    isProductNameEmpty.push(true);
                    dataCollector[div.firstElementChild.id] = div.firstElementChild.value;
                };
                //start gathering the data
                if(!div.classList.contains('discountPrice') && div.firstElementChild.value ==''){
                    dataCollector[div.firstElementChild.id] = 
                    div.previousElementSibling.firstElementChild.value;
                    
                }else{
                    dataCollector[div.firstElementChild.id] = div.firstElementChild.value; 
                };
            }else{
                if(div.firstElementChild.value == ''){
                    dataCollector[div.firstElementChild.id] == 'all';
                }else{dataCollector[div.firstElementChild.id] == div.firstElementChild.value;}
            };
        });

        //check if the productName is empty or not to do something based on that
        if(isProductNameEmpty.includes(true)) alert('Product name must be entered')
        else{
            collector.images = imagesCollector;
            collector.productData = dataCollector;
            console.log(collector);
           
        };

    }

);
/************************************************************************************************** 
 * *************************************************************************************************
**************************************** Custom function *******************************************/

//Add a new product to the stock
function addProduct({imagesCollector,dataCollector}){

    //create the row div
    let rowDiv = createE('div');
    rowDiv.className = 'row';

    //create row children
    for(let i = 0; i < 10; i++){
        switch (i) {
            case 0:
                //create select div
                let divElem = createE('div');
                divElem.className = 'select';
                //create checkbox
                let inputElem = createE('input');
                inputElem.setAttribute('type', 'checkbox');
                //append checkbox child to div
                concatNodesTypes(divElem, inputElem);
                //append select div to rowdiv
                concatNodesTypes(rowDiv, divElem)
                break;

            case 8:
                //create tools div
                let divElem = createE('div');
                divElem.className = 'tools';
                //create tools div children
                let spanElem = createE('span');
                let iconElem = createE('i');
                iconElem.className = 'fas fa-sort-down';
                concatNodesTypes(spanElem, iconElem);
                //append children to tools div
                concatNodesTypes(divElem, spanElem);
                //append tools div to rowDiv
                concatNodesTypes(rowDiv, divElem);
                break;
            case 9:
                
            default:
                break;
        }
    }
}

//create elements and textNodes
function createE(element){
    return document.createElement(element);
};
function createT(text){
    return document.createTextNode(text);
};
function concatNodesTypes(element,nodeType){
    element.appendChild(nodeType);
};

