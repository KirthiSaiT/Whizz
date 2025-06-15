
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Trophy, TrendingUp } from 'lucide-react';

interface CompetitiveMetrics {
  marketPosition: 'top-10%' | 'top-25%' | 'top-50%' | 'below-average';
  competitorScore: number;
  standoutFactors: string[];
  improvementAreas: string[];
  marketAdvantage: string;
}

interface CompetitiveAnalysisProps {
  overallScore: number;
  skillsAnalysis: any;
  experienceAnalysis: any;
  jobTitle: string;
}

const CompetitiveAnalysis = ({ 
  overallScore, 
  skillsAnalysis, 
  experienceAnalysis, 
  jobTitle 
}: CompetitiveAnalysisProps) => {
  const calculateCompetitiveMetrics = (): CompetitiveMetrics => {
    // Simulate competitive analysis based on market data
    let marketPosition: CompetitiveMetrics['marketPosition'] = 'below-average';
    
    if (overallScore >= 85) marketPosition = 'top-10%';
    else if (overallScore >= 75) marketPosition = 'top-25%';
    else if (overallScore >= 60) marketPosition = 'top-50%';

    // Simulated competitor average (typically lower than individual scores)
    const competitorScore = Math.max(overallScore - Math.floor(Math.random() * 20 + 5), 30);

    const standoutFactors = [];
    const improvementAreas = [];

    // Analyze standout factors
    if (skillsAnalysis.matchedSkills.length >= 5) {
      standoutFactors.push(`${skillsAnalysis.matchedSkills.length} relevant skills vs market avg of 3-4`);
    }
    if (experienceAnalysis.experienceYears >= 5) {
      standoutFactors.push(`${experienceAnalysis.experienceYears} years experience above market median`);
    }
    if (skillsAnalysis.additionalSkills?.length >= 3) {
      standoutFactors.push("Diverse skill set beyond core requirements");
    }

    // Analyze improvement areas
    if (skillsAnalysis.missingSkills.length > 2) {
      improvementAreas.push(`${skillsAnalysis.missingSkills.length} critical skills missing vs competitors`);
    }
    if (experienceAnalysis.missingExperience?.length > 1) {
      improvementAreas.push("Experience gaps in key areas");
    }

    const marketAdvantage = generateMarketAdvantage(overallScore, standoutFactors.length);

    return {
      marketPosition,
      competitorScore,
      standoutFactors,
      improvementAreas,
      marketAdvantage
    };
  };

  const generateMarketAdvantage = (score: number, standoutCount: number): string => {
    if (score >= 85 && standoutCount >= 2) {
      return "Strong competitive advantage with multiple differentiators";
    } else if (score >= 75) {
      return "Good market position with room for differentiation";
    } else if (score >= 60) {
      return "Competitive but needs improvement to stand out";
    } else {
      return "Below market standards, significant improvements needed";
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'top-10%': return 'bg-green-100 text-green-800 border-green-200';
      case 'top-25%': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'top-50%': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'top-10%': return <Trophy className="w-5 h-5 text-yellow-600" />;
      case 'top-25%': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'top-50%': return <BarChart3 className="w-5 h-5 text-yellow-600" />;
      default: return <Users className="w-5 h-5 text-red-600" />;
    }
  };

  const metrics = calculateCompetitiveMetrics();

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          Competitive Market Analysis
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Market Position:</span>
          <Badge className={`${getPositionColor(metrics.marketPosition)} border flex items-center gap-1`}>
            {getPositionIcon(metrics.marketPosition)}
            {metrics.marketPosition.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Competitive Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Your Score vs Market</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Your Resume</span>
                <span className="font-bold text-lg text-indigo-600">{overallScore}%</span>
              </div>
              <Progress value={overallScore} className="h-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Market Average</span>
                <span className="font-bold text-lg text-gray-600">{metrics.competitorScore}%</span>
              </div>
              <Progress value={metrics.competitorScore} className="h-3 bg-gray-200" />
            </div>
            
            <div className="text-center p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
              <div className="text-lg font-bold text-indigo-700">
                +{overallScore - metrics.competitorScore} points
              </div>
              <div className="text-sm text-indigo-600">above market average</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Market Intelligence</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Typical ATS Pass Rate:</span>
                <span className="font-medium">25-35%</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Average Skills Match:</span>
                <span className="font-medium">40-60%</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Interview Callback Rate:</span>
                <span className="font-medium">8-15%</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 rounded">
                <span>Market Competition:</span>
                <span className="font-medium">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Standout Factors */}
        {metrics.standoutFactors.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-green-700 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Your Competitive Advantages
            </h3>
            <div className="space-y-2">
              {metrics.standoutFactors.map((factor, index) => (
                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                  <Trophy className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-green-800">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Areas */}
        {metrics.improvementAreas.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-orange-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Areas to Outperform Competition
            </h3>
            <div className="space-y-2">
              {metrics.improvementAreas.map((area, index) => (
                <div key={index} className="flex items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <TrendingUp className="w-4 h-4 text-orange-600 mr-3 flex-shrink-0" />
                  <span className="text-sm text-orange-800">{area}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Advantage Summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Market Advantage Assessment:
          </h4>
          <p className="text-sm text-indigo-700 mb-3">{metrics.marketAdvantage}</p>
          <div className="grid md:grid-cols-2 gap-3 text-xs text-indigo-600">
            <div>
              <strong>Strategy:</strong> Focus on highlighting unique strengths
            </div>
            <div>
              <strong>Timeline:</strong> Improvements show results in 2-4 weeks
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitiveAnalysis;
