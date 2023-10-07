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
  const arrayLength = unsortedPosts.length;
  var sortedPosts: GrayMatterFile<string>[] = new Array(arrayLength);

  for(var i = 0; i < arrayLength; i++) {
    if (i == 0) {
      console.log("putting " + unsortedPosts[i] + " at index " + i);
      sortedPosts[0] = unsortedPosts[i];
      continue;
    }
    for(var j = 0; j < arrayLength; j++) {
      const unsortedDate = unsortedPosts[i].data.date.getTime();
      const sortedDate = sortedPosts[j].data.date.getTime();

      if (unsortedDate < sortedDate)
        continue;
      else if (j + 1 < arrayLength) {
        var storage0 = sortedPosts[j+1];
        console.log("putting " + unsortedPosts[i].data.title + " at index " + j);
        sortedPosts[j] = unsortedPosts[i];
        for (var k = j+1; k < arrayLength; k++) {
          if (sortedPosts[k+1] !== null) {
            sortedPosts[k] = storage0;
            break;
          }
          else {
            const storage1 = sortedPosts[k];
            sortedPosts[k] = storage0;
            storage0 = storage1;
          }
        }
        
        sortedPosts[j+1] = unsortedPosts[i];
      }
      else 
        sortedPosts[j] = unsortedPosts[i];
      //console.log();
    }
  }
  return sortedPosts;
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