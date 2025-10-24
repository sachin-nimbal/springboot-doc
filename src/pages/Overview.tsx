import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Code, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'key-features', title: 'Key Features', level: 2 },
  { id: 'quick-example', title: 'Quick Example', level: 2 },
  { id: 'next-steps', title: 'Next Steps', level: 2 },
];

export default function Overview() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Overview' }]} className="mb-6" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Badge variant="info" className="mb-4">
            Version 1.0.0
          </Badge>
          <h1 className="hero-title mb-4">
            Welcome to <span className="gradient-text">Premium Docs</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            Build modern, scalable applications with our powerful and intuitive
            framework. Get started in minutes with our comprehensive documentation.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/getting-started"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 focus-ring transition-opacity"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent focus-ring transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            Premium Docs provides a comprehensive framework for building modern web
            applications with TypeScript, React, and REST APIs. Our framework is
            designed with developer experience in mind, offering powerful features
            while maintaining simplicity and elegance.
          </p>
          <Alert variant="info" title="New to Premium Docs?" className="my-6">
            Check out our{' '}
            <Link to="/getting-started" className="underline">
              Getting Started guide
            </Link>{' '}
            to learn the basics and build your first application.
          </Alert>
        </section>

        {/* Key Features */}
        <section id="key-features" className="mb-12">
          <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] font-semibold tracking-tight mb-6">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Built for performance with optimized rendering and minimal bundle
                    sizes.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Type Safe</h3>
                  <p className="text-sm text-muted-foreground">
                    Full TypeScript support with comprehensive type definitions and
                    inference.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Developer Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Intuitive APIs and excellent developer experience with hot reload
                    and debugging tools.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Modern Stack</h3>
                  <p className="text-sm text-muted-foreground">
                    Built with the latest technologies including React 18, Vite 5, and
                    TypeScript 5.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick Example */}
        <section id="quick-example" className="prose mb-12">
          <h2>Quick Example</h2>
          <p>Here's a simple example to get you started:</p>
          <div className="not-prose">
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <code>{`import { createApp } from 'premium-docs';

const app = createApp({
  port: 3000,
  cors: true,
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen();`}</code>
            </pre>
          </div>
          <Alert variant="success" title="Pro Tip" className="my-6">
            Use our CLI tool to scaffold a new project with best practices and
            recommended configurations built-in.
          </Alert>
        </section>

        {/* Next Steps */}
        <section id="next-steps" className="prose mb-12">
          <h2>Next Steps</h2>
          <p>Ready to dive deeper? Here are some resources to explore:</p>
          <ul>
            <li>
              <Link to="/getting-started">Getting Started</Link> - Installation and
              setup guide
            </li>
            <li>
              <Link to="/annotations">Annotations</Link> - Learn about decorators and
              annotations
            </li>
            <li>
              <Link to="/entities">Entities</Link> - Working with data models
            </li>
            <li>
              <Link to="/rest-endpoints">REST Endpoints</Link> - Building RESTful APIs
            </li>
          </ul>
        </section>

        <Pagination
          next={{ title: 'Getting Started', path: '/getting-started' }}
        />
      </div>

      {/* Right Sidebar - TOC */}
      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
