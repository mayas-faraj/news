import urls from "@config/urls";

export const fetchData= async (queryString) => {
    const result = await fetch(urls.backendApiUrl, {
        body: JSON.stringify({ query: queryString}),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await result.json();
    return data;
};

export const homeData = async (pageSize) => {
  return await fetchData(`
  {
    allposts: posts (pagination: {pageSize: ${pageSize}, page: 1}){
      data {
        attributes {
          title
          slug
          content
          createdAt
          user {
            data {
              attributes {
                fullname
              }
            }
          }
          taxonomies {
            data {
              attributes {
                name
                slug
              }
            }
          }
          feature_image {
            data {
              attributes {
                alternativeText
                url
                width
                height
              }
            }
          }
        }
      }
    }

    featuredposts: posts (filters: {is_featured: {eq: true}}) {
      data {
        attributes {
          title
          slug
          content
          createdAt
          category {
            data {
              attributes {
                name
              }
            }
          }
          user {
            data {
              attributes {
                fullname
              }
            }
          }
          taxonomies {
            data {
              attributes {
                name
                slug
              }
            }
          }
          feature_image {
            data {
              attributes {
                alternativeText
                url
                width
                height
              }
            }
          }
        }
      }
    }

    paginationInfo: posts {
      meta {
        pagination {
          total
        }
      }
    }
  }
  `);
};

export const postsCountData = async () => {
  return await fetchData(`
  {
    posts {
      meta {
        pagination {
          total
        }
      }
    }
  }
  `);
};

export const postsSlugData = async () => {
    return await fetchData(`
    {
        posts (pagination: {pageSize: 10000000}) {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `);
};

export const postsByPageData = async (pageSize, page) => {
  return await fetchData(`
  {
      posts (pagination: {pageSize: ${pageSize}, page: ${page}}){
        data {
          attributes {
            title
            slug
            content
            createdAt
            user {
              data {
                attributes {
                  fullname
                }
              }
            }
            taxonomies {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
            feature_image {
              data {
                attributes {
                  alternativeText
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);
};

export const postsByCategoryData = async (pageSize, category) => {
  return await fetchData(`
  {
      posts (pagination: { pageSize: ${pageSize} }, filters: { category: { slug: {eq: "${category}" } } } ) {
        data {
          attributes {
            title
            slug
            content
            createdAt
            user {
              data {
                attributes {
                  fullname
                }
              }
            }
            taxonomies {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
            feature_image {
              data {
                attributes {
                  alternativeText
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);
};

export const postsByTaxonomiesData = async (pageSize, postSlug, postTaxonomies) => {
  return await fetchData(`
  {
      posts (pagination: { pageSize: ${pageSize} }, filters: { slug: { ne: "${postSlug}"}, taxonomies: { slug: {in: [${postTaxonomies.map(tax => `"${tax}"`)}] } } }) {
        data {
          attributes {
            title
            slug
            content
            createdAt
            user {
              data {
                attributes {
                  fullname
                }
              }
            }
            taxonomies {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
            feature_image {
              data {
                attributes {
                  alternativeText
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);
};

export const postsData = async (pageSize) => {
    return await fetchData(`
    {
        posts (pagination: { pageSize: ${pageSize} }) {
          data {
            attributes {
              title
              slug
              createdAt
              user {
                data {
                  attributes {
                    fullname
                  }
                }
              }
              taxonomies {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              feature_image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    `);
};

export const postsFeaturedData = async () => {
  return await fetchData(`
  {
      posts  (filters: {is_featured: {eq: true}}) {
        data {
          attributes {
            title
            slug
            createdAt
            user {
              data {
                attributes {
                  fullname
                }
              }
            }
            taxonomies {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
            feature_image {
              data {
                attributes {
                  alternativeText
                  url
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `);
};

export const postData = async (slug) => {
    return await fetchData(`
    {
        posts (filters: {slug: {eq: "${slug}"}})  {
          data {
            attributes {
              title
              slug
              createdAt
              user {
                data {
                  attributes {
                    fullname
                  }
                }
              }
              taxonomies {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              feature_image {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                  }
                }
              }
              content
              reference
              media {
                data {
                  attributes {
                    alternativeText
                    url
                    width
                    height
                    mime
                  }
                }
              }
            }
          }
        }
      }
    `);
};

export const taxonomiesData = async () => {
  return fetchData(`
  {
    taxonomies {
      data {
        attributes {
          name
          slug
          posts {
            data {
             id
            }
          }
        }
      }
    }
  }
  `);
}

export const categoriesData = async () => {
  return fetchData(`
  {
    categories {
      data {
        attributes {
          name
          slug
          icon
        }
      }
    }
  }
  `);
}