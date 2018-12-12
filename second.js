function getReq (){
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/list/all");
    req.addEventListener("load", parse);
    req.send();
}
getReq();

function parse(){
    let parsed = JSON.parse(this.responseText);
    console.log(parsed);
    render(parsed);
}

function render(parsedData){
    let ul = document.querySelector("#dogBreedList");
    let breed;
    for(breed in parsedData.message){
        let li = document.createElement("li");
        li.textContent = breed;
        ul.appendChild(li);
        li.addEventListener("click", function(e){
            renderBreed(e, parsedData);
           // selectedDog(e, parsedData); //???????????????????????hjälp
            renderBreedimg(e);
        });
    }
}

function renderBreed(e, parsedData){
    for(let breed in parsedData.message){
        if (e.target.textContent === breed){
            let dog = parsedData.message[breed];
            let ul = document.querySelector("#subBreedList");
            ul.innerHTML = ""
            for(let subBreed in dog){
                let li = document.createElement("li");
                li.textContent = breed + "-" + dog[subBreed]; //bättre sätt att rendera?
                li.addEventListener("click", renderBreedimg); // selecteddog function?
                ul.appendChild(li);
            }
        }
    }
}

function selectedDog (e, parsedData){

}

function getReqImg(){
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breeds/image/random");
    req.addEventListener("load", parseImg);
    req.send();

    let button = document.querySelector("#reqButton");
    button.addEventListener("click", getReqImg);
}
getReqImg();

function renderBreedimg(e){
    let dog = e.target.textContent;
    window.location.hash = "#" + dog;
    console.log(dog);
    let req = new XMLHttpRequest
    req.open("GET", "https://dog.ceo/api/breed/"+ dog +"/images/random");
    req.addEventListener("load", parseImg);
    req.send();

    let button = document.querySelector("#reqButton");
    button.removeEventListener("click", getReqImg); // funckare inte just nu; ställs inte om
    button.addEventListener("click", renderBreedimg);
}

function parseImg(){
    let imgDiv = document.querySelector("#imgDiv");
    imgDiv.innerHTML = "";
    let parsedImg = JSON.parse(this.responseText);
    let img = document.createElement("img");
    console.log(parsedImg.message)
    img.setAttribute("src", parsedImg.message);
    imgDiv.appendChild(img);

    let text = JSON.stringify(parsedImg.message);
    displayImgBreed(text);
}

function displayImgBreed(breedUrl){
    let array = [];
    array = breedUrl.split("/");

    let breedPtag = document.querySelector("#breedPtag");
    breedPtag.textContent = array[4];
}


//reset everything
function returnTostart(){
    let ul = document.querySelector("#subBreedList");
    ul.innerHTML = ""
    let button = document.querySelector("#reqButton");
    button.removeEventListener("click", renderBreedimg);
    button.addEventListener("click", getReqImg);

    getReqImg();
}
let home = document.querySelector("#homeButton");
home.addEventListener("click", returnTostart);