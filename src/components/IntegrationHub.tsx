
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Globe, 
  Linkedin, 
  Mail, 
  FileText, 
  Calendar, 
  Briefcase, 
  Settings, 
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: 'job-boards' | 'ats' | 'networking' | 'productivity';
  status: 'connected' | 'available' | 'premium';
  features: string[];
}

const IntegrationHub = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(['linkedin']);

  const integrations: Integration[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Auto-apply to jobs and sync profile data',
      icon: Linkedin,
      category: 'networking',
      status: 'connected',
      features: ['Profile sync', 'Job alerts', 'Easy Apply', 'Network analysis']
    },
    {
      id: 'indeed',
      name: 'Indeed',
      description: 'Search and apply to millions of jobs',
      icon: Briefcase,
      category: 'job-boards',
      status: 'available',
      features: ['Job search', 'Application tracking', 'Salary insights']
    },
    {
      id: 'glassdoor',
      name: 'Glassdoor',
      description: 'Company reviews and salary data',
      icon: Globe,
      category: 'job-boards',
      status: 'available',
      features: ['Company insights', 'Salary data', 'Interview prep']
    },
    {
      id: 'workday',
      name: 'Workday ATS',
      description: 'Direct integration with Workday systems',
      icon: Settings,
      category: 'ats',
      status: 'premium',
      features: ['ATS optimization', 'Application status', 'Direct submit']
    },
    {
      id: 'greenhouse',
      name: 'Greenhouse',
      description: 'Connect with Greenhouse ATS',
      icon: Settings,
      category: 'ats',
      status: 'premium',
      features: ['Application tracking', 'Interview scheduling', 'Status updates']
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Schedule interviews automatically',
      icon: Calendar,
      category: 'productivity',
      status: 'available',
      features: ['Interview scheduling', 'Calendar sync', 'Reminders']
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Email templates and tracking',
      icon: Mail,
      category: 'productivity',
      status: 'available',
      features: ['Email templates', 'Follow-up tracking', 'Response analytics']
    }
  ];

  const toggleIntegration = (integrationId: string) => {
    setConnectedIntegrations(prev => 
      prev.includes(integrationId)
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'premium':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <ExternalLink className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case 'premium':
        return <Badge className="bg-orange-100 text-orange-800">Premium</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  const groupedIntegrations = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {} as Record<string, Integration[]>);

  const categoryNames = {
    'job-boards': 'Job Boards',
    'ats': 'ATS Systems',
    'networking': 'Professional Networks',
    'productivity': 'Productivity Tools'
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-purple-600" />
          Integration Hub
        </CardTitle>
        <p className="text-sm text-gray-600">
          Connect with job boards, ATS systems, and productivity tools to streamline your job search
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connected Summary */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-purple-800">
                {connectedIntegrations.length} Active Integrations
              </h3>
              <p className="text-sm text-purple-600">
                Expand your reach with more connections
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Analytics
            </Button>
          </div>
        </div>

        {/* Integration Categories */}
        {Object.entries(groupedIntegrations).map(([category, categoryIntegrations]) => (
          <div key={category} className="space-y-3">
            <h3 className="font-semibold text-gray-800 border-b pb-2">
              {categoryNames[category as keyof typeof categoryNames]}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {categoryIntegrations.map((integration) => {
                const Icon = integration.icon;
                const isConnected = connectedIntegrations.includes(integration.id);
                
                return (
                  <div key={integration.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(integration.status)}
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Connection Toggle */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={isConnected}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                          disabled={integration.status === 'premium'}
                        />
                        <span className="text-sm">
                          {isConnected ? 'Connected' : 'Connect'}
                        </span>
                      </div>
                      {integration.status === 'premium' && (
                        <Button variant="outline" size="sm">
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* API Integration */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Custom API Integration
          </h4>
          <p className="text-sm text-gray-600 mb-3">
            Connect your own tools and systems using our REST API
          </p>
          <Button variant="outline" size="sm">
            View API Documentation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationHub;
