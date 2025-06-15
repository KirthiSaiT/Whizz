
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Hash, Star, Target, Zap } from 'lucide-react';

interface KeywordWithMetrics {
  keyword: string;
  frequency: number;
  marketRelevance: number;
  trendDirection: 'rising' | 'stable' | 'declining';
  category: 'technical' | 'soft' | 'industry' | 'tool';
  importance: 'critical' | 'important' | 'nice-to-have';
}

interface EnhancedKeywordAnalysisProps {
  resumeText: string;
  jobDescription: string;
}

const EnhancedKeywordAnalysis = ({ resumeText, jobDescription }: EnhancedKeywordAnalysisProps) => {
  const analyzeKeywordsWithMetrics = (resume: string, job: string) => {
    const keywordDatabase: Record<string, Omit<KeywordWithMetrics, 'keyword' | 'frequency'>> = {
      'javascript': { marketRelevance: 95, trendDirection: 'stable', category: 'technical', importance: 'critical' },
      'typescript': { marketRelevance: 88, trendDirection: 'rising', category: 'technical', importance: 'important' },
      'react': { marketRelevance: 92, trendDirection: 'stable', category: 'technical', importance: 'critical' },
      'angular': { marketRelevance: 75, trendDirection: 'stable', category: 'technical', importance: 'important' },
      'vue': { marketRelevance: 68, trendDirection: 'rising', category: 'technical', importance: 'important' },
      'node.js': { marketRelevance: 85, trendDirection: 'stable', category: 'technical', importance: 'important' },
      'python': { marketRelevance: 94, trendDirection: 'rising', category: 'technical', importance: 'critical' },
      'aws': { marketRelevance: 90, trendDirection: 'rising', category: 'tool', importance: 'critical' },
      'azure': { marketRelevance: 82, trendDirection: 'rising', category: 'tool', importance: 'important' },
      'docker': { marketRelevance: 78, trendDirection: 'stable', category: 'tool', importance: 'important' },
      'kubernetes': { marketRelevance: 75, trendDirection: 'rising', category: 'tool', importance: 'important' },
      'machine learning': { marketRelevance: 89, trendDirection: 'rising', category: 'technical', importance: 'critical' },
      'artificial intelligence': { marketRelevance: 92, trendDirection: 'rising', category: 'technical', importance: 'critical' },
      'leadership': { marketRelevance: 85, trendDirection: 'stable', category: 'soft', importance: 'critical' },
      'project management': { marketRelevance: 82, trendDirection: 'stable', category: 'soft', importance: 'important' },
      'agile': { marketRelevance: 78, trendDirection: 'stable', category: 'industry', importance: 'important' },
      'scrum': { marketRelevance: 72, trendDirection: 'stable', category: 'industry', importance: 'important' },
      'communication': { marketRelevance: 90, trendDirection: 'stable', category: 'soft', importance: 'critical' },
      'collaboration': { marketRelevance: 85, trendDirection: 'stable', category: 'soft', importance: 'important' },
      'problem solving': { marketRelevance: 88, trendDirection: 'stable', category: 'soft', importance: 'critical' }
    };

    const extractKeywordsFromText = (text: string): string[] => {
      const normalizedText = text.toLowerCase();
      return Object.keys(keywordDatabase).filter(keyword => 
        normalizedText.includes(keyword.toLowerCase())
      );
    };

    const jobKeywords = extractKeywordsFromText(job);
    const resumeKeywords = extractKeywordsFromText(resume);

    const keywordMetrics: KeywordWithMetrics[] = jobKeywords.map(keyword => {
      const resumeCount = (resume.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
      const jobCount = (job.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
      
      return {
        keyword,
        frequency: resumeCount,
        ...keywordDatabase[keyword]
      };
    });

    const matchedKeywords = keywordMetrics.filter(k => k.frequency > 0);
    const missingKeywords = keywordMetrics.filter(k => k.frequency === 0);

    // Calculate trending keywords
    const trendingKeywords = keywordMetrics
      .filter(k => k.trendDirection === 'rising' && k.marketRelevance >= 80)
      .sort((a, b) => b.marketRelevance - a.marketRelevance);

    // Calculate keyword density score
    const totalJobKeywords = jobKeywords.length;
    const matchedCount = matchedKeywords.length;
    const keywordDensityScore = totalJobKeywords > 0 ? (matchedCount / totalJobKeywords) * 100 : 0;

    return {
      matchedKeywords,
      missingKeywords,
      trendingKeywords,
      keywordDensityScore,
      totalJobKeywords,
      marketInsights: generateMarketInsights(keywordMetrics)
    };
  };

  const generateMarketInsights = (keywords: KeywordWithMetrics[]) => {
    const highDemandSkills = keywords.filter(k => k.marketRelevance >= 85).length;
    const risingTrends = keywords.filter(k => k.trendDirection === 'rising').length;
    const criticalSkills = keywords.filter(k => k.importance === 'critical').length;

    return {
      highDemandSkills,
      risingTrends,
      criticalSkills,
      averageMarketRelevance: keywords.reduce((sum, k) => sum + k.marketRelevance, 0) / keywords.length
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'important': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'soft': return 'bg-green-100 text-green-800';
      case 'industry': return 'bg-orange-100 text-orange-800';
      case 'tool': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const analysis = analyzeKeywordsWithMetrics(resumeText, jobDescription);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-600" />
          Enhanced Keyword Analysis with Market Intelligence
        </CardTitle>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Keyword Match Density</span>
          <span className="font-bold text-lg text-blue-600">
            {Math.round(analysis.keywordDensityScore)}%
          </span>
        </div>
        <Progress value={analysis.keywordDensityScore} className="h-3" />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Market Insights Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{analysis.marketInsights.highDemandSkills}</div>
            <div className="text-xs text-blue-800">High Demand Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{analysis.marketInsights.risingTrends}</div>
            <div className="text-xs text-green-800">Rising Trends</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{analysis.marketInsights.criticalSkills}</div>
            <div className="text-xs text-red-800">Critical Skills</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(analysis.marketInsights.averageMarketRelevance)}%</div>
            <div className="text-xs text-purple-800">Avg. Market Relevance</div>
          </div>
        </div>

        {/* Matched Keywords with Metrics */}
        <div className="space-y-3">
          <h3 className="font-semibold text-green-700 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Matched Keywords ({analysis.matchedKeywords.length})
          </h3>
          <div className="space-y-3">
            {analysis.matchedKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium capitalize">{keyword.keyword}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(keyword.trendDirection)}
                    <Badge className={getImportanceColor(keyword.importance)}>
                      {keyword.importance}
                    </Badge>
                    <Badge className={getCategoryColor(keyword.category)}>
                      {keyword.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">
                    Market: {keyword.marketRelevance}%
                  </div>
                  <div className="text-sm text-gray-600">
                    Used: {keyword.frequency}x
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missing Critical Keywords */}
        <div className="space-y-3">
          <h3 className="font-semibold text-red-700 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Missing Keywords ({analysis.missingKeywords.length})
          </h3>
          <div className="space-y-3">
            {analysis.missingKeywords.slice(0, 8).map((keyword, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                <div className="flex items-center gap-3">
                  <span className="font-medium capitalize">{keyword.keyword}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(keyword.trendDirection)}
                    <Badge className={getImportanceColor(keyword.importance)}>
                      {keyword.importance}
                    </Badge>
                    <Badge className={getCategoryColor(keyword.category)}>
                      {keyword.category}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Market: {keyword.marketRelevance}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Keywords to Consider */}
        {analysis.trendingKeywords.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-purple-700 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Trending Keywords to Consider ({analysis.trendingKeywords.length})
            </h3>
            <div className="grid gap-2">
              {analysis.trendingKeywords.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                  <span className="font-medium capitalize text-purple-800">{keyword.keyword}</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-purple-700">{keyword.marketRelevance}% demand</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimization Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Keyword Optimization Strategy:
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Prioritize critical and high-demand missing keywords</li>
              <li>• Include trending keywords relevant to your experience</li>
              <li>• Use keywords naturally in context, not as lists</li>
            </ul>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Add keywords to your experience descriptions</li>
              <li>• Include relevant tools and technologies</li>
              <li>• Update skills section with market-relevant terms</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedKeywordAnalysis;
