import React, { useContext, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Link,useNavigate } from 'react-router-dom'
import { useUserAuth } from '../context/UserAuthContext'

export default function PhoneSignup() {
    const [number, setNumber] = useState("")
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(false)
    const [otp, setOtp] = useState("")
    const [confirmObj, setConfirmObj] = useState("")
const {setUpRecaptcha}=useUserAuth()
const navigate=useNavigate()

    const getOtp=async(e)=>{
        setError("")
e.preventDefault()
if (number==="" || number===undefined) return setError("Please enter a valid phone number")
try {
    const response= await setUpRecaptcha(number)
    console.log(response);
    setConfirmObj(response)
    setFlag(true)
} catch (error) {
    setError(error.message)
}
    }

    // Verify OTP
    const verifyOtp=async(e)=>{
        e.preventDefault()
        if (otp==="" || otp===undefined) return;
try {
    setError("")
    await confirmObj.confirm(otp)
navigate("/home")
    
   
} catch (error) {
    setError(error.message)
}
    }
  return (
    <div>
        <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Phone Auth</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{display:!flag ? "block" :"none"}}>
          <Form.Group className="mb-3" controlId="formBasicPhonenum">
            <PhoneInput
            defaultCountry='IN'
            value={number}
            onChange={setNumber}
            placeholder="Enter phone number"
            />
            <div id="recaptcha-container" className='mt-2'/>
          </Form.Group>
          <div className='button-right'>
            <Link to="/" className="text-decoration-none">
            <Button variant='secondary'>Cancel</Button>&nbsp;
            </Link>
            <Button variant='primary' type='submit'>Send OTP</Button>
          </div>
          </Form>

          <Form onSubmit={verifyOtp} style={{display:flag ? "block" :"none"}}>
          <Form.Group className="mb-3 mt-3" controlId="formBasicOtp">
            <Form.Control 
            type='text' 
            placeholder='Enter OTP'
             onChange={e=>setOtp(e.target.value)}>

            </Form.Control>
          </Form.Group>
          <div className='button-right'>
            <Link to="/">
            <Button variant='secondary'>Cancel</Button>&nbsp;
            </Link>
            <Button variant='primary' type='submit'>Verify OTP</Button>
          </div>
          </Form>
          </div>
          </>
    </div>
  )
}
