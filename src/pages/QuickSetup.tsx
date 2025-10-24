import { motion } from 'framer-motion';
import { CheckCircle, Copy, Download, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';

const tocItems = [
  { id: 'prerequisites', title: 'Prerequisites', level: 2 },
  { id: 'installation', title: 'Installation', level: 2 },
  { id: 'project-setup', title: 'Project Setup', level: 2 },
  { id: 'configuration', title: 'Configuration', level: 2 },
  { id: 'running', title: 'Running Your App', level: 2 },
];

const prerequisites = [
  'Java 17 or higher',
  'Maven 3.6+ or Gradle 7.0+',
  'Spring Boot 2.7+ or 3.0+',
  'IDE (IntelliJ IDEA, Eclipse, or VS Code)',
];

const installationSteps = [
  {
    title: 'Add CrudX Dependency',
    description: 'Add the CrudX Spring Boot starter to your project',
    code: `<!-- Maven -->
<dependency>
    <groupId>com.crudx</groupId>
    <artifactId>crudx-spring-boot-starter</artifactId>
    <version>2.1.0</version>
</dependency>

<!-- Gradle -->
implementation 'com.crudx:crudx-spring-boot-starter:2.1.0'`,
  },
  {
    title: 'Enable CrudX',
    description: 'Add the @EnableCrudX annotation to your main application class',
    code: `@SpringBootApplication
@EnableCrudX
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`,
  },
  {
    title: 'Configure Database',
    description: 'Add your database configuration to application.yml',
    code: `spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    properties:
      hibernate:
        format_sql: true`,
  },
];

export default function QuickSetup() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Quick Setup' }]} className="mb-6" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="hero-title mb-4">
            Quick <span className="gradient-text">Setup</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            Get your first CrudX application up and running in just a few minutes. 
            Follow this step-by-step guide to create a fully functional REST API.
          </p>
        </motion.div>

        {/* Prerequisites */}
        <section id="prerequisites" className="prose mb-12">
          <h2>Prerequisites</h2>
          <p>Before you begin, make sure you have the following installed:</p>
          <div className="grid sm:grid-cols-2 gap-3 my-6">
            {prerequisites.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
          <Alert variant="info" title="Need Help?" className="my-6">
            If you don't have Java installed, check out the{' '}
            <a href="https://adoptium.net/" target="_blank" rel="noopener noreferrer" className="underline">
              Eclipse Temurin
            </a>{' '}
            for the latest LTS version.
          </Alert>
        </section>

        {/* Installation */}
        <section id="installation" className="prose mb-12">
          <h2>Installation</h2>
          <p>Follow these steps to add CrudX to your Spring Boot project:</p>
          
          {installationSteps.map((step, index) => (
            <div key={index} className="my-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="info" className="bg-crudx-purple/10 text-crudx-purple border-crudx-purple/20">
                  Step {index + 1}
                </Badge>
                <h3 className="text-lg font-semibold m-0">{step.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <CodeBlock language="java" code={step.code} />
            </div>
          ))}
        </section>

        {/* Project Setup */}
        <section id="project-setup" className="prose mb-12">
          <h2>Project Setup</h2>
          <p>Now let's create a simple entity to see CrudX in action:</p>
          
          <div className="my-6">
            <h4>1. Create a User Entity</h4>
            <CodeBlock 
              language="java" 
              code={`@Entity
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
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    // Constructors
    public User() {}
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}`}
            />
          </div>

          <div className="my-6">
            <h4>2. Add Repository Interface</h4>
            <CodeBlock 
              language="java" 
              code={`@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContainingIgnoreCase(String name);
    Optional<User> findByEmail(String email);
}`}
            />
          </div>
        </section>

        {/* Configuration */}
        <section id="configuration" className="prose mb-12">
          <h2>Configuration</h2>
          <p>Customize CrudX behavior with these configuration options:</p>
          
          <div className="my-6">
            <h4>Basic Configuration</h4>
            <CodeBlock 
              language="yaml" 
              code={`crudx:
  api:
    base-path: /api
    version: v1
  pagination:
    default-size: 20
    max-size: 100
  security:
    enabled: true
    require-auth: false`}
            />
          </div>

          <div className="my-6">
            <h4>Advanced Configuration</h4>
            <CodeBlock 
              language="yaml" 
              code={`crudx:
  validation:
    enabled: true
    fail-fast: true
  documentation:
    enabled: true
    swagger-ui:
      enabled: true
      path: /swagger-ui.html
  logging:
    enabled: true
    level: INFO`}
            />
          </div>
        </section>

        {/* Running */}
        <section id="running" className="prose mb-12">
          <h2>Running Your App</h2>
          <p>Start your application and test the generated endpoints:</p>
          
          <div className="my-6">
            <h4>1. Start the Application</h4>
            <CodeBlock 
              language="bash" 
              code={`# Using Maven
./mvnw spring-boot:run

# Using Gradle
./gradlew bootRun

# Or run the main class directly
java -jar target/your-app.jar`}
            />
          </div>

          <div className="my-6">
            <h4>2. Test the Generated Endpoints</h4>
            <CodeBlock 
              language="bash" 
              code={`# Create a user
curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get all users
curl http://localhost:8080/api/users

# Get user by ID
curl http://localhost:8080/api/users/1

# Update user
curl -X PUT http://localhost:8080/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Smith", "email": "johnsmith@example.com"}'

# Delete user
curl -X DELETE http://localhost:8080/api/users/1`}
            />
          </div>

          <Alert variant="success" title="Congratulations!" className="my-6">
            You've successfully created your first CrudX application! The framework has automatically 
            generated all the REST endpoints for your User entity. Check out the{' '}
            <Link to="/core-annotations" className="underline">
              Core Annotations
            </Link>{' '}
            guide to learn about advanced features.
          </Alert>
        </section>

        <Pagination
          prev={{ title: 'Overview', path: '/overview' }}
          next={{ title: 'Core Annotations', path: '/core-annotations' }}
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