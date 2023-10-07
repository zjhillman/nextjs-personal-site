import fs from "fs";
import Link from "next/link";
import matter, { GrayMatterFile } from "gray-matter";

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
};

const sortPostData = (unsortedPosts: GrayMatterFile<string>[]) => {
  var sortedPosts: GrayMatterFile<string>[] = new Array(unsortedPosts.length);

  for(var i = 0; i < unsortedPosts.length; i++) {
    if (i == 0) {
      sortedPosts.push(unsortedPosts[i]);
      continue;
    }
    for(var j = 0; j < sortedPosts.length; j++) {
      const unsortedDate = unsortedPosts[i].data.date.getTime();
      const sortedDate = sortedPosts[j].data.date.getTime();

      if (unsortedDate < sortedDate)
        continue;
      //else if 
    }
  }
};

const HomePage = () => {
  const postMetaData = getSlugs();
  const unsortedPosts = postMetaData.map((slug) => {
    return getPostData(slug);
  });
  const posts = sortPostData(unsortedPosts);
  const postPreviews = postMetaData.map((slug) => {
    const post = getPostData(slug);
    const postDate = new Date(post.data.date).toDateString();
    const postPreview = (<div className="my-4 p-2 mx-auto max-w-2xl">
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