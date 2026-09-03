import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import type { StakeholderRole } from './types/auth';

// Public Layout & Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExplorePage } from './pages/ExplorePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { CitizenReportPage } from './pages/CitizenReportPage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { RoleLoginPage } from './pages/RoleLoginPage';

// District Pages
import { DistrictDashboardPage } from './pages/dashboard/DistrictDashboardPage';
import { DistrictProjectsPage } from './pages/district/DistrictProjectsPage';
import { DistrictRiskPage } from './pages/district/DistrictRiskPage';
import { DistrictFinancialPage } from './pages/district/DistrictFinancialPage';
import { DistrictDuplicatesPage } from './pages/district/DistrictDuplicatesPage';
import { DistrictDigitalTwinPage } from './pages/district/DistrictDigitalTwinPage';
import { DistrictComplaintsPage } from './pages/district/DistrictComplaintsPage';
import { DistrictComplaintDetailPage } from './pages/district/DistrictComplaintDetailPage';
import { DistrictAlertsPage } from './pages/district/DistrictAlertsPage';
import { DistrictAlertDetailPage } from './pages/district/DistrictAlertDetailPage';
import { DistrictReportsPage } from './pages/district/DistrictReportsPage';

// MP Pages
import { MpDashboardPage } from './pages/dashboard/MpDashboardPage';
import { MpProjectsPage } from './pages/mp/MpProjectsPage';
import { MpRiskPage } from './pages/mp/MpRiskPage';
import { MpFinancialPage } from './pages/mp/MpFinancialPage';
import { MpDigitalTwinPage } from './pages/mp/MpDigitalTwinPage';
import { MpCitizenIssuesPage } from './pages/mp/MpCitizenIssuesPage';
import { MpAlertsPage } from './pages/mp/MpAlertsPage';
import { MpReportsPage } from './pages/mp/MpReportsPage';

// State Pages
import { StateDashboardPage } from './pages/dashboard/StateDashboardPage';
import { StateDistrictsPage } from './pages/state/StateDistrictsPage';
import { StateProjectsPage } from './pages/state/StateProjectsPage';
import { StateAiPage } from './pages/state/StateAiPage';
import { StateFinancialPage } from './pages/state/StateFinancialPage';
import { StateDuplicatesPage } from './pages/state/StateDuplicatesPage';
import { StateDigitalTwinPage } from './pages/state/StateDigitalTwinPage';
import { StateAlertsPage } from './pages/state/StateAlertsPage';
import { StateReportsPage } from './pages/state/StateReportsPage';

// Ministry Pages
import { MinistryDashboardPage } from './pages/dashboard/MinistryDashboardPage';
import { MinistryStatesPage } from './pages/ministry/MinistryStatesPage';
import { MinistryProjectsPage } from './pages/ministry/MinistryProjectsPage';
import { MinistryAiPage } from './pages/ministry/MinistryAiPage';
import { MinistryFinancialPage } from './pages/ministry/MinistryFinancialPage';
import { MinistryDuplicatesPage } from './pages/ministry/MinistryDuplicatesPage';
import { MinistryDigitalTwinPage } from './pages/ministry/MinistryDigitalTwinPage';
import { MinistryAlertsPage } from './pages/ministry/MinistryAlertsPage';
import { MinistryDecisionSupportPage } from './pages/ministry/MinistryDecisionSupportPage';
import { MinistryReportsPage } from './pages/ministry/MinistryReportsPage';

// Admin Pages
import { AdminDashboardPage } from './pages/dashboard/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminRolesPage } from './pages/admin/AdminRolesPage';
import { AdminGeographyPage } from './pages/admin/AdminGeographyPage';
import { AdminDataPage } from './pages/admin/AdminDataPage';
import { AdminAiModelsPage } from './pages/admin/AdminAiModelsPage';
import { AdminAlertConfigPage } from './pages/admin/AdminAlertConfigPage';
import { AdminGeospatialPage } from './pages/admin/AdminGeospatialPage';
import { AdminSecurityPage } from './pages/admin/AdminSecurityPage';
import { AdminAuditPage } from './pages/admin/AdminAuditPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Common Pages
import { ProjectDetailPage } from './pages/dashboard/ProjectDetailPage';
import { AccessDeniedPage } from './pages/dashboard/AccessDeniedPage';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Route Guard Component
const ProtectedRoute: React.FC<{ role: StakeholderRole; element: React.ReactElement }> = ({ role, element }) => {
  const { canAccessRoute } = useAuth();
  if (!canAccessRoute(role)) {
    return <AccessDeniedPage />;
  }
  return element;
};

// Generic Dashboard Redirector based on Active Role
const DashboardRedirector: React.FC = () => {
  const { role } = useAuth();
  switch (role) {
    case 'mp': return <Navigate to="/mp/dashboard" replace />;
    case 'district': return <Navigate to="/district/dashboard" replace />;
    case 'state': return <Navigate to="/state/dashboard" replace />;
    case 'ministry': return <Navigate to="/ministry/dashboard" replace />;
    case 'admin': return <Navigate to="/admin/dashboard" replace />;
    default: return <Navigate to="/mp/dashboard" replace />;
  }
};

// Layout Wrapper for Public Website vs Authenticated AppShell
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
    <Navbar />
    <div className="flex-grow">{children}</div>
    <Footer />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <LanguageProvider>
          <ScrollToTop />
          <Routes>
          {/* Public Portal Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/explore" element={<PublicLayout><ExplorePage /></PublicLayout>} />
          <Route path="/how-it-works" element={<PublicLayout><HowItWorksPage /></PublicLayout>} />
          <Route path="/report" element={<PublicLayout><CitizenReportPage /></PublicLayout>} />
          <Route path="/report/track" element={<PublicLayout><TrackComplaintPage /></PublicLayout>} />
          <Route path="/signin" element={<PublicLayout><RoleSelectionPage /></PublicLayout>} />
          <Route path="/signin/:role" element={<PublicLayout><RoleLoginPage /></PublicLayout>} />

          {/* Generic Dashboard Redirect */}
          <Route path="/dashboard" element={<DashboardRedirector />} />

          {/* District Authority Dedicated Module Routes */}
          <Route path="/district/dashboard" element={<ProtectedRoute role="district" element={<DistrictDashboardPage />} />} />
          <Route path="/district/projects" element={<ProtectedRoute role="district" element={<DistrictProjectsPage />} />} />
          <Route path="/district/risk" element={<ProtectedRoute role="district" element={<DistrictRiskPage />} />} />
          <Route path="/district/financial" element={<ProtectedRoute role="district" element={<DistrictFinancialPage />} />} />
          <Route path="/district/duplicates" element={<ProtectedRoute role="district" element={<DistrictDuplicatesPage />} />} />
          <Route path="/district/digital-twin" element={<ProtectedRoute role="district" element={<DistrictDigitalTwinPage />} />} />
          <Route path="/district/complaints" element={<ProtectedRoute role="district" element={<DistrictComplaintsPage />} />} />
          <Route path="/district/complaints/:complaintId" element={<ProtectedRoute role="district" element={<DistrictComplaintDetailPage />} />} />
          <Route path="/district/alerts" element={<ProtectedRoute role="district" element={<DistrictAlertsPage />} />} />
          <Route path="/district/alerts/:alertId" element={<ProtectedRoute role="district" element={<DistrictAlertDetailPage />} />} />
          <Route path="/district/reports" element={<ProtectedRoute role="district" element={<DistrictReportsPage />} />} />
          <Route path="/district/*" element={<Navigate to="/district/dashboard" replace />} />

          {/* MP Dedicated Module Routes */}
          <Route path="/mp/dashboard" element={<ProtectedRoute role="mp" element={<MpDashboardPage />} />} />
          <Route path="/mp/projects" element={<ProtectedRoute role="mp" element={<MpProjectsPage />} />} />
          <Route path="/mp/risk" element={<ProtectedRoute role="mp" element={<MpRiskPage />} />} />
          <Route path="/mp/financial" element={<ProtectedRoute role="mp" element={<MpFinancialPage />} />} />
          <Route path="/mp/digital-twin" element={<ProtectedRoute role="mp" element={<MpDigitalTwinPage />} />} />
          <Route path="/mp/citizen-issues" element={<ProtectedRoute role="mp" element={<MpCitizenIssuesPage />} />} />
          <Route path="/mp/alerts" element={<ProtectedRoute role="mp" element={<MpAlertsPage />} />} />
          <Route path="/mp/reports" element={<ProtectedRoute role="mp" element={<MpReportsPage />} />} />
          <Route path="/mp/*" element={<Navigate to="/mp/dashboard" replace />} />

          {/* State Nodal Authority Dedicated Module Routes */}
          <Route path="/state/dashboard" element={<ProtectedRoute role="state" element={<StateDashboardPage />} />} />
          <Route path="/state/districts" element={<ProtectedRoute role="state" element={<StateDistrictsPage />} />} />
          <Route path="/state/projects" element={<ProtectedRoute role="state" element={<StateProjectsPage />} />} />
          <Route path="/state/ai" element={<ProtectedRoute role="state" element={<StateAiPage />} />} />
          <Route path="/state/financial" element={<ProtectedRoute role="state" element={<StateFinancialPage />} />} />
          <Route path="/state/duplicates" element={<ProtectedRoute role="state" element={<StateDuplicatesPage />} />} />
          <Route path="/state/digital-twin" element={<ProtectedRoute role="state" element={<StateDigitalTwinPage />} />} />
          <Route path="/state/alerts" element={<ProtectedRoute role="state" element={<StateAlertsPage />} />} />
          <Route path="/state/reports" element={<ProtectedRoute role="state" element={<StateReportsPage />} />} />
          <Route path="/state/*" element={<Navigate to="/state/dashboard" replace />} />

          {/* Ministry / MoSPI Dedicated Module Routes */}
          <Route path="/ministry/dashboard" element={<ProtectedRoute role="ministry" element={<MinistryDashboardPage />} />} />
          <Route path="/ministry/states" element={<ProtectedRoute role="ministry" element={<MinistryStatesPage />} />} />
          <Route path="/ministry/projects" element={<ProtectedRoute role="ministry" element={<MinistryProjectsPage />} />} />
          <Route path="/ministry/ai" element={<ProtectedRoute role="ministry" element={<MinistryAiPage />} />} />
          <Route path="/ministry/financial" element={<ProtectedRoute role="ministry" element={<MinistryFinancialPage />} />} />
          <Route path="/ministry/duplicates" element={<ProtectedRoute role="ministry" element={<MinistryDuplicatesPage />} />} />
          <Route path="/ministry/digital-twin" element={<ProtectedRoute role="ministry" element={<MinistryDigitalTwinPage />} />} />
          <Route path="/ministry/alerts" element={<ProtectedRoute role="ministry" element={<MinistryAlertsPage />} />} />
          <Route path="/ministry/decision-support" element={<ProtectedRoute role="ministry" element={<MinistryDecisionSupportPage />} />} />
          <Route path="/ministry/reports" element={<ProtectedRoute role="ministry" element={<MinistryReportsPage />} />} />
          <Route path="/ministry/*" element={<Navigate to="/ministry/dashboard" replace />} />

          {/* System Administrator Dedicated Module Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin" element={<AdminDashboardPage />} />} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin" element={<AdminUsersPage />} />} />
          <Route path="/admin/roles" element={<ProtectedRoute role="admin" element={<AdminRolesPage />} />} />
          <Route path="/admin/geography" element={<ProtectedRoute role="admin" element={<AdminGeographyPage />} />} />
          <Route path="/admin/data" element={<ProtectedRoute role="admin" element={<AdminDataPage />} />} />
          <Route path="/admin/ai-models" element={<ProtectedRoute role="admin" element={<AdminAiModelsPage />} />} />
          <Route path="/admin/alerts" element={<ProtectedRoute role="admin" element={<AdminAlertConfigPage />} />} />
          <Route path="/admin/geospatial" element={<ProtectedRoute role="admin" element={<AdminGeospatialPage />} />} />
          <Route path="/admin/security" element={<ProtectedRoute role="admin" element={<AdminSecurityPage />} />} />
          <Route path="/admin/audit" element={<ProtectedRoute role="admin" element={<AdminAuditPage />} />} />
          <Route path="/admin/settings" element={<ProtectedRoute role="admin" element={<AdminSettingsPage />} />} />
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Shared Detail & Access Denied Routes */}
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />

          {/* Fallback */}
          <Route path="*" element={<PublicLayout><HomePage /></PublicLayout>} />
        </Routes>
        </LanguageProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
