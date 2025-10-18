import React from 'react';
import Head from 'next/head';

export default function UseCaseDiagramPage() {
  return (
    <>
      <Head>
        <title>FundChain Use Case Diagram - UML Format</title>
        <meta name="description" content="UML Use Case Diagram for FundChain Educational Fundraising Platform" />
      </Head>
      
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Academic Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-4" style={{fontFamily: 'serif'}}>
              3.3.3 Use Case Diagram - UML Format
            </h1>
            <p className="text-sm text-gray-700 max-w-4xl mx-auto leading-relaxed" style={{fontFamily: 'serif'}}>
              The use case diagram illustrates interactions between students, donors, educational institutions, and system administrators within the FundChain educational fundraising platform, showing how different stakeholders utilize system capabilities for campaign management, donation processing, verification workflows, and administrative oversight activities within the blockchain-enabled funding ecosystem.
            </p>
          </div>

          {/* UML Use Case Diagram */}
          <div className="border-2 border-black bg-white" style={{borderStyle: 'solid'}}>
            
            {/* System Boundary with UML styling */}
            <div className="relative p-16 min-h-[800px]" style={{background: '#fafafa'}}>
              
              {/* System Name Label - UML Standard */}
              <div className="absolute top-4 left-8 text-lg font-bold" style={{fontFamily: 'monospace'}}>
                &lt;&lt;system&gt;&gt;
              </div>
              <div className="absolute top-8 left-8 text-xl font-bold border-b-2 border-black pb-1">
                FundChain Platform
              </div>

              {/* UML System Boundary Rectangle */}
              <div className="absolute inset-4 border-2 border-black" style={{borderStyle: 'solid', borderRadius: '8px'}}></div>

              {/* SVG Layer for UML Connections */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                style={{zIndex: 10}}
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* UML Association Lines - Solid lines for "uses" relationships */}
                
                {/* Student Associations */}
                <line x1="120" y1="150" x2="280" y2="120" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="150" x2="280" y2="160" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="150" x2="280" y2="200" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="150" x2="280" y2="240" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="150" x2="280" y2="280" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="150" x2="280" y2="320" stroke="black" strokeWidth="1.5"/>

                {/* Donor Associations */}
                <line x1="120" y1="300" x2="280" y2="120" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="300" x2="480" y2="140" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="300" x2="480" y2="180" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="300" x2="480" y2="220" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="300" x2="480" y2="260" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="300" x2="480" y2="300" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="300" x2="480" y2="340" stroke="black" strokeWidth="1.5"/>

                {/* Institution Associations */}
                <line x1="120" y1="450" x2="280" y2="120" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="450" x2="720" y2="140" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="450" x2="720" y2="180" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="450" x2="720" y2="220" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="450" x2="720" y2="260" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="450" x2="720" y2="300" stroke="black" strokeWidth="1.5"/>

                {/* Admin Associations */}
                <line x1="120" y1="600" x2="280" y2="120" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="950" y2="140" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="950" y2="180" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="950" y2="220" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="950" y2="260" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="950" y2="300" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="950" y2="340" stroke="black" strokeWidth="1.5"/>
                <line x1="120" y1="600" x2="720" y2="220" stroke="black" strokeWidth="1.5"/>

                {/* UML Include Dependencies - Dashed arrows */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                   refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="black" />
                  </marker>
                </defs>

                <line x1="400" y1="220" x2="400" y2="260" stroke="black" strokeWidth="1" 
                      strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                <text x="410" y="245" fontSize="10" fontFamily="monospace">
                  &lt;&lt;include&gt;&gt;
                </text>

                <line x1="600" y1="180" x2="780" y2="140" stroke="black" strokeWidth="1" 
                      strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                <text x="650" y="155" fontSize="10" fontFamily="monospace">
                  &lt;&lt;extend&gt;&gt;
                </text>

                <line x1="350" y1="200" x2="450" y2="180" stroke="black" strokeWidth="1" 
                      strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
                <text x="360" y="185" fontSize="10" fontFamily="monospace">
                  &lt;&lt;include&gt;&gt;
                </text>
              </svg>

              {/* UML Layout Grid */}
              <div className="relative grid grid-cols-6 gap-8 h-full pt-12" style={{zIndex: 5}}>
                
                {/* Column 1: Primary Actors (Left side) */}
                <div className="space-y-20 -ml-8">
                  
                  {/* Student Actor - UML Standard */}
                  <div className="text-center">
                    <div className="w-16 h-28 mx-auto mb-3 relative">
                      {/* UML Stick Figure */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        {/* Head */}
                        <div className="w-8 h-8 border-2 border-black rounded-full bg-white"></div>
                        {/* Body */}
                        <div className="w-0.5 h-12 bg-black mx-auto mt-1"></div>
                        {/* Arms */}
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                          <div className="w-12 h-0.5 bg-black"></div>
                        </div>
                        {/* Legs */}
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                          <div className="absolute w-6 h-0.5 bg-black transform rotate-45 origin-left"></div>
                          <div className="absolute w-6 h-0.5 bg-black transform -rotate-45 origin-right"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold underline" style={{fontFamily: 'monospace'}}>
                      Student
                    </div>
                  </div>

                  {/* Donor Actor - UML Standard */}
                  <div className="text-center">
                    <div className="w-16 h-28 mx-auto mb-3 relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 border-2 border-black rounded-full bg-white"></div>
                        <div className="w-0.5 h-12 bg-black mx-auto mt-1"></div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                          <div className="w-12 h-0.5 bg-black"></div>
                        </div>
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                          <div className="absolute w-6 h-0.5 bg-black transform rotate-45 origin-left"></div>
                          <div className="absolute w-6 h-0.5 bg-black transform -rotate-45 origin-right"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold underline" style={{fontFamily: 'monospace'}}>
                      Donor
                    </div>
                  </div>

                  {/* Institution Actor - UML Standard */}
                  <div className="text-center">
                    <div className="w-16 h-28 mx-auto mb-3 relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 border-2 border-black rounded-full bg-white"></div>
                        <div className="w-0.5 h-12 bg-black mx-auto mt-1"></div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                          <div className="w-12 h-0.5 bg-black"></div>
                        </div>
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                          <div className="absolute w-6 h-0.5 bg-black transform rotate-45 origin-left"></div>
                          <div className="absolute w-6 h-0.5 bg-black transform -rotate-45 origin-right"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold underline" style={{fontFamily: 'monospace'}}>
                      Institution
                    </div>
                  </div>

                  {/* System Admin Actor - UML Standard */}
                  <div className="text-center">
                    <div className="w-16 h-28 mx-auto mb-3 relative">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                        <div className="w-8 h-8 border-2 border-black rounded-full bg-white"></div>
                        <div className="w-0.5 h-12 bg-black mx-auto mt-1"></div>
                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                          <div className="w-12 h-0.5 bg-black"></div>
                        </div>
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                          <div className="absolute w-6 h-0.5 bg-black transform rotate-45 origin-left"></div>
                          <div className="absolute w-6 h-0.5 bg-black transform -rotate-45 origin-right"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold underline" style={{fontFamily: 'monospace'}}>
                      System Admin
                    </div>
                  </div>
                </div>

                {/* Column 2: Core System Use Cases */}
                <div className="space-y-6">
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      User<br/>Registration
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      System<br/>Login
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Submit Verification<br/>Documents
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Create<br/>Campaign
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Edit Campaign<br/>Details
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Monitor Campaign<br/>Progress
                    </div>
                  </div>
                </div>

                {/* Column 3: Donor Use Cases */}
                <div className="space-y-6">
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Browse<br/>Campaigns
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Search<br/>Campaigns
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Make<br/>Donation
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Process<br/>Payment
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      View Donation<br/>History
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Track<br/>Impact
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Generate Tax<br/>Receipts
                    </div>
                  </div>
                </div>

                {/* Column 4: Institution Use Cases */}
                <div className="space-y-6">
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Verify Student<br/>Identity
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Manage Student<br/>Roster
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Approve<br/>Verification
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Monitor Institution<br/>Campaigns
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Generate<br/>Reports
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Bulk Student<br/>Operations
                    </div>
                  </div>
                </div>

                {/* Column 5: Admin Use Cases */}
                <div className="space-y-6">
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Review Campaign<br/>Approvals
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Reject Fraudulent<br/>Campaigns
                    </div>
                  </div>
                  
                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Explore Blockchain<br/>Ledger
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Monitor System<br/>Health
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Manage User<br/>Accounts
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Generate System<br/>Reports
                    </div>
                  </div>

                  <div className="w-40 h-16 border-2 border-black rounded-full flex items-center justify-center bg-white" style={{borderStyle: 'solid'}}>
                    <div className="text-xs font-bold text-center" style={{fontFamily: 'monospace'}}>
                      Configure Platform<br/>Settings
                    </div>
                  </div>
                </div>

                {/* Column 6: Secondary Actors (Right side) - if any */}
                <div className="space-y-20">
                  {/* Payment System Actor - External */}
                  <div className="text-center">
                    <div className="w-16 h-28 mx-auto mb-3 relative">
                      <div className="w-14 h-20 border-2 border-black bg-white" style={{borderStyle: 'solid'}}>
                        <div className="text-xs font-bold text-center pt-6" style={{fontFamily: 'monospace'}}>
                          Payment<br/>System
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold underline" style={{fontFamily: 'monospace'}}>
                      &lt;&lt;external&gt;&gt;
                    </div>
                  </div>

                  {/* Blockchain System Actor - External */}
                  <div className="text-center">
                    <div className="w-16 h-28 mx-auto mb-3 relative">
                      <div className="w-14 h-20 border-2 border-black bg-white" style={{borderStyle: 'solid'}}>
                        <div className="text-xs font-bold text-center pt-6" style={{fontFamily: 'monospace'}}>
                          Blockchain<br/>Ledger
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold underline" style={{fontFamily: 'monospace'}}>
                      &lt;&lt;external&gt;&gt;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UML Notation Legend */}
          <div className="mt-8 border-2 border-black p-6" style={{borderStyle: 'solid'}}>
            <h3 className="text-xl font-bold text-center mb-4" style={{fontFamily: 'serif'}}>
              UML Notation Legend
            </h3>
            
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <div className="font-bold mb-2" style={{fontFamily: 'monospace'}}>Actors:</div>
                <div className="space-y-1 text-xs">
                  <div>👤 Stick Figure = Primary Actor</div>
                  <div>📦 Rectangle = External System</div>
                  <div>&lt;&lt;stereotype&gt;&gt; = Actor Type</div>
                  <div>Underlined Name = Actor Name</div>
                </div>
              </div>
              
              <div>
                <div className="font-bold mb-2" style={{fontFamily: 'monospace'}}>Use Cases:</div>
                <div className="space-y-1 text-xs">
                  <div>⭕ Oval = Use Case</div>
                  <div>Verb Phrase = Use Case Name</div>
                  <div>System Boundary = Dashed Rectangle</div>
                  <div>&lt;&lt;system&gt;&gt; = System Stereotype</div>
                </div>
              </div>
              
              <div>
                <div className="font-bold mb-2" style={{fontFamily: 'monospace'}}>Relationships:</div>
                <div className="space-y-1 text-xs">
                  <div>──── Solid Line = Association</div>
                  <div>- - ➤ Dashed Arrow = &lt;&lt;include&gt;&gt;</div>
                  <div>- - ➤ Dashed Arrow = &lt;&lt;extend&gt;&gt;</div>
                  <div>──→ Generalization = Inheritance</div>
                </div>
              </div>
            </div>
          </div>

          {/* UML Specifications Table */}
          <div className="mt-8 border-2 border-black p-6" style={{borderStyle: 'solid'}}>
            <h3 className="text-xl font-bold text-center mb-4" style={{fontFamily: 'serif'}}>
              UML Actor Specifications
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black text-xs" style={{fontFamily: 'monospace'}}>
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-black p-2 text-left">Actor</th>
                    <th className="border border-black p-2 text-left">Type</th>
                    <th className="border border-black p-2 text-left">Primary Goals</th>
                    <th className="border border-black p-2 text-left">System Interactions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 font-bold">Student</td>
                    <td className="border border-black p-2">Primary</td>
                    <td className="border border-black p-2">Create campaigns, get verified, raise funds</td>
                    <td className="border border-black p-2">Authentication, Campaign Management, Verification</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Donor</td>
                    <td className="border border-black p-2">Primary</td>
                    <td className="border border-black p-2">Find campaigns, make donations, track impact</td>
                    <td className="border border-black p-2">Campaign Discovery, Donation Processing, History</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Institution</td>
                    <td className="border border-black p-2">Primary</td>
                    <td className="border border-black p-2">Verify students, manage institutional oversight</td>
                    <td className="border border-black p-2">Student Verification, Roster Management, Reporting</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">System Admin</td>
                    <td className="border border-black p-2">Primary</td>
                    <td className="border border-black p-2">Platform oversight, fraud prevention, system management</td>
                    <td className="border border-black p-2">Campaign Approval, System Monitoring, User Management</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Payment System</td>
                    <td className="border border-black p-2">External</td>
                    <td className="border border-black p-2">Process payments securely</td>
                    <td className="border border-black p-2">Payment Processing, Transaction Verification</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">Blockchain Ledger</td>
                    <td className="border border-black p-2">External</td>
                    <td className="border border-black p-2">Maintain transaction transparency</td>
                    <td className="border border-black p-2">Transaction Recording, Audit Trail</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Actor-Use Case Relationships Table */}
          <div className="mt-8 border-2 border-black p-6" style={{borderStyle: 'solid'}}>
            <h3 className="text-xl font-bold text-center mb-4" style={{fontFamily: 'serif'}}>
              Actor-Use Case Relationship Matrix
            </h3>
            
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <div>
                  <div className="font-bold text-sm mb-1">Student Actor Capabilities:</div>
                  <div className="text-xs leading-relaxed">
                    • User Registration and System Login<br/>
                    • Submit Verification Documents for Identity Validation<br/>
                    • Create and Edit Fundraising Campaigns<br/>
                    • Monitor Campaign Progress and Donation Analytics<br/>
                    • Manage Personal Profile and Academic Information
                  </div>
                </div>

                <div>
                  <div className="font-bold text-sm mb-1">Donor Actor Capabilities:</div>
                  <div className="text-xs leading-relaxed">
                    • User Registration and System Login<br/>
                    • Browse and Search Available Campaigns<br/>
                    • Make Secure Donations with Payment Processing<br/>
                    • View Donation History and Impact Tracking<br/>
                    • Generate Tax Receipts for Contributions
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="font-bold text-sm mb-1">Institution Actor Capabilities:</div>
                  <div className="text-xs leading-relaxed">
                    • User Registration and System Login<br/>
                    • Verify Student Identity and Manage Rosters<br/>
                    • Approve Student Verification Requests<br/>
                    • Monitor Institution-wide Campaign Activities<br/>
                    • Generate Institution-specific Reports and Analytics
                  </div>
                </div>

                <div>
                  <div className="font-bold text-sm mb-1">System Admin Capabilities:</div>
                  <div className="text-xs leading-relaxed">
                    • System Login with Administrative Privileges<br/>
                    • Review and Approve/Reject Campaign Submissions<br/>
                    • Explore Blockchain Ledger for Transaction Transparency<br/>
                    • Monitor System Health and Platform Security<br/>
                    • Manage User Accounts and Platform Configuration
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Use Case Description */}
          <div className="mt-8 border-2 border-black p-6" style={{borderStyle: 'solid'}}>
            <h3 className="text-xl font-bold text-center mb-4" style={{fontFamily: 'serif'}}>
              System Interaction Patterns
            </h3>
            
            <div className="text-sm space-y-4" style={{fontFamily: 'serif'}}>
              <p className="leading-relaxed">
                <strong>Primary Flow:</strong> Students register and submit verification documents to their educational institutions. 
                Once verified, students can create fundraising campaigns that require administrative approval before becoming publicly visible. 
                Donors browse approved campaigns and make secure donations through integrated payment processing. All transactions are recorded 
                in an immutable blockchain ledger for transparency and audit purposes.
              </p>
              
              <p className="leading-relaxed">
                <strong>Administrative Oversight:</strong> System administrators maintain platform integrity through campaign review processes, 
                user account management, and system health monitoring. Institutions provide verification services for their enrolled students, 
                ensuring campaign authenticity and reducing fraud risk within the educational funding ecosystem.
              </p>

              <p className="leading-relaxed">
                <strong>Blockchain Integration:</strong> The platform utilizes blockchain technology for transaction transparency, creating 
                an immutable audit trail of all donations and fund transfers. This ensures accountability and builds trust among stakeholders 
                in the educational fundraising process.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 mt-8 border-t-2 border-black" style={{borderStyle: 'solid'}}>
            <p className="text-sm text-gray-600" style={{fontFamily: 'serif'}}>
              FundChain Educational Fundraising Platform - UML Use Case Diagram
            </p>
            <p className="text-xs text-gray-500 mt-1" style={{fontFamily: 'serif'}}>
              Compliant with UML 2.5 Specification - Academic Documentatio