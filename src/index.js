import css from "./css/styles.css";
// import libs from "./js/libs.js";
import asyncFetch from "./js/asyncFetch.js";
// import fetchObject from "./js/fetch.js";
import refs from "./js/refs.js";

// const { form, input, loadMoreBtn, gallery } = refs;

// ОБРАБАТЫВАЕМ ФОРМУ ЗАПРОСА
refs.form.addEventListener("submit", (e) => {
  e.preventDefault();
  // ЧИСТИМ ПОЛЕ ОТРИСОВКИ ДАННЫХ ПЕРЕД НОВЫМ ЗАПРОСОМ
  refs.gallery.innerHTML = "";
  // СБРАСЫВАЕМ ЗНАЧЕНИЕ СТРАНИЦ
  // fetchObject.resetPage();
  asyncFetch.resetPage();
  // console.log(e.target.elements.query.value);
  // сохраняем полученное от пользователя значение из инпута
  const inputValue = e.target.elements.query.value;
  // вызываем метод запроса и передаем значение из инпута и
  // ссылку на элемент html, куда нужно встраивать результат запроса
  // fetchObject.getFetch(inputValue, gallery);
  asyncFetch.getFetch(inputValue, refs.gallery);
  loadMoreBtn.classList.remove("isHiden");

  // ЧИСТИМ ИНПУТ
  refs.input.value = "";
});

// ОБРАБАТЫВАЕМ КНОПКУ ДОГРУЗКИ

refs.loadMoreBtn.addEventListener("click", () => {
  console.log(`ok`);
  // вызываем метод добавления страницы
  // fetchObject.setPage();
  asyncFetch.setPage();
  // // вызываем метод запроса и отрисовки
  // fetchObject.getFetch(undefined, gallery);
  asyncFetch.getFetch(undefined, refs.gallery);
});
