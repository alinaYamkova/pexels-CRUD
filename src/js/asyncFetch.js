import template from "../templates/item.hbs";

export default {
  query: "moon",
  page: 1,
  perPage: 3,
  baseUrl: `https://api.pexels.com/v1`,

  get queryValue() {
    return this.query;
  },
  set queryValue(val) {
    return (this.query = val);
  },

  async getFetch(val = this.query, z) {
    let key = `563492ad6f917000010000013bbd01457a39431887d74f69015c0d48`;
    this.queryValue = val;
    let params = `/search?query=${this.query}&per_page=${this.perPage}&page=${this.page}`;

    let url = this.baseUrl + params;
    let options = {
      method: "GET",
      headers: {
        Authorization: key,
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.photos;

    console.log(data);
    const items = template(data);
    z.insertAdjacentHTML("beforeend", items);

    window.scrollTo({
      top: z.scrollHeight,
      behavior: "smooth",
    });
    return z;
  },

  setPage() {
    this.page += 1;
    console.log("page: ", this.page);
    return this.page;
  },

  resetPage() {
    this.page = 1;
    console.log("reset page", this.page);
    return this.page;
  },
};