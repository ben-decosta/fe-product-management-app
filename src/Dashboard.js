import React from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const navigator = useNavigate();

    function listProducts() {
        navigator('/products')
    }

    function listPendingProducts() {
        navigator('/pending-products')
    }

  return (
    <div className='container'>
        <br /> <br />
        <h2 className='text-center'>Masuk Sebagai</h2>
        <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-info" type="button" onClick={() => listProducts()}>User</button>
            <button className="btn btn-primary" type="button" onClick={() => listPendingProducts()}>Admin</button>
        </div>
    </div>
  )
}

export default Dashboard