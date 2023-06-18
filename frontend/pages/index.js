import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import { getListPage } from "@lib/contentParser";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { categoriesData, homeData } from "lib/getServerData";
import urls from "@config/urls"

const { blog_folder, pagination } = config.settings;

const Home = ({
  banner,
  posts,
  featuredPosts,
  postsTotalCount,
  categories,
  promotion,
}) => {
  // define state
  return (
    <Base>
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div className={banner.image_enable ? "mt-12 text-center lg:mt-0 lg:text-right lg:col-6" : "mt-12 text-center lg:mt-0 lg:text-right lg:col-12"}>
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-4")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-6"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Banner Image"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:mb-0 lg:col-8">
              {/* Featured posts */}
              <div className="section">
                <h2 className="section-title">أخبار هامة</h2>
                <div className="rounded border border-border p-6 dark:border-darkmode-border">
                  <div className="row">
                    <div className="md:col-6">
                      <Post post={featuredPosts[0].attributes} />
                    </div>
                    <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0 md:col-6">
                      {featuredPosts
                        .slice(1, featuredPosts.length)
                        .map((post, i, arr) => (
                          <div
                            className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 &&
                              "border-b border-border dark:border-darkmode-border"
                              }`}
                            key={`key-${i}`}
                          >
                            {post.attributes.feature_image?.data?.attributes?.url && (
                              <ImageFallback
                                className="me-3 h-[85px] rounded object-cover"
                                src={urls.backendUrl + post.attributes.feature_image.data.attributes.url}
                                alt={post.attributes.feature_image.data.attributes.alternativeText}
                                width={105}
                                height={85}
                              />
                            )}
                            <div>
                              <h3 className="h5 mb-2">
                                <Link
                                  href={`/${blog_folder}/${post.attributes.slug}`}
                                  className="block hover:text-primary"
                                >
                                  {post.attributes.title}
                                </Link>
                              </h3>
                              <p className="inline-flex items-center font-bold">
                                <FaRegCalendar className="me-1.5" />
                                {dateFormat(post.attributes.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Promotion */}
              {promotion.enable && (
                <Link href={promotion.link} className="section block pt-0">
                  <ImageFallback
                    className="h-full w-full"
                    height="115"
                    width="800"
                    src={promotion.image}
                    alt="promotion"
                  />
                </Link>
              )}

              {/* Recent Posts */}
              <div className="section pt-0">
                <h2 className="sectin-title">آخر الأخبار</h2>
                <div className="rounded border border-border px-6 pt-6 dark:border-darkmode-border">
                  <div className="row">
                    {posts.map((post) => (
                      <div className="mb-8 md:col-6" key={post.attributes.slug}>
                        <Post post={post.attributes} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Pagination
                totalPages={Math.ceil(postsTotalCount / pagination)}
                currentPage={1}
              />
            </div>
            {/* sidebar */}
            {<Sidebar
              className={"lg:mt-[9.5rem]"}
              posts={posts}
              categories={categories}
            />
            }
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, promotion } = frontmatter;
  const homeDataResponse = await homeData(pagination);
  const categoriesResponse = await categoriesData();

  return {
    props: {
      banner: banner,
      posts: homeDataResponse.data.allposts.data,
      featuredPosts: homeDataResponse.data.featuredposts.data,
      postsTotalCount: homeDataResponse.data.paginationInfo.meta.pagination.total,
      categories: categoriesResponse.data.categories.data,
      promotion
    },
  };
};
