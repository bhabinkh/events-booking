import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import BookingEventItem from './BookingEventItem'
import './Events.css'

export default function Bookings() {

    const token = localStorage.getItem('token')

    const GET_BOOKINGS = gql`
        query GetBookings {
            bookings {
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

    const CANCEL_BOOKING = gql`
        mutation CancelBooking($bookingId: ID!) {
            cancelBooking(bookingId: $bookingId) {
                
                _id
                title
                description
                date
                price
               
            }
        }
    `;

    const { loading, error, data } = useQuery(GET_BOOKINGS)
    const [handleCancelBooking, { loading: cancelBookingLoading, error: cancelBookingError, data: cancelBookingData }] = useMutation(CANCEL_BOOKING)

    if (loading || cancelBookingLoading) {
        return <p>Loading...</p>
    }
    if (error || cancelBookingError) {
        return <p>Error</p>
    }
    if (data || cancelBookingData) {
        console.log(data, cancelBookingData)
    }
    return (
        <React.Fragment>
            {token && data.bookings.map(booking => {
                return (
                    <BookingEventItem key={booking._id} {...booking} cancelBooking={() => handleCancelBooking({ variables: { bookingId: booking._id } })} />
                );
            })}
        </React.Fragment>
    )
}
