import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Sidebar from "@layouts/partials/Sidebar";
import { categoriesData, postsByTaxonoimiesData, postsByTaxonomiesData, postsData, taxonomiesData } from "@lib/getServerData";
import Post from "@partials/Post";

const { pagination } = config.settings;

// category page
const Category = ({ postsByTaxonoimies, taxonomyTitle, posts, categories }) => {
  return (
    <Base title={taxonomyTitle}>
      <div className="section mt-16">
        <div className="container">
          <h1 className="h2 mb-12">
            عرض المقالات الحاوية على الوسم: 
            <span className="section-title ms-1 inline-block capitalize">
              {taxonomyTitle}
            </span>
          </h1>
          <div className="row">
            <div className="lg:col-8">
              <div className="row rounded border border-border p-4 px-3 dark:border-darkmode-border lg:p-6">
                {postsByTaxonoimies.map((post, i) => (
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
  const taxonomiesResponse = await taxonomiesData();
  const paths = taxonomiesResponse.data.taxonomies.data.map((tax) => ({
    params: {
      slug: tax.attributes.slug,
    },
  }));
  return { paths, fallback: false };
};

// category page data
export const getStaticProps = async ({ params }) => {
  const postsResponse = await postsData(pagination);
  const postsByTaxonoimiesResponse = await postsByTaxonomiesData(pagination, "", [params.slug]);
  console.dir(postsByTaxonoimiesResponse, {depth: null});
  const taxonomiesResponse = await taxonomiesData();
  const categoriesResponse = await categoriesData();
  const taxonomyTitle = taxonomiesResponse.data.taxonomies.data.filter(tax => tax.attributes.slug === params.slug).map(tax => tax.attributes.name)[0];
  return {
    props: {
      posts: postsResponse.data.posts.data,
      postsByTaxonoimies: postsByTaxonoimiesResponse.data.posts.data,
      taxonomyTitle,
      categories: categoriesResponse.data.categories.data
    },
  };
};
