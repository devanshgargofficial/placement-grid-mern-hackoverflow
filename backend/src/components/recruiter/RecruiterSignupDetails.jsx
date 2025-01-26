import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";

function RecruiterSignupDetails() {
    const navigate = useNavigate();
  return (
    <div>
        <form method="post">
            <label htmlFor="company name">
                name:
                <input type="text" />
            </label>
            <br />
            <label htmlFor="Logo">
                logo:
                <input type="text" />
            </label>
            <br />
            <label htmlFor="Adress">
                address:
                <input type="text" placeholder='Address' />
            </label>
        </form>
        <button onClick={() => navigate("/recruiter/dashboard")}>Submit Details</button>
      
    </div>
  )
}

export default RecruiterSignupDetails
