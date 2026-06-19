"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Building2, ExternalLink, Bookmark, Search, Loader2 } from "lucide-react";
import { OpportunityService } from "@/services/opportunity";
import { useAuth } from "@/context/AuthContext";

export default function OpportunitiesPage() {
 const [loading, setLoading] = useState(true);
 const [isGenerating, setIsGenerating] = useState(false);
 const [opportunities, setOpportunities] = useState<any[]>([]);

 const { currentUser } = useAuth();

 useEffect(() => {
 async function load() {
 if (!currentUser) return;
 const opps = await OpportunityService.getRecommendations(currentUser.uid);
 setOpportunities(opps);
 setLoading(false);
 }
 load();
 }, [currentUser]);

 const handleRefreshMatches = async () => {
 if (!currentUser) return;
 setIsGenerating(true);
 const newMatches = await OpportunityService.generateAIMatches(currentUser.uid);
 setOpportunities(newMatches);
 setIsGenerating(false);
 };

 if (loading) {
 return (
 <div className="flex h-[60vh] items-center justify-center">
 <Loader2 className="w-8 h-8 text-primary animate-spin" />
 </div>
 );
 }

 return (
 <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
 <div>
 <h1 className="text-3xl font-bold text-white tracking-tight">Opportunity Hub</h1>
 <p className="text-muted-foreground mt-1">AI-powered matches based on your verified trust score.</p>
 </div>
 <Button 
 onClick={handleRefreshMatches} 
 disabled={isGenerating}
 className="bg-indigo-600 hover:bg-indigo-700 text-white border-none"
 >
 {isGenerating ? (
 <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
 ) : (
 <Sparkles className="w-4 h-4 mr-2" />
 )}
 {isGenerating ? "Analyzing Profile..." : "Refresh AI Matches"}
 </Button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
 <div className="lg:col-span-1 space-y-6">
 <Card className="surface-panel ">
 <CardHeader className="pb-4">
 <CardTitle className="text-lg text-white flex items-center gap-2">
 <Search className="w-4 h-4" />
 Filters
 </CardTitle>
 </CardHeader>
 <CardContent className="space-y-6">
 <div className="space-y-3">
 <h4 className="text-sm font-medium text-white">Opportunity Type</h4>
 <div className="space-y-2">
 {['Job', 'Internship', 'Scholarship', 'Hackathon'].map((type) => (
 <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white cursor-pointer transition-colors">
 <input type="checkbox" className="rounded bg-background/50 text-primary focus:ring-primary" defaultChecked={type === 'Internship' || type === 'Scholarship'} />
 {type}
 </label>
 ))}
 </div>
 </div>

 <div className="space-y-3">
 <h4 className="text-sm font-medium text-white">Match Score</h4>
 <div className="space-y-2">
 <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white cursor-pointer transition-colors">
 <input type="radio" name="score" className="text-primary focus:ring-primary bg-background/50 " defaultChecked />
 90%+ Match
 </label>
 <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white cursor-pointer transition-colors">
 <input type="radio" name="score" className="text-primary focus:ring-primary bg-background/50 " />
 All Matches
 </label>
 </div>
 </div>
 </CardContent>
 </Card>
 </div>

 <div className="lg:col-span-3 space-y-4 relative">
 {isGenerating && (
 <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-xl border border-border/30">
 <div className="flex flex-col items-center gap-4">
 <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/50 relative">
 <div className="absolute inset-0 rounded-full border border-indigo-500 animate-ping opacity-20" />
 <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
 </div>
 <p className="text-indigo-300 font-medium animate-pulse">Gemini AI is analyzing your verified profile...</p>
 </div>
 </div>
 )}

 {opportunities.map((opp) => (
 <Card key={opp.id} className="surface-panel hover: transition-all duration-300 group">
 <CardContent className="p-6">
 <div className="flex flex-col md:flex-row gap-6">
 <div className="shrink-0 flex flex-col items-center gap-3">
 <Avatar className="w-16 h-16 border-2 border-background shadow-lg group-hover:scale-105 transition-transform duration-300">
 <AvatarImage src={opp.logo} alt={opp.company} className="object-contain p-2 bg-white" />
 <AvatarFallback className="bg-secondary text-white text-xl">{(opp.company || "CO").substring(0, 2).toUpperCase()}</AvatarFallback>
 </Avatar>
 <div className="flex flex-col items-center">
 <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 ">
 {opp.matchScore}% Match
 </Badge>
 </div>
 </div>

 <div className="flex-1 space-y-4">
 <div className="flex justify-between items-start gap-4">
 <div>
 <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{opp.title}</h3>
 <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
 <span className="flex items-center gap-1">
 <Building2 className="w-4 h-4" /> {opp.company}
 </span>
 <span className="flex items-center gap-1">
 <Badge variant="outline" className="border-border text-xs py-0 h-5">{opp.type}</Badge>
 </span>
 </div>
 </div>
 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white shrink-0">
 <Bookmark className="w-5 h-5" />
 </Button>
 </div>

 <div className=" border border-primary/10 rounded-lg p-3 text-sm text-muted-foreground flex gap-3">
 <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
 <p>
 <strong className="text-white">Why you match:</strong> {opp.matchReason}
 </p>
 </div>

 <div className="flex flex-wrap gap-2">
 {opp.tags.map((tag: string) => (
 <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-white border-white/10">
 {tag}
 </Badge>
 ))}
 </div>
 </div>

 <div className="shrink-0 flex items-end md:items-center">
 <a href={opp.applyLink || "#"} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
 <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white shadow-md">
 Apply Now <ExternalLink className="w-4 h-4 ml-2" />
 </Button>
 </a>
 </div>
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 </div>
 </div>
 );
}
