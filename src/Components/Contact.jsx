import "./Contact.css";

export default function Contact() {
    return (
        <div className="contact-page">

            <div className="contact-heading">
                <h1>Contact Us</h1>
                <p>Home / Contact Us</p>
            </div>

            <div className="contact-banner">
                <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
                    alt="Home Interior"
                />
            </div>

            <section className="contact-content">

                <div className="contact-info">
                    <h2>Get In Touch</h2>
                    <p>
                        We'd love to hear from you.
                        Contact us for any questions or support.
                    </p>

                    <div className="contact-detail">
                        <h3>Our Address</h3>
                        <p>Chennai, Tamil Nadu, India</p>
                    </div>

                    <div className="contact-detail">
                        <h3>Email Address</h3>
                        <p>support@example.com</p>
                    </div>

                    <div className="contact-detail">
                        <h3>Phone Number</h3>
                        <p>+91 98765 43210</p>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Send Us A Message</h2>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Your Email"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            required
                        />

                        <textarea
                            placeholder="Your Message"
                            rows="5"
                            required
                        />

                        <button type="submit">
                            Send Message
                        </button>
                    </form>
                </div>

            </section>
        </div>
    );
}