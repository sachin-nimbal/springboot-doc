import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileDrawer } from './components/MobileDrawer';
import { Footer } from './components/Footer';
import { Overview } from './pages/Overview';
import { GettingStarted } from './pages/GettingStarted';
import { Annotations } from './pages/Annotations';
import { Entities } from './pages/Entities';
import { RestEndpoints } from './pages/RestEndpoints';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <Header 
          onMobileMenuToggle={handleMobileMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Mobile Drawer */}
        <MobileDrawer 
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        />

        {/* Main Layout */}
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar className="fixed left-0 top-16 h-[calc(100vh-4rem)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pl-6" />
          </div>

          {/* Main Content */}
          <main className="flex-1 lg:ml-64">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/getting-started" element={<GettingStarted />} />
                <Route path="/annotations" element={<Annotations />} />
                <Route path="/entities" element={<Entities />} />
                <Route path="/rest-endpoints" element={<RestEndpoints />} />
              </Routes>
            </div>

            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;