let main = document.querySelector("main");


function getReq(){
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/list/all");
    req.addEventListener("load", parse);
    req.send();
}
getReq();

function parse(){
    let parsedData = JSON.parse(this.responseText);
    console.log(parsedData.message);
    renderText(parsedData.message);
 }

function renderText(data){
    let ul = document.querySelector("#dogBreedList");
    for (let key in data){
        let li = document.createElement("li");
        li.textContent = key
        ul.appendChild(li);
    }
}





function getRandomImg(){  
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breed/hound/images/random");
    req.addEventListener("load", parseImg);
    req.send();
}
getRandomImg();
let reqButton = document.querySelector("#reqButton");
reqButton.addEventListener("click", getRandomImg);

function parseImg(){    // fucniton that can handle all type of JSON?
   let parsedData = JSON.parse(this.responseText);
    renderImg(parsedData.message);
}

function renderImg (imgData){
    let checkImg = document.querySelector("img");
    if (checkImg){
        main.removeChild(checkImg);
    }
    let img = document.createElement("img");
    img.setAttribute("src", imgData);
    main.appendChild(img);
}
