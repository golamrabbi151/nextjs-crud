import Head from 'next/head'
import { useState } from 'react'
import { from, gql } from "@apollo/client";
import { client } from "../../apollo-client";
import { useRouter } from 'next/router'

export default function CreateStudent() {

    const router = useRouter()
    const [name, setName] = useState()

    const createSubject = async (e) => {
        e.preventDefault()
        const subjectInfo = {
            name
        }
        console.log(subjectInfo)
        const { errors, data } = await client.mutate({
            mutation: gql`
        mutation ($input: CreateSubjectInput!) {
            createSubject(input: $input) {
            name
          }
        }
      `,
            variables: {
                input: subjectInfo
            }
        });

        router.push("/subject/")
    }

    return (
        <div className="container mt-3">

            <Head>
                <title>CRUD App (nextJs) </title>
                <meta name="description" content="Create Subject" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="card shadow-sm">
                <div className="card-header">Create Subject</div>
                <div className="card-body">
                    <form onSubmit={createSubject}>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder="Enter name" name="name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary rounded mt-2">Create</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
