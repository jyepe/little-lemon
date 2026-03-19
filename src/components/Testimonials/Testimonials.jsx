import "./Testimonials.css";

const testimonialsData = [
    {
        id: 1,
        name: "Anthony",
        avatar: "/avatar1.png",
        rating: 4.5,
    },
    {
        id: 2,
        name: "Mary",
        avatar: "/avatar2.png",
        rating: 4,
    },
    {
        id: 3,
        name: "John",
        avatar: "/avatar3.png",
        rating: 4.5,
    },
    {
        id: 4,
        name: "Sarah",
        avatar: "/avatar4.png",
        rating: 5,
    },
];

function StarRating({ rating }) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
        <span className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
            {"★".repeat(fullStars)}
            {hasHalf && <span className="testimonial-card__star--half">★</span>}
            {"☆".repeat(emptyStars)}
            <span className="testimonial-card__rating">{rating} / 5</span>
        </span>
    );
}

function TestimonialCard({ name, avatar, rating }) {
    return (
        <article className="testimonial-card">
            <img
                src={avatar}
                alt={name}
                className="testimonial-card__avatar"
            />
            <h3 className="testimonial-card__name">{name}</h3>
            <StarRating rating={rating} />
            <p className="testimonial-card__review">
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nam tempus tempor felis a accumsan.&rdquo;
            </p>
        </article>
    );
}

function Testimonials() {
    return (
        <section className="testimonials" aria-label="Customer testimonials">
            <div className="testimonials__inner container">
                <h2 className="testimonials__title">Testimonials</h2>
                <div className="testimonials__grid">
                    {testimonialsData.map((item) => (
                        <TestimonialCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
