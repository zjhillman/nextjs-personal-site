import fs from "fs";
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';

const getPageContents = (slug: string) => {
    const pathToPost = "posts/" + slug + ".md";
    const markdown = fs.readFileSync(pathToPost, "utf8");
    const file = matter(markdown);
    console.log(file);
    return file;
};

const PostPage = (props: any) => {
    const slug = props.params.slug;
    const content = getPageContents(slug);
    return (
        <div>
            <h1>{slug}</h1>
            <br />
            <Markdown>{content.content}</Markdown>
        </div>
    );
};

export default PostPage;