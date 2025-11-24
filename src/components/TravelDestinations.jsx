import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/destination.css';

const TravelDestinations = () => {
  // Destinations data with fixed budget itineraries
  const destinations = [
    {
      id: 1,
      name: "Goa Beaches",
      country: "India",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Golden sandy beaches with crystal clear waters and vibrant nightlife. Goa offers a perfect blend of relaxation and entertainment with its beautiful coastline, Portuguese heritage, and delicious seafood. The laid-back atmosphere and diverse activities make it a favorite destination for all types of travelers.",
      famousFor: "Beach parties, Portuguese architecture, and seafood cuisine",
      bestTime: "November to March",
      seasons: ["summer", "winter"],
      weather: "sunny",
      budget: "₹15,000",
      duration: "4 Days",
      rating: 4.8,
      visitors: "8M+",
      months: ["November", "December", "January", "February", "March"],
      itinerary: [
        "Day 1: Arrival in Goa → Check-in at beach resort → Calangute Beach sunset → Beach shack dinner (₹2,500)",
        "Day 2: Old Goa heritage tour → Portuguese churches → Local market shopping → Seafood lunch (₹3,000)",
        "Day 3: Water sports at Baga Beach → Dolphin watching → Nightlife experience (₹4,000)",
        "Day 4: Spice plantation visit → Traditional Goan lunch → Departure (₹2,500)"
      ],
      expenseBreakdown: {
        accommodation: "₹6,000 (3 nights beach resort)",
        food: "₹4,000 (local cuisine & seafood)",
        activities: "₹3,000 (water sports, tours)",
        transportation: "₹2,000 (local travel)"
      },
      highlights: ["Beach activities", "Water sports", "Nightlife", "Historical sites"]
    },
    {
      id: 2,
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Majestic snow-capped mountains perfect for skiing and hiking. The Swiss Alps offer breathtaking landscapes, charming villages, and world-class ski resorts. Experience the beauty of alpine meadows, crystal-clear lakes, and picturesque towns while enjoying outdoor adventures or relaxing in luxury.",
      famousFor: "Skiing, mountaineering, and luxury resorts",
      bestTime: "December to March",
      seasons: ["winter", "spring"],
      weather: "snowy",
      budget: "₹85,000",
      duration: "5 Days",
      rating: 4.9,
      visitors: "12M+",
      months: ["December", "January", "February", "March"],
      itinerary: [
        "Day 1: Arrival in Zurich → Train to Interlaken → Check-in at mountain hotel (₹12,000)",
        "Day 2: Jungfraujoch excursion → Ice Palace → Alpine views (₹15,000)",
        "Day 3: Skiing in Grindelwald → Cable car rides → Swiss dinner (₹18,000)",
        "Day 4: Lake Brienz cruise → Local village tour → Chocolate tasting (₹10,000)",
        "Day 5: Scenic train journey → Departure from Zurich (₹8,000)"
      ],
      expenseBreakdown: {
        accommodation: "₹30,000 (4 nights mountain hotel)",
        food: "₹15,000 (Swiss cuisine)",
        activities: "₹25,000 (skiing, excursions)",
        transportation: "₹15,000 (trains, cable cars)"
      },
      highlights: ["Skiing", "Mountain hiking", "Scenic train rides", "Luxury resorts"]
    },
    {
      id: 3,
      name: "Kyoto Gardens",
      country: "Japan",
      image: "https://images.pexels.com/photos/161251/senso-ji-temple-japan-kyoto-landmark-161251.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Stunning cherry blossoms and traditional Japanese architecture. Kyoto is the cultural heart of Japan, home to thousands of temples, shrines, and traditional gardens. Experience the beauty of seasonal changes, from cherry blossoms in spring to colorful foliage in autumn.",
      famousFor: "Cherry blossoms, temples, and traditional tea ceremonies",
      bestTime: "March to May",
      seasons: ["spring", "summer"],
      weather: "mild",
      budget: "₹45,000",
      duration: "5 Days",
      rating: 4.7,
      visitors: "5M+",
      months: ["March", "April", "May", "September", "October", "November"],
      itinerary: [
        "Day 1: Arrival in Kyoto → Gion district exploration → Traditional ryokan check-in (₹8,000)",
        "Day 2: Kinkaku-ji Temple → Arashiyama Bamboo Grove → Monkey Park (₹9,000)",
        "Day 3: Fushimi Inari Shrine → Tea ceremony experience → Geisha district (₹10,000)",
        "Day 4: Nara day trip → Todai-ji Temple → Deer park feeding (₹8,000)",
        "Day 5: Philosopher's Path → Local market → Departure (₹5,000)"
      ],
      expenseBreakdown: {
        accommodation: "₹20,000 (4 nights traditional ryokan)",
        food: "₹10,000 (Japanese cuisine)",
        activities: "₹8,000 (temple entries, ceremonies)",
        transportation: "₹7,000 (local travel, Nara trip)"
      },
      highlights: ["Temple visits", "Cherry blossom viewing", "Tea ceremonies", "Traditional gardens"]
    },
    {
      id: 4,
      name: "Kerala Backwaters",
      country: "India",
      image: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Serene waterways surrounded by lush greenery during monsoons. Kerala's backwaters offer a unique travel experience with houseboat cruises through palm-fringed canals, traditional villages, and rich biodiversity. The region is also famous for its Ayurvedic treatments and spice plantations.",
      famousFor: "Houseboat cruises, Ayurvedic treatments, and spice plantations",
      bestTime: "June to September",
      seasons: ["monsoon", "winter"],
      weather: "rainy",
      budget: "₹18,000",
      duration: "4 Days",
      rating: 4.6,
      visitors: "3M+",
      months: ["June", "July", "August", "September", "October", "November"],
      itinerary: [
        "Day 1: Arrival in Kochi → Chinese fishing nets → Fort Kochi exploration (₹3,500)",
        "Day 2: Houseboat cruise through backwaters → Traditional Kerala lunch (₹6,000)",
        "Day 3: Ayurvedic treatment session → Spice plantation tour → Cooking class (₹4,500)",
        "Day 4: Beach relaxation → Local shopping → Departure (₹2,000)"
      ],
      expenseBreakdown: {
        accommodation: "₹8,000 (3 nights including houseboat)",
        food: "₹4,000 (Kerala cuisine)",
        activities: "₹4,000 (Ayurveda, plantation tours)",
        transportation: "₹2,000 (local travel)"
      },
      highlights: ["Houseboat stays", "Ayurvedic treatments", "Spice plantation tours", "Wildlife spotting"]
    },
    {
      id: 5,
      name: "Maldives",
      country: "Maldives",
      image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Tropical paradise with overwater bungalows and pristine beaches. The Maldives is the ultimate luxury escape with its turquoise waters, white sandy beaches, and vibrant marine life. Enjoy world-class diving, spa treatments, and romantic dining experiences in this island paradise.",
      famousFor: "Luxury resorts, underwater dining, and coral reefs",
      bestTime: "November to April",
      seasons: ["summer", "winter"],
      weather: "sunny",
      budget: "₹1,20,000",
      duration: "5 Days",
      rating: 4.9,
      visitors: "2M+",
      months: ["November", "December", "January", "February", "March", "April"],
      itinerary: [
        "Day 1: Arrival → Speedboat to resort → Overwater villa check-in → Sunset viewing (₹25,000)",
        "Day 2: Snorkeling adventure → Coral reef exploration → Private beach dinner (₹28,000)",
        "Day 3: Dolphin watching cruise → Underwater restaurant experience (₹30,000)",
        "Day 4: Luxury spa treatments → Water sports activities → Sunset cruise (₹22,000)",
        "Day 5: Final beach relaxation → Departure transfer (₹10,000)"
      ],
      expenseBreakdown: {
        accommodation: "₹60,000 (4 nights overwater villa)",
        food: "₹25,000 (including special dining)",
        activities: "₹25,000 (water sports, excursions)",
        transportation: "₹10,000 (speedboat transfers)"
      },
      highlights: ["Overwater bungalows", "Snorkeling & diving", "Luxury spas", "Private island experiences"]
    },
    {
      id: 6,
      name: "Bali Rice Terraces",
      country: "Indonesia",
      image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Lush green rice terraces with traditional Indonesian culture. Bali offers a perfect blend of natural beauty, spiritual experiences, and vibrant culture. From stunning temples and traditional dances to wellness retreats and beautiful beaches, Bali has something for every traveler.",
      famousFor: "Rice terraces, temples, and traditional dancing",
      bestTime: "April to June",
      seasons: ["spring", "summer"],
      weather: "sunny",
      budget: "₹32,000",
      duration: "5 Days",
      rating: 4.7,
      visitors: "7M+",
      months: ["April", "May", "June", "July", "August", "September"],
      itinerary: [
        "Day 1: Arrival in Bali → Uluwatu Temple sunset → Traditional dance performance (₹6,000)",
        "Day 2: Tegallalang Rice Terraces → Ubud art market → Monkey Forest (₹7,000)",
        "Day 3: Mount Batur sunrise trek → Hot springs visit (₹8,000)",
        "Day 4: Traditional Balinese massage → Cooking class → Beach relaxation (₹6,000)",
        "Day 5: Local market shopping → Departure (₹3,000)"
      ],
      expenseBreakdown: {
        accommodation: "₹15,000 (4 nights villa)",
        food: "₹7,000 (Balinese cuisine)",
        activities: "₹7,000 (tours, activities)",
        transportation: "₹3,000 (local travel)"
      },
      highlights: ["Temple visits", "Rice terrace walks", "Cultural performances", "Wellness retreats"]
    },
    {
      id: 7,
      name: "Greek Cyclades",
      country: "Greece",
      image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "White-washed buildings overlooking crystal blue waters. The Greek Cyclades offer picture-perfect islands with stunning architecture, beautiful beaches, and ancient history. Enjoy island hopping, Mediterranean cuisine, and breathtaking sunsets in this idyllic destination.",
      famousFor: "Ancient history, island hopping, and Mediterranean cuisine",
      bestTime: "May to September",
      seasons: ["summer", "spring"],
      weather: "sunny",
      budget: "₹65,000",
      duration: "6 Days",
      rating: 4.7,
      visitors: "11M+",
      months: ["May", "June", "July", "August", "September"],
      itinerary: [
        "Day 1: Arrival in Athens → Acropolis visit → Plaka district exploration (₹10,000)",
        "Day 2: Ferry to Mykonos → Windmills tour → Little Venice sunset (₹12,000)",
        "Day 3: Mykonos beaches → Paradise Beach nightlife (₹11,000)",
        "Day 4: Santorini arrival → Oia sunset viewing → Wine tasting (₹13,000)",
        "Day 5: Volcano tour → Hot springs → Traditional Greek dinner (₹10,000)",
        "Day 6: Ancient ruins visit → Departure from Athens (₹7,000)"
      ],
      expenseBreakdown: {
        accommodation: "₹25,000 (5 nights hotels)",
        food: "₹15,000 (Mediterranean cuisine)",
        activities: "₹15,000 (tours, wine tasting)",
        transportation: "₹10,000 (ferries, local travel)"
      },
      highlights: ["Island hopping", "Ancient ruins", "Beach relaxation", "Greek cuisine"]
    }
    ,{
      id: 8,
      name: "Thailand Islands",
      country: "Thailand",
      image: "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Tropical islands with monsoon rains creating lush landscapes.",
      famousFor: "Island hopping, Thai massages, and street food",
      bestTime: "June to October",
      seasons: ["monsoon", "summer"],
      weather: "sunny",
      budget: "₹79,000",
      duration: "6 Days",
      rating: 4.6,
      visitors: "9M+"
    },
    {
      id: 9,
      name: "Iceland",
      country: "Iceland",
      image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Land of fire and ice with geysers and glacial formations.",
      famousFor: "Blue Lagoon, Northern Lights, and volcanic landscapes",
      bestTime: "October to March",
      seasons: ["winter", "spring"],
      weather: "snowy",
      budget: "₹65,000",
      duration: "8 Days",
      rating: 4.8,
      visitors: "4M+"
    },
    {
      id: 10,
      name: "Tuscany",
      country: "Italy",
      image: "https://images.pexels.com/photos/2661176/pexels-photo-2661176.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Rolling hills covered with vineyards and historic towns.",
      famousFor: "Wine tasting, Renaissance art, and culinary experiences",
      bestTime: "April to June",
      seasons: ["spring", "summer"],
      weather: "sunny",
      budget: "₹1,00,000",
      duration: "6 Days",
      rating: 4.7,
      visitors: "15M+"
    },
    {
      id: 11,
      name: "Amazon Rainforest",
      country: "Brazil",
      image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Dense rainforest with incredible biodiversity and river systems.",
      famousFor: "Wildlife spotting, indigenous culture, and river cruises",
      bestTime: "June to August",
      seasons: ["monsoon", "winter"],
      weather: "rainy",
      budget: "₹75,000",
      duration: "10 Days",
      rating: 4.5,
      visitors: "1M+"
    },
    {
      id: 12,
      name: "Sahara Desert",
      country: "Morocco",
      image: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Vast sand dunes with stunning sunsets and camel treks.",
      famousFor: "Camel safaris, desert camps, and star gazing",
      bestTime: "March to May",
      seasons: ["summer", "spring"],
      weather: "sunny",
      budget: "₹55,000",
      duration: "6 Days",
      rating: 4.6,
      visitors: "2M+"
    },
    {
      id: 13,
      name: "Canadian Rockies",
      country: "Canada",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Towering peaks with pristine lakes and abundant wildlife.",
      famousFor: "Hiking, wildlife viewing, and scenic drives",
      bestTime: "December to March",
      seasons: ["winter", "spring"],
      weather: "snowy",
      budget: "₹2,50,000",
      duration: "30 Days",
      rating: 4.8,
      visitors: "10M+"
    },
    {
      id: 14,
      name: "Vietnam Highlands",
      country: "Vietnam",
      image: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Misty mountains and terraced fields during monsoon season.",
      famousFor: "Coffee plantations, ethnic minorities, and trekking",
      bestTime: "May to September",
      seasons: ["monsoon", "summer"],
      weather: "sunny",
      budget: "₹65,000",
      duration: "6 Days",
      rating: 4.4,
      visitors: "3M+"
    },
    {
      id: 15,
      name: "Greek Cyclades",
      country: "Greece",
      image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "White-washed buildings overlooking crystal blue waters.",
      famousFor: "Ancient history, island hopping, and Mediterranean cuisine",
      bestTime: "May to September",
      seasons: ["summer", "spring"],
      weather: "sunny",
      budget: "₹85,000",
      duration: "10 Days",
      rating: 4.7,
      visitors: "11M+"
    },
    {
      id: 16,
      name: "New Zealand Alps",
      country: "New Zealand",
      image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
      description: "Dramatic landscapes with flowering meadows in spring.",
      famousFor: "Adventure sports, Lord of the Rings filming locations, and hiking",
      bestTime: "September to November",
      seasons: ["spring", "summer"],
      weather: "mild",
      budget: "₹95,000",
      duration: "20 Days",
      rating: 4.9,
      visitors: "4M+"
    }
  ];
  // Emoji mappings for seasons
  const emojiMap = {
    summer: ['☀', '🌞', '🔥', '🌅'],
    winter: ['❄', '⛄', '🌨', '🧊'],
    spring: ['🌸', '🌺', '🌼', '🌻', '🌷', '🌹'],
    monsoon: ['🌧', '☔', '💧', '⛈']
  };

  // Budget options
  const budgetOptions = [
    { value: 'all', label: 'All Budgets' },
    { value: '15000', label: 'Budget (₹15K)' },
    { value: '18000', label: 'Economy (₹18K)' },
    { value: '32000', label: 'Standard (₹32K)' },
    { value: '45000', label: 'Premium (₹45K)' },
    { value: '65000', label: 'Luxury (₹65K)' },
    { value: '85000', label: 'Premium Luxury (₹85K)' },
    { value: '120000', label: 'Ultra Luxury (₹1.2L)' }
  ];

  // Month options
  const monthOptions = [
    { value: 'all', label: 'All Months' },
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
  ];

  // State
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fallingEmojis, setFallingEmojis] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [imageLoading, setImageLoading] = useState({});
  const emojiIntervalRef = useRef(null);

  // Load preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('travelPreferences');
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences);
      setSelectedSeason(preferences.season || 'all');
      setSelectedBudget(preferences.budget || 'all');
      setSelectedMonth(preferences.month || 'all');
      setFavorites(preferences.favorites || []);
    }
  }, []);

  // Save preferences to localStorage
  useEffect(() => {
    const preferences = {
      season: selectedSeason,
      budget: selectedBudget,
      month: selectedMonth,
      favorites
    };
    localStorage.setItem('travelPreferences', JSON.stringify(preferences));
  }, [selectedSeason, selectedBudget, selectedMonth, favorites]);

  // Filtered destinations with useMemo for performance
  const filteredDestinations = useMemo(() => 
    destinations.filter(dest => {
      const seasonMatch = selectedSeason === 'all' || dest.seasons.includes(selectedSeason);
      const budgetMatch = selectedBudget === 'all' || dest.budget.replace(/[^0-9]/g, '') === selectedBudget;
      const monthMatch = selectedMonth === 'all' || dest.months.includes(selectedMonth);
      const searchMatch = searchQuery === '' || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return seasonMatch && budgetMatch && monthMatch && searchMatch;
    }), [selectedSeason, selectedBudget, selectedMonth, searchQuery]
  );

  // Start falling emojis effect
  useEffect(() => {
    startFallingEmojis(selectedSeason);
    
    return () => {
      if (emojiIntervalRef.current) {
        clearInterval(emojiIntervalRef.current);
      }
    };
  }, [selectedSeason]);

  // Falling emojis function
  const startFallingEmojis = (season) => {
    setFallingEmojis([]);
    if (emojiIntervalRef.current) {
      clearInterval(emojiIntervalRef.current);
    }
    
    if (season === 'all') {
      return;
    }

    const seasonEmojis = emojiMap[season];
    if (!seasonEmojis) return;

    const createEmoji = () => {
      const newEmoji = {
        id: Math.random(),
        emoji: seasonEmojis[Math.floor(Math.random() * seasonEmojis.length)],
        left: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2
      };
      
      setFallingEmojis(prev => [...prev, newEmoji]);

      setTimeout(() => {
        setFallingEmojis(prev => prev.filter(e => e.id !== newEmoji.id));
      }, 8000);
    };

    for (let i = 0; i < 8; i++) {
      setTimeout(createEmoji, i * 200);
    }

    emojiIntervalRef.current = setInterval(() => {
      createEmoji();
    }, 1000);
  };

  // Image loading handlers
  const handleImageLoad = (imageId) => {
    setImageLoading(prev => ({ ...prev, [imageId]: false }));
  };

  const handleImageError = (imageId) => {
    setImageLoading(prev => ({ ...prev, [imageId]: false }));
  };

  // Favorite functionality
  const toggleFavorite = (destinationId, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(destinationId) 
        ? prev.filter(id => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  // Share functionality
  const shareDestination = async (destination, e) => {
    if (e) e.stopPropagation();
    
    const shareData = {
      title: `Check out ${destination.name}`,
      text: `${destination.name} in ${destination.country} - ${destination.description.substring(0, 100)}...`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `Check out ${destination.name} in ${destination.country}! ${destination.description.substring(0, 150)}...`
      );
      alert('Destination info copied to clipboard!');
    }
  };

  // Modal functions
  const openModal = (destinationId) => {
    const destination = destinations.find(dest => dest.id === destinationId);
    if (destination) {
      setSelectedDestination(destination);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSeason('all');
    setSelectedBudget('all');
    setSelectedMonth('all');
    setSearchQuery('');
  };

  // Filter handlers
  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setSelectedBudget(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle Escape key for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Memoized Modal Content for performance
  const ModalContent = React.memo(({ destination, onClose, onToggleFavorite, onShare, isFavorite }) => (
    <>
      <div className="modal-header">
        <img
          src={destination.image}
          alt={destination.name}
          className="modal-image"
          onLoad={() => handleImageLoad(`modal-${destination.id}`)}
          onError={() => handleImageError(`modal-${destination.id}`)}
        />
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="modal-actions">
          <button 
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={(e) => onToggleFavorite(destination.id, e)}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤' : '🤍'}
          </button>
          <button 
            className="share-btn"
            onClick={(e) => onShare(destination, e)}
            aria-label="Share destination"
          >
            📤
          </button>
        </div>
      </div>
      
      <div className="modal-body">
        <div className="modal-title-section">
          <h2 className="modal-title">{destination.name}</h2>
          <div className="modal-rating">
            <span>⭐</span>
            <span style={{ color: 'white', marginLeft: '0.25rem' }}>
              {destination.rating}
            </span>
          </div>
        </div>
        
        <div className="modal-location">
          <span>📍</span>
          <span style={{ marginLeft: '0.5rem' }}>{destination.country}</span>
        </div>

        <div className="modal-budget">
          {destination.duration} • {destination.budget} all inclusive
        </div>
        
        <div className="info-grid">
          <div className="info-card">
            <div className="info-card-header">
              <span>📅</span>
              <span style={{ fontWeight: '600', marginLeft: '0.5rem' }}>
                Best Time to Visit
              </span>
            </div>
            <p className="info-card-content">{destination.bestTime}</p>
          </div>
          
          <div className="info-card">
            <div className="info-card-header">
              <span>👥</span>
              <span style={{ fontWeight: '600', marginLeft: '0.5rem' }}>
                Annual Visitors
              </span>
            </div>
            <p className="info-card-content">{destination.visitors}</p>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span>💰</span>
            <span className="section-title" style={{ marginLeft: '0.5rem' }}>
              Expense Breakdown
            </span>
          </div>
          <div className="expense-grid">
            {Object.entries(destination.expenseBreakdown).map(([category, amount]) => (
              <div key={category} className="expense-item">
                <span className="expense-category">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                <span className="expense-amount">{amount}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="section">
          <div className="section-header">
            <span>ℹ</span>
            <span className="section-title" style={{ marginLeft: '0.5rem' }}>
              About {destination.name}
            </span>
          </div>
          <p className="section-content">{destination.description}</p>
        </div>
        
        <div className="section">
          <div className="section-header">
            <span>📸</span>
            <span className="section-title" style={{ marginLeft: '0.5rem' }}>
              Famous For
            </span>
          </div>
          <p className="section-content">{destination.famousFor}</p>
        </div>

        <div className="section">
          <div className="section-header">
            <span>🗓</span>
            <span className="section-title" style={{ marginLeft: '0.5rem' }}>
              Detailed Itinerary
            </span>
          </div>
          <div className="itinerary-list">
            {destination.itinerary.map((day, index) => (
              <div key={index} className="itinerary-item">
                <span className="itinerary-day">Day {index + 1}</span>
                <span className="itinerary-content">{day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span>⭐</span>
            <span className="section-title" style={{ marginLeft: '0.5rem' }}>
              Highlights & Activities
            </span>
          </div>
          <div className="highlights-grid">
            {destination.highlights.map((highlight, index) => (
              <div key={index} className="highlight-item">
                <span className="highlight-icon">✓</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  ));

  return (
    <div className="travel-app">
      {/* Falling Emojis */}
      <div className="falling-emojis-container">
        {fallingEmojis.map(emoji => (
          <div
            key={emoji.id}
            className="falling-emoji"
            style={{
              left: `${emoji.left}%`,
              animationDuration: `${emoji.duration}s`,
              animationDelay: `${emoji.delay}s`
            }}
          >
            {emoji.emoji}
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="title">Discover Amazing Destinations</h1>
            <p className="subtitle">Find your perfect getaway with fixed budget itineraries</p>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-container">
            <div className="filter-group">
              <label htmlFor="search-input" className="filter-label">
                Search Destinations
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="Search by name, country, or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="filter-select"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="season-select" className="filter-label">
                Choose Your Season
              </label>
              <select
                id="season-select"
                className="filter-select"
                value={selectedSeason}
                onChange={handleSeasonChange}
              >
                <option value="all">All Seasons</option>
                <option value="summer">Summer </option>
                <option value="winter">Winter </option>
                <option value="spring">Spring </option>
                <option value="monsoon">Monsoon </option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="budget-select" className="filter-label">
                Budget Range
              </label>
              <select
                id="budget-select"
                className="filter-select"
                value={selectedBudget}
                onChange={handleBudgetChange}
              >
                {budgetOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="month-select" className="filter-label">
                Travel Month
              </label>
              <select
                id="month-select"
                className="filter-select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {monthOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-actions">
            <button className="clear-filters" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>

          <div className="filter-info">
            Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''} 
            {selectedSeason !== 'all' && ` for ${selectedSeason}`}
            {selectedBudget !== 'all' && ` with budget ${budgetOptions.find(b => b.value === selectedBudget)?.label}`}
            {selectedMonth !== 'all' && ` in ${selectedMonth}`}
            {searchQuery && ` matching "${searchQuery}"`}
            {favorites.length > 0 && ` • ${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="destinations-section">
        <div className="container">
          <div className="destinations-grid">
            {filteredDestinations.map(destination => {
              const isFavorite = favorites.includes(destination.id);
              const isLoading = imageLoading[destination.id] !== false;
              
              return (
                <div
                  key={destination.id}
                  className="destination-card animate-fade-in-up"
                  onClick={() => openModal(destination.id)}
                >
                  <div className="card-image-container">
                    {isLoading && <div className="image-skeleton"></div>}
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className={`card-image ${isLoading ? 'loading' : 'loaded'}`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(destination.id)}
                      onError={() => handleImageError(destination.id)}
                    />
                    <div className="rating-badge">
                      <span>⭐</span>
                      <span style={{ color: 'white', marginLeft: '0.25rem' }}>
                        {destination.rating}
                      </span>
                    </div>
                    <div className="budget-badge">
                      {destination.budget}
                    </div>
                    <button 
                      className={`card-favorite-btn ${isFavorite ? 'favorited' : ''}`}
                      onClick={(e) => toggleFavorite(destination.id, e)}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      {isFavorite ? '❤' : '🤍'}
                    </button>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{destination.name}</h3>
                    <div className="card-location">
                      <span>📍</span>
                      <span style={{ marginLeft: '0.5rem' }}>{destination.country}</span>
                    </div>
                    <p className="card-duration">{destination.duration} • {destination.budget} all inclusive</p>
                    <p className="card-description">{destination.description}</p>
                    <div className="card-footer">
                      <div className="card-visitors">
                        <span>👥</span>
                        <span style={{ marginLeft: '0.25rem' }}>{destination.visitors}</span>
                      </div>
                      <span className="learn-more">View Itinerary →</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className={`no-results ${filteredDestinations.length > 0 ? 'hidden' : ''}`}>
            <p>No destinations found for the selected filters.</p>
            <p style={{ marginTop: '0.5rem' }}>Try adjusting your search or filter preferences.</p>
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className={`modal-overlay ${isModalOpen ? '' : 'hidden'}`} onClick={closeModal}>
        <div 
          className="modal-content" 
          onClick={e => e.stopPropagation()}
          id="modal-content"
          tabIndex={-1}
        >
          {selectedDestination && (
            <ModalContent
              destination={selectedDestination}
              onClose={closeModal}
              onToggleFavorite={toggleFavorite}
              onShare={shareDestination}
              isFavorite={favorites.includes(selectedDestination.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelDestinations;