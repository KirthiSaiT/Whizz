
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, CheckCircle, Info } from 'lucide-react';

interface BiasDetectionProps {
  jobDescription: string;
}

interface BiasIssue {
  type: 'gender' | 'age' | 'racial' | 'disability' | 'general';
  severity: 'high' | 'medium' | 'low';
  phrase: string;
  suggestion: string;
  context: string;
}

const BiasDetection = ({ jobDescription }: BiasDetectionProps) => {
  const detectBias = (text: string): BiasIssue[] => {
    const biasPatterns = [
      // Gender bias
      {
        pattern: /\b(guys?|dudes?|bros?|brotherhood|fraternity)\b/gi,
        type: 'gender' as const,
        severity: 'medium' as const,
        suggestion: 'Use gender-neutral terms like "team members", "colleagues", or "professionals"'
      },
      {
        pattern: /\b(ninja|rockstar|guru|wizard)\b/gi,
        type: 'gender' as const,
        severity: 'low' as const,
        suggestion: 'Use professional titles like "expert", "specialist", or "professional"'
      },
      {
        pattern: /\b(aggressive|dominant|competitive)\b/gi,
        type: 'gender' as const,
        severity: 'low' as const,
        suggestion: 'Consider using "results-driven", "ambitious", or "goal-oriented"'
      },
      
      // Age bias
      {
        pattern: /\b(young|youthful|energetic|digital native)\b/gi,
        type: 'age' as const,
        severity: 'high' as const,
        suggestion: 'Focus on skills and qualifications rather than age-related characteristics'
      },
      {
        pattern: /\b(recent graduate|new grad|fresh)\b/gi,
        type: 'age' as const,
        severity: 'medium' as const,
        suggestion: 'Specify required experience level instead of graduation timing'
      },
      
      // Racial/cultural bias
      {
        pattern: /\b(native english speaker|english as first language)\b/gi,
        type: 'racial' as const,
        severity: 'high' as const,
        suggestion: 'Specify "excellent written and verbal communication skills" instead'
      },
      {
        pattern: /\b(cultural fit|culture fit)\b/gi,
        type: 'racial' as const,
        severity: 'medium' as const,
        suggestion: 'Define specific values, behaviors, or working styles you\'re looking for'
      },
      
      // Disability bias
      {
        pattern: /\b(walk|run|stand|see|hear)\b/gi,
        type: 'disability' as const,
        severity: 'medium' as const,
        suggestion: 'Only include physical requirements if essential for the role'
      },
      
      // General exclusionary language
      {
        pattern: /\b(must have|required|mandatory)\b/gi,
        type: 'general' as const,
        severity: 'low' as const,
        suggestion: 'Consider using "preferred" or "desired" for non-essential requirements'
      }
    ];

    const issues: BiasIssue[] = [];
    
    biasPatterns.forEach(pattern => {
      const matches = text.match(pattern.pattern);
      if (matches) {
        matches.forEach(match => {
          const contextStart = Math.max(0, text.toLowerCase().indexOf(match.toLowerCase()) - 20);
          const contextEnd = Math.min(text.length, text.toLowerCase().indexOf(match.toLowerCase()) + match.length + 20);
          const context = text.substring(contextStart, contextEnd);
          
          issues.push({
            type: pattern.type,
            severity: pattern.severity,
            phrase: match,
            suggestion: pattern.suggestion,
            context: context
          });
        });
      }
    });

    return issues;
  };

  const calculateFairnessScore = (issues: BiasIssue[]): number => {
    if (issues.length === 0) return 100;
    
    const severityWeights = { high: 20, medium: 10, low: 5 };
    const totalDeduction = issues.reduce((sum, issue) => {
      return sum + severityWeights[issue.severity];
    }, 0);
    
    return Math.max(0, 100 - totalDeduction);
  };

  const getInclusiveLanguageSuggestions = (): string[] => {
    return [
      "Use 'team members' instead of 'guys' or 'bros'",
      "Replace 'culture fit' with specific behavioral expectations",
      "Focus on skills rather than personal characteristics",
      "Use 'preferred' instead of 'must have' for non-essential requirements",
      "Avoid age-related terms like 'young' or 'energetic'",
      "Specify communication requirements rather than native language status"
    ];
  };

  const biasIssues = detectBias(jobDescription);
  const fairnessScore = calculateFairnessScore(biasIssues);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gender': return '⚧️';
      case 'age': return '👥';
      case 'racial': return '🌍';
      case 'disability': return '♿';
      default: return '⚖️';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Bias Detection & Fairness Analysis
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Fairness Score</span>
          <span className={`font-bold text-lg ${getScoreColor(fairnessScore)}`}>
            {fairnessScore}%
          </span>
        </div>
        <Progress value={fairnessScore} className="h-3" />
      </CardHeader>
      <CardContent className="space-y-6">
        {biasIssues.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-700">
                Potential Bias Issues Found ({biasIssues.length})
              </h3>
            </div>
            
            {biasIssues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-lg">{getTypeIcon(issue.type)}</span>
                  <Badge className={`${getSeverityColor(issue.severity)} border text-xs`}>
                    {issue.severity.toUpperCase()} RISK
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 border-gray-200 text-xs">
                    {issue.type.toUpperCase()} BIAS
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">Problematic phrase:</span> 
                    <code className="bg-red-100 text-red-800 px-1 py-0.5 rounded ml-2">
                      "{issue.phrase}"
                    </code>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Context:</span> 
                    <span className="text-gray-600 ml-2">...{issue.context}...</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Suggestion:</span> 
                    <span className="text-green-700 ml-2">{issue.suggestion}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="font-semibold text-green-700">Great Job!</h3>
            <p className="text-gray-600">No obvious bias detected in your job description.</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Inclusive Language Best Practices:
          </h4>
          <div className="grid md:grid-cols-2 gap-2">
            {getInclusiveLanguageSuggestions().map((suggestion, index) => (
              <div key={index} className="text-sm text-green-700 flex items-start gap-2">
                <span className="text-green-600">•</span>
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This analysis provides suggestions to improve inclusivity. 
            Review all recommendations in context and consult with your legal/HR team for compliance guidance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BiasDetection;
