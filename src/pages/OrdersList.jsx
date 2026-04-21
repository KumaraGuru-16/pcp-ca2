import { useOrder } from '../context/appContext';
import { Link } from 'react-router-dom';

export default function OrdersList() {
  const { orders } = useOrder();

  // Filter valid orders - ensure required fields exist
  const validOrders = orders
    .map((order) => ({
      ...order,
      items: order.items || [],
      totalAmount: order.totalAmount || 0,
    }))
    .filter(
      (order) =>
        order.orderId &&
        order.items.length > 0 &&
        order.totalAmount > 0
    );

  return (
    <div>
      <h1>All Orders</h1>
      {validOrders.length === 0 ? (
        <p>No valid orders found.</p>
      ) : (
        <ul>
          {validOrders.map((order) => (
            <li
              key={order.orderId}
              data-testid="order-item"
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
              <Link to={`/orders/${order.orderId}`}>
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
