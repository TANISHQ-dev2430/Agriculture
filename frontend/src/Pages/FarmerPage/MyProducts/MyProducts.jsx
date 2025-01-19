import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";

export default function MyProducts()
{
    return(
        <div className="myProducts">
            <h2>My Products</h2>
            <div className="products-content">
                <ProductList />
                <ProductDetails />
            </div>
        </div>

    );
}