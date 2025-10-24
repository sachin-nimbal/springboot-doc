import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                C
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">CrudX</span>
                <span className="text-xs text-muted-foreground leading-none">Framework</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              A powerful Spring Boot framework for rapid CRUD API development with minimal boilerplate code.
            </p>
          </div>

          {/* Documentation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Documentation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/getting-started" className="hover:text-foreground transition-colors">
                  Quick Setup
                </Link>
              </li>
              <li>
                <Link to="/annotations" className="hover:text-foreground transition-colors">
                  Annotations
                </Link>
              </li>
              <li>
                <Link to="/rest-endpoints" className="hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/sachinnimbal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 CrudX Framework. Built with ❤️ by{' '}
            <a
              href="https://github.com/sachinnimbal"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-foreground transition-colors"
            >
              Sachin Nimbal
            </a>
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Version 2.1.0</span>
            <a
              href="https://github.com/sachinnimbal/crudx-framework/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Release Notes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}