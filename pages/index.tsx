import React from 'react'
import {
  useCreateMutation,
  useDeleteMutation,
  useUpdateMutation,
  useUsersQuery,
} from '../generated/graphql'

import { Formik } from 'formik'

const Home = () => {
  const { loading, error, data } = useUsersQuery()
  const [createMutation] = useCreateMutation()
  const [deleteMutation] = useDeleteMutation()
  const [updateMutation] = useUpdateMutation()
  const [msg, setMsg] = React.useState('')

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>Error!</h1>

  const remove = async (id: string) => {
    const { data, errors } = await deleteMutation({ variables: { id } })
    if (errors) {
      setMsg(`Unable to remove ${data?.delete.firstname}`)
    }
    setMsg(`${data?.delete.firstname} has been remove`)
  }

  const update = async (id: string, user: any) => {
    const { data, errors } = await updateMutation({
      variables: { id, payload: { ...user } },
    })
    if (errors) {
      setMsg(`Unable to update ${data?.update.firstname}!`)
    }
    setMsg(`${data?.update.firstname} has been updated!`)
  }

  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            const { data } = await createMutation({
              variables: { payload: values },
            })
            if (error) setMsg("There's a problem inserting new user")
            setMsg(`${data?.create.firstname} has been added`)
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor={'firstname'}>Firstname</label>
                <br />
                <input
                  type={'text'}
                  name={'firstname'}
                  value={values.firstname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor={'lastname'}>Lastname</label>
                <br />
                <input
                  type={'text'}
                  name={'lastname'}
                  value={values.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor={'email'}>Email address</label>
                <br />
                <input
                  type={'email'}
                  name={'email'}
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor={'password'}>Password</label>
                <br />
                <input
                  type={'password'}
                  name={'password'}
                  value={values.password}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button type={'submit'} disabled={isSubmitting}>
                Register
              </button>
            </form>
          )}
        </Formik>
        <strong>{msg}</strong>
        <h1>Data</h1>
        <p>
          To test our update mutation we only change the firstname of the
          subject to <strong>"Updated Firstname"</strong>.
        </p>
        <br />
        <h2>Queried Users</h2>
        <hr />
        {data?.users.map((user, index) => (
          <div key={index}>
            <p>id: {user.id}</p>
            <p>firstname: {user.firstname}</p>
            <p>lastname: {user.lastname}</p>
            <p>email: {user.email}</p>
            <button onClick={() => remove(user.id)}>Remove</button>
            <button
              onClick={() =>
                update(user.id, { firstname: 'Updated Firstname' })
              }
            >
              Update
            </button>
            <hr />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
