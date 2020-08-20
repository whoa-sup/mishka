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

