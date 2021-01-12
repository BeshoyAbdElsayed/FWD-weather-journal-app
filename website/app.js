/* Global Variables */

//open weather map api key
const apiKey = '38468d94afffeba2af4ded85465d1c23'; 

//api aption (units) = matric to get temprature in Celsius
const units = 'metric';

// Create a new date instance dynamically with JS
let d = new Date();
//as getMonth() method starts counting from 0 we will add 1
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//error variable
const error = document.getElementById('error');

/* main code */
//get the generate button 
const btn = document.getElementById('generate');
//add click event listener on the button
btn.addEventListener('click', () => {
    //clear error element
    error.innerHTML = '';

    /* get the input values */
    const input = getInput();
    //exit if zip is empty
    if(input.zip === '') {
        error.innerHTML = 'Please enter a ZIP code';
        return;
    }
        
    /* get the weather data form OWM api */
    getTemprature(input.zip)
        .then(data => console.log(data))
        // .then(temprature => postData(temprature));
        
    
    /* post data to the server to save it */

    /* get the project data form the server */

    /* update the UI */

});

//zip: 94040

/* functions */

/**
 * get the value of the zip and feelings inputs
 * @returns {Object} object containing the zip and feelings values
 */
const getInput = () => {
    return {
        zip: document.getElementById('zip').value,
        feelings: document.getElementById('feelings').value
    }
};







/* async functions */

/**
 * get the temprature associated with the zip code
 * @param {String} zip the zip code of a city
 * @returns {Number} temprature in Celsius 
 */
const getTemprature = async zip => {
    //construct the url
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units}`;

    //fetch the api response
    const response = await fetch(url);

    try {
        const data = await response.json();

        if(data.cod !== 200) {
            error.innerHTML = 'Invalid ZIP code';
            throw 'Invalid ZIP code';
        }

        return data.main.temp;
    } catch (error) {
        console.log(error);
    }
};


// const postData = ()


 