const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const infoTxt = inputPart.querySelector(".info-txt");
const inputField = inputPart.querySelector("input");
const searchButton = inputPart.querySelector("#searchButton");
const weatherPart = wrapper.querySelector(".weather-part");
const wIcon = weatherPart.querySelector("img");
const arrowBack = wrapper.querySelector("header i");

let api;

// fork form https://github.com/abdellatif-laghjaj 
//  his PI key also
// PLEASE PUT YOUR API KEY HERE
let apiKey = "b190a0605344cc4f3af08d0dd473dd25";

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

searchButton.addEventListener("click", () => {
  if (inputField.value != "") {
    requestApi(inputField.value);
  }
});

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong";
      infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  } else {
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { temp, feels_like, humidity } = info.main;

    updateWeatherIcon(id);

    weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
    weatherPart.querySelector(".weather").innerText = description;
    weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
    weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");
    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}

function updateWeatherIcon(id) {
  let iconSrc;

  if (id == 800) {
    iconSrc = "icons/clear.svg";
  } else if (id >= 200 && id <= 232) {
    iconSrc = "icons/storm.svg";
  } else if (id >= 600 && id <= 622) {
    iconSrc = "icons/snow.svg";
  } else if (id >= 701 && id <= 781) {
    iconSrc = "icons/haze.svg";
  } else if (id >= 801 && id <= 804) {
    iconSrc = "icons/cloud.svg";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    iconSrc = "icons/rain.svg";
  }

  wIcon.src = iconSrc;
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
