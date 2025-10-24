import React, { useState } from 'react';
import { CopyButton } from './CopyButton';
import { CodeBlock } from './CodeBlock';

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Response {
  status: number;
  description: string;
  example: any;
}

interface Endpoint {
  method: string;
  path: string;
  description: string;
  parameters: Parameter[];
  responses: Response[];
}

interface EndpointsTableProps {
  endpoints: Endpoint[];
}

const getMethodColor = (method: string) => {
  switch (method.toUpperCase()) {
    case 'GET':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    case 'POST':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    case 'PUT':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    case 'DELETE':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
    case 'PATCH':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  }
};

export const EndpointsTable: React.FC<EndpointsTableProps> = ({ endpoints }) => {
  const [expandedEndpoint, setExpandedEndpoint] = useState<number | null>(null);
  const [copiedCurl, setCopiedCurl] = useState<number | null>(null);

  const generateCurlCommand = (endpoint: Endpoint) => {
    const baseUrl = 'https://api.crudx.com';
    const method = endpoint.method.toUpperCase();
    const url = `${baseUrl}${endpoint.path}`;
    
    let curl = `curl -X ${method} "${url}"`;
    
    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '{}'`;
    }
    
    return curl;
  };

  const handleCopyCurl = async (endpoint: Endpoint, index: number) => {
    try {
      const curlCommand = generateCurlCommand(endpoint);
      await navigator.clipboard.writeText(curlCommand);
      setCopiedCurl(index);
      setTimeout(() => setCopiedCurl(null), 2000);
    } catch (err) {
      console.error('Failed to copy cURL command:', err);
    }
  };

  return (
    <div className="space-y-6">
      {endpoints.map((endpoint, index) => (
        <div
          key={index}
          className="border border-border rounded-lg bg-card overflow-hidden"
        >
          {/* Endpoint Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${getMethodColor(endpoint.method)}`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                    {endpoint.path}
                  </code>
                </div>
                <p className="text-sm text-muted-foreground">{endpoint.description}</p>
              </div>
              <button
                onClick={() => setExpandedEndpoint(expandedEndpoint === index ? null : index)}
                className="ml-4 p-2 hover:bg-muted rounded transition-colors"
              >
                <span className="text-sm font-medium">
                  {expandedEndpoint === index ? 'Hide Details' : 'Show Details'}
                </span>
              </button>
            </div>
          </div>

          {/* Expanded Content */}
          {expandedEndpoint === index && (
            <div className="p-4 space-y-6">
              {/* Parameters */}
              {endpoint.parameters.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 font-medium text-muted-foreground">Name</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Type</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Required</th>
                          <th className="text-left py-2 font-medium text-muted-foreground">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.parameters.map((param, paramIndex) => (
                          <tr key={paramIndex} className="border-b border-border/50">
                            <td className="py-2">
                              <code className="text-foreground font-mono">{param.name}</code>
                            </td>
                            <td className="py-2 text-muted-foreground">{param.type}</td>
                            <td className="py-2">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  param.required
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}
                              >
                                {param.required ? 'Required' : 'Optional'}
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

              {/* Responses */}
              {endpoint.responses.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Responses</h4>
                  <div className="space-y-4">
                    {endpoint.responses.map((response, responseIndex) => (
                      <div key={responseIndex} className="border border-border rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${
                              response.status >= 200 && response.status < 300
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : response.status >= 400
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            }`}
                          >
                            {response.status}
                          </span>
                          <span className="text-sm text-muted-foreground">{response.description}</span>
                        </div>
                        {response.example && (
                          <CodeBlock
                            code={JSON.stringify(response.example, null, 2)}
                            language="json"
                            showLineNumbers={false}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* cURL Example */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-foreground">cURL Example</h4>
                  <CopyButton
                    onCopy={() => handleCopyCurl(endpoint, index)}
                    copied={copiedCurl === index}
                  />
                </div>
                <CodeBlock
                  code={generateCurlCommand(endpoint)}
                  language="bash"
                  showLineNumbers={false}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
