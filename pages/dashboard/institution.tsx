import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Users, DollarSign, FileText, Shield, Clock, Sparkles, RefreshCw } from 'lucide-react';
import Layout from '../../components/dashboard/Layout';
import { StatCard } from '../../components/dashboard/StatCard';
import { useAuth } from '../../hooks/useAuth';
import { institutionApi, verificationApi, campaignApi } from '../../lib/api';

const MDiv: any = motion.div;

interface VerificationRequest {
  id: number;
  user_id: number;
  role: string;
  document_urls: any;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user?: {
    full_name: string;
    email: string;
  };
}

interface Campaign {
  id: number;
  title: string;
  goal_amount: number;
  current_amount: number;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  created_at: string;
  user?: {
    full_name: string;
    email: string;
  };
}

export default function InstitutionDashboard() {
  const { user } = useAuth();
  const [pendingStudents, setPendingStudents] = useState<VerificationRequest[]>([]);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    pendingVerifications: 0,
    activeCampaigns: 0,
    totalFundsRaised: 0,
  });
  const [selectedStudent, setSelectedStudent] = useState<VerificationRequest | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load verification requests
      const verificationData = await verificationApi.getRequests('student');
      setPendingStudents(verificationData.filter((req: VerificationRequest) => req.status === 'pending') || []);

      // Load campaigns
      const campaignData = await campaignApi.getAll();
      const activeCampaignsData = campaignData.filter((camp: Campaign) => camp.status === 'active') || [];
      setActiveCampaigns(activeCampaignsData);

      // Calculate stats
      const totalStudents = verificationData?.length || 0;
      const pendingVerifications = verificationData?.filter((req: VerificationRequest) => req.status === 'pending').length || 0;
      const activeCampaignCount = activeCampaignsData.length;
      const totalFundsRaised = activeCampaignsData.reduce((sum: number, camp: Campaign) => sum + (camp.current_amount || 0), 0);

      setStats({
        totalStudents,
        pendingVerifications,
        activeCampaigns: activeCampaignCount,
        totalFundsRaised,
      });

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Show error toast
      const event = new CustomEvent('app:toast', { 
        detail: { 
          message: 'Failed to load dashboard data',
          type: 'error'
        } 
      });
      window.dispatchEvent(event);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleApproveStudent = async (studentId: number) => {
    try {
      await verificationApi.approveStudent(studentId);
      setPendingStudents(prev => prev.filter(s => s.id !== studentId));
      setShowStudentModal(false);
      
      // Show success toast
      const event = new CustomEvent('app:toast', { 
        detail: { 
          message: 'Student verification approved successfully',
          type: 'success'
        } 
      });
      window.dispatchEvent(event);
      
      // Refresh stats
      await refreshData();
    } catch (error) {
      console.error('Failed to approve student:', error);
      const event = new CustomEvent('app:toast', { 
        detail: { 
          message: 'Failed to approve student verification',
          type: 'error'
        } 
      });
      window.dispatchEvent(event);
    }
  };

  const handleRejectStudent = async (studentId: number, reason: string = 'Insufficient documentation') => {
    try {
      await verificationApi.rejectStudent(studentId, reason);
      setPendingStudents(prev => prev.filter(s => s.id !== studentId));
      setShowStudentModal(false);
      
      // Show success toast
      const event = new CustomEvent('app:toast', { 
        detail: { 
          message: 'Student verification rejected',
          type: 'info'
        } 
      });
      window.dispatchEvent(event);
      
      // Refresh stats
      await refreshData();
    } catch (error) {
      console.error('Failed to reject student:', error);
      const event = new CustomEvent('app:toast', { 
        detail: { 
          message: 'Failed to reject student verification',
          type: 'error'
        } 
      });
      window.dispatchEvent(event);
    }
  };

  const viewStudentDetails = (student: VerificationRequest) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const getDocumentCount = (documentUrls: any) => {
    if (Array.isArray(documentUrls)) return documentUrls.length;
    if (typeof documentUrls === 'object' && documentUrls !== null) {
      return Object.keys(documentUrls).length;
    }
    return 0;
  };

  const institutionName = user?.extra?.institution_profile?.institution_name || 'Your Institution';

  if (loading) {
    return (
      <Layout role="institution">
        <div className="flex items-center justify-center min-h-96">
          <div className="flex items-center gap-3 text-white">
            <RefreshCw className="w-6 h-6 animate-spin" />
            <span>Loading dashboard...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role="institution">
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
              <h1 className="text-3xl font-bold text-white neon-text">Institution Portal</h1>
              <p className="text-gray-400 mt-2">Manage student verifications and oversee campaign activities</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">{institutionName}</div>
                <div className="text-sm text-gray-400">Institution Portal</div>
              </div>
            </div>
          </div>
        </MDiv>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <StatCard title="Pending Verifications" value={stats.pendingVerifications.toString()} accent="amber" />
          </MDiv>
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StatCard title="Total Students" value={stats.totalStudents.toString()} accent="green" />
          </MDiv>
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard title="Active Campaigns" value={stats.activeCampaigns.toString()} accent="cyan" />
          </MDiv>
          <MDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StatCard title="Total Funds Raised" value={`$${stats.totalFundsRaised.toLocaleString()}`} accent="green" />
          </MDiv>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Student Verification Queue */}
            <MDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-6 crypto-glow"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white neon-text">Student Verification Queue</h2>
                  <p className="text-gray-400 mt-1">Review and approve pending student verifications</p>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-medium">{pendingStudents.length} pending</span>
                </div>
              </div>

              <div className="space-y-4">
                {pendingStudents.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <div className="w-16 h-16 bg-slate-800/40 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-lg font-medium">No pending verifications</p>
                    <p className="text-sm">All student verification requests have been processed</p>
                  </div>
                ) : (
                  pendingStudents.map((student, index) => (
                    <MDiv
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-card-hover p-4 cursor-pointer group"
                      onClick={() => viewStudentDetails(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                              {(student.user?.full_name || 'U').charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                {student.user?.full_name || 'Unknown Student'}
                              </h3>
                              <p className="text-sm text-gray-400">Student Verification Request</p>
                              <p className="text-xs text-gray-500">{student.user?.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {getDocumentCount(student.document_urls)} documents
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Submitted {new Date(student.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApproveStudent(student.id);
                              }}
                              className="p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </button>
                          </MDiv>
                          <MDiv whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRejectStudent(student.id);
                              }}
                              className="p-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                            >
                              <XCircle className="w-5 h-5" />
                            </button>
                          </MDiv>
                        </div>
                      </div>
                    </MDiv>
                  ))
                )}
              </div>
            </MDiv>

            {/* Active Campaigns */}
            <MDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Active Campaigns from Students</h3>
              <div className="space-y-4">
                {activeCampaigns.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <DollarSign className="w-12 h-12 opacity-50 mx-auto mb-2" />
                    <p>No active campaigns found</p>
                  </div>
                ) : (
                  activeCampaigns.map((campaign) => (
                    <div key={campaign.id} className="glass-card-hover p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-white">{campaign.title}</h4>
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{campaign.user?.full_name}</p>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div
                              className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min((campaign.current_amount / campaign.goal_amount) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-sm text-gray-400">Progress</div>
                          <div className="font-semibold text-white">${campaign.current_amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">of ${campaign.goal_amount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {Math.round((campaign.current_amount / campaign.goal_amount) * 100)}% funded
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </MDiv>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Institution Info */}
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-card p-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Institution Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Verification Status</span>
                  <span className="px-2 py-1 bg-green-900 text-green-300 rounded text-xs">
                    {user?.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Email Domain</span>
                  <span className="text-sm text-white">
                    {user?.extra?.institution_profile?.email_domain || 'N/A'}
                  </span>
                </div>
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <p className="text-sm font-medium text-green-400">Institution Verified</p>
                  <p className="text-xs text-gray-400">Full access granted</p>
                </div>
              </div>
            </MDiv>

            {/* Quick Actions */}
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button 
                    onClick={refreshData}
                    className="w-full btn-primary"
                    disabled={refreshing}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh Data
                  </button>
                </MDiv>
                <button className="w-full px-4 py-2 bg-slate-800/60 text-gray-300 rounded-lg hover:bg-slate-700/60 transition-colors">
                  View All Students
                </button>
                <button className="w-full px-4 py-2 bg-slate-800/60 text-gray-300 rounded-lg hover:bg-slate-700/60 transition-colors">
                  Download Reports
                </button>
                <button className="w-full px-4 py-2 bg-slate-800/60 text-gray-300 rounded-lg hover:bg-slate-700/60 transition-colors">
                  Institution Settings
                </button>
              </div>
            </MDiv>

            {/* Recent Activity */}
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass-card p-4"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
              <div className="space-y-3 text-sm">
                {pendingStudents.slice(0, 3).map((student, index) => (
                  <div key={student.id} className="flex items-center gap-3 p-2 bg-slate-800/40 rounded">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-xs">
                        {student.user?.full_name} submitted verification
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(student.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {pendingStudents.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No recent activity</p>
                )}
              </div>
            </MDiv>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <MDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 w-full max-w-2xl crypto-glow"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Student Verification Details</h3>
              <button
                onClick={() => setShowStudentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {(selectedStudent.user?.full_name || 'U').charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{selectedStudent.user?.full_name || 'Unknown Student'}</h4>
                  <p className="text-gray-400">{selectedStudent.user?.email}</p>
                  <p className="text-sm text-gray-500">Student ID: {selectedStudent.user_id}</p>
                  <p className="text-sm text-gray-500">Request ID: {selectedStudent.id}</p>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-white mb-3">Submitted Documents</h5>
                <div className="space-y-2">
                  {Array.isArray(selectedStudent.document_urls) ? (
                    selectedStudent.document_urls.length > 0 ? (
                      selectedStudent.document_urls.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-slate-800/40 rounded-lg hover:bg-slate-700/40 transition-colors">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-gray-300">Document {index + 1}</span>
                          {typeof doc === 'string' && doc.startsWith('data:') && (
                            <button 
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = doc;
                                link.download = `document_${index + 1}`;
                                link.click();
                              }}
                              className="ml-auto text-xs text-blue-400 hover:text-blue-300"
                            >
                              Download
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">No documents submitted</p>
                    )
                  ) : (
                    <div className="p-3 bg-slate-800/40 rounded-lg">
                      <p className="text-sm text-gray-300">
                        {getDocumentCount(selectedStudent.document_urls)} document(s) submitted
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-800/40 rounded-lg p-4">
                <h5 className="font-medium text-white mb-2">Request Information</h5>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span className="ml-2 text-yellow-400">{selectedStudent.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Role:</span>
                    <span className="ml-2 text-white">{selectedStudent.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Submitted:</span>
                    <span className="ml-2 text-white">{new Date(selectedStudent.created_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">User ID:</span>
                    <span className="ml-2 text-white">{selectedStudent.user_id}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <button
                    onClick={() => handleApproveStudent(selectedStudent.id)}
                    className="w-full btn-success"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Verification
                  </button>
                </MDiv>
                <MDiv whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <button
                    onClick={() => handleRejectStudent(selectedStudent.id)}
                    className="w-full btn-danger"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Application
                  </button>
                </MDiv>
              </div>
            </div>
          </MDiv>
        </div>
      )}
    </Layout>
  );
}
