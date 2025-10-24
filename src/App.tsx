import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { TOC } from './components/TOC';
import { initializeTheme } from './utils/theme';

// Pages
import { Overview } from './pages/Overview';
import { GettingStarted } from './pages/GettingStarted';
import { Annotations } from './pages/Annotations';
import { Entities } from './pages/Entities';
import { RestEndpoints } from './pages/RestEndpoints';

// TOC data for the current page
const tocItems = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'quick-start', title: 'Quick Start', level: 1 },
  { id: 'features', title: 'Key Features', level: 1 },
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'configuration', title: 'Configuration', level: 2 },
  { id: 'examples', title: 'Examples', level: 2 },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    initializeTheme();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
        
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          
          <main className="flex-1 lg:ml-80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/getting-started" element={<GettingStarted />} />
                <Route path="/getting-started/overview" element={<GettingStarted />} />
                <Route path="/getting-started/quick-setup" element={<GettingStarted />} />
                <Route path="/getting-started/configuration" element={<GettingStarted />} />
                <Route path="/annotations" element={<Annotations />} />
                <Route path="/annotations/entity" element={<Annotations />} />
                <Route path="/annotations/field" element={<Annotations />} />
                <Route path="/annotations/relationship" element={<Annotations />} />
                <Route path="/annotations/validation" element={<Annotations />} />
                <Route path="/entities" element={<Entities />} />
                <Route path="/entities/user" element={<Entities />} />
                <Route path="/entities/role" element={<Entities />} />
                <Route path="/entities/permission" element={<Entities />} />
                <Route path="/rest-endpoints" element={<RestEndpoints />} />
                <Route path="/rest-endpoints/auth" element={<RestEndpoints />} />
                <Route path="/rest-endpoints/users" element={<RestEndpoints />} />
                <Route path="/rest-endpoints/roles" element={<RestEndpoints />} />
                <Route path="/rest-endpoints/permissions" element={<RestEndpoints />} />
              </Routes>
            </div>
            
            <Footer />
          </main>
        </div>
        
        <TOC items={tocItems} />
      </div>
    </Router>
  );
}

export default App;
