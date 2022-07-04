import React from 'react'
import './Modal.css'

export default function Modal(props) {
    return (
        <div className='modal'>
            <header className='modal__header'><p>{props.title}</p></header>
            <section className='modal__content'>{props.children}</section>
            <section className='modal__actions'>
                {props.canCancel && (<button className='btn btn-outlined' onClick={props.onCancel}>Cancel</button>)}
                {props.canConfirm && (<button className='btn btn-contained' onClick={props.onConfirm}>Confirm</button>)}
            </section>
        </div>
    )
}
