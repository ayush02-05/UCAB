Build a modern responsive frontend web application for a Cab Booking System called "UCab" using React.js.
The frontend should be built with React, React Router, Axios (for future API integration), and Bootstrap or Tailwind CSS for styling.

The application should focus only on frontend UI and state management, and must not implement backend logic. Instead, use mock data and dummy APIs where needed.

The UI should be clean, modern, and mobile responsive, similar to apps like Uber or Ola.

Required Pages

Create the following pages:

Landing Page

App introduction

Navbar with Login and Register buttons

Hero section with "Book a Ride"

Features of UCab

Footer

User Login Page

Email and password fields

Login button

Link to Register

User Registration Page

First name

Last name

Email

Password

Confirm password

Register button

Driver Registration Page

Driver name

Email

Password

Vehicle type

Vehicle number

Phone number

Dashboard / Home Page

Welcome message

Search for pickup location

Search for drop location

Button: Find Cabs

Available Cabs Page

Show list of nearby cabs

Each cab card should display:

Driver name

Vehicle type

Estimated fare

Estimated arrival time

Book Ride button

Ride Tracking Page

Show ride details

Pickup location

Drop location

Driver info

Cab details

Map placeholder (Google Maps placeholder div)

Ride status (Driver arriving, Ride started, Ride completed)

Booking History Page

Table or cards showing:

Ride date

Pickup

Drop

Fare

Status

Payment Page

Fare summary

Payment method selection

Pay Now button

Payment success message

Components to Create

Build reusable React components:

Navbar

Footer

CabCard

RideCard

BookingForm

LocationInput

PaymentCard

Routing

Use React Router to manage routes:

/
/login
/register
/driver-register
/dashboard
/cabs
/ride-tracking
/history
/payment
State Management

Use React useState and useContext for:

User authentication state

Selected ride

Cab booking details

Ride status

Styling

Use Bootstrap or Tailwind CSS

Mobile responsive layout

Clean card-based UI

Modern booking interface similar to Uber/Ola

Mock Data

Use dummy data for:

Available cabs

Drivers

Ride history

Payment confirmation

Folder Structure
src/
 components/
 pages/
 context/
 services/
 assets/
 App.js
 main.jsx
Expected Result

A fully functional React frontend UI for UCab that allows users to:

Register/Login

Search pickup and drop locations

View available cabs

Book a ride

Track ride status

View booking history

Simulate payment

All interactions should be simulated using frontend state and mock data, without a backend.