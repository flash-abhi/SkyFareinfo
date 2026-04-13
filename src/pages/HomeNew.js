import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Ship, Package, TrendingUp, MapPin, Calendar, 
  Users, ArrowRight, Star, Shield, Sparkles, Globe,
  Award, Percent, PhoneCall, Mail, Search, ArrowLeftRight,
  CheckCircle, Zap, HeartHandshake, Navigation, CreditCard, Headphones
} from 'lucide-react';
import { useContact } from '../context/ContactContext';
import AirportAutocomplete from '../components/AirportAutocomplete';
import './HomeNew.css';

function HomeNew() {
  const navigate = useNavigate();
  const { contactSettings } = useContact();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('roundtrip');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: { adults: 1, children: 0, infants: 0 },
    cabinClass: 'economy'
  });
  const [showPassengers, setShowPassengers] = useState(false);

  const popularRoutes = [
    { from: 'New York', fromCode: 'JFK', to: 'London', toCode: 'LHR', price: 389, airline: 'Multiple Airlines', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop' },
    { from: 'Los Angeles', fromCode: 'LAX', to: 'Tokyo', toCode: 'NRT', price: 549, airline: 'Multiple Airlines', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop' },
    { from: 'Chicago', fromCode: 'ORD', to: 'Paris', toCode: 'CDG', price: 429, airline: 'Multiple Airlines', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop' },
    { from: 'Miami', fromCode: 'MIA', to: 'Dubai', toCode: 'DXB', price: 619, airline: 'Multiple Airlines', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop' },
    { from: 'San Francisco', fromCode: 'SFO', to: 'Singapore', toCode: 'SIN', price: 499, airline: 'Multiple Airlines', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=250&fit=crop' },
    { from: 'Dallas', fromCode: 'DFW', to: 'Cancun', toCode: 'CUN', price: 219, airline: 'Multiple Airlines', image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=400&h=250&fit=crop' },
  ];

  const exclusiveDeals = [
    { destination: 'Bali, Indonesia', tagline: 'Tropical Escape', price: 849, originalPrice: 1199, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop', rating: 4.9, reviews: 2840, badge: 'Best Seller' },
    { destination: 'Santorini, Greece', tagline: 'Mediterranean Dream', price: 729, originalPrice: 1049, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop', rating: 4.8, reviews: 1920, badge: 'Hot Deal' },
    { destination: 'Maldives', tagline: 'Paradise Found', price: 1199, originalPrice: 1799, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop', rating: 4.9, reviews: 3150, badge: 'Premium' },
    { destination: 'Swiss Alps', tagline: 'Mountain Adventure', price: 679, originalPrice: 999, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop', rating: 4.7, reviews: 1680, badge: 'New' },
  ];

  const testimonials = [
    { name: 'Sarah M.', location: 'Toronto, Canada', text: 'SkyFare saved me $400 on my round-trip to London! The booking process was seamless and their customer support is phenomenal.', rating: 5, avatar: '👩‍💼' },
    { name: 'James K.', location: 'Vancouver, Canada', text: "Best travel platform I've ever used. Found amazing deals to Tokyo that I couldn't find anywhere else. Highly recommend!", rating: 5, avatar: '👨‍💻' },
    { name: 'Emily R.', location: 'Los Angeles, USA', text: 'Their 24/7 support team helped me rebook my flight during a layover delay. Incredible service and the prices cannot be beat.', rating: 5, avatar: '👩‍🎨' },
  ];

  const [stats, setStats] = useState({ bookings: 0, customers: 0, destinations: 0, savings: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !statsVisible) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsVisible]);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { bookings: 50000, customers: 25000, destinations: 150, savings: 15 };
    const duration = 2000; const steps = 60; const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStats({
        bookings: Math.floor((targets.bookings / steps) * step),
        customers: Math.floor((targets.customers / steps) * step),
        destinations: Math.floor((targets.destinations / steps) * step),
        savings: Math.floor((targets.savings / steps) * step)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [statsVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate-in'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    if (activeTab === 'flights') {
      if (!searchData.from || !searchData.to) { alert('Please select departure and destination cities'); return; }
      if (!searchData.departDate) { alert('Please select departure date'); return; }
      if (tripType === 'roundtrip' && !searchData.returnDate) { alert('Please select return date'); return; }
      navigate('/flight-results', { state: { searchParams: { from: searchData.from, to: searchData.to, departDate: searchData.departDate, returnDate: searchData.returnDate, tripType, passengers: searchData.passengers, cabinClass: searchData.cabinClass } } });
    } else if (activeTab === 'hotels') { navigate('/hotel-results'); }
    else if (activeTab === 'packages') { navigate('/package-results'); }
    else if (activeTab === 'cruises') { navigate('/cruise-results'); }
  };

  const updatePassengers = (type, value) => {
    setSearchData(prev => ({ ...prev, passengers: { ...prev.passengers, [type]: Math.max(0, value) } }));
  };

  const totalTravelers = searchData.passengers.adults + searchData.passengers.children + searchData.passengers.infants;
  return (
    <div className="home-new">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-bg-image"></div>
          <div className="hero-gradient-overlay"></div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>

        <div className="hero-inner container">
          <div className="hero-left">
            <div className="hero-badge scroll-animate">
              <Sparkles size={16} />
              <span>#1 Travel Booking Platform</span>
            </div>
            <h1 className="hero-title scroll-animate">
              Your Dream Trip
              <br />
              <span className="hero-highlight">Starts Here</span>
            </h1>
            <p className="hero-subtitle scroll-animate">
              Compare prices across 500+ airlines & save up to 40% on flights,
              hotels, cruises & vacation packages.
            </p>
            <div className="hero-trust-row scroll-animate">
              <div className="trust-item">
                <CheckCircle size={18} />
                <span>Free Cancellation</span>
              </div>
              <div className="trust-item">
                <Shield size={18} />
                <span>Price Match Guarantee</span>
              </div>
              <div className="trust-item">
                <Headphones size={18} />
                <span>24/7 Expert Support</span>
              </div>
            </div>
            <div className="hero-cta-row scroll-animate">
              <a
                href={`tel:${(contactSettings.tfn || "+1-888-859-0441").replace(/[^0-9+]/g, "")}`}
                className="hero-phone-btn"
              >
                <PhoneCall size={20} />
                <div>
                  <span className="phone-label">Talk to an Expert</span>
                  <span className="phone-num">
                    {contactSettings.tfn || "+1-888-859-0441"}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="search-widget">
              <div className="search-tabs">
                {[
                  { key: "flights", icon: Plane, label: "Flights" },
                  { key: "hotels", icon: Hotel, label: "Hotels" },
                  { key: "cruises", icon: Ship, label: "Cruises" },
                  { key: "packages", icon: Package, label: "Packages" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`search-tab ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
              <div className="search-body">
                {activeTab === "flights" && (
                  <>
                    <div className="trip-toggle">
                      <button
                        className={tripType === "roundtrip" ? "active" : ""}
                        onClick={() => setTripType("roundtrip")}
                      >
                        Round Trip
                      </button>
                      <button
                        className={tripType === "oneway" ? "active" : ""}
                        onClick={() => setTripType("oneway")}
                      >
                        One Way
                      </button>
                    </div>
                    <div className="search-grid flights-grid">
                      <div className="search-field route-field">
                        <label>
                          <MapPin size={14} /> From
                        </label>
                        <AirportAutocomplete
                          value={searchData.from}
                          onChange={(value) =>
                            setSearchData({ ...searchData, from: value })
                          }
                          placeholder="Departure City"
                        />
                      </div>
                      <button
                        className="swap-btn"
                        onClick={() =>
                          setSearchData({
                            ...searchData,
                            from: searchData.to,
                            to: searchData.from,
                          })
                        }
                      >
                        <ArrowLeftRight size={18} />
                      </button>
                      <div className="search-field route-field">
                        <label>
                          <MapPin size={14} /> To
                        </label>
                        <AirportAutocomplete
                          value={searchData.to}
                          onChange={(value) =>
                            setSearchData({ ...searchData, to: value })
                          }
                          placeholder="Destination City"
                        />
                      </div>
                      <div className="search-field">
                        <label>
                          <Calendar size={14} /> Depart
                        </label>
                        <input
                          type="date"
                          value={searchData.departDate}
                          onChange={(e) =>
                            setSearchData({
                              ...searchData,
                              departDate: e.target.value,
                            })
                          }
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      {tripType === "roundtrip" && (
                        <div className="search-field">
                          <label>
                            <Calendar size={14} /> Return
                          </label>
                          <input
                            type="date"
                            value={searchData.returnDate}
                            onChange={(e) =>
                              setSearchData({
                                ...searchData,
                                returnDate: e.target.value,
                              })
                            }
                            min={
                              searchData.departDate ||
                              new Date().toISOString().split("T")[0]
                            }
                          />
                        </div>
                      )}
                      <div className="search-field travelers-field">
                        <label>
                          <Users size={14} /> Travelers
                        </label>
                        <div
                          className="travelers-trigger"
                          onClick={() => setShowPassengers(!showPassengers)}
                        >
                          {totalTravelers} Traveler
                          {totalTravelers > 1 ? "s" : ""},{" "}
                          {searchData.cabinClass}
                        </div>
                        {showPassengers && (
                          <div className="travelers-dropdown">
                            {[
                              {
                                label: "Adults",
                                key: "adults",
                                sub: "12+ years",
                              },
                              {
                                label: "Children",
                                key: "children",
                                sub: "2-11 years",
                              },
                              {
                                label: "Infants",
                                key: "infants",
                                sub: "Under 2",
                              },
                            ].map((p) => (
                              <div key={p.key} className="traveler-row">
                                <div>
                                  <span className="traveler-label">
                                    {p.label}
                                  </span>
                                  <span className="traveler-sub">{p.sub}</span>
                                </div>
                                <div className="counter">
                                  <button
                                    className="btn-inc"
                                    onClick={() =>
                                      updatePassengers(
                                        p.key,
                                        searchData.passengers[p.key] - 1,
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="inc-num">
                                    {searchData.passengers[p.key]}
                                  </span>
                                  <button
                                    className="btn-inc"
                                    onClick={() =>
                                      updatePassengers(
                                        p.key,
                                        searchData.passengers[p.key] + 1,
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}
                            <div className="cabin-select">
                              <label>Cabin Class</label>
                              <select
                                value={searchData.cabinClass}
                                onChange={(e) =>
                                  setSearchData({
                                    ...searchData,
                                    cabinClass: e.target.value,
                                  })
                                }
                              >
                                <option value="economy">Economy</option>
                                <option value="premium_economy">
                                  Premium Economy
                                </option>
                                <option value="business">Business</option>
                                <option value="first">First Class</option>
                              </select>
                            </div>
                            <button
                              className="done-btn"
                              onClick={() => setShowPassengers(false)}
                            >
                              Done
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {activeTab === "hotels" && (
                  <div className="search-grid hotels-grid">
                    <div className="search-field">
                      <label>
                        <MapPin size={14} /> Destination
                      </label>
                      <input
                        type="text"
                        placeholder="City or Hotel Name"
                        value={searchData.to}
                        onChange={(e) =>
                          setSearchData({ ...searchData, to: e.target.value })
                        }
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Calendar size={14} /> Check-in
                      </label>
                      <input
                        type="date"
                        value={searchData.departDate}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            departDate: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Calendar size={14} /> Check-out
                      </label>
                      <input
                        type="date"
                        value={searchData.returnDate}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            returnDate: e.target.value,
                          })
                        }
                        min={
                          searchData.departDate ||
                          new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Users size={14} /> Guests
                      </label>
                      <div
                        className="travelers-trigger"
                        onClick={() => setShowPassengers(!showPassengers)}
                      >
                        {searchData.passengers.adults +
                          searchData.passengers.children}{" "}
                        Guest(s)
                      </div>
                      {showPassengers && (
                        <div className="travelers-dropdown">
                          <div className="traveler-row">
                            <div>
                              <span className="traveler-label">Adults</span>
                            </div>
                            <div className="counter">
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "adults",
                                    searchData.passengers.adults - 1,
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{searchData.passengers.adults}</span>
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "adults",
                                    searchData.passengers.adults + 1,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="traveler-row">
                            <div>
                              <span className="traveler-label">Children</span>
                            </div>
                            <div className="counter">
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "children",
                                    searchData.passengers.children - 1,
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{searchData.passengers.children}</span>
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "children",
                                    searchData.passengers.children + 1,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            className="done-btn"
                            onClick={() => setShowPassengers(false)}
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "cruises" && (
                  <div className="search-grid cruises-grid">
                    <div className="search-field">
                      <label>
                        <Ship size={14} /> Destination
                      </label>
                      <input
                        type="text"
                        placeholder="Caribbean, Alaska..."
                        value={searchData.to}
                        onChange={(e) =>
                          setSearchData({ ...searchData, to: e.target.value })
                        }
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Calendar size={14} /> Departure
                      </label>
                      <input
                        type="date"
                        value={searchData.departDate}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            departDate: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Users size={14} /> Travelers
                      </label>
                      <div
                        className="travelers-trigger"
                        onClick={() => setShowPassengers(!showPassengers)}
                      >
                        {searchData.passengers.adults +
                          searchData.passengers.children}{" "}
                        Traveler(s)
                      </div>
                      {showPassengers && (
                        <div className="travelers-dropdown">
                          <div className="traveler-row">
                            <div>
                              <span className="traveler-label">Adults</span>
                            </div>
                            <div className="counter">
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "adults",
                                    searchData.passengers.adults - 1,
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{searchData.passengers.adults}</span>
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "adults",
                                    searchData.passengers.adults + 1,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="traveler-row">
                            <div>
                              <span className="traveler-label">Children</span>
                            </div>
                            <div className="counter">
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "children",
                                    searchData.passengers.children - 1,
                                  )
                                }
                              >
                                -
                              </button>
                              <span>{searchData.passengers.children}</span>
                              <button
                                onClick={() =>
                                  updatePassengers(
                                    "children",
                                    searchData.passengers.children + 1,
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            className="done-btn"
                            onClick={() => setShowPassengers(false)}
                          >
                            Done
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "packages" && (
                  <div className="search-grid packages-grid">
                    <div className="search-field">
                      <label>
                        <MapPin size={14} /> From
                      </label>
                      <AirportAutocomplete
                        value={searchData.from}
                        onChange={(value) =>
                          setSearchData({ ...searchData, from: value })
                        }
                        placeholder="Departure City"
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <MapPin size={14} /> To
                      </label>
                      <AirportAutocomplete
                        value={searchData.to}
                        onChange={(value) =>
                          setSearchData({ ...searchData, to: value })
                        }
                        placeholder="Destination"
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Calendar size={14} /> Depart
                      </label>
                      <input
                        type="date"
                        value={searchData.departDate}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            departDate: e.target.value,
                          })
                        }
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="search-field">
                      <label>
                        <Calendar size={14} /> Return
                      </label>
                      <input
                        type="date"
                        value={searchData.returnDate}
                        onChange={(e) =>
                          setSearchData({
                            ...searchData,
                            returnDate: e.target.value,
                          })
                        }
                        min={
                          searchData.departDate ||
                          new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                  </div>
                )}
                <button className="search-btn" onClick={handleSearch}>
                  <Search size={20} />
                  <span>
                    Search{" "}
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES STRIP ===== */}
      <section className="services-strip">
        <div className="container">
          <div className="services-row">
            <div className="service-pill">
              <Plane size={20} /> <span>500+ Airlines</span>
            </div>
            <div className="service-pill">
              <Hotel size={20} /> <span>1M+ Hotels</span>
            </div>
            <div className="service-pill">
              <Ship size={20} /> <span>Luxury Cruises</span>
            </div>
            <div className="service-pill">
              <Package size={20} /> <span>Vacation Packages</span>
            </div>
            <div className="service-pill">
              <CreditCard size={20} /> <span>Secure Payment</span>
            </div>
            <div className="service-pill">
              <Headphones size={20} /> <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALL TO BOOK BANNER ===== */}
      <section className="call-banner scroll-animate">
        <div className="container">
          <div className="call-banner-inner">
            <div className="call-banner-left">
              <div className="call-banner-icon">
                <PhoneCall size={32} />
              </div>
              <div>
                <h3>🇺🇸 🇨🇦 Exclusive Phone-Only Deals</h3>
                <p>
                  Save extra when you book by phone — unpublished fares
                  available!
                </p>
              </div>
            </div>
            <div className="call-banner-right">
              <a
                href={`tel:${(contactSettings.tfn || "+1-888-859-0441").replace(/[^0-9+]/g, "")}`}
                className="call-banner-btn"
              >
                <PhoneCall size={20} />
                <div>
                  <span className="banner-phone">
                    {contactSettings.tfn || "+1-888-859-0441"}
                  </span>
                  <span className="banner-avail">Toll-Free · 24/7</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POPULAR ROUTES ===== */}
      <section className="popular-routes-section scroll-animate">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Popular Flight Routes</h2>
              <p>Most searched flights by our travelers</p>
            </div>
            <button
              className="see-all-btn"
              onClick={() => navigate("/flights")}
            >
              See All Routes <ArrowRight size={16} />
            </button>
          </div>
          <div className="routes-grid">
            {popularRoutes.map((route, idx) => (
              <div
                key={idx}
                className="route-card"
                onClick={() => navigate("/flights")}
              >
                <div className="route-img">
                  <img
                    src={route.image}
                    alt={`${route.from} to ${route.to}`}
                    loading="lazy"
                  />
                  <div className="route-overlay">
                    <Navigation size={16} />
                  </div>
                </div>
                <div className="route-info">
                  <div className="route-path">
                    <span className="route-city">{route.from}</span>
                    <div className="route-arrow">
                      <Plane size={14} />
                    </div>
                    <span className="route-city">{route.to}</span>
                  </div>
                  <div className="route-meta">
                    <span className="route-airline">{route.airline}</span>
                    <span className="route-price">
                      from <strong>${route.price}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXCLUSIVE DEALS ===== */}
      <section className="deals-section scroll-animate">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Exclusive Travel Deals</h2>
              <p>Hand-picked destinations at unbeatable prices</p>
            </div>
            <button
              className="see-all-btn"
              onClick={() => navigate("/flights")}
            >
              View All Deals <ArrowRight size={16} />
            </button>
          </div>
          <div className="deals-grid">
            {exclusiveDeals.map((deal, idx) => (
              <div
                key={idx}
                className="deal-card"
                onClick={() => navigate("/flights")}
              >
                <div className="deal-image">
                  <img src={deal.image} alt={deal.destination} loading="lazy" />
                  <div className="deal-badge">{deal.badge}</div>
                  <div className="deal-save">
                    Save{" "}
                    {Math.round(
                      ((deal.originalPrice - deal.price) / deal.originalPrice) *
                        100,
                    )}
                    %
                  </div>
                </div>
                <div className="deal-body">
                  <span className="deal-tagline">{deal.tagline}</span>
                  <h3 className="deal-destination">{deal.destination}</h3>
                  <div className="deal-rating">
                    <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                    <span>{deal.rating}</span>
                    <span className="deal-reviews">
                      ({deal.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="deal-pricing">
                    <span className="deal-original">${deal.originalPrice}</span>
                    <span className="deal-price">${deal.price}</span>
                    <span className="deal-per">per person</span>
                  </div>
                  <button className="deal-btn">
                    Book Now <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="stats-section scroll-animate" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {[
              {
                icon: Award,
                value: `${stats.bookings.toLocaleString()}+`,
                label: "Happy Travelers",
              },
              {
                icon: Globe,
                value: `${stats.destinations}+`,
                label: "Destinations",
              },
              { icon: Star, value: "4.9/5", label: "Customer Rating" },
              {
                icon: Percent,
                value: `$${stats.savings}M+`,
                label: "Total Savings",
              },
            ].map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-icon-wrap">
                  <stat.icon size={38} />
                </div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="why-section scroll-animate">
        <div className="container">
          <div className="section-head centered">
            <h2>Why Choose SkyFare?</h2>
            <p>We make travel simple, affordable, and unforgettable</p>
          </div>
          <div className="why-grid">
            {[
              {
                icon: TrendingUp,
                title: "Best Price Guarantee",
                desc: "Find a lower price? We'll match it and give you an extra 10% off. That's our promise.",
                color: "#6366f1",
              },
              {
                icon: Shield,
                title: "Secure Booking",
                desc: "Your data is protected with 256-bit encryption. Book with confidence every time.",
                color: "#10b981",
              },
              {
                icon: Headphones,
                title: "24/7 Expert Support",
                desc: "Real humans, real help. Our travel experts are available around the clock.",
                color: "#f59e0b",
              },
              {
                icon: Zap,
                title: "Instant Confirmation",
                desc: "Get your booking confirmed in seconds with instant e-tickets sent to your inbox.",
                color: "#ef4444",
              },
              {
                icon: HeartHandshake,
                title: "Flexible Cancellation",
                desc: "Plans change. Most bookings offer free cancellation up to 24 hours before travel.",
                color: "#8b5cf6",
              },
              {
                icon: Globe,
                title: "500+ Airlines",
                desc: "Access to every major and low-cost carrier worldwide for the best selection and prices.",
                color: "#06b6d4",
              },
            ].map((feature, idx) => (
              <div key={idx} className="why-card">
                <div
                  className="why-icon"
                  style={{
                    background: `${feature.color}15`,
                    color: feature.color,
                  }}
                >
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section scroll-animate">
        <div className="container">
          <div className="section-head centered">
            <h2>What Our Travelers Say</h2>
            <p>Join thousands of satisfied customers worldwide</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="newsletter-section scroll-animate">
        <div className="container">
          <div className="newsletter-inner">
            <div className="newsletter-text">
              <h2>Get Exclusive Deals in Your Inbox</h2>
              <p>
                Subscribe for the latest travel deals, insider tips, and up to
                50% off your next booking.
              </p>
            </div>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
            >
              <div className="newsletter-input-wrap">
                <Mail size={20} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <button type="submit" className="newsletter-btn">
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="bottom-cta scroll-animate">
        <div className="container">
          <div className="bottom-cta-inner">
            <h2>Ready to Start Your Journey?</h2>
            <p>
              Our travel experts are available 24/7 to help you find the perfect
              deal.
            </p>
            <div className="bottom-cta-actions">
              <a
                href={`tel:${(contactSettings.tfn || "+1-888-859-0441").replace(/[^0-9+]/g, "")}`}
                className="cta-primary"
              >
                <PhoneCall size={20} />
                {contactSettings.tfn || "+1-888-859-0441"}
              </a>
              <a
                href={`mailto:${contactSettings.email || "support@skyfareinfo.com.com"}`}
                className="cta-secondary"
              >
                <Mail size={20} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeNew;
