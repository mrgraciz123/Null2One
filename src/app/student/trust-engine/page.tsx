"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";
import { TrustScoreService } from "@/services/trust-score";
import { useAuth } from "@/context/AuthContext";

export default function TrustEnginePage() {
 const [loading, setLoading] = useState(true);
 const [scoreData, setScoreData] = useState<Record<string, unknown> | null>(null);

 const { currentUser } = useAuth();

 useEffect(() => {
 async function load() {
 if (!currentUser) return;
 const data = await TrustScoreService.getScore(currentUser.uid);
 setScoreData(data);
 setLoading(false);
 }
 load();
 }, [currentUser]);

 if (loading) {
 return (
 <div className="flex h-[60vh] items-center justify-center">
 <Loader2 className="w-8 h-8 text-primary animate-spin" />
 </div>
 );
 }

 const total = (scoreData?.total as number) || 0;
 const breakdown = (scoreData?.breakdown as any) || {};

  const scoreComponents = [
  { label: "Projects", value: breakdown.projects, max: 25, color: "bg-blue-500" },
  { label: "Internships", value: breakdown.internships, max: 25, color: "bg-indigo-500" },
  { label: "Certificates", value: breakdown.certificates, max: 20, color: "bg-purple-500" },
  { label: "Hackathons", value: breakdown.hackathons, max: 15, color: "bg-pink-500" },
  { label: "Recommendations", value: breakdown.recommendations, max: 10, color: "bg-amber-500" },
  { label: "Profile", value: breakdown.profile, max: 5, color: "bg-green-500" },
  ];

 return (
 <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
 <div>
 <h1 className="text-3xl font-bold text-white tracking-tight">Trust Engine</h1>
 <p className="text-muted-foreground mt-1">The intelligence behind your verified identity.</p>
 </div>
 
  <div className="max-w-md border border-border bg-background p-4 rounded-lg text-sm text-muted-foreground hidden md:block">
  <p><strong className="text-white">Why this exists:</strong> Recruiters need absolute confidence in your skills. This score translates your verified cryptographic proofs into a mathematical certainty, functioning exactly like a financial credit score.</p>
  </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <Card className="surface-panel col-span-1 md:col-span-1 flex flex-col items-center justify-center py-12 relative overflow-hidden">
  <ShieldCheck className="w-16 h-16 text-trust mb-4" />
  <h2 className="text-sm uppercase tracking-widest font-semibold text-muted-foreground text-center">CIBIL Score for Talent</h2>
  <div className="text-7xl font-black text-trust mt-2">{total}</div>
  {total > 0 ? (
    <div className="mt-4 flex items-center gap-2 text-success bg-success/10 px-4 py-2 rounded-full text-sm font-medium border border-success/20">
      <TrendingUp className="w-4 h-4" />
      Top 2% Nationally
    </div>
  ) : (
    <div className="mt-4 flex items-center gap-2 text-muted-foreground bg-background/50 px-4 py-2 rounded-full text-sm font-medium border border-border/50">
      <AlertTriangle className="w-4 h-4" />
      No records found
    </div>
  )}
 </Card>

 <Card className="surface-panel col-span-1 md:col-span-2">
 <CardHeader>
 <CardTitle className="text-xl text-white">Score Breakdown</CardTitle>
 <CardDescription>How your verified achievements contribute to your score.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-6">
 {scoreComponents.map(comp => (
 <div key={comp.label} className="space-y-2">
 <div className="flex justify-between text-sm">
 <span className="text-white font-medium">{comp.label}</span>
 <span className="text-muted-foreground">{comp.value} / {comp.max} pts</span>
 </div>
 <div className="h-3 w-full bg-background/80 rounded-full overflow-hidden border border-border/30">
 <div 
 className={`h-full ${comp.color} transition-all duration-1000 ease-out`}
 style={{ width: `${(comp.value / comp.max) * 100}%` }}
 />
 </div>
 </div>
 ))}
 </CardContent>
 </Card>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <Card className="surface-panel ">
 <CardHeader>
 <CardTitle className="text-lg text-white flex items-center gap-2">
 <CheckCircle2 className="w-5 h-5 text-green-400" />
 Verification Indicators
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
 <div className="p-2 rounded-full shrink-0">
 <ShieldCheck className="w-5 h-5 text-primary" />
 </div>
 <div>
 <h4 className="text-white font-medium">DigiLocker Synced</h4>
 <p className="text-sm text-muted-foreground mt-1">Your core identity and academic records are strongly verified via government databases.</p>
 </div>
 </div>
 <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
 <div className="p-2 rounded-full shrink-0">
 <ShieldCheck className="w-5 h-5 text-primary" />
 </div>
 <div>
 <h4 className="text-white font-medium">Cryptographic Proofs</h4>
 <p className="text-sm text-muted-foreground mt-1">2 certificates and 1 internship have been cryptographically signed by the issuers.</p>
 </div>
 </div>
 </CardContent>
 </Card>

 <Card className="surface-panel border-amber-500/20 bg-amber-500/5">
 <CardHeader>
 <CardTitle className="text-lg text-amber-500 flex items-center gap-2">
 <AlertTriangle className="w-5 h-5" />
 Improvement Suggestions
 </CardTitle>
 <CardDescription className="text-amber-500/70">AI-generated paths to reach a 95+ score.</CardDescription>
 </CardHeader>
 <CardContent className="space-y-4">
 <div className="group cursor-pointer p-4 rounded-lg bg-background/50 border border-border/30 hover:border-amber-500/30 transition-colors">
 <div className="flex justify-between items-start">
 <h4 className="text-white font-medium group-hover:text-amber-400 transition-colors">Upload pending certificates</h4>
 <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-400" />
 </div>
 <p className="text-sm text-muted-foreground mt-1">You have 1 unverified AWS certificate. Upload the proof link to gain +4 points.</p>
 </div>
 <div className="group cursor-pointer p-4 rounded-lg bg-background/50 border border-border/30 hover:border-amber-500/30 transition-colors">
 <div className="flex justify-between items-start">
 <h4 className="text-white font-medium group-hover:text-amber-400 transition-colors">Request a Recommendation</h4>
 <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-400" />
 </div>
 <p className="text-sm text-muted-foreground mt-1">Your &apos;Recommendations&apos; category is at 10/10. Securing one more from a verified mentor will max it out.</p>
 </div>
 </CardContent>
 </Card>
 </div>
 </div>
 );
}
