import config from "@config/config.json";
import PostSingle from "@layouts/PostSingle";
import { categoriesData, postData, postsByPageData, postsByTaxonomiesData, postsSlugData } from "@lib/getServerData";

// post single layout
const Article = ({
  slug,
  post,
  relatedPosts,
  posts,
  categories
}) => {
  return (
    <PostSingle
      slug={slug}
      post={post.attributes}
      categories={categories}
      relatedPosts={relatedPosts}
      posts={posts}
    />
  );
};

// get post single slug
export const getStaticPaths = async () => {
  const postsSlugResult = await postsSlugData();

  const paths = postsSlugResult.data.posts.data.map((item) => ({
    params: {
      slug: item.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const pagination = config.settings.pagination;

  // get posts
  const postResult = await postData(slug);
  const taxonomies = postResult.data.posts.data[0].attributes.taxonomies.data.map(tax => tax.attributes.name);

  // get relataed and latest posts
  const lastestPostsResponse = await postsByPageData(pagination, 1);
  const relatedPosts = await postsByTaxonomiesData(pagination, slug, taxonomies);
  
  //all categories
  const categoriesResponse = await categoriesData();

  // read post content
  return {
    props: {
      slug: slug,
      post: postResult.data.posts.data[0],
      relatedPosts: relatedPosts.data.posts.data,
      posts: lastestPostsResponse.data.posts.data,
      categories: categoriesResponse.data.categories.data,
    },
  };
};

export default Article;
