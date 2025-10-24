import { InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import { Badge } from '../components/Badge';
import { CodeBlock } from '../components/CodeBlock';
import { TOC } from '../components/TOC';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Pagination } from '../components/Pagination';

const tocItems = [
  { id: 'overview', title: 'Base Entities Overview', level: 2 },
  { id: 'base-entity', title: 'BaseEntity Class', level: 2 },
  { id: 'auditable-entity', title: 'AuditableEntity Class', level: 2 },
  { id: 'soft-delete-entity', title: 'SoftDeleteEntity Class', level: 2 },
  { id: 'custom-entities', title: 'Custom Base Entities', level: 2 },
  { id: 'best-practices', title: 'Best Practices', level: 2 },
];

const breadcrumbItems = [
  { title: 'Base Entities' }
];

const baseEntityCode = `package com.crudx.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@MappedSuperclass
public abstract class BaseEntity implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Version
    @Column(name = "version")
    private Long version;
    
    // Constructors
    public BaseEntity() {}
    
    public BaseEntity(Long id) {
        this.id = id;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getVersion() {
        return version;
    }
    
    public void setVersion(Long version) {
        this.version = version;
    }
    
    // Utility methods
    public boolean isNew() {
        return id == null;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BaseEntity that = (BaseEntity) obj;
        return Objects.equals(id, that.id);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
    
    @Override
    public String toString() {
        return getClass().getSimpleName() + "{id=" + id + ", version=" + version + "}";
    }
}`;

const auditableEntityCode = `package com.crudx.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity extends BaseEntity {
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy;
    
    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;
    
    // Constructors
    public AuditableEntity() {
        super();
    }
    
    public AuditableEntity(Long id) {
        super(id);
    }
    
    // Getters and Setters
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public String getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
    
    public String getUpdatedBy() {
        return updatedBy;
    }
    
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }
    
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        updatedAt = createdAt;
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}`;

const softDeleteEntityCode = `package com.crudx.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@MappedSuperclass
public abstract class SoftDeleteEntity extends AuditableEntity {
    
    @Column(name = "deleted", nullable = false)
    private Boolean deleted = false;
    
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    @Column(name = "deleted_by")
    private String deletedBy;
    
    // Constructors
    public SoftDeleteEntity() {
        super();
    }
    
    public SoftDeleteEntity(Long id) {
        super(id);
    }
    
    // Getters and Setters
    public Boolean getDeleted() {
        return deleted;
    }
    
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
    
    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }
    
    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }
    
    public String getDeletedBy() {
        return deletedBy;
    }
    
    public void setDeletedBy(String deletedBy) {
        this.deletedBy = deletedBy;
    }
    
    // Utility methods
    public boolean isDeleted() {
        return Boolean.TRUE.equals(deleted);
    }
    
    public void markAsDeleted() {
        this.deleted = true;
        this.deletedAt = LocalDateTime.now();
        // deletedBy will be set by audit mechanism
    }
    
    public void restore() {
        this.deleted = false;
        this.deletedAt = null;
        this.deletedBy = null;
    }
}`;

const customEntityExample = `package com.example.entity.base;

import com.crudx.entity.AuditableEntity;
import jakarta.persistence.*;
import java.util.UUID;

@MappedSuperclass
public abstract class TenantAwareEntity extends AuditableEntity {
    
    @Column(name = "tenant_id", nullable = false)
    private String tenantId;
    
    @Column(name = "external_id", unique = true)
    private String externalId;
    
    @Column(name = "active", nullable = false)
    private Boolean active = true;
    
    // Constructor
    public TenantAwareEntity() {
        super();
        this.externalId = UUID.randomUUID().toString();
    }
    
    // Getters and Setters
    public String getTenantId() {
        return tenantId;
    }
    
    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }
    
    public String getExternalId() {
        return externalId;
    }
    
    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }
    
    public Boolean getActive() {
        return active;
    }
    
    public void setActive(Boolean active) {
        this.active = active;
    }
    
    public boolean isActive() {
        return Boolean.TRUE.equals(active);
    }
    
    @PrePersist
    protected void onTenantCreate() {
        super.onCreate();
        if (externalId == null) {
            externalId = UUID.randomUUID().toString();
        }
    }
}

// Usage example
@Entity
@Table(name = "customers")
@CrudXEntity(path = "customers", enableAudit = true)
@CrudXSecurity(
    ownershipField = "tenantId",
    enableRowLevelSecurity = true
)
public class Customer extends TenantAwareEntity {
    
    @CrudXField(searchable = true, required = true)
    private String name;
    
    @CrudXField(searchable = true, filterable = true, unique = true)
    private String email;
    
    // Additional fields and methods...
}`;

export function Entities() {
  return (
    <div className="flex gap-8">
      <main className="flex-1 max-w-4xl">
        <div className="space-y-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} />

          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Base Entities</h1>
            <p className="text-xl text-muted-foreground">
              Learn about CrudX base entity classes that provide common functionality 
              like ID generation, versioning, auditing, and soft delete capabilities.
            </p>
          </div>

          {/* Overview */}
          <section id="overview" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Base Entities Overview</h2>
            <p className="text-muted-foreground">
              CrudX provides several base entity classes that encapsulate common patterns 
              and functionality needed in most applications. These base classes handle 
              cross-cutting concerns like ID generation, optimistic locking, audit trails, 
              and soft deletes.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">BaseEntity</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Provides ID, version, and basic entity functionality. 
                    Perfect for simple entities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">AuditableEntity</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Extends BaseEntity with created/updated timestamps 
                    and user tracking.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">SoftDeleteEntity</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Extends AuditableEntity with soft delete functionality 
                    for data retention.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Alert>
              <InformationCircleIcon className="h-4 w-4" />
              <AlertTitle>Inheritance Hierarchy</AlertTitle>
              <AlertDescription>
                BaseEntity → AuditableEntity → SoftDeleteEntity. 
                Choose the appropriate base class based on your requirements.
              </AlertDescription>
            </Alert>
          </section>

          {/* BaseEntity */}
          <section id="base-entity" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">BaseEntity Class</h2>
            <p className="text-muted-foreground">
              The <code>BaseEntity</code> class provides the fundamental functionality 
              that all entities need: ID generation, optimistic locking, and basic utility methods.
            </p>

            <CodeBlock 
              code={baseEntityCode}
              language="java"
              title="BaseEntity.java"
              showLineNumbers
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Features</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-success" />
                      ID Management
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Auto-generated Long ID using IDENTITY strategy</li>
                      <li>• Null-safe ID handling</li>
                      <li>• isNew() utility method</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-success" />
                      Optimistic Locking
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• @Version annotation for concurrency control</li>
                      <li>• Automatic version increment on updates</li>
                      <li>• Prevents lost update problems</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* AuditableEntity */}
          <section id="auditable-entity" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">AuditableEntity Class</h2>
            <p className="text-muted-foreground">
              The <code>AuditableEntity</code> class extends BaseEntity with audit trail 
              functionality, automatically tracking when and by whom entities are created and modified.
            </p>

            <CodeBlock 
              code={auditableEntityCode}
              language="java"
              title="AuditableEntity.java"
              showLineNumbers
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Audit Features</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Field</th>
                      <th className="text-left py-2 font-medium">Type</th>
                      <th className="text-left py-2 font-medium">Description</th>
                      <th className="text-left py-2 font-medium">Populated</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-mono">createdAt</td>
                      <td className="py-2">LocalDateTime</td>
                      <td className="py-2">When the entity was created</td>
                      <td className="py-2">On insert</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">updatedAt</td>
                      <td className="py-2">LocalDateTime</td>
                      <td className="py-2">When the entity was last updated</td>
                      <td className="py-2">On insert/update</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">createdBy</td>
                      <td className="py-2">String</td>
                      <td className="py-2">Who created the entity</td>
                      <td className="py-2">On insert</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-mono">updatedBy</td>
                      <td className="py-2">String</td>
                      <td className="py-2">Who last updated the entity</td>
                      <td className="py-2">On insert/update</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Alert>
                <InformationCircleIcon className="h-4 w-4" />
                <AlertTitle>Audit Configuration</AlertTitle>
                <AlertDescription>
                  To enable audit functionality, add <code>@EnableJpaAuditing</code> to your 
                  configuration class and implement an <code>AuditorAware&lt;String&gt;</code> 
                  bean to provide the current user information.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* SoftDeleteEntity */}
          <section id="soft-delete-entity" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">SoftDeleteEntity Class</h2>
            <p className="text-muted-foreground">
              The <code>SoftDeleteEntity</code> class provides soft delete functionality, 
              allowing you to mark entities as deleted without actually removing them from the database.
            </p>

            <CodeBlock 
              code={softDeleteEntityCode}
              language="java"
              title="SoftDeleteEntity.java"
              showLineNumbers
            />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Soft Delete Benefits</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <h4 className="font-semibold">Data Retention</h4>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Preserve data for audit purposes</li>
                      <li>• Enable data recovery</li>
                      <li>• Maintain referential integrity</li>
                      <li>• Support compliance requirements</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <h4 className="font-semibold">Automatic Handling</h4>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• CrudX automatically filters deleted records</li>
                      <li>• DELETE operations become soft deletes</li>
                      <li>• Restore functionality included</li>
                      <li>• Audit trail for deletions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Custom Entities */}
          <section id="custom-entities" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Custom Base Entities</h2>
            <p className="text-muted-foreground">
              You can create your own base entities by extending CrudX base classes 
              to add application-specific functionality like multi-tenancy or additional audit fields.
            </p>

            <CodeBlock 
              code={customEntityExample}
              language="java"
              title="Custom Base Entity Example"
              showLineNumbers
            />

            <Alert variant="success">
              <CheckCircleIcon className="h-4 w-4" />
              <AlertTitle>Custom Entity Benefits</AlertTitle>
              <AlertDescription>
                Custom base entities allow you to:
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Add tenant isolation for multi-tenant applications</li>
                  <li>Include external IDs for API integration</li>
                  <li>Add soft activation/deactivation flags</li>
                  <li>Implement custom audit requirements</li>
                  <li>Add domain-specific common fields</li>
                </ul>
              </AlertDescription>
            </Alert>
          </section>

          {/* Best Practices */}
          <section id="best-practices" className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Best Practices</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Choosing the Right Base Entity</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <Badge variant="outline">BaseEntity</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Use for:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Simple lookup tables</li>
                        <li>• Configuration entities</li>
                        <li>• Read-only reference data</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <Badge variant="outline">AuditableEntity</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Use for:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Business entities</li>
                        <li>• User-generated content</li>
                        <li>• Entities requiring audit trails</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <Badge variant="outline">SoftDeleteEntity</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Use for:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Critical business data</li>
                        <li>• Entities with dependencies</li>
                        <li>• Compliance-sensitive data</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Implementation Tips</h3>
                <div className="space-y-3">
                  <Alert>
                    <InformationCircleIcon className="h-4 w-4" />
                    <AlertTitle>Performance Considerations</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Index audit fields (createdAt, updatedAt) for better query performance</li>
                        <li>Consider partitioning strategies for high-volume audit data</li>
                        <li>Use appropriate database column types for timestamps</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <InformationCircleIcon className="h-4 w-4" />
                    <AlertTitle>Security Best Practices</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Never expose internal IDs in public APIs - use external IDs</li>
                        <li>Implement proper access control for audit fields</li>
                        <li>Consider field-level security for sensitive audit information</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </section>

          {/* Pagination */}
          <Pagination
            previous={{
              title: "Annotations",
              href: "/annotations",
              description: "Understanding CrudX annotations"
            }}
            next={{
              title: "REST Endpoints",
              href: "/rest-endpoints",
              description: "Complete API endpoint reference"
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