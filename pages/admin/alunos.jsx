import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  CursorClickIcon,
  MenuIcon,
  XIcon,
  MailIcon
} from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { Image } from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";



const user = {
  name: "Ecap",
  email: "ecap@ecap.com",
};

const navigation = [
  { name: "Visão geral", href: "/admin/", current: false },
  { name: "Alunos", href: "/admin/alunos", current: true },
  //{ name: "Certificados", href: "/admin/certificados", current: false },
];
const Nav = () => {
  const router = useRouter();
  const {data: session, status} = useSession()  
  if(status == "loading"){return <p>Aguarde enquanto arrumamos tudo</p>}
  if(status == "unauthenticated"){
    router.push("/login")
    return <p>você não está logado</p>
  }
  if(status == "authenticated"){
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <p className="text-2xl text-indigo-300">Ecap</p>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  ></button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        <p className="text-white mr-4">Olá {session.user.name}!</p>
                        <Image className="h-8 w-8 rounded-full" src={session.user.image} alt={session.user.name} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-red-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => {signOut()}}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                      <Image className="h-10 w-10 rounded-full" src={session.user.image} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {session.user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {session.user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );}
};
const userNavigation = [{ name: "Sair", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



const courseS = 1
export default function Admin(courses, erro) {

  const [showingError, setShowingError] = useState(false);

  useEffect(() => {
    if (erro == true || courses.courses.length == 0) {
      setShowingError(true);
    }
  }, [erro, courses.courses.length]);


  const router = useRouter()
  const {data: status} = useSession()  
  useEffect(()=>{
    if(status == "unauthenticated"){
      router.push('/login')
    }
  })
  return (
    <>
      <div className="min-h-full">
        <Nav />
        <Transition.Root show={showingError} as={Fragment}>
        <p className="bg-red-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            Erro ao consultar os cursos, favor tente novamente em alguns minutos.
        </p>
        </Transition.Root>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Você está visualizando informações do curso:{" "}
              <span className="text-blue-900">{courseS}</span>
            </h1>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Main content */}

            <div className="container">
              <div>
                <div className="md:grid md:grid-cols-3 md:gap-6">
                  <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Ver alunos no curso:
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Ver todos os alunos no{" "}
                        <span className="text-indigo-600">
                          curso selecionado
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                      <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-3 sm:col-span-2">
                            {
                              
                            (() => {
                              if(courses.courses.length > 1){
                              return(
                              courses.courses[0].students.students.map((aluno) => (
                                <li className="pt-5" key={aluno.profile.id}>
                                  {aluno.profile.name.fullName}
                                  <br />
                                  <MailIcon className="inline h-6 w-6 mr-3" />{aluno.profile.emailAdress}
                                </li>
                              ))
                              )}else{
                                return(
                                  <p className="bg-red-400 text-center">Não foi possível consultar os alunos no curso selecionado</p>
                                )
                              }
                            })()
                            

                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>

          
            </div>

            {/* /End Main content */}
          </div>
        </main>
      </div>
    </>
  );
}

Admin.getInitialProps = async function () {
  try {
    const getCourses = await axios.get("http://localhost:8087/cursos")
    return {
      courses: getCourses.data
    }
  } catch(e){
    return {
      courses: [],
      erro: true
    }
  }
};

