import React, {useEffect, useState} from 'react'
import { listPendingProduct, updateStatusApproved, updateStatusRejected } from '../services/ProductService';

function ListPendingProductComponent() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts();
     }, [])
 
     function getAllProducts() {
        listPendingProduct().then((response) => {
             setProducts(response.data.data);
         }).catch(error => {
             console.log(error);
         })
     }

     function statusApproved(id) {
        console.log(id)

        updateStatusApproved(id).then((response) => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        })
    }

    function statusRejected(id) {
        console.log(id)

        updateStatusRejected(id).then((response) => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <br /> <br />
            <h2 className='text-center'>List Pending Product</h2>
            <br /> <br />
            <table className='table table-striped table-bordere'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product => 
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.status}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => statusApproved(product.id)}>Approve</button>
                                    <button className='btn btn-danger' onClick={() => statusRejected(product.id)} style={{marginLeft: '10px'}}>Reject</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      )
}

export default ListPendingProductComponent