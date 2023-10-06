import fs from "fs";
import Link from "next/link";
import matter from "gray-matter";
import MarkDown from "markdown-to-jsx";

const getPostMetaData = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const slugs = markdownPosts.map((file) => file.replace(".md", ""));
  return slugs;
};

const getMarkdownPost = (slug) => {
  const pathToFile = `posts/${slug}.md`;
  const file = matter.read(pathToFile);
  return file;
}

const HomePage = () => {
  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((slug) => {
    const post = getMarkdownPost(slug);
    const postDate = post.data.date.toLocaleString();
    const postPreview = <div>
      <Link href={`/posts/${slug}`}>
        <h1>{post.data.title}</h1>
      </Link>
      <h2>{postDate}</h2>
      <h2>{post.data.subtitle}</h2>
    </div>;
    return postPreview;
  });
  return <div>{postPreviews}</div>;
};

export default HomePage;

// (
//   <div>
//     <Link href={`/posts/${slug}`}>
//       <h2>{slug}</h2>
//     </Link>
//   </div>
// )