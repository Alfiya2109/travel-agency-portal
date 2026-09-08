export const initialTrips = [
  {
    id: "TRV-2024-001",
    traveler: "Alfiya Khan",
    destination: "Tokyo, Japan",
    purpose: "Tech & Innovation World Summit 2025",
    departDate: "2025-04-12",
    returnDate: "2025-04-18",
    transport: "Flight (Emirates - Business)",
    hotel: "Shinjuku Granbell Luxury Suite",
    budget: 3200,
    status: "Approved",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRV-2024-002",
    traveler: "Sarah Jenkins",
    destination: "Paris, France",
    purpose: "EU Client Architecture Consultation",
    departDate: "2025-05-02",
    returnDate: "2025-05-08",
    transport: "Flight (Air France - Economy)",
    hotel: "Le Marais Boutique Hotel",
    budget: 1850,
    status: "Pending",
    department: "Sales & Solutions",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRV-2024-003",
    traveler: "David Chen",
    destination: "Dubai, UAE",
    purpose: "Middle East Fintech Exhibition & Keynote",
    departDate: "2025-05-15",
    returnDate: "2025-05-20",
    transport: "Flight (FlyDubai)",
    hotel: "Marina View Residence",
    budget: 2400,
    status: "Approved",
    department: "Product",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRV-2024-004",
    traveler: "Michael Scott",
    destination: "San Francisco, USA",
    purpose: "Q2 Investor Briefing & Silicon Valley Tour",
    departDate: "2025-06-10",
    returnDate: "2025-06-17",
    transport: "Flight (United Airlines)",
    hotel: "Union Square Executive Suites",
    budget: 4100,
    status: "In Review",
    department: "Executive",
    image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "TRV-2024-005",
    traveler: "Priya Sharma",
    destination: "Bali, Indonesia",
    purpose: "Annual Engineering Offsite & Hackathon",
    departDate: "2025-07-04",
    returnDate: "2025-07-11",
    transport: "Flight (Singapore Airlines)",
    hotel: "Ubud Eco Resort & Conference Center",
    budget: 1400,
    status: "Approved",
    department: "Engineering",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80"
  }
];

export const initialExpenses = [
  { id: "EXP-101", tripId: "TRV-2024-001", category: "Flights", merchant: "Emirates Air", amount: 1850, date: "2025-04-12", status: "Reimbursed" },
  { id: "EXP-102", tripId: "TRV-2024-001", category: "Lodging", merchant: "Granbell Tokyo", amount: 920, date: "2025-04-18", status: "Approved" },
  { id: "EXP-103", tripId: "TRV-2024-003", category: "Meals", merchant: "Dubai Marina Club", amount: 280, date: "2025-05-16", status: "Pending" },
  { id: "EXP-104", tripId: "TRV-2024-004", category: "Car Rental", merchant: "Hertz SF Airport", amount: 350, date: "2025-06-11", status: "Pending" }
];

export const popularDestinations = [
  { city: "Tokyo", country: "Japan", avgCost: "$2,400", time: "11h flight", img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80" },
  { city: "Paris", country: "France", avgCost: "$1,800", time: "8h flight", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { city: "Dubai", country: "UAE", avgCost: "$1,600", time: "4h flight", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" },
  { city: "San Francisco", country: "USA", avgCost: "$3,200", time: "16h flight", img: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=600&q=80" },
  { city: "London", country: "UK", avgCost: "$2,100", time: "9h flight", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80" }
];