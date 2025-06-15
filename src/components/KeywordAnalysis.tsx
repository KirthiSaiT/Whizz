
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Hash } from 'lucide-react';

interface KeywordAnalysisProps {
  matchedKeywords: string[];
  missingKeywords: string[];
}

const KeywordAnalysis = ({ matchedKeywords, missingKeywords }: KeywordAnalysisProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-blue-600" />
          Keyword Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Matched Keywords */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-700">
              Matched Keywords ({matchedKeywords.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.length > 0 ? (
              matchedKeywords.map((keyword, index) => (
                <Badge
                  key={index}
                  className="bg-green-100 text-green-800 border border-green-200 hover:bg-green-200"
                >
                  {keyword}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No keywords matched yet</p>
            )}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-700">
              Missing Keywords ({missingKeywords.length})
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {missingKeywords.length > 0 ? (
              missingKeywords.map((keyword, index) => (
                <Badge
                  key={index}
                  className="bg-red-100 text-red-800 border border-red-200 hover:bg-red-200"
                >
                  {keyword}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 text-sm">All important keywords are present!</p>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Try to naturally incorporate the missing keywords into your resume. 
            Focus on the most relevant ones that match your actual skills and experience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeywordAnalysis;
