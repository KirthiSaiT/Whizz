
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Eye, 
  Edit, 
  Clock, 
  ThumbsUp,
  UserPlus,
  Bell
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  role: 'mentor' | 'peer' | 'recruiter' | 'career-coach';
  avatar: string;
  status: 'online' | 'offline';
  contributions: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  section: string;
  likes: number;
  resolved: boolean;
}

interface CollaborationHubProps {
  resumeScore: number;
}

const CollaborationHub = ({ resumeScore }: CollaborationHubProps) => {
  const [activeTab, setActiveTab] = useState<'collaborators' | 'comments' | 'versions'>('collaborators');
  const [newComment, setNewComment] = useState('');

  const collaborators: Collaborator[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'career-coach',
      avatar: 'SC',
      status: 'online',
      contributions: 12
    },
    {
      id: '2',
      name: 'Mike Johnson',
      role: 'mentor',
      avatar: 'MJ',
      status: 'online',
      contributions: 8
    },
    {
      id: '3',
      name: 'Alex Rivera',
      role: 'peer',
      avatar: 'AR',
      status: 'offline',
      contributions: 5
    },
    {
      id: '4',
      name: 'Jessica Park',
      role: 'recruiter',
      avatar: 'JP',
      status: 'online',
      contributions: 3
    }
  ];

  const comments: Comment[] = [
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'Consider adding more quantifiable achievements in your experience section. Numbers make your impact more concrete.',
      timestamp: '2 hours ago',
      section: 'Experience',
      likes: 4,
      resolved: false
    },
    {
      id: '2',
      author: 'Mike Johnson',
      content: 'The technical skills section looks great! Maybe group them by category (Frontend, Backend, Tools).',
      timestamp: '4 hours ago',
      section: 'Skills',
      likes: 2,
      resolved: true
    },
    {
      id: '3',
      author: 'Jessica Park',
      content: 'From a recruiter perspective, your summary could be more compelling. Focus on your unique value proposition.',
      timestamp: '1 day ago',
      section: 'Summary',
      likes: 6,
      resolved: false
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'career-coach': return 'bg-purple-100 text-purple-800';
      case 'mentor': return 'bg-blue-100 text-blue-800';
      case 'recruiter': return 'bg-green-100 text-green-800';
      case 'peer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment('');
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          Collaboration Hub
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {collaborators.filter(c => c.status === 'online').length} online
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {comments.filter(c => !c.resolved).length} active discussions
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'collaborators', label: 'Team', icon: Users },
            { key: 'comments', label: 'Feedback', icon: MessageCircle },
            { key: 'versions', label: 'Versions', icon: Clock }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Collaborators Tab */}
        {activeTab === 'collaborators' && (
          <div className="space-y-4">
            {/* Add Collaborator */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Collaborator
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Resume
              </Button>
            </div>

            {/* Collaborator List */}
            <div className="space-y-3">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-indigo-100 text-indigo-600">
                          {collaborator.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        collaborator.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div>
                      <div className="font-medium">{collaborator.name}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getRoleColor(collaborator.role)}>
                          {collaborator.role.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {collaborator.contributions} contributions
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            {/* Add Comment */}
            <div className="space-y-3">
              <Textarea
                placeholder="Add your feedback or suggestions..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-between items-center">
                <select className="text-sm border rounded px-2 py-1">
                  <option>General</option>
                  <option>Summary</option>
                  <option>Experience</option>
                  <option>Skills</option>
                  <option>Education</option>
                </select>
                <Button onClick={addComment} size="sm">
                  Add Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className={`p-4 rounded-lg border ${
                  comment.resolved ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {comment.section}
                      </Badge>
                      {comment.resolved && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                      <ThumbsUp className="w-3 h-3" />
                      {comment.likes}
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700">
                      Reply
                    </button>
                    {!comment.resolved && (
                      <button className="text-xs text-green-600 hover:text-green-700">
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Versions Tab */}
        {activeTab === 'versions' && (
          <div className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Version history will appear here</p>
              <p className="text-sm">Track changes and collaborate in real-time</p>
            </div>
          </div>
        )}

        {/* Real-time Activity Feed */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Recent Activity
          </h4>
          <div className="space-y-2 text-sm text-indigo-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sarah Chen added feedback on Experience section</span>
              <span className="text-xs text-indigo-500">5 min ago</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Mike Johnson resolved a comment</span>
              <span className="text-xs text-indigo-500">1 hour ago</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>You improved your ATS score to {resumeScore}%</span>
              <span className="text-xs text-indigo-500">2 hours ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationHub;
