import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Shield, Clock } from 'lucide-react';
import Layout from '../../components/dashboard/Layout';
import { StatCard } from '../../components/dashboard/StatCard';
import CampaignCard from '../../components/dashboard/CampaignCard';
import { useAuth } from '../../hooks/useAuth';
import api from '../../lib/api';
import Button from '../../components/Button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const MDiv: any = motion.div;

const mockCampaigns = [
  { 
    id: 1, 
    title: 'Computer Science Scholarship - MIT', 
    student: 'Alex Chen',
    institution: 'Massachusetts Institute of Technology', 
    goal: 25000, 
    raised: 18500, 
    status: 'active',
    description: 'Supporting my journey to complete a Master\'s in AI and Machine Learning.',
    verified: true,
    daysLeft: 45
  },
  { 
    id: 2, 
    title: 'Medical Equipment Fund', 
    student: 'Sarah Johnson',
    institution: 'Johns Hopkins University', 
    goal: 15000, 
    raised: 15000, 
    status: 'completed',
    description: 'Funding essential medical equipment for practical training.',
    verified: true,
    daysLeft: 0
  },
  { 
    id: 3, 
    title: 'Engineering Textbooks & Software', 
    student: 'Michael Rodriguez',
    institution: 'Stanford University', 
    goal: 8000, 
    raised: 3200, 
    status: 'active',
    description: 'Acquiring specialized engineering software and reference materials.',
    verified: true,
    daysLeft: 62
  },
  { 
    id: 4, 
    title: 'Art Supplies for Fine Arts Degree', 
    student: 'Emma Watson',
    institution: 'Rhode Island School of Design', 
    goal: 5000, 
    raised: 1200, 
    status: 'active',
    description: 'Professional art supplies for portfolio development and exhibitions.',
    verified: false,
    daysLeft: 30
  },
];

const mockContributions = [
  { id: 1, campaign: 'Computer Science Scholarship - MIT', amount: 250, date: '2025-10-05', hash: '0x1234...5678', status: 'confirmed' },
  { id: 2, campaign: 'Medical Equipment Fund', amount: 500, date: '2025-09-28', hash: '0x9876...5432', status: 'confirmed' },
  { id: 3, campaign: 'Engineering Textbooks & Software', amount: 150, date: '2025-09-20', hash: '0xabcd...efgh', status: 'confirmed' },
];

const DonorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [contributions, setContributions] = useState(mockContributions);

  const [trend, setTrend] = useState<Array<{ date: string; amount: number }>>([]);
  const [monthlyData, setMonthlyData] = useState<Array<{ month: string; donations: number; campaigns: number }>>([]);

  useEffect(() => {
    // Mock data for charts
    setTrend([
      { date: 'Apr', amount: 120 },
      { date: 'May', amount: 80 },
      { date: 'Jun', amount: 200 },
      { date: 'Jul', amount: 150 },
      { date: 'Aug', amount: 90 },
      { date: 'Sep', amount: 300 },
      { date: 'Oct', amount: 250 },
    ]);

    setMonthlyData([
      { month: 'Apr', donations: 2, campaigns: 1 },
      { month: 'May', donations: 1, campaigns: 1 },
      { month: 'Jun', donations: 3, campaigns: 2 },
      { month: 'Jul', donations: 2, campaigns: 1 },
      { month: 'Aug', donations: 1, campaigns: 1 },
      { month: 'Sep', donations: 4, campaigns: 3 },
      { month: 'Oct', donations: 3, campaigns: 2 },
    ]);
  }, []);

  const totalDonated = contributions.reduce((sum, c) => sum + c.amount, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  const handleDonate = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowDonationModal(true);
  };

  const submitDonation = async () => {
    if (!donationAmount || !selectedCampaign) return;
    
    // Mock donation submission
    const newContribution = {
      id: contributions.length + 1,
      campaign: selectedCampaign.title,
      amount: parseInt(donationAmount),
      date: new Date().toISOString().split('T')[0],
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      status: 'confirmed'
    };

    setContributions([newContribution, ...contributions]);
    setShowDonationModal(false);
    setDonationAmount('');
    setSelectedCampaign(null);

    // Update campaign raised amount
    setCampaigns(campaigns.map(c => 
      c.id === selectedCampaign.id 
        ? { ...c, raised: c.raised + parseInt(donationAmount) }
        : c
    ));
  };

  return (
    <Layout role="donor">
      <div className="space-y-6">
        {/* Welcome Header */}
        <MDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 crypto-glow"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white neon-text">Welcome back, {user?.email?.split('@')[0] || 'Donor'}!</h1>
              <p className="text-gray-400 mt-2">Discover amazing projects and make a difference in students' lives</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">Donor Portal</div>
                <div className="text-sm text-gray-400">Impact Dashboard</div>
              </div>
            </div>
          </div>
        </MDiv>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <StatCard title="Total Donated" value={`$${totalDonated.toLocaleString()}`} accent="green" />
          </MDiv>
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StatCard title="Active Campaigns" value={activeCampaigns.toString()} accent="amber" />
          </MDiv>
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard title="Total Contributions" value={contributions.length.toString()} accent="cyan" />
          </MDiv>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Discover Campaigns */}
            <MDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-6 crypto-glow"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white neon-text">Discover Campaigns</h2>
                  <p className="text-gray-400 mt-1">Support students and make an impact on education</p>
                </div>
                <div className="flex gap-2">
                  <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <button className="btn-primary">All</button>
                  </MDiv>
                  <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Verified</button>
                  <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">Urgent</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((campaign, index) => (
                  <MDiv
                    key={campaign.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card-hover p-4 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{campaign.title}</h3>
                          {campaign.verified && (
                            <Shield className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{campaign.student} • {campaign.institution}</p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{campaign.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}</span>
                      </div>
                      
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            campaign.status === 'completed' ? 'bg-green-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                          }`}
                          style={{ width: `${Math.min((campaign.raised / campaign.goal) * 100, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {campaign.daysLeft} days left
                          </span>
                          <span>{Math.round((campaign.raised / campaign.goal) * 100)}% funded</span>
                        </div>
                        <MDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <button 
                            onClick={() => handleDonate(campaign)}
                            disabled={campaign.status === 'completed'}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                              campaign.status === 'completed' 
                                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'btn-success hover:shadow-lg'
                            }`}
                          >
                            {campaign.status === 'completed' ? 'Completed' : 'Donate'}
                          </button>
                        </MDiv>
                      </div>
                    </div>
                  </MDiv>
                ))}
              </div>
            </MDiv>

            {/* My Contributions */}
            <MDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">My Contributions</h3>
              <div className="space-y-3">
                {contributions.map((contribution) => (
                  <MDiv
                    key={contribution.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card-hover p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-white">{contribution.campaign}</div>
                        <div className="text-sm text-gray-400 mt-1">
                          <span className="font-mono text-xs">{contribution.hash}</span>
                          <span className="mx-2">•</span>
                          <span>{contribution.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-400">${contribution.amount}</div>
                        <div className="text-xs text-green-500">Confirmed</div>
                      </div>
                    </div>
                  </MDiv>
                ))}
              </div>
            </MDiv>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Giving Trend Chart */}
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-card p-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Giving Trend</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.2)" />
                    <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                        border: '1px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#06b6d4" 
                      strokeWidth={3} 
                      dot={{ fill: '#06b6d4', r: 4 }}
                      activeDot={{ r: 6, fill: '#0891b2' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </MDiv>

            {/* Monthly Activity */}
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Monthly Activity</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.2)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.8)', 
                        border: '1px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="donations" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </MDiv>

            {/* Quick Actions */}
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass-card p-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button className="w-full btn-primary">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Browse All Campaigns
                  </button>
                </MDiv>
                <button className="w-full px-4 py-2 bg-slate-800/60 text-gray-300 rounded-lg hover:bg-slate-700/60 transition-colors">
                  Download Tax Receipts
                </button>
                <button className="w-full px-4 py-2 bg-slate-800/60 text-gray-300 rounded-lg hover:bg-slate-700/60 transition-colors">
                  Manage Payment Methods
                </button>
              </div>
            </MDiv>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <MDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-md crypto-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Make a Donation</h3>
              <button 
                onClick={() => setShowDonationModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-medium text-white">{selectedCampaign.title}</div>
                <div className="text-sm text-gray-400">{selectedCampaign.student}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Donation Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="input-dark pl-8"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[25, 50, 100, 250].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount.toString())}
                      className="px-3 py-1 text-sm bg-slate-700/50 text-gray-300 rounded hover:bg-slate-600/50 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                <select className="input-dark">
                  <option>Credit Card (**** 1234)</option>
                  <option>Crypto Wallet</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={submitDonation}
                  disabled={!donationAmount}
                  className="flex-1 btn-success disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Donate ${donationAmount || '0'}
                </button>
                <button 
                  onClick={() => setShowDonationModal(false)}
                  className="px-4 py-2 bg-slate-700/50 text-gray-300 rounded-lg hover:bg-slate-600/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </MDiv>
        </div>
      )}
    </Layout>
  );
};

export default DonorDashboard;
