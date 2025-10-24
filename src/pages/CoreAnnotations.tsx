import { motion } from 'framer-motion';
import { Code, Tag, Settings, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Alert from '../components/Alert';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';
import CodeBlock from '../components/CodeBlock';

const tocItems = [
  { id: 'introduction', title: 'Introduction', level: 2 },
  { id: 'controller-annotations', title: 'Controller Annotations', level: 2 },
  { id: 'route-annotations', title: 'Route Annotations', level: 2 },
  { id: 'parameter-annotations', title: 'Parameter Annotations', level: 2 },
  { id: 'validation-annotations', title: 'Validation Annotations', level: 2 },
];

const controllerAnnotations = [
  {
    name: '@CrudXController',
    description: 'Marks a class as a CrudX controller for automatic REST endpoint generation',
    example: `@Entity
@CrudXController
public class User {
    // Entity fields...
}`,
    features: ['Auto-generates CRUD endpoints', 'Configurable base path', 'Built-in pagination']
  },
  {
    name: '@CrudXRepository',
    description: 'Marks a repository interface for enhanced CrudX functionality',
    example: `@Repository
@CrudXRepository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom methods...
}`,
    features: ['Enhanced query methods', 'Automatic validation', 'Custom endpoint support']
  }
];

const routeAnnotations = [
  {
    name: '@CrudXGet',
    description: 'Customize GET endpoint behavior',
    example: `@CrudXGet(
    path = "/custom",
    pagination = true,
    filters = {"name", "email"}
)
public List<User> getCustomUsers() {
    return userRepository.findAll();
}`,
    features: ['Custom path mapping', 'Pagination control', 'Filter configuration']
  },
  {
    name: '@CrudXPost',
    description: 'Customize POST endpoint behavior',
    example: `@CrudXPost(
    path = "/custom",
    validation = true,
    response = UserResponse.class
)
public User createCustomUser(@RequestBody User user) {
    return userService.save(user);
}`,
    features: ['Custom validation', 'Response transformation', 'Business logic integration']
  },
  {
    name: '@CrudXPut',
    description: 'Customize PUT endpoint behavior',
    example: `@CrudXPut(
    path = "/custom/{id}",
    validation = true,
    merge = true
)
public User updateCustomUser(@PathVariable Long id, @RequestBody User user) {
    return userService.update(id, user);
}`,
    features: ['Partial updates', 'Merge strategy', 'ID validation']
  },
  {
    name: '@CrudXDelete',
    description: 'Customize DELETE endpoint behavior',
    example: `@CrudXDelete(
    path = "/custom/{id}",
    softDelete = true
)
public void deleteCustomUser(@PathVariable Long id) {
    userService.softDelete(id);
}`,
    features: ['Soft delete support', 'Cascade operations', 'Audit logging']
  }
];

const parameterAnnotations = [
  {
    name: '@CrudXParam',
    description: 'Enhanced parameter binding with validation and transformation',
    example: `@CrudXGet
public List<User> getUsers(
    @CrudXParam(name = "name", required = false) String name,
    @CrudXParam(name = "email", pattern = "^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$") String email
) {
    // Implementation...
}`,
    features: ['Automatic validation', 'Type conversion', 'Pattern matching']
  },
  {
    name: '@CrudXPageable',
    description: 'Enhanced pagination with sorting and filtering',
    example: `@CrudXGet
public Page<User> getUsers(
    @CrudXPageable(
        defaultSize = 20,
        maxSize = 100,
        sortBy = {"name", "email"}
    ) Pageable pageable
) {
    return userRepository.findAll(pageable);
}`,
    features: ['Default page size', 'Maximum page size', 'Sortable fields']
  }
];

const validationAnnotations = [
  {
    name: '@CrudXValid',
    description: 'Enhanced validation with custom error messages',
    example: `@CrudXPost
public User createUser(@CrudXValid @RequestBody User user) {
    return userService.save(user);
}`,
    features: ['Custom error messages', 'Field-level validation', 'Group validation']
  },
  {
    name: '@CrudXNotNull',
    description: 'Field-level null validation',
    example: `@Entity
public class User {
    @CrudXNotNull(message = "Name is required")
    private String name;
    
    @CrudXNotNull(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
}`,
    features: ['Custom error messages', 'Integration with Bean Validation', 'Automatic error responses']
  }
];

export default function CoreAnnotations() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Core Annotations' }]} className="mb-6" />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="hero-title mb-4">
            Core <span className="gradient-text">Annotations</span>
          </h1>
          <p className="hero-subtitle max-w-3xl">
            Learn about CrudX's powerful annotation system that allows you to customize 
            and extend the auto-generated REST endpoints with minimal code.
          </p>
        </motion.div>

        {/* Introduction */}
        <section id="introduction" className="prose mb-12">
          <h2>Introduction</h2>
          <p>
            CrudX provides a comprehensive set of annotations that allow you to customize 
            the behavior of auto-generated REST endpoints. These annotations work alongside 
            your existing Spring Boot annotations and provide additional functionality 
            specific to CrudX.
          </p>
          <Alert variant="info" title="Annotation Categories" className="my-6">
            CrudX annotations are organized into four main categories: Controller, Route, 
            Parameter, and Validation annotations. Each category serves a specific purpose 
            in customizing your REST API behavior.
          </Alert>
        </section>

        {/* Controller Annotations */}
        <section id="controller-annotations" className="prose mb-12">
          <h2>Controller Annotations</h2>
          <p>
            Controller annotations are applied at the class level to define how CrudX 
            should handle your entities and repositories.
          </p>
          
          {controllerAnnotations.map((annotation, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-purple/10">
                    <Tag className="w-6 h-6 text-crudx-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-lg font-mono font-semibold text-crudx-purple">
                        {annotation.name}
                      </code>
                      <Badge variant="info" className="bg-crudx-indigo/10 text-crudx-indigo border-crudx-indigo/20">
                        Class Level
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{annotation.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {annotation.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-purple rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={annotation.example} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        {/* Route Annotations */}
        <section id="route-annotations" className="prose mb-12">
          <h2>Route Annotations</h2>
          <p>
            Route annotations allow you to customize individual HTTP method endpoints 
            with specific behavior and configuration.
          </p>
          
          {routeAnnotations.map((annotation, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-indigo/10">
                    <Zap className="w-6 h-6 text-crudx-indigo" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-lg font-mono font-semibold text-crudx-indigo">
                        {annotation.name}
                      </code>
                      <Badge variant="info" className="bg-crudx-blue/10 text-crudx-blue border-crudx-blue/20">
                        Method Level
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{annotation.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {annotation.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-indigo rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={annotation.example} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        {/* Parameter Annotations */}
        <section id="parameter-annotations" className="prose mb-12">
          <h2>Parameter Annotations</h2>
          <p>
            Parameter annotations enhance method parameters with validation, transformation, 
            and automatic binding capabilities.
          </p>
          
          {parameterAnnotations.map((annotation, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-blue/10">
                    <Settings className="w-6 h-6 text-crudx-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-lg font-mono font-semibold text-crudx-blue">
                        {annotation.name}
                      </code>
                      <Badge variant="info" className="bg-crudx-green/10 text-crudx-green border-crudx-green/20">
                        Parameter Level
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{annotation.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {annotation.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-blue rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={annotation.example} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        {/* Validation Annotations */}
        <section id="validation-annotations" className="prose mb-12">
          <h2>Validation Annotations</h2>
          <p>
            Validation annotations provide enhanced validation capabilities with custom 
            error messages and field-level validation rules.
          </p>
          
          {validationAnnotations.map((annotation, index) => (
            <div key={index} className="my-8">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-crudx-green/10">
                    <Code className="w-6 h-6 text-crudx-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-lg font-mono font-semibold text-crudx-green">
                        {annotation.name}
                      </code>
                      <Badge variant="info" className="bg-crudx-pink/10 text-crudx-pink border-crudx-pink/20">
                        Field/Method Level
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{annotation.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Features:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {annotation.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-crudx-green rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <CodeBlock language="java" code={annotation.example} />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </section>

        <Pagination
          prev={{ title: 'Quick Setup', path: '/quick-setup' }}
          next={{ title: 'Base Entities', path: '/base-entities' }}
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