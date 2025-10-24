import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import Alert from '../components/Alert';
import Badge from '../components/Badge';
import Card from '../components/Card';
import Breadcrumbs from '../components/Breadcrumbs';
import Pagination from '../components/Pagination';
import TOC from '../components/TOC';

const tocItems = [
  { id: 'intro', title: 'Introduction', level: 2 },
  { id: 'defining', title: 'Defining Entities', level: 2 },
  { id: 'relations', title: 'Relationships', level: 2 },
];

export default function BaseEntities() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        <Breadcrumbs items={[{ label: 'Base Entities' }]} className="mb-6" />

        <div className="mb-8">
          <Badge variant="warning" className="mb-4">Core Concept</Badge>
          <h1 className="text-[clamp(2rem,4vw+1rem,3rem)] font-bold tracking-tight mb-4">Base Entities</h1>
          <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-muted-foreground">Define models with decorators and types.</p>
        </div>

        <section id="intro" className="prose mb-12">
          <h2>Introduction</h2>
          <p>Entities represent your domain objects and are mapped to storage tables.</p>
          <Alert variant="info" title="ORM">Works with Prisma or TypeORM.</Alert>
        </section>

        <section id="defining" className="prose mb-12">
          <h2>Defining Entities</h2>
          <div className="not-prose">
            <CodeBlock language="typescript" code={`@Entity()\nexport class User {\n  @PrimaryGeneratedColumn()\n  id: number;\n  @Column()\n  name: string;\n}`} />
          </div>
        </section>

        <section id="relations" className="prose mb-12">
          <h2>Relationships</h2>
          <div className="grid gap-4 not-prose">
            <Card>
              <h3 className="font-semibold mb-2">One-to-Many</h3>
              <CodeBlock language="typescript" code={`@OneToMany(() => Post, post => post.author)\nposts: Post[]`} />
            </Card>
            <Card>
              <h3 className="font-semibold mb-2">Many-to-One</h3>
              <CodeBlock language="typescript" code={`@ManyToOne(() => User, user => user.posts)\nauthor: User`} />
            </Card>
          </div>
          <p className="prose">Continue with <Link to="/rest-endpoints">REST Endpoints</Link>.</p>
        </section>

        <Pagination prev={{ title: 'Core Annotations', path: '/core-annotations' }} next={{ title: 'REST Endpoints', path: '/rest-endpoints' }} />
      </div>

      <aside className="hidden xl:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <TOC items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
