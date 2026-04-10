import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Sun, Palmtree, Mountain, Globe, Plane, Hotel, Utensils, Star } from 'lucide-react';
import AirportAutocomplete from '../components/AirportAutocomplete';
import './Packages.css';

function Packages() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    destinationType: 'city', // 'city' or 'airport'
    destination: '',
    destinationCode: '',
    departureCity: '',
    departureCityCode: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    packageType: 'all-inclusive',
    flightClass: 'economy',
    rooms: 1
  });

  const handleInputChange = (field, value) => {
    setSearchForm({ ...searchForm, [field]: value });
  };

  const handleDepartureChange = (code, formatted) => {
    setSearchForm({ 
      ...searchForm, 
      departureCity: formatted,
      departureCityCode: code
    });
  };

  const handleDestinationChange = (code, formatted) => {
    setSearchForm({ 
      ...searchForm, 
      destination: formatted,
      destinationCode: code
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/package-results', { state: searchForm });
  };

  const popularDestinations = [
    {
      name: 'Cancun, Mexico',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800',
      price: 899,
      nights: 7,
      rating: 4.8
    },
    {
      name: 'Punta Cana, Dominican Republic',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      price: 1099,
      nights: 7,
      rating: 4.7
    },
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      price: 1599,
      nights: 10,
      rating: 4.9
    },
    {
      name: 'Maldives',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      price: 2499,
      nights: 7,
      rating: 5.0
    },
    {
      name: 'Jamaica',
      image: 'https://i.ibb.co/hR0Z12L1/am-taufik-gd-K3a4t3vl-A-unsplash.jpg',
      price: 1199,
      nights: 7,
      rating: 4.6
    },
    {
      name: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      price: 1899,
      nights: 7,
      rating: 4.8
    }
  ];

  const packageTypes = [
    {
      icon: <Sun size={32} />,
      title: 'Beach Resort',
      description: 'Oceanfront luxury with water sports',
      packages: 150
    },
    {
      icon: <Mountain size={32} />,
      title: 'Adventure',
      description: 'Hiking, rafting, and exploration',
      packages: 89
    },
    {
      icon: <Globe size={32} />,
      title: 'Cultural Tours',
      description: 'Historical sites and local culture',
      packages: 112
    },
    {
      icon: <Palmtree size={32} />,
      title: 'Tropical Paradise',
      description: 'Island getaways and relaxation',
      packages: 203
    }
  ];

  return (
    <div className="packages-page">
      {/* Hero Section */}
      <div className="packages-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>
            <Plane size={48} />
            All-Inclusive Vacation Packages
          </h1>
          <p>Flights + Hotels + Meals + Activities - Everything included for a perfect getaway</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="packages-search-container">
        <div className="packages-search-box">
          <h2>Plan Your Dream Vacation Package</h2>
          <p className="form-subtitle">Complete vacation packages with flights, hotels, meals & activities</p>
          
          <form onSubmit={handleSearch}>
            {/* Destination & Departure */}
            <div className="form-section">
              <h3 className="section-title">
                <MapPin size={20} />
                Where are you traveling?
              </h3>
              <div className="search-row">
                <div className="search-field full-width">
                  <label><MapPin size={18} /> Destination City or Airport</label>
                  <AirportAutocomplete
                    value={searchForm.destinationCode}
                    onChange={handleDestinationChange}
                    placeholder="e.g., Cancun, Paris, Bali, Tokyo..."
                  />
                </div>
              </div>
              <div className="search-row">
                <div className="search-field full-width">
                  <label><Plane size={18} /> Departure Airport</label>
                  <AirportAutocomplete
                    value={searchForm.departureCityCode}
                    onChange={handleDepartureChange}
                    placeholder="e.g., New York (JFK), Los Angeles (LAX)..."
                  />
                </div>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="form-section">
              <h3 className="section-title">
                <Calendar size={20} />
                When do you want to travel?
              </h3>
              <div className="search-row">
                <div className="search-field">
                  <label><Calendar size={18} /> Check-in Date</label>
                  <input
                    type="date"
                    value={searchForm.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="search-field">
                  <label><Calendar size={18} /> Check-out Date</label>
                  <input
                    type="date"
                    value={searchForm.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    min={searchForm.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              {searchForm.checkIn && searchForm.checkOut && (
                <div className="nights-display">
                  🌙 {Math.ceil((new Date(searchForm.checkOut) - new Date(searchForm.checkIn)) / (1000 * 60 * 60 * 24))} nights
                </div>
              )}
            </div>

            {/* Travelers */}
            <div className="form-section">
              <h3 className="section-title">
                <Users size={20} />
                Who's traveling?
              </h3>
              <div className="search-row">
                <div className="search-field">
                  <label><Users size={18} /> Adults (18+)</label>
                  <select
                    value={searchForm.adults}
                    onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                    ))}
                  </select>
                </div>
                <div className="search-field">
                  <label><Users size={18} /> Children (0-17)</label>
                  <select
                    value={searchForm.children}
                    onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
                  >
                    {[0, 1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Child' : 'Children'}</option>
                    ))}
                  </select>
                </div>
                <div className="search-field">
                  <label><Hotel size={18} /> Rooms</label>
                  <select
                    value={searchForm.rooms}
                    onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Room' : 'Rooms'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="travelers-summary">
                👥 {searchForm.adults + searchForm.children} {searchForm.adults + searchForm.children === 1 ? 'Traveler' : 'Travelers'} • 🛏️ {searchForm.rooms} {searchForm.rooms === 1 ? 'Room' : 'Rooms'}
              </div>
            </div>

            {/* Flight & Package Preferences */}
            <div className="form-section">
              <h3 className="section-title">
                <Plane size={20} />
                Flight & Package Preferences
              </h3>
              <div className="search-row">
                <div className="search-field">
                  <label><Plane size={18} /> Flight Class</label>
                  <select
                    value={searchForm.flightClass}
                    onChange={(e) => handleInputChange('flightClass', e.target.value)}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium-economy">Premium Economy (+50%)</option>
                    <option value="business">Business Class (+150%)</option>
                    <option value="first">First Class (+300%)</option>
                  </select>
                </div>
                <div className="search-field">
                  <label><Utensils size={18} /> Package Type</label>
                  <select
                    value={searchForm.packageType}
                    onChange={(e) => handleInputChange('packageType', e.target.value)}
                  >
                    <option value="all-inclusive">All-Inclusive (Recommended)</option>
                    <option value="flight-hotel">Flight + Hotel Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Package Type Details */}
            <div className="package-info-box">
              {searchForm.packageType === 'all-inclusive' ? (
                <div className="package-details">
                  <strong>✨ All-Inclusive Package Includes:</strong>
                  <ul>
                    <li>✈️ Round-trip flights ({searchForm.flightClass.replace('-', ' ')} class)</li>
                    <li>🏨 {searchForm.rooms} {searchForm.rooms === 1 ? 'room' : 'rooms'} accommodation</li>
                    <li>🍽️ All meals, snacks & unlimited beverages</li>
                    <li>🎯 Activities & entertainment</li>
                    <li>🚐 Airport transfers included</li>
                  </ul>
                </div>
              ) : (
                <div className="package-details">
                  <strong>🎫 Flight + Hotel Package Includes:</strong>
                  <ul>
                    <li>✈️ Round-trip flights ({searchForm.flightClass.replace('-', ' ')} class)</li>
                    <li>🏨 {searchForm.rooms} {searchForm.rooms === 1 ? 'room' : 'rooms'} accommodation</li>
                    <li>🍳 Breakfast included (meals not included)</li>
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className="search-btn">
              <Search size={20} />
              Search Vacation Packages
            </button>
          </form>
        </div>
      </div>

      {/* What's Included */}
      <div className="whats-included-section">
        <div className="container">
          <h2>What's Included in All-Inclusive</h2>
          <div className="included-grid">
            <div className="included-item">
              <Plane size={40} />
              <h3>Round-trip Flights</h3>
              <p>Direct or connecting flights from your city</p>
            </div>
            <div className="included-item">
              <Hotel size={40} />
              <h3>Luxury Accommodation</h3>
              <p>4-5 star resorts with ocean views</p>
            </div>
            <div className="included-item">
              <Utensils size={40} />
              <h3>All Meals & Drinks</h3>
              <p>Unlimited food, snacks, and beverages</p>
            </div>
            <div className="included-item">
              <Sun size={40} />
              <h3>Activities & Entertainment</h3>
              <p>Water sports, shows, and excursions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="popular-destinations-section">
        <div className="container">
          <h2>Popular All-Inclusive Destinations</h2>
          <div className="destinations-grid">
            {popularDestinations.map((dest, index) => (
              <div 
                key={index} 
                className="destination-card"
                onClick={() => {
                  setSearchForm({ ...searchForm, destination: dest.name });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img src={dest.image} alt={dest.name} />
                <div className="destination-info">
                  <h3>{dest.name}</h3>
                  <div className="destination-meta">
                    <span className="rating">
                      <Star size={16} fill="gold" color="gold" />
                      {dest.rating}
                    </span>
                    <span className="nights">{dest.nights} nights</span>
                  </div>
                  <div className="destination-price">
                    <span className="from">From</span>
                    <span className="price">${dest.price}</span>
                    <span className="per">per person</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Types */}
      <div className="package-types-section">
        <div className="container">
          <h2>Explore by Experience</h2>
          <div className="package-types-grid">
            {packageTypes.map((type, index) => (
              <div key={index} className="package-type-card">
                <div className="type-icon">{type.icon}</div>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <span className="package-count">{type.packages} packages</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Book With Us */}
      <div className="why-book-section">
        <div className="container">
          <h2>Why Book Your Vacation Package With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-number">01</div>
              <h3>Best Price Guarantee</h3>
              <p>Find it cheaper elsewhere? We'll match it + 10% off</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">02</div>
              <h3>24/7 Support</h3>
              <p>Travel assistance before, during, and after your trip</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">03</div>
              <h3>Flexible Cancellation</h3>
              <p>Free cancellation up to 30 days before departure</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-number">04</div>
              <h3>Curated Experiences</h3>
              <p>Handpicked resorts and activities for quality stays</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Packages;
