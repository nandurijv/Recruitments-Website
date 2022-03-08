// GETTING THE REQUIRED HTML ELEMENTS

const checkBtn = document.getElementById("checkBtn");
checkBtn.addEventListener("click", validate);

const input = document.getElementById("regnum");

// DEFINING FUNCTIONS

// INPUT VALIDATION
function validate() {
  let regex = /[21]{1}[a-z]{3}[0-9]{4}/;
  if (input.value.trim().toLowerCase().match(regex)) {
    showResult();
  } else {
    let overlay = document.getElementsByClassName("overlay")[0];
    console.log(overlay);
    overlay.style.display = "block";
    var timeleft = 2;
      var downloadTimer = setInterval(function(){
        let timer = document.getElementsByClassName("timer")[0];
        if(timeleft <= 0){
          clearInterval(downloadTimer);
        }
        timer.innerHTML = `${timeleft+1}`;
        timeleft -= 1;
      }, 1000);
      var hide = setTimeout(()=>{
        let overlay = document.getElementsByClassName("overlay")[0];
      overlay.style.display="none";location.reload();},4000);
    }
    
    
}

// SHOWING RESULT
function showResult() {
  const regnum = input.value.trim().toLowerCase();
  const xhtp = new XMLHttpRequest();
  xhtp.open("GET", "RECRUITMENT_2022.json", true);
  xhtp.onload = function () {
    if (this.status === 200) {
      let obj = JSON.parse(this.responseText);
      let flag = 0;
      for (key in obj) {
        if (obj[key]["RG NO."].trim().toLowerCase() == regnum) {
          flag = 1;
          break;
        } else {
          continue;
        }
      }

      // MAIN LOGIC
      if (flag == 0) {
        console.log("REG NUMBER NOT FOUND");
        const resultSection = document.getElementById("result-2");
        resultSection.style.display = "block";
        const homeSection = document.getElementById("home");
        homeSection.style.display = "none";
      } else {
        console.log("REG. NUMBER FOUND");
        let studName = document.getElementById("studName");
        studName.innerHTML = `${obj[key]["NAME"]} !<br>`;
        let desc = document.getElementById("description");
        desc.innerHTML = `<br><br><span class="desc1">We are delighted to have you<br> on-board with us in the<br>${obj[key]["DOMAIN"]}</b> domain.</span><br><br>`;
        const homeSection = document.getElementById("home");
        homeSection.style.display = "none";
        const resultSection = document.getElementById("result");
        resultSection.style.display = "block";
      }
    } else {
      console.log("ERROR!");
    }
  };
  xhtp.send();
}

// back button
let btn = document.getElementsByClassName("backBtn");
console.log(btn);
Array.from(btn).forEach(function(element){
  element.addEventListener("click",()=>{
    console.log("Back!");
    location.reload();
});}
);