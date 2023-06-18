import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Pagination from "@layouts/components/Pagination";
import Post from "@partials/Post";
import { postsByPageData, postsCountData } from "@lib/getServerData";

// blog pagination
const BlogPagination = ({ posts, currentPage, totalPages }) => {

  return (
    <Base title={config.title}>
      <section className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">{config.title}</h1>
          <div className="row mb-16">
            {posts.map((post, i) => (
              <div className="mt-16 lg:col-6" key={post.attributes.slug}>
                <Post post={post.attributes} />
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </section>
    </Base>
  );
};

export default BlogPagination;

// get blog pagination slug
export const getStaticPaths = async () => {
  const countResult = await postsCountData();
  const { pagination } = config.settings;
  const totalPages = Math.ceil(countResult.data.posts.meta.pagination.total / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString()
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

// get blog pagination content
export const getStaticProps = async ({ params }) => {
  const { pagination } = config.settings;

  // read the post by slug
  const currentPage = parseInt((params && params.slug) || 1);
  const postsResult = await postsByPageData(pagination, currentPage);

  // get total post count
  const countResult = await postsCountData();
  const totalPages = Math.ceil(countResult.data.posts.meta.pagination.total / pagination);

  // return the result
  return {
    props: {
      pagination: pagination,
      posts: postsResult.data.posts.data,
      currentPage: currentPage,
      totalPages
    },
  };
};
