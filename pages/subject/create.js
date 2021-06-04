import { useState } from 'react'
import { gql } from "@apollo/client";
import { client } from "../../apollo-client";

export default function CreateStudent() {

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
        console.log(data.createSubject);
    }

    return (
        <div className="container">
            <div className="card shadow">
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
