
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import ViewfinderFlipCarousel from "./UI/ViewfinderFlipCarousel.jsx"
// import PerspectiveTunnelHero from "./PerspectiveTunnelHero";
import CurtainSplitHero from "./CurtainSplitHero";
import StyleAuraSection from "./StyleAuraSection";
// import BrandsEditorial from "./components/BrandsEditorial";
import BrandsEditorial from "./BrandsEditorial";
import Footer from "./footer";
import "swiper/css";
import "swiper/css/pagination";
import "./home.css";
import { useState, useEffect } from "react";

export default function Home() {
    let [products, setProducts] = useState([]);
    let [quantities, setQuantities] = useState({});
    let [card, setCard] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState("");
    let navigate = useNavigate();
    let [shoeProduct, setShoeProduct] = useState(null);

    useEffect(() => {
        getProduct();
    }, []);

    async function getProduct() {
        try {
            let response = await fetch("http://localhost:2025/product");

            // if (!response.ok) {
            //     console.log("Backend status:", response.status);
            //     return;
            // }
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            let data = await response.json();
            let productList = Array.isArray(data.products)
                ? data.products
                : [];
            setProducts(productList);


            const shoe = productList.find(
                (product) => product.name === "StrideX AirPro X2"
            );

            setShoeProduct(shoe || null);
        } catch (error) {
            console.log("Product fetching error:", error);
        }
    }

    let displayNames = {
        "Ladies Dress": "StyleAura",
        "Kitchen Tools": "Cookora",
        "Laptop": "TechNova",
        "Shoes": "StrideX"
    };

    let selectedProducts = products.filter((product) =>
        ["Ladies Dress", "Kitchen Tools", "Laptop", "Shoes"].includes(
            product.name
        )
    );

    return (
        <>
            <div className="home">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                >
                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/holiday_general_ecommerce_hero_banner_beauty_fashion_tech.webp?w=2000"
                            alt="Banner 1"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://t3.ftcdn.net/jpg/08/68/56/64/360_F_868566400_fEkgtPzrR2HAhWFFDKwfsNl8aEsQAaDv.jpg"
                            alt="Banner 2"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/grocery_food_hero_banner_fresh_market.webp?w=2000"
                            alt="Banner 3"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/holiday_general_ecommerce_hero_banner_beauty_fashion_tech.webp?w=2000"
                            alt="Banner 4"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/beauty_skincare_hero_banner_floral_luxury.webp?w=2000"
                            alt="Banner 5"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/holiday_specials_hero_banner_tech_and_gifts.webp?w=2000"
                            alt="Banner 6"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/furniture_hero_banner_modern_living_room.webp?w=2000"
                            alt="Banner 7"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/fashion_store_hero_banner_mens_fashion.webp?w=2000"
                            alt="Banner 8"
                        />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://cdn.scenesku.com/resources/electronics_gaming_hero_banner_neon_workspace.webp?w=2000"
                            alt="Banner 9"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
            <section className="container" id="shop">
                <h2 className="section-title">Shop Your Favorites</h2>
                <div className="featured-grid">
                    {selectedProducts.map((product) => (
                        <div className="featured-card" key={product._id}>
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                            </div>

                            <div className="product-details">
                                <h3>{displayNames[product.name]}</h3>
                                <button
                                    className="product-button"
                                    onClick={() => {
                                        if (product.name === "Ladies Dress") {
                                            window.location.href = "/styleaura";
                                        } else if (product.name === "Kitchen Tools") {
                                            window.location.href = "/Cookora";
                                        } else if (product.name === "Shoes") {
                                            window.location.href = "/stridex";
                                        } else if (product.name === "Laptop") {
                                            window.location.href = "TechNova";
                                        }
                                    }}
                                >
                                    Add to Card
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            </section>

            
            {shoeProduct && (
                <section className="shoe-hero">
                    <div className="hero-content">
                        <span className="hero-label">
                            LIMITED STOCK AVAILABLE!
                        </span>

                        <h1>StrideX</h1>
                        <h2>
                            AirPro <span>X2</span>
                        </h2>

                        <p>
                            Step into comfort and style.
                            Discover your next favourite pair with StrideX.
                        </p>

                        <button
                            className="hero-button"
                            onClick={() => navigate("/stridex")}
                        >
                            Shop Now →
                        </button>
                    </div>

                    <div className="hero-image">
                        <img
                            className="hero-shoe"
                            src={shoeProduct.image}
                            alt={shoeProduct.name}
                        />
                    </div>
                </section>
            )}
            <ViewfinderFlipCarousel />
            {/* <PerspectiveTunnelHero /> */}
            <CurtainSplitHero />
            <StyleAuraSection />
            <BrandsEditorial />
            <Footer />
        </>
    );
}