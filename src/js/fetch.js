import template from "../templates/item.hbs";

export default {
  query: "",
  page: 1,
  perPage: 3,
  baseUrl: `https://api.pexels.com/v1`,

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },

  getFetch(val = this.query, z) {
    // let key = "563492ad6f91700001000001390f9fee0a794c1182a72e49e0e0eae2";
    let key = `563492ad6f917000010000013bbd01457a39431887d74f69015c0d48`;
    // полученное через параметры, значение из инпута сохраняет в свойство query через сеттер
    this.queryValue = val;

    // прописываем параметры запроса, согласно доков API
    // ДОБАВЛЯЕМ ПАРАМЕТР ДЛЯ СТРАНИЦ
    let params = `/search?query=${this.query}&per_page=${this.perPage}&page=${this.page}`;

    // сливаем встроку запроса перед отправкой
    let url = this.baseUrl + params;
    // создаем объект опций для запроса, по докам API, для передачи ключа
    let options = {
      method: "GET",
      headers: {
        Authorization: key,
      },
    };

    // собственно запрос и обработка ответа на него
    return fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.photos;
      })
      .then((result) => {
        const items = template(result);
        z.insertAdjacentHTML("beforeend", items);
        setTimeout(() => {
          window.scrollTo({
            top: z.scrollHeight,
            behavior: "smooth",
          });
        }, 0);
        return z;
      });
  },

  // метод добавления страницы
  setPage() {
    this.page += 1;
    console.log("page: ", this.page);
    return this.page;
  },
  // метод сброса страниц
  resetPage() {
    this.page = 1;
    console.log("reset page", this.page);
    return this.page;
  },
};
