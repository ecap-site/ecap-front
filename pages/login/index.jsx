import { useSession, signIn } from "next-auth/react"
import { LockClosedIcon } from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { useEffect} from "react"


export default function Component() {
  const router = useRouter()
  const { data: session } = useSession()
  if (session) {
    router.push("/")
  }
  return (
    <>
       <div className="min-h-full flex items-center justify-center py-60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/*<img
              className="mx-auto h-12 w-auto"
              src
              alt="Workflow"
            />*/}
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Entre com sua conta Google!</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Prefira utilizar a mesma conta aqui e no{' '}
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                classroom.
              </a>
            </p>
          </div>
             <div>
              <button
                onClick={() => signIn()}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Fazer Login
              </button>
            </div>
        </div>
      </div>
    </>
  )
}