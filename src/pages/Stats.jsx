import { useEffect } from 'react';
import { useOrder } from '../context/appContext';

export default function Stats() {
  const { orders } = useOrder();

  // Dynamically calculate metrics (NO state storage)
  const validOrders = orders.filter(
    (order) =>
      order.items &&
      order.items.length > 0 &&
      order.items.every((item) => item.quantity > 0) &&
      order.totalAmount > 0
  );

  const totalOrders = validOrders.length;
  const deliveredOrders = validOrders.reduce(
    (count, order) => (order.status === 'Delivered' ? count + 1 : count),
    0
  );
  const cancelledOrders = validOrders.reduce(
    (count, order) => (order.status === 'Cancelled' ? count + 1 : count),
    0
  );

  // Expose to window for auto-grader
  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Orders Analytics Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px', minWidth: '200px' }}>
          <h3>Total Valid Orders</h3>
          <div data-testid="total-orders" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {totalOrders}
          </div>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', minWidth: '200px' }}>
          <h3>Delivered Orders</h3>
          <div data-testid="delivered-orders" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {deliveredOrders}
          </div>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px', minWidth: '200px' }}>
          <h3>Cancelled Orders</h3>
          <div data-testid="cancelled-orders" style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {cancelledOrders}
          </div>
        </div>
      </div>
    </div>
  );
}
