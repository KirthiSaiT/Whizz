
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { TestTube, TrendingUp, Users, Target, BarChart3, Eye } from 'lucide-react';

interface ResumeVariant {
  id: string;
  name: string;
  content: string;
  score: number;
  applications: number;
  interviews: number;
  responses: number;
  conversionRate: number;
}

interface ABTestingProps {
  resumeText: string;
  jobDescription: string;
}

const ResumeABTesting = ({ resumeText, jobDescription }: ABTestingProps) => {
  const [variants, setVariants] = useState<ResumeVariant[]>([
    {
      id: 'original',
      name: 'Original Resume',
      content: resumeText,
      score: 0,
      applications: 0,
      interviews: 0,
      responses: 0,
      conversionRate: 0
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const generateVariants = async () => {
    setIsGenerating(true);
    
    // Simulate AI-generated variants
    setTimeout(() => {
      const newVariants: ResumeVariant[] = [
        {
          id: 'keyword-optimized',
          name: 'Keyword Optimized',
          content: resumeText + '\n\n[AI-Enhanced with additional keywords and industry terms]',
          score: Math.round(Math.random() * 20 + 75),
          applications: Math.round(Math.random() * 50 + 25),
          interviews: Math.round(Math.random() * 15 + 5),
          responses: Math.round(Math.random() * 30 + 15),
          conversionRate: 0
        },
        {
          id: 'format-enhanced',
          name: 'Format Enhanced',
          content: resumeText + '\n\n[AI-Enhanced with improved formatting and structure]',
          score: Math.round(Math.random() * 15 + 70),
          applications: Math.round(Math.random() * 45 + 20),
          interviews: Math.round(Math.random() * 12 + 3),
          responses: Math.round(Math.random() * 25 + 10),
          conversionRate: 0
        },
        {
          id: 'experience-focused',
          name: 'Experience Focused',
          content: resumeText + '\n\n[AI-Enhanced with emphasized experience and achievements]',
          score: Math.round(Math.random() * 18 + 72),
          applications: Math.round(Math.random() * 40 + 30),
          interviews: Math.round(Math.random() * 18 + 8),
          responses: Math.round(Math.random() * 35 + 20),
          conversionRate: 0
        }
      ];

      // Calculate conversion rates
      newVariants.forEach(variant => {
        variant.conversionRate = variant.applications > 0 
          ? Math.round((variant.interviews / variant.applications) * 100)
          : 0;
      });

      setVariants(prev => [...prev, ...newVariants]);
      setIsGenerating(false);
    }, 2000);
  };

  const startABTest = (variantId: string) => {
    setActiveTest(variantId);
  };

  const getBestPerformer = () => {
    return variants.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    );
  };

  const bestPerformer = variants.length > 1 ? getBestPerformer() : null;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="w-5 h-5 text-blue-600" />
          Resume A/B Testing Lab
        </CardTitle>
        <p className="text-sm text-gray-600">
          Generate and test different resume variations to optimize your application success rate
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generate Variants Button */}
        {variants.length === 1 && (
          <div className="text-center">
            <Button 
              onClick={generateVariants}
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating AI Variants...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Generate Resume Variants
                </>
              )}
            </Button>
          </div>
        )}

        {/* Best Performer Highlight */}
        {bestPerformer && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800">Best Performer</span>
            </div>
            <div className="text-sm text-green-700">
              <strong>{bestPerformer.name}</strong> - {bestPerformer.conversionRate}% conversion rate
            </div>
          </div>
        )}

        {/* Variants Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {variants.map((variant) => (
            <div key={variant.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{variant.name}</h3>
                {variant.id === bestPerformer?.id && (
                  <Badge className="bg-green-100 text-green-800">Best</Badge>
                )}
                {activeTest === variant.id && (
                  <Badge className="bg-blue-100 text-blue-800">Testing</Badge>
                )}
              </div>

              {/* Performance Metrics */}
              {variant.applications > 0 && (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{variant.applications}</div>
                    <div className="text-gray-600">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{variant.interviews}</div>
                    <div className="text-gray-600">Interviews</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{variant.responses}</div>
                    <div className="text-gray-600">Responses</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">{variant.conversionRate}%</div>
                    <div className="text-gray-600">Conversion</div>
                  </div>
                </div>
              )}

              {/* ATS Score */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ATS Score</span>
                  <span className="font-medium">{variant.score || 'Calculating...'}%</span>
                </div>
                {variant.score > 0 && (
                  <Progress value={variant.score} className="h-2" />
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => startABTest(variant.id)}
                  disabled={activeTest === variant.id}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  {activeTest === variant.id ? 'Testing' : 'Test'}
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Testing Instructions */}
        {variants.length > 1 && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">How to Run A/B Tests:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use different variants for similar job applications</li>
              <li>• Track responses and interview requests for each variant</li>
              <li>• Focus on the variant with the highest conversion rate</li>
              <li>• Test for at least 10-20 applications per variant for reliable data</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeABTesting;
