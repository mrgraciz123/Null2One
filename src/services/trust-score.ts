import { AchievementService } from "./achievement";
import { StudentService } from "./student";

export const TRUST_WEIGHTS = {
 PROJECTS: 0.25,
 INTERNSHIPS: 0.25,
 CERTIFICATES: 0.20,
 HACKATHONS: 0.15,
 RECOMMENDATIONS: 0.10,
 PROFILE_COMPLETION: 0.05,
};

const MAX_CATEGORY_POINTS = 100;

export class TrustScoreService {
 static async getScore(studentId: string) {
 try {
 const achievements = await AchievementService.getAchievements(studentId);
 const profile = await StudentService.getProfile(studentId);
 
 const counts: Record<string, number> = {
 Project: 0,
 Internship: 0,
 Certificate: 0,
 Hackathon: 0,
 Recommendation: 0,
 Leadership: 0,
 };

  achievements.forEach((ach: any) => {
  const cat = (ach.category || ach.type) as string;
  if (ach.verified && counts[cat] !== undefined) {
  counts[cat]++;
  } else if (ach.verified && cat === 'Leadership') {
  counts.Recommendation++; // Map leadership to recommendations for scoring
  }
  });

 const points = {
 Project: Math.min(counts.Project * 25, MAX_CATEGORY_POINTS),
 Internship: Math.min(counts.Internship * 35, MAX_CATEGORY_POINTS),
 Certificate: Math.min(counts.Certificate * 20, MAX_CATEGORY_POINTS),
 Hackathon: Math.min(counts.Hackathon * 15, MAX_CATEGORY_POINTS),
 Recommendation: Math.min(counts.Recommendation * 30, MAX_CATEGORY_POINTS),
 };

 const weightedScore = 
 points.Project * TRUST_WEIGHTS.PROJECTS +
 points.Internship * TRUST_WEIGHTS.INTERNSHIPS +
 points.Certificate * TRUST_WEIGHTS.CERTIFICATES +
 points.Hackathon * TRUST_WEIGHTS.HACKATHONS +
 points.Recommendation * TRUST_WEIGHTS.RECOMMENDATIONS;

 const profileCompletion = profile?.profileCompletion || 20;
 const profileScore = profileCompletion === 100 ? (100 * TRUST_WEIGHTS.PROFILE_COMPLETION) : (profileCompletion * TRUST_WEIGHTS.PROFILE_COMPLETION);

 return {
 total: Math.round(weightedScore + profileScore),
 breakdown: {
 projects: Math.round(points.Project * TRUST_WEIGHTS.PROJECTS),
 internships: Math.round(points.Internship * TRUST_WEIGHTS.INTERNSHIPS),
 certificates: Math.round(points.Certificate * TRUST_WEIGHTS.CERTIFICATES),
 hackathons: Math.round(points.Hackathon * TRUST_WEIGHTS.HACKATHONS),
 recommendations: Math.round(points.Recommendation * TRUST_WEIGHTS.RECOMMENDATIONS),
 profile: Math.round(profileScore)
 }
 };
 } catch (error) {
 console.error("Error calculating trust score:", error);
 return {
 total: 0,
 breakdown: { projects: 0, internships: 0, certificates: 0, hackathons: 0, recommendations: 0, profile: 0 }
 };
 }
 }
}
