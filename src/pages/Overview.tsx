import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CodeBracketIcon, 
  RocketLaunchIcon, 
  ShieldCheckIcon, 
  BoltIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Badge } from '../components/Badge';
import { Alert, AlertDescription } from '../components/Alert';
import { CodeBlock } from '../components/CodeBlock';

export const Overview: React.FC = () => {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Auto-Generated APIs',
      description: 'Automatically generate REST APIs from your entity models with zero configuration.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Built-in Security',
      description: 'Comprehensive security features including authentication, authorization, and validation.'
    },
    {
      icon: BoltIcon,
      title: 'High Performance',
      description: 'Optimized for speed with caching, pagination, and efficient database queries.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Easy Integration',
      description: 'Seamlessly integrate with Spring Boot applications and popular frontend frameworks.'
    }
  ];

  const quickStartCode = `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String name;
    
    // Getters and setters...
}`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <Badge variant="success" className="mr-4">
            <StarIcon className="h-4 w-4 mr-1" />
            v1.0.0
          </Badge>
          <Badge variant="outline">Latest Release</Badge>
        </div>
        
        <h1 id="overview" className="text-5xl font-bold text-foreground mb-6">
          CrudX Framework
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          A powerful, annotation-driven framework for building CRUD applications with Spring Boot. 
          Generate REST APIs, manage entities, and handle complex business logic with minimal code.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/getting-started"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
          >
            Get Started
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          
          <a
            href="https://github.com/sachinnimbal/crudx-framework"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-foreground border border-border rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200"
          >
            <CodeBracketIcon className="mr-2 h-5 w-5" />
            View on GitHub
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card key={index} variant="outlined">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Start Section */}
      <div id="quick-start" className="mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">Quick Start</h2>
        
        <Alert variant="info" className="mb-6">
          <AlertDescription>
            CrudX Framework makes it incredibly easy to build CRUD applications. 
            Just define your entities with annotations and let the framework handle the rest.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div>
            <h3 id="installation" className="text-xl font-semibold text-foreground mb-4">1. Add Dependency</h3>
            <CodeBlock
              code={`<dependency>
  <groupId>com.crudx</groupId>
  <artifactId>crudx-spring-boot-starter</artifactId>
  <version>1.0.0</version>
</dependency>`}
              language="xml"
              filename="pom.xml"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">2. Create Entity</h3>
            <CodeBlock
              code={quickStartCode}
              language="java"
              filename="User.java"
            />
          </div>

          <div>
            <h3 id="configuration" className="text-xl font-semibold text-foreground mb-4">3. Enable CrudX</h3>
            <CodeBlock
              code={`@SpringBootApplication
@EnableCrudX
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`}
              language="java"
              filename="Application.java"
            />
          </div>

          <div>
            <h3 id="examples" className="text-xl font-semibold text-foreground mb-4">4. That's It!</h3>
            <p className="text-muted-foreground mb-4">
              CrudX automatically generates REST endpoints for your entity:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><code className="bg-muted px-2 py-1 rounded">GET /api/users</code> - List all users</li>
              <li><code className="bg-muted px-2 py-1 rounded">GET /api/users/{id}</code> - Get user by ID</li>
              <li><code className="bg-muted px-2 py-1 rounded">POST /api/users</code> - Create new user</li>
              <li><code className="bg-muted px-2 py-1 rounded">PUT /api/users/{id}</code> - Update user</li>
              <li><code className="bg-muted px-2 py-1 rounded">DELETE /api/users/{id}</code> - Delete user</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of developers who are already building amazing applications with CrudX.
        </p>
        <Link
          to="/getting-started"
          className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
        >
          Start Building Now
          <ArrowRightIcon className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};
