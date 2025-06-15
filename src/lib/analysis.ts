
const extractSkills = (text: string) => {
    const skillPatterns = [
      'javascript', 'python', 'react', 'angular', 'vue', 'node.js', 'typescript', 'java', 'c++', 'c#',
      'sql', 'mongodb', 'postgresql', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum',
      'machine learning', 'ai', 'data analysis', 'project management', 'leadership', 'communication'
    ];
    
    return skillPatterns.filter(skill => text.includes(skill));
};

const generateSkillsExplanation = (matched: number, total: number, missing: string[]) => {
    const percentage = total > 0 ? Math.round((matched / total) * 100) : 0;
    return `You have ${matched} of ${total} required skills (${percentage}%). ${missing.length > 0 ? `Consider adding: ${missing.slice(0, 3).join(', ')}.` : 'Great skill coverage!'}`;
};

const analyzeSkills = (resume: string, job: string) => {
    const jobSkills = extractSkills(job.toLowerCase());
    const resumeSkills = extractSkills(resume.toLowerCase());
    
    const matchedSkills = jobSkills.filter(skill => 
      resumeSkills.some(rSkill => rSkill.includes(skill) || skill.includes(rSkill))
    );
    
    const missingSkills = jobSkills.filter(skill => 
      !resumeSkills.some(rSkill => rSkill.includes(skill) || skill.includes(rSkill))
    );

    const score = jobSkills.length > 0 ? (matchedSkills.length / jobSkills.length) * 100 : 50;

    return {
      score,
      requiredSkills: jobSkills,
      matchedSkills,
      missingSkills,
      additionalSkills: resumeSkills.filter(skill => 
        !jobSkills.some(jSkill => jSkill.includes(skill) || skill.includes(jSkill))
      ),
      explanation: generateSkillsExplanation(matchedSkills.length, jobSkills.length, missingSkills)
    };
};

const extractExperienceYears = (resume: string) => {
    const yearMatches = resume.match(/(\d+)\+?\s*(years?|yrs?)\s*(of\s*)?(experience|exp)/gi);
    if (yearMatches) {
      const numbers = yearMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0'));
      return Math.max(...numbers);
    }
    return 0;
};

const extractRequiredYears = (job: string) => {
    const yearMatches = job.match(/(\d+)\+?\s*(years?|yrs?)\s*(of\s*)?(experience|exp)/gi);
    if (yearMatches) {
      const numbers = yearMatches.map(match => parseInt(match.match(/\d+/)?.[0] || '0'));
      return Math.max(...numbers);
    }
    return 0;
};

const extractExperienceKeywords = (job: string) => {
    const keywords = ['management', 'leadership', 'development', 'design', 'analysis', 'implementation', 'strategy'];
    return keywords.filter(keyword => job.toLowerCase().includes(keyword));
};

const generateExperienceExplanation = (years: number, required: number, matchedExp: number, totalExp: number) => {
    let explanation = '';
    if (required > 0) {
      explanation += `You have ${years} years of experience vs ${required} required. `;
    }
    if (totalExp > 0) {
      explanation += `${matchedExp} of ${totalExp} experience types match the job requirements.`;
    }
    return explanation || 'Experience analysis based on job relevance and keywords.';
};

const analyzeExperience = (resume: string, job: string) => {
    const experienceYears = extractExperienceYears(resume);
    const requiredYears = extractRequiredYears(job);
    const experienceKeywords = extractExperienceKeywords(job);
    const matchedExperience = experienceKeywords.filter(keyword => 
      resume.toLowerCase().includes(keyword.toLowerCase())
    );

    let score = 50;
    
    if (requiredYears > 0) {
      const yearScore = Math.min((experienceYears / requiredYears) * 50, 50);
      score = yearScore;
    }
    
    if (experienceKeywords.length > 0) {
      const expScore = (matchedExperience.length / experienceKeywords.length) * 50;
      score += expScore;
    }

    return {
      score: Math.min(score, 100),
      experienceYears,
      requiredYears,
      matchedExperience,
      missingExperience: experienceKeywords.filter(keyword => 
        !resume.toLowerCase().includes(keyword.toLowerCase())
      ),
      explanation: generateExperienceExplanation(experienceYears, requiredYears, matchedExperience.length, experienceKeywords.length)
    };
};

const extractEducation = (resume: string) => {
    return {
      hasEducation: /education|degree|university|college|bachelor|master|phd/i.test(resume),
      hasRelevantDegree: /bachelor|master|phd|degree/i.test(resume),
      relevantField: /computer science|engineering|business|marketing/i.test(resume)
    };
};

const extractRequiredEducation = (job: string) => {
    return {
      degree: /bachelor|master|phd|degree/i.test(job),
      field: /computer science|engineering|business|marketing/i.test(job)
    };
};

const generateEducationExplanation = (resume: any, required: any) => {
    if (!resume.hasEducation) return 'No education section found. Consider adding your educational background.';
    if (required.degree && !resume.hasRelevantDegree) return 'Job requires specific degree level. Highlight relevant educational achievements.';
    return 'Educational background appears adequate for this position.';
};

const analyzeEducation = (resume: string, job: string) => {
    const resumeEducation = extractEducation(resume);
    const requiredEducation = extractRequiredEducation(job);
    
    let score = 70;
    
    if (requiredEducation.degree && resumeEducation.hasRelevantDegree) score += 20;
    if (requiredEducation.field && resumeEducation.relevantField) score += 10;

    return {
      score: Math.min(score, 100),
      hasEducation: resumeEducation.hasEducation,
      hasRelevantDegree: resumeEducation.hasRelevantDegree,
      relevantField: resumeEducation.relevantField,
      requiredDegree: requiredEducation.degree,
      requiredField: requiredEducation.field,
      explanation: generateEducationExplanation(resumeEducation, requiredEducation)
    };
};

const calculateFormatScore = (resume: string) => {
    let score = 50;
    
    if (/@/.test(resume)) score += 15;
    if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resume)) score += 15;
    if (resume.includes('•') || resume.includes('*') || resume.includes('-')) score += 10;
    if (resume.split('\n').length > 10) score += 10;
    
    const sections = ['experience', 'education', 'skills', 'summary'];
    const foundSections = sections.filter(section => 
      resume.toLowerCase().includes(section)
    );
    score += foundSections.length * 2.5;
    
    return Math.min(score, 100);
};

const analyzeFormat = (resume: string) => {
    return {
      score: calculateFormatScore(resume),
      hasBulletPoints: resume.includes('•') || resume.includes('*') || resume.includes('-'),
      hasEmail: /@/.test(resume),
      hasPhone: /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(resume),
      hasProperStructure: resume.split('\n').length > 10,
      explanation: "Format analysis checks for ATS-friendly structure, contact information, and proper formatting."
    };
};

const extractKeywords = (text: string) => {
    const commonKeywords = [
      'leadership', 'management', 'development', 'analysis', 'design', 'implementation',
      'strategy', 'communication', 'collaboration', 'problem-solving', 'innovation',
      'project management', 'team lead', 'senior', 'junior', 'architect', 'engineer'
    ];
    
    return commonKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
};

const analyzeKeywords = (resume: string, job: string) => {
    const jobKeywords = extractKeywords(job.toLowerCase());
    const matchedKeywords = jobKeywords.filter(keyword => 
      resume.toLowerCase().includes(keyword.toLowerCase())
    );
    
    const score = jobKeywords.length > 0 ? (matchedKeywords.length / jobKeywords.length) * 100 : 50;

    return {
      score,
      totalKeywords: jobKeywords.length,
      matchedKeywords,
      missingKeywords: jobKeywords.filter(keyword => 
        !resume.toLowerCase().includes(keyword.toLowerCase())
      ),
      explanation: `Found ${matchedKeywords.length} of ${jobKeywords.length} important keywords from the job description.`
    };
};

const generateOverallExplanation = (score: number) => {
    if (score >= 90) return "Exceptional match! Your resume is highly aligned with this job opportunity.";
    if (score >= 80) return "Strong match! Your resume shows good alignment with most job requirements.";
    if (score >= 70) return "Good match! Some areas could be improved to better align with the job.";
    if (score >= 60) return "Fair match. Several key areas need improvement to meet job requirements.";
    return "Poor match. Significant improvements needed to align with this job opportunity.";
};

const generateDetailedBreakdown = (overall: number, skills: number, experience: number, education: number, format: number, keywords: number) => {
    return {
      categories: [
        { name: 'Technical Skills', score: skills, weight: 35, description: 'Match between your skills and job requirements' },
        { name: 'Work Experience', score: experience, weight: 25, description: 'Relevance and depth of your professional experience' },
        { name: 'Keywords', score: keywords, weight: 20, description: 'Presence of important keywords from job description' },
        { name: 'Resume Format', score: format, weight: 15, description: 'ATS-friendly formatting and structure' },
        { name: 'Education', score: education, weight: 5, description: 'Educational background alignment' }
      ],
      overallExplanation: generateOverallExplanation(overall)
    };
};

const generateEnhancedImprovements = (skills: any, experience: any, education: any, format: any, keywords: any) => {
    const improvements = [];

    if (skills.score < 70) {
      improvements.push({
        category: "Skills Enhancement",
        tip: `Add ${skills.missingSkills.slice(0, 3).join(', ')} to better match job requirements. ${skills.explanation}`,
        priority: "high" as const,
        impact: "Major impact on ATS ranking"
      });
    }

    if (experience.score < 70) {
      improvements.push({
        category: "Experience Optimization",
        tip: `Emphasize experience with ${experience.missingExperience.slice(0, 2).join(' and ')}. ${experience.explanation}`,
        priority: "high" as const,
        impact: "Significant improvement in relevance score"
      });
    }

    if (keywords.score < 60) {
      improvements.push({
        category: "Keyword Integration",
        tip: `Naturally incorporate these missing keywords: ${keywords.missingKeywords.slice(0, 5).join(', ')}.`,
        priority: "medium" as const,
        impact: "Better ATS keyword matching"
      });
    }

    if (format.score < 80) {
      improvements.push({
        category: "Format Improvements",
        tip: "Improve ATS compatibility with better formatting, clear sections, and contact information.",
        priority: "medium" as const,
        impact: "Ensures ATS can properly parse your resume"
      });
    }

    return improvements;
};

const generateExplainability = (overallScore: number, skillsAnalysis: any, experienceAnalysis: any, educationAnalysis: any) => {
    const topStrengths = [];
    const mainWeaknesses = [];
    const keyRecommendations = [];

    if (skillsAnalysis.score >= 80) {
      topStrengths.push("Strong technical skills alignment with job requirements");
    }
    if (experienceAnalysis.score >= 80) {
      topStrengths.push("Excellent experience match for the role");
    }
    if (skillsAnalysis.matchedSkills.length > 5) {
      topStrengths.push(`${skillsAnalysis.matchedSkills.length} key skills directly match job requirements`);
    }

    if (skillsAnalysis.score < 60) {
      mainWeaknesses.push("Limited technical skills matching job requirements");
    }
    if (experienceAnalysis.score < 60) {
      mainWeaknesses.push("Experience doesn't strongly align with role expectations");
    }
    if (skillsAnalysis.missingSkills.length > 3) {
      mainWeaknesses.push(`Missing ${skillsAnalysis.missingSkills.length} important skills`);
    }

    if (skillsAnalysis.missingSkills.length > 0) {
      keyRecommendations.push(`Add experience with ${skillsAnalysis.missingSkills.slice(0, 2).join(' and ')}`);
    }
    if (experienceAnalysis.missingExperience.length > 0) {
      keyRecommendations.push(`Highlight ${experienceAnalysis.missingExperience[0]} experience`);
    }
    keyRecommendations.push("Use more industry-specific keywords naturally");

    return {
      topStrengths: topStrengths.length > 0 ? topStrengths : ["Resume shows potential for the role"],
      mainWeaknesses: mainWeaknesses.length > 0 ? mainWeaknesses : ["Minor improvements could enhance the match"],
      keyRecommendations: keyRecommendations.length > 0 ? keyRecommendations : ["Consider tailoring content to better match job requirements"]
    };
};

export const performAdvancedATSAnalysis = (resume: string, job: string) => {
    const skillsAnalysis = analyzeSkills(resume, job);
    const experienceAnalysis = analyzeExperience(resume, job);
    const educationAnalysis = analyzeEducation(resume, job);
    const formatAnalysis = analyzeFormat(resume);
    const keywordAnalysis = analyzeKeywords(resume, job);

    const skillsScore = skillsAnalysis.score;
    const experienceScore = experienceAnalysis.score;
    const educationScore = educationAnalysis.score;
    const formatScore = formatAnalysis.score;
    const keywordScore = keywordAnalysis.score;

    const overallScore = Math.round(
      (skillsScore * 0.35) + 
      (experienceScore * 0.25) + 
      (keywordScore * 0.20) + 
      (formatScore * 0.15) + 
      (educationScore * 0.05)
    );

    const jobTitle = job.split('\n')[0] || 'the role';

    return {
      overallScore,
      skillsScore: Math.round(skillsScore),
      experienceScore: Math.round(experienceScore),
      educationScore: Math.round(educationScore),
      formatScore: Math.round(formatScore),
      keywordScore: Math.round(keywordScore),
      skillsAnalysis,
      experienceAnalysis,
      educationAnalysis,
      formatAnalysis,
      keywordAnalysis,
      detailedBreakdown: generateDetailedBreakdown(overallScore, skillsScore, experienceScore, educationScore, formatScore, keywordScore),
      improvements: generateEnhancedImprovements(skillsAnalysis, experienceAnalysis, educationAnalysis, formatAnalysis, keywordAnalysis),
      explainability: generateExplainability(overallScore, skillsAnalysis, experienceAnalysis, educationAnalysis),
      jobTitle,
      predictiveMetrics: {
        atsPassRate: Math.min(Math.round((overallScore * 0.4) + (keywordScore * 0.3) + (formatScore * 0.3)), 95),
        interviewCallbackRate: Math.min(Math.round((experienceScore * 0.5) + (skillsScore * 0.3) + (overallScore * 0.2)), 85)
      }
    };
};
