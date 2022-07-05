import React, { useRef } from 'react'
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import './Auth.css'

export default function Auth() {

    const emailEl = useRef()
    const passwordEl = useRef()

    const GET_USER = gql`
        query GetUser($email: String!, $password:String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            }
        }
        `;

    const CREATE_USER = gql`
        mutation CreateUser($email: String!, $password:String!) {
        createUser(userInput:{email: $email, password: $password}) {
            _id
            email
            }
        }
    `;
    const [handleLogin, { loading, error, data }] = useLazyQuery(GET_USER)
    const [handleSignup, { loading: signupLoading, error: signupError, data: signupData }] = useMutation(CREATE_USER)

    if (loading || signupLoading) {
        return <p>Loading...</p>
    }
    if (error || signupError) {
        return <p>Error: {error || signupError}</p>
    }

    if (data) {
        let today = new Date()
        let expiryDate = today.getTime() + 30 * 24 * 60 * 60 * 1000
        console.log(data)

        localStorage.clear()
        localStorage.setItem('userId', data.login.userId)
        localStorage.setItem('token', data.login.token)
        localStorage.setItem('expiryDate', expiryDate)
    }
    if (signupData) {
        localStorage.clear()
        localStorage.setItem('userId', signupData.createUser._id)
        localStorage.setItem('email', signupData.createUser.email)

    }
    return (
        <form className='auth-form' onSubmit={() =>
            handleLogin({ variables: { email: emailEl.current.value.trim(), password: passwordEl.current.value.trim() } })
        }
        >
            <div className='form-control'>
                <label htmlFor='email'>E-mail</label>
                <input type="email" id="email" ref={emailEl} />
            </div>
            <div className='form-control'>
                <label htmlFor='password'>Password</label>
                <input type="password" id="password" ref={passwordEl} />
            </div>
            <div className='form-actions'>
                <button className='btn btn-contained' type="submit">Login</button>
                <button className='btn btn-outlined' type='button' onClick={() =>
                    handleSignup({ variables: { email: emailEl.current.value.trim(), password: passwordEl.current.value.trim() } })
                }>Signup</button>
            </div>
        </form>
    )
}
