

// get name of the day 
function dayName(num) {
    switch (num) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            day = "Invalid day";
    }
    return day;
}

// global
const row = document.getElementById("row");
const cityInput = document.getElementById("location")




async function getLocation() {
    try {
        navigator.geolocation.getCurrentPosition(async (res) => {
            const lat = res.coords.latitude;
            const lng = res.coords.longitude;
            let position = lat + ',' + lng
            await displayDegree(position)
        },
            (res) => {
                console.error(res);
            });
    } catch (err) {
        console.error(err.message ?? "Something went wrong");
    }
}

getLocation();

// function that get data from Api and update the HTML

async function displayDegree(input) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0485de67b1344d0da10193613241001&q=${input}&days=3&aqi=no&alerts=noz`);
        let data = await response.json()
        let dataPerDay = data.forecast.forecastday

        let cartona = ``
        for (let i = 0; i < dataPerDay.length; i++) {
            cartona += `
        <div class="col-md-4  bg-black text-white ">
        <div  class="d-flex justify-content-between  px-3 py-3 header shadow-lg">
          <h6 id="dayName">${dayName(new Date(dataPerDay[i].date).getDay())}</h6> <h6 class="d-none" id="today">Today</h6>
          <h6 id="date">${dataPerDay[i].date}</h6>
        </div>
        <div class="weather text-start">
          <h5 class="m-4 city">${data.location.name}</h5>
          <h3> <p id="degree1" class="d-inline-block">${dataPerDay[i].day.avgtemp_c}</p> &deg;C <img src="${dataPerDay[i].day.condition.icon}" width="80px" height="80px" alt="" id="icon1"></h3>
          <span class=" m-4" id="condition">${dataPerDay[i].day.condition.text}</span>
          <p class="m-4"><i class="fa-solid fa-umbrella fa-rotate-by fa-lg px-2" style="--fa-rotate-angle: 45deg;""></i><span id="humidity" class="">${dataPerDay[i].day.avghumidity}</span> %  <i class="fa-solid fa-wind ps-3 pe-2"></i><span id="wind">${dataPerDay[i].day.avgvis_km}</span> km/h</p>
        </div>
      </div>
        `
        }
        row.innerHTML = cartona;
    } catch (err) {
        console.error(err.message ?? "can't display degree Something went wrong");
    }
}



// auto complete city search 
cityInput.addEventListener("keyup", function (e) {
    displayDegree(e.target.value)
});








