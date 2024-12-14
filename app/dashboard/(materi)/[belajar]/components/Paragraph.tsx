import { marked } from 'marked';
import Link from 'next/link';

export const MarkdownToHtml = ({ markdown }: { markdown: string }) => {
  const htmlContent = marked(markdown);

  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      role="document"  // Ensures the content is identified as a document
      aria-live="polite"  // Helps screen readers announce updates to the content
    />
  );
};


export default function SideNav() {
  const content = {
    1: "Pengertian",
    2: "Dalil Naqli",
    3: "Bentuk-Bentuk",
    4: "Keutamaan"
  };

  return (
    <aside className="md:m-10 p-5 md:fixed md:top-10" aria-labelledby="side-nav-heading">
      <h2 id="side-nav-heading" className="text-2xl font-bold mb-6">Navigasi</h2>
      
      <nav aria-label="Side navigation links">
        <ul>
          {Object.entries(content).map(([key, value]) => (
            <li key={key} className="mb-4">
              <Link
                href={`#section-${key}`}
                className="text-lg hover:text-green-500"
                aria-label={`Go to section: ${value}`}
              >
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

