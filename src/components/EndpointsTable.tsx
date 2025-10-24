import { useState } from 'react';
import { MethodBadge } from './Badge';
import CodeBlock from './CodeBlock';
import { cn } from '@/utils/cn';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  description: string;
  example?: {
    curl: string;
    response: string;
  };
}

interface EndpointsTableProps {
  endpoints: Endpoint[];
  className?: string;
}

/**
 * EndpointsTable component for displaying API endpoints
 * Shows method, path, description, and expandable examples
 */
export default function EndpointsTable({ endpoints, className }: EndpointsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className={cn('overflow-hidden rounded-lg border border-border', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Method
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Endpoint
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                Description
              </th>
              <th className="w-10 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {endpoints.map((endpoint, index) => {
              const isExpanded = expandedRows.has(index);
              return (
                <>
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => endpoint.example && toggleRow(index)}
                  >
                    <td className="px-4 py-3 align-top">
                      <MethodBadge method={endpoint.method} />
                    </td>
                    <td className="px-4 py-3 align-top">
                      <code className="text-sm font-mono text-primary">
                        {endpoint.path}
                      </code>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-foreground/90">
                      {endpoint.description}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {endpoint.example && (
                        <ChevronDownIcon
                          className={cn(
                            'h-5 w-5 text-muted-foreground transition-transform duration-200',
                            isExpanded ? 'rotate-180' : ''
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </td>
                  </tr>
                  {isExpanded && endpoint.example && (
                    <tr>
                      <td colSpan={4} className="bg-muted/20 px-4 py-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              Request Example
                            </h4>
                            <CodeBlock code={endpoint.example.curl} language="bash" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              Response
                            </h4>
                            <CodeBlock code={endpoint.example.response} language="json" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
