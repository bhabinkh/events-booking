import React, { useState, useRef } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import Backdrop from '../components/Backdrop/Backdrop'
import Modal from '../components/Modal/Modal'
import EventItem from './EventItem'
import './Events.css'

export default function Events() {

    const token = localStorage.getItem('token')

    const titleElRef = useRef()
    const descElRef = useRef()
    const priceElRef = useRef()
    const dateElRef = useRef()

    const [creating, setCreating] = useState(false)

    const GET_EVENTS = gql`
        query GetEvents {
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
        `;

    const CREATE_EVENT = gql`
        mutation CreateEvent($title: String!, $description:String!, $price: Float!, $date:String!) {
            createEvent(eventInput:{title: $title, description:$description, price: $price, date:$date}) {
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
    `;

    const BOOK_EVENT = gql`
    mutation BookEvent($eventId: ID!) {
        bookEvent(eventId: $eventId) {
            _id
            event{
                _id
                title
                description
                date
                price
            }
            user {
                _id
                email
            }
            
        }
    }
`;

    const { loading, error, data } = useQuery(GET_EVENTS)
    const [handleAddEvent, { loading: addEventLoading, error: addEventError, data: addEventData }] = useMutation(CREATE_EVENT)
    const [handleBookEvent, { loading: bookEventLoading, error: bookEventError, data: bookEventData }] = useMutation(BOOK_EVENT)

    if (loading || addEventLoading || bookEventLoading) {
        return <p>Loading...</p>
    }
    if (error || addEventError || bookEventError) {
        return <p>Error: {error || addEventError || bookEventError}</p>
    }
    if (data || addEventData || bookEventData) {
        console.log(data || addEventData || bookEventData)
    }

    const handleShareEvents = () => {
        setCreating(true)
    }

    const handleCancel = () => {
        setCreating(false)

    }
    const handleBackdropClick = () => {
        setCreating(false)
    }
    return (
        <React.Fragment>
            {token && creating && <Backdrop onBackdropClick={handleBackdropClick}></Backdrop>}
            {token && creating && <Modal title="Add Event" canCancel canConfirm onCancel={handleCancel} onConfirm={() => {
                setCreating(false);
                handleAddEvent({ variables: { title: titleElRef.current.value.trim(), description: descElRef.current.value.trim(), price: +priceElRef.current.value, date: dateElRef.current.value } })
            }} >
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
            {data.events.map(event => {
                return (
                    <EventItem key={event._id} {...event} bookEvent={() => handleBookEvent({ variables: { eventId: event._id } })} />
                );
            })}

            {token && !creating && <div className='events-control'>
                <p>Share your events</p>
                {token && <button className='btn btn-contained' onClick={handleShareEvents}>Create Events</button>}
            </div>}
        </React.Fragment>
    )
}
