import fs from "fs";
import Link from "next/link";
import matter from "gray-matter";

const getSlugs = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const slugs = markdownPosts.map((file) => file.replace(".md", ""));
  return slugs;
};

const getPostData = (slug: string) => {
  const pathToFile = `posts/${slug}.md`;
  const file = matter.read(pathToFile);
  return file;
}

const HomePage = () => {
  const postMetaData = getSlugs();
  const postPreviews = postMetaData.map((slug) => {
    const post = getPostData(slug);
    const postDate = post.data.date.toLocaleString();
    const postPreview = (<div className="my-2 p-2 mx-auto max-w-xl ">
      <Link href={`/posts/${slug}`}>
        <h1 className="text-xl font-bold hover:underline hover:text-red-400">{post.data.title}</h1>
      </Link>
      <h2 className="text-xs text-gray-500">{postDate}</h2>
      <h2 className="text-sm text-gray-200">{post.data.subtitle}</h2>
    </div>);
    return postPreview;
  });
  return <div>{postPreviews}</div>;
};

export default HomePage;