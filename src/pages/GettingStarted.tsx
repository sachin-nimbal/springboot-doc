import React from 'react';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';

export const GettingStarted: React.FC = () => {
  const prerequisites = [
    'Java 17 or higher',
    'Maven 3.6+ or Gradle 7.0+',
    'Spring Boot 3.0+',
    'Database (MySQL, PostgreSQL, H2, etc.)'
  ];

  const installationSteps = [
    {
      title: 'Add CrudX Dependency',
      description: 'Add the CrudX Spring Boot starter to your project.',
      code: `<dependency>
  <groupId>com.crudx</groupId>
  <artifactId>crudx-spring-boot-starter</artifactId>
  <version>1.0.0</version>
</dependency>`,
      language: 'xml',
      filename: 'pom.xml'
    },
    {
      title: 'Configure Database',
      description: 'Set up your database connection in application.yml.',
      code: `spring:
  datasource:
    url: jdbc:mysql://localhost:3306/crudx_db
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true`,
      language: 'yaml',
      filename: 'application.yml'
    },
    {
      title: 'Enable CrudX',
      description: 'Add the @EnableCrudX annotation to your main application class.',
      code: `@SpringBootApplication
@EnableCrudX
public class CrudXApplication {
    public static void main(String[] args) {
        SpringApplication.run(CrudXApplication.class, args);
    }
}`,
      language: 'java',
      filename: 'CrudXApplication.java'
    }
  ];

  const exampleEntity = `@Entity
@Table(name = "users")
@CrudXEntity(
    path = "/users",
    description = "User management endpoints"
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    @CrudXField(
        description = "User email address",
        validation = @Validation(required = true, email = true)
    )
    private String email;
    
    @Column(nullable = false)
    @CrudXField(
        description = "User full name",
        validation = @Validation(required = true, minLength = 2)
    )
    private String name;
    
    @Column(name = "created_at")
    @CrudXField(
        description = "User creation timestamp",
        readOnly = true
    )
    private LocalDateTime createdAt;
    
    // Constructors, getters, and setters...
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}`;

  const configurationOptions = [
    {
      key: 'crudx.api.base-path',
      description: 'Base path for all generated API endpoints',
      default: '/api',
      type: 'String'
    },
    {
      key: 'crudx.security.enabled',
      description: 'Enable security features',
      default: 'true',
      type: 'Boolean'
    },
    {
      key: 'crudx.cache.enabled',
      description: 'Enable caching for read operations',
      default: 'true',
      type: 'Boolean'
    },
    {
      key: 'crudx.pagination.default-size',
      description: 'Default page size for paginated endpoints',
      default: '20',
      type: 'Integer'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to set up CrudX Framework in your Spring Boot application and start building APIs in minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Prerequisites</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-500" />
              Before You Begin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Make sure you have the following installed and configured:
            </p>
            <ul className="space-y-2">
              {prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-foreground">{prereq}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Installation Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Installation</h2>
        <div className="space-y-8">
          {installationSteps.map((step, index) => (
            <div key={index}>
              <div className="flex items-center mb-4">
                <Badge variant="default" className="mr-4">
                  Step {index + 1}
                </Badge>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <CodeBlock
                code={step.code}
                language={step.language}
                filename={step.filename}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Example Entity */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Create Your First Entity</h2>
        <Alert variant="info" className="mb-6">
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Use CrudX annotations to customize your API endpoints and add validation rules.
          </AlertDescription>
        </Alert>
        
        <CodeBlock
          code={exampleEntity}
          language="java"
          filename="User.java"
        />
      </div>

      {/* Configuration */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Configuration</h2>
        <p className="text-muted-foreground mb-6">
          Customize CrudX behavior using application properties:
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 font-medium text-muted-foreground">Property</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Default</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Type</th>
              </tr>
            </thead>
            <tbody>
              {configurationOptions.map((option, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-3">
                    <code className="text-foreground font-mono text-sm">{option.key}</code>
                  </td>
                  <td className="py-3 text-muted-foreground">{option.description}</td>
                  <td className="py-3">
                    <code className="bg-muted px-2 py-1 rounded text-sm">{option.default}</code>
                  </td>
                  <td className="py-3 text-muted-foreground">{option.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Learn Annotations</CardTitle>
              <CardDescription>
                Explore the powerful annotation system that drives CrudX functionality.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="/annotations"
                className="text-primary hover:text-primary/80 font-medium"
              >
                View Annotations Guide →
              </a>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Browse the complete API documentation and endpoint reference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="/rest-endpoints"
                className="text-primary hover:text-primary/80 font-medium"
              >
                View API Reference →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Troubleshooting</h2>
        <Alert variant="warning">
          <AlertTitle>Common Issues</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Make sure your database is running and accessible</li>
              <li>Verify that all required dependencies are included</li>
              <li>Check that your entity classes are in the correct package</li>
              <li>Ensure your Spring Boot version is compatible (3.0+)</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
