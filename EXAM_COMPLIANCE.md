# EXAM COMPLIANCE CHECKLIST ✅

## PROJECT SETUP
✅ React 19.2.5 + Vite 8.0.9 + React Router 7.14.1
✅ Axios 1.15.1 for API calls
✅ NO CSS files generated (plain HTML only)
✅ Build successful (277.94 KB gzipped)

---

## MANDATORY ROUTES (Set A)
✅ `/` → OrdersList component
✅ `/orders/:id` → OrderDetail component
✅ `/filter` → Filter component (by restaurant name)
✅ `/stats` → Stats component (analytics dashboard)

---

## CONTEXT & STATE MANAGEMENT
✅ OrderContext created with useContext hook
✅ useReducer with AppReducer (3 actions: SET_ORDERS, MARK_DELIVERED, MARK_CANCELLED)
✅ Initial state: { orders: [], loading: true, error: null }
✅ Data fetching with token authentication via getToken() and getDataset()
✅ Custom hook: useOrder() for accessing context
✅ NO hardcoded data - all from API (https://t4e-testserver.onrender.com/api)

---

## WINDOW STATE EXPOSURE (Auto-Grader Requirement)
✅ appContext.jsx: `window.appState = state;` syncs after every dispatch
✅ Stats.jsx: Exposes `window.appState = { totalOrders, deliveredOrders, cancelledOrders }`

---

## REQUIREMENT 1: Display Valid Orders (/orders)
✅ OrdersList.jsx filters valid orders:
   - orders.items exists and length > 0
   - All items have quantity > 0
   - totalAmount > 0
✅ Uses reusable component (same validation logic in Filter.jsx)
✅ Each order shown as clickable item with data-testid="order-item"
✅ Links to /orders/:id for details

---

## REQUIREMENT 2: Order Detail View (/orders/:id)
✅ OrderDetail.jsx displays complete order details
✅ Shows all items in table format with subtotals
✅ Route uses ID parameter validation
✅ "Order not found" message for invalid IDs
✅ Mark as Delivered/Cancelled buttons (updates state via reducer)
✅ Subtotal calculated dynamically: item.price * item.quantity

---

## REQUIREMENT 3: Filter Orders (/filter)
✅ Filter.jsx filters by restaurant name (case-insensitive)
✅ Input field with data-testid="filter-input"
✅ Displays matching order count
✅ Shows "No matching orders" when empty
✅ Results show only valid orders (same validation logic as Q1)
✅ Each result is clickable (data-testid="order-item")

---

## REQUIREMENT 5: Orders Analytics Dashboard (/stats)
✅ Dynamic calculation using .filter() and .reduce():
   - totalOrders: count of valid orders
   - deliveredOrders: count where status === 'Delivered'
   - cancelledOrders: count where status === 'Cancelled'
✅ Metrics NOT stored in reducer state (computed on render)
✅ Test IDs applied correctly:
   - data-testid="total-orders"
   - data-testid="delivered-orders"
   - data-testid="cancelled-orders"
✅ window.appState exposed with exact metric names
✅ Ignores invalid entries (empty items, quantity ≤ 0, totalAmount ≤ 0)

---

## REQUIREMENT 4: Order Status Logic
✅ markAsDelivered(orderId) in context → updates status to 'Delivered'
✅ markAsCancelled(orderId) in context → updates status to 'Cancelled'
✅ State updates via reducer only (no direct mutations)
✅ Status persists in state (used by Stats component)
✅ Buttons available in OrderDetail component

---

## MANDATORY RULES COMPLIANCE
✅ Single Source of Truth: All data in OrderContext
✅ All updates via Reducer: No direct state mutations
✅ No hardcoded dataset: Fetched from server
✅ No derived values in state: Computed in components (.filter/.reduce)
✅ map() usage: Applied to render lists correctly
✅ filter() + reduce(): Used in Stats component for calculations

---

## TESTING REQUIREMENTS
✅ Test ID: data-testid="total-orders"
✅ Test ID: data-testid="delivered-orders"
✅ Test ID: data-testid="cancelled-orders"
✅ Test ID: data-testid="order-item"
✅ Test ID: data-testid="filter-input"
✅ window.appState exposes computed values

---

## EDGE CASES HANDLED
✅ Missing customerName → displays "Unknown"
✅ Missing rating → displays "Not rated"
✅ Invalid order ID → "Order not found" message
✅ Empty filter results → "No matching orders found"
✅ No valid orders → "No valid orders found"
✅ Invalid orders (empty items, qty ≤ 0, amount ≤ 0) → filtered out

---

## DEPLOYMENT (Vercel)
✅ vercel.json configured with rewrites for SPA routing
✅ All routes redirect to /index.html for React Router
✅ Ready for: `npm run build && vercel deploy`

---

## FILE STRUCTURE
```
src/
├── App.jsx                          ← Main routing component
├── context/
│   └── appContext.jsx               ← OrderContext + Provider + useOrder hook
├── reducer/
│   └── AppReducer.js                ← State reducer (3 actions)
├── api/
│   └── api.js                       ← getToken + getDataset functions
├── pages/
│   ├── OrdersList.jsx               ← Route: / (display valid orders)
│   ├── OrderDetail.jsx              ← Route: /orders/:id (detail view)
│   ├── Filter.jsx                   ← Route: /filter (search by restaurant)
│   └── Stats.jsx                    ← Route: /stats (analytics dashboard)
└── main.jsx                         ← React entry point
vercel.json                          ← Deployment config
```

---

## ✅ READY FOR SUBMISSION

**All 5 Exam Questions Implemented:**
1. ✅ Display Valid Orders
2. ✅ Order Detail View
3. ✅ Filter Orders
4. ✅ Order Status Logic
5. ✅ Analytics Dashboard

**Auto-Grader Compliance:**
- ✅ 0 CSS files
- ✅ Exact test IDs
- ✅ window.appState exposed
- ✅ Dynamic calculations only
- ✅ All 4 mandatory routes
- ✅ React Context + Reducer only
- ✅ API integration working
- ✅ Vercel deployment ready
