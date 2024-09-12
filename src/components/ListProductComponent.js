import React, {useEffect, useState} from 'react'
import { deleteProduct, listProduct } from '../services/ProductService'
import { useNavigate } from 'react-router-dom'

const ListProductComponent = () => {

    const [products, setProducts] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
       getAllProducts();
    }, [])

    function getAllProducts() {
        listProduct().then((response) => {
            setProducts(response.data.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function addNewProduct() {
        navigator('/add-product')
    }

    function editProduct(id) {
        navigator(`/update-product/${id}`)
    }

    function removeProduct(id) {
        console.log(id)

        deleteProduct(id).then((response) => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <br /> <br />
        <h2 className='text-center'>List Product</h2>
        <button className='btn btn-primary mb-2' onClick={addNewProduct}>Add Product</button>
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
                                <button className='btn btn-info' onClick={() => editProduct(product.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeProduct(product.id)} style={{marginLeft: '10px'}}>Remove</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListProductComponent