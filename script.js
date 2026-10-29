const menuItems = [
  { name: "Libyan Couscous with Chicken", description: "A family-style Friday favourite", price: 1850 },
  { name: "Shorba Libia", description: "Tomato, herbs, and warming spices", price: 900 },
  { name: "M'battan", description: "Libyan stuffed potato slices", price: 1200 },
  { name: "Mint Tea", description: "A small pot to share", price: 400 },
  { name: "Baklava", description: "Flaky pastry with nuts and honey", price: 650 },
  { name: "Libyan Maqroud", description: "Date-filled semolina pastries", price: 550 }
];

function money(cents) {
  return "$" + (cents / 100).toFixed(2);
}

// Make one menu card for each item in the array.
const menuList = document.querySelector("#menu-list");
if (menuList) {
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    menuList.innerHTML += `<article class="menu-item">
      <div><h3>${item.name}</h3><p>${item.description}</p><span class="item-price">${money(item.price)}</span></div>
      <label>Qty <input aria-label="Quantity of ${item.name}" class="quantity" type="number" min="0" max="20" step="1" value="0" required></label>
    </article>`;
  }
}

const orderForm = document.querySelector("#order-form");
if (orderForm) {
  const receipt = document.querySelector("#receipt");
  const message = document.querySelector("#form-message");

  function calculateOrder() {
    const quantities = document.querySelectorAll(".quantity");
    let subtotal = 0;
    let receiptItems = "";

    for (let i = 0; i < quantities.length; i++) {
      const quantity = Number(quantities[i].value);
      if (quantity > 0) {
        const item = menuItems[i];
        const lineTotal = item.price * quantity;
        subtotal += lineTotal;
        receiptItems += `<div class="receipt-item"><span>${item.name}<small>${quantity} @ ${money(item.price)}</small></span><strong>${money(lineTotal)}</strong></div>`;
      }
    }

    const tax = Math.round(subtotal * 0.05);
    document.querySelector("#subtotal").textContent = money(subtotal);
    document.querySelector("#tax").textContent = money(tax);
    document.querySelector("#total").textContent = money(subtotal + tax);
    return { receiptItems, subtotal, tax };
  }

  orderForm.addEventListener("input", function () {
    receipt.hidden = true;
    message.textContent = "";
    if (orderForm.checkValidity()) calculateOrder();
  });

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const order = calculateOrder();
    if (order.receiptItems === "") {
      message.textContent = "Choose at least one dish first.";
      return;
    }
    message.textContent = "";
    receipt.innerHTML = `<h3>Your receipt</h3>${order.receiptItems}
      <div class="receipt-item"><span>Subtotal</span><strong>${money(order.subtotal)}</strong></div>
      <div class="receipt-item"><span>GST (5%)</span><strong>${money(order.tax)}</strong></div>
      <div class="receipt-item receipt-total"><span>TOTAL</span><strong>${money(order.subtotal + order.tax)}</strong></div>`;
    receipt.hidden = false;
  });
}

// One photo sheet holds the nine pictures after the first family-table photo.
const slides = ["25% 20%", "50% 20%", "75% 20%", "100% 20%", "0% 80%", "25% 80%", "50% 80%", "75% 80%", "100% 80%"];
const picture = document.querySelector("#carousel-picture");
if (picture) {
  let currentSlide = 0;
  let paused = false;
let slideTimer; 

function showSlide(number) {
  if (number > slides.length) number = 0;
  if (number < 0) number = slides.length;
  currentSlide = number;

  clearInterval(slideTimer);
  slideTimer = setInterval(function () {
    if (!paused) showSlide(currentSlide + 1);
  }, 4000);
    if (currentSlide === 0) {
      picture.style.backgroundImage = "url('assets/family-meal.png')";
      picture.style.backgroundSize = "cover";
      picture.style.backgroundPosition = "center";
      picture.setAttribute("aria-label", "Libyan family meal at Abdel’s Table");
    } else {
      picture.style.backgroundImage = "url('assets/libyan-gallery.png')";
      picture.style.backgroundSize = "500% auto";
      picture.style.backgroundPosition = slides[currentSlide - 1];
      picture.setAttribute("aria-label", "Restaurant picture " + currentSlide + " of 10");
    }
  }

  document.querySelector("#previous-slide").addEventListener("click", function () { showSlide(currentSlide - 1); });
  document.querySelector("#next-slide").addEventListener("click", function () { showSlide(currentSlide + 1); });
  document.querySelector("#pause-carousel").addEventListener("click", function (event) {
    paused = !paused;
    event.target.textContent = paused ? "Resume slideshow" : "Pause slideshow";
  });
  showSlide(0);
 
}

document.querySelector("#year").textContent = new Date().getFullYear();
const clock = document.querySelector("#clock");
function updateClock() {
  clock.textContent = "Calgary time: " + new Date().toLocaleTimeString("en-CA", { timeZone: "America/Edmonton", hour: "numeric", minute: "2-digit" });
}
updateClock();
setInterval(updateClock, 60000);

// Open-Meteo provides current Calgary weather without an API key.
const weather = document.querySelector("#weather");
fetch("https://api.open-meteo.com/v1/forecast?latitude=51.0447&longitude=-114.0719&current=temperature_2m,weather_code&temperature_unit=celsius&timezone=America%2FEdmonton")
  .then(function (response) { return response.json(); })
  .then(function (data) {
    const code = data.current.weather_code;
    let condition = "Cloudy";
    if (code === 0) condition = "Clear";
    else if (code === 45 || code === 48) condition = "Fog";
    else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = "Rain";
    else if (code >= 71 && code <= 86) condition = "Snow";
    else if (code >= 95) condition = "Storm";
    weather.textContent = "Calgary weather: " + Math.round(data.current.temperature_2m) + "°C · " + condition;
  })
  .catch(function () { weather.textContent = "Calgary weather: unavailable right now"; });
