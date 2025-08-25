import React, { useState } from 'react';

// List of template files
const templates = [
  'email_a.html',
  'email_b.html',
  'email_b2.2.html',
  'email_b2.3.html',
  'email_b2.4.html',
  'email_c.html',
  'email_d.html',
  'email_e.html',
];

function getTemplatePath(name) {
  return `/src/components/templates/${name}`;
}

export default function TemplateDemo() {
  const [selected, setSelected] = useState(templates[0]);
  const [content, setContent] = useState('');

  React.useEffect(() => {
    fetch(getTemplatePath(selected))
      .then((res) => res.text())
      .then(setContent);
  }, [selected]);

  return (
    <section aria-labelledby="template-list-heading">
      <h2 id="template-list-heading">Available Email Templates</h2>
      <nav aria-label="Email templates">
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', listStyle: 'none', padding: 0 }}>
          {templates.map((name) => (
            <li key={name}>
              <button
                type="button"
                aria-pressed={selected === name}
                onClick={() => setSelected(name)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: 4,
                  border: selected === name ? '2px solid #005fcc' : '1px solid #ccc',
                  background: selected === name ? '#e6f0ff' : '#fff',
                  cursor: 'pointer',
                  fontWeight: selected === name ? 'bold' : 'normal',
                }}
              >
                {name.replace('.html', '').replace(/_/g, ' ').toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div
        role="region"
        aria-label={`Preview of ${selected}`}
        style={{
          marginTop: 32,
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 16,
          background: '#fafafa',
          minHeight: 300,
          overflow: 'auto',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', marginBottom: 12 }}>{selected.replace('.html', '').replace(/_/g, ' ').toUpperCase()} Preview</h3>
        <div
          style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
