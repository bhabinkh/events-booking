import React, { useRef } from 'react'
import handleFetch from '../helpers/handleFetch'
import './Auth.css'

export default function Auth() {

    const emailEl = useRef()
    const passwordEl = useRef()

    const emailPassword = () => {
        const email = emailEl.current.value
        const password = passwordEl.current.value
        if (email.trim().length === 0 || password.trim().length === 0) {
            return
        }
        return { email, password }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const { email, password } = emailPassword()
        let requestBody = {
            query: `
              query {
                login(email: "${email}", password: "${password}") {
                  userId
                  token
                  tokenExpiration
                }
              }
            `
        };
        const user = await handleFetch(requestBody)
        console.log(user)
        // localStorage.clear()
        localStorage.setItem('userId', user.data.login.userId)
        localStorage.setItem('token', user.data.login.token)
        // context.login(user.data.login.userId, user.data.login.token, user.data.login.tokenExpiration)
    }
    const handleSignup = async (event) => {
        event.preventDefault()
        const { email, password } = emailPassword()
        let requestBody = {
            query: `
              mutation {
                createUser(userInput: {email: "${email}", password: "${password}"}) {
                  _id
                  email
                }
              }
            `
        };
        const user = await handleFetch(requestBody)
        console.log(user)
    }
    return (
        <form className='auth-form' onSubmit={handleLogin}>
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
                <button className='btn btn-outlined' type='button' onClick={handleSignup}>Signup</button>
            </div>
        </form>
    )
}
