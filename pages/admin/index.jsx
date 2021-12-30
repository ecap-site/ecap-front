import { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import {
  BellIcon,
  CursorClickIcon,
  MenuIcon,
  XIcon,
  ChevronRightIcon,
  ExclamationIcon,
  CheckIcon,
  DocumentAddIcon,
  DeleteIcon
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import Router, {useRouter} from "next/router";
import axios from "axios";
import Image from "next/image";


const IconRight = () => {
  return (
    <div className="flex items-center">
      <ChevronRightIcon />
    </div>
  );
}


const navigation = [
  { name: "Visão geral", href: "/admin/", current: true },
  { name: "Alunos", href: "/admin/alunos", current: false },
  //{ name: "Certificados", href: "/admin/certificados", current: false },
];

const userNavigation = [{ name: "Sair", href:"#"}];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


const CreateCourse = function () {

  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState("");
  const [docType, setDocType] = useState("");

  const handleDocType = (e) => {
    setDocType(e.target.value);
  }
  const handleDocInput = (e) => {
    setDocument(e.target.value)
  }


  const resetDocInput = () => {
    setDocument("")
    setDocType("")
  }

  const teste = async event => {
    event.preventDefault()

    const course = {
      name: event.target.elements.courseName.value,
      description: event.target.elements.desc.value,
      section: event.target.elements.assunto.value,
      type: event.target.elements.type.value,
    }

    const courseDetails = {
      name: event.target.elements.courseName.value,
      description: event.target.elements.desc.value,
      section: event.target.elements.assunto.value,
      type: event.target.elements.type.value,
      InitDate: event.target.elements.initDate.value,
      EndDate: event.target.elements.endDate.value,
    }

    const inscriptionDeadlines = {
      init: courseDetails.InitDate,
      end: courseDetails.EndDate
    }

    const inscriptionDocs = documents


    
    const finalCourse = {
      course: course,
      documents: inscriptionDocs,
      deadlines: inscriptionDeadlines
    }

    axios.post(`${process.env.API_URL}/createCourse`, finalCourse)


    function reset(){
    event.target.elements.courseName.value = ""
    event.target.elements.desc.value = ""
    event.target.elements.assunto.value = ""
    event.target.elements.type.value = ""
    event.target.elements.initDate.value = ""
    event.target.elements.endDate.value = ""
    }

    
    
    reset()
  }
  
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Criar curso
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Os cursos ficaram disponíveis em até 5 minutos, caso o curso não
                seja criado até esse tempo, tente{" "}
                <span className="text-indigo-500">recriar esse curso</span>.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={teste}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="courseName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nome do curso:
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          autoComplete="off"
                          name="courseName"
                          id="courseName"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="Nome do curso"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Descrição:
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="desc"
                        name="desc"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Descrição"
                        defaultValue={""}
                        required
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      No máximo 3000 caracteres.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="assunto"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Assunto:
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="assunto"
                        name="assunto"
                        rows={2}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Assunto"
                        defaultValue={""}
                        required
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      No máximo 300 caracteres.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tipo:
                    </label>
                    <div className="mt-1">
                      <select
                        id="type"
                        name="type"
                        rows={1}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="turma"
                        required
                        defaultValue={""}
                      >
                        <option value="false" key="1">
                          Privado
                        </option>
                        <option value="true" key="2">
                          Aberto
                        </option>
                      </select>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Um curso aberto faz com que qualquer um com uma conta
                      verificada possa entrar, um curso privado requer aprovação
                      por um administrador.
                    </p>
                  </div>

                  <hr/>

                  <div>
                    <label
                      htmlFor="initDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Data de início das inscrições: 
                    </label>
                    <div className="mt-1">
                      <input
                        type="datetime-local"
                        id="initDate"
                        name="initDate"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={""}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                      Data onde o curso começa a ser disponibilizado na plataforma.
                      </p>
                    </div>
                    <div>
                    <label
                      htmlFor="endDate"
                      className="mt-5 block text-sm font-medium text-gray-700"
                    >
                      Data de encerramento das inscrições: 
                    </label>
                    <div className="mt-1">
                      <input
                        type="datetime-local"
                        id="endDate"
                        name="endDate"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        defaultValue={""}
                      />
                      <p className="mt-2 text-sm text-gray-500">
                      Esta data não pode ser menor que a data de início das inscrições. Data onde o curso para de ser disponibilizado na plataforma.
                      </p>
                    </div>
                    </div>
                  </div>
                  <hr/>
                   {/* form for required documents */}
                  <div>
                    <label
                      htmlFor="documents"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Documentos necessários para inscrição:
                    </label>
                    <div className="mt-1">
                      {/*input with a button that will create a list of documents */}
                      <div className="flex items-center">
                      
                        <input
                          type="text"
                          id="documentsInput"
                          name="documentsInput"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Documentos necessários"
                          value={document}
                          onChange={handleDocInput}
                        />

                        {/* select for doc type, image or document */}
                        <select
                          id="docType"
                          name="docType"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="tipo"
                          required
                          value={docType}
                          onChange={handleDocType}
                          
                        >
                          <option selected readOnly key="0">
                            Tipo de documento
                          </option>
                          <option value="Imagem" key="1">
                            Imagem
                          </option>
                          <option value="Texto" key="2">
                            Texto
                          </option>
                        </select>
                        
                        <button
                          type="button"
                          className="ml-2 p-1 border border-gray-300 rounded-md text-sm"
                          onClick={() => {
                            setDocument(document);                            
                            if(docType === ""){
                              alert("Selecione o tipo de documento");
                            }
                            else{
                            setDocuments(documents.concat({document, docType}));
                            
                            resetDocInput()
                            }
                          }
                        }
                          >
                          <DocumentAddIcon className="h-6 w-6"/>
                        </button>
                        
                      </div>

                        {/* list of documents, below the input */}
                        <div className="box-border bg-gray-200 text-center">
                        <ul className="mt-2 text-center">
                          {/* on click at item, remove it */}
                          {documents.map((doc, index) => (
                            <li key={index} className="list-item mt-2 text-green-600 hover:text-red-400"
                              onClick={() => {
                                setDocuments(documents.filter((_, i) => i !== index));   
                              }}
                            >
                              {`${doc.document} || ${doc.docType}`}
                            </li>
                          ))}
                        </ul>
                       </div>

                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      No máximo 300 caracteres por documento, 20 documentos no máximo.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Se nenhum documento for necessário, deixe o campo em branco.
                    </p>
                  </div>

                  <hr/>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Criar curso
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Enviar alerta:
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Os alertas são exibidos na página principal,{" "}
              <span className="text-red-500">
                tome cuidado com o que você escreve aqui!
              </span>
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div className="grid grid-cols-3 gap-6"></div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tipo do aviso:
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option>Importante (vermelho - chamativo)</option>
                    <option>Normal (Azul - Informativo)</option>
                    <option>Informar (Amarelo - Chamativo)</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Descrição:
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Descrição"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    No máximo 3000 caracteres.
                  </p>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enviar Alerta
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
};

const Nav = () => {
  const {data: session, status} = useSession()  
  if(status == "loading" || status == "unauthenticated"){return <p>Aguarde enquanto arrumamos tudo</p>}
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
                        <Image className="h-8 w-8 rounded-full" src={session.user.image} alt={session.user.name} height={46} width={46} />
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
                      <Image className="h-8 w-8 rounded-full" src={session.user.image} alt={session.user.name} height={46} width={46} />
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

export default function Admin(courses, erro) {

  const [courseS, setcourseS] = useState("Nenhum curso selecionado!");

  const handleSubmit = async event => {
    event.preventDefault()
    setcourseS(event.target.value)
  }


  const [showingError, setShowingError] = useState(false);

  useEffect(() => {
    if (erro == true || courses.courses.length == 0) {
      setShowingError(true);
    }
  }, [erro, courses.courses.length]);

  const router = useRouter();
  const {data: session, status} = useSession()  

  useEffect(()=>{
    if(status == "unauthenticated"){
      router.push('/login')
    }
  })
  

  const UserInfo = useSession()
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  function changeCourse(e) {
    e.preventDefault();
    setOpen(true);
  }

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
              Você está visualizando o curso:{" "}
              <span className="text-blue-900">{courseS}</span>
            </h1>
            <div>
              <a onClick={changeCourse}>
                Trocar curso{" "}
                <ChevronRightIcon className="inline h-6 w-6"></ChevronRightIcon>
              </a>
            </div>
          </div>
        </header>

        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Main content */}

            <div className="container">
              <div>
                <CreateCourse />
              </div>
            </div>

            {/* /End Main content */}
          </div>
        </main>
      </div>

      
      <div id="MODAL">
        
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-200 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckIcon
                          className="h-6 w-6 text-indigo-700"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Trocar visualização do curso
                        </Dialog.Title>
                        
                        
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                           Troque o curso para ver estatícas de outro curso.
                          </p>
                       
                        <select value={courseS} className="mt-5 md:ml-16" onChange={handleSubmit}>
                            <option value="Nenhum curso selecionado!" defaultValue disabled>Selecione um curso</option>
                        {courses.courses.map((curso)=>{
                              return(
                                <option value={curso.title} key={curso.id}>{curso.title}</option>
                              )
                          })}
                        </select>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Trocar
                    </button>
                    
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
      
    </>
  );
}

Admin.getInitialProps = async function () {
  try {
    const getCourses = await axios.get(`${process.env.API_URL}/cursos`);
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
