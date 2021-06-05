import Head from 'next/head'
import { GET_ALL_SUBJECT } from "../api/query"
import { client } from "../../apollo-client";
import { gql } from "@apollo/client";
import { useRouter } from 'next/router'
export default function Home({ subjectsList }) {
    const router = useRouter()
    const getId = async (e) => {
        const id = e.target.value
        console.log(id);
        let subjectData = subjectsList.find(subject => subject.id === id)
        console.log(subjectData);
        sessionStorage.setItem("subjectData", JSON.stringify(subjectData))
        router.push(`subject/edit/${id}`)
    }

    const deleteById = async (e) =>{
        const sid = e.target.value
        console.log(sid);
        const { errors, data } = await client.mutate({
          mutation: gql`
          mutation deleteSubject ($id: ID!) {
            deleteSubject (id: $id) {
                id
            }
        }
    `,
          variables: {
              id: sid
          }
      })

      console.log(data.deleteSubject)
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
                <div className="card shadow-sm ">
                    <div className="card-header">All Subject</div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col" style={{width:"20%"}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subjectsList.map((subject, i) => (
                                            <tr key={subject.id}>
                                                <th scope="row">{++i}</th>
                                                <td>{subject.name}</td>
                                                <td>
                                                    <button className="btn btn-primary rounded" onClick={getId} value={subject.id}>edit</button>
                                                    <button className="btn btn-danger rounded" onClick={deleteById} value={subject.id} style={{marginLeft:"2px"}}>delete</button>
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
    const { data } = await client.query({ query: GET_ALL_SUBJECT })
    return {
        props: {
            subjectsList: data.subjects
        }
    }
}