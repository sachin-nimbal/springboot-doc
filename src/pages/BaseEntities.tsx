import { motion } from 'framer-motion';
import { Database, Key, Link, Shield, Calendar } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'defining-entities', title: 'Defining Entities', level: 2 },
  { id: 'entity-decorators', title: 'Entity Decorators', level: 2 },
  { id: 'relationships', title: 'Relationships', level: 2 },
  { id: 'validation', title: 'Validation', level: 2 },
];

const entityExamples = [
  {
    title: 'Basic Entity',
    description: 'A simple entity with basic fields and CrudX controller annotation',
    code: `@Entity
@Table(name = "users")
@CrudXController
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(unique = true, nullable = false, length = 255)
    private String email;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    // Constructors, getters, setters...
}`,
    features: ['Primary key generation', 'Column constraints', 'Audit timestamps']
  },
  {
    title: 'Entity with Validation',
    description: 'An entity with comprehensive validation annotations',
    code: `@Entity
@Table(name = "products")
@CrudXController
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    @CrudXNotNull(message = "Product name is required")
    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
    private String name;
    
    @Column(columnDefinition = "TEXT")
    @CrudXNotNull(message = "Product description is required")
    private String description;
    
    @Column(nullable = false, precision = 10, scale = 2)
    @CrudXNotNull(message = "Price is required")
    @DecimalMin(value = "0.0", message = "Price must be positive")
    private BigDecimal price;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Constructors, getters, setters...
}`,
    features: ['Field validation', 'Custom error messages', 'Data type constraints']
  }
];

const relationshipExamples = [
  {
    title: 'One-to-Many Relationship',
    description: 'User entity with multiple posts',
    code: `@Entity
@Table(name = "users")
@CrudXController
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @CrudXRelation(fetch = "eager", include = true)
    private List<Post> posts = new ArrayList<>();
    
    // Constructors, getters, setters...
}

@Entity
@Table(name = "posts")
@CrudXController
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String content;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    @CrudXRelation(include = true)
    private User author;
    
    // Constructors, getters, setters...
}`,
    features: ['Bidirectional relationship', 'Cascade operations', 'Lazy loading control']
  },
  {
    title: 'Many-to-Many Relationship',
    description: 'Users and roles with many-to-many relationship',
    code: `@Entity
@Table(name = "users")
@CrudXController
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String email;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    @CrudXRelation(fetch = "lazy", include = false)
    private Set<Role> roles = new HashSet<>();
    
    // Constructors, getters, setters...
}

@Entity
@Table(name = "roles")
@CrudXController
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String name;
    
    private String description;
    
    @ManyToMany(mappedBy = "roles")
    @CrudXRelation(fetch = "lazy", include = false)
    private Set<User> users = new HashSet<>();
    
    // Constructors, getters, setters...
}`,
    features: ['Junction table', 'Bidirectional mapping', 'Include control']
  }
];

const validationExamples = [
  {
    title: 'Field Validation',
    description: 'Comprehensive field-level validation',
    code: `@Entity
@Table(name = "orders")
@CrudXController
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    @CrudXNotNull(message = "Order number is required")
    @Pattern(regexp = "^ORD-[0-9]{6}$", message = "Order number must be in format ORD-XXXXXX")
    private String orderNumber;
    
    @Column(nullable = false, precision = 10, scale = 2)
    @CrudXNotNull(message = "Total amount is required")
    @DecimalMin(value = "0.01", message = "Total amount must be greater than 0")
    @DecimalMax(value = "999999.99", message = "Total amount cannot exceed 999,999.99")
    private BigDecimal totalAmount;
    
    @Column(name = "order_date")
    @CrudXNotNull(message = "Order date is required")
    @PastOrPresent(message = "Order date cannot be in the future")
    private LocalDateTime orderDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @CrudXNotNull(message = "Order status is required")
    private OrderStatus status;
    
    // Constructors, getters, setters...
}`,
    features: ['Pattern validation', 'Range validation', 'Date validation', 'Enum validation']
  }
];

export default function BaseEntities() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Base Entities' }]} className="mb-6" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="hero-title mb-4">
            Base <span className="gradient-text">Entities</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            Learn how to define JPA entities that work seamlessly with CrudX. 
            From basic entities to complex relationships, CrudX handles it all.
          </p>
        </motion.div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            CrudX works with standard JPA entities and automatically generates REST endpoints 
            based on your entity structure. The framework analyzes your entity classes and 
            creates comprehensive CRUD operations with pagination, filtering, and validation.
          </p>
          <Alert variant="info" title="JPA Compatibility" className="my-6">
            CrudX is built on top of Spring Data JPA and supports all standard JPA annotations. 
            Your existing entities will work with CrudX without any modifications.
          </Alert>
        </section>

        {/* Defining Entities */}
        <section id="defining-entities" className="prose mb-12">
          <h2>Defining Entities</h2>
          <p>
            Creating CrudX-compatible entities is straightforward. Simply add the 
            <code>@CrudXController</code> annotation to your JPA entity class, and CrudX 
            will automatically generate REST endpoints for it.
          </p>
          
          {entityExamples.map((example, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-purple/10">
                    <Database className="w-6 h-6 text-crudx-purple" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-purple rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={example.code} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        {/* Entity Decorators */}
        <section id="entity-decorators" className="prose mb-12">
          <h2>Entity Decorators</h2>
          <p>
            CrudX provides several decorators to enhance your entities with additional 
            functionality and customization options.
          </p>
          
          <div className="grid gap-6 my-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-indigo/10">
                  <Key className="w-6 h-6 text-crudx-indigo" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">@CrudXController</h3>
                  <p className="text-muted-foreground mb-4">
                    The main annotation that enables CrudX functionality for an entity.
                  </p>
                  <CodeBlock 
                    language="java" 
                    code={`@CrudXController(
    basePath = "/api/v1",
    pagination = true,
    filters = {"name", "email"},
    sortBy = {"createdAt"}
)
@Entity
public class User {
    // Entity definition...
}`}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-blue/10">
                  <Shield className="w-6 h-6 text-crudx-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">@CrudXAudit</h3>
                  <p className="text-muted-foreground mb-4">
                    Enables automatic audit trail for entity changes.
                  </p>
                  <CodeBlock 
                    language="java" 
                    code={`@Entity
@CrudXController
@CrudXAudit
public class User {
    @Id
    private Long id;
    
    @CrudXAuditField
    private String name;
    
    @CrudXAuditField
    private String email;
    
    // Other fields...
}`}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-crudx-green/10">
                  <Calendar className="w-6 h-6 text-crudx-green" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">@CrudXSoftDelete</h3>
                  <p className="text-muted-foreground mb-4">
                    Enables soft delete functionality for the entity.
                  </p>
                  <CodeBlock 
                    language="java" 
                    code={`@Entity
@CrudXController
@CrudXSoftDelete
public class User {
    @Id
    private Long id;
    
    private String name;
    private String email;
    
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    // Other fields...
}`}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Relationships */}
        <section id="relationships" className="prose mb-12">
          <h2>Relationships</h2>
          <p>
            CrudX supports all JPA relationship types and provides additional annotations 
            to control how relationships are handled in the generated REST endpoints.
          </p>
          
          {relationshipExamples.map((example, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-pink/10">
                    <Link className="w-6 h-6 text-crudx-pink" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-pink rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={example.code} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        {/* Validation */}
        <section id="validation" className="prose mb-12">
          <h2>Validation</h2>
          <p>
            CrudX integrates seamlessly with Bean Validation (JSR-303) and provides 
            additional validation annotations for enhanced data integrity.
          </p>
          
          {validationExamples.map((example, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-green/10">
                    <Shield className="w-6 h-6 text-crudx-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Validation Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-green rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={example.code} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        <Pagination
          prev={{ title: 'Core Annotations', path: '/core-annotations' }}
          next={{ title: 'REST Endpoints', path: '/rest-endpoints' }}
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