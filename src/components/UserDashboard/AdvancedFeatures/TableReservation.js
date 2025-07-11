import React, { useState, useEffect } from 'react';
import { 
  getDocuments, 
  addDocument, 
  updateDoc, 
  deleteDoc, 
  doc 
} from '../../../db/firebase';

const TableReservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    date: '',
    time: '',
    partySize: 2,
    specialRequests: '',
    status: 'pending', // pending, confirmed, cancelled, completed
    tableNumber: '',
    notes: ''
  });

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const reservationsData = await getDocuments('table_reservations');
      setReservations(reservationsData);
    } catch (error) {
      console.error('Error loading reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const reservationId = selectedReservation ? selectedReservation.id : `reservation_${Date.now()}`;
      const reservationData = {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current_user_id' // Replace with actual user ID
      };

      await addDocument('table_reservations', reservationId, reservationData);
      
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        date: '',
        time: '',
        partySize: 2,
        specialRequests: '',
        status: 'pending',
        tableNumber: '',
        notes: ''
      });
      setSelectedReservation(null);
      loadReservations();
    } catch (error) {
      console.error('Error saving reservation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);
    setFormData({
      customerName: reservation.customerName || '',
      customerEmail: reservation.customerEmail || '',
      customerPhone: reservation.customerPhone || '',
      date: reservation.date || '',
      time: reservation.time || '',
      partySize: reservation.partySize || 2,
      specialRequests: reservation.specialRequests || '',
      status: reservation.status || 'pending',
      tableNumber: reservation.tableNumber || '',
      notes: reservation.notes || ''
    });
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'table_reservations', reservationId));
        loadReservations();
      } catch (error) {
        console.error('Error deleting reservation:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      await updateDoc(doc(db, 'table_reservations', reservationId), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      loadReservations();
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Table Reservation Management</h2>
      
      {/* Reservation Form */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          {selectedReservation ? 'Edit Reservation' : 'Create New Reservation'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => setFormData({...formData, customerName: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Customer Email</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Customer Phone</label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Party Size</label>
            <select
              value={formData.partySize}
              onChange={(e) => setFormData({...formData, partySize: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Table Number</label>
            <input
              type="text"
              value={formData.tableNumber}
              onChange={(e) => setFormData({...formData, tableNumber: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="e.g., Table 5, Booth 2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full p-2 border rounded"
              required
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Special Requests</label>
            <textarea
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Any special requests or dietary restrictions..."
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full p-2 border rounded"
              rows="2"
              placeholder="Internal notes..."
            />
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (selectedReservation ? 'Update Reservation' : 'Create Reservation')}
          </button>
          
          {selectedReservation && (
            <button
              type="button"
              onClick={() => {
                setSelectedReservation(null);
                setFormData({
                  customerName: '',
                  customerEmail: '',
                  customerPhone: '',
                  date: '',
                  time: '',
                  partySize: 2,
                  specialRequests: '',
                  status: 'pending',
                  tableNumber: '',
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Reservations List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Reservations</h3>
        
        {loading ? (
          <div className="text-center py-4">Loading reservations...</div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No reservations yet</div>
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{reservation.customerName}</h4>
                    <p className="text-sm text-gray-600">{reservation.customerEmail}</p>
                    <p className="text-sm text-gray-600">{reservation.customerPhone}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(reservation.status)}`}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium">Date & Time</p>
                    <p className="text-sm text-gray-600">{reservation.date} at {reservation.time}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Party Size</p>
                    <p className="text-sm text-gray-600">{reservation.partySize} people</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Table</p>
                    <p className="text-sm text-gray-600">{reservation.tableNumber || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-gray-600">{new Date(reservation.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                {reservation.specialRequests && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Special Requests</p>
                    <p className="text-sm text-gray-600">{reservation.specialRequests}</p>
                  </div>
                )}
                
                {reservation.notes && (
                  <div className="mb-3">
                    <p className="text-sm font-medium">Notes</p>
                    <p className="text-sm text-gray-600">{reservation.notes}</p>
                  </div>
                )}
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(reservation)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                    disabled={reservation.status === 'confirmed'}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                    disabled={reservation.status === 'cancelled'}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                    disabled={reservation.status === 'completed'}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableReservation; 