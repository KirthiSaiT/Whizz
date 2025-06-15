
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface OptimizationSuggestion {
  id: string;
  type: 'keyword' | 'format' | 'content' | 'structure';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'moderate' | 'hard';
  scoreImprovement: number;
}

interface RealtimeOptimizationProps {
  resumeText: string;
  jobDescription: string;
  currentScore: number;
}

const RealtimeOptimization = ({ resumeText, jobDescription, currentScore }: RealtimeOptimizationProps) => {
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [appliedSuggestions, setAppliedSuggestions] = useState<string[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [projectedScore, setProjectedScore] = useState(currentScore);

  useEffect(() => {
    if (resumeText && jobDescription) {
      generateOptimizationSuggestions();
    }
  }, [resumeText, jobDescription]);

  const generateOptimizationSuggestions = () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      const newSuggestions: OptimizationSuggestion[] = [
        {
          id: '1',
          type: 'keyword',
          title: 'Add Missing Keywords',
          description: 'Include "React", "TypeScript", and "Node.js" in your skills section',
          impact: 'high',
          effort: 'easy',
          scoreImprovement: 12
        },
        {
          id: '2',
          type: 'format',
          title: 'Improve Bullet Points',
          description: 'Use action verbs to start each bullet point (Developed, Implemented, Led)',
          impact: 'medium',
          effort: 'moderate',
          scoreImprovement: 8
        },
        {
          id: '3',
          type: 'content',
          title: 'Quantify Achievements',
          description: 'Add metrics to your accomplishments (increased efficiency by 30%)',
          impact: 'high',
          effort: 'moderate',
          scoreImprovement: 15
        },
        {
          id: '4',
          type: 'structure',
          title: 'Optimize Section Order',
          description: 'Move "Skills" section before "Education" for better ATS parsing',
          impact: 'medium',
          effort: 'easy',
          scoreImprovement: 6
        },
        {
          id: '5',
          type: 'keyword',
          title: 'Industry-Specific Terms',
          description: 'Include "Agile", "CI/CD", and "API development" based on job requirements',
          impact: 'high',
          effort: 'easy',
          scoreImprovement: 10
        }
      ];

      setSuggestions(newSuggestions);
      setIsOptimizing(false);
    }, 1500);
  };

  const applySuggestion = (suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId);
    if (suggestion) {
      setAppliedSuggestions(prev => [...prev, suggestionId]);
      setProjectedScore(prev => Math.min(prev + suggestion.scoreImprovement, 100));
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPotentialImprovement = suggestions
    .filter(s => !appliedSuggestions.includes(s.id))
    .reduce((sum, s) => sum + s.scoreImprovement, 0);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-600" />
          Real-time Resume Optimization
        </CardTitle>
        <p className="text-sm text-gray-600">
          Get instant suggestions to improve your ATS score in real-time
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Projection */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800">Score Projection</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-blue-600">{currentScore}%</span>
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">{projectedScore}%</span>
            </div>
          </div>
          <Progress value={projectedScore} className="h-3" />
          <p className="text-xs text-gray-600 mt-2">
            Potential improvement: +{totalPotentialImprovement} points available
          </p>
        </div>

        {/* Loading State */}
        {isOptimizing && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
            <p className="text-gray-600">Analyzing your resume for optimization opportunities...</p>
          </div>
        )}

        {/* Optimization Suggestions */}
        {!isOptimizing && suggestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Optimization Suggestions</h3>
            {suggestions.map((suggestion) => {
              const isApplied = appliedSuggestions.includes(suggestion.id);
              
              return (
                <div 
                  key={suggestion.id}
                  className={`border rounded-lg p-4 ${isApplied ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      {isApplied ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                      )}
                      <h4 className="font-medium text-gray-800">{suggestion.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(suggestion.impact)}>
                        {suggestion.impact} impact
                      </Badge>
                      <Badge className={getEffortColor(suggestion.effort)}>
                        {suggestion.effort}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">
                      +{suggestion.scoreImprovement} points
                    </span>
                    
                    {!isApplied ? (
                      <Button
                        size="sm"
                        onClick={() => applySuggestion(suggestion.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Apply Fix
                      </Button>
                    ) : (
                      <Badge className="bg-green-100 text-green-800">
                        Applied ✓
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start">
              <Clock className="w-4 h-4 mr-2" />
              Auto-optimize
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Compare versions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeOptimization;
