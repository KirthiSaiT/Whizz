
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Building2, DollarSign, MapPin, Briefcase } from 'lucide-react';

interface IndustryData {
  industry: string;
  averageScore: number;
  topSkills: string[];
  salaryRange: { min: number; max: number };
  demandLevel: 'high' | 'medium' | 'low';
  growthTrend: 'growing' | 'stable' | 'declining';
  locations: string[];
  companiesHiring: string[];
}

interface IndustryBenchmarkingProps {
  jobTitle: string;
  overallScore: number;
  skillsAnalysis: any;
}

const IndustryBenchmarking = ({ jobTitle, overallScore, skillsAnalysis }: IndustryBenchmarkingProps) => {
  const getIndustryData = (title: string): IndustryData => {
    const industryMap: Record<string, IndustryData> = {
      'software developer': {
        industry: 'Technology',
        averageScore: 72,
        topSkills: ['JavaScript', 'React', 'Python', 'AWS', 'Docker'],
        salaryRange: { min: 70000, max: 150000 },
        demandLevel: 'high',
        growthTrend: 'growing',
        locations: ['San Francisco', 'Seattle', 'Austin', 'New York'],
        companiesHiring: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple']
      },
      'data scientist': {
        industry: 'Technology/Analytics',
        averageScore: 75,
        topSkills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Statistics'],
        salaryRange: { min: 80000, max: 180000 },
        demandLevel: 'high',
        growthTrend: 'growing',
        locations: ['San Francisco', 'Boston', 'Seattle', 'Austin'],
        companiesHiring: ['Netflix', 'Uber', 'Airbnb', 'Google', 'Facebook']
      },
      'product manager': {
        industry: 'Technology/Business',
        averageScore: 68,
        topSkills: ['Product Strategy', 'Agile', 'Analytics', 'Leadership', 'Communication'],
        salaryRange: { min: 90000, max: 200000 },
        demandLevel: 'medium',
        growthTrend: 'stable',
        locations: ['San Francisco', 'Seattle', 'Austin', 'Boston'],
        companiesHiring: ['Google', 'Amazon', 'Microsoft', 'Slack', 'Spotify']
      },
      'marketing manager': {
        industry: 'Marketing/Business',
        averageScore: 65,
        topSkills: ['Digital Marketing', 'Analytics', 'Content Strategy', 'SEO', 'Leadership'],
        salaryRange: { min: 60000, max: 120000 },
        demandLevel: 'medium',
        growthTrend: 'stable',
        locations: ['New York', 'Los Angeles', 'Chicago', 'Austin'],
        companiesHiring: ['HubSpot', 'Salesforce', 'Adobe', 'Nike', 'Coca-Cola']
      }
    };

    // Default fallback
    const defaultData: IndustryData = {
      industry: 'General',
      averageScore: 65,
      topSkills: ['Communication', 'Leadership', 'Problem Solving', 'Teamwork'],
      salaryRange: { min: 50000, max: 100000 },
      demandLevel: 'medium',
      growthTrend: 'stable',
      locations: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
      companiesHiring: ['Various Companies']
    };

    return industryMap[title.toLowerCase()] || defaultData;
  };

  const industryData = getIndustryData(jobTitle);

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'growing': return 'bg-green-100 text-green-800 border-green-200';
      case 'stable': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'declining': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const matchedIndustrySkills = industryData.topSkills.filter(skill =>
    skillsAnalysis.matchedSkills.some((matched: string) =>
      matched.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(matched.toLowerCase())
    )
  );

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-teal-600" />
          Industry Benchmarking & Market Intelligence
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Industry:</span>
          <Badge className="bg-teal-100 text-teal-800 border-teal-200">
            {industryData.industry}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Industry Score Comparison</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Your Score</span>
                <span className="font-bold text-lg text-teal-600">{overallScore}%</span>
              </div>
              <Progress value={overallScore} className="h-3" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Industry Average</span>
                <span className="font-bold text-lg text-gray-600">{industryData.averageScore}%</span>
              </div>
              <Progress value={industryData.averageScore} className="h-3 bg-gray-200" />
            </div>
            
            <div className="text-center p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
              <div className="text-lg font-bold text-teal-700">
                {overallScore >= industryData.averageScore ? '+' : ''}{overallScore - industryData.averageScore} points
              </div>
              <div className="text-sm text-teal-600">
                {overallScore >= industryData.averageScore ? 'above' : 'below'} industry average
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Market Overview</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Job Demand:</span>
                <Badge className={`${getDemandColor(industryData.demandLevel)} border text-xs`}>
                  {industryData.demandLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Growth Trend:</span>
                <Badge className={`${getTrendColor(industryData.growthTrend)} border text-xs`}>
                  {industryData.growthTrend.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Salary Range:</span>
                <span className="text-sm font-medium">
                  {formatSalary(industryData.salaryRange.min)} - {formatSalary(industryData.salaryRange.max)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Industry Skills */}
        <div className="space-y-3">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Top Industry Skills ({industryData.industry})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {industryData.topSkills.map((skill, index) => {
              const isMatched = matchedIndustrySkills.includes(skill);
              return (
                <div
                  key={index}
                  className={`p-2 rounded text-center text-sm font-medium ${
                    isMatched
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {skill}
                  {isMatched && <span className="ml-1">✓</span>}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-600">
            You have {matchedIndustrySkills.length} of {industryData.topSkills.length} top industry skills
          </p>
        </div>

        {/* Top Locations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-semibold text-purple-700 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Top Hiring Locations
            </h3>
            <div className="space-y-2">
              {industryData.locations.map((location, index) => (
                <div key={index} className="flex items-center p-2 bg-purple-50 rounded border border-purple-200">
                  <MapPin className="w-4 h-4 text-purple-600 mr-2" />
                  <span className="text-sm text-purple-800">{location}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-orange-700 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Companies Actively Hiring
            </h3>
            <div className="space-y-2">
              {industryData.companiesHiring.slice(0, 5).map((company, index) => (
                <div key={index} className="flex items-center p-2 bg-orange-50 rounded border border-orange-200">
                  <Building2 className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm text-orange-800">{company}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry Insights */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg border border-teal-200">
          <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Industry Intelligence:
          </h4>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-teal-700">
            <div>
              <strong>Market Status:</strong> {industryData.demandLevel} demand, {industryData.growthTrend} trend
            </div>
            <div>
              <strong>Skill Priority:</strong> Focus on {industryData.topSkills.slice(0, 2).join(' and ')}
            </div>
            <div>
              <strong>Salary Potential:</strong> {formatSalary(industryData.salaryRange.max)} for top performers
            </div>
            <div>
              <strong>Competition:</strong> {overallScore >= industryData.averageScore ? 'Above average' : 'Improve to compete'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndustryBenchmarking;
