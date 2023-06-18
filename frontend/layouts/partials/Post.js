import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import urls from "@config/urls"
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";

const Post = ({ post }) => {
  const { summary_length } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.user?.data?.attributes?.fullname ? post.user.data.attributes.fullname : meta_author;
  return (
    <div className="post">
      <div className="relative">
        {post?.feature_image?.data?.attributes?.url && (
          <ImageFallback
            className="rounded"
            src={urls.backendUrl + post.feature_image.data.attributes.url}
            alt={post?.feature_image.data.attributes.alternativeText}
            width={405}
            height={208}
          />
        )}
        <ul className="absolute top-3 left-2 flex flex-wrap items-center">
          {post.taxonomies?.data?.map((tag, index) => (
            <li
              className="mx-2 inline-flex h-7 rounded-[35px] bg-primary px-3 text-white"
              key={"tag-" + index}
            >
              <Link
                className="capitalize"
                href={`/taxonomies/${tag.slug}`}
              >
                {tag.attributes.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="h5 mb-2 mt-4">
        <Link
          href={`/posts/${post.slug}`}
          className="block hover:text-primary"
        >
          {post.title}
        </Link>
      </h3>
      <ul className="flex items-center space-x-4">
        <li>
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
      <p>{post.content.slice(0, Number(summary_length))}</p>
      <Link
        className="btn btn-outline-primary mt-4"
        href={`/posts/${post.slug}`}
      >
        قراءة المزيد
      </Link>
    </div>
  );
};

export default Post;
