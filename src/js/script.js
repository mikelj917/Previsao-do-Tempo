const cityTitle = document.getElementById("title");
const tempValue = document.getElementById("temp_value");
const tempDescription = document.getElementById("temp_description");
const tempImg = document.getElementById("temp_img");
const tempMax = document.getElementById("temp_max");
const tempMin = document.getElementById("temp_min");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const search = document.getElementById("search").addEventListener("submit", async (event) => {
    event.preventDefault();

    const cityName = document.getElementById("city_name").value;
    if(!cityName) {
        document.getElementById("weather").classList.remove("show");
        return showAlert(`
            Você precisa digitar uma cidade...
            <img src="src/img/unsearch.svg"/>
        `)
    } else {
        showAlert(null);
    };

    const apiKey = "5ee62d32175bf6c2ad910c8185cc161d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await fetch(apiUrl);
    const json = await response.json();

    if(json.cod === 200) {
        updateInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            humidity: json.main.humidity,
            wind: json.wind.speed,
        });
    } else {
        showAlert(`
            Não foi possivel localizar...
            <img src="src/img/404.svg"/>
        `);
        document.getElementById("weather").classList.remove("show");
    }
});

function updateInfos(json) {
    showAlert(null);
    document.getElementById("weather").classList.add("show");

    cityTitle.innerHTML = `${json.city}, ${json.country}`;
    tempValue.innerHTML = `${json.temp.toFixed(1).toString().replace(".", ",")} <sup>C°</sup>`;
    tempMax.innerHTML= `${json.tempMax.toFixed(1).toString().replace(".", ",")} <sup>C°</sup>`;
    tempMin.innerHTML = `${json.tempMin.toFixed(1).toString().replace(".", ",")} <sup>C°</sup>`;
    tempDescription.innerHTML = `${json.description}`;
    tempImg.setAttribute("src", `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    humidity.innerHTML = `${json.humidity}%`;
    wind.innerHTML = `${json.wind} km/h`;
}

function showAlert(message) {
    document.getElementById("alert").innerHTML = message;
};