import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { AnnotationIcon, GlobeAltIcon, LightningBoltIcon, ScaleIcon } from '@heroicons/react/outline'
import axios from "axios"
import Link from "next/link";

// ----------------------------------------------------------------------------------------------  //

import { Header } from '../globalComponents/Header'
import { CodeIcon } from '@heroicons/react/solid';

const Course = () => {
  // ---------------------------------------------------------------------------------------------- //

  const router = useRouter()
  const { pid } = router.query

  // get the course data with the id on pid.
  
  const [course, setCourse] = useState({})

  useEffect(() => {
    const info = axios.get(`${process.env.API_URL}/infoCourse/${pid}`)

    info.then(res => {
      setCourse(res.data[0])
    }).catch(err => {
      console.log(err)
    })

  }, [pid])

  return(
  <div>
    <Header />
  <div className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Ecapacitação</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {course.title}
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500">
          {course.desc}
        </p>
        </div>

      <div className="mt-10">
        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
         
            <div key={course.name} className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <CodeIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{course.name}</p>
              </dt>
              <dd className="mt-2 ml-16 text-base text-gray-500">{course.desc}</dd>
            </div>

        </dl>
      </div>

      
    </div>
  </div>
  </div>
)
}




export default Course