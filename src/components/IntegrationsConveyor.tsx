import React from 'react';
import { motion } from 'framer-motion';

// Define the Integration item interface
interface Integration {
  name: string;
  logo: string;
  description: string;
}

// Define standard integrations that can be used across pages
export const standardIntegrations: Integration[] = [
  {
    name: 'Salesforce',
    logo: '/integrations/salesforce.svg',
    description: 'CRM & Sales Automation'
  },
  {
    name: 'HubSpot',
    logo: '/integrations/hubspot.svg',
    description: 'Marketing & Sales Platform'
  },
  {
    name: 'Slack',
    logo: '/integrations/slack.svg',
    description: 'Team Communication'
  },
  {
    name: 'Microsoft Teams',
    logo: '/integrations/teams.svg',
    description: 'Collaboration Platform'
  },
  {
    name: 'Zapier',
    logo: '/integrations/zapier.svg',
    description: 'Workflow Automation'
  },
  {
    name: 'Jira',
    logo: '/integrations/jira.svg',
    description: 'Project Management'
  },
  {
    name: 'GitHub',
    logo: '/integrations/github.svg',
    description: 'Code Collaboration'
  },
  {
    name: 'Notion',
    logo: '/integrations/notion.svg',
    description: 'Knowledge Management'
  },
  {
    name: 'Zoom',
    logo: '/integrations/zoom.svg',
    description: 'Video Conferencing'
  },
  {
    name: 'Google Workspace',
    logo: '/integrations/google.svg',
    description: 'Productivity Suite'
  },
  {
    name: 'Asana',
    logo: '/integrations/asana.svg',
    description: 'Task Management'
  },
  {
    name: 'AWS',
    logo: '/integrations/aws.svg',
    description: 'Cloud Infrastructure'
  }
];

// Integration card component
const IntegrationCard = ({ 
  name, 
  logo, 
  description, 
  color
}) => {
  // Define gradient colors based on the team color
  const getGradient = () => {
    switch(color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      case 'cyan': return 'from-cyan-500 to-blue-500';
      case 'amber': return 'from-amber-500 to-orange-500';
      case 'green': return 'from-green-500 to-emerald-500';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <div
      className="flex-shrink-0 w-64 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300"
    >
      <div className={`h-12 w-12 mb-4 bg-gradient-to-br ${getGradient()} rounded-lg flex items-center justify-center`}>
        <img
          src={logo}
          alt={name}
          className="h-8 w-8 object-contain"
        />
      </div>
      <h3 className="text-white font-semibold mb-2">{name}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

// Main component
const IntegrationsConveyor = ({ 
  integrations = standardIntegrations,
  color = "blue",
  title = "Our Integrations"
}) => {
  // Duplicate integrations to ensure smooth looping
  const firstRowIntegrations = [...integrations, ...integrations.slice(0, 3)];
  const secondRowIntegrations = [...integrations.slice(3), ...integrations, ...integrations.slice(0, 3)];

  return (
    <section className="py-20 bg-gradient-to-b from-company-dark to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Seamlessly connect with your favorite tools and platforms
          </p>
        </div>

        <div className="relative">
          {/* First conveyor belt */}
          <motion.div
            className="flex space-x-8 mb-8"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {firstRowIntegrations.map((integration, index) => (
              <IntegrationCard
                key={`first-${index}`}
                name={integration.name}
                logo={integration.logo}
                description={integration.description}
                color={color}
              />
            ))}
          </motion.div>

          {/* Second conveyor belt (reverse direction) */}
          <motion.div
            className="flex space-x-8"
            animate={{
              x: [-1000, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {secondRowIntegrations.map((integration, index) => (
              <IntegrationCard
                key={`second-${index}`}
                name={integration.name}
                logo={integration.logo}
                description={integration.description}
                color={color}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsConveyor; 