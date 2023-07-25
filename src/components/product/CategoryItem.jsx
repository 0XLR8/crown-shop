import { Link } from "react-router-dom"

export const CategoryItem = ({id, title, categoryImageUrl}) => {

    return (
        <div className="category-wrapper">
            <div className="category-item" style={{backgroundImage: `url(${categoryImageUrl})`}} />
                <Link className="category-link" to={`shop/${id}`}>
                <h2>{title}</h2>
                <p>SHOP NOW</p>
            </Link>
        </div>
    )
}
