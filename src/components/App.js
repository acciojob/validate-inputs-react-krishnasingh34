
import React, { useState } from 'react'
import './../styles/App.css';

const App = () => {
  const [user, setUser] = useState({
    name: '',
    address: '',
    email: '',
    mobile: ''
  })

  const [errorName, setErrorName] = useState("")
  const [errorAdd, setErrorAdd] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorMobile, setErrorMobile] = useState("")

  let { name, address, email, mobile } = user

  function updateFields(e) {
    let key = e.target.name
    let value = e.target.value
    setUser({ ...user, [key]: value })
    // Clear errors while typing
    if (key === 'name') setErrorName('')
    if (key === 'address') setErrorAdd('')
    if (key === 'email') setErrorEmail('')
    if (key === 'mobile') setErrorMobile('')
  }
  function handleSubmit(e) {
    e.preventDefault()
    // Reset all errors first
    setErrorName('')
    setErrorAdd('')
    setErrorEmail('')
    setErrorMobile('')
    let isValid = true

    for (let i = 0; i < name.length; i++) {
      const charCode = name.charCodeAt(i)
      if (
        !(charCode >= 65 && charCode <= 90) &&
        !(charCode >= 97 && charCode <= 122) &&
        name[i] !== ' '
      ) {
        setErrorName("Name should contain only letters")
        isValid = false
        break
      }
    }
    let specialChars = "!@#$%^&*()_+=[]{}|\\/:;\"'<>?~`"
    for (let i = 0; i < address.length; i++) {
      if (specialChars.includes(address[i])) {
        setErrorAdd("Address should not contain special characters")
        isValid = false
        break
      }
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setErrorEmail("Email should contain @ and .com")
      isValid = false
    }
    if (mobile.length > 10) {
      setErrorMobile("Mobile number should not be more than 10 characters")
      isValid = false
    }
     // Only reset form if validation passes
    if (isValid) {
      setUser({
        name: '',
        address: '',
        email: '',
        mobile: ''
      });
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name='name' value={name} 
          onChange={updateFields} />
        {errorName && <p className='errorMessage' style={{ color: 'red' }}>{errorName}</p>}

        <label>Address</label>
        <input type="text" name='address' value={address}
          onChange={updateFields} />
        {errorAdd && <p className='errorMessage' style={{ color: 'red' }}>{errorAdd}</p>}

        <label>Email</label>
        <input type="text" name='email' value={email}
          onChange={updateFields} />
        {errorEmail && <p className='errorMessage' style={{ color: 'red' }}>{errorEmail}</p>}

        <label>Mobile</label>
        <input type="text" name='mobile' value={mobile}
          onChange={updateFields} />
        {errorMobile && <p className='errorMessage' style={{ color: 'red' }}>{errorMobile}</p>}
        <button>Submit</button>
      </form>
    </div>
  )
}

export default App