var typed =new Typed('#element',{
    strings :[
        'Software Engineer',
        'Java Developer',
        'Frontend Developer',
        'Salesforce Learner'
    ],
    typeSpeed :60,
    backSpeed :40,
    loop:true
    // showCursor :false
});
const navbar =document.getElementById("navbar");

window.addEventListener("scroll",function(){
    if(window.scrollY >50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});