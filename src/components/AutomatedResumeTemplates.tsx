import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { File, Download, Eye, Star, Briefcase, Code, Palette } from 'lucide-react';

interface ResumeTemplate {
  id: string;
  name: string;
  category: 'professional' | 'creative' | 'technical' | 'executive';
  description: string;
  atsScore: number;
  features: string[];
  preview: string;
  bestFor: string[];
  matchScore?: number;
}

interface AutomatedResumeTemplatesProps {
  jobTitle: string;
  experience: string;
  industry: string;
}

const AutomatedResumeTemplates = ({ 
  jobTitle = "Software Developer", 
  experience = "5+ years", 
  industry = "Technology" 
}: AutomatedResumeTemplatesProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const templates: ResumeTemplate[] = [
    {
      id: 'tech-modern',
      name: 'Modern Technical',
      category: 'technical',
      description: 'Clean, technical-focused template optimized for software engineering roles',
      atsScore: 95,
      features: ['ATS-Optimized', 'Skills Matrix', 'Project Showcase', 'Clean Layout'],
      preview: 'A modern, minimalist design with prominent skills section and project highlights',
      bestFor: ['Software Engineers', 'Data Scientists', 'DevOps Engineers'],
      matchScore: 92
    },
    {
      id: 'professional-classic',
      name: 'Professional Classic',
      category: 'professional',
      description: 'Traditional professional format suitable for all industries',
      atsScore: 88,
      features: ['Traditional Layout', 'ATS-Friendly', 'Versatile Design', 'Professional Sections'],
      preview: 'Classic professional layout with clear sections and traditional formatting',
      bestFor: ['Business Analysts', 'Project Managers', 'Consultants'],
      matchScore: 85
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      category: 'creative',
      description: 'Visually appealing template for creative professionals',
      atsScore: 78,
      features: ['Visual Elements', 'Portfolio Section', 'Creative Layout', 'Brand Focused'],
      preview: 'Creative design with visual elements and portfolio showcase section',
      bestFor: ['Designers', 'Marketing', 'Content Creators'],
      matchScore: 70
    },
    {
      id: 'executive-premium',
      name: 'Executive Premium',
      category: 'executive',
      description: 'Sophisticated template for senior leadership positions',
      atsScore: 90,
      features: ['Executive Summary', 'Leadership Focus', 'Achievement Metrics', 'Premium Design'],
      preview: 'Sophisticated layout emphasizing leadership achievements and strategic impact',
      bestFor: ['C-Level', 'VPs', 'Senior Directors'],
      matchScore: 88
    },
    {
      id: 'startup-dynamic',
      name: 'Startup Dynamic',
      category: 'technical',
      description: 'Dynamic template perfect for startup and tech company applications',
      atsScore: 93,
      features: ['Startup Friendly', 'Tech Stack Showcase', 'Growth Metrics', 'Modern Design'],
      preview: 'Dynamic design highlighting growth achievements and technical versatility',
      bestFor: ['Startup Employees', 'Growth Hackers', 'Full-Stack Developers'],
      matchScore: 89
    },
    {
      id: 'academic-research',
      name: 'Academic Research',
      category: 'professional',
      description: 'Detailed template for academic and research positions',
      atsScore: 85,
      features: ['Publications Section', 'Research Focus', 'Academic Format', 'Detailed Experience'],
      preview: 'Academic-focused layout with emphasis on research, publications, and education',
      bestFor: ['Researchers', 'Professors', 'PhD Candidates'],
      matchScore: 75
    }
  ];

  // Sort templates by match score
  const sortedTemplates = [...templates].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const generateCustomTemplate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Code className="w-4 h-4" />;
      case 'creative': return <Palette className="w-4 h-4" />;
      case 'executive': return <Briefcase className="w-4 h-4" />;
      case 'professional': return <File className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'creative': return 'bg-purple-100 text-purple-800';
      case 'executive': return 'bg-gray-100 text-gray-800';
      case 'professional': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <File className="w-5 h-5 text-indigo-600" />
          AI-Powered Resume Templates
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get personalized template recommendations optimized for your target role
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Job Match Summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
          <h3 className="font-semibold text-indigo-800 mb-2">Template Recommendations for:</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Role:</span>
              <div className="font-medium">{jobTitle}</div>
            </div>
            <div>
              <span className="text-gray-600">Experience:</span>
              <div className="font-medium">{experience}</div>
            </div>
            <div>
              <span className="text-gray-600">Industry:</span>
              <div className="font-medium">{industry}</div>
            </div>
          </div>
        </div>

        {/* Custom Template Generator */}
        <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-purple-800">AI Custom Template</h3>
              <p className="text-sm text-purple-600">Generate a personalized template based on your profile</p>
            </div>
            <Button 
              onClick={generateCustomTemplate}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 mr-2" />
                  Generate Custom
                </>
              )}
            </Button>
          </div>
          {isGenerating && (
            <div className="mt-3">
              <Progress value={66} className="h-2" />
              <p className="text-xs text-purple-600 mt-1">Analyzing your profile and job requirements...</p>
            </div>
          )}
        </div>

        {/* Template Grid */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Recommended Templates</h3>
          
          {sortedTemplates.map((template, index) => (
            <div 
              key={template.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                selectedTemplate === template.id 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${index === 0 ? 'ring-2 ring-green-200 bg-green-50' : ''}`}
            >
              {index === 0 && (
                <div className="mb-3">
                  <Badge className="bg-green-100 text-green-800">
                    <Star className="w-3 h-3 mr-1" />
                    Best Match
                  </Badge>
                </div>
              )}

              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(template.category)}
                    <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  </div>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4">
                  {template.matchScore && (
                    <Badge className="bg-blue-100 text-blue-800">
                      {template.matchScore}% match
                    </Badge>
                  )}
                  <div className="text-right">
                    <div className="text-sm font-medium">ATS Score</div>
                    <div className="text-lg font-bold text-green-600">{template.atsScore}%</div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              <p className="text-sm text-gray-500 italic mb-4">{template.preview}</p>

              {/* Best For */}
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Best For:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.bestFor.map((role) => (
                    <Badge key={role} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {selectedTemplate === template.id ? 'Selected' : 'Preview'}
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Template Customization Tips */}
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2">🎨 Template Customization Tips</h4>
          <ul className="text-sm text-indigo-700 space-y-1">
            <li>• Choose templates with higher ATS scores for better parsing</li>
            <li>• Consider your industry when selecting design elements</li>
            <li>• Customize colors and fonts to match your personal brand</li>
            <li>• Ensure all templates are tested with major ATS systems</li>
            <li>• Download in multiple formats (PDF, Word, plain text)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedResumeTemplates;
