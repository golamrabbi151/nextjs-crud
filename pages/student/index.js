import { useState } from 'react'
import { gql } from "@apollo/client";
import {client} from "../../apollo-client";

export default function CreateStudent() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [dob, setDob] = useState()
    const [subject, setSubject] = useState([])

    const createStudent = async (e) => {
        e.preventDefault()
        const studentInfo = {
            name,
            email,
            phone,
            dob,
            subject:[subject]
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
                // {
                //     name: "Dadu",
                //     email: "dadu@kodu.com",
                //     phone: "01710000000",
                //     dob: "dadu",
                //     subject: ["Bangla"]
                // }
            }
        });
        console.log(data.createStudent);
    }

    return (
        <div className="container">

            <form onSubmit={createStudent}>

                <div className="form-group">
                    <label >Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="name"
                        onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label >Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label >Phone</label>
                    <input type="text" className="form-control" placeholder="Phone number" name="phone"
                        onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Date of Birth</label>
                    <input type="text" className="form-control" placeholder="Date of Birth" name="dob"
                        onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="form-group">
                    <label >Subject</label>
                    <input type="text" className="form-control" placeholder="Phone Subject" name="subject"
                        onChange={(e) => setSubject(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary rounded mt-2">Create</button>

            </form>







        </div>
    )
}
