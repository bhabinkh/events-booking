import React, { useState, useRef, useEffect } from 'react'
import Backdrop from '../components/Backdrop/Backdrop'
import Modal from '../components/Modal/Modal'
import handleFetch from '../helpers/handleFetch'
import EventItem from './EventItem'
import './Events.css'


export default function Events() {

    const token = localStorage.getItem('token')

    const titleElRef = useRef()
    const descElRef = useRef()
    const priceElRef = useRef()
    const dateElRef = useRef()

    const [creating, setCreating] = useState(false)
    const [events, setEvents] = useState([])

    const handleShareEvents = () => {
        setCreating(true)
    }

    const handleClick = () => {
        console.log(events.events[0].title)
    }

    const handleCancel = () => {
        setCreating(false)

    }

    const handleConfirm = async () => {
        setCreating(false)

        const title = titleElRef.current.value.trim()
        const description = descElRef.current.value.trim()
        const price = +priceElRef.current.value
        const date = dateElRef.current.value

        if (title.length === 0 || description.length === 0 || price <= 0) {
            return
        }

        let requestBody = {
            query: `
            mutation {
                createEvent(eventInput:{title: "${title}", description: "${description}", price:${price}, date:"${date}"}) {
                  _id
                    title
                    description
                    date
                    price
                    creator {
                      _id
                      email
                    }
                  }
              }

            `
        };
        const event = await handleFetch(requestBody, token)
        console.log(event)
    }
    const handleBackdropClick = () => {
        setCreating(false)
    }
    const fetchEvents = async () => {
        let requestBody = {
            query: `
            query {
                events {
                  _id
                    title
                    description
                    date
                    price
                    creator {
                      _id
                      email
                    }
                  }
              }

            `
        };
        const data = await handleFetch(requestBody)
        setEvents(data.data.events)
        console.log(data.data.events)
    }
    useEffect(() => {
        fetchEvents()
    }, [handleConfirm])

    return (
        <React.Fragment>
            {token && creating && <Backdrop onBackdropClick={handleBackdropClick}></Backdrop>}
            {token && creating && <Modal title="Add Event" canCancel canConfirm onCancel={handleCancel} onConfirm={handleConfirm} >
                <form className='events-form'>
                    <div className='form-control'>
                        <label htmlFor='title'>Title</label>
                        <input type="text" id="title" ref={titleElRef} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='description'>Description</label>
                        <textarea type="text" id="desc" rows="4" ref={descElRef} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='date'>Date</label>
                        <input type="datetime-local" id="date" ref={dateElRef} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='price'>Price</label>
                        <input type="number" id="price" ref={priceElRef} />
                    </div>

                </form>
            </Modal>}
            {events.map(event => {
                return (
                    <EventItem key={event._id} {...event} />
                );
            })}

            {token && !creating && <div className='events-control'>
                <p>Share your events</p>
                {token && <button className='btn btn-contained' onClick={handleShareEvents}>Create Events</button>}
            </div>}
        </React.Fragment>
    )
}
