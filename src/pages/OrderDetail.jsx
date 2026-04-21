import { useParams } from 'react-router-dom';
import { useOrder } from '../context/appContext';

export default function OrderDetail() {
  const { id } = useParams();
  const { orders, markAsDelivered, markAsCancelled } = useOrder();

  const order = orders.find((o) => o.orderId === parseInt(id));

  if (!order) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Order not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Order Details - #{order.orderId}</h1>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
        <h3>Customer Information</h3>
        <p>
          <strong>Name:</strong> {order.customerName || 'Unknown'}
        </p>
        <p>
          <strong>Restaurant:</strong> {order.restaurant}
        </p>
        <h3 style={{ marginTop: '20px' }}>Items</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '10px' }}>Item Name</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Price</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Quantity</th>
              <th style={{ textAlign: 'left', padding: '10px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{item.name}</td>
                <td style={{ padding: '10px' }}>₹{item.price}</td>
                <td style={{ padding: '10px' }}>{item.quantity}</td>
                <td style={{ padding: '10px' }}>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>
          <strong>Total Amount:</strong> ₹{order.totalAmount}
        </h3>
        <p>
          <strong>Delivery Time:</strong> {order.deliveryTime} minutes
        </p>
        <p>
          <strong>Rating:</strong> {order.rating ? `${order.rating}/5` : 'Not rated'}
        </p>
        <h3 style={{ marginTop: '20px' }}>Status: {order.status}</h3>
        <div style={{ marginTop: '20px', gap: '10px', display: 'flex' }}>
          {order.status !== 'Delivered' && (
            <button
              onClick={() => markAsDelivered(order.orderId)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Mark as Delivered
            </button>
          )}
          {order.status !== 'Cancelled' && (
            <button
              onClick={() => markAsCancelled(order.orderId)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Mark as Cancelled
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
