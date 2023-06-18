import config from "@config/config.json";
import Base from "@layouts/Baseof";
import InnerPagination from "@layouts/components/InnerPagination";
import dateFormat from "@lib/utils/dateFormat";
import { markdownify } from "@lib/utils/textConverter";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import Post from "./partials/Post";
import Sidebar from "./partials/Sidebar";
import shortcodes from "./shortcodes/all";
import urls from "@config/urls"
import ImageFallback from "./components/ImageFallback";


const { meta_author } = config.metadata;

const PostSingle = ({
  slug,
  post,
  posts,
  relatedPosts,
  categories,
}) => {
  console.dir(post.user.data, {depth: null});
  const author = post.user?.data?.attributes?.fullname ? post.user.data.attributes.fullname : meta_author;

  return (
    <Base title={post.title} description={post.shortDescription}>
      <section className="section single-blog mt-6">
        <div className="container">
          <div className="row">
            <div className="lg:col-8">
              <article>
                <div className="relative">
                  {post.feature_image?.data?.attributes?.url && (
                    <Image
                      src={urls.backendUrl + post.feature_image.data.attributes.url}
                      height="500"
                      width="1000"
                      alt={post.feature_image.data.attributes.alternativeText}
                      className="rounded-lg"
                    />
                  )}
                  <ul className="absolute top-3 left-2 flex flex-wrap items-center">
                    {post.taxonomies.data.map((tax) => (
                      <li
                        className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
                        key={tax.attributes.slug}
                      >
                        <Link
                          className="capitalize"
                          href={`/taxonomies/${tax.attributes.slug}`}
                        >
                          {tax.attributes.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <h1 className="lg:text-[42px] mt-4">{post.title}</h1>
                <ul className="flex items-center space-x-4">
                  <li className="me-3">
                    <Link
                      className="inline-flex items-center font-secondary text-xs leading-3"
                      href="/about"
                    >
                      <FaUserAlt className="me-1.5" />
                      {author}
                    </Link>
                  </li>
                  <li className="inline-flex items-center font-secondary text-xs leading-3">
                    <FaRegCalendar className="me-1.5" />
                    {dateFormat(post.createdAt)}
                  </li>
                </ul>
                <div className="content mb-4">{post.content}</div>
                <div className="mb-4">
                  {post.reference != null && (
                    <p>
                      <strong>المصدر: </strong>
                      <a href={post.reference} target="_blank" rel="noreferrer" className="text-primary">
                        {post.reference.substring(0, post.reference.indexOf("/", 8))}
                      </a>
                    </p>
                  )}
                </div>
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-2 mx-auto">
                  {
                    post.media?.data?.length > 0 && post.media.data.map(mediaItem => (
                      <div key={mediaItem.attributes.url} className="w-full rounded">
                        {
                          mediaItem.attributes.mime.startsWith("image") && (
                            <a href={urls.backendUrl + mediaItem.attributes.url}>
                              <Image
                                src={urls.backendUrl + mediaItem.attributes.url}
                                height={mediaItem.attributes.width}
                                width={mediaItem.attributes.height}
                                alt={mediaItem.attributes.alternativeText}
                                className="h-auto max-w-full rounded-lg"
                              />
                            </a>
                          )
                        }
                        {
                          mediaItem.attributes.mime.startsWith("video") && (
                            <video
                              src={urls.backendUrl + mediaItem.attributes.url}
                              height={mediaItem.attributes.width}
                              width={mediaItem.attributes.height}
                              className="h-auto max-w-full rounded-lg"
                            />
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </article>
            </div>
            <Sidebar
              posts={posts.filter((post) => post.slug !== slug)}
              categories={categories}
            />
          </div>
        </div>

        {/* Related posts */}
        {
          relatedPosts.length > 0 && (
            <div className="container mt-20">
              <h2 className="section-title">أخبار ذات صلة</h2>
              <div className="row mt-16">
                {relatedPosts.slice(0, 3).map((post, index) => (
                  <div key={"post-" + index} className="mb-12 lg:col-4">
                    <Post post={post.attributes} />
                  </div>
                ))}
              </div>
            </div>
          )
        }
      </section>
    </Base>
  );
};

export default PostSingle;
