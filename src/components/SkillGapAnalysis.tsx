
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookOpen, Award, TrendingUp } from 'lucide-react';

interface LearningResource {
  title: string;
  provider: string;
  type: 'course' | 'certification' | 'tutorial';
  url: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface SkillGap {
  skill: string;
  importance: 'high' | 'medium' | 'low';
  marketDemand: number;
  resources: LearningResource[];
}

interface SkillGapAnalysisProps {
  missingSkills: string[];
  jobTitle: string;
}

const SkillGapAnalysis = ({ missingSkills, jobTitle }: SkillGapAnalysisProps) => {
  const generateLearningResources = (skill: string): LearningResource[] => {
    const resourceMap: Record<string, LearningResource[]> = {
      'javascript': [
        {
          title: 'JavaScript: The Complete Guide',
          provider: 'Udemy',
          type: 'course',
          url: 'https://udemy.com/course/javascript-the-complete-guide',
          estimatedTime: '40 hours',
          difficulty: 'beginner'
        },
        {
          title: 'JavaScript Developer Certificate',
          provider: 'freeCodeCamp',
          type: 'certification',
          url: 'https://freecodecamp.org/learn/javascript-algorithms-and-data-structures',
          estimatedTime: '300 hours',
          difficulty: 'intermediate'
        }
      ],
      'react': [
        {
          title: 'React - The Complete Guide',
          provider: 'Udemy',
          type: 'course',
          url: 'https://udemy.com/course/react-the-complete-guide-incl-redux',
          estimatedTime: '48 hours',
          difficulty: 'intermediate'
        },
        {
          title: 'React Developer Learning Path',
          provider: 'LinkedIn Learning',
          type: 'course',
          url: 'https://linkedin.com/learning/paths/become-a-react-developer',
          estimatedTime: '25 hours',
          difficulty: 'beginner'
        }
      ],
      'python': [
        {
          title: 'Python for Everybody Specialization',
          provider: 'Coursera',
          type: 'course',
          url: 'https://coursera.org/specializations/python',
          estimatedTime: '32 hours',
          difficulty: 'beginner'
        },
        {
          title: 'Python Institute Certification',
          provider: 'Python Institute',
          type: 'certification',
          url: 'https://pythoninstitute.org/certification',
          estimatedTime: '120 hours',
          difficulty: 'intermediate'
        }
      ],
      'leadership': [
        {
          title: 'Leadership Principles',
          provider: 'LinkedIn Learning',
          type: 'course',
          url: 'https://linkedin.com/learning/leadership-principles',
          estimatedTime: '2 hours',
          difficulty: 'beginner'
        }
      ],
      'project management': [
        {
          title: 'Project Management Professional (PMP)',
          provider: 'PMI',
          type: 'certification',
          url: 'https://pmi.org/certifications/project-management-pmp',
          estimatedTime: '200 hours',
          difficulty: 'advanced'
        }
      ]
    };

    return resourceMap[skill.toLowerCase()] || [
      {
        title: `${skill} Fundamentals`,
        provider: 'Coursera',
        type: 'course',
        url: `https://coursera.org/search?query=${encodeURIComponent(skill)}`,
        estimatedTime: '20 hours',
        difficulty: 'beginner'
      }
    ];
  };

  const getMarketDemand = (skill: string): number => {
    const demandMap: Record<string, number> = {
      'javascript': 95,
      'react': 88,
      'python': 92,
      'typescript': 85,
      'node.js': 82,
      'aws': 90,
      'leadership': 75,
      'project management': 80,
      'machine learning': 85,
      'docker': 78
    };
    return demandMap[skill.toLowerCase()] || 60;
  };

  const getSkillImportance = (skill: string): 'high' | 'medium' | 'low' => {
    const marketDemand = getMarketDemand(skill);
    if (marketDemand >= 85) return 'high';
    if (marketDemand >= 70) return 'medium';
    return 'low';
  };

  const skillGaps: SkillGap[] = missingSkills.map(skill => ({
    skill,
    importance: getSkillImportance(skill),
    marketDemand: getMarketDemand(skill),
    resources: generateLearningResources(skill)
  }));

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'certification': return <Award className="w-4 h-4" />;
      case 'tutorial': return <ExternalLink className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Skill Gap Analysis & Learning Pathways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillGaps.length > 0 ? (
          skillGaps.slice(0, 5).map((gap, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg capitalize">{gap.skill}</h3>
                  <Badge className={`${getImportanceColor(gap.importance)} border`}>
                    {gap.importance.toUpperCase()} PRIORITY
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>{gap.marketDemand}% market demand</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Recommended Learning Resources:</h4>
                <div className="grid gap-3">
                  {gap.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(resource.type)}
                        <div>
                          <div className="font-medium text-sm">{resource.title}</div>
                          <div className="text-xs text-gray-600">
                            {resource.provider} • {resource.estimatedTime} • {resource.difficulty}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-700">No Skill Gaps Detected</h3>
            <p className="text-gray-600">Your skills align well with this position!</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Career Development Tips:
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Focus on high-priority skills first for maximum impact</li>
            <li>• Consider certifications for skills with high market demand</li>
            <li>• Build a portfolio project demonstrating your new skills</li>
            <li>• Network with professionals who have these skills</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;
