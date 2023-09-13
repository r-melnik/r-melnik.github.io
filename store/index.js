export const state = () => ({
  data: {
    projects: [],
    researchers: [],
    quotes: [],
    proceedings: [],
    journals: [],
    books: [],
    news: [],
    alumni: [],
    authors: [],
    gallery: [],
    members: [],
    opportunities: [],
    menu: [],
    pages: {}
  },
  isReady: false
});
export const getters = {
  getPage: (state) => (path, subPath = undefined) => {
    const parent = (state.data.menu.find((parent) => {
      if (parent && parent.routes) {
        if (parent.routes.find((route) => (route.path === path) || route.children && route.children.find(child => child.path === path))) {
          return parent;
        }
      }
    })) ?? {
      routes: [],
    };
    const active_index = parent.routes.findIndex(
      (route) => (route.path === path) || route.children && route.children.find(child => child.path === path)
    );
    const index = subPath ?? path
    console.log(state.data.pages[index])
    return {
      page: state.data.pages[index],
      active_index,
      parent,
      seo: {
        title: state.data.pages[index]["seo"]["title"],
        meta: [
          {
            hid: "description",
            name: "description",
            content: state.data.pages[index]["seo"]["description"],
          },
        ],
        link: [
          {
            rel: "canonical",
            href: state.data.pages[index]["seo"]["link"],
          },
        ],
      }
    }
  },
  getProjectSEO: (state) => (id) => {
    const project = state.data.projects.find((project) => project.id === id);
    const projectPage = state.data.pages["/research/projects"];
    let title = projectPage["seo"]["title"]
    let content = projectPage["seo"]["description"]
    let href = projectPage["seo"]["link"]
    if (project) {
      title = project["title"] + " | " + title
      content = project["description"]
      href += "/" + project["id"]
    }
    return {
      title,
      meta: [
        {
          hid: "description",
          name: "description",
          content,
        },
      ],
      link: [
        {
          rel: "canonical",
          href,
        },
      ],
    };
  },
  getDateStatus: (state) => (inputDate) => {
    // Convert the input date to a Date object
    const date = new Date(inputDate);

    // Get the current date
    const currentDate = new Date();

    // Compare the input date with the current date
    if (date < currentDate) {
      return "Past";
    } else if (date > currentDate) {
      return "Future";
    } else {
      return "Present";
    }
  },
  formatDateRange: (state) => (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    if (end) {
      if (start.toDateString() === end.toDateString()) {
        // If both dates are the same
        return start.toLocaleDateString(undefined, options);
      } else {
        // If different dates
        return `${start.toLocaleDateString(undefined, options)} - ${end.toLocaleDateString(undefined, options)}`;
      }
    } else {
      // If no endDate provided
      return start.toLocaleDateString(undefined, options);
    }
  },
  parseKey: (state) => (key) => {
    return key.replace(/[^\w-]+/g, '_')
      .replace(/^\d+/g, '')
      .toLowerCase()
  },

}

export const mutations = {
  setData(state, data) {
    state.data = data;
    state.isReady = true;
  },
};
export const actions = {
  async getData({ getters, commit }) {
    const journals = await this.$axios.$get("/data/journals.json");
    const proceedings = await this.$axios.$get("/data/proceedings.json");
    const books = await this.$axios.$get("/data/books.json");
    const projects = await this.$axios.$get("/data/projects.json");
    const researchers = await this.$axios.$get("/data/researchers.json");
    const news = await this.$axios.$get("/data/news.json");
    const alumni = await this.$axios.$get("/data/alumni.json");
    const authors = await this.$axios.$get("/data/authors.json");
    const gallery = await this.$axios.$get("/data/gallery.json");
    const members = await this.$axios.$get("/data/members.json");
    const menu = await this.$axios.$get("/data/menu.json");
    const pages = await this.$axios.$get("/data/pages.json");
    const layout = await this.$axios.$get("/data/layout.json");
    commit("setData", {
      journals,
      researchers,
      projects,
      members,
      gallery,
      books,
      authors,
      alumni: alumni.sort((a, b) => parseInt(b.year) - parseInt(a.year)),
      proceedings,
      news: news.sort((a, b) => new Date(b.date) - new Date(a.date)).map(news => ({
        ...news,
        datetime: getters.formatDateRange(news.date, news.endDate)
      })),
      pages,
      menu,
      layout,
      publications: [...journals, ...proceedings, ...books].map((publication) => {
        const authorsStr = publication.authors
          .map((author, index) => {
            const authorObj = authors.find(
              (a) => a.id === author
            );
            const isLast = index === publication.authors.length - 1;
            const isFirst = index === 0;
            const preFix = isFirst ? "" : isLast ? " and " : ", ";
            if (authorObj) {
              if (authorObj.custom_field) {
                return preFix + authorObj.custom_field;
              } else {
                const initial =
                  authorObj.first_name === 1 ||
                    (authorObj.first_name.length > 2 &&
                      !authorObj.first_name.includes("."))
                    ? authorObj.first_name[0] + "."
                    : authorObj.first_name;
                return preFix + authorObj.last_name + ", " + initial;
              }
            }
          })
          .join("");
        return {
          ...publication,
          authors: authorsStr,
        };
      })
        .sort((a, b) => {
          if (parseInt(a.code) > parseInt(b.code)) {
            return 1;
          } else if (parseInt(a.code) < parseInt(b.code)) {
            return -1;
          } else {
            return 0;
          }
        }),
    })
  }
};
