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

// sort the input array of graymatter objects so that the highest (most recent) date is at the top
// @var     unsortedArr    GrayMatterFile[]    contains markdown data as a GrayMatter plugin object
// @returns sortedArr      GrayMatterFile[]    elements of markdown data sorted by most recent date     
const sortPostData = (unsortedArr: GrayMatterFile<string>[]) => {
  const arrayLength = unsortedArr.length;
  var sortedArr: GrayMatterFile<string>[] = new Array();

  // loop through old array and compare dates to items in the sorted array
  // on first index, immediately copy first element into sorted array
  // loop through sorted array comparing to every element until appropriate spot is found
  // move every element up one item until the array ends
  for (var i = 0; i < arrayLength; i++) {
    if (sortedArr.length = 0) {
      sortedArr.push(unsortedArr[i]);
      continue;
    }
    
    for (var j = 0; j < sortedArr.length; j++) {
      const unsortedDate = unsortedArr[i].data.date.getTime();
      const sortedDate = sortedArr[j].data.date.getTime();

      // if the next unsorted date is higher than the highest date in the array, place at front of array
      if (sortedDate < unsortedDate && j == 0) {
        sortedArr.unshift(unsortedArr[i]);
        continue;
      }

      // continue to increment the sorted array until the new date is higher than the sorted date
      // place the current, sorted element into storage, place the new element into the current index in storage
      // then place the element in storage into the next index
      if (unsortedDate < sortedDate) 
        continue;
      else if (sortedDate < unsortedDate) {
        var storage: GrayMatterFile<string>[] = new Array();
        while (j < sortedArr.length) {
          const bin = sortedArr.pop();
          if (bin !== undefined)
            storage.push(bin);
        }
        while (0 < storage.length) {
          const bin = storage.shift();
          if (bin !== undefined)
            sortedArr.push(bin);
        }
      }
    }
  }
  return sortedArr;
};

const printPostList = (postList: GrayMatterFile<string>[]) => {
  // loop through and print to npm console
  for (var i = 0; i < postList.length; i++) {
    const isNull = (postList.at(i) !== undefined && postList.at(i) !== null)
    console.log(`[sort function] element ${i} is ${isNull}`);

    if (postList.at(i) !== undefined && postList.at(i) !== null)
      console.log(postList.shift()?.data.title);
  }

  // print 
  console.log("[sort function] length of sorted array" + postList.length);

  return 0;
};

const HomePage = () => {
  const postMetaData = getSlugs();
  const unsortedPosts = postMetaData.map((slug) => {
    return getPostData(slug);
  });

  // set sort
  const posts = sortPostData(unsortedPosts);
  const postPreviews = postMetaData.map((slug) => {
    const post = getPostData(slug);
    const postDate = new Date(post.data.date).toDateString();
    const postPreview = (<div className="my-4 p-2 mx-auto max-w-2xl">
      <Link href={`/posts/${slug}`}>
        <h1 className="text-xl font-bold hover:underline hover:text-red-400">{post.data.title}</h1>
      </Link>
      <h2 className="text-xs text-gray-500">{post.data.date.toDateString()}</h2>
      <h2 className="text-sm text-gray-200">{post.data.subtitle}</h2>
    </div>);


    return postPreview;
  });
  return <div>{postPreviews}</div>;
};

export default HomePage;