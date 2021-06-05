import { useState, useEffect } from 'react'
import Head from 'next/head'
import { gql } from "@apollo/client";
import { client } from "../../../apollo-client";
import { GET_ALL_SUBJECT } from "../../api/query"

export default function UpdateStudent() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [dob, setDob] = useState()
    const [subject, setSubject] = useState([])
    const [id, setId] = useState()
    const [subjectsList, setSubjectsList] = useState([])

    const getSudentData = async () => {
        const studentData = await JSON.parse(sessionStorage.getItem("studentData"))
        if (studentData) {
            setId(studentData.id)
            setName(studentData.name)
            setEmail(studentData.email)
            setPhone(studentData.phone)
            setDob(studentData.dob)
            setSubject(studentData.subject)
        }
    }

    const getSubjectData = async () => {
        const { data } = await client.query({ query: GET_ALL_SUBJECT })

        setSubjectsList(data.subjects)

    }

    const updateStudent = async (e) => {
        e.preventDefault()
        const studentInfo = {
            name,
            email,
            phone,
            dob,
            subject: subject
        }
        console.log(studentInfo)
        const { errors, data } = await client.mutate({
            mutation: gql`
                mutation updateStudent ($id: ID!, $input: UpdateStudentInput!) {
                    updateStudent (id: $id, input: $input) {
                        id
                        name
                        email
                        phone
                        dob
                        subject
                    }
                }
          `,
            variables: {
                id: id,
                input: studentInfo
            }
        });
        console.log(data.updateStudent)
        
    }

    useEffect(() => {
        getSudentData()
        getSubjectData()
    }, [])
    return (

        <div className="container">
            <Head>
                <title>CRUD App (nextJs) </title>
                <meta name="description" content="Edit Student" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="card mt-2">
                <div className="card-body">
                    <form onSubmit={updateStudent}>
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control" placeholder="Enter name" value={name} name="name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={email} name="email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label >Phone</label>
                            <input type="text" className="form-control" placeholder="Phone number" value={phone} name="phone"
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Date of Birth</label>
                            <input type="date" className="form-control" placeholder="Date of Birth" value={dob} name="dob"
                                onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label >Subject</label>

                            <select id="inputState" class="form-control" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                                <option selected >{subject}</option>
                                {
                                    subjectsList.map((subject, i) => (
                                        <option value={subject.name}>{subject.name}</option>
                                    ))
                                }

                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary rounded mt-2">Update</button>

                    </form>

                </div>
            </div>
        </div>
    )
}
