import React, { useState, useContext, useEffect } from 'react';
import Loading from '../src/reusable/loading';
import Error from '../src/reusable/error';
import axios from '../src/utils/axios';
import { GlobalContext } from '../src/context/GlobalContext';

import Dashboard from '../src/pagesComponent/dashboard';
import CheckAuth from '../src/reusable/checkAuth';

export default function adminDashboard() {
  const { user: globaluser } = useContext(GlobalContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: '',
  });
  const [events, setEvents] = useState([]);
  const [purchasings, setPurchasings] = useState([]);
  const [todaySales, setTodaySales] = useState(0);
  const [chartData, setChartData] = useState({
    lastYearSalesGraph: [],
    lastMonthSalesGraph: [],
    lastWeekSalesGraph: [],
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.post(`/events/getDashboardData`, null, {
        headers: {
          authorization: 'Bearer ' + globaluser?.token,
        },
      });
      if (result.data.success === true) {
        setEvents(result.data.data.events);
        setPurchasings(result.data.data.bookings);
        setChartData({
          lastYearSalesGraph: result.data.data.lastYearSalesGraph,
          lastMonthSalesGraph: result.data.data.lastMonthSalesGraph,
          lastWeekSalesGraph: result.data.data.lastWeekSalesGraph,
        });
        setTodaySales(result.data.data.todayTicketSold);
      } else {
        setError({
          status: true,
          message: result.data.message,
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError({
        status: true,
        message: err.response?.data?.message || 'Fail to fetch Event',
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error.status) {
    return <Error message={error.message} />;
  }
  return (
    <CheckAuth adminSuperAdmin>
      <Dashboard
        events={events}
        purchasings={purchasings}
        chartData={chartData}
        todaySales={todaySales}
      />
    </CheckAuth>
  );
}
