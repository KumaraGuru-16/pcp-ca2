import { useOrder } from '../context/appContext';
import { Link } from 'react-router-dom';

export default function OrdersList() {
  const { orders } = useOrder();

  // Filter valid orders only
  const validOrders = orders.filter(
    (order) =>
      order.items &&
      order.items.length > 0 &&
      order.items.every((item) => item.quantity > 0) &&
      order.totalAmount > 0
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>All Orders</h1>
      {validOrders.length === 0 ? (
        <p>No valid orders found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {validOrders.map((order) => (
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
