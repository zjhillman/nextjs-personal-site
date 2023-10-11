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
// @var     unsortedArr    GrayMatterFile[]    contains a GrayMatterFile (Markdown) Object Array in some order
// @returns sortedArr      GrayMatterFile[]    contains a GrayMatterFile Object Array in descending order (most recent)    
const sortPostData = (unsortedArr: GrayMatterFile<string>[]) => {
  let sortedArr: GrayMatterFile<string>[] = new Array();

  // loop through the unsorted array and sorted array in linear order
  for (let i = 0; i < unsortedArr.length; i++) {
    if (i == 0) {
      sortedArr.push(unsortedArr[i]);
      continue;
    }

    const unsortDate = unsortedArr[i].data.date.getTime();
    for (let j = 0; j < sortedArr.length; j++) {
      const sortDate = sortedArr[j].data.date.getTime();
      if (unsortDate < sortDate && (sortedArr.length == 1 || sortedArr.length == j + 1)) {
        sortedArr.push(unsortedArr[i]);
        // console.log(`pushed ${unsortedArr[i].data.title} at index ${j}`);
        break;
      }
      else if (unsortDate > sortDate && (sortedArr.length == 1 || j == 0)) {
        sortedArr.unshift(unsortedArr[i]);
        // console.log(`pushed ${unsortedArr[i].data.title} at index ${j}`);
        break;
      }
      else if (unsortDate > sortDate) {
        var storage = new Array();
        for (let n = j; n < sortedArr.length; n++) {
          storage.push(sortedArr.pop());
        }

        sortedArr.push(unsortedArr[i]);
        // console.log(`pushed ${unsortedArr[i].data.title} at index ${j}`)
        const strLn = storage.length;
        for (let n = 0; n < strLn; n++) {
          sortedArr.push(storage.pop());
        }
        break;
      }
      else {
        continue;
      }
    }
  }
  return sortedArr;
};

const printPostArr = (postList: GrayMatterFile<string>[]) => {
  console.log(`--------------------\nLength of array: ${postList.length}\n--------------------`)
  // loop through and print to npm console
  for (let i = 0; i < postList.length; i++) {
    const isNull = (postList.at(i) === undefined) || (postList.at(i) === null)
    if (isNull)
      console.log(`element ${i} is null`);
    else {}
      console.log(postList[i].data.title);
  }
  console.log("");
  return 1;
};

const HomePage = () => {
  const postMetaData = getSlugs();
  const unsortedPosts = postMetaData.map((slug) => {
    return getPostData(slug);
  });

  // set sort
  // console.log(`jd power: + ${unsortedPosts[1]}`);
  const posts = sortPostData(unsortedPosts);
  // console.log(`[homepage] sort func returns: ${(printPostArr(posts))}`);

  // set previews
  const postPreviews = posts.map((post) => {
    const postPreview = (<div className="mb-[0.50rem] p-2 mx-auto max-w-2xl">
      <Link href={`/posts/${post.data.slug}`}>
        <h1 className="text-xl font-bold hover:underline hover:text-red-400">{post.data.title}</h1>
      </Link>
      <h2 className="text-xs text-red-400">{post.data.date.toDateString()}</h2>
      <h2 className="text-sm text-gray-200">{post.data.subtitle}</h2>
    </div>)
    return postPreview;
  });
  return <div>{postPreviews}</div>;
};

export default HomePage;