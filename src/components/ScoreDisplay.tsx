
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, TrendingUp, BarChart3, Info } from 'lucide-react';

interface DetailedBreakdown {
  categories: Array<{
    name: string;
    score: number;
    weight: number;
    description: string;
  }>;
  overallExplanation: string;
}

interface Explainability {
  topStrengths: string[];
  mainWeaknesses: string[];
  keyRecommendations: string[];
}

interface ScoreDisplayProps {
  overallScore: number;
  detailedBreakdown: DetailedBreakdown;
  explainability: Explainability;
}

const ScoreDisplay = ({ 
  overallScore, 
  detailedBreakdown,
  explainability 
}: ScoreDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent', variant: 'default' as const, color: 'bg-green-100 text-green-800' };
    if (score >= 60) return { text: 'Good', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', variant: 'destructive' as const, color: 'bg-red-100 text-red-800' };
  };

  const overallBadge = getScoreBadge(overallScore);

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-3">
            <Target className="w-8 h-8" />
            AI-Powered ATS Compatibility Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full border-8 border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
                <div className="text-center">
                  <div className={`text-4xl font-bold text-white`}>
                    {overallScore}%
                  </div>
                  <div className="text-white/80 text-sm">Overall Match</div>
                </div>
              </div>
            </div>
            <Badge className={`${overallBadge.color} border-0 px-4 py-1 text-sm font-medium`}>
              {overallBadge.text}
            </Badge>
            <p className="text-white/90 text-sm max-w-md mx-auto">
              {detailedBreakdown.overallExplanation}
            </p>
          </div>

          {/* Detailed Score Breakdown */}
          <div className="space-y-4 mt-8">
            {detailedBreakdown.categories.map((category, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-white/70">({category.weight}%)</span>
                  </div>
                  <span className={`font-bold text-white text-sm`}>
                    {Math.round(category.score)}%
                  </span>
                </div>
                <Progress value={category.score} className="h-2 bg-white/20 mb-2" />
                <p className="text-xs text-white/80">{category.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Explainability Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Why This Score? - AI Explainability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Top Strengths */}
            <div className="space-y-3">
              <h3 className="font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Top Strengths
              </h3>
              <ul className="space-y-2">
                {explainability.topStrengths?.map((strength, index) => (
                  <li key={index} className="text-sm text-green-800 bg-green-50 p-2 rounded border border-green-200">
                    {strength}
                  </li>
                )) || <li className="text-sm text-gray-500">Analyzing strengths...</li>}
              </ul>
            </div>

            {/* Main Weaknesses */}
            <div className="space-y-3">
              <h3 className="font-semibold text-red-700 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Areas to Improve
              </h3>
              <ul className="space-y-2">
                {explainability.mainWeaknesses?.map((weakness, index) => (
                  <li key={index} className="text-sm text-red-800 bg-red-50 p-2 rounded border border-red-200">
                    {weakness}
                  </li>
                )) || <li className="text-sm text-gray-500">Analyzing improvements...</li>}
              </ul>
            </div>

            {/* Key Recommendations */}
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Actions
              </h3>
              <ul className="space-y-2">
                {explainability.keyRecommendations?.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-800 bg-blue-50 p-2 rounded border border-blue-200">
                    {rec}
                  </li>
                )) || <li className="text-sm text-gray-500">Generating recommendations...</li>}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreDisplay;
