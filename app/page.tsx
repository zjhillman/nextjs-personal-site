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
  console.log(sortedPosts[0] !== undefined && sortedPosts[0] !== null);

  // loop through old array and compare dates to items in the sorted array
  // on first index, immediately copy first element into sorted array
  // loop through sorted array comparing to every element until appropriate spot is found
  // move every element up one item until the array ends
  for(var i = 0; i < arrayLength; i++) {
    if (i == 0) {
      sortedPosts[0] = unsortedPosts[i];
      continue;
    }

    const date0 = unsortedPosts[i].data.date;
    var storage0: matter.GrayMatterFile<string>;
    for (var j = 0; j < arrayLength; j++) {
      if (sortedPosts[j] == undefined || sortedPosts[j] == null)
        break;

      const date1 = sortedPosts[j].data.date;
      // continue to increment the sorted array until the new date is older than the sorted date
      // place the current, sorted element into storage, place the new element into the current index in storage
      // then place the element in storage into the next index
      if (date1 < date0) 
        continue;
      else {
        storage0 = sortedPosts[j];
        sortedPosts[j] = unsortedPosts[i];
        if (sortedPosts[j+1] == undefined || sortedPosts[j+1] == null)
          sortedPosts[j+1] = storage0;
        else {

        }
      }
    }

  }
  console.log(sortedPosts);
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