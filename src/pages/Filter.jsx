import { useState } from 'react';
import { useOrder } from '../context/appContext';
import { Link } from 'react-router-dom';

export default function Filter() {
  const { orders } = useOrder();
  const [restaurantFilter, setRestaurantFilter] = useState('');

  // Filter valid orders only
  const validOrders = orders.filter(
    (order) =>
      order.items &&
      order.items.length > 0 &&
      order.items.every((item) => item.quantity > 0) &&
      order.totalAmount > 0
  );

  // Filter by restaurant name
  const filteredOrders = validOrders.filter((order) =>
    order.restaurant.toLowerCase().includes(restaurantFilter.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Filter Orders</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="restaurant-filter">
          <strong>Search by Restaurant Name:</strong>
        </label>
        <br />
        <input
          id="restaurant-filter"
          type="text"
          placeholder="Enter restaurant name"
          data-testid="filter-input"
          value={restaurantFilter}
          onChange={(e) => setRestaurantFilter(e.target.value)}
          style={{
            padding: '10px',
            marginTop: '10px',
            width: '100%',
            maxWidth: '400px',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <h2>
        Results: {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
      </h2>

      {filteredOrders.length === 0 ? (
        <p>No matching orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredOrders.map((order) => (
            <li
              key={order.orderId}
              data-testid="order-item"
              style={{
                border: '1px solid #ddd',
                padding: '15px',
                marginBottom: '10px',
                borderRadius: '5px',
              }}
            >
              <h3>Order #{order.orderId}</h3>
              <p>
                <strong>Customer:</strong> {order.customerName || 'Unknown'}
              </p>
              <p>
                <strong>Restaurant:</strong> {order.restaurant}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <Link to={`/orders/${order.orderId}`} style={{ color: '#007bff', textDecoration: 'underline' }}>
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
