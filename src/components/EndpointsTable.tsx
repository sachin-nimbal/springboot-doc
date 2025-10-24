import React from 'react';
import { MethodBadge } from './Badge';
import { CopyButton } from './CopyButton';
import { Card, CardContent, CardHeader } from './Card';
import { cn } from '../utils/cn';
import endpointsData from '../data/endpoints.json';

interface Parameter {
  name: string;
  type: string;
  description: string;
}

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters?: Parameter[];
  requestBody?: {
    description: string;
    required: boolean;
  };
  responses: Record<string, string>;
}

interface EndpointsTableProps {
  className?: string;
}

export function EndpointsTable({ className }: EndpointsTableProps) {
  const endpoints = endpointsData.endpoints as Endpoint[];

  const generateCurlCommand = (endpoint: Endpoint) => {
    let curl = `curl -X ${endpoint.method} "https://api.example.com${endpoint.path}"`;
    
    if (endpoint.method === 'POST' || endpoint.method === 'PUT') {
      curl += ' \\\n  -H "Content-Type: application/json" \\\n  -d \'{"key": "value"}\'';
    }
    
    return curl;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {endpoints.map((endpoint, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <MethodBadge method={endpoint.method} />
                <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  {endpoint.path}
                </code>
              </div>
              <CopyButton 
                text={generateCurlCommand(endpoint)} 
                className="shrink-0"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {endpoint.description}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Parameters */}
            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium">Name</th>
                        <th className="text-left py-2 font-medium">Type</th>
                        <th className="text-left py-2 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.parameters.map((param, paramIndex) => (
                        <tr key={paramIndex} className="border-b last:border-b-0">
                          <td className="py-2 font-mono text-xs">{param.name}</td>
                          <td className="py-2">
                            <span className="inline-flex items-center rounded bg-muted px-2 py-1 text-xs font-medium">
                              {param.type}
                            </span>
                          </td>
                          <td className="py-2 text-muted-foreground">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Request Body */}
            {endpoint.requestBody && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Request Body</h4>
                <p className="text-sm text-muted-foreground">
                  {endpoint.requestBody.description}
                  {endpoint.requestBody.required && (
                    <span className="text-destructive ml-1">*</span>
                  )}
                </p>
              </div>
            )}

            {/* Responses */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Responses</h4>
              <div className="space-y-2">
                {Object.entries(endpoint.responses).map(([code, description]) => (
                  <div key={code} className="flex items-center gap-3">
                    <span className={cn(
                      "inline-flex items-center rounded px-2 py-1 text-xs font-medium",
                      code.startsWith('2') 
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : code.startsWith('4')
                        ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                    )}>
                      {code}
                    </span>
                    <span className="text-sm text-muted-foreground">{description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* cURL Example */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Example Request</h4>
                <CopyButton text={generateCurlCommand(endpoint)} size="sm" />
              </div>
              <pre className="bg-muted p-3 rounded text-xs font-mono overflow-x-auto">
                {generateCurlCommand(endpoint)}
              </pre>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}