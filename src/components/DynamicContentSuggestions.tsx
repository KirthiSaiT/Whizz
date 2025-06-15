
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Copy, RefreshCw, Star, Wand2 } from 'lucide-react';

interface ContentSuggestion {
  id: string;
  type: 'summary' | 'bullet' | 'skill' | 'achievement';
  category: string;
  original?: string;
  suggestion: string;
  reasoning: string;
  impact: 'high' | 'medium' | 'low';
}

interface DynamicContentSuggestionsProps {
  resumeText: string;
  jobDescription: string;
}

const DynamicContentSuggestions = ({ resumeText, jobDescription }: DynamicContentSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (resumeText && jobDescription) {
      generateContentSuggestions();
    }
  }, [resumeText, jobDescription]);

  const generateContentSuggestions = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const newSuggestions: ContentSuggestion[] = [
        {
          id: '1',
          type: 'summary',
          category: 'Professional Summary',
          suggestion: 'Results-driven Full Stack Developer with 5+ years of experience building scalable web applications using React, Node.js, and cloud technologies. Proven track record of delivering high-quality software solutions that improve user experience and drive business growth.',
          reasoning: 'Added quantifiable experience, specific technologies from job description, and business impact focus',
          impact: 'high'
        },
        {
          id: '2',
          type: 'bullet',
          category: 'Work Experience',
          original: 'Worked on web applications',
          suggestion: 'Developed and maintained 15+ responsive web applications using React and TypeScript, serving 10,000+ daily active users',
          reasoning: 'Added specific numbers, technologies, and user impact metrics',
          impact: 'high'
        },
        {
          id: '3',
          type: 'achievement',
          category: 'Achievements',
          suggestion: 'Optimized database queries and API performance, reducing page load times by 40% and improving user satisfaction scores by 25%',
          reasoning: 'Quantified technical improvements with business impact metrics',
          impact: 'high'
        },
        {
          id: '4',
          type: 'bullet',
          category: 'Work Experience',
          original: 'Led team projects',
          suggestion: 'Led cross-functional team of 6 developers and designers to deliver 3 major product features ahead of schedule, resulting in 20% increase in user engagement',
          reasoning: 'Specified team size, deliverables, timeline success, and measurable outcomes',
          impact: 'medium'
        },
        {
          id: '5',
          type: 'skill',
          category: 'Technical Skills',
          suggestion: 'Frontend: React, TypeScript, Next.js, Tailwind CSS | Backend: Node.js, Express, PostgreSQL, MongoDB | Cloud: AWS, Docker, CI/CD',
          reasoning: 'Organized skills by category matching job requirements and industry standards',
          impact: 'medium'
        }
      ];

      setSuggestions(newSuggestions);
      setIsGenerating(false);
    }, 2000);
  };

  const categories = ['all', 'Professional Summary', 'Work Experience', 'Achievements', 'Technical Skills'];
  
  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'summary': return <Star className="w-4 h-4" />;
      case 'bullet': return <Lightbulb className="w-4 h-4" />;
      case 'skill': return <Wand2 className="w-4 h-4" />;
      case 'achievement': return <Star className="w-4 h-4" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-orange-600" />
          AI-Powered Content Suggestions
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get intelligent content recommendations tailored to your target job
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <Button 
            onClick={generateContentSuggestions}
            disabled={isGenerating}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Suggestions...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New Suggestions
              </>
            )}
          </Button>
        </div>

        {/* Content Suggestions */}
        {!isGenerating && filteredSuggestions.length > 0 && (
          <div className="space-y-4">
            {filteredSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border rounded-lg p-4 bg-white">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(suggestion.type)}
                    <span className="font-medium text-gray-800">{suggestion.category}</span>
                  </div>
                  <Badge className={getImpactColor(suggestion.impact)}>
                    {suggestion.impact} impact
                  </Badge>
                </div>

                {/* Original Content (if exists) */}
                {suggestion.original && (
                  <div className="mb-3">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Original
                    </label>
                    <div className="bg-red-50 p-3 rounded border border-red-200 text-sm text-gray-700">
                      {suggestion.original}
                    </div>
                  </div>
                )}

                {/* Suggested Content */}
                <div className="mb-3">
                  <label className="text-xs font-medium text-green-600 uppercase tracking-wide">
                    Suggested Improvement
                  </label>
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <Textarea
                      value={suggestion.suggestion}
                      readOnly
                      className="min-h-[80px] bg-transparent border-0 p-0 text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Reasoning */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    Why This Works
                  </label>
                  <p className="text-sm text-blue-800 bg-blue-50 p-2 rounded border border-blue-200">
                    {suggestion.reasoning}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(suggestion.suggestion)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="outline">
                    Use This
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">💡 Pro Tips</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Customize suggestions to match your specific experience</li>
            <li>• Use action verbs to start bullet points (Developed, Led, Implemented)</li>
            <li>• Include quantifiable results whenever possible</li>
            <li>• Tailor content to match the job description keywords</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DynamicContentSuggestions;
