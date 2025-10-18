import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import api from '../../lib/api';
import { 
  Search, Filter, TrendingUp, Heart, Users, Target, 
  MapPin, Clock, Star, Diamond, ArrowRight, Grid3X3,
  List, SlidersHorizontal, Home, Sparkles
} from 'lucide-react';

const MDiv: any = motion.div;

// Mock campaigns data for demo
const mockCampaigns = [
  {
    id: 1,
    title: "Computer Science Research at MIT",
    description: "Funding advanced AI research in machine learning and neural networks to develop next-generation algorithms.",
    student_name: "Alex Chen",
    institution: "MIT",
    goal: 25000,
    raised: 18500,
    supporters: 147,
    days_left: 45,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400",
    category: "Research",
    verified: true,
    featured: true,
    progress: 74
  },
  {
    id: 2,
    title: "Medical Equipment for Biomedical Engineering",
    description: "Acquiring specialized laboratory equipment for groundbreaking biomedical research and development.",
    student_name: "Sarah Johnson",
    institution: "Stanford University",
    goal: 15000,
    raised: 12300,
    supporters: 89,
    days_left: 23,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
    category: "Equipment",
    verified: true,
    featured: false,
    progress: 82
  },
  {
    id: 3,
    title: "Art Therapy Program Development",
    description: "Creating an innovative art therapy program to help students cope with academic stress and mental health challenges.",
    student_name: "Maria Garcia",
    institution: "RISD",
    goal: 8000,
    raised: 3200,
    supporters: 56,
    days_left: 62,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400",
    category: "Wellness",
    verified: true,
    featured: false,
    progress: 40
  },
  {
    id: 4,
    title: "Environmental Engineering Solutions",
    description: "Developing sustainable water purification systems for underserved communities worldwide.",
    student_name: "Michael Rodriguez",
    institution: "UC Berkeley",
    goal: 20000,
    raised: 16800,
    supporters: 203,
    days_left: 18,
    image: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400",
    category: "Environment",
    verified: true,
    featured: true,
    progress: 84
  },
  {
    id: 5,
    title: "Music Production Studio Setup",
    description: "Building a state-of-the-art music production studio for aspiring musicians and audio engineers.",
    student_name: "Emma Watson",
    institution: "Berklee College",
    goal: 12000,
    raised: 7400,
    supporters: 124,
    days_left: 35,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    category: "Arts",
    verified: true,
    featured: false,
    progress: 62
  },
  {
    id: 6,
    title: "Robotics Competition Team",
    description: "Supporting our robotics team to compete in international competitions and develop cutting-edge automation solutions.",
    student_name: "David Park",
    institution: "Carnegie Mellon",
    goal: 18000,
    raised: 9200,
    supporters: 78,
    days_left: 41,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    category: "Technology",
    verified: true,
    featured: false,
    progress: 51
  }
];

const categories = ['All', 'Research', 'Equipment', 'Wellness', 'Environment', 'Arts', 'Technology'];

const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await api.apiGet('/api/campaigns');
        // Use mock data if API returns empty or fails
        const campaignData = data?.length > 0 ? data : mockCampaigns;
        setCampaigns(campaignData);
        setFilteredCampaigns(campaignData);
      } catch (err) {
        console.error(err);
        // Fallback to mock data
        setCampaigns(mockCampaigns);
        setFilteredCampaigns(mockCampaigns);
      }
    };

    loadCampaigns();
  }, []);

  useEffect(() => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          campaign.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          campaign.institution.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || campaign.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort campaigns
    switch (sortBy) {
      case 'featured':
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'progress':
        filtered = filtered.sort((a, b) => b.progress - a.progress);
        break;
      case 'amount':
        filtered = filtered.sort((a, b) => b.raised - a.raised);
        break;
      case 'supporters':
        filtered = filtered.sort((a, b) => b.supporters - a.supporters);
        break;
      case 'ending':
        filtered = filtered.sort((a, b) => a.days_left - b.days_left);
        break;
      default:
        break;
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, searchQuery, selectedCategory, sortBy]);

  const stats = {
    total: campaigns.length,
    raised: campaigns.reduce((sum, c) => sum + c.raised, 0),
    supporters: campaigns.reduce((sum, c) => sum + c.supporters, 0),
    funded: campaigns.filter(c => c.progress >= 100).length
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <MDiv
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </MDiv>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Diamond className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FundChain</span>
          </div>

          <Link href="/login">
            <button className="btn-primary">Join Community</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <MDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">Discover Amazing Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Fund the Future of
              <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Education
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore innovative student projects, groundbreaking research, and creative endeavors 
              that are shaping tomorrow's world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
                <div className="text-gray-400 text-sm">Active Campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">${(stats.raised / 1000).toFixed(0)}K</div>
                <div className="text-gray-400 text-sm">Total Raised</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stats.supporters}</div>
                <div className="text-gray-400 text-sm">Supporters</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{stats.funded}</div>
                <div className="text-gray-400 text-sm">Successfully Funded</div>
              </div>
            </div>
          </MDiv>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="relative z-10 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns, students, or institutions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 input-dark"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                        : 'bg-slate-800/60 text-gray-300 hover:bg-slate-700/60'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-slate-800/60 text-white rounded-lg border border-gray-700/50"
                >
                  <option value="featured">Featured</option>
                  <option value="progress">Most Funded</option>
                  <option value="amount">Highest Amount</option>
                  <option value="supporters">Most Supporters</option>
                  <option value="ending">Ending Soon</option>
                </select>

                <div className="flex bg-slate-800/60 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </MDiv>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Found
            </h2>
            {selectedCategory !== 'All' && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                {selectedCategory} Category
              </span>
            )}
          </div>

          {/* Campaigns Grid/List */}
          <MDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredCampaigns.map((campaign, index) => (
              <MDiv
                key={campaign.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  viewMode === 'list' ? 'glass-card p-6 flex gap-6' : 'glass-card-hover'
                }`}
              >
                {/* Campaign Image */}
                <div className={`relative overflow-hidden rounded-xl ${
                  viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'aspect-video mb-6'
                }`}>
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                  {campaign.featured && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                      FEATURED
                    </div>
                  )}
                  {campaign.verified && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Campaign Content */}
                <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                      {campaign.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      {campaign.days_left} days left
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {campaign.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-sm text-gray-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      {campaign.student_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{campaign.student_name}</div>
                      <div className="text-gray-500 text-xs">{campaign.institution}</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">
                        ${campaign.raised.toLocaleString()} raised
                      </span>
                      <span className="text-gray-400">
                        ${campaign.goal.toLocaleString()} goal
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {campaign.supporters}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {campaign.progress}%
                      </div>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                      <Heart className="w-4 h-4" />
                      Support
                    </button>
                  </div>
                </div>
              </MDiv>
            ))}
          </MDiv>

          {/* Load More */}
          {filteredCampaigns.length > 0 && (
            <MDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center mt-12"
            >
              <button className="flex items-center gap-3 mx-auto px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-300">
                Load More Campaigns
                <ArrowRight className="w-5 h-5" />
              </button>
            </MDiv>
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;
