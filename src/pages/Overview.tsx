import { Link } from 'react-router-dom';
import { ArrowRightIcon, CodeBracketIcon, RocketLaunchIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { TOC } from '../components/TOC';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Pagination } from '../components/Pagination';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'key-features', title: 'Key Features', level: 2 },
  { id: 'quick-example', title: 'Quick Example', level: 2 },
  { id: 'getting-started', title: 'Getting Started', level: 2 },
];

const breadcrumbItems = [
  { title: 'Overview' }
];

const exampleCode = `@Entity
@CrudXEntity
public class User extends BaseEntity {
    @CrudXField(searchable = true)
    private String name;
    
    @CrudXField(filterable = true)
    private String email;
    
    @CrudXField(sortable = true)
    private LocalDateTime createdAt;
    
    // Getters and setters...
}`;

export function Overview() {
  return (
    <div className="flex gap-8">
      <main className="flex-1 max-w-4xl">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Hero Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold tracking-tight">CrudX Framework</h1>
              <Badge variant="secondary">v2.1.0</Badge>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl">
              A powerful Spring Boot framework that eliminates boilerplate code and accelerates CRUD API development 
              with intelligent annotations and automatic endpoint generation.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/getting-started"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/sachinnimbal/crudx-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>

          {/* Introduction */}
          <section id="introduction" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Introduction</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                CrudX Framework is a revolutionary Spring Boot extension that transforms how you build REST APIs. 
                By leveraging powerful annotations and intelligent code generation, CrudX eliminates repetitive 
                boilerplate code and lets you focus on business logic.
              </p>
              <p>
                With CrudX, you can create fully functional CRUD endpoints with just a few annotations. 
                The framework automatically generates controllers, services, and repositories based on your 
                entity definitions, while providing extensive customization options for advanced use cases.
              </p>
            </div>

            <Alert>
              <AlertTitle>Production Ready</AlertTitle>
              <AlertDescription>
                CrudX Framework is battle-tested in production environments, powering APIs that serve millions of requests daily.
              </AlertDescription>
            </Alert>
          </section>

          {/* Key Features */}
          <section id="key-features" className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Key Features</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CodeBracketIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Zero Boilerplate</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Eliminate repetitive CRUD code. CrudX automatically generates controllers, 
                    services, and repositories from your entity definitions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <RocketLaunchIcon className="h-5 w-5 text-success" />
                    </div>
                    <h3 className="font-semibold">Rapid Development</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Build production-ready APIs in minutes, not hours. Focus on business logic 
                    while CrudX handles the infrastructure.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 rounded-lg">
                      <ShieldCheckIcon className="h-5 w-5 text-warning" />
                    </div>
                    <h3 className="font-semibold">Type Safe</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Built with type safety in mind. Compile-time validation ensures 
                    your APIs are robust and error-free.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Core Capabilities</h3>
              <ul className="grid gap-2 md:grid-cols-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">Automatic CRUD endpoint generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">Built-in pagination and sorting</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">Advanced filtering and search</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">Validation and error handling</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">Security integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full" />
                  <span className="text-sm">OpenAPI documentation</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Quick Example */}
          <section id="quick-example" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Quick Example</h2>
            <p className="text-muted-foreground">
              Here's how simple it is to create a fully functional CRUD API with CrudX:
            </p>
            
            <CodeBlock 
              code={exampleCode}
              language="java"
              title="User.java"
              showLineNumbers
            />

            <Alert variant="success">
              <AlertTitle>That's it!</AlertTitle>
              <AlertDescription>
                With just these annotations, CrudX automatically generates all CRUD endpoints: 
                GET, POST, PUT, DELETE, plus advanced features like search, filtering, and pagination.
              </AlertDescription>
            </Alert>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Getting Started</h2>
            <p className="text-muted-foreground">
              Ready to supercharge your Spring Boot development? Follow our quick setup guide to get started in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/getting-started"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Quick Setup Guide
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                to="/annotations"
                className="inline-flex items-center gap-2 border px-4 py-2 rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Learn About Annotations
              </Link>
            </div>
          </section>

          {/* Pagination */}
          <Pagination
            next={{
              title: "Quick Setup",
              href: "/getting-started",
              description: "Get up and running in minutes"
            }}
          />
        </div>
      </main>

      {/* Table of Contents */}
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}