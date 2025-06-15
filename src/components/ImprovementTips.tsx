
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, AlertTriangle, Info, CheckCircle, Zap } from 'lucide-react';

interface Improvement {
  category: string;
  tip: string;
  priority: 'high' | 'medium' | 'low';
  impact?: string;
}

interface ImprovementTipsProps {
  improvements: Improvement[];
}

const ImprovementTips = ({ improvements }: ImprovementTipsProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <Info className="w-4 h-4 text-yellow-600" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          AI-Powered Improvement Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {improvements.length > 0 ? (
          improvements.map((improvement, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getPriorityIcon(improvement.priority)}
                </div>
                <div className="flex-grow space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900">
                      {improvement.category}
                    </h3>
                    <Badge
                      className={`text-xs ${getPriorityColor(improvement.priority)} border`}
                    >
                      {improvement.priority.toUpperCase()}
                    </Badge>
                    {improvement.impact && (
                      <Badge
                        className="text-xs bg-purple-100 text-purple-800 border-purple-200"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {improvement.impact}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {improvement.tip}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
            <h3 className="font-semibold text-green-700">Excellent Work!</h3>
            <p className="text-gray-600">
              Your resume shows strong alignment with this job opportunity. Consider fine-tuning based on the detailed analysis above.
            </p>
          </div>
        )}

        {/* Enhanced General Tips */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 mt-6">
          <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Advanced ATS Optimization Tips:
          </h4>
          <div className="grid md:grid-cols-2 gap-3">
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Use industry-specific keywords naturally</li>
              <li>• Quantify achievements with metrics</li>
              <li>• Match job title keywords in your experience</li>
              <li>• Include relevant certifications and tools</li>
            </ul>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Use standard section headings</li>
              <li>• Avoid images, tables, and graphics</li>
              <li>• Save as .docx or simple .pdf format</li>
              <li>• Test with different ATS systems</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementTips;
