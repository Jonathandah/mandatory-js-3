//==================================================== start page ===========================================
let main = document.querySelector("main");
let parsedData;

function getAllBreeds(){
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/list/all");
    req.addEventListener("load", parse);
    req.send();
}
getAllBreeds();

function parse(){
    parsedData = JSON.parse(this.responseText);
    console.log(parsedData.message);
    renderText(parsedData.message);
 }

function renderText(data){
    console.log(data);
    let ul = document.querySelector("#dogBreedList");
    ul.innerHTML = "";
    for (let key in data){
        let li = document.createElement("li");
        li.textContent = key
        li.addEventListener("click", getSubBreed);
        ul.appendChild(li);
    }
}

function getRandomImg(){  
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/image/random");
    req.addEventListener("load", parseImg);
    req.send();
    let reqButton = document.querySelector("#reqButton");
    reqButton.addEventListener("click", getRandomImg);

}
getRandomImg();


function parseImg(){    // fucniton that can handle all type of JSON?
    let parsedData = JSON.parse(this.responseText);
    console.log(parsedData);
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
 
//==================================================== sub page ===========================================
let breed;
function getSubBreed(e){
    console.log(parsedData);
    console.log(parsedData.message);
    let ul = document.querySelector("#dogBreedList");
    ul.innerHTML = "";
    for (let breed in parsedData.message){
        let array = parsedData.message[breed];
        if (breed === e.target.textContent){
            for(let i in array){
                let li = document.createElement("li");
                li.textContent = array[i];
                ul.appendChild(li);
            }
        }
    }
    breed = e.target.textContent;
    let reqButton = document.querySelector("#reqButton");
    reqButton.removeEventListener("click", getRandomImg);
    reqButton.addEventListener("click", getSubBreedImg);
    getSubBreedImg();
}

function getSubBreedImg(){
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breed/" + breed +  "/images/random");
    req.addEventListener("load", parseImg);
    req.send();
}
