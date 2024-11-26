const apiKey = "eed71bbfb128c1a0c34a2502f0613301";

const searchbtn = document.querySelector("#searchbtn");
const searchInput = document.querySelector("#searchInput");
const temp = document.querySelector("#temperature");
const city = document.querySelector("#city");
const icon = document.querySelector("#icon");
const hum = document.querySelector("#humidity");
const logoutBtn = document.querySelector(".logout-btn");//เปลี่ยนหน้าไปยัง login.html

searchbtn.addEventListener("click", findWeather);
searchInput.addEventListener("keyup", enter);
logoutBtn.addEventListener("click", logout);//เปลี่ยนหน้าไปยัง login.html

// แสดงข้อมูลผู้ใช้ใน user-profile-container
document.addEventListener("DOMContentLoaded", () => {
  const userEmailElement = document.querySelector(".user-email");

  // ดึงข้อมูลจาก Local Storage
  const userEmail = localStorage.getItem("userEmail");

  // อัปเดตข้อมูลในหน้า
  if (userEmail) {
      userEmailElement.textContent = userEmail;
  } else {
      userEmailElement.textContent = "No email provided";
  }
});
function logout() {
  // เปลี่ยนหน้าไปยัง login.html
  window.location.href = "login.html";
}

function enter(event) {
    if(event.key == "Enter") {
        findWeather();
    }
}
function findWeather() {
    if(searchInput.value == "") {

    } else {
        const searchlink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + apiKey;
        httpRequestAsync(searchlink, theResponse);
    }
}
function theResponse(response) {
    const data = JSON.parse(response);
    city.innerHTML = data.name;
    icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon +  ".png";;
    temp.innerHTML = parseInt(data.main.temp - 273) + "°C";
    hum.innerHTML = data.main.humidity + "%";
}
function httpRequestAsync(url, callback) {
    const http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if(http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    }
    http.open("GET", url, true);
    http.send();
}