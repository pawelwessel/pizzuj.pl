import Link from "next/link";

export default function Page() {
  return (
    <div className="overflow-hidden">
      <div className="golden container text-white mt-12 p-6 w-max mx-auto">
        <div className="  flex flex-col breadcrumbs">
          <ul className="flex items-center flex-wrap">
            <Image
              src={pizza}
              alt="Forum pizzy reklama lokali i pizzerii w miastach Polski"
              width={124}
              height={124}
            />
            <li className="">
              <Link href={`/`} title="praca zdalna">
                pizza world!
              </Link>
            </li>
            <li className="ml-3">
              <Link
                href="/blog"
                title="Pizzowe forum i promowanie pizzerii w rankingach z poszczególnych miast"
              >
                BLOG
              </Link>
            </li>
          </ul>
        </div>
      </div>{" "}
      <div className="">
        <h1 className="mb-6 ">
          Forum pizzy i gastronomii, promowanie pizzerii w rankingach na mapie
          Polski to cel pizzuj.pl
        </h1>
        {/* <BlogPostList posts={posts} /> */}
      </div>
    </div>
  );
}
