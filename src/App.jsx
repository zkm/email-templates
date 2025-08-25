import React from 'react';
import TemplateDemo from './components/TemplateDemo.jsx';

export default function App() {
  return (
    <main style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <header>
        <h1 tabIndex={0}>Email Template Demo</h1>
        <p>This demo showcases accessible and responsive previews of email templates.</p>
      </header>
      <TemplateDemo />
    </main>
  );
}
