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
    return (
        <div key={slug} className="mx-auto max-w-2xl my-4 p-2 prose lg:prose-lg dark:prose-invert">
            <h1 className="!mt-0 !mb-2">{page.data.title}</h1>
            <div className="!text-[0.60rem] flex items-center !mb-10 !mt-0">
                <h2 className="!my-0 !ml-0 !mr-auto text-red-400">{datePosted}</h2>
                <h2 className="!my-0 !ml-auto !mr-0 place-content-end">Posted by {page.data.author}</h2>
            </div>
            <h2 className="!my-4 !text-xl">{page.data.subtitle}</h2>
            <article className="">
                <Markdown>{page.content}</Markdown>
            </article>
        </div>
    );
};

export default PostPage;