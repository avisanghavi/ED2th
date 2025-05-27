import React from 'react';
import { motion } from 'framer-motion';

const integrations = [
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
  }
];

const IntegrationsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-company-dark to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Our Integrations
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
            {integrations.map((integration, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-64 bg-company-dark/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="h-12 w-12 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold mb-2">{integration.name}</h3>
                <p className="text-gray-400 text-sm">{integration.description}</p>
              </div>
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
            {integrations.map((integration, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-64 bg-company-dark/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="h-12 w-12 mb-4 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <h3 className="text-white font-semibold mb-2">{integration.name}</h3>
                <p className="text-gray-400 text-sm">{integration.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection; 