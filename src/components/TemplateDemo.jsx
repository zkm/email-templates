import React, { useState, useMemo, useRef, useEffect } from 'react';

// Import email templates as raw strings via Vite's ?raw query
// This avoids fetch path issues and works in dev/build.
import emailA from './templates/email_a.html?raw';
import emailB from './templates/email_b.html?raw';
import emailB22 from './templates/email_b2.2.html?raw';
import emailB23 from './templates/email_b2.3.html?raw';
import emailB24 from './templates/email_b2.4.html?raw';
import emailC from './templates/email_c.html?raw';
import emailD from './templates/email_d.html?raw';
import emailE from './templates/email_e.html?raw';
import defaultStyle from './templates/default_style.css?raw';

const templateEntries = [
  { id: 'email_a', label: 'Email A', html: emailA },
  { id: 'email_b', label: 'Email B', html: emailB },
  { id: 'email_b22', label: 'Email B 2.2', html: emailB22 },
  { id: 'email_b23', label: 'Email B 2.3', html: emailB23 },
  { id: 'email_b24', label: 'Email B 2.4', html: emailB24 },
  { id: 'email_c', label: 'Email C', html: emailC },
  { id: 'email_d', label: 'Email D', html: emailD },
  { id: 'email_e', label: 'Email E', html: emailE },
];

export default function TemplateDemo() {
  const [selectedId, setSelectedId] = useState(templateEntries[0].id);
  const [width, setWidth] = useState(600);
  const [fullWidth, setFullWidth] = useState(false);
  const [frameHeight, setFrameHeight] = useState(800);
  const [liveMsg, setLiveMsg] = useState('');
  const frameRef = useRef(null);
  const selected = useMemo(
    () => templateEntries.find((t) => t.id === selectedId) || templateEntries[0],
    [selectedId]
  );

  // Compose a standalone HTML document for the iframe to sandbox styles
  const iframeDoc = useMemo(() => {
    const responsiveViewport = '<meta name="viewport" content="width=device-width, initial-scale=1" />';
    const baseReset = `html,body{margin:0;padding:0;background:#fff}`;
    const styleTag = `<style>${baseReset}\n${defaultStyle}</style>`;

    // If the template already has <html> structure, we still wrap to ensure viewport and isolation
    return `<!doctype html><html lang="en"><head>${responsiveViewport}${styleTag}</head><body>${selected.html}</body></html>`;
  }, [selected]);

  const widthPresets = [
    { label: 'Mobile S (320)', value: 320 },
    { label: 'Mobile M (360)', value: 360 },
    { label: 'Mobile L (390)', value: 390 },
    { label: 'Tablet (768)', value: 768 },
    { label: 'Laptop (1024)', value: 1024 },
    { label: 'Desktop (1200)', value: 1200 },
    { label: 'Full width', value: '100%' },
  ];

  function applyPreset(val) {
    if (val === '100%') {
      setFullWidth(true);
      setLiveMsg('Preview set to full width');
    } else if (typeof val === 'number') {
      setFullWidth(false);
      setWidth(val);
      setLiveMsg(`Preview width set to ${val} pixels`);
    }
  }

  function onWidthSlider(val) {
    const num = Number(val);
    setFullWidth(false);
    setWidth(num);
  }

  // Auto-size iframe height to its content
  function measureHeight() {
    const frame = frameRef.current;
    try {
      if (frame && frame.contentDocument) {
        const doc = frame.contentDocument;
        const body = doc.body;
        const html = doc.documentElement;
        const h = Math.max(
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          html?.clientHeight || 0,
          html?.scrollHeight || 0,
          html?.offsetHeight || 0
        );
        const clamped = Math.max(400, Math.min(h + 20, 3000));
        setFrameHeight(clamped);
      }
    } catch (e) {
      // Cross-origin safety (shouldn't happen with srcDoc)
    }
  }

  useEffect(() => {
    // Re-measure when template changes or width toggles
    const id = setTimeout(measureHeight, 50);
    return () => clearTimeout(id);
  }, [selectedId, width, fullWidth, iframeDoc]);

  return (
    <section className="template-demo" aria-labelledby="template-list-heading">
      <h2 id="template-list-heading">Available Email Templates</h2>
      <div className="demo-grid">
        <aside className="sidebar" aria-label="Email templates">
          <ul className="chip-list">
            {templateEntries.map((t) => {
              const active = selectedId === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    className={`chip${active ? ' chip--active' : ''}`}
                    onClick={() => setSelectedId(t.id)}
                  >
                    {t.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="preview-area">
          <div className="controls" style={{ marginTop: 4 }}>
            <div className="controls-row" role="group" aria-label="Viewport presets">
              {widthPresets.map((p) => {
                const active = (p.value === '100%' && fullWidth) || (typeof p.value === 'number' && !fullWidth && width === p.value);
                return (
                  <button
                    key={String(p.value)}
                    type="button"
                    aria-pressed={active}
                    className={`chip chip--sm${active ? ' chip--active' : ''}`}
                    onClick={() => applyPreset(p.value)}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>

            <div className="controls-row">
              <label htmlFor="widthRange" className="label">Preview width (px)</label>
              <input
                id="widthRange"
                type="range"
                min={320}
                max={1200}
                value={fullWidth ? 1200 : width}
                disabled={fullWidth}
                onChange={(e) => onWidthSlider(e.target.value)}
                aria-label="Adjust preview width"
                className="slider"
              />
              <input
                type="number"
                min={320}
                max={2000}
                aria-label="Preview width in pixels"
                value={fullWidth ? '' : width}
                placeholder={fullWidth ? 'full' : undefined}
                disabled={fullWidth}
                onChange={(e) => onWidthSlider(e.target.value)}
                className="number"
              />
              <button
                type="button"
                onClick={() => applyPreset('100%')}
                aria-pressed={fullWidth}
                aria-label="Set preview to full width"
                className={`chip chip--sm${fullWidth ? ' chip--active' : ''}`}
              >
                Full
              </button>
            </div>

            <p id="resizeHint" className="muted">
              Tip: Drag the right edge of the preview to resize, or use the slider/number field.
            </p>
          </div>

          <div className="preview-card" role="region" aria-label={`Preview of ${selected.label}`}>
            <div className="preview-card__header">
              <h3>{selected.label} Preview</h3>
            </div>
            <div className="preview-card__body">
              <div
                className="preview-frame-container"
                aria-describedby="resizeHint"
                style={{ width: fullWidth ? '100%' : width }}
              >
                <iframe
                  ref={frameRef}
                  id="templatePreview"
                  title={`${selected.label} preview`}
                  className="preview-iframe"
                  style={{ height: frameHeight }}
                  sandbox="allow-same-origin"
                  srcDoc={iframeDoc}
                  onLoad={measureHeight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-live="polite" className="sr-only">{liveMsg}</div>
    </section>
  );
}
