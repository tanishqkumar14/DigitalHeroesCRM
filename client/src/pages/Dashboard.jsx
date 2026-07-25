import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Trophy,
  CircleX,
  IndianRupee,
} from "lucide-react";

import Layout from "../components/Layout/Layout";

import StatCard from "../components/Dashboard/StatCard";
import RevenueChart from "../components/Dashboard/RevenueChart";
import LeadSourceChart from "../components/Dashboard/LeadSourceChart";
import StatusChart from "../components/Dashboard/StatusChart";
import RecentLeads from "../components/Dashboard/RecentLeads";

import { getDashboardStats } from "../services/lead";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    stats: {
      totalLeads: 0,
      newLeads: 0,
      wonLeads: 0,
      lostLeads: 0,
      totalRevenue: 0,
    },
    sourceData: [],
    statusData: [],
    monthlyLeads: [],
    recentLeads: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="space-y-8">

        {/* Welcome Banner */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-8 text-white shadow-xl">

          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="mt-2 text-blue-100">
              Here's an overview of your CRM performance today.
            </p>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

          <StatCard
            title="Total Leads"
            value={dashboard.stats.totalLeads}
            icon={<Users size={30} />}
            color="bg-blue-500"
          />

          <StatCard
            title="New Leads"
            value={dashboard.stats.newLeads}
            icon={<UserPlus size={30} />}
            color="bg-cyan-500"
          />

          <StatCard
            title="Won Deals"
            value={dashboard.stats.wonLeads}
            icon={<Trophy size={30} />}
            color="bg-green-500"
          />

          <StatCard
            title="Lost Deals"
            value={dashboard.stats.lostLeads}
            icon={<CircleX size={30} />}
            color="bg-red-500"
          />

          <StatCard
            title="Revenue"
            value={`₹${dashboard.stats.totalRevenue.toLocaleString()}`}
            icon={<IndianRupee size={30} />}
            color="bg-amber-500"
          />

        </div>

        {/* Charts */}

        <div className="grid gap-8 xl:grid-cols-2">

          <RevenueChart
            data={dashboard.monthlyLeads}
          />

          <LeadSourceChart
            data={dashboard.sourceData}
          />

        </div>

        {/* Bottom */}

        <div className="grid gap-8 xl:grid-cols-2">

          <StatusChart
            data={dashboard.statusData}
          />

          <RecentLeads
            leads={dashboard.recentLeads}
          />

        </div>

      </div>

    </Layout>
  );
};

export default Dashboard;