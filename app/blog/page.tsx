import { groq } from "next-sanity";
import {client} from "../../lib/sanity.client";
import Head from "next/head";
import BlogList from "@/components/BlogList";

const query = groq`
  *[_type=='post'] {
    ...,
    author->,
    categories[]->
  } | order(_createdAt desc)
`;

export const revalidate = 30;

export const metadata = {
  title: "Mi Blog",
  description: "...",
};


export default async function HomePage() {

  const posts = await client.fetch(query);

  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
    <BlogList posts={posts} />
    </div>
  );
}