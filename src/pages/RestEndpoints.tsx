import React from 'react';
import { EndpointsTable } from '../components/EndpointsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/Card';
import { Badge } from '../components/Badge';
import { Alert, AlertDescription, AlertTitle } from '../components/Alert';
import endpointsData from '../data/endpoints.json';

export const RestEndpoints: React.FC = () => {
  const endpointCategories = [
    {
      title: 'Authentication',
      description: 'User authentication and authorization endpoints',
      endpoints: endpointsData.filter(ep => ep.path.includes('/auth'))
    },
    {
      title: 'User Management',
      description: 'User CRUD operations and profile management',
      endpoints: endpointsData.filter(ep => ep.path.includes('/users'))
    },
    {
      title: 'Role Management',
      description: 'Role-based access control endpoints',
      endpoints: endpointsData.filter(ep => ep.path.includes('/roles'))
    },
    {
      title: 'Permission Management',
      description: 'Fine-grained permission management endpoints',
      endpoints: endpointsData.filter(ep => ep.path.includes('/permissions'))
    }
  ];

  const commonHeaders = [
    { name: 'Authorization', description: 'Bearer token for authenticated requests', required: true },
    { name: 'Content-Type', description: 'application/json for request body', required: false },
    { name: 'Accept', description: 'application/json for response format', required: false }
  ];

  const statusCodes = [
    { code: 200, description: 'OK - Request successful' },
    { code: 201, description: 'Created - Resource created successfully' },
    { code: 400, description: 'Bad Request - Invalid request data' },
    { code: 401, description: 'Unauthorized - Authentication required' },
    { code: 403, description: 'Forbidden - Insufficient permissions' },
    { code: 404, description: 'Not Found - Resource not found' },
    { code: 500, description: 'Internal Server Error - Server error occurred' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">REST Endpoints</h1>
        <p className="text-xl text-muted-foreground">
          Complete API reference for all CrudX Framework endpoints. All endpoints are automatically 
          generated from your entity classes and can be customized using annotations.
        </p>
      </div>

      {/* API Overview */}
      <div className="mb-12">
        <Alert variant="info">
          <AlertTitle>API Overview</AlertTitle>
          <AlertDescription>
            CrudX Framework automatically generates RESTful APIs for all your entities. 
            Each entity gets a complete set of CRUD endpoints with pagination, filtering, 
            and validation built-in.
          </AlertDescription>
        </Alert>
      </div>

      {/* Common Headers */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Common Headers</h2>
        <Card>
          <CardHeader>
            <CardTitle>HTTP Headers</CardTitle>
            <CardDescription>
              These headers are commonly used across all API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-medium text-muted-foreground">Header</th>
                    <th className="text-left py-3 font-medium text-muted-foreground">Description</th>
                    <th className="text-left py-3 font-medium text-muted-foreground">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {commonHeaders.map((header, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3">
                        <code className="text-foreground font-mono">{header.name}</code>
                      </td>
                      <td className="py-3 text-muted-foreground">{header.description}</td>
                      <td className="py-3">
                        <Badge 
                          variant={header.required ? 'destructive' : 'secondary'}
                          size="sm"
                        >
                          {header.required ? 'Required' : 'Optional'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Codes */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">HTTP Status Codes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {statusCodes.map((status, index) => (
            <Card key={index} variant="outlined">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Badge 
                    variant={
                      status.code >= 200 && status.code < 300 ? 'success' :
                      status.code >= 400 && status.code < 500 ? 'warning' :
                      status.code >= 500 ? 'destructive' : 'secondary'
                    }
                  >
                    {status.code}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{status.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Endpoints by Category */}
      <div className="space-y-12">
        {endpointCategories.map((category, index) => (
          <div key={index}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            
            {category.endpoints.length > 0 ? (
              <EndpointsTable endpoints={category.endpoints} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No endpoints available for this category yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Pagination</h2>
        <Card>
          <CardHeader>
            <CardTitle>List Endpoints Support Pagination</CardTitle>
            <CardDescription>
              All list endpoints support pagination using query parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Query Parameters</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><code className="bg-muted px-2 py-1 rounded">page</code> - Page number (default: 1)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">size</code> - Items per page (default: 20)</li>
                  <li><code className="bg-muted px-2 py-1 rounded">sort</code> - Sort field (e.g., "name,asc")</li>
                  <li><code className="bg-muted px-2 py-1 rounded">search</code> - Search term for filtering</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Example Request</h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  GET /api/users?page=1&size=10&sort=name,asc&search=john
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Handling */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Error Handling</h2>
        <Alert variant="warning">
          <AlertTitle>Error Response Format</AlertTitle>
          <AlertDescription>
            All error responses follow a consistent format with error codes, messages, 
            and detailed validation information when applicable.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
