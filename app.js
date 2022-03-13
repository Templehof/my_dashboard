const footer = document.getElementById("footer");
const cryptoBlock = document.getElementById("crypto");

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}
setInterval(getCurrentTime, 1000);

function renderFooter(descritpion, author) {
  footer.innerHTML += `<p class="footer"> ${descritpion} </p> <p class="footer"> Photo by: ${author} </p> `;
}

async function getCoverPic() {
  try {
    const response = await fetch(
      "https://api.unsplash.com/search/photos?page=1&query=ukraine&client_id=id2vj5XJv7XGG7qvbzyicX6zkyjRC1LKwxW4qisQruo"
    );
    const data = await response.json();
    const image = data.results[Math.floor(Math.random() * 9)];
    document.body.style.backgroundImage = `url(${image.urls.regular})`;

    renderFooter(image.alt_description, image.user.name);
  } catch {
    document.body.style.backgroundColor = "black";
  }
}
getCoverPic();

async function getCrypto() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin"
    );
    const data = await response.json();
    renderCrypto(
      data.name,
      data.market_data.current_price.usd,
      data.market_data.price_change_24h,
      data.image.large
    );
  } catch {
    cryptoBlock.innerHTML = `
        <h3 class="cryptoName" > The moon probably </h3>
        `;
  }
}

getCrypto();

function renderCrypto(name, price, change, pic) {
  cryptoBlock.innerHTML = `
    <img class="cryptoPic" src= ${pic} />
    <h3 class="cryptoName" > ${name} </h3>
    <p class="price"> 🎯: $${price} </p>
    <p class="price"> 24h: ${change} </p>
    `;
}

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=680f0928b9fce2ef703717450a1dbe06`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error("weather not available");
      }
      return response.json();
    })
    .then((data) => {
      renderWeather(data.weather[0].icon, data.main.temp, data.name);
    })
    .catch((err) => console.error(err));
});

function renderWeather(icon, temp, city) {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById("weather").innerHTML = `
        <img src= ${iconUrl} />
        <h3 id="temperature"> ${temp}°C </h3>
        <h4 id="city"> ${city} </h4>
    
    `;
}
