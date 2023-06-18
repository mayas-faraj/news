import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Sidebar from "@layouts/partials/Sidebar";
import { categoriesData, postsByCategoryData, postsData } from "@lib/getServerData";
import Post from "@partials/Post";

const { pagination } = config.settings;

// category page
const Category = ({ postsByCategory, categoryTitle, posts, categories }) => {
  return (
    <Base title={categoryTitle}>
      <div className="section mt-16">
        <div className="container">
          <h1 className="h2 mb-12">
            عرض المقالات للتصنيف: 
            <span className="section-title ms-1 inline-block capitalize">
              {categoryTitle}
            </span>
          </h1>
          <div className="row">
            <div className="lg:col-8">
              <div className="row rounded border border-border p-4 px-3 dark:border-darkmode-border lg:p-6">
                {postsByCategory.map((post, i) => (
                  <div key={post.attributes.slug} className="col-12 mb-8 sm:col-6">
                    <Post post={post.attributes} />
                  </div>
                ))}
              </div>
            </div>
            <Sidebar posts={posts} categories={categories} />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Category;

// category page routes
export const getStaticPaths = async () => {
  const categoriesResponse = await categoriesData();

  const paths = categoriesResponse.data.categories.data.map((category) => ({
    params: {
      slug: category.attributes.slug,
    },
  }));
  return { paths, fallback: false };
};

// category page data
export const getStaticProps = async ({ params }) => {
  const postsResponse = await postsData(pagination);
  const postsByCategoryResponse = await postsByCategoryData(pagination, params.slug);
  const categoriesResponse = await categoriesData();
  const categoryTitle = categoriesResponse.data.categories.data.filter(category => category.attributes.slug === params.slug).map(category => category.attributes.name)[0];
  return {
    props: {
      posts: postsResponse.data.posts.data,
      postsByCategory: postsByCategoryResponse.data.posts.data,
      categoryTitle,
      categories: categoriesResponse.data.categories.data
    },
  };
};
