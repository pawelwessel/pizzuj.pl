"use client";
import loginImage from "../../../public/assets/1.jpg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../db/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { errorCatcher } from "../../lib/errorCatcher";
import Link from "next/link";
import GoogleAuthButton from "../../components/Auth/GoogleButton";
import { FaKey } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isThinking, setThinking] = useState(false);
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    passwordRepeat: "",
    email: "",
  });
  function signIn() {
    setThinking(true);
    const id = toast.loading("Loguję...", {
      position: "top-right",
      isLoading: true,
    });

    (async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then(() => {
          toast.update(id, {
            render: "Zalogowano pomyślnie!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setThinking(false);
          router.push("/user");
        });
      } catch (err) {
        const errorMsg = errorCatcher(err);
        toast.update(id, {
          render: errorMsg,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setThinking(false);
      }
    })();
  }

  return (
    <div className="py-12 px-6 font-sans min-h-screen w-full bg-slug bg-cover bg-center mx-auto relative flex flex-col-reverse md:flex-row items-center justify-center">
      <Image
        src={loginImage}
        className="w-full md:w-[33vw] lg:w-[50vw] h-full object-cover rounded-xl mt-6 md:mt-0"
        alt="Login"
        width={1000}
        height={1000}
        priority
      />
      <div className="w-full mx-auto md:w-[67vw] lg:w-[50vw] sm:px-2 sm:p-4 lg:p-6 h-full flex items-center justify-center">
        <div className="w-full p-6 2xl:px-12 bg-gradient-to-br from-white via-white to-[#ffa920] rounded-br-xl rounded-tl-full md:mx-6 2xl:mx-12">
          <h2
            className={`justify-center text-black py-3 pr-3 font-bold text-2xl lg:text-3xl drop-shadow-xl shadow-black mb-6 flex flex-row items-center`}
          >
            Zaloguj się na swoje konto
          </h2>
          <div className="grid grid-cols-1 gap-3 h-max">
            <div className="flex flex-col">
              {" "}
              <label
                htmlFor="email"
                className="font-gotham text-black  font-light text-lg"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                placeholder="Wpisz email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="input-lg bg-white border border-gray-300 text-black p-3 text-lg mb-3 font-light rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              {" "}
              <label
                htmlFor="password"
                className="font-gotham text-black  font-light text-lg"
              >
                Hasło
              </label>
              <input
                required
                type="password"
                placeholder="Wpisz hasło"
                id="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="input-lg bg-white border border-gray-300 text-black  p-3 text-lg mb-3 font-light rounded-xl"
              />
            </div>
          </div>{" "}
          <div className="md:mt-6 grid grid-cols-1 gap-3 w-full">
            <div className="flex flex-col items-center gap-3">
              <button
                disabled={isThinking}
                onClick={signIn}
                className="md:w-max w-[279px] max-w-full px-6 py-3.5 rounded-br-xl rounded-tl-xl disabled:bg-gray-600 goldenShadow hover:bg-opacity-80 duration-150 text-white font-bold"
              >
                {!isThinking && (
                  <div className="flex flex-row items-center justify-center">
                    <FaKey className="mr-2" /> Zaloguj się
                  </div>
                )}
                {isThinking && "Poczekaj..."}
              </button>
              <div className="my-2 text-gray-700 text-lg">
                Nie posiadasz jeszcze konta?{" "}
                <Link
                  href="/register"
                  className="text-[#ffa920] underline hover:no-underline"
                >
                  Zarejestruj się
                </Link>
              </div>
              <GoogleAuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
