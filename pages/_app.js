import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.css"
import "../styles/custom.css"
import { Fragment } from 'react'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <Fragment>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <div className="p-2 bd-highlight"><a onClick={()=>router.push("/")} className="btn btn-light rounded border nav-button active">Home</a></div>
            <div className="p-2 bd-highlight"><a onClick={()=>router.push("/student")} className="btn btn-light rounded border nav-button ">Create Student</a></div>
            <div className="p-2 bd-highlight"><a onClick={()=>router.push("/subject")} className="btn btn-light rounded border nav-button ">Subjects</a></div>
            <div className="p-2 bd-highlight"><a onClick={()=>router.push("/subject/create")} className="btn btn-light rounded border nav-button ">Add Subject</a></div>
          </div>
        </div>
      </div>

      <Component {...pageProps} />
    </Fragment>

  )
}

export default MyApp
