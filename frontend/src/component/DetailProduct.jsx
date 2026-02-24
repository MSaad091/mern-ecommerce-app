import React, { useEffect, useState } from 'react'
import { GetProduct, AddToCart, RemoveCart } from '../Api';
import { useParams } from "react-router-dom";
import "../Stylesheets/Detailproduct.css"

function DetailProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity,setQuantity] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await GetProduct(id);
                console.log("Product API response:", res.data);
                setProduct(res.data.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        fetchProduct();
    }, [id]);

    // const handleAddToCart = async () => {
    //     try {
    //         await AddToCart(product._id);
    //         alert("Product added to cart!");
    //     } catch (error) {
    //         console.log(error);
    //         alert("Please login first!");
    //     }
    // }
    const handleAddToCart = async() => {


        try {
            const request = await AddToCart({productId:product._id,quantity})
            console.log(request.data);
            
            alert(`${quantity} ${product.title} Added To Cart`)
        } catch (error) {
         console.log(error);
            alert("Please Login First")
        }

    }
 

    if (loading) return <h2 style={{textAlign:"center", marginTop:"50px"}}>Loading Product...</h2>;
    if (!product) return <h2 style={{textAlign:"center", marginTop:"50px"}}>Product Not Found</h2>;

    return (
        <div className="detail-container">
            <img src={product.images?.[0]} alt={product.title} className="detail-image" />
            <div className="detail-info">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <h3>Category: {product.category}</h3>
                <h3>Price: Rs {product.price}</h3>
                <h3>Stock: {product.stock}</h3>
                <label >Quantity</label> 
                <input type="number"  value={quantity} max={product.stock} onChange={(e) => setQuantity(e.target.value)} min={1} />


                <button className="add-to-cart-btn" onClick={handleAddToCart} >
                    Add to Cart
                </button>
                {/* <button onClick={() => handleRemove(item.product._id)}>Remove</button> */}
            </div>
        </div>
    );
}

export default DetailProduct;
