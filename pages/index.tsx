import React from 'react'
import { gql, useQuery } from '@apollo/client'

const Home = () => {
  const GET_USERS = gql`
    query Query {
      users {
        id
        firstname
        lastname
        email
        dateCreated
        dateUpdated
      }
    }
  `

  const { data, loading, error } = useQuery(GET_USERS)

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>

  return (
    <div>
      <h1>Data</h1>
      <h2>Queried Users</h2>
      <hr />
      {data.users.map((user: any, index: any) => (
        <div key={index}>
          <p>firstname: {user.firstname}</p>
          <p>lastname: {user.lastname}</p>
          <p>email: {user.email}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Home
