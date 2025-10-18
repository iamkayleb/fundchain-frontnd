import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../../components/dashboard/Layout';
import { StatCard } from '../../components/dashboard/StatCard';
import CampaignSummaryCard from '../../components/dashboard/CampaignSummaryCard';
import ProfileCard from '../../components/dashboard/ProfileCard';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import { useNotifications } from '../../hooks/useNotifications';
import { CheckCircle, AlertCircle, Clock, Upload } from 'lucide-react';
import api from '../../lib/api';

const MDiv: any = motion.div;
const MotionContainer: any = motion.div;

const listItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

interface Campaign {
  id: number;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  status: string;
  deadline?: string;
  createdAt: string;
}

interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
  type: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Engineering Textbooks Fund",
    description: "Help me purchase required textbooks for my Computer Science degree. These books are essential for my coursework and future career.",
    goalAmount: 1500,
    raisedAmount: 750,
    status: "active",
    deadline: "2024-03-15",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Research Conference Attendance",
    description: "Support my attendance at the International AI Research Conference to present my thesis work and network with industry professionals.",
    goalAmount: 2500,
    raisedAmount: 1800,
    status: "active",
    deadline: "2024-02-28",
    createdAt: "2024-01-10"
  }
];

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Your campaign 'Engineering Textbooks Fund' received a new donation of $50",
    timestamp: "2024-01-20T10:30:00Z",
    read: false,
    type: "donation"
  },
  {
    id: 2,
    message: "Verification documents have been approved. You can now create campaigns!",
    timestamp: "2024-01-19T14:15:00Z",
    read: false,
    type: "verification"
  },
  {
    id: 3,
    message: "Your campaign 'Research Conference Attendance' is 72% funded",
    timestamp: "2024-01-18T09:45:00Z",
    read: true,
    type: "milestone"
  }
];

export default function StudentDashboard() {
  const { user, loading } = useAuth();
  const toast = useToast();
  const { notifications, markRead } = useNotifications();
  
  // State management
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentNotifications, setCurrentNotifications] = useState<Notification[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  
  // Modal and form state
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [creating, setCreating] = useState(false);
  const [submittingVerification, setSubmittingVerification] = useState(false);
  
  // Campaign creation form
  const [createTitle, setCreateTitle] = useState('');
  const [createGoal, setCreateGoal] = useState<number | ''>('');
  const [createDescription, setCreateDescription] = useState('');
  const [createDeadline, setCreateDeadline] = useState('');

  // Modal ref for click outside
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Load campaigns
  const loadCampaigns = async () => {
    try {
      setLoadingCampaigns(true);
      const data = await api.apiGet('/api/campaigns');
      setCampaigns(Array.isArray(data) ? data : mockCampaigns);
    } catch (err: any) {
      console.error('Failed to load campaigns:', err);
      setCampaigns(mockCampaigns);
    } finally {
      setLoadingCampaigns(false);
    }
  };

  // Load notifications
  const loadNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const data = await api.apiGet('/api/notifications');
      setCurrentNotifications(Array.isArray(data) ? data : mockNotifications);
    } catch (err: any) {
      console.error('Failed to load notifications:', err);
      setCurrentNotifications(mockNotifications);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // Create campaign
  const createCampaign = async () => {
    if (!createTitle || !createGoal) {
      toast('Please fill in all required fields');
      return;
    }

    if (!user?.verified) {
      toast('You must be verified to create campaigns');
      return;
    }

    try {
      setCreating(true);
      const campaignData = {
        title: createTitle,
        description: createDescription,
        goal_amount: createGoal,
        deadline: createDeadline || null
      };

      const data = await api.apiPost('/api/campaigns', campaignData);
      toast('Campaign created successfully!');
      
      // Reset form
      setCreateTitle('');
      setCreateGoal('');
      setCreateDescription('');
      setCreateDeadline('');
      setOpen(false);
      
      // Reload campaigns
      await loadCampaigns();
    } catch (err: any) {
      console.error('Campaign creation failed:', err);
      // Show more specific error message
      const errorMessage = err?.response?.data?.msg || err?.message || 'Failed to create campaign';
      toast(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  // Submit verification
  const submitVerification = async () => {
    if (files.length === 0) {
      toast('Please select at least one document');
      return;
    }

    if (!user) {
      toast('You must be logged in to submit verification');
      return;
    }

    try {
      setSubmittingVerification(true);
      
      // Convert files to base64 and create data URLs
      const documentsPromises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            // Keep the full data URL for the backend
            resolve(result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const documentUrls = await Promise.all(documentsPromises);
      
      const verificationData = {
        document_urls: documentUrls
      };

      console.log('Submitting verification data:', {
        document_count: documentUrls.length,
        file_names: files.map(f => f.name),
        total_size: files.reduce((sum, f) => sum + f.size, 0)
      });

      await api.apiPost('/api/student/verify-request', verificationData);
      toast('Verification documents submitted successfully! You will be notified once reviewed.');
      
      // Reset form
      setFiles([]);
      setOpen(false);
      
      // Reload notifications
      await loadNotifications();
    } catch (err: any) {
      console.error('Verification submission failed:', err);
      // Show more specific error message
      const errorMessage = err?.response?.data?.msg || err?.message || 'Failed to submit verification documents';
      toast(errorMessage);
    } finally {
      setSubmittingVerification(false);
    }
  };

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
        setFiles([]);
        setCreateTitle('');
        setCreateGoal('');
        setCreateDescription('');
        setCreateDeadline('');
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Load data on mount
  useEffect(() => {
    if (user) {
      loadCampaigns();
      loadNotifications();
    }
  }, [user]);

  // Loading state
  if (loading) {
    return (
      <Layout role="student">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  // Calculate stats
  const totalGoal = campaigns.reduce((sum, c) => sum + c.goalAmount, 0);
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const unreadNotifications = currentNotifications.filter(n => !n.read).length;

  const progressPercentage = totalGoal > 0 ? (totalRaised / totalGoal) * 100 : 0;

  return (
    <Layout role="student">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Student Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your campaigns and track your fundraising progress
            </p>
          </div>
          <MDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => setOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              {user?.verified ? 'Create Campaign' : 'Get Verified'}
            </Button>
          </MDiv>
        </div>

        {/* Verification Status Banner */}
        {!user?.verified && (
          <div className="mb-6 p-4 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-amber-400 font-medium">Verification Required</h3>
                <p className="text-sm text-gray-300 mt-1">
                  Complete your verification to create campaigns and start fundraising.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Goal"
          value={`$${totalGoal.toLocaleString()}`}
        />
        <StatCard
          title="Funds Raised"
          value={`$${totalRaised.toLocaleString()}`}
        />
        <StatCard
          title="Active Campaigns"
          value={activeCampaigns.toString()}
        />
        <StatCard
          title="Notifications"
          value={unreadNotifications.toString()}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Campaigns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Progress */}
          <div className="glass-card crypto-glow p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Fundraising Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Overall Goal Progress</span>
                <span className="text-white font-medium">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                <MDiv
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>${totalRaised.toLocaleString()} raised</span>
                <span>${totalGoal.toLocaleString()} goal</span>
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="glass-card crypto-glow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Your Campaigns</h3>
              <span className="text-sm text-gray-400">
                {campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {loadingCampaigns ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <span className="text-4xl">📋</span>
                </div>
                <h4 className="text-lg font-medium text-white mb-2">No campaigns yet</h4>
                <p className="text-gray-400 mb-4">Create your first campaign to start fundraising</p>
                <Button 
                  onClick={() => setOpen(true)}
                  className="btn-primary"
                >
                  {user?.verified ? 'Create Campaign' : 'Get Verified First'}
                </Button>
              </div>
            ) : (
              <MotionContainer
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="space-y-4"
              >
                {campaigns.map((campaign) => (
                  <MDiv
                    key={campaign.id}
                    variants={listItemVariants}
                    className="group"
                  >
                    <CampaignSummaryCard
                      stats={{
                        title: campaign.title,
                        goal: campaign.goalAmount,
                        raised: campaign.raisedAmount,
                        status: campaign.status,
                        deadline: campaign.deadline,
                        description: campaign.description
                      }}
                    />
                  </MDiv>
                ))}
              </MotionContainer>
            )}
          </div>
        </div>

        {/* Right Column - Profile & Notifications */}
        <div className="space-y-6">
          {/* Profile Card */}
          <ProfileCard user={user} />

          {/* Notifications */}
          <div className="glass-card crypto-glow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              {unreadNotifications > 0 && (
                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                  {unreadNotifications} new
                </span>
              )}
            </div>
            
            {loadingNotifications ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
              </div>
            ) : currentNotifications.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                <div className="text-2xl mb-2">🔔</div>
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {currentNotifications.slice(0, 5).map((notification) => (
                  <MDiv
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer hover:border-purple-500/50 ${
                      notification.read 
                        ? 'bg-slate-800/40 border-gray-700/50' 
                        : 'bg-purple-900/20 border-purple-700/50'
                    }`}
                    onClick={() => markRead && markRead(notification.id.toString())}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.read ? 'bg-gray-500' : 'bg-purple-400'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${
                          notification.read ? 'text-gray-400' : 'text-gray-200'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </MDiv>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="glass-card crypto-glow p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => setOpen(true)}
                  className="w-full btn-primary justify-start"
                >
                  <span className="mr-2">+</span>
                  {user?.verified ? 'New Campaign' : 'Submit Verification'}
                </Button>
              </MDiv>
              <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={() => loadCampaigns()}
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white"
                >
                  <span className="mr-2">🔄</span>
                  Refresh Data
                </Button>
              </MDiv>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50" role="presentation" aria-hidden={false}>
          <MDiv
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl p-6 glass-card crypto-glow max-h-[90vh] overflow-y-auto"
          >
            {user?.verified ? (
              // Create Campaign Section (for verified users)
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">+</span>
                  </div>
                  <div>
                    <h3 id="modal-title" className="text-xl font-bold text-white">Create New Campaign</h3>
                    <p className="text-sm text-gray-400">Launch your fundraising campaign and start collecting funds</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Title *</label>
                    <input 
                      aria-label="Campaign title" 
                      value={createTitle} 
                      onChange={(e) => setCreateTitle(e.target.value)} 
                      placeholder="Enter a compelling campaign title..." 
                      className="input-dark"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Funding Goal (USD) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        aria-label="Campaign goal" 
                        value={createGoal} 
                        onChange={(e) => setCreateGoal(e.target.value ? Number(e.target.value) : '')} 
                        placeholder="5000" 
                        type="number" 
                        className="input-dark pl-8"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Description</label>
                    <textarea 
                      value={createDescription} 
                      onChange={(e) => setCreateDescription(e.target.value)} 
                      placeholder="Describe your project, what you're funding, and why supporters should contribute..."
                      rows={4}
                      className="input-dark resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Deadline (Optional)</label>
                    <input 
                      value={createDeadline} 
                      onChange={(e) => setCreateDeadline(e.target.value)} 
                      type="date"
                      className="input-dark"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={createCampaign} 
                      disabled={creating || !createTitle || !createGoal}
                      className="btn-success"
                    >
                      {creating ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Creating...
                        </div>
                      ) : (
                        'Create Campaign'
                      )}
                    </Button>
                  </MDiv>
                  <Button 
                    variant="ghost" 
                    onClick={() => { 
                      setOpen(false); 
                      setFiles([]);
                      setCreateTitle('');
                      setCreateGoal('');
                      setCreateDescription('');
                      setCreateDeadline('');
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // Verification Section (for unverified users)
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 id="modal-title" className="text-xl font-bold text-white">Account Verification Required</h3>
                    <p className="text-sm text-gray-400">Upload documents to verify your student status and create campaigns</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-amber-400 font-medium">Verification Required</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      You must be verified to create campaigns. Please upload the following documents:
                    </p>
                    <ul className="text-sm text-gray-400 mt-2 space-y-1">
                      <li>• Student ID or enrollment letter</li>
                      <li>• Official transcript (recent)</li>
                      <li>• Institution verification letter</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Upload Documents</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-gray-600 transition-colors">
                      <input 
                        aria-label="Upload documents" 
                        type="file" 
                        multiple 
                        onChange={(e) => setFiles(Array.from(e.target.files || []))}
                        className="hidden" 
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-gray-400 mb-2">
                          <Upload className="w-8 h-8 mx-auto" />
                        </div>
                        <div className="text-sm text-gray-300">
                          Click to upload or drag and drop
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          PDF, JPG, PNG, DOC files up to 10MB each
                        </div>
                      </label>
                    </div>
                    
                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <div className="text-sm text-gray-300">Selected files:</div>
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between gap-2 text-sm text-gray-400 bg-slate-800/40 p-2 rounded">
                            <div className="flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              <span className="truncate">{file.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs">({Math.round(file.size / 1024)}KB)</span>
                              <button
                                onClick={() => setFiles(files.filter((_, i) => i !== index))}
                                className="text-red-400 hover:text-red-300"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={submitVerification}
                      disabled={files.length === 0 || submittingVerification}
                      className="btn-primary"
                    >
                      {submittingVerification ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Submitting...
                        </div>
                      ) : (
                        'Submit for Verification'
                      )}
                    </Button>
                  </MDiv>
                  <Button 
                    variant="ghost" 
                    onClick={() => { 
                      setOpen(false); 
                      setFiles([]);
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </MDiv>
        </div>
      )}
    </Layout>
  );
}
