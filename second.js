function getReq (){ //hämtar en request
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/list/all");
    req.addEventListener("load", parse);
    req.send();
}
getReq();

function parse(){ //parsar
    let parsed = JSON.parse(this.responseText);
    console.log(parsed);
    listRender(parsed);
}

function listRender(parsedData){ //renderar listan på alla rasar (inte subraser)
    let ul = document.querySelector("#dogBreedList");
    let breed;
    for(breed in parsedData.message){
        let li = document.createElement("li");
        li.textContent = breed;
        ul.appendChild(li);
        li.addEventListener("click", function(e){
            subBreedRender(e, parsedData);
            selectedDog(e);
        });
    }
}
 
function subBreedRender(e, parsedData){ //renderar endbart subreedsen när click eventet har körts
    for(let breed in parsedData.message){
        if (e.target.textContent === breed){
            let dog = parsedData.message[breed];
            let ul = document.querySelector("#subBreedList");
            ul.innerHTML = ""
            for(let subBreed in dog){
                let li = document.createElement("li");
                li.textContent = breed + "-" + dog[subBreed]; //bättre sätt att rendera?
                li.addEventListener("click", selectedDog);
                ul.appendChild(li);
            }
        }
    }
}
let dog;
function selectedDog (e){ 
    dog = e.target.textContent;
    renderBreedimg();
}

function getReqImg(){ //hämtar randdom bild på hund
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/image/random");
    req.addEventListener("load", parseImg);
    req.send();

    let button = document.querySelector("#reqButton");
    button.addEventListener("click", getReqImg);
}
getReqImg();

function renderBreedimg(){ //funktion somm hämtar specifik hund
    window.location.hash = "#" + dog; //fixa hash (hur får man hash att funka)
    console.log(dog);
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breed/"+ dog +"/images/random");
    req.addEventListener("load", parseImg);
    req.send();

    let button = document.querySelector("#reqButton");
    button.removeEventListener("click", getReqImg);
    button.addEventListener("click", renderBreedimg);
}


function parseImg(){ //parse img funktion
    let imgDiv = document.querySelector("#imgDiv");
    imgDiv.innerHTML = "";
    let parsedImg = JSON.parse(this.responseText);
    let img = document.createElement("img");

    console.log(parsedImg.message);

    img.setAttribute("src", parsedImg.message);
    imgDiv.appendChild(img);

    let text = JSON.stringify(parsedImg.message);
    displayImgBreed(text);
}

function displayImgBreed(breedUrl){ //displayar breednamnet under bilden 
    let array = [];
    array = breedUrl.split("/"); //splittar url vid varje slash för att hitta namnet på breeden

    let breedPtag = document.querySelector("#breedPtag");
    breedPtag.textContent = array[4]; //breednamnet på index 4
}

//reset everything
function returnTostart(){
    let ul = document.querySelector("#subBreedList");
    ul.innerHTML = ""
            //hur tar man bort hash??
    let button = document.querySelector("#reqButton");
    button.removeEventListener("click", renderBreedimg);
    button.addEventListener("click", getReqImg);
    getReqImg();
}
let home = document.querySelector("#homeButton");
home.addEventListener("click", returnTostart);