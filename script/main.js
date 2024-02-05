var temp1 = document.getElementById("temperature1");
var precip1 = document.getElementById("precip1");
var humidity1 = document.getElementById("humidity1");
var Name1 = document.getElementById("name1");
var temp2 = document.getElementById("temperature2");
var precip2 = document.getElementById("precip2");
var humidity2 = document.getElementById("humidity2");
var Name2 = document.getElementById("name2");
var temp3 = document.getElementById("temperature3");
var precip3 = document.getElementById("precip3");
var humidity3 = document.getElementById("humidity3");
var Name3 = document.getElementById("name3");
var temp4 = document.getElementById("temperature4");
var precip4 = document.getElementById("precip4");
var humidity4 = document.getElementById("humidity4");
var Name4 = document.getElementById("name4");

//var button = document.querySelector('#get-joke');
//location button to test with

const findMe = () => {

    const status = document.querySelector(".status");

    //runs if user allows
    const success = (position) => {
        console.log(position);

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        //log coordinates for testing
        console.log("lat: " + latitude + " long: " + longitude);
        gridPoints(latitude, longitude);
    }
    //runs if user denies
    const error = () => {
        status.textContent = "denied";
    }
    //asks user y/n to allow access, gets location
    navigator.geolocation.getCurrentPosition(success, error);
    //gridPoints(latitude, longitude);
}//end function
document.querySelector(".find").addEventListener("click", findMe);
//button.addEventListener('click', ButtonClick);
//gridPoints();
function gridPoints(lat,lon) {
    //VARIABLES
    var ajaxRequest = new XMLHttpRequest;
    var url = `https://api.weather.gov/points/${lat},${lon}`
    var runAsyncronously = true;

    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = JokeCallback;

    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}//end function

function JokeCallback() {
    //STATUSES
    //200: "OK"
    //403: "Forbidden"
    //404: "Page not found"

    //READY STATES
    //0      The request is not initialized
    //1      The request has been set up
    //2      The request has been sent
    //3      The request is in process
    //4      The request is complete

    //MAKE CERTAIN RESPONSE IS OK AND READY  
    if (this.status === 200 && this.readyState === 4) {
        //DEBUG
        console.log(this.responseText);

        //PARSE THE STRING BACK INTO AN OBJECT
        var data = JSON.parse(this.responseText);
        console.log(data.properties.gridId, data.properties.gridX, data.properties.gridY,);
        var office = data.properties.gridId;
        var xGrid = data.properties.gridX;
        var yGrid = data.properties.gridY;
        //console.log(data.periods.temperature);
        ButtonClick(office,xGrid,yGrid);
        //SHOW JOKE ON HTML PAGE
        //jokeDIV.innerHTML = `${(data)}`
         
    } else {
        console.log("Ready State -> " + this.readyState);

        if (this.status !== 200) {
            this.onerror = OnError();
        } //    
    }//end if
}//end function

function OnError() {
    temp.textContent = 'There was an error getting your joke (this is not a joke)!';
}//end functon 


//ButtonClick();
function ButtonClick(office,xGrid, yGrid) {
    //VARIABLES
    var ajaxRequest = new XMLHttpRequest;
    var url = `https://api.weather.gov/gridpoints/${office}/${xGrid},${yGrid}/forecast`
    var runAsyncronously = true;

    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = Callback;

    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}//end function

function Callback() {
    //STATUSES
    //200: "OK"
    //403: "Forbidden"
    //404: "Page not found"

    //READY STATES
    //0      The request is not initialized
    //1      The request has been set up
    //2      The request has been sent
    //3      The request is in process
    //4      The request is complete

    //MAKE CERTAIN RESPONSE IS OK AND READY  
    if (this.status === 200 && this.readyState === 4) {
        //DEBUG
        console.log(this.responseText);

        //PARSE THE STRING BACK INTO AN OBJECT
        var data = JSON.parse(this.responseText);
        console.log(data.properties.periods[0].name);
        //SHOW JOKE ON HTML PAGE
        temp1.innerHTML = `${(data.properties.periods[0].temperature)}`
        precip1.innerHTML = `${(data.properties.periods[0].probabilityOfPrecipitation.value)}`
        humidity1.innerHTML = `${(data.properties.periods[0].relativeHumidity.value)}`
        Name1.innerHTML = `${(data.properties.periods[0].name)}`
            //console.log(`${(data.properties.periods[0].name)}`)      
        
        temp2.innerHTML = `${(data.properties.periods[1].temperature)}`
        precip2.innerHTML = `${(data.properties.periods[1].probabilityOfPrecipitation.value)}`
        humidity2.innerHTML = `${(data.properties.periods[1].relativeHumidity.value)}`
        Name2.innerHTML = `${(data.properties.periods[1].name)}`
     // console.log(data.periods.temperature);
    } else {
        console.log("Ready State -> " + this.readyState);
        
        if (this.status !== 200) {
            this.onerror = OnError();
        } //    
    }//end if
}//end function

function OnError() {
    temp.textContent = 'There was an error getting your joke (this is not a joke)!';
}//end functon