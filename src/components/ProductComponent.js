import React, { useEffect, useState} from 'react'
import { addProduct, getProductById, updateProduct } from '../services/ProductService'
import { useNavigate, useParams } from 'react-router-dom'

const ProductComponent = () => {

    const [name, setName] = useState('');
    const [input_price, setPrice] = useState('0');
    const [description, setDescription] = useState('');

    const {id} = useParams();
    const [errors, setError] = useState({
        name: '',
        input_price: '',
    })

    const navigator = useNavigate();

    const handleName = (e) => setName(e.target.value);

    const handlePrice = (e) => {
        const { value } = e.target;
        const real_price = value.replace(/[^\d]/g, '');

        setPrice(real_price)
    };

    const handleDescription = (e) => setDescription(e.target.value);
    const price = Number(input_price) === 0 ? 0 : Number(input_price);

    useEffect(() => {

        if(id) {
            getProductById(id).then((response) => {
                const datas = response.data.data[0]
                setName(datas.name)
                setPrice(datas.price !== undefined ? Number(datas.price) : 0)
                setDescription(datas.description)
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])
    
    function saveOrUpdateProduct(e) {
        e.preventDefault();

        if(validateForm()) {
            
            const product = {name, price, description}
            console.log(product)

            if(id) {
                updateProduct(id, product).then((response) => {
                    console.log(response.data);
                    navigator('/products')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                addProduct(product).then((response) => {
                    console.log(response.data);
                    navigator('/products')
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {... errors}

        if(name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }

        if(Number(input_price) >= 0) {
            errorsCopy.input_price = '';
        } else {
            errorsCopy.input_price = 'price must be a positive number';
            valid = false;
        }

        setError(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Update Product</h2>
        } else {
            return <h2 className='text-center'>Add Product</h2>
        }
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                { pageTitle() }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Name:</label>
                            <input
                                type='text'
                                placeholder='Name'
                                name='name'
                                value={name}
                                className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                onChange={handleName}
                            >
                            </input>
                            { errors.name && <div className='invalid-feedback'>{ errors.name }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Price:</label>
                            <input
                                type='text'
                                placeholder='Price'
                                name='price'
                                value={input_price}
                                className={`form-control ${ errors.input_price ? 'is-invalid': ''}`}
                                onChange={handlePrice}
                            >
                            </input>
                            { errors.input_price && <div className='invalid-feedback'>{ errors.input_price }</div> }
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Description:</label>
                            <input
                                type='text'
                                placeholder='Description'
                                name='description'
                                value={description}
                                className='form-control'
                                onChange={handleDescription}
                            >
                            </input>
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateProduct}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductComponent