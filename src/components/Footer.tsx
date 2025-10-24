import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GithubIcon, 
  TwitterIcon, 
  DiscordIcon,
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
                <DiscordIcon className="h-5 w-5" />
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
