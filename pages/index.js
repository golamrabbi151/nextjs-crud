import Head from 'next/head'
import { GET_ALL_STUDENT } from "./api/query"
import { client } from "../apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from 'next/router'
export default function Home({ studentList }) {
  const router = useRouter()

  const getId =  async(e) => {
    const id = e.target.value
    console.log(id);
    let studentData = await studentList.find(student => student.id === id)
    sessionStorage.setItem("studentData", JSON.stringify(studentData))
    
    router.push(`student/edit/${id}`)
  }

  const deleteById = async (e) =>{
    const sid = e.target.value
    const { errors, data } = await client.mutate({
      mutation: gql`
      mutation deleteStudent ($id: ID!) {
        deleteStudent (id: $id) {
            id
        }
    }
`,
      variables: {
          id: sid
      }
  })
    window.location.reload();

  }


  return (
    <div className="container">
      <Head>
        <title>CRUD App (nextJs) </title>
        <meta name="description" content="Gain Solutions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-3">
        <div className="card shadow-sm">
          <div className="card-header">Students List</div>
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
                          <button className="btn btn-primary rounded shadow " onClick={getId} value={student.id} >edit</button>
                          <button className="btn btn-danger rounded shadow "  onClick={deleteById} value={student.id} style={{marginLeft:"2px"}}>delete</button>
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


export async function getServerSideProps() {
  const { data } = await client.query({ query: GET_ALL_STUDENT })
  return {
    props: {
      studentList: data.students
    }
  }
}