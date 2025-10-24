import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import Accordion from '../components/Accordion';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'intro', title: 'Introduction', level: 2 },
  { id: 'controller', title: 'Controller', level: 2 },
  { id: 'routes', title: 'Routes', level: 2 },
  { id: 'parameters', title: 'Parameters', level: 2 },
];

const accordionItems = [
  {
    id: 'controller',
    title: '@Controller',
    content: (
      <div className="space-y-2">
        <p>Marks a class as a controller.</p>
        <code className="text-xs">@Controller(path: string)</code>
      </div>
    ),
  },
  {
    id: 'get',
    title: '@Get',
    content: (
      <div className="space-y-2">
        <p>Defines a GET route.</p>
        <code className="text-xs">@Get(path?: string)</code>
      </div>
    ),
  },
];

export default function CoreAnnotations() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Core Annotations' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">Core Concept</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Core Annotations</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Decorators for controllers, routes, and parameters.</p>
        </div>

        <section id="intro" className="prose mb-12">
          <h2>Introduction</h2>
          <p>Annotations provide a clean, declarative way to define API behavior.</p>
          <Alert variant="info" title="Tip">Enable experimentalDecorators in tsconfig.json.</Alert>
        </section>

        <section id="controller" className="prose mb-12">
          <h2>Controller</h2>
          <div className="not-prose">
            <CodeBlock code={`import { Controller, Get } from 'premium-docs';\n\n@Controller('/api/products')\nexport class ProductController {\n  @Get()\n  getAllProducts() {\n    return { products: [] };\n  }\n}`} language="typescript" />
          </div>
        </section>

        <section id="routes" className="prose mb-12">
          <h2>Routes</h2>
          <div className="not-prose">
            <CodeBlock code={`@Get()\n@Get('/:id')\n@Post()\n@Put('/:id')\n@Delete('/:id')`} language="typescript" />
          </div>
        </section>

        <section id="parameters" className="prose mb-12">
          <h2>Parameters</h2>
          <div className="not-prose my-6">
            <Accordion items={accordionItems} />
          </div>
        </section>

        <Pagination prev={{ title: 'Quick Setup', path: '/quick-setup' }} next={{ title: 'Base Entities', path: '/base-entities' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
