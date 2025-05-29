import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="container p-6 lg:p-12 golden relative z-50 mx-auto">
        <div className=" text-white flex flex-col breadcrumbs">
          <ul className="flex items-center flex-wrap">
            <li className="!text-white">
              <Link href={`/`} title="praca zdalna">
                pizza world!
              </Link>
            </li>
            <li className="!text-white">
              <Link
                href="/blog"
                title="Pizzowe forum i promowanie pizzerii w rankingach z poszczególnych miast"
              >
                blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="min-h-[20vh]">
          <h1 className="mb-6 text-white">
            Forum pizzy i gastronomii, promowanie pizzerii w rankingach na mapie
            Polski to cel pizzuj.pl
          </h1>
          {/* <BlogPostList posts={posts} /> */}
        </div>
      </div>{" "}
    </div>
  );
}
