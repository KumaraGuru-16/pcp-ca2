import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { OrderProvider } from './context/appContext';
import OrdersList from './pages/OrdersList';
import OrderDetail from './pages/OrderDetail';
import Filter from './pages/Filter';
import Stats from './pages/Stats';

function App() {
  return (
    <OrderProvider>
      <Router>
        <nav style={{ backgroundColor: '#333', padding: '15px', marginBottom: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '20px' }}>
            <li>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                All Orders
              </Link>
            </li>
            <li>
              <Link to="/filter" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                Filter Orders
              </Link>
            </li>
            <li>
              <Link to="/stats" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                Analytics
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<OrdersList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
}

export default App;
