import { motion } from 'framer-motion';
import { Zap, Globe, Shield, Code, ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import EndpointsTable from '../components/EndpointsTable';
import CodeBlock from '../components/CodeBlock';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'http-methods', title: 'HTTP Methods', level: 2 },
  { id: 'available-endpoints', title: 'Available Endpoints', level: 2 },
  { id: 'authentication', title: 'Authentication', level: 2 },
  { id: 'error-handling', title: 'Error Handling', level: 2 },
];

const httpMethods = [
  {
    method: 'GET',
    color: 'green',
    description: 'Retrieve data from the server',
    examples: [
      'GET /api/users - List all users',
      'GET /api/users/1 - Get user by ID',
      'GET /api/users?page=1&size=10 - Paginated list'
    ]
  },
  {
    method: 'POST',
    color: 'blue',
    description: 'Create new resources',
    examples: [
      'POST /api/users - Create a new user',
      'POST /api/posts - Create a new post'
    ]
  },
  {
    method: 'PUT',
    color: 'yellow',
    description: 'Update existing resources',
    examples: [
      'PUT /api/users/1 - Update user by ID',
      'PUT /api/posts/1 - Update post by ID'
    ]
  },
  {
    method: 'PATCH',
    color: 'purple',
    description: 'Partially update resources',
    examples: [
      'PATCH /api/users/1 - Partial update',
      'PATCH /api/posts/1 - Partial update'
    ]
  },
  {
    method: 'DELETE',
    color: 'red',
    description: 'Remove resources',
    examples: [
      'DELETE /api/users/1 - Delete user',
      'DELETE /api/posts/1 - Delete post'
    ]
  }
];

const endpointFeatures = [
  {
    title: 'Automatic CRUD Operations',
    description: 'CrudX automatically generates all standard CRUD operations for your entities',
    icon: Zap,
    features: [
      'Create new resources with POST',
      'Read resources with GET (single and list)',
      'Update resources with PUT/PATCH',
      'Delete resources with DELETE'
    ]
  },
  {
    title: 'Pagination & Filtering',
    description: 'Built-in pagination and filtering capabilities for all list endpoints',
    icon: Globe,
    features: [
      'Page-based pagination with configurable size',
      'Sorting by any entity field',
      'Filtering by entity properties',
      'Search across multiple fields'
    ]
  },
  {
    title: 'Validation & Error Handling',
    description: 'Comprehensive validation and standardized error responses',
    icon: Shield,
    features: [
      'Request validation using Bean Validation',
      'Custom error messages and codes',
      'Standardized error response format',
      'Detailed validation error information'
    ]
  },
  {
    title: 'OpenAPI Documentation',
    description: 'Automatic generation of OpenAPI/Swagger documentation',
    icon: Code,
    features: [
      'Interactive API documentation',
      'Request/response schemas',
      'Example requests and responses',
      'Authentication documentation'
    ]
  }
];

const authenticationExamples = [
  {
    title: 'JWT Authentication',
    description: 'Secure your endpoints with JWT tokens',
    code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/users/**").hasRole("USER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()))
            );
        return http.build();
    }
}`,
    features: ['Role-based access control', 'JWT token validation', 'Public endpoint support']
  },
  {
    title: 'API Key Authentication',
    description: 'Simple API key-based authentication',
    code: `@Component
public class ApiKeyAuthenticationFilter implements Filter {
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, 
                        FilterChain chain) throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String apiKey = httpRequest.getHeader("X-API-Key");
        
        if (isValidApiKey(apiKey)) {
            // Set authentication context
            SecurityContextHolder.getContext().setAuthentication(
                new ApiKeyAuthentication(apiKey)
            );
        }
        
        chain.doFilter(request, response);
    }
}`,
    features: ['Header-based authentication', 'Custom authentication logic', 'Simple integration']
  }
];

const errorHandlingExamples = [
  {
    title: 'Standard Error Response',
    description: 'Consistent error response format across all endpoints',
    code: `{
  "timestamp": "2024-01-15T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/users",
  "details": [
    {
      "field": "email",
      "message": "Email is required",
      "rejectedValue": null
    },
    {
      "field": "name",
      "message": "Name must be between 3 and 100 characters",
      "rejectedValue": "A"
    }
  ]
}`,
    features: ['Structured error format', 'Field-level validation errors', 'Timestamp and path information']
  },
  {
    title: 'Custom Error Handling',
    description: 'Handle specific exceptions with custom error responses',
    code: `@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(
            EntityNotFoundException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(Instant.now())
            .status(404)
            .error("Not Found")
            .message(ex.getMessage())
            .path(getCurrentPath())
            .build();
        
        return ResponseEntity.status(404).body(error);
    }
    
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            ValidationException ex) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(Instant.now())
            .status(400)
            .error("Validation Failed")
            .message("Request validation failed")
            .details(ex.getValidationErrors())
            .path(getCurrentPath())
            .build();
        
        return ResponseEntity.status(400).body(error);
    }
}`,
    features: ['Global exception handling', 'Custom error responses', 'Specific exception types']
  }
];

export default function RestEndpoints() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'REST Endpoints' }]} className="mb-6" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="hero-title mb-4">
            REST <span className="gradient-text">Endpoints</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            Explore the automatically generated REST endpoints and learn how to customize 
            them for your specific needs. CrudX provides a complete REST API out of the box.
          </p>
        </motion.div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            CrudX automatically generates comprehensive REST endpoints for all your JPA entities. 
            These endpoints follow RESTful conventions and include advanced features like pagination, 
            filtering, validation, and more.
          </p>
          <Alert variant="info" title="Automatic Generation" className="my-6">
            All endpoints are generated automatically based on your entity definitions. 
            No manual controller code is required, but you can customize behavior using annotations.
          </Alert>
        </section>

        {/* HTTP Methods */}
        <section id="http-methods" className="prose mb-12">
          <h2>HTTP Methods</h2>
          <p>
            CrudX generates endpoints for all standard HTTP methods, each serving a specific purpose 
            in your REST API.
          </p>
          
          <div className="grid gap-4 my-8">
            {httpMethods.map((method, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <Badge 
                    variant="info" 
                    className={`method-${method.color} font-mono text-sm`}
                  >
                    {method.method}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{method.description}</h3>
                    <div className="space-y-1">
                      {method.examples.map((example, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground font-mono">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Available Endpoints */}
        <section id="available-endpoints" className="prose mb-12">
          <h2>Available Endpoints</h2>
          <p>
            Here are the endpoints that CrudX generates for a typical User entity. 
            All endpoints include comprehensive documentation and examples.
          </p>
          
          <div className="my-8">
            <EndpointsTable />
          </div>
          
          <div className="grid gap-6 my-8">
            {endpointFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-purple/10">
                    <feature.icon className="w-6 h-6 text-crudx-purple" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-crudx-purple rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Authentication */}
        <section id="authentication" className="prose mb-12">
          <h2>Authentication</h2>
          <p>
            CrudX integrates seamlessly with Spring Security to provide authentication 
            and authorization for your REST endpoints.
          </p>
          
          {authenticationExamples.map((example, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-indigo/10">
                    <Shield className="w-6 h-6 text-crudx-indigo" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-indigo rounded-full" />
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

        {/* Error Handling */}
        <section id="error-handling" className="prose mb-12">
          <h2>Error Handling</h2>
          <p>
            CrudX provides comprehensive error handling with standardized error responses 
            and detailed validation information.
          </p>
          
          {errorHandlingExamples.map((example, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-red/10">
                    <Code className="w-6 h-6 text-crudx-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{example.title}</h3>
                    <p className="text-muted-foreground mb-4">{example.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {example.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-red rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="json" code={example.code} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        <Pagination
          prev={{ title: 'Base Entities', path: '/base-entities' }}
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