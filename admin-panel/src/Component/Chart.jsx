import React, { useEffect, useState } from "react";
import { allOrdercount } from "../api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../Stylesheets/Chart.css";

function Chart() {
  const [chartData, setChartData] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await allOrdercount();
        const orders = res.data.data;

        const now = new Date();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;

        const currentWeek = orders.filter(
          (o) => now - new Date(o.createdAt) <= oneWeek
        );

        const previousWeek = orders.filter(
          (o) =>
            now - new Date(o.createdAt) > oneWeek &&
            now - new Date(o.createdAt) <= oneWeek * 2
        );

        setChartData([
          { name: "Last Week", orders: previousWeek.length },
          { name: "This Week", orders: currentWeek.length },
        ]);

        setDetail({
          previous: previousWeek.length,
          current: currentWeek.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const difference =
    detail && detail.current - detail.previous;

  return (
    <div className="chart-page">
      <div className="chart-card">
        <h2>Weekly Orders Overview</h2>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              onClick={() => {}}
            >
              <CartesianGrid strokeDasharray="3 6" vertical={false} />
              <XAxis />
              <YAxis allowDecimals={false} />
              <Tooltip />

              <Bar
                dataKey="orders"
                fill="#6366f1"
                barSize={60}
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 CLICK INFO PANEL */}
        {detail && (
          <div className="chart-info">
            <div>
              <span>Last Week</span>
              <strong>{detail.previous}</strong>
            </div>

            <div>
              <span>This Week</span>
              <strong>{detail.current}</strong>
            </div>

            <div className={difference >= 0 ? "profit" : "loss"}>
              <span>Change</span>
              <strong>
                {difference >= 0 ? "+" : ""}
                {difference}
              </strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chart;
