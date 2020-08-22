"use strict"

// menu

const menu = document.querySelector(".menu");
const menuButton = document.querySelector(".menu__button");
const menuList = document.querySelector(".menu__list");

menu.classList.remove("menu--no-js");

menuButton.addEventListener("click", () => {

  let expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !expanded);
  menuButton.classList.toggle("menu__button--open");
  menuList.classList.toggle("menu__list--close");

});


// modal

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const orderButton = document.querySelector(".order-button");
const sizeButton = document.querySelector("#small");
const closeButton = document.querySelector(".modal__button");

orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("modal--show");
  overlay.classList.add("overlay--show");
  sizeButton.focus();
});

overlay.addEventListener("click", () => {
  modal.classList.remove("modal--show");
  overlay.classList.remove("overlay--show");
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    if (modal.classList.contains("modal--show")) {
      e.preventDefault();
      modal.classList.remove("modal--show");
      overlay.classList.remove("overlay--show");
    }
  }
});

// map

const coordinates = { lat: 59.938635, lng: 30.323118 };
const markerImage = "../img/icon-map-pin.svg";

function initMap() {

  let map = new google.maps.Map(document.querySelector(".map__api"), {
    center: coordinates,
    zoom: 17
  });

  let marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: markerImage,
    animation: google.maps.Animation.DROP
  });
}
