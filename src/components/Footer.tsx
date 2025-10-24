import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GithubIcon, 
  TwitterIcon, 
  HeartIcon 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-bold text-foreground">CrudX</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A powerful framework for building CRUD applications with Spring Boot and React.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/sachinnimbal/crudx-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/crudx_framework"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/crudx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Discord"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Documentation */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Documentation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/getting-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link to="/annotations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Core Annotations
                </Link>
              </li>
              <li>
                <Link to="/entities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Base Entities
                </Link>
              </li>
              <li>
                <Link to="/rest-endpoints" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  REST Endpoints
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/releases"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Releases
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/issues"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/discussions"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework/blob/main/CHANGELOG.md"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/crudx"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/crudx_framework"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sachinnimbal/crudx-framework"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://stackoverflow.com/questions/tagged/crudx"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Stack Overflow
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 CrudX Framework. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/sachinnimbal/crudx-framework/blob/main/LICENSE"
                className="hover:text-foreground transition-colors"
              >
                License
              </a>
              <a
                href="https://github.com/sachinnimbal/crudx-framework/blob/main/PRIVACY.md"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <HeartIcon className="h-4 w-4 text-red-500" />
                <span>by the CrudX team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
