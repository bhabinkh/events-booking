import React from 'react'
import './EventItem.css'
export default function EventItem(props) {
    const { _id, title, description, price, date, creator } = props
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
                <p className='event__caption'>{creator.email}, {date}</p>
            </header>
            <p className='event__description'>{description}
            </p>
            <section className='modal__actions'>
                <button className='btn btn-outlined' onClick={props.bookEvent}>Book Event</button>
            </section>
        </div>
    )
}
