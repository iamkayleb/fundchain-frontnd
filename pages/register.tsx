import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { 
  ArrowRight, ArrowLeft, CheckCircle, User, Building, 
  Heart, Upload, Mail, Lock, Diamond, Sparkles,
  GraduationCap, Home, Eye, EyeOff, FileText
} from 'lucide-react';

const MDiv: any = motion.div;
type Role = 'student' | 'donor' | 'institution';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const totalSteps = role === 'institution' ? 4 : 3;

  const roleData = {
    student: {
      icon: GraduationCap,
      title: "Student",
      subtitle: "Get funding for your education",
      color: "from-blue-500 to-cyan-500",
      description: "Create campaigns for tuition, research, or educational expenses"
    },
    donor: {
      icon: Heart,
      title: "Donor",
      subtitle: "Support student dreams",
      color: "from-pink-500 to-rose-500",
      description: "Discover and fund student campaigns that inspire you"
    },
    institution: {
      icon: Building,
      title: "Institution",
      subtitle: "Verify and manage students",
      color: "from-purple-500 to-indigo-500",
      description: "Verify student identities and manage disbursements"
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return role;
    if (currentStep === 2) return email && fullName && password && password === confirmPassword;
    if (currentStep === 3 && role !== 'institution') return true;
    if (currentStep === 3 && role === 'institution') return institutionName && emailDomain;
    if (currentStep === 4 && role === 'institution') return bankDetails;
    return false;
  };

  const onSubmit = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsLoading(true);
    const payload: any = { email, password, full_name: fullName, role };

    if (role === 'institution') {
      payload.institution_profile = {
        institution_name: institutionName || fullName,
        email_domain: emailDomain,
        bank_account_details: bankDetails,
      };
      if (files.length > 0) payload.files = files;
    }

    try {
      await register(payload);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('register error', err);
      const msg = err?.message || (err?.details && JSON.stringify(err.details)) || 'Registration failed';
      try {
        const ev = new CustomEvent('app:toast', { detail: { message: msg } });
        window.dispatchEvent(ev);
      } catch (_) {
        alert(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <MDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Role</h2>
              <p className="text-gray-400">Select how you'd like to participate in FundChain</p>
            </div>

            <div className="space-y-4">
              {(Object.keys(roleData) as Role[]).map((roleKey) => {
                const data = roleData[roleKey];
                const Icon = data.icon;
                const isSelected = role === roleKey;

                return (
                  <button
                    key={roleKey}
                    onClick={() => setRole(roleKey)}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      isSelected 
                        ? 'border-cyan-500 bg-cyan-500/10' 
                        : 'border-gray-700/50 bg-slate-800/40 hover:border-gray-600/50 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${data.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{data.title}</h3>
                        <p className="text-sm text-gray-400 mb-2">{data.subtitle}</p>
                        <p className="text-xs text-gray-500">{data.description}</p>
                      </div>
                      {isSelected && <CheckCircle className="w-6 h-6 text-cyan-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </MDiv>
        );

      case 2:
        return (
          <MDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create Your Account</h2>
              <p className="text-gray-400">Enter your basic information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 input-dark"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 input-dark"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 input-dark"
                    placeholder="Choose a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 input-dark"
                    placeholder="Confirm your password"
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {password === confirmPassword ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-red-400" />
                      )}
                    </div>
                  )}
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">Passwords don't match</p>
                )}
              </div>
            </div>
          </MDiv>
        );

      case 3:
        if (role !== 'institution') {
          return (
            <MDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Almost Ready!</h2>
              <p className="text-gray-400 mb-8">
                You're all set to join FundChain as a {roleData[role].title.toLowerCase()}. 
                Click finish to complete your registration.
              </p>
              <div className="p-6 bg-slate-800/40 rounded-xl border border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-2">What's Next?</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  {role === 'student' && (
                    <>
                      <li>• Create your first campaign</li>
                      <li>• Upload verification documents</li>
                      <li>• Start receiving donations</li>
                    </>
                  )}
                  {role === 'donor' && (
                    <>
                      <li>• Browse student campaigns</li>
                      <li>• Make secure donations</li>
                      <li>• Track your impact</li>
                    </>
                  )}
                </ul>
              </div>
            </MDiv>
          );
        }

        return (
          <MDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Institution Details</h2>
              <p className="text-gray-400">Provide your institution information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Institution Name</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 input-dark"
                    placeholder="e.g. Harvard University"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Domain</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 input-dark"
                    placeholder="e.g. harvard.edu"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Students with this email domain will be automatically associated with your institution
                </p>
              </div>
            </div>
          </MDiv>
        );

      case 4:
        return (
          <MDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Financial & Verification</h2>
              <p className="text-gray-400">Complete your institution setup</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bank Account Details</label>
                <textarea
                  value={bankDetails}
                  onChange={(e) => setBankDetails(e.target.value)}
                  className="w-full px-4 py-3 input-dark h-24 resize-none"
                  placeholder="Enter bank account information for disbursements"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Accreditation Documents</label>
                <div className="border-2 border-dashed border-gray-700/50 rounded-xl p-6 text-center hover:border-gray-600/50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-cyan-400 hover:text-cyan-300">Click to upload</span>
                    <span className="text-gray-400"> or drag and drop</span>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Upload official documents proving institutional accreditation
                  </p>
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                          <FileText className="w-4 h-4" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </MDiv>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
          }}
        />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-300" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-green-400/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-700" />

      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
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
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <MDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
              <Diamond className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">FundChain</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">Join the Future</span>
          </div>
        </MDiv>

        {/* Progress Bar */}
        <MDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </MDiv>

        {/* Form Container */}
        <MDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 crypto-glow"
        >
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={onSubmit}
              disabled={!canProceed() || isLoading}
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : currentStep === totalSteps ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Complete Registration
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700/50">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </MDiv>
      </div>
    </div>
  );
};

export default RegisterPage;
