import Head from 'next/head'
import { GET_ALL_STUDENT } from "./api/query"
import { client } from "../apollo-client";
import { useRouter } from 'next/router'
export default function Home({ studentList }) {
  const router = useRouter()
  const getId = async (e) => {
    const id = e.target.value
    let studentData = studentList.filter(student => student.id === id)

    localStorage.setItem('studentData', JSON.stringify(studentData))
    router.push(`student/edit/${id}`)
  }

  return (
    <div className="container">
      <Head>
        <title>CRUD App (nextJs) </title>
        <meta name="description" content="Gain Solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="container mt-2">
        <div className="card shadow-sm">
          <div>

          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Dob</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    studentList.map((student, i) => (
                      <tr key={student.id}>
                        <th scope="row">{++i}</th>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>{student.dob}</td>
                        <td>{student.subject + "  "}</td>
                        <td>
                          <button className="btn btn-primary rounded" onClick={getId} value={student.id}>edit</button>
                          <button className="btn btn-danger rounded">delete</button>
                        </td>
                      </tr>
                    ))

                  }

                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>


    </div>
  )
}


export async function getStaticProps() {
  const { data } = await client.query({ query: GET_ALL_STUDENT })
  return {
    props: {
      studentList: data.students
    }
  }
}