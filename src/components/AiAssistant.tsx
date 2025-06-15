import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, X, Send, User, Sparkles } from 'lucide-react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface AiAssistantProps {
  analysisResult: any;
}

const AiAssistant = ({ analysisResult }: AiAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: "Hi! I'm Whizzard Oz. Ask about your analysis results!",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (!analysisResult) {
      return "I don't have any analysis data yet. Please analyze your resume first.";
    }

    if (lowerInput.includes('score')) {
      return `Your overall ATS compatibility score is ${analysisResult.overallScore}%. Would you like a detailed breakdown of your strengths or areas for improvement?`;
    }
    if (lowerInput.includes('strength')) {
        return `Your top strengths are: ${analysisResult.explainability.topStrengths.join(', ')}. Great job on these!`;
    }
    if (lowerInput.includes('weakness') || lowerInput.includes('improve')) {
        const weaknesses = analysisResult.explainability.mainWeaknesses.join(', ');
        const recommendations = analysisResult.explainability.keyRecommendations.join(', ');
        return `The main areas for improvement are: ${weaknesses}. I suggest focusing on these key actions: ${recommendations}.`;
    }
    if (lowerInput.includes('skill')) {
      const { matchedSkills, missingSkills } = analysisResult.skillsAnalysis;
      if (missingSkills.length > 0) {
        return `You have matched ${matchedSkills.length} skills. You are missing ${missingSkills.length} skills, such as: ${missingSkills.slice(0, 3).join(', ')}. Focusing on these could significantly boost your score.`;
      }
      return `You've matched all the required skills (${matchedSkills.length})! Fantastic work.`;
    }
    if (lowerInput.includes('keyword')) {
        const { matchedKeywords, missingKeywords } = analysisResult.keywordAnalysis;
        if (missingKeywords.length > 0) {
            return `You've matched ${matchedKeywords.length} keywords. You could strengthen your resume by including some of these missing keywords: ${missingKeywords.slice(0, 3).join(', ')}.`;
        }
        return `You've matched all ${matchedKeywords.length} important keywords. Excellent!`;
    }

    return "I can help with your score, strengths, weaknesses, skills, and keywords. How can I assist you further?";
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userMessage: Message = { sender: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    setTimeout(() => {
      const botResponseText = generateBotResponse(userMessage.text);
      const botMessage: Message = { sender: 'bot', text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);
      setIsThinking(false);
    }, 1500);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-96 h-[600px] flex flex-col shadow-2xl border-2 border-purple-200 animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <Bot className="w-6 h-6" />
              <CardTitle className="text-lg">Whizzard Oz</CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <div className="bg-purple-600 p-2 rounded-full text-white flex-shrink-0"><Sparkles className="w-5 h-5"/></div>}
                <div className={`max-w-xs rounded-lg p-3 text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
                {msg.sender === 'user' && <div className="bg-blue-500 p-2 rounded-full text-white flex-shrink-0"><User className="w-5 h-5"/></div>}
              </div>
            ))}
            {isThinking && (
                 <div className="flex items-start gap-3">
                    <div className="bg-purple-600 p-2 rounded-full text-white flex-shrink-0"><Sparkles className="w-5 h-5"/></div>
                    <div className="max-w-xs rounded-lg p-3 bg-gray-100 text-gray-800 rounded-bl-none">
                        <div className="flex items-center justify-center gap-2 p-2">
                           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                           <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <div className="p-4 border-t bg-white rounded-b-lg">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about your results..."
                className="flex-1 resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSendMessage(e);
                  }
                }}
              />
              <Button type="submit" size="icon" disabled={isThinking}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl transform hover:scale-110 transition-transform"
        >
          <Bot className="w-8 h-8" />
        </Button>
      )}
    </div>
  );
};

export default AiAssistant;
