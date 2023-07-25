import { CategoryItem } from '../components/product/CategoryItem';
import { useSelector } from 'react-redux';

export const Home = () => {
    const {products} = useSelector((state) => state.products)

    return (
        <div className='category'>
            {
                products && products.map(item => <CategoryItem key={item.id} id={item.id} title={item.title} categoryImageUrl={item.categoryImageUrl} />)
            }
        </div>
    )
}
