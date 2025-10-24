import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Code, Sparkles, Github, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'what-is-crudx', title: 'What is CrudX?', level: 2 },
  { id: 'key-features', title: 'Key Features', level: 2 },
  { id: 'quick-example', title: 'Quick Example', level: 2 },
  { id: 'getting-started', title: 'Getting Started', level: 2 },
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
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="info" className="bg-crudx-purple/10 text-crudx-purple border-crudx-purple/20">
              v2.1.0
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.8/5 on GitHub</span>
            </div>
          </div>
          <h1 className="hero-title mb-4">
            Welcome to <span className="gradient-text">CrudX Framework</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            A powerful, type-safe framework for building REST APIs with Spring Boot. 
            Generate CRUD operations automatically with minimal configuration and maximum flexibility.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/quick-setup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 focus-ring transition-opacity"
            >
              Quick Setup
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/sachinnimbal/crudx-framework"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent focus-ring transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            CrudX is a powerful Spring Boot framework that automatically generates 
            REST API endpoints for your JPA entities. With minimal configuration, 
            you can create full-featured CRUD operations, pagination, filtering, 
            and more. Built with developer productivity in mind.
          </p>
          <Alert variant="info" title="New to CrudX?" className="my-6">
            Check out our{' '}
            <Link to="/quick-setup" className="underline">
              Quick Setup guide
            </Link>{' '}
            to get started with your first CrudX application in minutes.
          </Alert>
        </section>

        {/* What is CrudX */}
        <section id="what-is-crudx" className="prose mb-12">
          <h2>What is CrudX?</h2>
          <p>
            CrudX is a Spring Boot extension that provides automatic REST API generation 
            for your JPA entities. Instead of writing boilerplate controller code, 
            CrudX analyzes your entity classes and generates comprehensive REST endpoints 
            with features like:
          </p>
          <ul>
            <li>Automatic CRUD operations (Create, Read, Update, Delete)</li>
            <li>Built-in pagination and sorting</li>
            <li>Advanced filtering and search capabilities</li>
            <li>Request validation and error handling</li>
            <li>OpenAPI/Swagger documentation generation</li>
            <li>Customizable endpoint behavior</li>
          </ul>
        </section>

        {/* Key Features */}
        <section id="key-features" className="mb-12">
          <h2 className="text-[clamp(1.5rem,3vw+0.5rem,2.25rem)] font-semibold tracking-tight mb-6">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-purple/10">
                  <Zap className="w-6 h-6 text-crudx-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Auto-Generated APIs</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically generate REST endpoints from your JPA entities with zero configuration.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-indigo/10">
                  <Shield className="w-6 h-6 text-crudx-indigo" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Type Safe</h3>
                  <p className="text-sm text-muted-foreground">
                    Full type safety with automatic request/response validation and error handling.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-blue/10">
                  <Code className="w-6 h-6 text-crudx-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Developer Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Intuitive annotations and excellent developer experience with hot reload.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-pink/10">
                  <Sparkles className="w-6 h-6 text-crudx-pink" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Spring Boot Native</h3>
                  <p className="text-sm text-muted-foreground">
                    Built on Spring Boot with full integration for security, validation, and more.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Quick Example */}
        <section id="quick-example" className="prose mb-12">
          <h2>Quick Example</h2>
          <p>Here's how easy it is to create a REST API with CrudX:</p>
          <div className="not-prose">
            <div className="code-block">
              <div className="code-block-header">
                <span className="text-sm font-medium">User.java</span>
                <button className="text-xs text-muted-foreground hover:text-foreground">
                  Copy
                </button>
              </div>
              <div className="code-block-content">
                <pre className="text-sm font-mono overflow-x-auto">
                  <code>{`@Entity
@Table(name = "users")
@CrudXController
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // Getters and setters...
}`}</code>
                </pre>
              </div>
            </div>
          </div>
          <p className="mt-4">
            That's it! CrudX automatically generates these REST endpoints:
          </p>
          <ul>
            <li><code>GET /api/users</code> - List all users with pagination</li>
            <li><code>GET /api/users/{id}</code> - Get user by ID</li>
            <li><code>POST /api/users</code> - Create new user</li>
            <li><code>PUT /api/users/{id}</code> - Update user</li>
            <li><code>DELETE /api/users/{id}</code> - Delete user</li>
          </ul>
          <Alert variant="success" title="Pro Tip" className="my-6">
            Use our Spring Boot starter to add CrudX to your existing project with just one dependency.
          </Alert>
        </section>

        {/* Getting Started */}
        <section id="getting-started" className="prose mb-12">
          <h2>Getting Started</h2>
          <p>Ready to build your first CrudX application? Here's what you need to know:</p>
          <ul>
            <li>
              <Link to="/quick-setup">Quick Setup</Link> - Get up and running in minutes
            </li>
            <li>
              <Link to="/core-annotations">Core Annotations</Link> - Learn about CrudX annotations
            </li>
            <li>
              <Link to="/base-entities">Base Entities</Link> - Working with JPA entities
            </li>
            <li>
              <Link to="/rest-endpoints">REST Endpoints</Link> - Understanding generated APIs
            </li>
          </ul>
        </section>

        <Pagination
          next={{ title: 'Quick Setup', path: '/quick-setup' }}
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
