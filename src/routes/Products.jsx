import { useParams } from 'react-router-dom';
import { ProductItem } from '../components/product/ProductItem';
import { useSelector } from 'react-redux';

export const Products = () => {
    const {products} = useSelector(state => state.products)
    const {id} = useParams();

    const productItem = products.find(item => item.id === id);

    const {title, items} = productItem;

    return (
        <div className='products'>
            <h1 className='mb-5'>{title}</h1>
            <div className='d-flex flex-wrap justify-content-center gap-4'>
                {
                    items.map(product => 
                        <ProductItem 
                            key={product.id} 
                            id={product.id}
                            name={product.name} 
                            price={product.price} 
                            stock={product.stock}
                            imageUrl={product.imageUrl}
                        />
                    )
                }
            </div>
        </div>
    )
}
