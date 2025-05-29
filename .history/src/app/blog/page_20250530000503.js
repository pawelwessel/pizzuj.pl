import Image from "next/image";
import Link from "next/link";
import pizza from "../../../public/assets/pizza.png";
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
              className="w-12 h-12 mr-2"
            />
            <li className="">
              <Link href={`/`} title="praca zdalna">
                pizza world!
              </Link>
            </li>

            <Image
              src={pizza}
              alt="Forum pizzy reklama lokali i pizzerii w miastach Polski"
              width={124}
              height={124}
              className="w-12 h-12 ml-2"
              style={{ transform: "scaleX(-1)" }}
            />
          </ul>
        </div>
      </div>{" "}
      <div className="">
        <h1 className="mt-24 text-xl lg:text-3xl font-bold text-center text-zinc-800 drop-shadow-xl shadow-black w-max max-w-[90%] lg:max-w-[77%] mx-auto">
          Forum pizzy i gastronomii, promowanie pizzerii w rankingach na mapie
          Polski to cel pizzuj.pl
        </h1>
        {/* <BlogPostList posts={posts} /> */}
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 mt-12">
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center golden p-12">
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white">
                Wkrótce więcej!
              </h2>
              <p className="text-lg text-zinc-600">
                Strona w budowie, wróć wkrótce!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
