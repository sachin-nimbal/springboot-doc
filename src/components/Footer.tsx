import { ArrowTopRightOnSquareIcon as External, GlobeAltIcon as Globe } from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Premium Docs. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.793 23.4c.6.111.793-.261.793-.579v-2.03c-3.226.7-3.905-1.556-3.905-1.556-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.493.997.109-.775.418-1.305.76-1.605-2.574-.293-5.283-1.287-5.283-5.729 0-1.266.453-2.301 1.196-3.114-.12-.294-.519-1.475.114-3.073 0 0 .975-.312 3.195 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.502 3.193-1.19 3.193-1.19.634 1.598.235 2.779.115 3.073.744.813 1.195 1.848 1.195 3.114 0 4.454-2.713 5.433-5.295 5.721.43.371.815 1.102.815 2.222v3.293c0 .32.192.694.8.576A12 12 0 0 0 12 .5"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded" aria-label="Twitter">
              <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5" fill="currentColor"><path d="M19.633 7.997c.013.18.013.36.013.54 0 5.492-4.184 11.82-11.82 11.82-2.35 0-4.532-.686-6.366-1.871.33.038.648.05.99.05 1.946 0 3.733-.662 5.16-1.77a4.169 4.169 0 0 1-3.89-2.89c.254.038.51.063.777.063.373 0 .747-.05 1.094-.14a4.162 4.162 0 0 1-3.336-4.086v-.05c.56.31 1.2.5 1.886.52a4.158 4.158 0 0 1-1.855-3.465c0-.766.204-1.47.56-2.08a11.82 11.82 0 0 0 8.58 4.35 4.699 4.699 0 0 1-.102-.953 4.16 4.16 0 0 1 7.201-2.846 8.2 8.2 0 0 0 2.64-1.006 4.175 4.175 0 0 1-1.83 2.29 8.31 8.31 0 0 0 2.39-.65 8.946 8.946 0 0 1-2.083 2.16z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5" fill="currentColor"><path d="M20.447 20.452H17.21v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.085V9h3.107v1.561h.045c.433-.82 1.49-1.684 3.066-1.684 3.279 0 3.883 2.16 3.883 4.971v6.604zM5.337 7.433a1.805 1.805 0 1 1 0-3.61 1.805 1.805 0 0 1 0 3.61zM6.772 20.452H3.9V9h2.872v11.452z"/></svg>
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Privacy Policy
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Terms of Service
          </a>
          <span className="text-muted-foreground">•</span>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}
