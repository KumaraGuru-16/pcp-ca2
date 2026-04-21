import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import {getToken, getDataset} from '../api/api';
import AppReducer from '../reducer/AppReducer';

const initialState = {
    orders: [],
    loading: true,
    error: null
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const tokenRes = await getToken(
                    "E0323045",
                    "472085",
                    "setA"
                );

                const orders = await getDataset(
                    tokenRes.token,
                    tokenRes.dataUrl
                );

                // Ensure orders is an array and transform data
                const processedOrders = Array.isArray(orders) ? orders : [];
                console.log("Orders loaded:", processedOrders);
                dispatch({ type: "SET_ORDERS", payload: processedOrders});

            }catch(err){
                console.error("Dataset Failed to Load: ", err);
                dispatch({ type: "SET_ORDERS", payload: []});
            }
        };

        fetchData();
    }, []);

    // Action wrapper functions
    const initialAction = (orders) => {
        dispatch({ type: 'SET_ORDERS', payload: orders });
    };

    const markAsDelivered = (orderId) => {
        dispatch({ type: 'MARK_DELIVERED', payload: orderId });
    };

    const markAsCancelled = (orderId) => {
        dispatch({ type: 'MARK_CANCELLED', payload: orderId });
    };

    // Sync state to window (MANDATORY for auto-grader)
    useEffect(() => {
        window.appState = state;
    }, [state]);

    return (
        <OrderContext.Provider value={{ ...state, initialAction, markAsDelivered, markAsCancelled }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);