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
        <nav>
          <ul>
            <li>
              <Link to="/">
                All Orders
              </Link>
            </li>
            <li>
              <Link to="/filter">
                Filter Orders
              </Link>
            </li>
            <li>
              <Link to="/stats">
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
