
export const state = () => ({
  data: {
  },
  isReady: true
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
  getPublicationSEO: (state) => (shortcode) => {
    const publication = state.data.publications.find((publication) => publication.shortcode === shortcode);
    const publicationPage = state.data.pages["/research/publications"];
    let title = publicationPage["seo"]["title"]
    let content = publicationPage["seo"]["description"]
    let href = publicationPage["seo"]["link"]
    if (publication) {
      title = publication["shortcode"] + " | " + title
      content = publication["title"] + " | " + publication["authors"]
      href += "/" + publication["shortcode"]
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

    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    if (end) {
      if (start.toDateString() === end.toDateString()) {
        // If both dates are the same
        return start.toLocaleDateString('en-US', options); // Adjust 'en-US' to your desired time zone
      } else {
        // If different dates
        return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}`; // Adjust 'en-US' to your desired time zone
      }
    } else {
      // If no endDate provided
      return start.toLocaleDateString('en-US', options); // Adjust 'en-US' to your desired time zone
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
    console.log('set',data)

    state.data = {
      ...data,
      projects: data.projects.map((project) => {
        const subprojects = project.subprojects.map((subproject) => {
          const publications = (subproject.publications ?? [])
            .map((publicationId) => {
              const journal = data.journals.find(
                (publication) => publication.shortcode === publicationId
              );
              if (journal) {
                return journal;
              }
              const proceeding = data.proceedings.find(
                (publication) => publication.shortcode === publicationId
              );
              if (proceeding) {
                return proceeding;
              }
              const book = data.books.find(
                (publication) => publication.shortcode === publicationId
              );
              if (book) {
                return book;
              }
            })
            .sort((a, b) => {
              if (parseInt(a.code) > parseInt(b.code)) {
                return 1;
              } else if (parseInt(a.code) < parseInt(b.code)) {
                return -1;
              } else {
                return 0;
              }
            });
          return {
            ...subproject,
            publications,
          };
        });
        return {
          ...project,
          subprojects,
        };
      }),
      alumni: data.alumni.sort((a, b) => (b.year) - (a.year)),
      news: data.news.sort((a, b) => new Date(b.date) - new Date(a.date)).map(news => ({
        ...news,
        datetime: this.getters.formatDateRange(news.date, news.endDate)
      })),
      publications: [...data.journals, ...data.proceedings, ...data.books].map((publication) => {
        const authorsStr = publication.authors
          .map((author, index) => {
            const authorObj = data.authors.find(
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
        })
    };
    console.log('set')
    state.isReady = true;
    console.log('set')
  },
};
export const actions = {
  async getData({ getters, commit }) {

    const path = (text) => `${this.$axios.defaults.baseURL}${text}`
    const fetchJson = async (url) => {
      const response = await fetch(url);
      return response.json();
    };

    const dataUrls = [
      "/data/journals.json",
      "/data/researchers.json",
      "/data/projects.json",
      "/data/members.json",
      "/data/gallery.json",
      "/data/books.json",
      "/data/authors.json",
      "/data/alumni.json",
      "/data/proceedings.json",
      "/data/news.json",
      "/data/pages.json",
      "/data/menu.json",
      "/data/layout.json",
    ];

    const fetchedData = await Promise.all(dataUrls.map((url) => fetchJson(path(url))));

    const [journals, researchers, projects, members, gallery, books, authors, alumni, proceedings, news, pages, menu, layout] = fetchedData;
    console.log('x', commit)
    commit("setData", {
      journals,
      researchers,
      projects,
      members,
      gallery,
      books,
      authors,
      alumni,
      proceedings,
      news,
      pages,
      menu,
      layout,
    })
  }
};
