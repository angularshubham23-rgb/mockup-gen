// Simple rules-based spec generator for the mockup generator
// Exposes generateSpecFor(prompt, style) -> spec object

function generateSpecFor(prompt, style = {}) {
  const title = `Mockup: ${String(prompt).slice(0, 60)}`;
  const theme = style.theme || 'light';

  // Build a canonical spec object following the user's requested sections
  const spec = {
    meta: { title, createdAt: new Date().toISOString(), theme },
    screenOverview: {
      title: title,
      description: 'Generated mockup from prompt: ' + prompt,
      grid: { columns: 12, gutter: 8 },
      safeArea: { padding: 16 },
    },
    layout: {
      header: { height: 64 },
      sidebar: { width: 280 },
      canvas: { flex: 1 },
      footer: { height: 48 },
    },
    styleGuide: {
      colors: {
        primary: '#4A90E2',
        secondary: '#50E3C2',
        background: theme === 'dark' ? '#0F1724' : '#F5F5F5',
        text: theme === 'dark' ? '#E6EEF6' : '#111827',
      },
      typography: { fontFamily: 'Inter, system-ui, -apple-system', base: 16 },
      spacing: { unit: 8 },
    },
    components: [
      { name: 'Header', props: { navItems: ['Home', 'Explore', 'Generate'] } },
      { name: 'Sidebar', props: { categories: ['Inputs', 'Controls', 'Containers'] } },
      { name: 'Canvas', props: {} },
      { name: 'Inspector', props: { panels: ['Style', 'Layout', 'Props'] } },
    ],
    interactions: [
      'Drag & drop components from sidebar to canvas',
      'Click component to open inspector',
      'Generate code button exports scaffolding'
    ],
    responsiveness: {
      breakpoints: { mobile: 480, tablet: 768, desktop: 1280 },
      behavior: 'Sidebar collapses on mobile; canvas stacks components vertically on narrow widths'
    },
    imagePrompt: `A modern ${theme} UI mockup of a web-based mockup generation tool with sidebar and canvas. Clean layout, 12-column grid, 8pt spacing, medium-contrast colors, top navigation, and inspector panel on the right.`
  };

  return spec;
}

module.exports = generateSpecFor;
