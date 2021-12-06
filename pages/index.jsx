import { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import "../styles/index.module.css";
import Image from "next/image";
import ifc from "../public/ifc.png";
import superacao from "../public/superacao.png";
import ecap from "../public/ecap.png";
import prefeituraMunicipal from "../public/araquari.png";

var Header = () => {
  return (
    <div className="bg-gray-100 overflow-hidden">
      <div className="mx-auto">
        <div className="mx-auto pb-8 bg-gray-100">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">
                  Ecapacitação, cursos para enriquecer seu{" "}
                </span>{" "}
                <span className="block text-indigo-600 xl:inline">
                  conhecimento
                </span>
              </h1>

              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>

              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow invisible sm:invisible md:visible lg:visible">
                  <a
                    href="#cursos"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Ver cursos
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

var Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-16">
        <div className="pb-10 xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <h2 className="text-sm leading-5 font-semibold tracking-wider text-gray-400 uppercase">
              Ecapacitação 2021 V: 0.1 (beta)
            </h2>
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
            <div className="md:ml-32">
              <a
                href="#"
                className="h-24 w-24 inline-flex items-center justify-center md:w-32 md:h-32"
              >
                <div className="h-24 w-24 block md:w-32 md:h-32">
                  <Image
                    src={prefeituraMunicipal}
                    alt="IFC"
                    layout="responsive"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Index(courses, erro) {

  const [showingError, setShowingError] = useState(false);

  useEffect(() => {
    if (erro == true || courses.courses.length == 0) {
      setShowingError(true);
    }
  }, [erro, courses.courses.length]);

  return (
    <div>
      <Header />
      <div className="hidden sm:block bg-gray-100" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="bg-gray-100 overflow-hidden">
        <div className="mx-auto">
          <div className="mx-auto pb-8 bg-gray-100">
            <main className="mt-10">
              <div className="text-center mx-auto">
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  Cursos
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Todos os cursos são oferecidos via{" "}
                  <span className="text-indigo-600">google classroom,</span> se
                  inscreva em um curso para receber o link e participar das
                  aulas!
                </p>
              </div>
            </main>
          </div>
        </div>

        <div className="mx-auto" id="cursos">
          <Transition.Root show={showingError} as={Fragment}>
            <p className="bg-red-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
              Erro ao consultar os cursos, favor tente novamente em alguns
              minutos.
            </p>
          </Transition.Root>
          {courses.courses.map((item) => (
            <div className="pb-8 bg-gray-100 md:mx-32" key={item.id}>
              <main className="mt-10 container">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-10 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-4 flex items-center justify-between flex-wrap sm:flex-no-wrap">
                      <div className="ml-4 mt-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-base text-gray-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <a
                          href={item.inviteLink}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                          Ver curso
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden sm:block bg-gray-100" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

Index.getInitialProps = async function () {
  try {
    const getCourses = await axios.get("http://localhost:8087/cursos");
    return {
      courses: getCourses.data,
    };
  } catch (e) {
    return {
      courses: [],
      erro: true,
    };
  }
};
