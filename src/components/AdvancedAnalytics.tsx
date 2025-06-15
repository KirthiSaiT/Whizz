
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Clock, 
  Eye, 
  Download,
  Calendar
} from 'lucide-react';

interface AnalyticsData {
  applications: {
    total: number;
    thisWeek: number;
    responses: number;
    interviews: number;
    conversionRate: number;
  };
  performance: {
    averageScore: number;
    bestScore: number;
    improvementRate: number;
    trendsData: Array<{ week: string; score: number; applications: number }>;
  };
  jobMarket: {
    competitiveness: number;
    demandLevel: 'High' | 'Medium' | 'Low';
    averageSalary: string;
    topSkills: string[];
  };
  timeTracking: {
    timeSpent: number;
    avgPerApplication: number;
    peakHours: string[];
  };
}

interface AdvancedAnalyticsProps {
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
}

const AdvancedAnalytics = ({ overallScore, skillsScore, experienceScore }: AdvancedAnalyticsProps) => {
  // Mock analytics data - in real app this would come from API
  const analyticsData: AnalyticsData = {
    applications: {
      total: 47,
      thisWeek: 8,
      responses: 12,
      interviews: 5,
      conversionRate: 25.5
    },
    performance: {
      averageScore: overallScore,
      bestScore: Math.min(overallScore + 15, 100),
      improvementRate: 12.3,
      trendsData: [
        { week: 'Week 1', score: overallScore - 20, applications: 5 },
        { week: 'Week 2', score: overallScore - 15, applications: 8 },
        { week: 'Week 3', score: overallScore - 10, applications: 12 },
        { week: 'Week 4', score: overallScore - 5, applications: 15 },
        { week: 'Week 5', score: overallScore, applications: 7 }
      ]
    },
    jobMarket: {
      competitiveness: 73,
      demandLevel: 'High',
      averageSalary: '$95,000 - $125,000',
      topSkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Python']
    },
    timeTracking: {
      timeSpent: 24.5,
      avgPerApplication: 31,
      peakHours: ['9-11 AM', '2-4 PM', '7-9 PM']
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDemandColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{analyticsData.applications.total}</div>
            <div className="text-sm text-gray-600">Total Applications</div>
            <div className="text-xs text-green-600 mt-1">
              +{analyticsData.applications.thisWeek} this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{analyticsData.applications.responses}</div>
            <div className="text-sm text-gray-600">Responses</div>
            <div className="text-xs text-gray-500 mt-1">
              {analyticsData.applications.conversionRate}% rate
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{analyticsData.applications.interviews}</div>
            <div className="text-sm text-gray-600">Interviews</div>
            <div className="text-xs text-purple-600 mt-1">
              10.6% conversion
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${getScoreColor(analyticsData.performance.averageScore)}`}>
              {analyticsData.performance.averageScore}%
            </div>
            <div className="text-sm text-gray-600">Avg ATS Score</div>
            <div className="text-xs text-green-600 mt-1">
              +{analyticsData.performance.improvementRate}% improved
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {analyticsData.performance.trendsData.map((week, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{week.week}</span>
                    <div className="flex gap-4">
                      <span className="text-blue-600">{week.score}% ATS</span>
                      <span className="text-gray-600">{week.applications} apps</span>
                    </div>
                  </div>
                  <Progress value={week.score} className="h-2" />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="text-sm text-blue-800">
                <strong>Insight:</strong> Your ATS scores have improved by{' '}
                {analyticsData.performance.improvementRate}% over the last month.
                Best score achieved: {analyticsData.performance.bestScore}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Market Intelligence */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Job Market Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Market Demand</span>
                <Badge className={getDemandColor(analyticsData.jobMarket.demandLevel)}>
                  {analyticsData.jobMarket.demandLevel}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Competitiveness Level</span>
                  <span className="font-medium">{analyticsData.jobMarket.competitiveness}%</span>
                </div>
                <Progress value={analyticsData.jobMarket.competitiveness} className="h-2" />
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Average Salary Range</div>
                <div className="font-semibold text-green-600">
                  {analyticsData.jobMarket.averageSalary}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">Most In-Demand Skills</div>
                <div className="flex flex-wrap gap-1">
                  {analyticsData.jobMarket.topSkills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time & Productivity Analytics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            Time & Productivity Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {analyticsData.timeTracking.timeSpent}h
              </div>
              <div className="text-sm text-gray-600">Total Time This Month</div>
              <div className="text-xs text-gray-500 mt-1">
                ~{analyticsData.timeTracking.avgPerApplication} min per application
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">Peak Hours</div>
              <div className="space-y-1 mt-2">
                {analyticsData.timeTracking.peakHours.map((hour, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {hour}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">Efficiency Score</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">8.7/10</div>
              <div className="text-xs text-gray-500">Based on time vs results</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <div className="flex justify-center">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
