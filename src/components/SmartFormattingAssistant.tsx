
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { FileText, CheckCircle, AlertTriangle, Settings, Palette } from 'lucide-react';

interface FormatIssue {
  id: string;
  type: 'critical' | 'warning' | 'suggestion';
  category: string;
  issue: string;
  solution: string;
  isFixed: boolean;
}

interface SmartFormattingAssistantProps {
  resumeText: string;
}

const SmartFormattingAssistant = ({ resumeText }: SmartFormattingAssistantProps) => {
  const [formatIssues, setFormatIssues] = useState<FormatIssue[]>([
    {
      id: '1',
      type: 'critical',
      category: 'Contact Information',
      issue: 'Missing professional email address',
      solution: 'Add a professional email address (avoid nicknames or numbers)',
      isFixed: false
    },
    {
      id: '2',
      type: 'warning',
      category: 'Bullet Points',
      issue: 'Inconsistent bullet point formatting',
      solution: 'Use consistent bullet symbols (• or -) throughout the resume',
      isFixed: false
    },
    {
      id: '3',
      type: 'suggestion',
      category: 'White Space',
      issue: 'Sections could benefit from better spacing',
      solution: 'Add consistent spacing between sections for better readability',
      isFixed: false
    },
    {
      id: '4',
      type: 'warning',
      category: 'Font Consistency',
      issue: 'Multiple font styles detected',
      solution: 'Use consistent font family and sizing throughout',
      isFixed: false
    },
    {
      id: '5',
      type: 'critical',
      category: 'ATS Compatibility',
      issue: 'Complex formatting may not parse correctly',
      solution: 'Simplify formatting to ensure ATS can read all content',
      isFixed: false
    }
  ]);

  const [autoFormatSettings, setAutoFormatSettings] = useState({
    standardizeBullets: true,
    fixSpacing: true,
    optimizeForATS: true,
    consistentFonts: true,
    removeExtraSpaces: true
  });

  const fixIssue = (issueId: string) => {
    setFormatIssues(prev => 
      prev.map(issue => 
        issue.id === issueId ? { ...issue, isFixed: true } : issue
      )
    );
  };

  const fixAllIssues = () => {
    setFormatIssues(prev => 
      prev.map(issue => ({ ...issue, isFixed: true }))
    );
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'suggestion': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'suggestion': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const totalIssues = formatIssues.length;
  const fixedIssues = formatIssues.filter(issue => issue.isFixed).length;
  const formatScore = Math.round((fixedIssues / totalIssues) * 100);

  const criticalIssues = formatIssues.filter(issue => issue.type === 'critical' && !issue.isFixed);
  const warningIssues = formatIssues.filter(issue => issue.type === 'warning' && !issue.isFixed);
  const suggestionIssues = formatIssues.filter(issue => issue.type === 'suggestion' && !issue.isFixed);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600" />
          Smart Formatting Assistant
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ensure your resume formatting is ATS-friendly and professionally polished
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Score */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-gray-800">Format Quality Score</span>
            <span className="text-2xl font-bold text-purple-600">{formatScore}%</span>
          </div>
          <Progress value={formatScore} className="h-3 mb-3" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-red-600">{criticalIssues.length}</div>
              <div className="text-gray-600">Critical</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600">{warningIssues.length}</div>
              <div className="text-gray-600">Warnings</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">{suggestionIssues.length}</div>
              <div className="text-gray-600">Suggestions</div>
            </div>
          </div>
        </div>

        {/* Auto-Format Settings */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Auto-Format Settings</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(autoFormatSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) => 
                    setAutoFormatSettings(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
          <Button 
            onClick={fixAllIssues}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Apply Auto-Format
          </Button>
        </div>

        {/* Format Issues */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">Format Issues</h3>
            <Badge variant="secondary">
              {fixedIssues}/{totalIssues} Fixed
            </Badge>
          </div>

          {formatIssues.map((issue) => (
            <div 
              key={issue.id}
              className={`border rounded-lg p-4 ${getIssueColor(issue.type)} ${
                issue.isFixed ? 'opacity-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getIssueIcon(issue.type)}
                  <span className="font-medium text-gray-800">{issue.category}</span>
                  {issue.isFixed && (
                    <Badge className="bg-green-100 text-green-800 ml-2">Fixed</Badge>
                  )}
                </div>
                <Badge variant="outline" className="capitalize">
                  {issue.type}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Issue:</span> {issue.issue}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Solution:</span> {issue.solution}
                </p>
              </div>

              {!issue.isFixed && (
                <Button
                  size="sm"
                  onClick={() => fixIssue(issue.id)}
                  variant="outline"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Fix This Issue
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Formatting Tips */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">📋 Formatting Best Practices</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Use standard fonts (Arial, Calibri, or Times New Roman)</li>
            <li>• Keep font size between 10-12pt for body text</li>
            <li>• Use consistent bullet points throughout</li>
            <li>• Maintain proper margins (0.5-1 inch on all sides)</li>
            <li>• Avoid tables, text boxes, and complex formatting</li>
            <li>• Save as both PDF and Word formats</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartFormattingAssistant;
