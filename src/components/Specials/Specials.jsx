import SpecialCard from "./SpecialCard";
import "./Specials.css";

const specialsData = [
    {
        id: 1,
        image: "/greek salad.jpg",
        title: "Greek salad",
        price: "$12.99",
        description:
            "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    },
    {
        id: 2,
        image: "/bruchetta.svg",
        title: "Bruschetta",
        price: "$5.99",
        description:
            "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    },
    {
        id: 3,
        image: "/lemon dessert.jpg",
        title: "Lemon Dessert",
        price: "$5.00",
        description:
            "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    },
];

function Specials() {
    return (
        <section className="specials" aria-label="This week's specials">
            <div className="specials__inner container">
                <div className="specials__header">
                    <h2 className="specials__title">This weeks specials!</h2>
                    <button
                        className="specials__menu-btn"
                        aria-label="View online menu"
                    >
                        Online Menu
                    </button>
                </div>
                <div className="specials__grid">
                    {specialsData.map((item) => (
                        <SpecialCard key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Specials;
