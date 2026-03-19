import "./SpecialCard.css";

function SpecialCard({ image, title, price, description }) {
    return (
        <article className="special-card" aria-label={`${title} - ${price}`}>
            <img
                src={image}
                alt={title}
                className="special-card__image"
            />
            <div className="special-card__body">
                <div className="special-card__header">
                    <h3 className="special-card__title">{title}</h3>
                    <span className="special-card__price">{price}</span>
                </div>
                <p className="special-card__description">{description}</p>
                <a href="#" className="special-card__order" aria-label={`Order a delivery of ${title}`}>
                    Order a delivery 🛵
                </a>
            </div>
        </article>
    );
}

export default SpecialCard;
