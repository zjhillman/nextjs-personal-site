import fs from "fs";

const getPostMetaData = () => {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const slugs = markdownPosts.map((file) => file.replace(".md", ""));
  return slugs;
};

const HomePage = () => {
  const postMetaData = getPostMetaData();
  const postPreviews = postMetaData.map((slugs) => (
    <div>
      <h2>{slugs}</h2>
    </div>
  ));
  return <div>{postPreviews}</div>;
};

export default HomePage;