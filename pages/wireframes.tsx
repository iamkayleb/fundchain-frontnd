import React from 'react';
import Head from 'next/head';

export default function WireframesPage() {
  return (
    <>
      <Head>
        <title>FundChain Dashboard Wireframes</title>
        <meta name="description" content="Wireframe sketches of all FundChain dashboards" />
      </Head>
      
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4" style={{fontFamily: 'serif'}}>
              FundChain Dashboard Wireframes
            </h1>
            <p className="text-lg text-gray-700" style={{fontFamily: 'serif'}}>
              System Architecture & User Interface Sketches
            </p>
          </div>

          {/* Student Dashboard Wireframe */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              Student Dashboard
            </h2>
            <div className="border-2 border-black p-6" style={{borderStyle: 'solid'}}>
              {/* Header */}
              <div className="border border-black p-3 mb-4 bg-gray-50" style={{borderStyle: 'dashed'}}>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono">Welcome back, [Student Name]!</div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 border border-black" style={{borderStyle: 'solid'}}></div>
                    <div className="w-16 h-8 border border-black" style={{borderStyle: 'solid'}}></div>
                  </div>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-mono mb-1">METRIC {i}</div>
                    <div className="text-lg font-bold">$X,XXX</div>
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Left Column - Campaign Creation */}
                <div className="col-span-2">
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Create New Campaign</h3>
                    <div className="space-y-3">
                      <div className="border border-black h-8 p-2" style={{borderStyle: 'dashed'}}>
                        <span className="text-xs font-mono">Campaign Title Input</span>
                      </div>
                      <div className="border border-black h-16 p-2" style={{borderStyle: 'dashed'}}>
                        <span className="text-xs font-mono">Description Textarea</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="border border-black h-8 p-2" style={{borderStyle: 'dashed'}}>
                          <span className="text-xs font-mono">Goal Amount</span>
                        </div>
                        <div className="border border-black h-8 p-2" style={{borderStyle: 'dashed'}}>
                          <span className="text-xs font-mono">Deadline</span>
                        </div>
                      </div>
                      <div className="border border-black h-8 bg-gray-100 text-center p-2" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[CREATE CAMPAIGN BUTTON]</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Campaigns List */}
                  <div className="border border-black p-4 mt-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">My Campaigns</h3>
                    {[1,2,3].map(i => (
                      <div key={i} className="border border-black p-3 mb-2" style={{borderStyle: 'dashed'}}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-sm">Campaign Title {i}</div>
                            <div className="text-xs">Status: [PENDING/ACTIVE]</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">$X,XXX / $Y,YYY</div>
                            <div className="w-16 h-2 border border-black" style={{borderStyle: 'solid'}}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4">
                  {/* Verification Status */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Verification Status</h3>
                    <div className="border border-black p-2 text-center" style={{borderStyle: 'dashed'}}>
                      <span className="text-xs font-mono">[VERIFIED ✓]</span>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Recent Activity</h3>
                    {[1,2,3].map(i => (
                      <div key={i} className="border-b border-black pb-2 mb-2" style={{borderStyle: 'dotted'}}>
                        <div className="text-xs">Activity {i}</div>
                        <div className="text-xs text-gray-500">Time ago</div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[SUBMIT DOCS]</span>
                      </div>
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[VIEW PROFILE]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Dashboard Wireframe */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              Admin Dashboard
            </h2>
            <div className="border-2 border-black p-6" style={{borderStyle: 'solid'}}>
              {/* Header */}
              <div className="border border-black p-3 mb-4 bg-gray-50" style={{borderStyle: 'dashed'}}>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono">System Administration Portal</div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 border border-black" style={{borderStyle: 'solid'}}></div>
                    <div className="text-xs">Admin Access</div>
                  </div>
                </div>
              </div>

              {/* System Metrics */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {['Total Users', 'Pending Campaigns', 'Verifications', 'Total Funds'].map((metric, i) => (
                  <div key={i} className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-mono mb-1">{metric.toUpperCase()}</div>
                    <div className="text-lg font-bold">XXX</div>
                  </div>
                ))}
              </div>

              {/* Navigation Tabs */}
              <div className="border border-black p-2 mb-4" style={{borderStyle: 'solid'}}>
                <div className="flex space-x-4">
                  {['Overview', 'Verification Queue', 'Campaign Management', 'Ledger Explorer'].map(tab => (
                    <div key={tab} className="border border-black px-3 py-1 bg-gray-100" style={{borderStyle: 'solid'}}>
                      <span className="text-xs font-mono">{tab.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-4 gap-6">
                {/* Main Panel */}
                <div className="col-span-3">
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-4">Verification Requests Queue</h3>
                    
                    {/* Verification Request Items */}
                    {[1,2,3].map(i => (
                      <div key={i} className="border border-black p-3 mb-3" style={{borderStyle: 'dashed'}}>
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <div className="flex space-x-2 mb-1">
                              <div className="border border-black px-2 py-1 text-xs" style={{borderStyle: 'solid'}}>INSTITUTION</div>
                              <div className="border border-black px-2 py-1 text-xs" style={{borderStyle: 'solid'}}>PENDING</div>
                            </div>
                            <div className="font-bold text-sm">University Name {i}</div>
                            <div className="text-xs">contact@university{i}.edu</div>
                            <div className="text-xs text-gray-500">X documents • Submitted Date</div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-12 h-8 border border-black bg-gray-100 text-center" style={{borderStyle: 'solid'}}>
                              <span className="text-xs">✓</span>
                            </div>
                            <div className="w-12 h-8 border border-black bg-gray-100 text-center" style={{borderStyle: 'solid'}}>
                              <span className="text-xs">✗</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Sidebar */}
                <div className="space-y-4">
                  {/* Quick Actions */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[REFRESH DATA]</span>
                      </div>
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[EXPORT REPORT]</span>
                      </div>
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[SETTINGS]</span>
                      </div>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">System Status</h3>
                    <div className="space-y-2">
                      {['API Status', 'Database', 'Blockchain', 'Email Service'].map(service => (
                        <div key={service} className="flex justify-between items-center">
                          <span className="text-xs">{service}</span>
                          <div className="w-3 h-3 border border-black" style={{borderStyle: 'solid'}}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Recent Activity</h3>
                    {[1,2,3].map(i => (
                      <div key={i} className="border-b border-black pb-2 mb-2" style={{borderStyle: 'dotted'}}>
                        <div className="text-xs">Admin Action {i}</div>
                        <div className="text-xs text-gray-500">Time ago</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donor Dashboard Wireframe */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              Donor Dashboard
            </h2>
            <div className="border-2 border-black p-6" style={{borderStyle: 'solid'}}>
              {/* Header */}
              <div className="border border-black p-3 mb-4 bg-gray-50" style={{borderStyle: 'dashed'}}>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono">Welcome back, [Donor Name]!</div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 border border-black" style={{borderStyle: 'solid'}}></div>
                    <div className="text-xs">Donor Profile</div>
                  </div>
                </div>
              </div>

              {/* Donation Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {['Total Donated', 'Campaigns Supported', 'This Month', 'Impact Score'].map((stat, i) => (
                  <div key={i} className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-mono mb-1">{stat.toUpperCase()}</div>
                    <div className="text-lg font-bold">$X,XXX</div>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-3 gap-6">
                {/* Campaign Browser */}
                <div className="col-span-2">
                  {/* Search/Filter Bar */}
                  <div className="border border-black p-3 mb-4" style={{borderStyle: 'solid'}}>
                    <div className="flex space-x-3">
                      <div className="flex-1 border border-black h-8 p-2" style={{borderStyle: 'dashed'}}>
                        <span className="text-xs font-mono">Search campaigns...</span>
                      </div>
                      <div className="border border-black px-3 py-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">FILTER</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Cards */}
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="border border-black p-4" style={{borderStyle: 'solid'}}>
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-sm mb-1">Campaign Title {i}</h3>
                            <p className="text-xs mb-2">Brief description of the campaign and what it aims to achieve...</p>
                            <div className="flex space-x-2 text-xs">
                              <span>Student: John Doe</span>
                              <span>•</span>
                              <span>MIT</span>
                            </div>
                          </div>
                          <div className="border border-black px-2 py-1 text-xs" style={{borderStyle: 'solid'}}>VERIFIED</div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>$X,XXX raised</span>
                            <span>Goal: $Y,YYY</span>
                          </div>
                          <div className="border border-black h-2" style={{borderStyle: 'solid'}}>
                            <div className="bg-gray-300 h-full w-3/4"></div>
                          </div>
                        </div>

                        {/* Donation Input */}
                        <div className="flex space-x-2">
                          <div className="border border-black flex-1 h-8 p-2" style={{borderStyle: 'dashed'}}>
                            <span className="text-xs font-mono">$100</span>
                          </div>
                          <div className="border border-black px-4 py-1 bg-gray-100" style={{borderStyle: 'solid'}}>
                            <span className="text-xs font-mono">[DONATE]</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donor Sidebar */}
                <div className="space-y-4">
                  {/* Donation History */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Recent Donations</h3>
                    {[1,2,3,4].map(i => (
                      <div key={i} className="border-b border-black pb-2 mb-2" style={{borderStyle: 'dotted'}}>
                        <div className="text-xs font-bold">$XXX</div>
                        <div className="text-xs">Campaign Name {i}</div>
                        <div className="text-xs text-gray-500">Date</div>
                      </div>
                    ))}
                  </div>

                  {/* Giving Goals */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Monthly Goal</h3>
                    <div className="text-center">
                      <div className="text-xs mb-2">$XXX / $1,000</div>
                      <div className="border border-black h-3 mb-2" style={{borderStyle: 'solid'}}>
                        <div className="bg-gray-300 h-full w-1/2"></div>
                      </div>
                      <div className="text-xs text-gray-500">50% Complete</div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Your Impact</h3>
                    <div className="space-y-2 text-xs">
                      <div>• XX students helped</div>
                      <div>• $X,XXX total donated</div>
                      <div>• XX campaigns supported</div>
                      <div>• Member since YYYY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Institution Dashboard Wireframe */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              Institution Dashboard
            </h2>
            <div className="border-2 border-black p-6" style={{borderStyle: 'solid'}}>
              {/* Header */}
              <div className="border border-black p-3 mb-4 bg-gray-50" style={{borderStyle: 'dashed'}}>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-mono">[Institution Name] Dashboard</div>
                  <div className="flex space-x-2">
                    <div className="border border-black px-2 py-1 text-xs" style={{borderStyle: 'solid'}}>VERIFIED</div>
                    <div className="w-8 h-8 border border-black" style={{borderStyle: 'solid'}}></div>
                  </div>
                </div>
              </div>

              {/* Institution Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {['Active Students', 'Total Campaigns', 'Funds Raised', 'Success Rate'].map((stat, i) => (
                  <div key={i} className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-mono mb-1">{stat.toUpperCase()}</div>
                    <div className="text-lg font-bold">XXX</div>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-3 gap-6">
                {/* Student Management */}
                <div className="col-span-2">
                  <div className="border border-black p-4 mb-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-4">Student Verification Queue</h3>
                    
                    {[1,2,3].map(i => (
                      <div key={i} className="border border-black p-3 mb-3" style={{borderStyle: 'dashed'}}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-sm">Student Name {i}</div>
                            <div className="text-xs">ID: STUDENT{i}XXX • student{i}@university.edu</div>
                            <div className="text-xs text-gray-500">Requested verification • Date</div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-12 h-8 border border-black bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                              <span className="text-xs">✓</span>
                            </div>
                            <div className="w-12 h-8 border border-black bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                              <span className="text-xs">✗</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Campaign Overview */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-4">Active Campaigns from Our Students</h3>
                    
                    {[1,2].map(i => (
                      <div key={i} className="border border-black p-3 mb-3" style={{borderStyle: 'dashed'}}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-bold text-sm">Research Project {i}</div>
                            <div className="text-xs mb-1">by Student Name {i}</div>
                            <div className="text-xs">Progress: $X,XXX / $Y,YYY</div>
                            <div className="border border-black h-2 mt-1" style={{borderStyle: 'solid'}}>
                              <div className="bg-gray-300 h-full w-2/3"></div>
                            </div>
                          </div>
                          <div className="border border-black px-2 py-1 text-xs ml-3" style={{borderStyle: 'solid'}}>ACTIVE</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Institution Sidebar */}
                <div className="space-y-4">
                  {/* Verification Tools */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Verification Tools</h3>
                    <div className="space-y-2">
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[BULK VERIFY]</span>
                      </div>
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[UPLOAD ROSTER]</span>
                      </div>
                      <div className="border border-black h-8 bg-gray-100 text-center p-1" style={{borderStyle: 'solid'}}>
                        <span className="text-xs font-mono">[EXPORT DATA]</span>
                      </div>
                    </div>
                  </div>

                  {/* Institution Profile */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Institution Profile</h3>
                    <div className="space-y-2 text-xs">
                      <div><strong>Founded:</strong> YYYY</div>
                      <div><strong>Students:</strong> XX,XXX</div>
                      <div><strong>Type:</strong> University</div>
                      <div><strong>Location:</strong> City, State</div>
                    </div>
                    <div className="border border-black h-6 bg-gray-100 text-center mt-3 p-1" style={{borderStyle: 'solid'}}>
                      <span className="text-xs font-mono">[EDIT PROFILE]</span>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Recent Activity</h3>
                    {[1,2,3].map(i => (
                      <div key={i} className="border-b border-black pb-2 mb-2" style={{borderStyle: 'dotted'}}>
                        <div className="text-xs">Student verified</div>
                        <div className="text-xs text-gray-500">Time ago</div>
                      </div>
                    ))}
                  </div>

                  {/* Notifications */}
                  <div className="border border-black p-4" style={{borderStyle: 'solid'}}>
                    <h3 className="font-bold mb-3">Notifications</h3>
                    <div className="text-xs text-center text-gray-500">
                      X new verification requests
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              3.3.3 Use Case Diagram
            </h2>
            <p className="text-sm text-gray-700 mb-6" style={{fontFamily: 'serif'}}>
              The use case diagram illustrates interactions between students, donors, institutions, and administrators within the FundChain educational fundraising platform, showing how different stakeholders utilize system capabilities for campaign management, donation processing, verification workflows, and administrative oversight activities within the blockchain-enabled funding ecosystem.
            </p>
            
            <div className="border-2 border-black p-8" style={{borderStyle: 'solid'}}>
              {/* System Boundary */}
              <div className="border-2 border-black p-6 relative" style={{borderStyle: 'dashed'}}>
                <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold">FundChain System</div>
                
                <div className="grid grid-cols-5 gap-6 min-h-96">
                  
                  {/* Left Actors */}
                  <div className="space-y-8">
                    {/* Student Actor */}
                    <div className="text-center">
                      <div className="w-16 h-20 border border-black mx-auto mb-2" style={{borderStyle: 'solid'}}>
                        <div className="w-8 h-8 border border-black rounded-full mx-auto mt-2" style={{borderStyle: 'solid'}}></div>
                        <div className="w-1 h-6 border-l border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="w-8 h-1 border-t border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="flex justify-between w-8 mx-auto">
                          <div className="w-1 h-3 border-l border-black transform rotate-12" style={{borderStyle: 'solid'}}></div>
                          <div className="w-1 h-3 border-l border-black transform -rotate-12" style={{borderStyle: 'solid'}}></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold">Student</div>
                    </div>

                    {/* Donor Actor */}
                    <div className="text-center">
                      <div className="w-16 h-20 border border-black mx-auto mb-2" style={{borderStyle: 'solid'}}>
                        <div className="w-8 h-8 border border-black rounded-full mx-auto mt-2" style={{borderStyle: 'solid'}}></div>
                        <div className="w-1 h-6 border-l border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="w-8 h-1 border-t border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="flex justify-between w-8 mx-auto">
                          <div className="w-1 h-3 border-l border-black transform rotate-12" style={{borderStyle: 'solid'}}></div>
                          <div className="w-1 h-3 border-l border-black transform -rotate-12" style={{borderStyle: 'solid'}}></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold">Donor</div>
                    </div>
                  </div>

                  {/* Use Cases Column 1 */}
                  <div className="space-y-3 relative">
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Register Account</div>
                    </div>
                    
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">User Login</div>
                    </div>
                    
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Submit Verification</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Create Campaign</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Edit Campaign</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">View Campaign Progress</div>
                    </div>

                    {/* Connection Lines from Student */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
                      <line x1="0" y1="20" x2="60" y2="20" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="0" y1="60" x2="60" y2="60" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="0" y1="100" x2="60" y2="100" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="0" y1="140" x2="60" y2="140" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="0" y1="180" x2="60" y2="180" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="0" y1="220" x2="60" y2="220" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                    </svg>
                  </div>

                  {/* Use Cases Column 2 */}
                  <div className="space-y-3 relative">
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Browse Campaigns</div>
                    </div>
                    
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Search Campaigns</div>
                    </div>
                    
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Make Donation</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Process Payment</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">View Donation History</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Track Impact</div>
                    </div>

                    {/* Connection Lines from Donor */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
                      <line x1="-60" y1="60" x2="60" y2="20" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="-60" y1="60" x2="60" y2="60" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="-60" y1="200" x2="60" y2="100" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="-60" y1="200" x2="60" y2="140" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="-60" y1="200" x2="60" y2="180" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="-60" y1="200" x2="60" y2="220" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                    </svg>
                  </div>

                  {/* Use Cases Column 3 */}
                  <div className="space-y-3 relative">
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Verify Students</div>
                    </div>
                    
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Manage Student Roster</div>
                    </div>
                    
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Approve Verifications</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Monitor Campaigns</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Generate Reports</div>
                    </div>

                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">System Administration</div>
                    </div>

                    {/* Connection Lines from Institution */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex: -1}}>
                      <line x1="60" y1="20" x2="120" y2="20" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="60" y1="60" x2="120" y2="60" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="60" y1="100" x2="120" y2="100" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="60" y1="140" x2="120" y2="140" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="60" y1="180" x2="120" y2="180" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                      <line x1="60" y1="220" x2="120" y2="220" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
                    </svg>
                  </div>

                  {/* Right Actors */}
                  <div className="space-y-8">
                    {/* Institution Actor */}
                    <div className="text-center">
                      <div className="w-16 h-20 border border-black mx-auto mb-2" style={{borderStyle: 'solid'}}>
                        <div className="w-8 h-8 border border-black rounded-full mx-auto mt-2" style={{borderStyle: 'solid'}}></div>
                        <div className="w-1 h-6 border-l border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="w-8 h-1 border-t border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="flex justify-between w-8 mx-auto">
                          <div className="w-1 h-3 border-l border-black transform rotate-12" style={{borderStyle: 'solid'}}></div>
                          <div className="w-1 h-3 border-l border-black transform -rotate-12" style={{borderStyle: 'solid'}}></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold">Institution</div>
                    </div>

                    {/* Admin Actor */}
                    <div className="text-center">
                      <div className="w-16 h-20 border border-black mx-auto mb-2" style={{borderStyle: 'solid'}}>
                        <div className="w-8 h-8 border border-black rounded-full mx-auto mt-2" style={{borderStyle: 'solid'}}></div>
                        <div className="w-1 h-6 border-l border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="w-8 h-1 border-t border-black mx-auto" style={{borderStyle: 'solid'}}></div>
                        <div className="flex justify-between w-8 mx-auto">
                          <div className="w-1 h-3 border-l border-black transform rotate-12" style={{borderStyle: 'solid'}}></div>
                          <div className="w-1 h-3 border-l border-black transform -rotate-12" style={{borderStyle: 'solid'}}></div>
                        </div>
                      </div>
                      <div className="text-xs font-bold">System Admin</div>
                    </div>
                  </div>
                </div>

                {/* Additional Admin Use Cases at Bottom */}
                <div className="mt-8 pt-4 border-t border-black" style={{borderStyle: 'dotted'}}>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Approve Campaigns</div>
                    </div>
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Reject Campaigns</div>
                    </div>
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Explore Ledger</div>
                    </div>
                    <div className="border border-black p-2 rounded-full text-center bg-white" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-bold">Monitor System Health</div>
                    </div>
                  </div>
                  
                  {/* Lines connecting Admin to bottom use cases */}
                  <div className="text-center mt-4">
                    <div className="text-xs">← Admin Use Cases →</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-black" style={{borderStyle: 'solid'}}>
                <h4 className="font-bold text-center mb-4">Use Case Relationships</h4>
                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <div className="font-bold mb-2">Primary Actors & Their Use Cases:</div>
                    <div className="space-y-1">
                      <div><strong>Student:</strong> Register, Login, Submit Verification, Create Campaign, Edit Campaign, View Progress</div>
                      <div><strong>Donor:</strong> Register, Login, Browse Campaigns, Search, Make Donation, View History, Track Impact</div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-1">
                      <div><strong>Institution:</strong> Login, Verify Students, Manage Roster, Approve Verifications, Monitor Campaigns</div>
                      <div><strong>System Admin:</strong> All verification approvals, campaign management, ledger exploration, system monitoring</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center text-xs">
                  <div><strong>Legend:</strong> ---- (dashed lines) represent "uses" relationships between actors and use cases</div>
                </div>
              </div>
            </div>
          </div>

          {/* Object Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              Object Diagram
            </h2>
            <div className="border-2 border-black p-6" style={{borderStyle: 'solid'}}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* User Objects */}
                <div className="space-y-6">
                  <h3 className="font-bold text-center mb-4">USER OBJECTS</h3>
                  
                  {/* Student Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">student1: Student</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 1001</div>
                      <div><strong>email:</strong> "john@mit.edu"</div>
                      <div><strong>role:</strong> "student"</div>
                      <div><strong>verified:</strong> true</div>
                      <div><strong>institution_id:</strong> 501</div>
                      <div><strong>created_at:</strong> "2025-09-15"</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">createCampaign()</div>
                      <div className="text-xs">submitVerification()</div>
                    </div>
                  </div>

                  {/* Donor Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">donor1: Donor</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 2001</div>
                      <div><strong>email:</strong> "donor@email.com"</div>
                      <div><strong>role:</strong> "donor"</div>
                      <div><strong>total_donated:</strong> 5000.00</div>
                      <div><strong>campaigns_supported:</strong> 12</div>
                      <div><strong>created_at:</strong> "2025-08-20"</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">makeDonation()</div>
                      <div className="text-xs">viewHistory()</div>
                    </div>
                  </div>

                  {/* Institution Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">institution1: Institution</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 501</div>
                      <div><strong>name:</strong> "MIT"</div>
                      <div><strong>email:</strong> "admin@mit.edu"</div>
                      <div><strong>verified:</strong> true</div>
                      <div><strong>student_count:</strong> 157</div>
                      <div><strong>established:</strong> 1861</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">verifyStudent()</div>
                      <div className="text-xs">manageRoster()</div>
                    </div>
                  </div>
                </div>

                {/* Campaign & Transaction Objects */}
                <div className="space-y-6">
                  <h3 className="font-bold text-center mb-4">CAMPAIGN OBJECTS</h3>
                  
                  {/* Campaign Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">campaign1: Campaign</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 3001</div>
                      <div><strong>title:</strong> "CS Research Fund"</div>
                      <div><strong>description:</strong> "AI research project"</div>
                      <div><strong>target_amount:</strong> 10000.00</div>
                      <div><strong>current_amount:</strong> 7500.00</div>
                      <div><strong>status:</strong> "active"</div>
                      <div><strong>student_id:</strong> 1001</div>
                      <div><strong>deadline:</strong> "2025-12-31"</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">updateProgress()</div>
                      <div className="text-xs">checkGoal()</div>
                    </div>
                  </div>

                  {/* Donation Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">donation1: Donation</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 4001</div>
                      <div><strong>amount:</strong> 500.00</div>
                      <div><strong>donor_id:</strong> 2001</div>
                      <div><strong>campaign_id:</strong> 3001</div>
                      <div><strong>status:</strong> "confirmed"</div>
                      <div><strong>timestamp:</strong> "2025-10-08 14:30"</div>
                      <div><strong>payment_method:</strong> "credit_card"</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">processPayment()</div>
                      <div className="text-xs">generateReceipt()</div>
                    </div>
                  </div>

                  {/* Verification Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">verification1: Verification</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 5001</div>
                      <div><strong>user_id:</strong> 1001</div>
                      <div><strong>status:</strong> "approved"</div>
                      <div><strong>document_urls:</strong> ["doc1.pdf", "doc2.pdf"]</div>
                      <div><strong>verified_by:</strong> 501</div>
                      <div><strong>submitted_at:</strong> "2025-09-20"</div>
                      <div><strong>approved_at:</strong> "2025-09-22"</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">approve()</div>
                      <div className="text-xs">reject()</div>
                    </div>
                  </div>
                </div>

                {/* System Objects */}
                <div className="space-y-6">
                  <h3 className="font-bold text-center mb-4">SYSTEM OBJECTS</h3>
                  
                  {/* Ledger Entry Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">ledgerEntry1: LedgerEntry</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 6001</div>
                      <div><strong>transaction_type:</strong> "donation"</div>
                      <div><strong>amount:</strong> 500.00</div>
                      <div><strong>from_user:</strong> 2001</div>
                      <div><strong>to_campaign:</strong> 3001</div>
                      <div><strong>status:</strong> "confirmed"</div>
                      <div><strong>hash:</strong> "0x1a2b3c4d..."</div>
                      <div><strong>timestamp:</strong> "2025-10-08 14:30"</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">validate()</div>
                      <div className="text-xs">addToChain()</div>
                    </div>
                  </div>

                  {/* Admin Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">admin1: Admin</div>
                    <div className="text-xs space-y-1">
                      <div><strong>id:</strong> 9001</div>
                      <div><strong>email:</strong> "admin@fundchain.com"</div>
                      <div><strong>role:</strong> "admin"</div>
                      <div><strong>permissions:</strong> ["all"]</div>
                      <div><strong>last_login:</strong> "2025-10-09 09:00"</div>
                      <div><strong>actions_today:</strong> 15</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">approveVerification()</div>
                      <div className="text-xs">manageCampaigns()</div>
                      <div className="text-xs">generateReports()</div>
                    </div>
                  </div>

                  {/* Session Object */}
                  <div className="border-2 border-black p-4" style={{borderStyle: 'solid'}}>
                    <div className="text-center font-bold text-sm mb-3 underline">session1: UserSession</div>
                    <div className="text-xs space-y-1">
                      <div><strong>token:</strong> "jwt_token_123..."</div>
                      <div><strong>user_id:</strong> 1001</div>
                      <div><strong>role:</strong> "student"</div>
                      <div><strong>created_at:</strong> "2025-10-09 09:15"</div>
                      <div><strong>expires_at:</strong> "2025-10-10 09:15"</div>
                      <div><strong>active:</strong> true</div>
                    </div>
                    <div className="border-t border-black mt-3 pt-2" style={{borderStyle: 'dotted'}}>
                      <div className="text-xs font-bold">Methods:</div>
                      <div className="text-xs">validate()</div>
                      <div className="text-xs">refresh()</div>
                      <div className="text-xs">expire()</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Object Relationships */}
              <div className="mt-8 pt-4 border-t border-black" style={{borderStyle: 'dotted'}}>
                <h4 className="font-bold text-center mb-4">Object Relationships</h4>
                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <div className="font-bold mb-2">Composition Relationships:</div>
                    <div>• student1 ←→ campaign1 (one-to-many)</div>
                    <div>• campaign1 ←→ donation1 (one-to-many)</div>
                    <div>• donor1 ←→ donation1 (one-to-many)</div>
                    <div>• institution1 ←→ student1 (one-to-many)</div>
                  </div>
                  <div>
                    <div className="font-bold mb-2">Association Relationships:</div>
                    <div>• donation1 → ledgerEntry1 (creates)</div>
                    <div>• admin1 → verification1 (approves)</div>
                    <div>• session1 → student1 (authenticates)</div>
                    <div>• verification1 → student1 (validates)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Architecture Diagram */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6" style={{fontFamily: 'serif'}}>
              System Architecture Overview
            </h2>
            <div className="border-2 border-black p-6" style={{borderStyle: 'solid'}}>
              {/* Frontend Layer */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Frontend Layer (Next.js + React)</h3>
                <div className="grid grid-cols-4 gap-4">
                  {['Student Dashboard', 'Donor Dashboard', 'Institution Dashboard', 'Admin Dashboard'].map(dashboard => (
                    <div key={dashboard} className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                      <div className="text-xs font-mono">{dashboard.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* API Layer */}
              <div className="mb-6">
                <div className="border border-black p-3 text-center bg-gray-50" style={{borderStyle: 'dashed'}}>
                  <div className="text-sm font-mono">API GATEWAY (Flask + JWT Authentication)</div>
                </div>
              </div>

              {/* Backend Services */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Backend Services</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-black p-3" style={{borderStyle: 'solid'}}>
                    <h4 className="font-bold text-sm mb-2">Authentication Service</h4>
                    <div className="text-xs space-y-1">
                      <div>• User Registration</div>
                      <div>• Login/Logout</div>
                      <div>• JWT Token Management</div>
                      <div>• Role-based Access</div>
                    </div>
                  </div>
                  <div className="border border-black p-3" style={{borderStyle: 'solid'}}>
                    <h4 className="font-bold text-sm mb-2">Campaign Service</h4>
                    <div className="text-xs space-y-1">
                      <div>• Campaign Creation</div>
                      <div>• Campaign Management</div>
                      <div>• Donation Processing</div>
                      <div>• Progress Tracking</div>
                    </div>
                  </div>
                  <div className="border border-black p-3" style={{borderStyle: 'solid'}}>
                    <h4 className="font-bold text-sm mb-2">Verification Service</h4>
                    <div className="text-xs space-y-1">
                      <div>• Document Upload</div>
                      <div>• Identity Verification</div>
                      <div>• Institution Approval</div>
                      <div>• Status Management</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Layer */}
              <div className="mb-6">
                <h3 className="font-bold mb-3">Data Layer</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                    <div className="font-bold text-sm mb-2">SQLite Database</div>
                    <div className="text-xs">User Data, Campaigns, Transactions</div>
                  </div>
                  <div className="border border-black p-3 text-center" style={{borderStyle: 'solid'}}>
                    <div className="font-bold text-sm mb-2">Blockchain Ledger</div>
                    <div className="text-xs">Transaction History, Audit Trail</div>
                  </div>
                </div>
              </div>

              {/* External Integrations */}
              <div>
                <h3 className="font-bold mb-3">External Integrations</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Payment Gateway', 'Email Service', 'File Storage'].map(service => (
                    <div key={service} className="border border-black p-3 text-center" style={{borderStyle: 'dashed'}}>
                      <div className="text-xs font-mono">{service.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t-2 border-black" style={{borderStyle: 'solid'}}>
            <p className="text-sm text-gray-600" style={{fontFamily: 'serif'}}>
              FundChain Platform - Educational Fundraising System
            </p>
            <p className="text-xs text-gray-500 mt-2" style={{fontFamily: 'serif'}}>
              Wireframe Documentation - October 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}