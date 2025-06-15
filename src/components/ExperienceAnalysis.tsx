
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Briefcase, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ExperienceAnalysis {
  score: number;
  experienceYears: number;
  requiredYears: number;
  matchedExperience: string[];
  missingExperience: string[];
  explanation: string;
}

interface ExperienceAnalysisProps {
  experienceAnalysis: ExperienceAnalysis;
}

const ExperienceAnalysis = ({ experienceAnalysis }: ExperienceAnalysisProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getYearsColor = (current: number, required: number) => {
    if (current >= required) return 'text-green-600';
    if (current >= required * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-purple-600" />
          Experience Analysis
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Experience Match Score</span>
          <span className={`font-bold text-lg ${getScoreColor(experienceAnalysis.score)}`}>
            {Math.round(experienceAnalysis.score)}%
          </span>
        </div>
        <Progress 
          value={experienceAnalysis.score} 
          className="h-3"
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Years of Experience */}
        <div className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Experience Duration</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${getYearsColor(experienceAnalysis.experienceYears, experienceAnalysis.requiredYears)}`}>
                {experienceAnalysis.experienceYears}
              </div>
              <div className="text-sm text-gray-600">Your Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-700">
                {experienceAnalysis.requiredYears || 'N/A'}
              </div>
              <div className="text-sm text-gray-600">Required</div>
            </div>
          </div>
          {experienceAnalysis.requiredYears > 0 && (
            <div className="mt-3">
              <Progress 
                value={Math.min((experienceAnalysis.experienceYears / experienceAnalysis.requiredYears) * 100, 100)} 
                className="h-2"
              />
            </div>
          )}
        </div>

        {/* Experience Types */}
        <div className="space-y-4">
          {/* Matched Experience */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-700">
                Relevant Experience Types ({experienceAnalysis.matchedExperience.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {experienceAnalysis.matchedExperience.length > 0 ? (
                experienceAnalysis.matchedExperience.map((exp, index) => (
                  <Badge
                    key={index}
                    className="bg-green-100 text-green-800 border border-green-200 hover:bg-green-200"
                  >
                    {exp}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No specific experience types identified</p>
              )}
            </div>
          </div>

          {/* Missing Experience */}
          {experienceAnalysis.missingExperience.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-orange-700">
                  Preferred Experience Areas ({experienceAnalysis.missingExperience.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {experienceAnalysis.missingExperience.map((exp, index) => (
                  <Badge
                    key={index}
                    className="bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200"
                  >
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">{experienceAnalysis.explanation}</p>
        </div>

        {/* Actionable Tips */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-900 mb-2">🚀 Experience Enhancement Tips:</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Emphasize quantifiable achievements in your experience</li>
            <li>• Use action verbs to describe your responsibilities</li>
            <li>• Include relevant projects that demonstrate required skills</li>
            {experienceAnalysis.experienceYears < experienceAnalysis.requiredYears && (
              <li>• Highlight transferable skills from related experience</li>
            )}
            {experienceAnalysis.missingExperience.length > 0 && (
              <li>• Consider emphasizing experience with {experienceAnalysis.missingExperience[0]}</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceAnalysis;
