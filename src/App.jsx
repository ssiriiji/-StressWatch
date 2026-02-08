import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { DataProvider } from './contexts/DataContext'
import { useAuth } from './hooks/useAuth'

import LoginPage from './pages/LoginPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import AnalysisPage from './pages/AnalysisPage'
import HistoryPage from './pages/HistoryPage'
import ActivitiesPage from './pages/ActivitiesPage'
import ConsultationPage from './pages/ConsultationPage'

function ProtectedRoute({ children }) {
  const { user, hasCompletedOnboarding } = useAuth()
  
  if (!user) return <Navigate to="/login" replace />
  if (!hasCompletedOnboarding) return <Navigate to="/onboarding" replace />
  
  return children
}

function AppRoutes() {
  const { user, hasCompletedOnboarding } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          user && hasCompletedOnboarding 
            ? <Navigate to="/dashboard" replace /> 
            : <LoginPage />
        } 
      />
      
      <Route 
        path="/onboarding" 
        element={
          user 
            ? hasCompletedOnboarding 
              ? <Navigate to="/dashboard" replace />
              : <OnboardingPage />
            : <Navigate to="/login" replace />
        } 
      />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/analysis" element={
        <ProtectedRoute>
          <AnalysisPage />
        </ProtectedRoute>
      } />
      
      <Route path="/history" element={
        <ProtectedRoute>
          <HistoryPage />
        </ProtectedRoute>
      } />
      
      <Route path="/activities" element={
        <ProtectedRoute>
          <ActivitiesPage />
        </ProtectedRoute>
      } />
      
      <Route path="/consultation" element={
        <ProtectedRoute>
          <ConsultationPage />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
