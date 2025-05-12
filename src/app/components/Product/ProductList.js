import ProductCard from "./ProductCard";

const ProductList = ({ products, onProductAddClicked }) => {
    return (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {
                products.map((product) => {
                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            onClick={() => onProductAddClicked(product)}
                        />
                    )
                })
            }

        </div>
    );
}

export default ProductList;