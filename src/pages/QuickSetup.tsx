import CodeBlock from '../components/CodeBlock';
import Badge from '../components/Badge';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'overview', title: 'Overview', level: 2 },
  { id: 'install', title: 'Install', level: 2 },
  { id: 'configure', title: 'Configure', level: 2 },
  { id: 'hello-world', title: 'Hello World', level: 2 },
];

export default function QuickSetup() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Quick Setup' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="info" className="mb-4">Fast Track</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Quick Setup</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Get up and running in minutes.</p>
        </div>

        <section id="overview" className="prose mb-12">
          <h2>Overview</h2>
          <p>This guide helps you bootstrap a project rapidly with sensible defaults.</p>
        </section>

        <section id="install" className="prose mb-12">
          <h2>Install</h2>
          <div className="not-prose">
            <CodeBlock code="npm create vite@latest my-app -- --template react-ts" language="bash" showLineNumbers={false} />
          </div>
        </section>

        <section id="configure" className="prose mb-12">
          <h2>Configure</h2>
          <p>Add Tailwind and configure plugins as shown in this project.</p>
        </section>

        <section id="hello-world" className="prose mb-12">
          <h2>Hello World</h2>
          <div className="not-prose">
            <CodeBlock code={`export function App(){\n  return <h1>Hello World</h1>\n}`} language="tsx" />
          </div>
        </section>

        <Pagination prev={{ title: 'Overview', path: '/overview' }} next={{ title: 'Annotations', path: '/core-annotations' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
