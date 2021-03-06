const fetchWeather = (address = boston) => {
  const url = "/weather?address=" + address;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = ""
      } else {
        messageOne.textContent = "";
        messageTwo.textContent = data.location + "     " + data.forecast;
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  fetchWeather(location);
});
