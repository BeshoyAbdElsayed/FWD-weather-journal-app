/* Global Variables */

//open weather map api key
const apiKey = '38468d94afffeba2af4ded85465d1c23'; 

//api aption (units) = matric to get temprature in Celsius
const units = 'metric';

// Create a new date instance dynamically with JS
let d = new Date();
//as getMonth() method starts counting from 0 we will add 1
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//error element 
const error = document.getElementById('error');
//entry holder elements
const temp = document.getElementById('temp');
const data = document.getElementById('data');
const content = document.getElementById('content');

/* main code (click event) */

//add click event listener on the generate button
const btn = document.getElementById('generate');
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
    /* post data to the server to save it */
        .then(resData => {
            if(! resData) {
                return;
            }
            postData(resData.main.temp)
        })
    /* get the project data form the server */
        .then(resData => getData())
    /* update the UI */
        .then(projectData => updateUi(projectData));
});

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

/**
 * update the entry holder elemnts
 * @param {Object} projectData 
 */
const updateUi = projectData => {
    temp.innerHTML = projectData.tempratures[0] || '';
    date.innerHTML = projectData.dates[0] || '';
    content.innerHTML = projectData.userResponses[0] || '';
}

/* async functions */
/**
 * get the temprature associated with the zip code
 * @param {String} zip the zip code of a city
 * @returns {Number} temprature in Celsius 
 */
const getTemprature = async zip => {
    //construct the api url
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=${units}`;

    //fetch the api response
    const response = await fetch(url);
    try {
        const data = await response.json();
        if(data.cod !== 200) {
            error.innerHTML = 'Invalid ZIP code';
            throw 'Invalid ZIP code';
        }
        return data;
    } catch (error) {
        console.log(error);
    }
};

/**
 * post data to the server to be saved
 * @param {Number} temprature 
 * @returns {Object} an object indecate success {status: 'success'}
 */
const postData = async temprature => {
    //get the feelings input 
    const feelings = document.getElementById('feelings').value;
    //data object that will be passed in the post request's body
    const data = {
        temprature,
        date: newDate,
        userResponse: feelings
    };

    const response = await fetch('/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.log(error);
    }
};

/**
 * get the project data form the /all route
 * @returns {Object} projectData containg all the data
 */
const getData = async () => {
    const response = await fetch('/all');
    try {
        return await response.json(); 
    } catch (error) {
        console.log(error);
    }
};
 