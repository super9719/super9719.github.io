
// user log in event //////////////////////////////////
//display the log in window 
document.querySelector('.overall .rightsection .settings .settingslist .login').addEventListener('click', function(e){
    this.parentElement.classList.remove('active');
    document.querySelector('.overall .rightsection .loginwin').classList.add('active');
    document.querySelector('.overall .rightsection .overlay').classList.add('active');
});
//handling the log in win closing
document.querySelector('.overall .rightsection .loginwin .quit').addEventListener('click', function(e){
    this.parentElement.classList.remove('active');
    document.querySelector('.overall .rightsection .overlay').classList.remove('active');

});