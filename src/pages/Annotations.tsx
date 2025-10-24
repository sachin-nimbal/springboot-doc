import { InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { TOC } from '../components/TOC';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Pagination } from '../components/Pagination';

const tocItems = [
  { id: 'overview', title: 'Annotations Overview', level: 2 },
  { id: 'crudx-entity', title: '@CrudXEntity', level: 2 },
  { id: 'crudx-field', title: '@CrudXField', level: 2 },
  { id: 'crudx-relation', title: '@CrudXRelation', level: 2 },
  { id: 'crudx-security', title: '@CrudXSecurity', level: 2 },
  { id: 'examples', title: 'Complete Examples', level: 2 },
];

const breadcrumbItems = [
  { title: 'Annotations' }
];

const entityAnnotationExample = `@Entity
@Table(name = "products")
@CrudXEntity(
    path = "products",
    description = "Product management API",
    version = "v1",
    tags = {"inventory", "catalog"},
    enableSoftDelete = true,
    enableAudit = true,
    defaultPageSize = 25,
    maxPageSize = 100,
    allowedOperations = {CREATE, READ, UPDATE, DELETE, SEARCH}
)
public class Product extends BaseEntity {
    // Entity fields...
}`;

const fieldAnnotationExample = `@Entity
public class User extends BaseEntity {
    
    @CrudXField(
        searchable = true,
        sortable = true,
        filterable = false,
        required = true,
        unique = false,
        description = "User's full name",
        example = "John Doe",
        validation = @CrudXValidation(
            minLength = 2,
            maxLength = 100,
            pattern = "^[a-zA-Z\\s]+$",
            message = "Name must contain only letters and spaces"
        )
    )
    private String name;
    
    @CrudXField(
        searchable = true,
        filterable = true,
        unique = true,
        description = "User's email address",
        example = "john@example.com",
        validation = @CrudXValidation(
            pattern = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
            message = "Invalid email format"
        )
    )
    private String email;
    
    @CrudXField(
        sortable = true,
        filterable = true,
        description = "User's age",
        example = "25",
        validation = @CrudXValidation(
            min = 0,
            max = 150,
            message = "Age must be between 0 and 150"
        )
    )
    private Integer age;
    
    @CrudXField(
        hidden = true,
        description = "User's password hash"
    )
    private String passwordHash;
}`;

const relationAnnotationExample = `@Entity
public class Order extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    @CrudXRelation(
        type = RelationType.MANY_TO_ONE,
        targetEntity = Customer.class,
        fetchType = FetchType.LAZY,
        cascadeOperations = {CascadeType.REFRESH},
        allowNested = true,
        maxDepth = 2,
        description = "The customer who placed this order"
    )
    private Customer customer;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @CrudXRelation(
        type = RelationType.ONE_TO_MANY,
        targetEntity = OrderItem.class,
        fetchType = FetchType.LAZY,
        cascadeOperations = {CascadeType.ALL},
        allowNested = true,
        maxDepth = 1,
        description = "Items in this order"
    )
    private List<OrderItem> items;
}`;

const securityAnnotationExample = `@Entity
@CrudXSecurity(
    readRoles = {"USER", "ADMIN"},
    writeRoles = {"ADMIN"},
    deleteRoles = {"ADMIN"},
    fieldLevelSecurity = {
        @FieldSecurity(field = "salary", roles = {"HR", "ADMIN"}),
        @FieldSecurity(field = "ssn", roles = {"ADMIN"})
    },
    ownershipField = "userId",
    enableRowLevelSecurity = true
)
public class Employee extends BaseEntity {
    
    @CrudXField(description = "Employee name")
    private String name;
    
    @CrudXField(description = "Employee salary", hidden = true)
    private BigDecimal salary;
    
    @CrudXField(description = "Social Security Number", hidden = true)
    private String ssn;
    
    @CrudXField(description = "Associated user ID")
    private Long userId;
}`;

const completeExample = `package com.example.entity;

import com.crudx.annotation.*;
import com.crudx.entity.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_product_category", columnList = "category"),
    @Index(name = "idx_product_status", columnList = "status")
})
@CrudXEntity(
    path = "products",
    description = "Product catalog management API",
    version = "v1",
    tags = {"catalog", "inventory", "e-commerce"},
    enableSoftDelete = true,
    enableAudit = true,
    defaultPageSize = 20,
    maxPageSize = 100,
    allowedOperations = {
        CrudOperation.CREATE,
        CrudOperation.READ,
        CrudOperation.UPDATE,
        CrudOperation.DELETE,
        CrudOperation.SEARCH
    }
)
@CrudXSecurity(
    readRoles = {"USER", "ADMIN", "MANAGER"},
    writeRoles = {"ADMIN", "MANAGER"},
    deleteRoles = {"ADMIN"},
    fieldLevelSecurity = {
        @FieldSecurity(field = "cost", roles = {"ADMIN", "MANAGER"}),
        @FieldSecurity(field = "profit", roles = {"ADMIN"})
    }
)
public class Product extends BaseEntity {
    
    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @CrudXField(
        searchable = true,
        sortable = true,
        required = true,
        description = "Product name",
        example = "Premium Wireless Headphones",
        validation = @CrudXValidation(
            minLength = 2,
            maxLength = 100,
            message = "Product name must be between 2 and 100 characters"
        )
    )
    private String name;
    
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @CrudXField(
        searchable = true,
        description = "Product description",
        example = "High-quality wireless headphones with noise cancellation"
    )
    private String description;
    
    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    @CrudXField(
        sortable = true,
        filterable = true,
        required = true,
        description = "Product price in USD",
        example = "199.99",
        validation = @CrudXValidation(
            min = 0.01,
            message = "Price must be greater than 0"
        )
    )
    private BigDecimal price;
    
    @CrudXField(
        sortable = true,
        filterable = true,
        hidden = true,
        description = "Product cost (internal use only)",
        example = "120.00"
    )
    private BigDecimal cost;
    
    @NotBlank(message = "Category is required")
    @CrudXField(
        filterable = true,
        sortable = true,
        required = true,
        description = "Product category",
        example = "Electronics"
    )
    private String category;
    
    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock cannot be negative")
    @CrudXField(
        sortable = true,
        filterable = true,
        required = true,
        description = "Available stock quantity",
        example = "50"
    )
    private Integer stockQuantity;
    
    @Enumerated(EnumType.STRING)
    @CrudXField(
        filterable = true,
        sortable = true,
        description = "Product status",
        example = "ACTIVE"
    )
    private ProductStatus status = ProductStatus.ACTIVE;
    
    @CrudXField(
        sortable = true,
        description = "Product launch date",
        example = "2024-01-15T10:30:00"
    )
    private LocalDateTime launchDate;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @CrudXRelation(
        type = RelationType.ONE_TO_MANY,
        targetEntity = ProductImage.class,
        allowNested = true,
        maxDepth = 1,
        description = "Product images"
    )
    private List<ProductImage> images;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    @CrudXRelation(
        type = RelationType.MANY_TO_ONE,
        targetEntity = Supplier.class,
        allowNested = true,
        maxDepth = 2,
        description = "Product supplier"
    )
    private Supplier supplier;
    
    // Constructors
    public Product() {}
    
    public Product(String name, String description, BigDecimal price, String category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.status = ProductStatus.ACTIVE;
        this.launchDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    // ... (standard getters and setters)
    
    // Calculated field (not persisted)
    @CrudXField(
        calculated = true,
        description = "Profit margin percentage",
        example = "40.5"
    )
    public Double getProfitMargin() {
        if (cost != null && price != null && cost.compareTo(BigDecimal.ZERO) > 0) {
            return price.subtract(cost)
                      .divide(cost, 4, RoundingMode.HALF_UP)
                      .multiply(BigDecimal.valueOf(100))
                      .doubleValue();
        }
        return 0.0;
    }
}

enum ProductStatus {
    ACTIVE, INACTIVE, DISCONTINUED, OUT_OF_STOCK
}`;

export function Annotations() {
  return (
    <div className="flex gap-8">
      <main className="flex-1 max-w-4xl">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">CrudX Annotations</h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive guide to CrudX annotations that power automatic CRUD API generation. 
              Learn how to configure entities, fields, relationships, and security with simple annotations.
            </p>
          </div>

          {/* Overview */}
          <section id="overview" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Annotations Overview</h2>
            <p className="text-muted-foreground">
              CrudX provides a rich set of annotations that allow you to declaratively configure 
              your entities and their behavior. These annotations work alongside standard JPA 
              annotations to provide powerful CRUD functionality with minimal code.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Core Annotations</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">@CrudXEntity</Badge>
                    <span className="text-sm text-muted-foreground">Entity configuration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">@CrudXField</Badge>
                    <span className="text-sm text-muted-foreground">Field behavior</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">@CrudXRelation</Badge>
                    <span className="text-sm text-muted-foreground">Relationship handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">@CrudXSecurity</Badge>
                    <span className="text-sm text-muted-foreground">Security rules</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Key Benefits</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">✅ Declarative configuration</div>
                  <div className="text-sm">✅ Type-safe validation</div>
                  <div className="text-sm">✅ Automatic documentation</div>
                  <div className="text-sm">✅ Security integration</div>
                  <div className="text-sm">✅ Flexible customization</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* @CrudXEntity */}
          <section id="crudx-entity" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">@CrudXEntity</h2>
            <p className="text-muted-foreground">
              The <code>@CrudXEntity</code> annotation marks a JPA entity for CrudX processing 
              and configures entity-level behavior such as API paths, operations, and defaults.
            </p>

            <CodeBlock 
              code={entityAnnotationExample}
              language="java"
              title="@CrudXEntity Example"
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Configuration Options</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Property</th>
                      <th className="text-left py-2 font-medium">Type</th>
                      <th className="text-left py-2 font-medium">Default</th>
                      <th className="text-left py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-mono">path</td>
                      <td className="py-2">String</td>
                      <td className="py-2 text-muted-foreground">entity name</td>
                      <td className="py-2">API path segment for this entity</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">description</td>
                      <td className="py-2">String</td>
                      <td className="py-2 text-muted-foreground">""</td>
                      <td className="py-2">Entity description for API documentation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">version</td>
                      <td className="py-2">String</td>
                      <td className="py-2 text-muted-foreground">"v1"</td>
                      <td className="py-2">API version for this entity</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">tags</td>
                      <td className="py-2">String[]</td>
                      <td className="py-2 text-muted-foreground">{}</td>
                      <td className="py-2">OpenAPI tags for grouping endpoints</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">enableSoftDelete</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Enable soft delete functionality</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">enableAudit</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Enable audit trail (created/updated fields)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">defaultPageSize</td>
                      <td className="py-2">int</td>
                      <td className="py-2 text-muted-foreground">20</td>
                      <td className="py-2">Default page size for pagination</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">maxPageSize</td>
                      <td className="py-2">int</td>
                      <td className="py-2 text-muted-foreground">100</td>
                      <td className="py-2">Maximum allowed page size</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">allowedOperations</td>
                      <td className="py-2">CrudOperation[]</td>
                      <td className="py-2 text-muted-foreground">ALL</td>
                      <td className="py-2">Allowed CRUD operations for this entity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* @CrudXField */}
          <section id="crudx-field" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">@CrudXField</h2>
            <p className="text-muted-foreground">
              The <code>@CrudXField</code> annotation configures individual field behavior 
              including searchability, filtering, validation, and API documentation.
            </p>

            <CodeBlock 
              code={fieldAnnotationExample}
              language="java"
              title="@CrudXField Examples"
              showLineNumbers
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Field Configuration</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Property</th>
                      <th className="text-left py-2 font-medium">Type</th>
                      <th className="text-left py-2 font-medium">Default</th>
                      <th className="text-left py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 font-mono">searchable</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Include field in text search operations</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">sortable</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Allow sorting by this field</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">filterable</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Allow filtering by this field</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">required</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Field is required for create/update operations</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">unique</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Field value must be unique across entities</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">hidden</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Hide field from API responses (security)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">calculated</td>
                      <td className="py-2">boolean</td>
                      <td className="py-2 text-muted-foreground">false</td>
                      <td className="py-2">Field is calculated/derived (read-only)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">description</td>
                      <td className="py-2">String</td>
                      <td className="py-2 text-muted-foreground">""</td>
                      <td className="py-2">Field description for API documentation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">example</td>
                      <td className="py-2">String</td>
                      <td className="py-2 text-muted-foreground">""</td>
                      <td className="py-2">Example value for API documentation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">validation</td>
                      <td className="py-2">@CrudXValidation</td>
                      <td className="py-2 text-muted-foreground">-</td>
                      <td className="py-2">Custom validation rules for the field</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <Alert>
              <InformationCircleIcon className="h-4 w-4" />
              <AlertTitle>Validation Integration</AlertTitle>
              <AlertDescription>
                CrudX field validation works alongside standard Bean Validation annotations 
                (@NotNull, @Size, etc.). Use @CrudXValidation for CrudX-specific rules 
                and Bean Validation for standard constraints.
              </AlertDescription>
            </Alert>
          </section>

          {/* @CrudXRelation */}
          <section id="crudx-relation" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">@CrudXRelation</h2>
            <p className="text-muted-foreground">
              The <code>@CrudXRelation</code> annotation configures how entity relationships 
              are handled in the generated API, including nested loading and cascade operations.
            </p>

            <CodeBlock 
              code={relationAnnotationExample}
              language="java"
              title="@CrudXRelation Examples"
              showLineNumbers
            />

            <Alert variant="warning">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Performance Consideration</AlertTitle>
              <AlertDescription>
                Be careful with nested loading depth and eager fetching to avoid N+1 queries 
                and performance issues. Use lazy loading and appropriate maxDepth settings.
              </AlertDescription>
            </Alert>
          </section>

          {/* @CrudXSecurity */}
          <section id="crudx-security" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">@CrudXSecurity</h2>
            <p className="text-muted-foreground">
              The <code>@CrudXSecurity</code> annotation provides fine-grained security 
              configuration including role-based access control and field-level security.
            </p>

            <CodeBlock 
              code={securityAnnotationExample}
              language="java"
              title="@CrudXSecurity Example"
              showLineNumbers
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Security Features</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">🔐 Role-based access control</div>
                  <div className="text-sm">🔒 Field-level security</div>
                  <div className="text-sm">👤 Row-level security</div>
                  <div className="text-sm">🛡️ Ownership-based filtering</div>
                  <div className="text-sm">🔑 Integration with Spring Security</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="font-semibold">Security Levels</h3>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">Entity</Badge>
                    <span className="text-sm text-muted-foreground">Overall access control</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">Field</Badge>
                    <span className="text-sm text-muted-foreground">Field visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">Row</Badge>
                    <span className="text-sm text-muted-foreground">Data filtering</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">Operation</Badge>
                    <span className="text-sm text-muted-foreground">CRUD permissions</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Complete Examples */}
          <section id="examples" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Complete Examples</h2>
            <p className="text-muted-foreground">
              Here's a comprehensive example showing all CrudX annotations working together 
              in a real-world entity:
            </p>

            <CodeBlock 
              code={completeExample}
              language="java"
              title="Complete Product Entity Example"
              showLineNumbers
            />

            <Alert variant="success">
              <AlertTitle>Generated Features</AlertTitle>
              <AlertDescription>
                This single entity definition automatically generates:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Full CRUD REST API with 15+ endpoints</li>
                  <li>Advanced search and filtering capabilities</li>
                  <li>Pagination and sorting support</li>
                  <li>Field-level and role-based security</li>
                  <li>Input validation and error handling</li>
                  <li>Complete OpenAPI documentation</li>
                  <li>Audit trail and soft delete functionality</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>

          {/* Pagination */}
          <Pagination
            previous={{
              title: "Quick Setup",
              href: "/getting-started",
              description: "Get up and running in minutes"
            }}
            next={{
              title: "Base Entities",
              href: "/entities",
              description: "Working with entity classes"
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