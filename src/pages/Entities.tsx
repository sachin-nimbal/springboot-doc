import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';

export const Entities: React.FC = () => {
  const entities = [
    {
      name: 'User',
      description: 'Core user entity with authentication and profile information',
      fields: [
        { name: 'id', type: 'Long', description: 'Unique identifier' },
        { name: 'email', type: 'String', description: 'User email address' },
        { name: 'name', type: 'String', description: 'User full name' },
        { name: 'password', type: 'String', description: 'Encrypted password' },
        { name: 'createdAt', type: 'LocalDateTime', description: 'Creation timestamp' },
        { name: 'updatedAt', type: 'LocalDateTime', description: 'Last update timestamp' }
      ],
      code: `@Entity
@Table(name = "users")
@CrudXEntity(path = "/users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    @CrudXField(validation = @Validation(required = true, email = true))
    private String email;
    
    @Column(nullable = false)
    @CrudXField(validation = @Validation(required = true, minLength = 2))
    private String name;
    
    @Column(nullable = false)
    @CrudXField(hidden = true)
    private String password;
    
    @Column(name = "created_at")
    @CrudXField(readOnly = true)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @CrudXField(readOnly = true)
    private LocalDateTime updatedAt;
    
    // Relationships
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @CrudXRelationship(type = RelationshipType.ONE_TO_MANY, target = Order.class)
    private List<Order> orders;
    
    // Constructors, getters, setters...
}`
    },
    {
      name: 'Role',
      description: 'User roles for authorization and access control',
      fields: [
        { name: 'id', type: 'Long', description: 'Unique identifier' },
        { name: 'name', type: 'String', description: 'Role name' },
        { name: 'description', type: 'String', description: 'Role description' },
        { name: 'permissions', type: 'List<Permission>', description: 'Associated permissions' }
      ],
      code: `@Entity
@Table(name = "roles")
@CrudXEntity(path = "/roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    @CrudXField(validation = @Validation(required = true, minLength = 2))
    private String name;
    
    @Column
    @CrudXField
    private String description;
    
    @ManyToMany
    @JoinTable(
        name = "role_permissions",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    @CrudXRelationship(type = RelationshipType.MANY_TO_MANY, target = Permission.class)
    private List<Permission> permissions;
    
    // Constructors, getters, setters...
}`
    },
    {
      name: 'Permission',
      description: 'Fine-grained permissions for resource access control',
      fields: [
        { name: 'id', type: 'Long', description: 'Unique identifier' },
        { name: 'name', type: 'String', description: 'Permission name' },
        { name: 'resource', type: 'String', description: 'Resource being protected' },
        { name: 'action', type: 'String', description: 'Action allowed on resource' }
      ],
      code: `@Entity
@Table(name = "permissions")
@CrudXEntity(path = "/permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    @CrudXField(validation = @Validation(required = true))
    private String name;
    
    @Column(nullable = false)
    @CrudXField(validation = @Validation(required = true))
    private String resource;
    
    @Column(nullable = false)
    @CrudXField(validation = @Validation(required = true))
    private String action;
    
    // Constructors, getters, setters...
}`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Base Entities</h1>
        <p className="text-xl text-muted-foreground">
          Pre-built entity classes that provide common functionality for user management, 
          authentication, and authorization.
        </p>
      </div>

      {/* Entities List */}
      <div className="space-y-12">
        {entities.map((entity, index) => (
          <div key={index} className="border-b border-border pb-12 last:border-b-0">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="default" className="text-sm font-mono">
                  {entity.name}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground">{entity.name} Entity</h2>
              </div>
              <p className="text-muted-foreground text-lg">{entity.description}</p>
            </div>

            {/* Fields Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Fields</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entity.fields.map((field, fieldIndex) => (
                      <tr key={fieldIndex} className="border-b border-border/50">
                        <td className="py-3">
                          <code className="text-foreground font-mono">{field.name}</code>
                        </td>
                        <td className="py-3 text-muted-foreground">{field.type}</td>
                        <td className="py-3 text-muted-foreground">{field.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code Example */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Implementation</h3>
              <CodeBlock
                code={entity.code}
                language="java"
                showLineNumbers={true}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Extending Base Entities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                You can extend these base entities to add custom fields and behavior. 
                Simply inherit from the base class and add your additional fields.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Add custom validation rules using the @Validation annotation. 
                This ensures data integrity and provides clear error messages.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
