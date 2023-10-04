import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import Sidebar from "@layouts/partials/Sidebar";
import dateFormat from "@lib/utils/dateFormat";
import { FaRegCalendar } from "react-icons/fa";
import { categoriesData, homeData, advertisementsData, postsByCategoryData } from "lib/getServerData";
import urls from "@config/urls";
import "swiper/css";
import "swiper/css/autoplay";

const { blog_folder, pagination } = config.settings;

const Home = ({ posts, featuredPosts, postsTotalCount, categories, advertisements, politic, economy, sport, science }) => {
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
          <Swiper spaceBetween={0} slidesPerView={1} loop={true} autoplay={{ delay: 30000 }} modules={[Autoplay]}>
            {featuredPosts &&
              featuredPosts.map((post) => (
                <SwiperSlide key={post.attributes.slug}>
                  <div className="row flex-wrap-reverse justify-center lg:flex-row">
                    <div className={"mt-12 text-center lg:col-4 lg:mt-0 lg:text-right"}>
                      <div className="banner-title pt-4">
                        <h1 className="text-xl underline text-secondary">{post.attributes.title}</h1>
                        <span>{post.attributes.content?.substring(0, 260)}...</span>
                      </div>
                      <p className="mt-4">من التصنيف: {post.attributes.category.data.attributes.name}</p>

                      <Link className="btn btn-primary mt-6" href={"/posts/" + post.attributes.slug} rel="">
                        قراءة المزيد
                      </Link>
                    </div>
                    {post?.attributes?.feature_image?.data?.attributes?.url && (
                      <div className="col-9 lg:col-8">
                        <ImageFallback
                          className="mx-auto mb-4 h-full w-full border-4 border-double border-primary object-cover"
                          src={urls.backendUrl + post.attributes.feature_image.data.attributes.url}
                          alt={post?.attributes?.feature_image.data?.attributes?.alternativeText}
                          width={548}
                          height={443}
                          priority={true}
                        />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>

      {/* Home main */}
      <section className="section">
        <div className="container">
          <div className="row items-start">
            <div className="mb-12 lg:col-8 lg:mb-0">
              {/* Featured posts */}
              <div className="section">
                <h2 className="section-title">أخبار هامة</h2>
                <div className="rounded border border-border p-6 dark:border-darkmode-border">
                  <div className="row">
                    <div className="md:col-6">
                      <Post post={featuredPosts[0].attributes} />
                    </div>
                    <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                      {featuredPosts.slice(1, 4).map((post, i, arr) => (
                        <div
                          className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 && "border-b border-border dark:border-darkmode-border"}`}
                          key={`key-${i}`}
                        >
                          {post.attributes.feature_image?.data?.attributes?.url && (
                            <ImageFallback
                              className="me-3 h-[85px] object-cover border-secondary border-l-4"
                              src={urls.backendUrl + post.attributes.feature_image.data.attributes.url}
                              alt={post.attributes.feature_image.data.attributes.alternativeText}
                              width={105}
                              height={85}
                            />
                          )}
                          <div>
                            <h3 className="h5 mb-2">
                              <Link href={`/${blog_folder}/${post.attributes.slug}`} className="block hover:text-primary">
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
              <Swiper spaceBetween={0} slidesPerView={1} loop={true} autoplay={{ delay: 30000 }} modules={[Autoplay]}>
                {advertisements &&
                  advertisements.map((ad) => (
                    <SwiperSlide key={ad.id}>
                      <a className="section block pt-0" href={ad.attributes.link} rel="noreferrer" target="_blank">
                        <ImageFallback
                          className="h-60 w-full object-cover object-top"
                          src={`${urls.backendUrl}${ad.attributes.media.data.attributes.url}`}
                          alt={ad?.attributes?.media.data?.attributes?.alternativeText}
                          height="115"
                          width="800"
                        />
                      </a>
                    </SwiperSlide>
                  ))}
              </Swiper>

              {/* Recent Posts */}
              <div className="section pt-0">
                <h2 className="section-title">آخر الأخبار</h2>
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

              <Pagination totalPages={Math.ceil(postsTotalCount / pagination)} currentPage={1} />
            </div>
            {/* sidebar */}
            {<Sidebar className={"lg:mt-[9.5rem]"} posts={posts} featuredPosts={featuredPosts} categories={categories} />}
          </div>

          {/* categories */}
          <div className="flex flex-wrap gap-16 mt-16">
            <div className="grow basis-96">
              <h2 className="section-title">الأخبار السياسية</h2>
              <div className="rounded border border-border p-6 dark:border-darkmode-border">
                <div className="row min-height-520">
                  <div className="md:col-6">
                    <Post post={politic[0].attributes} />
                  </div>
                  <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                    {politic.slice(1, 4).map((post, i, arr) => (
                      <div
                        className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 && "border-b border-border dark:border-darkmode-border"}`}
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
                            <Link href={`/${blog_folder}/${post.attributes.slug}`} className="block hover:text-primary">
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
            <div className="grow basis-96">
              <h2 className="section-title">الأخبار الرياضية</h2>
              <div className="rounded border border-border p-6 dark:border-darkmode-border">
                <div className="row min-height-520">
                  <div className="md:col-6">
                    <Post post={sport[0].attributes} />
                  </div>
                  <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                    {sport.slice(1, 4).map((post, i, arr) => (
                      <div
                        className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 && "border-b border-border dark:border-darkmode-border"}`}
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
                            <Link href={`/${blog_folder}/${post.attributes.slug}`} className="block hover:text-primary">
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
            <div className="grow basis-96">
              <h2 className="section-title">الأخبار الاقتصادية</h2>
              <div className="rounded border border-border p-6 dark:border-darkmode-border">
                <div className="row min-height-520">
                  <div className="md:col-6">
                    <Post post={economy[0].attributes} />
                  </div>
                  <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                    {economy.slice(1, 4).map((post, i, arr) => (
                      <div
                        className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 && "border-b border-border dark:border-darkmode-border"}`}
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
                            <Link href={`/${blog_folder}/${post.attributes.slug}`} className="block hover:text-primary">
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

            <div className="grow basis-96">
              <h2 className="section-title">الأخبار العلمية</h2>
              <div className="rounded border border-border p-6 dark:border-darkmode-border">
                <div className="row min-height-520">
                  <div className="md:col-6">
                    <Post post={science[0].attributes} />
                  </div>
                  <div className="scrollbar-w-[10px] mt-8 max-h-[480px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border md:col-6 dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-theme-dark md:mt-0">
                    {science.slice(1, 4).map((post, i, arr) => (
                      <div
                        className={`mb-6 flex items-center pb-6 ${i !== arr.length - 1 && "border-b border-border dark:border-darkmode-border"}`}
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
                            <Link href={`/${blog_folder}/${post.attributes.slug}`} className="block hover:text-primary">
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
          </div>
        </div>
      </section>
    </Base>
  );
};

export default Home;

// for homepage data
export const getStaticProps = async () => {
  const homeDataResponse = await homeData(pagination);
  const categoriesResponse = await categoriesData();
  const advertisementsResponse = await advertisementsData();
  const politicResponse = await postsByCategoryData(4, "politic");
  const economyResponse = await postsByCategoryData(4, "economy");
  const scienceResponse = await postsByCategoryData(4, "science");
  const sportResponse = await postsByCategoryData(4, "sports");

  return {
    props: {
      posts: homeDataResponse.data.allposts.data,
      featuredPosts: homeDataResponse.data.featuredposts.data,
      postsTotalCount: homeDataResponse.data.paginationInfo.meta.pagination.total,
      categories: categoriesResponse.data.categories.data,
      advertisements: advertisementsResponse.data.advertisements.data,
      politic: politicResponse.data.posts.data,
      economy: economyResponse.data.posts.data,
      science: scienceResponse.data.posts.data,
      sport: sportResponse.data.posts.data
    }
  };
};
