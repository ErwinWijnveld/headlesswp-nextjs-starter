import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import vercelImg from "../assets/images/vercel.png";

const DOCS_URL = "https://docs.headlesswpnext.vercel.app/";
const GITHUB_URL = "https://github.com/ErwinWijnveld/headlesswp-nextjs-starter";

const HomeHero = ({ changeScreen }) => {
    // set body bg to black
    useEffect(() => {
        document.body.style.backgroundColor = "black";

        return () => {
            document.body.style.backgroundColor = "white";
        };
    }, []);

    return (
        <div className="h-screen bg-black relative">
            <div className="absolute right-4 top-4 md:right-8 md:top-8 flex items-center gap-8 z-20 scale-50 md:scale-100 origin-right">
                <Link href={DOCS_URL}>
                    <a className=" border-white border-[2px] text-white font-semibold text-sm rounded-full px-8 py-2">
                        Documentation
                    </a>
                </Link>
                <Link href={GITHUB_URL}>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            className="invert scale-125 translate-y-[7px]"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </Link>
            </div>
            <div className="absolute inset-0">
                <Image
                    src={vercelImg}
                    alt="Vercel Logo"
                    layout="fill"
                    className="object-contain sm:object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL={vercelImg.src}
                />
            </div>
            <div className="relative z-10 text-white h-full py-24 px-4 flex flex-col items-center justify-center text-center mix-blend-difference">
                <h1
                    onClick={changeScreen}
                    className="text-[9vw] hover:cursor-pointer hover:scale-110 ease-out-expo transition-all duration-[1300ms]"
                >
                    HeadlessWpNext
                </h1>
            </div>
        </div>
    );
};
export default HomeHero;
