import "./OurStory.css";

function OurStory() {
    return (
        <section className="our-story" aria-label="Our Story">
            <div className="our-story__inner container">
                <div className="our-story__content">
                    <h2 className="our-story__title">Little Lemon</h2>
                    <h3 className="our-story__subtitle">Chicago</h3>
                    <p className="our-story__text">
                        Little Lemon is a charming neighborhood bistro that
                        serves simple food and classic cocktails in a lively but
                        casual environment. The restaurant features a locally
                        sourced menu with daily specials. Founded by two Italian
                        brothers, Mario and Adrian, Little Lemon opened its
                        doors in 1995 and has been serving the Chicago community
                        ever since. Inspired by Italian, Greek, and Turkish
                        culture, the menu is a celebration of Mediterranean
                        flavors, crafted with love and served with warmth. Every
                        dish tells a story — from grandma&apos;s secret recipes
                        to modern twists on timeless classics.
                    </p>
                </div>
                <div className="our-story__images">
                    <img
                        src="/restauranfood.jpg"
                        alt="Beautifully plated Mediterranean dish"
                        className="our-story__image our-story__image--top"
                    />
                    <img
                        src="/restaurant chef B.jpg"
                        alt="Our chefs preparing food in the kitchen"
                        className="our-story__image our-story__image--bottom"
                    />
                </div>
            </div>
        </section>
    );
}

export default OurStory;
