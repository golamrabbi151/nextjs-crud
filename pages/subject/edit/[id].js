import { useState, useEffect } from 'react'
import Head from 'next/head'
import { gql } from "@apollo/client";
import { client } from "../../../apollo-client";

export default function UpdateStudent() {

    const [name, setName] = useState()
    const [id, setId] = useState()

    const getSubjectData = async () => {
        const subjectData = await JSON.parse(sessionStorage.getItem("subjectData"))
        if (subjectData) {
            setId(subjectData.id)
            setName(subjectData.name)

        }
    }

    const updateSubject = async (e) => {
        e.preventDefault()
        const subjectInfo = {
            name
        }
        console.log(subjectInfo)
        const { errors, data } = await client.mutate({
            mutation: gql`
            mutation updateSubject ($id: ID!, $input: UpdateSubjectInput!) {
                updateSubject (id: $id, input: $input) {
                    id
                    name
                }
            }
      `,
            variables: {
                id: id,
                input: subjectInfo
            }
        })

        window.location.reload()

    }

    useState(() => {
        getSubjectData()
    }, [])

    return (
        <div className="container">
            <Head>
                <title>CRUD App (nextJs) </title>
                <meta name="description" content="Edit Subject Subject" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="card mt-2">
                <div className="card-body">
                    <form onSubmit={updateSubject}>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder="Enter name" defaultValue={name} name="name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary rounded mt-2">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
