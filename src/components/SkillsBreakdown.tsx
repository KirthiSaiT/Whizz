
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Plus, Code } from 'lucide-react';

interface SkillsAnalysis {
  score: number;
  requiredSkills: string[];
  matchedSkills: string[];
  missingSkills: string[];
  additionalSkills: string[];
  explanation: string;
}

interface SkillsBreakdownProps {
  skillsAnalysis: SkillsAnalysis;
}

const SkillsBreakdown = ({ skillsAnalysis }: SkillsBreakdownProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-600" />
          Skills Analysis
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Skills Match Score</span>
          <span className={`font-bold text-lg ${getScoreColor(skillsAnalysis.score)}`}>
            {Math.round(skillsAnalysis.score)}%
          </span>
        </div>
        <Progress 
          value={skillsAnalysis.score} 
          className="h-3"
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Explanation */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">{skillsAnalysis.explanation}</p>
        </div>

        {/* Matched Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-700">
              Matched Skills ({skillsAnalysis.matchedSkills.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsAnalysis.matchedSkills.length > 0 ? (
              skillsAnalysis.matchedSkills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-green-100 text-green-800 border border-green-200 hover:bg-green-200"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No skills matched yet</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-700">
              Missing Required Skills ({skillsAnalysis.missingSkills.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsAnalysis.missingSkills.length > 0 ? (
              skillsAnalysis.missingSkills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">All required skills are present!</p>
            )}
          </div>
        </div>

        {/* Additional Skills */}
        {skillsAnalysis.additionalSkills.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-700">
                Additional Skills ({skillsAnalysis.additionalSkills.length})
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsAnalysis.additionalSkills.slice(0, 8).map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actionable Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-2">💡 Quick Improvement Tips:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Add missing skills naturally in your experience descriptions</li>
            <li>• Include specific tools and technologies you've used</li>
            <li>• Quantify your skill proficiency where possible</li>
            {skillsAnalysis.missingSkills.length > 0 && (
              <li>• Consider learning: {skillsAnalysis.missingSkills.slice(0, 2).join(', ')}</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsBreakdown;
