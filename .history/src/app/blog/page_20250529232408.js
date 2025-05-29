export default function Page() {
  return (
    <div className="bg-white overflow-hidden">
      <div className="container p-6 lg:p-12 bg-white relative z-50 mx-auto">
        <div className=" text-black flex flex-col breadcrumbs">
          <ul className="flex items-center flex-wrap">
            <li className="!text-black">
              <Link href={`/`} title="praca zdalna">
                hello!
              </Link>
            </li>
            <li className="!text-black">
              <Link href="/news" title="aktualności">
                news
              </Link>
            </li>
          </ul>
        </div>

        <div className="min-h-[20vh]">
          <h1 className="mb-6 text-black">
            Aktualności - czytaj o pracy zdalnej, technologii, biznesie i
            nowościach w AI
          </h1>
          <BlogPostList posts={posts} />
        </div>
        <AboutQuixyTalent />
        <div className="mt-12"></div>
        <Market services={services} />
      </div>{" "}
    </div>
  );
}
