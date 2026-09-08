import React, { useState } from 'react';
import { initialTrips, initialExpenses, popularDestinations } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [trips, setTrips] = useState(initialTrips);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [notification, setNotification] = useState(null);

  // New Trip Form State
  const [formData, setFormData] = useState({
    traveler: 'Alfiya Khan',
    department: 'Engineering',
    destination: '',
    purpose: '',
    departDate: '',
    returnDate: '',
    transport: 'Flight (Business Class)',
    hotel: '',
    budget: ''
  });

  // New Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    tripId: 'TRV-2024-001',
    category: 'Meals',
    merchant: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();
    if (!formData.destination || !formData.departDate || !formData.budget) {
      alert('Please fill out all required fields!');
      return;
    }
    const newTrip = {
      id: `TRV-2025-00${trips.length + 1}`,
      ...formData,
      budget: Number(formData.budget),
      status: 'Pending',
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80"
    };
    setTrips([newTrip, ...trips]);
    setFormData({
      traveler: 'Alfiya Khan',
      department: 'Engineering',
      destination: '',
      purpose: '',
      departDate: '',
      returnDate: '',
      transport: 'Flight (Business Class)',
      hotel: '',
      budget: ''
    });
    showToast(`✈️ Trip to ${newTrip.destination} submitted for approval!`);
    setActiveTab('requests');
  };

  const handleUpdateStatus = (id, newStatus) => {
    setTrips(trips.map(t => t.id === id ? { ...t, status: newStatus } : t));
    showToast(`Request ${id} updated to ${newStatus}`);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.merchant || !expenseForm.amount) return;
    const newExp = {
      id: `EXP-${expenses.length + 101}`,
      ...expenseForm,
      amount: Number(expenseForm.amount),
      status: 'Pending'
    };
    setExpenses([newExp, ...expenses]);
    setExpenseForm({
      tripId: 'TRV-2024-001',
      category: 'Meals',
      merchant: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    });
    showToast(`💰 Expense of $${newExp.amount} logged successfully!`);
  };

  const filteredTrips = trips.filter(t => {
    const matchSearch = t.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.traveler.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const totalSpend = trips.reduce((sum, t) => sum + t.budget, 0);
  const pendingCount = trips.filter(t => t.status === 'Pending' || t.status === 'In Review').length;
  const approvedCount = trips.filter(t => t.status === 'Approved').length;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400 transition-all animate-bounce">
          <span>{notification}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center font-black text-xl text-slate-950 shadow-lg shadow-cyan-500/20">
              ✈
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-teal-200 bg-clip-text text-transparent">
                Wanderlust
              </h1>
              <p className="text-xs text-slate-400">Corporate Travel Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'requests', label: 'Travel Requests', icon: '🌍', count: trips.length },
              { id: 'book', label: 'Book New Trip', icon: '➕' },
              { id: 'approvals', label: 'Approvals Queue', icon: '⏱', count: pendingCount },
              { id: 'expenses', label: 'Expense Tracker', icon: '💳' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-400 border border-teal-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.id === 'approvals' && pendingCount > 0
                      ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Card */}
        <div className="p-4 m-4 bg-slate-800/60 rounded-2xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white text-sm">
            AK
          </div>
          <div className="overflow-hidden">
            <h4 className="text-sm font-semibold truncate">Alfiya Khan</h4>
            <p className="text-xs text-slate-400 truncate">Lead Travel Admin</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-18 px-8 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold capitalize">
              {activeTab === 'dashboard' ? 'Overview & Analytics' : activeTab.replace('-', ' ')}
            </h2>
            <p className="text-xs text-slate-400">Welcome back, manage company itineraries and travel workflows</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('book')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>+</span>
              <span>New Travel Request</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="p-8 space-y-8">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Stat Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                {[
                  { title: 'Total Trips Managed', val: trips.length, icon: '✈️', color: 'from-cyan-500/20 to-blue-500/5 border-cyan-500/30 text-cyan-400' },
                  { title: 'Active / Approved', val: approvedCount, icon: '✅', color: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/30 text-emerald-400' },
                  { title: 'Pending Approval', val: pendingCount, icon: '⏳', color: 'from-amber-500/20 to-orange-500/5 border-amber-500/30 text-amber-400' },
                  { title: 'Total Travel Spend', val: `$${totalSpend.toLocaleString()}`, icon: '💳', color: 'from-purple-500/20 to-pink-500/5 border-purple-500/30 text-purple-400' },
                ].map((s, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl bg-gradient-to-br ${s.color} border backdrop-blur`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{s.title}</span>
                      <span className="text-2xl">{s.icon}</span>
                    </div>
                    <div className="text-3xl font-extrabold">{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Popular Corporate Destinations Showcase */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>🌆</span> Trending Corporate Destinations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {popularDestinations.map((d, i) => (
                    <div key={i} className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-teal-500/50 transition-all shadow-lg">
                      <img src={d.img} alt={d.city} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-3 flex flex-col justify-end">
                        <h4 className="font-bold text-sm text-white">{d.city}, {d.country}</h4>
                        <div className="flex justify-between items-center text-xs text-slate-300 mt-1">
                          <span className="text-teal-400 font-semibold">{d.avgCost}</span>
                          <span>{d.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold">Recent Travel Bookings</h3>
                  <button onClick={() => setActiveTab('requests')} className="text-sm text-teal-400 hover:underline">
                    View All →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-800 text-slate-400 uppercase text-xs">
                      <tr>
                        <th className="pb-3">Trip ID</th>
                        <th className="pb-3">Traveler</th>
                        <th className="pb-3">Destination</th>
                        <th className="pb-3">Dates</th>
                        <th className="pb-3">Budget</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {trips.slice(0, 4).map(trip => (
                        <tr key={trip.id} className="hover:bg-slate-800/30">
                          <td className="py-4 font-mono text-xs text-teal-400">{trip.id}</td>
                          <td className="py-4 font-medium">{trip.traveler}</td>
                          <td className="py-4 text-slate-300">{trip.destination}</td>
                          <td className="py-4 text-xs text-slate-400">{trip.departDate} to {trip.returnDate}</td>
                          <td className="py-4 font-semibold text-slate-200">${trip.budget}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              trip.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                              trip.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                              'bg-slate-700/50 text-slate-300'
                            }`}>
                              {trip.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button
                              onClick={() => setSelectedTrip(trip)}
                              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg border border-slate-700"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: TRAVEL REQUESTS TABLE */}
          {activeTab === 'requests' && (
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-5">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <input
                  type="text"
                  placeholder="Search by destination, traveler, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-teal-500"
                />
                <div className="flex gap-2">
                  {['All', 'Approved', 'Pending', 'In Review'].map(st => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        statusFilter === st
                          ? 'bg-teal-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-800 text-slate-400 uppercase text-xs">
                    <tr>
                      <th className="pb-3">Trip ID</th>
                      <th className="pb-3">Traveler</th>
                      <th className="pb-3">Department</th>
                      <th className="pb-3">Destination</th>
                      <th className="pb-3">Dates</th>
                      <th className="pb-3">Budget</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredTrips.map(trip => (
                      <tr key={trip.id} className="hover:bg-slate-800/30">
                        <td className="py-4 font-mono text-xs text-teal-400">{trip.id}</td>
                        <td className="py-4 font-medium">{trip.traveler}</td>
                        <td className="py-4 text-xs text-slate-400">{trip.department}</td>
                        <td className="py-4 font-semibold text-slate-200">{trip.destination}</td>
                        <td className="py-4 text-xs text-slate-400">{trip.departDate} → {trip.returnDate}</td>
                        <td className="py-4 font-bold text-teal-300">${trip.budget}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            trip.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            trip.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {trip.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => setSelectedTrip(trip)}
                            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg border border-slate-700"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BOOK TRIP FORM */}
          {activeTab === 'book' && (
            <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-2">Create New Travel Booking</h3>
              <p className="text-xs text-slate-400 mb-6">Submit travel details for corporate review and airline ticketing.</p>

              <form onSubmit={handleCreateTrip} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Traveler Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.traveler}
                      onChange={e => setFormData({ ...formData, traveler: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Department</label>
                    <select
                      value={formData.department}
                      onChange={e => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    >
                      <option>Engineering</option>
                      <option>Sales & Solutions</option>
                      <option>Product & Design</option>
                      <option>Executive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Destination City & Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zurich, Switzerland"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Business Purpose / Itinerary *</label>
                  <textarea
                    required
                    rows="2"
                    placeholder="e.g. Attending AI Europe Conference and Client Discovery Meetings"
                    value={formData.purpose}
                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Departure Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.departDate}
                      onChange={e => setFormData({ ...formData, departDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Return Date</label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Transport Mode</label>
                    <select
                      value={formData.transport}
                      onChange={e => setFormData({ ...formData, transport: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    >
                      <option>Flight (Business Class)</option>
                      <option>Flight (Economy Class)</option>
                      <option>High-Speed Train</option>
                      <option>Company Fleet / Cab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Estimated Budget ($ USD) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 2500"
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Submit Travel Request
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: APPROVALS QUEUE */}
          {activeTab === 'approvals' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Manager Review & Booking Authorization</h3>
              <p className="text-xs text-slate-400">Review pending travel requests and grant flight/hotel procurement approval.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {trips.filter(t => t.status === 'Pending' || t.status === 'In Review').map(trip => (
                  <div key={trip.id} className="p-6 bg-slate-900 border border-amber-500/30 rounded-2xl space-y-4 shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono text-teal-400">{trip.id}</span>
                        <h4 className="text-lg font-bold text-white">{trip.destination}</h4>
                        <p className="text-xs text-slate-400">{trip.traveler} • {trip.department}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30">
                        {trip.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      "{trip.purpose}"
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <div>🗓 Dates: <span className="text-slate-200 font-medium">{trip.departDate}</span></div>
                      <div>💰 Budget: <span className="text-teal-400 font-bold">${trip.budget}</span></div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleUpdateStatus(trip.id, 'Approved')}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        ✓ Approve Request
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(trip.id, 'Rejected')}
                        className="flex-1 py-2 bg-red-900/60 hover:bg-red-800 text-red-200 rounded-xl text-xs font-bold border border-red-700/50 transition-all"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {trips.filter(t => t.status === 'Pending' || t.status === 'In Review').length === 0 && (
                <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
                  🎉 No pending requests in queue! All travel orders are approved.
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EXPENSES TRACKER */}
          {activeTab === 'expenses' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold">Disbursed Travel Expenses</h3>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
                      <tr>
                        <th className="p-4">Expense ID</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Merchant</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {expenses.map(exp => (
                        <tr key={exp.id} className="hover:bg-slate-800/40">
                          <td className="p-4 font-mono text-xs text-teal-400">{exp.id}</td>
                          <td className="p-4 font-medium">{exp.category}</td>
                          <td className="p-4 text-slate-300">{exp.merchant}</td>
                          <td className="p-4 font-bold text-white">${exp.amount}</td>
                          <td className="p-4 text-xs text-slate-400">{exp.date}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400">
                              {exp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Log Expense Form */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4">
                <h4 className="font-bold text-lg">Log Reimbursement</h4>
                <form onSubmit={handleAddExpense} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                    <select
                      value={expenseForm.category}
                      onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    >
                      <option>Flights</option>
                      <option>Lodging</option>
                      <option>Meals</option>
                      <option>Car Rental / Cab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Merchant / Vendor</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hilton Tokyo"
                      value={expenseForm.merchant}
                      onChange={e => setExpenseForm({ ...expenseForm, merchant: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Amount ($)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 450"
                      value={expenseForm.amount}
                      onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    Add Expense
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Trip Details Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-fade-in">
            <img src={selectedTrip.image} alt={selectedTrip.destination} className="w-full h-48 object-cover" />
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono text-teal-400">{selectedTrip.id}</span>
                  <h3 className="text-2xl font-bold text-white">{selectedTrip.destination}</h3>
                  <p className="text-xs text-slate-400">{selectedTrip.traveler} • {selectedTrip.department}</p>
                </div>
                <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-xs font-bold border border-teal-500/30">
                  {selectedTrip.status}
                </span>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm">
                <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Mission Itinerary</p>
                <p className="text-slate-200">{selectedTrip.purpose}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Departure Date</span>
                  <span className="font-semibold text-white">{selectedTrip.departDate}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Return Date</span>
                  <span className="font-semibold text-white">{selectedTrip.returnDate}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Flight / Transport</span>
                  <span className="font-semibold text-white truncate block">{selectedTrip.transport}</span>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="text-slate-400 block mb-1">Authorized Budget</span>
                  <span className="font-bold text-teal-400">${selectedTrip.budget}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTrip(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-sm"
              >
                Close Itinerary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
