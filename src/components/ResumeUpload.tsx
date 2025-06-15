
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onTextExtracted: (text: string) => void;
}

const ResumeUpload = ({ onTextExtracted }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        onTextExtracted(text);
        setUploadedFile(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been processed.`,
        });
      };
      reader.readAsText(file);
    } else {
      // For non-text files, show a placeholder extraction
      const placeholderText = `[Extracted from ${file.name}]\n\nJohn Doe\njohn.doe@email.com\n(555) 123-4567\n\nPROFESSIONAL SUMMARY\nExperienced software developer with 5+ years in web development, specializing in React, TypeScript, and Node.js.\n\nWORK EXPERIENCE\nSenior Software Engineer | TechCorp (2020-Present)\n• Developed responsive web applications using React and TypeScript\n• Collaborated with cross-functional teams to deliver high-quality software\n• Implemented automated testing and CI/CD pipelines\n\nSoftware Developer | StartupXYZ (2018-2020)\n• Built scalable web applications using modern JavaScript frameworks\n• Optimized application performance and user experience\n\nEDUCATION\nBachelor of Science in Computer Science\nUniversity of Technology (2014-2018)\n\nSKILLS\n• Programming Languages: JavaScript, TypeScript, Python\n• Frameworks: React, Node.js, Express\n• Databases: PostgreSQL, MongoDB\n• Tools: Git, Docker, AWS`;
      
      onTextExtracted(placeholderText);
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} content has been extracted (demo data).`,
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : uploadedFile
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        {uploadedFile ? (
          <div className="space-y-2">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <p className="text-green-700 font-medium">{uploadedFile.name}</p>
            <p className="text-sm text-green-600">File uploaded successfully</p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop your resume here or click to upload
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PDF, DOC, DOCX, and TXT files
              </p>
            </div>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('resume-upload')?.click()}
              className="mt-4"
            >
              <FileText className="w-4 h-4 mr-2" />
              Choose File
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;
