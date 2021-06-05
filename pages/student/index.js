import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { gql } from "@apollo/client";
import { client } from "../../apollo-client";
import { GET_ALL_SUBJECT } from "../api/query"

// import { colourOptions } from '../data';

export default function CreateStudent({ subjectsList }) {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [dob, setDob] = useState()
    const [subject, setSubject] = useState([])
    const [myOption, setMyOption] = useState([])

    const createNewStudent = async (e) => {
        e.preventDefault()
        const studentInfo = {
            name,
            email,
            phone,
            dob,
            subject: [subject]
        }
        console.log(studentInfo)
        const { errors, data } = await client.mutate({
            mutation: gql`
        mutation ($input: CreateStudentInput!) {
          createStudent(input: $input) {
            name email
          }
        }
      `,
            variables: {
                input: studentInfo
            }
        });
       window.location.reload()
    }
 
    return (
        <div className="container mt-3">
              <Head>
                <title>CRUD App (nextJs) </title>
                <meta name="description" content="Create Student" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="card">
            <div className="card-header ">Create Student</div>
                <div className="card-body">
                    <form onSubmit={createNewStudent}>

                        <div className="form-group pt-2">
                            <small >Name</small>
                            <input type="text" className="form-control" placeholder="Enter name" name="name"
                                onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group pt-2">
                            <small >Email address</small>
                            <input type="email" className="form-control" placeholder="Enter email" name="email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group pt-2">
                            <small >Phone</small>
                            <input type="text" className="form-control" placeholder="Phone number" name="phone"
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group pt-2">
                            <small >Date of Birth</small>
                            <input type="date" className="form-control"  name="dob"
                                onChange={(e) => setDob(e.target.value)} />
                        </div>
                        <div className="from-group pt-2">
                            <small >Subjects</small>
                            <select id="inputState" className="form-control" onChange={(e) => setSubject(e.target.value)}>
                                <option selected>Choose...</option>
                                {
                                    subjectsList.map((subject, i) => (
                                        <option value={subject.name}>{subject.name}</option>
                                    ))
                                }

                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary rounded mt-2">Create</button>

                    </form>
                </div>
            </div>
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
