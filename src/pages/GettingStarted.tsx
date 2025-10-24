import { Link } from 'react-router-dom';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { TOC } from '../components/TOC';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Pagination } from '../components/Pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';

const tocItems = [
  { id: 'prerequisites', title: 'Prerequisites', level: 2 },
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'configuration', title: 'Configuration', level: 2 },
  { id: 'first-entity', title: 'Create Your First Entity', level: 2 },
  { id: 'testing', title: 'Testing Your API', level: 2 },
  { id: 'next-steps', title: 'Next Steps', level: 2 },
];

const breadcrumbItems = [
  { title: 'Getting Started' }
];

const mavenDependency = `<dependency>
    <groupId>com.crudx</groupId>
    <artifactId>crudx-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>`;

const gradleDependency = `implementation 'com.crudx:crudx-spring-boot-starter:2.1.0'`;

const applicationProperties = `# Database Configuration
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop

# CrudX Configuration
crudx.enabled=true
crudx.base-path=/api
crudx.default-page-size=20
crudx.max-page-size=100`;

const applicationYml = `spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop

crudx:
  enabled: true
  base-path: /api
  default-page-size: 20
  max-page-size: 100`;

const entityExample = `package com.example.entity;

import com.crudx.annotation.CrudXEntity;
import com.crudx.annotation.CrudXField;
import com.crudx.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "users")
@CrudXEntity(
    path = "users",
    description = "User management endpoints"
)
public class User extends BaseEntity {
    
    @NotBlank(message = "Name is required")
    @CrudXField(
        searchable = true,
        sortable = true,
        description = "User's full name"
    )
    private String name;
    
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    @CrudXField(
        searchable = true,
        filterable = true,
        unique = true,
        description = "User's email address"
    )
    private String email;
    
    @CrudXField(
        filterable = true,
        sortable = true,
        description = "User's age"
    )
    private Integer age;
    
    // Constructors
    public User() {}
    
    public User(String name, String email, Integer age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}`;

const mainApplication = `package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.crudx.annotation.EnableCrudX;

@SpringBootApplication
@EnableCrudX
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`;

const testRequests = `# Get all users
curl -X GET "http://localhost:8080/api/users"

# Get user by ID
curl -X GET "http://localhost:8080/api/users/1"

# Create a new user
curl -X POST "http://localhost:8080/api/users" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }'

# Update user
curl -X PUT "http://localhost:8080/api/users/1" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "age": 31
  }'

# Delete user
curl -X DELETE "http://localhost:8080/api/users/1"

# Search users
curl -X GET "http://localhost:8080/api/users/search?q=john"

# Filter and paginate
curl -X GET "http://localhost:8080/api/users?age=30&page=0&size=10&sort=name,asc"`;

export function GettingStarted() {
  return (
    <div className="flex gap-8">
      <main className="flex-1 max-w-4xl">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Quick Setup</h1>
            <p className="text-xl text-muted-foreground">
              Get up and running with CrudX Framework in just a few minutes. 
              Follow this step-by-step guide to create your first CRUD API.
            </p>
          </div>

          {/* Prerequisites */}
          <section id="prerequisites" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Prerequisites</h2>
            <p className="text-muted-foreground">
              Before getting started, make sure you have the following installed:
            </p>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-success" />
                    Java Development Kit
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Java 17 or higher is required for CrudX Framework.
                  </p>
                  <Badge variant="outline" size="sm">Java 17+</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircleIcon className="h-5 w-5 text-success" />
                    Spring Boot
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Spring Boot 3.0 or higher with Spring Data JPA.
                  </p>
                  <Badge variant="outline" size="sm">Spring Boot 3.0+</Badge>
                </CardContent>
              </Card>
            </div>

            <Alert variant="warning">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Compatibility Note</AlertTitle>
              <AlertDescription>
                CrudX Framework requires Spring Boot 3.0+ and Java 17+. For older versions, 
                please use CrudX v1.x which supports Spring Boot 2.x and Java 11+.
              </AlertDescription>
            </Alert>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
            <p className="text-muted-foreground">
              Add CrudX Framework to your Spring Boot project using Maven or Gradle:
            </p>

            <Tabs defaultValue="maven">
              <TabsList>
                <TabsTrigger value="maven">Maven</TabsTrigger>
                <TabsTrigger value="gradle">Gradle</TabsTrigger>
              </TabsList>
              
              <TabsContent value="maven">
                <CodeBlock 
                  code={mavenDependency}
                  language="xml"
                  title="pom.xml"
                />
              </TabsContent>
              
              <TabsContent value="gradle">
                <CodeBlock 
                  code={gradleDependency}
                  language="gradle"
                  title="build.gradle"
                />
              </TabsContent>
            </Tabs>
          </section>

          {/* Configuration */}
          <section id="configuration" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Configuration</h2>
            <p className="text-muted-foreground">
              Configure CrudX in your application properties or YAML file:
            </p>

            <Tabs defaultValue="properties">
              <TabsList>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="yaml">YAML</TabsTrigger>
              </TabsList>
              
              <TabsContent value="properties">
                <CodeBlock 
                  code={applicationProperties}
                  language="properties"
                  title="application.properties"
                />
              </TabsContent>
              
              <TabsContent value="yaml">
                <CodeBlock 
                  code={applicationYml}
                  language="yaml"
                  title="application.yml"
                />
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Enable CrudX</h3>
              <p className="text-muted-foreground text-sm">
                Add the <code>@EnableCrudX</code> annotation to your main application class:
              </p>
              <CodeBlock 
                code={mainApplication}
                language="java"
                title="Application.java"
              />
            </div>
          </section>

          {/* First Entity */}
          <section id="first-entity" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Create Your First Entity</h2>
            <p className="text-muted-foreground">
              Let's create a simple User entity with CrudX annotations:
            </p>

            <CodeBlock 
              code={entityExample}
              language="java"
              title="User.java"
              showLineNumbers
            />

            <Alert>
              <AlertTitle>What just happened?</AlertTitle>
              <AlertDescription>
                With these annotations, CrudX automatically generates:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>REST controller with all CRUD endpoints</li>
                  <li>Service layer with business logic</li>
                  <li>Repository with custom queries</li>
                  <li>Validation and error handling</li>
                  <li>OpenAPI documentation</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>

          {/* Testing */}
          <section id="testing" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Testing Your API</h2>
            <p className="text-muted-foreground">
              Start your application and test the generated endpoints:
            </p>

            <CodeBlock 
              code={testRequests}
              language="bash"
              title="API Test Commands"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Available Endpoints</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">GET</Badge>
                    <code className="text-sm">/api/users</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">GET</Badge>
                    <code className="text-sm">/api/users/{'{id}'}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" size="sm">POST</Badge>
                    <code className="text-sm">/api/users</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning" size="sm">PUT</Badge>
                    <code className="text-sm">/api/users/{'{id}'}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="error" size="sm">DELETE</Badge>
                    <code className="text-sm">/api/users/{'{id}'}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" size="sm">GET</Badge>
                    <code className="text-sm">/api/users/search</code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Built-in Features</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">✅ Automatic validation</div>
                  <div className="text-sm">✅ Pagination & sorting</div>
                  <div className="text-sm">✅ Search & filtering</div>
                  <div className="text-sm">✅ Error handling</div>
                  <div className="text-sm">✅ OpenAPI docs</div>
                  <div className="text-sm">✅ Security integration</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Next Steps */}
          <section id="next-steps" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Next Steps</h2>
            <p className="text-muted-foreground">
              Congratulations! You've successfully created your first CrudX API. Here's what to explore next:
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Learn Annotations</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover all available CrudX annotations and their configuration options.
                  </p>
                  <Link
                    to="/annotations"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    Explore Annotations →
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Base Entities</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn about base entity classes and common field patterns.
                  </p>
                  <Link
                    to="/entities"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    View Entities →
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">API Reference</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete reference for all generated REST endpoints and their usage.
                  </p>
                  <Link
                    to="/rest-endpoints"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80"
                  >
                    API Docs →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Pagination */}
          <Pagination
            previous={{
              title: "Overview",
              href: "/",
              description: "Introduction to CrudX Framework"
            }}
            next={{
              title: "Annotations",
              href: "/annotations",
              description: "Understanding CrudX annotations"
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