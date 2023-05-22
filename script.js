const titre = document.querySelector(".dev");
titre.style.position = "absolute";
let topPos = 400;
let dir = -1;
let accueilDiv = document.querySelector("#sAccueil");
let animationId = null;

function hautBas() {
    if (topPos == 500) {
    dir = 1;
    } else if (topPos == 400) {
    dir = -1;
    }
  topPos += -2 * dir;
    titre.style.top = `${topPos}px`;
    animationId = requestAnimationFrame(hautBas);
}

function stopAnimation() {
    cancelAnimationFrame(animationId);
    topPos = 400;
    titre.style.top = `${topPos}px`;
}

accueilDiv.addEventListener('mouseenter', () => {
    animationId = requestAnimationFrame(hautBas);
});

accueilDiv.addEventListener('mouseleave', stopAnimation);

var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');

var body = document.getElementsByTagName('body')[0];



var dark_theme_class = 'dark';


btn1.addEventListener('click', function (){

    body.classList.remove(dark_theme_class);
})

btn2.addEventListener('click', function() {

    body.classList.add(dark_theme_class);

});
