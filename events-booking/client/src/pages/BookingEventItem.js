import React from 'react'
import './EventItem.css'
export default function EventItem(props) {
    const { _id, event, user } = props
    const { title, description, price, date } = event
    console.log(_id, title, description)
    return (
        // <div></div>
        <div className='event__item'>
            <header>
                <div className='event__header'>
                    <div>
                        <h3 className='event__title'> {title}</h3>
                    </div>
                    <div>
                        <h4
                            className='event__price'>Nrs. {price}
                        </h4>
                    </div>
                </div>
                <p className='event__caption'>{user.email}, {date}</p>
            </header>
            <p className='event__description'>{description}
            </p>
            <section className='modal__actions'>
                <button className='btn btn-outlined' onClick={props.cancelBooking}>Cancel Booking</button>
            </section>
        </div>
    )
}
