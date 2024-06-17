const t_study = document.getElementById("tab_study");
const t_action = document.getElementById("tab_action");
const t_others = document.getElementById("tab_others");
let tabs = [t_study, t_action, t_others];

const n_study = document.getElementById("news_study");
const n_action = document.getElementById("news_action");
const n_others = document.getElementById("news_others");
let news = [n_study, n_action, n_others];

let isChecked = t_study;

for(let i=0, len=tabs.length; i<len; i++){
    tabs[i].addEventListener("change", function(){
        for(let j=0; j<len; j++){
            news[j].classList.add("opacity");
            tabs[j].parentNode.classList.remove("selected");
        }
        news[i].classList.remove("opacity");
        tabs[i].parentNode.classList.add("selected");
        
    })
}








/*function scrollToID(id, margin){
    const to = document.getElementById(id);
    if(!to){
        console.log("IDが見つかりません");
        return;
    }

    if(!margin) margin = 0;
    window.scrollTo({
        top: to.offsetTop + margin,
        behavior: "smooth"
    });
}

const toWorks = document.getElementById("toWorks");
const toSkill = document.getElementById("toSkill");
const toAbout = document.getElementById("toAbout");
const toContact = document.getElementById("toContact");

console.log(toWorks);

toWorks.addEventListener("click", function(){
    console.log("クリックされました");
    scrollToID("toWorks");
});*/