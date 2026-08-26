import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Charging from './pages/Charging'
import StationDetail from './pages/StationDetail'
import ReserveSlot from './pages/ReserveSlot'
import ChargerConnect from './pages/ChargerConnect'
import ActiveSession from './pages/ActiveSession'
import SessionSummary from './pages/SessionSummary'
import ChargingHistory from './pages/ChargingHistory'
import ReceiptDetail from './pages/ReceiptDetail'
import Wash from './pages/Wash'
import BookingFlow from './pages/BookingFlow'
import Subscribe from './pages/Subscribe'
import BookingHistory from './pages/BookingHistory'
import Profile from './pages/Profile'
import Vehicles from './pages/Vehicles'
import PaymentMethods from './pages/PaymentMethods'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notifications" element={<Notifications />} />

        <Route path="/charge" element={<Charging />} />
        <Route path="/charge/history" element={<ChargingHistory />} />
        <Route path="/charge/history/:id" element={<ReceiptDetail />} />
        <Route path="/charge/:id" element={<StationDetail />} />
        <Route path="/charge/:id/reserve" element={<ReserveSlot />} />
        <Route path="/charge/:id/connect" element={<ChargerConnect />} />
        <Route path="/charge/:id/session" element={<ActiveSession />} />
        <Route path="/charge/:id/summary" element={<SessionSummary />} />

        <Route path="/wash" element={<Wash />} />
        <Route path="/wash/book/:id" element={<BookingFlow />} />
        <Route path="/wash/rebook" element={<BookingFlow />} />
        <Route path="/wash/subscribe" element={<Subscribe />} />
        <Route path="/wash/history" element={<BookingHistory />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/vehicles" element={<Vehicles />} />
        <Route path="/profile/payment-methods" element={<PaymentMethods />} />
        <Route path="/profile/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  )
}
