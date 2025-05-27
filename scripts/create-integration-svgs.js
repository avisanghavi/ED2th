import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of all integration SVGs we need
const integrations = [
  'salesforce', 
  'hubspot', 
  'slack', 
  'teams', 
  'zapier', 
  'jira', 
  'github', 
  'notion',
  'zoom',
  'google',
  'asana',
  'aws',
  'mailchimp',
  'google-analytics',
  'meta',
  'semrush',
  'canva',
  'hootsuite',
  'ahrefs',
  'figma',
  'miro',
  'productboard',
  'usertesting',
  'mixpanel',
  'gitlab',
  'jenkins',
  'docker',
  'kubernetes',
  'vscode',
  'trello',
  'monday',
  'airtable',
  'clickup',
  'outreach',
  'gong',
  'zoominfo',
  'docusign',
  'linkedin'
];

// Create the integrations directory if it doesn't exist
const integrationsDir = path.join(__dirname, '../public/integrations');
if (!fs.existsSync(integrationsDir)) {
  fs.mkdirSync(integrationsDir, { recursive: true });
}

// Function to generate a simple SVG with the integration name
function generateSvg(name) {
  // Create abbreviation for the logo text (first 2 characters)
  const abbr = name.slice(0, 2).toUpperCase();
  
  // Generate a deterministic color based on the name
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = hash % 360;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect width="24" height="24" rx="4" fill="hsl(${hue}, 70%, 60%)"/>
  <text x="12" y="15" font-size="10" text-anchor="middle" fill="white" font-family="Arial, sans-serif">${abbr}</text>
</svg>`;
}

// Generate and save SVGs for each integration
integrations.forEach(integration => {
  const filePath = path.join(integrationsDir, `${integration}.svg`);
  
  // Skip if the file already exists
  if (fs.existsSync(filePath)) {
    console.log(`Skipping ${integration}.svg - already exists`);
    return;
  }
  
  // Generate and save the SVG
  const svg = generateSvg(integration);
  fs.writeFileSync(filePath, svg);
  console.log(`Created ${integration}.svg`);
});

console.log('All integration SVGs created!'); 