import Image from "next/image";
import ifc from "../../public/ifc.png";
import superacao from "../../public/superacao.png";
import ecap from "../../public/ecap.png";
import prefeituraMunicipal from "../../public/araquari.png";

import Link from "next/link";


const Footer = () => {
    return (
      <footer className="bg-gray-900">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
          <div className="pb-10 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="xl:col-span-1">
              <Link href="/admin">
              <h2 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
                Ecapacitação 2021 V: 0.1 (β)
              </h2>
              </Link>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="">
                <a
                  href="#"
                  className="h-24 w-24 inline-flex items-center justify-center md:w-32 md:h-32"
                >
                  <div className="mb-16 h-24 w-24 block md:w-32 md:h-32 ">
                    <Image src={ifc} alt="IFC" layout="responsive" />
                  </div>
                </a>
              </div>
              <div className="md:ml-32">
                <a
                  href="#"
                  className="h-24 w-24 inline-flex items-center justify-center md:w-32 md:h-32"
                >
                  <div className="h-24 w-24 block md:w-32 md:h-32">
                    <Image src={ecap} alt="IFC" layout="responsive" />
                  </div>
                </a>
              </div>
              <div className="md:ml-32">
                <a
                  href="#"
                  className="h-24 w-24 inline-flex items-center justify-center md:w-32 md:h-32"
                >
                  <div className="h-24 w-24 block md:w-32 md:h-32">
                    <Image src={superacao} alt="IFC" layout="responsive" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;