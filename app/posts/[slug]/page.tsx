import fs from "fs";
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';

const getPageContents = (slug: string) => {
    const pathToPost = "posts/" + slug + ".md";
    const markdown = fs.readFileSync(pathToPost, "utf8");
    const file = matter(markdown);
    return file;
};

const PostPage = (props: any) => {
    const slug = props.params.slug;
    const page = getPageContents(slug);
    const datePosted = page.data.date.toDateString();
    console.log(page.data);
    return (
        <div key={slug} className="mx-auto max-w-3xl my-4 p-2">
            <h1 className="text-2xl underline">{page.data.title}</h1>
            <h2 className="text-xs text-red-400">{datePosted}</h2>
            <h2 className="mb-4">{page.data.subtitle}</h2>
            <article className="prose dark:prose-invert lg:prose-xl">
                <Markdown>{page.content}</Markdown>
            </article>
        </div>
    );
};

export default PostPage;