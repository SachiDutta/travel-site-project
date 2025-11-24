import React, { useEffect, useState, useRef } from "react";

export default function Bookings() {
  // Tabs
  const [activeTab, setActiveTab] = useState("hotels");

  // Guest modal & counts
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCounts, setGuestCounts] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    rooms: 1,
  });

  // Flight class and passenger summary
  const [flightClass, setFlightClass] = useState("Economy");
  const [passengerSummary, setPassengerSummary] = useState("1 Adult, Economy");

  // Date handling
  const [dateValues, setDateValues] = useState({
    // We'll set defaults in useEffect
  });

  // Search button loading states keyed by tab
  const [loadingForTab, setLoadingForTab] = useState({
    hotels: false,
    flights: false,
    trains: false,
    buses: false,
    cars: false,
    packages: false,
  });

  // Notification
  const [notification, setNotification] = useState(null); // { message, type }

  // Countdown
  const [countdownText, setCountdownText] = useState("");
  const countdownRef = useRef(null);

  // Utility: get today's yyyy-mm-dd
  const toDateInputValue = (d) => d.toISOString().split("T")[0];

  // Set min date and default dates (tomorrow, day after)
  useEffect(() => {
    // Inject external resources (only if you don't already include them globally)
    const links = [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
      },
    ];
    links.forEach((attrs) => {
      // avoid double injection
      if (
        !document.querySelector(
          `link[href="${attrs.href}"]`
        )
      ) {
        const link = document.createElement("link");
        link.rel = attrs.rel;
        link.href = attrs.href;
        document.head.appendChild(link);
      }
    });

    // Tailwind CDN (optional: remove if you use Tailwind build)
    if (!document.querySelector('script[data-tailwind]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.tailwindcss.com";
      script.setAttribute("data-tailwind", "1");
      document.head.appendChild(script);
    }

    // Dates
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(today.getDate() + 2);

    const defaultDates = {
      hotelCheckin: toDateInputValue(tomorrow),
      hotelCheckout: toDateInputValue(dayAfter),
      flightDeparture: toDateInputValue(tomorrow),
      flightReturn: toDateInputValue(dayAfter),
      trainDeparture: toDateInputValue(tomorrow),
      busDeparture: toDateInputValue(tomorrow),
      carPickupDate: toDateInputValue(tomorrow),
      carReturnDate: toDateInputValue(dayAfter),
      packageDeparture: toDateInputValue(tomorrow),
      tripType: "round"
    };
    setDateValues(defaultDates);

    // Countdown timer setup (target: Sep 16, 2025 23:59:59)
    const countdownDate = new Date("Sep 16, 2025 23:59:59").getTime();
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      if (distance < 0) {
        setCountdownText("EXPIRED");
        clearInterval(countdownRef.current);
        return;
      }
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdownText(
        `${days}D : ${hours}H : ${minutes}M : ${seconds}S`
      );
    }, 1000);

    // cleanup
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  // Update passenger summary whenever guestCounts or flightClass or activeTab changes
  useEffect(() => {
    if (activeTab === "flights") {
      let text = `${guestCounts.adults} Adult${guestCounts.adults > 1 ? "s" : ""}`;
      if (guestCounts.children > 0)
        text += `, ${guestCounts.children} Child${guestCounts.children > 1 ? "ren" : ""}`;
      if (guestCounts.infants > 0)
        text += `, ${guestCounts.infants} Infant${guestCounts.infants > 1 ? "s" : ""}`;
      text += `, ${flightClass}`;
      setPassengerSummary(text);
    } else {
      // hotels default input text
      const totalGuests = guestCounts.adults + guestCounts.children;
      setPassengerSummary(`${totalGuests} Guest${totalGuests > 1 ? "s" : ""}, ${guestCounts.rooms} Room${guestCounts.rooms > 1 ? "s" : ""}`);
    }
  }, [guestCounts, flightClass, activeTab]);

  // Tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Modal open/close
  const openModal = (e) => {
    e?.preventDefault();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Guest increment/decrement
  const changeGuest = (key, delta) => {
    setGuestCounts((prev) => {
      const next = { ...prev, [key]: prev[key] + delta };
      // bounds
      if (next.adults < 1) next.adults = 1;
      if (next.rooms < 1) next.rooms = 1;
      if (next.children < 0) next.children = 0;
      if (next.infants < 0) next.infants = 0;
      return next;
    });
  };

  // Apply guests (close modal; the summary is already kept in passengerSummary state)
  const applyGuests = () => {
    setIsModalOpen(false);
    showNotification("Guest selection applied", "success");
  };

  // Trip type change (flight radio)
  const handleTripTypeChange = (val) => {
    setDateValues((prev) => ({ ...prev, tripType: val }));
  };

  // Date input change
  const handleDateChange = (key, val) => {
    setDateValues((prev) => {
      const next = { ...prev, [key]: val };
      // If user changed departure and next date is empty, auto-set next day (like original)
      if (key.endsWith("Departure") || key.endsWith("Checkin") || key === "hotelCheckin" || key === "flightDeparture") {
        // find related next input keys heuristically
        // hotelCheckin -> hotelCheckout
        // flightDeparture -> flightReturn (if exists)
        if (key === "hotelCheckin" && !prev.hotelCheckout) {
          const dt = new Date(val);
          dt.setDate(dt.getDate() + 1);
          next.hotelCheckout = toDateInputValue(dt);
        }
        if (key === "flightDeparture" && !prev.flightReturn) {
          const dt = new Date(val);
          dt.setDate(dt.getDate() + 1);
          next.flightReturn = toDateInputValue(dt);
        }
      }
      return next;
    });
  };

  // Search button click (simulate)
  const handleSearch = async (tab) => {
    setLoadingForTab((s) => ({ ...s, [tab]: true }));
    // simulate API delay
    setTimeout(() => {
      setLoadingForTab((s) => ({ ...s, [tab]: false }));
      showNotification("Search completed! Redirecting to results...", "success");
    }, 1500);
  };

  // Simple notification manager
  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    // hide after 3s
    setTimeout(() => setNotification(null), 3000);
  };

  // Return date visibility (for flights)
  const isReturnHidden = dateValues.tripType === "one";

  return (
    <div className="container" style={{ padding: 20 }}>
      {/* Embedded CSS so the component is self-contained */}
      <style>{`
/* Reset and Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1f2937; background-color: #ffffff; }
.booking-intro { text-align: center; margin: 0 auto 2rem auto; }
.booking-intro h2 { font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 2.5rem; font-weight: 800; color: #2563EB; margin-bottom: 0.01rem; white-space: nowrap; }
.btn { padding: 12px 24px; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; }
.btn-primary { background: #2563EB; color: white; }
.btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
.btn-secondary { background: #0891B2; color: white; }
.btn-secondary:hover { background: #0e7490; transform: translateY(-1px); }
.btn-outline { background: transparent; color: #374151; border: 1px solid #d1d5db; }
.btn-outline:hover { background: #f9fafb; border-color: #9ca3af; }
.box{ border: 1px solid #d1d5db; border-radius:20px; padding: 10px 10px 10px 10px; }
.search-box { border: 2px solid #d6d9df; border-radius: 8px; padding: 16px 20px; margin-bottom: 16px; display: flex; gap: 20px; flex-wrap: wrap; }
.search-box .form-group { flex: 1 1 200px; min-width: 150px; }
.search-box .input-wrapper { display: flex; align-items: center; gap: 8px; position: relative; }
.search-box .input-wrapper i { color: #007BFF; position: absolute; left: 12px; z-index: 2; }
.btn-search { width: auto; padding: 12px 36px; display: inline-flex; justify-content: center; margin: 0 auto; background: #2563EB; color:white; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.booking-form > .btn-search { display: block; margin-left: auto; margin-right: auto; }
.booking-widget { background: white; border-radius: 16px; padding: 32px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15); max-width: 1000px; margin: 0 auto; color: #1f2937; }
.booking-tabs { display: flex; gap: 4px; margin-bottom: 32px; background: #f3f4f6; padding: 4px; border-radius: 12px; }
.tab-btn { flex: 1; padding: 12px 16px; background: transparent; border: none; border-radius: 8px; cursor: pointer; font-weight: 500; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; gap: 8px; color: #6b7280; }
.tab-btn.active { background: white; color: #2563EB; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
.tab-btn:hover:not(.active) { color: #374151; background: rgba(255, 255, 255, 0.7); }
.booking-form { display: none; }
.booking-form.active { display: block; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 24px; }
.form-group { display: flex; flex-direction: column; }
.form-group label { font-weight: 500; margin-bottom: 8px; color: #374151; }
.input-wrapper { position: relative; display: flex; align-items: center; }
.input-wrapper i { position: absolute; left: 16px; color: #6b7280; z-index: 2; }
.form-input { width: 100%; padding: 16px 16px 16px 48px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s ease; background: white; }
.form-input:focus { outline: none; border-color: #2563EB; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
.form-input::placeholder { color: #9ca3af; }
.trip-type { display: flex; gap: 24px; margin-bottom: 24px; }
.radio-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500; }
.radio-label input[type="radio"] { accent-color: #2563EB; }
.guests-selector { cursor: pointer; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
.modal-overlay.active { opacity: 1; visibility: visible; }
.modal { background: white; border-radius: 12px; width: 100%; max-width: 400px; margin: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2); transform: scale(0.9); transition: transform 0.3s ease; }
.modal-overlay.active .modal { transform: scale(1); }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 16px; border-bottom: 1px solid #e5e7eb; }
.modal-header h3 { font-size: 1.25rem; font-weight: 600; }
.modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: #6b7280; padding: 4px; }
.modal-close:hover { color: #374151; }
.modal-content { padding: 24px; }
.trending-searches { margin-bottom: 20px; padding: 0 24px; text-align: center; }
.trending-tags { display: inline-flex; flex-wrap: wrap; gap: 12px; justify-content: center; }
.trending-searches h4 { font-weight: 600; color: #2563EB; margin-bottom: 12px; font-size: 1.1rem; }
.tag-btn { background: #f2f2f2; border: none; border-radius: 9999px; padding: 8px 16px; font-size: 0.8rem; color: rgb(155, 154, 154); cursor: pointer; transition: background-color 0.3s ease; }
.tag-btn:hover { background: rgb(94, 94, 94); color: #ffffff; }
.guest-row { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; border-bottom: 1px solid #f3f4f6; }
.guest-row:last-child { border-bottom: none; }
.guest-info { display: flex; flex-direction: column; }
.guest-type { font-weight: 500; color: #1f2937; }
.guest-desc { font-size: 14px; color: #6b7280; }
.guest-controls { display: flex; align-items: center; gap: 16px; }
.guest-btn { width: 32px; height: 32px; border: 1px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #374151; transition: all 0.2s ease; }
.guest-btn:hover { border-color: #2563EB; color: #2563EB; }
.guest-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.guest-count { font-weight: 600; color: #1f2937; min-width: 20px; text-align: center; }
.modal-footer { padding: 16px 24px 24px; }
@media (max-width: 768px) {
  .booking-widget { margin: 0 16px; padding: 24px; }
  .booking-tabs { flex-wrap: wrap; gap: 8px; }
  .tab-btn { font-size: 12px; padding: 8px 12px; }
  .form-grid { grid-template-columns: 1fr; gap: 16px; }
}
@media (max-width: 480px) {
  .booking-widget { padding: 20px; }
  .tab-btn { flex-direction: column; gap: 4px; padding: 12px 8px; }
  .tab-btn i { font-size: 16px; }
  .form-input { padding: 14px 14px 14px 44px; }
  .btn-search { padding: 14px 24px; }
}
html { scroll-behavior: smooth; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }
.return-date.hidden { display: none; }
.loading { opacity: 0.6; pointer-events: none; }
.notification { position: fixed; top: 20px; right: 20px; background: #2563EB; color: white; padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; gap: 8px; opacity: 0; transform: translateY(-20px); transition: opacity 0.3s ease, transform 0.3s ease; z-index: 3000; }
.notification.show { opacity: 1; transform: translateY(0); }
.limited-offer { display: flex; justify-content: space-between; align-items: center; background: linear-gradient(rgba(37, 99, 235, 0.75), rgba(30, 58, 138, 0.75)), url('https://www.ekeralatourism.net/wp-content/uploads/2018/03/Alleppey.jpg') center/cover no-repeat; color: white; padding: 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.2); max-width: 1000px; margin: 40px auto; }
.promo-text { max-width: 65%; }
.promo-text h3 { font-size: 22px; margin-bottom: 15px; font-weight: 700; color: #fbbf24; }
.promo-text ul { list-style: none; padding: 0; margin: 0; }
.promo-text li { margin: 8px 0; font-size: 18px; }
.promo-text .note { font-size: 13px; margin-top: 10px; opacity: 0.9; }
.promo-timer { text-align: center; background: rgba(255, 255, 255, 0.15); padding: 15px 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.promo-timer h4 { font-size: 16px; margin-bottom: 10px; }
#countdown { font-size: 20px; font-weight: 700; letter-spacing: 1px; color: #fbbf24; }
.book-btn { display: inline-block; margin-top: 15px; padding: 10px 20px; font-size: 16px; font-weight: 600; color: #1e3a8a; background: #fbbf24; border-radius: 8px; text-decoration: none; transition: 0.3s ease; }
.book-btn:hover { background: #facc15; transform: scale(1.05); }
`}</style>

      {/* Intro */}
      <div className="booking-intro">
        <h2>Book Your Trip Now!</h2>
        <p style={{ color: '#6b7280' }}>Find the perfect travel experience with our comprehensive booking platform</p>
      </div>

      {/* Booking Widget */}
      <div className="booking-widget box" role="region" aria-label="Booking widget">
        {/* Tabs */}
        <div className="booking-tabs" role="tablist" aria-label="Booking tabs">
          <button
            role="tab"
            aria-selected={activeTab === "hotels"}
            className={activeTab === "hotels" ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick("hotels")}
            data-tab="hotels"
          >
            <i className="fas fa-bed" aria-hidden="true"></i>
            Hotels
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "flights"}
            className={activeTab === "flights" ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick("flights")}
            data-tab="flights"
          >
            <i className="fas fa-plane" aria-hidden="true"></i>
            Flights
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "trains"}
            className={activeTab === "trains" ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick("trains")}
            data-tab="trains"
          >
            <i className="fas fa-train" aria-hidden="true"></i>
            Trains
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "buses"}
            className={activeTab === "buses" ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick("buses")}
            data-tab="buses"
          >
            <i className="fas fa-bus" aria-hidden="true"></i>
            Buses
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "cars"}
            className={activeTab === "cars" ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick("cars")}
            data-tab="cars"
          >
            <i className="fas fa-car" aria-hidden="true"></i>
            Cars
          </button>

          <button
            role="tab"
            aria-selected={activeTab === "packages"}
            className={activeTab === "packages" ? "tab-btn active" : "tab-btn"}
            onClick={() => handleTabClick("packages")}
            data-tab="packages"
          >
            <i className="fas fa-suitcase" aria-hidden="true"></i>
            Packages
          </button>
        </div>

        {/* Hotels form */}
        <div id="hotels" className={`booking-form ${activeTab === "hotels" ? "active" : ""}`} aria-hidden={activeTab !== "hotels"}>
          <div className="search-box">
            <div className="form-group">
              <label htmlFor="hotelDestination">Destination</label>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <input
                  id="hotelDestination"
                  type="text"
                  placeholder="Where are you going?"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hotelCheckin">Check-in</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input
                  id="hotelCheckin"
                  type="date"
                  className="form-input"
                  min={toDateInputValue(new Date())}
                  value={dateValues.hotelCheckin || ""}
                  onChange={(e) => handleDateChange("hotelCheckin", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hotelCheckout">Check-out</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input
                  id="hotelCheckout"
                  type="date"
                  className="form-input"
                  min={dateValues.hotelCheckin || toDateInputValue(new Date())}
                  value={dateValues.hotelCheckout || ""}
                  onChange={(e) => handleDateChange("hotelCheckout", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Guests</label>
              <div className="input-wrapper guests-selector" onClick={openModal}>
                <i className="fas fa-users" aria-hidden="true"></i>
                <input type="text" placeholder="2 Adults, 1 Room" readOnly className="form-input" value={passengerSummary} />
              </div>
            </div>
          </div>

          <div className="trending-searches">
            <h4>Trending Searches</h4>
            <div className="trending-tags">
              <button className="tag-btn">New York</button>
              <button className="tag-btn">Paris</button>
              <button className="tag-btn">Tokyo</button>
              <button className="tag-btn">Beach Resorts</button>
              <button className="tag-btn">Family Friendly</button>
            </div>
          </div>

          <button
            className={`btn btn-search ${loadingForTab.hotels ? "loading" : ""}`}
            onClick={() => handleSearch("hotels")}
          >
            {loadingForTab.hotels ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-search" />}
            {loadingForTab.hotels ? " Searching..." : " Search Hotels"}
          </button>
        </div>

        {/* Flights form */}
        <div id="flights" className={`booking-form ${activeTab === "flights" ? "active" : ""}`} aria-hidden={activeTab !== "flights"}>
          <div className="trip-type" role="radiogroup" aria-label="Trip type">
            <label className="radio-label">
              <input 
                type="radio" 
                name="trip" 
                value="round" 
                checked={dateValues.tripType === "round"} 
                onChange={() => { handleTripTypeChange("round"); }} 
              />
              <span>Round Trip</span>
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="trip" 
                value="one" 
                checked={dateValues.tripType === "one"} 
                onChange={() => { handleTripTypeChange("one"); }} 
              />
              <span>One Way</span>
            </label>
            <label className="radio-label">
              <input 
                type="radio" 
                name="trip" 
                value="multi" 
                checked={dateValues.tripType === "multi"} 
                onChange={() => { handleTripTypeChange("multi"); }} 
              />
              <span>Multi-city</span>
            </label>
          </div>

          <div className="search-box">
            <div className="form-group">
              <label htmlFor="flightFrom">From</label>
              <div className="input-wrapper">
                <i className="fas fa-plane-departure" aria-hidden="true"></i>
                <input id="flightFrom" type="text" placeholder="Departure city" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="flightTo">To</label>
              <div className="input-wrapper">
                <i className="fas fa-plane-arrival" aria-hidden="true"></i>
                <input id="flightTo" type="text" placeholder="Destination city" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="flightDeparture">Departure</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="flightDeparture" type="date" className="form-input"
                       min={toDateInputValue(new Date())}
                       value={dateValues.flightDeparture || ""}
                       onChange={(e) => handleDateChange("flightDeparture", e.target.value)}
                       required />
              </div>
            </div>

            <div className={`form-group return-date ${isReturnHidden ? "hidden" : ""}`}>
              <label htmlFor="flightReturn">Return</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="flightReturn" type="date" className="form-input"
                       min={dateValues.flightDeparture || toDateInputValue(new Date())}
                       value={dateValues.flightReturn || ""}
                       onChange={(e) => handleDateChange("flightReturn", e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Passengers</label>
              <div className="input-wrapper passengers-selector" id="flightPassengers" onClick={openModal}>
                <i className="fas fa-users" aria-hidden="true"></i>
                <input type="text" id="passengerSummary" value={passengerSummary} readOnly className="form-input" />
              </div>
            </div>
          </div>

          <div className="trending-searches">
            <h4>Trending Searches</h4>
            <div className="trending-tags">
              <button className="tag-btn">New York</button>
              <button className="tag-btn">Paris</button>
              <button className="tag-btn">Tokyo</button>
              <button className="tag-btn">Beach Resorts</button>
              <button className="tag-btn">Family Friendly</button>
            </div>
          </div>

          <button
            className={`btn btn-search ${loadingForTab.flights ? "loading" : ""}`}
            onClick={() => handleSearch("flights")}
          >
            {loadingForTab.flights ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-search" />}
            {loadingForTab.flights ? " Searching..." : " Search Flights"}
          </button>
        </div>

        {/* Trains form */}
        <div id="trains" className={`booking-form ${activeTab === "trains" ? "active" : ""}`} aria-hidden={activeTab !== "trains"}>
          <div className="search-box">
            <div className="form-group">
              <label htmlFor="trainFrom">From Station</label>
              <div className="input-wrapper">
                <i className="fas fa-train" aria-hidden="true"></i>
                <input id="trainFrom" type="text" placeholder="Departure station" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="trainTo">To Station</label>
              <div className="input-wrapper">
                <i className="fas fa-train" aria-hidden="true"></i>
                <input id="trainTo" type="text" placeholder="Arrival station" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="trainDeparture">Departure Date</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="trainDeparture" type="date" className="form-input"
                       min={toDateInputValue(new Date())}
                       value={dateValues.trainDeparture || ""}
                       onChange={(e) => handleDateChange("trainDeparture", e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="trainClass">Class</label>
              <div className="input-wrapper">
                <i className="fas fa-ticket-alt" aria-hidden="true"></i>
                <select id="trainClass" className="form-input" required>
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="trainPassengers">Passengers</label>
              <div className="input-wrapper">
                <i className="fas fa-users" aria-hidden="true"></i>
                <input id="trainPassengers" type="number" defaultValue={1} min={1} className="form-input" required />
              </div>
            </div>
          </div>

          <div className="trending-searches">
            <h4>Trending Searches</h4>
            <div className="trending-tags">
              <button className="tag-btn">New York</button>
              <button className="tag-btn">Paris</button>
              <button className="tag-btn">Tokyo</button>
              <button className="tag-btn">Beach Resorts</button>
              <button className="tag-btn">Family Friendly</button>
            </div>
          </div>

          <button className={`btn btn-search ${loadingForTab.trains ? "loading" : ""}`} onClick={() => handleSearch("trains")}>
            {loadingForTab.trains ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-search" />} {loadingForTab.trains ? " Searching..." : " Search Trains"}
          </button>
        </div>

        {/* Buses form */}
        <div id="buses" className={`booking-form ${activeTab === "buses" ? "active" : ""}`} aria-hidden={activeTab !== "buses"}>
          <div className="search-box">
            <div className="form-group">
              <label htmlFor="busFrom">From</label>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <input id="busFrom" type="text" placeholder="Departure city" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="busTo">To</label>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <input id="busTo" type="text" placeholder="Destination city" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="busDeparture">Departure Date</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="busDeparture" type="date" className="form-input"
                       min={toDateInputValue(new Date())}
                       value={dateValues.busDeparture || ""}
                       onChange={(e) => handleDateChange("busDeparture", e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="busPassengers">Passengers</label>
              <div className="input-wrapper">
                <i className="fas fa-users" aria-hidden="true"></i>
                <input id="busPassengers" type="number" defaultValue={1} min={1} className="form-input" required />
              </div>
            </div>
          </div>

          <div className="trending-searches">
            <h4>Trending Searches</h4>
            <div className="trending-tags">
              <button className="tag-btn">New York</button>
              <button className="tag-btn">Paris</button>
              <button className="tag-btn">Tokyo</button>
              <button className="tag-btn">Beach Resorts</button>
              <button className="tag-btn">Family Friendly</button>
            </div>
          </div>

          <button className={`btn btn-search ${loadingForTab.buses ? "loading" : ""}`} onClick={() => handleSearch("buses")}>
            {loadingForTab.buses ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-search" />} {loadingForTab.buses ? " Searching..." : " Search Buses"}
          </button>
        </div>

        {/* Cars form */}
        <div id="cars" className={`booking-form ${activeTab === "cars" ? "active" : ""}`} aria-hidden={activeTab !== "cars"}>
          <div className="search-box">
            <div className="form-group">
              <label htmlFor="carPickupLocation">Pick-up Location</label>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <input id="carPickupLocation" type="text" placeholder="Pick-up location" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="carPickupDate">Pick-up Date</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="carPickupDate" type="date" className="form-input"
                       min={toDateInputValue(new Date())}
                       value={dateValues.carPickupDate || ""}
                       onChange={(e) => handleDateChange("carPickupDate", e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="carPickupTime">Pick-up Time</label>
              <div className="input-wrapper">
                <i className="fas fa-clock" aria-hidden="true"></i>
                <input id="carPickupTime" type="time" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="carReturnDate">Return Date</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="carReturnDate" type="date" className="form-input"
                       min={dateValues.carPickupDate || toDateInputValue(new Date())}
                       value={dateValues.carReturnDate || ""}
                       onChange={(e) => handleDateChange("carReturnDate", e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="carReturnTime">Return Time</label>
              <div className="input-wrapper">
                <i className="fas fa-clock" aria-hidden="true"></i>
                <input id="carReturnTime" type="time" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="carType">Car Type</label>
              <div className="input-wrapper">
                <i className="fas fa-car" aria-hidden="true"></i>
                <select id="carType" className="form-input" required>
                  <option>Economy</option>
                  <option>Compact</option>
                  <option>Mid-size</option>
                  <option>Full-size</option>
                  <option>Luxury</option>
                  <option>SUV</option>
                </select>
              </div>
            </div>
          </div>

          <div className="trending-searches">
            <h4>Trending Searches</h4>
            <div className="trending-tags">
              <button className="tag-btn">New York</button>
              <button className="tag-btn">Paris</button>
              <button className="tag-btn">Tokyo</button>
              <button className="tag-btn">Beach Resorts</button>
              <button className="tag-btn">Family Friendly</button>
            </div>
          </div>

          <button className={`btn btn-search ${loadingForTab.cars ? "loading" : ""}`} onClick={() => handleSearch("cars")}>
            {loadingForTab.cars ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-search" />} {loadingForTab.cars ? " Searching..." : " Search Cars"}
          </button>
        </div>

        {/* Packages form */}
        <div id="packages" className={`booking-form ${activeTab === "packages" ? "active" : ""}`} aria-hidden={activeTab !== "packages"}>
          <div className="search-box">
            <div className="form-group">
              <label htmlFor="packageDestination">Destination</label>
              <div className="input-wrapper">
                <i className="fas fa-globe" aria-hidden="true"></i>
                <input id="packageDestination" type="text" placeholder="Where do you want to go?" className="form-input" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="packageDeparture">Departure Date</label>
              <div className="input-wrapper">
                <i className="fas fa-calendar" aria-hidden="true"></i>
                <input id="packageDeparture" type="date" className="form-input"
                       min={toDateInputValue(new Date())}
                       value={dateValues.packageDeparture || ""}
                       onChange={(e) => handleDateChange("packageDeparture", e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="packageDuration">Duration</label>
              <div className="input-wrapper">
                <i className="fas fa-clock" aria-hidden="true"></i>
                <select id="packageDuration" className="form-input" required>
                  <option>3 Days</option>
                  <option>5 Days</option>
                  <option>7 Days</option>
                  <option>10 Days</option>
                  <option>14 Days</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Travelers</label>
              <div className="input-wrapper">
                <i className="fas fa-users" aria-hidden="true"></i>
                <input type="text" placeholder="2 Adults" readOnly className="form-input" value={passengerSummary} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="packageBudget">Budget Range</label>
              <div className="input-wrapper">
                <i className="fas fa-dollar-sign" aria-hidden="true"></i>
                <select id="packageBudget" className="form-input" required>
                  <option>Under $1,000</option>
                  <option>$1,000 - $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000+</option>
                </select>
              </div>
            </div>
          </div>

          <div className="trending-searches">
            <h4>Trending Searches</h4>
            <div className="trending-tags">
              <button className="tag-btn">New York</button>
              <button className="tag-btn">Paris</button>
              <button className="tag-btn">Tokyo</button>
              <button className="tag-btn">Beach Resorts</button>
              <button className="tag-btn">Family Friendly</button>
            </div>
          </div>

          <button className={`btn btn-search ${loadingForTab.packages ? "loading" : ""}`} onClick={() => handleSearch("packages")}>
            {loadingForTab.packages ? <i className="fas fa-spinner fa-spin" /> : <i className="fas fa-search" />} {loadingForTab.packages ? " Searching..." : " Find Packages"}
          </button>
        </div>
      </div>

      {/* Guest/Passenger Modal */}
      <div className={`modal-overlay ${isModalOpen ? "active" : ""}`} id="guestModal" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="guestModalTitle">
          <div className="modal-header">
            <h3 id="guestModalTitle">Select Guests</h3>
            <button className="modal-close" aria-label="Close modal" onClick={closeModal}>&times;</button>
          </div>

          <div className="modal-content">
            <div className="guest-row">
              <div className="guest-info">
                <span className="guest-type">Adults</span>
                <span className="guest-desc">Ages 13+</span>
              </div>
              <div className="guest-controls">
                <button className="guest-btn minus" data-target="adults" onClick={() => changeGuest("adults", -1)} disabled={guestCounts.adults <= 1}>-</button>
                <span className="guest-count" id="adults">{guestCounts.adults}</span>
                <button className="guest-btn plus" data-target="adults" onClick={() => changeGuest("adults", 1)}>+</button>
              </div>
            </div>

            <div className="guest-row">
              <div className="guest-info">
                <span className="guest-type">Children</span>
                <span className="guest-desc">Ages 2-12</span>
              </div>
              <div className="guest-controls">
                <button className="guest-btn minus" data-target="children" onClick={() => changeGuest("children", -1)} disabled={guestCounts.children <= 0}>-</button>
                <span className="guest-count" id="children">{guestCounts.children}</span>
                <button className="guest-btn plus" data-target="children" onClick={() => changeGuest("children", 1)}>+</button>
              </div>
            </div>

            <div className="guest-row">
              <div className="guest-info">
                <span className="guest-type">Infants</span>
                <span className="guest-desc">Under 2</span>
              </div>
              <div className="guest-controls">
                <button className="guest-btn minus" data-target="infants" onClick={() => changeGuest("infants", -1)} disabled={guestCounts.infants <= 0}>-</button>
                <span className="guest-count" id="infants">{guestCounts.infants}</span>
                <button className="guest-btn plus" data-target="infants" onClick={() => changeGuest("infants", 1)}>+</button>
              </div>
            </div>

            <div className="guest-row" id="roomsRow" style={{ display: activeTab === "hotels" ? "flex" : "none" }}>
              <div className="guest-info">
                <span className="guest-type">Rooms</span>
                <span className="guest-desc">Hotel rooms</span>
              </div>
              <div className="guest-controls">
                <button className="guest-btn minus" data-target="rooms" onClick={() => changeGuest("rooms", -1)} disabled={guestCounts.rooms <= 1}>-</button>
                <span className="guest-count" id="rooms">{guestCounts.rooms}</span>
                <button className="guest-btn plus" data-target="rooms" onClick={() => changeGuest("rooms", 1)}>+</button>
              </div>
            </div>

            <div className="guest-row" id="classRow" style={{ display: activeTab === "flights" ? "flex" : "none", alignItems: "center" }}>
              <div className="guest-info">
                <span className="guest-type">Class</span>
              </div>
              <div className="guest-controls">
                <select id="flightClass" aria-label="Select flight class" value={flightClass} onChange={(e) => setFlightClass(e.target.value)} style={{ padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-primary" id="applyGuests" onClick={applyGuests}>Apply</button>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="limited-offer" role="region" aria-label="Limited time offer">
        <div className="promo-text">
          <h3>⏳ Limited Time: Book Before Sept 16th</h3>
          <ul>
            <li>✨ Flat 20% off on Domestic Flights*</li>
            <li>🏨 35% off on Hotels</li>
            <li>🚌 15% off on Buses</li>
          </ul>
          <p className="note">*Offer valid only till Sept 16th</p>
        </div>

        <div className="promo-timer">
          <h4>Hurry! Offer Ends In:</h4>
          <div id="countdown">{countdownText}</div>
          <a href="#hotels" className="book-btn" onClick={() => setActiveTab("hotels")}>Book Now</a>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`notification show notification-${notification.type}`}>
          <i className={`fas fa-${notification.type === "success" ? "check-circle" : "info-circle"}`} />
          <span style={{ marginLeft: 8 }}>{notification.message}</span>
        </div>
      )}
    </div>
  );
}