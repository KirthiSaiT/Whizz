import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Target, TrendingUp, Zap, Star, Users, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ResumeUpload from '@/components/ResumeUpload';
import ScoreDisplay from '@/components/ScoreDisplay';
import SkillsBreakdown from '@/components/SkillsBreakdown';
import ImprovementTips from '@/components/ImprovementTips';
import PredictiveAnalysis from '@/components/PredictiveAnalysis';
import KeywordAnalysis from '@/components/KeywordAnalysis';
import ExperienceAnalysis from '@/components/ExperienceAnalysis';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import AiAssistant from '@/components/AiAssistant';
import DynamicContentSuggestions from '@/components/DynamicContentSuggestions';
import { performAdvancedATSAnalysis } from '@/lib/analysis';

const Index = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeResume = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both your resume and job description for analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = performAdvancedATSAnalysis(resumeText, jobDescription);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your ATS score is ${result.overallScore}% with ${result.predictiveMetrics.interviewCallbackRate}% interview callback rate predicted.`,
      });
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Top Navigation Bar with WHIZZ Branding */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    WHIZZ
                  </h1>
                  <p className="text-xs text-gray-500">AI Resume Scanner</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="secondary" className="bg-blue-600 text-white font-medium">
                    Sign in
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>
      {/* Auth Gate */}
      <SignedIn>
        {/* Main resume analysis interface: header, cards, workflows, etc */}
        <div className="max-w-6xl mx-auto space-y-8 p-4">
          {/* Enhanced Header Section */}
          <div className="text-center py-12">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full shadow-xl">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              The Ultimate AI Resume Scanner
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              WHIZZ leverages cutting-edge AI technology to provide comprehensive resume analysis with 
              smart insights, precise scoring, predictive success analysis, and actionable recommendations to maximize your job search success.
            </p>
            
            {/* Enhanced Feature Highlights */}
            <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">AI-Powered Analysis</h3>
                <p className="text-xs text-gray-600">Advanced ML algorithms</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">Smart Scoring</h3>
                <p className="text-xs text-gray-600">ATS compatibility rating</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">Skills Analysis</h3>
                <p className="text-xs text-gray-600">Match skills to jobs</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">Predictive Insights</h3>
                <p className="text-xs text-gray-600">Interview success rates</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Zap className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 text-sm">Real-time Tips</h3>
                <p className="text-xs text-gray-600">Instant improvements</p>
              </div>
            </div>
          </div>

          {/* Enhanced Input Section with More Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Your Resume
                </CardTitle>
                <CardDescription>
                  Upload your resume file (PDF, DOC, DOCX) or paste the text content. 
                  Our AI will analyze format, content, keywords, and structure for optimal ATS compatibility.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResumeUpload onTextExtracted={setResumeText} />
                <div>
                  <Label htmlFor="resume-text">Or paste your resume text here:</Label>
                  <Textarea
                    id="resume-text"
                    placeholder="Paste your complete resume content here for comprehensive AI analysis..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[200px] mt-2"
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>{resumeText.length} characters</span>
                    <span>Supports all major resume formats</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-green-600" />
                  Target Job Description
                </CardTitle>
                <CardDescription>
                  Paste the complete job description to get personalized analysis and optimization suggestions. 
                  Include requirements, qualifications, and preferred skills for best results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the complete job description including requirements, qualifications, responsibilities, and preferred skills..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px]"
                />
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>{jobDescription.length} characters</span>
                  <span>More details = Better analysis</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Progress Info */}
          {(resumeText.trim() || jobDescription.trim()) && (
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for AI Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    WHIZZ will analyze {resumeText.trim() ? '✓ Resume content' : ''} 
                    {resumeText.trim() && jobDescription.trim() ? ' and ' : ''} 
                    {jobDescription.trim() ? '✓ Job requirements' : ''} 
                    to provide comprehensive insights and optimization recommendations.
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    <span>🎯 ATS Compatibility Check</span>
                    <span>📊 Skills Match Analysis</span>
                    <span>💡 Smart Suggestions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Analyze Button */}
          <div className="text-center">
            <Button 
              onClick={analyzeResume}
              disabled={isAnalyzing}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-16 py-8 text-xl font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-4"></div>
                  Analyzing with WHIZZ AI...
                </>
              ) : (
                <>
                  <TrendingUp className="w-6 h-6 mr-4" />
                  Analyze My Resume with WHIZZ
                </>
              )}
            </Button>
            <p className="text-sm text-gray-500 mt-3">
              Analysis typically takes 2-3 seconds • 100% secure and private
            </p>
          </div>

          {/* Enhanced Results Section with 8 Unique Components */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Success Message */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <div className="bg-green-500 p-2 rounded-full">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Analysis Complete!</h3>
                  </div>
                  <p className="text-gray-600">
                    WHIZZ has analyzed your resume with predictive AI insights, keyword optimization, 
                    and personalized recommendations to maximize your success rate.
                  </p>
                </CardContent>
              </Card>

              {/* 1. Overall Score Display */}
              <ScoreDisplay 
                overallScore={analysisResult.overallScore}
                detailedBreakdown={analysisResult.detailedBreakdown}
                explainability={analysisResult.explainability}
              />
              
              {/* 2. Predictive Success Analysis - UNIQUE FEATURE */}
              <PredictiveAnalysis 
                overallScore={analysisResult.overallScore}
                skillsScore={analysisResult.skillsScore}
                experienceScore={analysisResult.experienceScore}
                keywordScore={analysisResult.keywordScore}
                formatScore={analysisResult.formatScore}
                jobTitle={analysisResult.jobTitle}
              />
              
              {/* 3. AI-Powered Content Suggestions */}
              <DynamicContentSuggestions 
                resumeText={resumeText} 
                jobDescription={jobDescription}
              />
              
              {/* 4. Skills Breakdown */}
              <SkillsBreakdown 
                skillsAnalysis={analysisResult.skillsAnalysis}
              />

              {/* 5. Experience Analysis - ENHANCED */}
              <ExperienceAnalysis 
                experienceAnalysis={analysisResult.experienceAnalysis}
              />

              {/* 6. Keyword Analysis - ENHANCED */}
              <KeywordAnalysis 
                matchedKeywords={analysisResult.keywordAnalysis.matchedKeywords}
                missingKeywords={analysisResult.keywordAnalysis.missingKeywords}
              />
              
              {/* 7. Improvement Tips */}
              <ImprovementTips 
                improvements={analysisResult.improvements}
              />

              {/* 8. Success Optimization Summary - UNIQUE */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-emerald-600" />
                    WHIZZ Success Optimization Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-emerald-700">🎯 Key Achievements:</h3>
                      <ul className="text-sm text-emerald-800 space-y-1">
                        <li>• {analysisResult.skillsAnalysis.matchedSkills.length} critical skills identified</li>
                        <li>• {analysisResult.predictiveMetrics.atsPassRate}% ATS pass probability</li>
                        <li>• {analysisResult.predictiveMetrics.interviewCallbackRate}% interview callback rate</li>
                        <li>• Personalized optimization roadmap generated</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-emerald-700">🚀 Next Steps:</h3>
                      <ul className="text-sm text-emerald-800 space-y-1">
                        <li>• Apply keyword suggestions naturally</li>
                        <li>• Focus on high-impact improvements first</li>
                        <li>• Test with multiple job descriptions</li>
                        <li>• Track your optimization progress</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-emerald-100 p-3 rounded-lg border border-emerald-200">
                    <p className="text-sm text-emerald-800 font-medium">
                      🏆 WHIZZ Advantage: Your resume is now optimized with AI-powered insights 
                      that increase your chances of landing interviews by up to {Math.round(analysisResult.predictiveMetrics.interviewCallbackRate * 1.2)}%!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer with WHIZZ branding */}
          <div className="text-center py-8 border-t border-gray-200">
            <div className="flex justify-center items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-gray-900">WHIZZ</span>
            </div>
            <p className="text-sm text-gray-500">
              Powered by advanced AI • Trusted by 10,000+ job seekers • 100% secure and private
            </p>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="text-4xl font-bold text-blue-700">Welcome to WHIZZ</div>
          <div className="mt-6 max-w-md text-center text-lg text-gray-600">
            Please sign in to use the AI Resume Scanner.
          </div>
          <div className="mt-8">
            <SignInButton mode="modal">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-4 rounded-full shadow-xl">
                Sign In
              </Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
      {analysisResult && <AiAssistant analysisResult={analysisResult} />}
    </div>
  );
};

export default Index;
