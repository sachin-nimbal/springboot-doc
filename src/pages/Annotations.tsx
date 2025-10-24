import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Badge } from '../components/Badge';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import { CodeBlock } from '../components/CodeBlock';

export const Annotations: React.FC = () => {
  const annotations = [
    {
      name: '@CrudXEntity',
      description: 'Marks a class as a CrudX entity and configures API endpoints',
      attributes: [
        { name: 'path', type: 'String', required: true, description: 'API path for the entity' },
        { name: 'description', type: 'String', required: false, description: 'Description for API documentation' },
        { name: 'version', type: 'String', required: false, description: 'API version' }
      ],
      example: `@Entity
@Table(name = "users")
@CrudXEntity(
    path = "/users",
    description = "User management endpoints"
)
public class User {
    // entity fields...
}`
    },
    {
      name: '@CrudXField',
      description: 'Configures individual field behavior in API responses',
      attributes: [
        { name: 'description', type: 'String', required: false, description: 'Field description for API docs' },
        { name: 'readOnly', type: 'boolean', required: false, description: 'Field is read-only in API' },
        { name: 'hidden', type: 'boolean', required: false, description: 'Hide field from API responses' },
        { name: 'validation', type: 'Validation', required: false, description: 'Validation rules for the field' }
      ],
      example: `@Column(nullable = false)
@CrudXField(
    description = "User email address",
    validation = @Validation(required = true, email = true)
)
private String email;`
    },
    {
      name: '@Validation',
      description: 'Defines validation rules for entity fields',
      attributes: [
        { name: 'required', type: 'boolean', required: false, description: 'Field is required' },
        { name: 'email', type: 'boolean', required: false, description: 'Field must be a valid email' },
        { name: 'minLength', type: 'int', required: false, description: 'Minimum string length' },
        { name: 'maxLength', type: 'int', required: false, description: 'Maximum string length' },
        { name: 'pattern', type: 'String', required: false, description: 'Regex pattern validation' }
      ],
      example: `@CrudXField(
    validation = @Validation(
        required = true,
        minLength = 2,
        maxLength = 50,
        pattern = "^[a-zA-Z\\s]+$"
    )
)
private String name;`
    },
    {
      name: '@CrudXRelationship',
      description: 'Configures relationships between entities',
      attributes: [
        { name: 'type', type: 'RelationshipType', required: true, description: 'Type of relationship' },
        { name: 'target', type: 'Class', required: true, description: 'Target entity class' },
        { name: 'mappedBy', type: 'String', required: false, description: 'Field name in target entity' },
        { name: 'cascade', type: 'CascadeType[]', required: false, description: 'Cascade operations' }
      ],
      example: `@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
@CrudXRelationship(
    type = RelationshipType.ONE_TO_MANY,
    target = Order.class,
    description = "User orders"
)
private List<Order> orders;`
    }
  ];

  const relationshipTypes = [
    { type: 'ONE_TO_ONE', description: 'One-to-one relationship between entities' },
    { type: 'ONE_TO_MANY', description: 'One-to-many relationship between entities' },
    { type: 'MANY_TO_ONE', description: 'Many-to-one relationship between entities' },
    { type: 'MANY_TO_MANY', description: 'Many-to-many relationship between entities' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Core Annotations</h1>
        <p className="text-xl text-muted-foreground">
          Learn about the powerful annotation system that drives CrudX Framework functionality.
        </p>
      </div>

      {/* Overview */}
      <div className="mb-12">
        <Alert variant="info">
          <AlertTitle>Annotation Overview</AlertTitle>
          <AlertDescription>
            CrudX Framework uses a comprehensive annotation system to automatically generate REST APIs, 
            validation rules, and documentation from your entity classes. Simply annotate your entities 
            and let CrudX handle the rest.
          </AlertDescription>
        </Alert>
      </div>

      {/* Annotations List */}
      <div className="space-y-12">
        {annotations.map((annotation, index) => (
          <div key={index} className="border-b border-border pb-12 last:border-b-0">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <Badge variant="default" className="text-sm font-mono">
                  {annotation.name}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground">{annotation.name}</h2>
              </div>
              <p className="text-muted-foreground text-lg">{annotation.description}</p>
            </div>

            {/* Attributes Table */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Attributes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Required</th>
                      <th className="text-left py-3 font-medium text-muted-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annotation.attributes.map((attr, attrIndex) => (
                      <tr key={attrIndex} className="border-b border-border/50">
                        <td className="py-3">
                          <code className="text-foreground font-mono">{attr.name}</code>
                        </td>
                        <td className="py-3 text-muted-foreground">{attr.type}</td>
                        <td className="py-3">
                          <Badge 
                            variant={attr.required ? 'destructive' : 'secondary'}
                            size="sm"
                          >
                            {attr.required ? 'Required' : 'Optional'}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted-foreground">{attr.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Example */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Example</h3>
              <CodeBlock
                code={annotation.example}
                language="java"
                showLineNumbers={true}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Relationship Types */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Relationship Types</h2>
        <p className="text-muted-foreground mb-6">
          CrudX supports all standard JPA relationship types with additional configuration options:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relationshipTypes.map((rel, index) => (
            <Card key={index} variant="outlined">
              <CardHeader>
                <CardTitle className="text-lg">
                  <code className="text-sm font-mono">{rel.type}</code>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{rel.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Best Practices</h2>
        <div className="space-y-4">
          <Alert variant="success">
            <AlertTitle>Entity Design</AlertTitle>
            <AlertDescription>
              Always use meaningful names for your entities and fields. CrudX will use these names 
              to generate user-friendly API documentation.
            </AlertDescription>
          </Alert>
          
          <Alert variant="info">
            <AlertTitle>Validation Rules</AlertTitle>
            <AlertDescription>
              Define comprehensive validation rules using the @Validation annotation. This ensures 
              data integrity and provides clear error messages to API consumers.
            </AlertDescription>
          </Alert>
          
          <Alert variant="warning">
            <AlertTitle>Performance Considerations</AlertTitle>
            <AlertDescription>
              Be mindful of relationship configurations. Use lazy loading for large collections 
              and consider pagination for one-to-many relationships.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};
