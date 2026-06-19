"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShieldCheck, Search, SlidersHorizontal, MapPin, GraduationCap, ArrowUpRight, Bookmark, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { StudentService } from "@/services/student";
import { TrustScoreService } from "@/services/trust-score";

export default function RecruiterDashboard() {
 const [isSearching, setIsSearching] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 
 const [loading, setLoading] = useState(true);
 const [candidates, setCandidates] = useState<any[]>([]);

 useEffect(() => {
 async function load() {
 // In a real app we'd fetch a list of top candidates matching search criteria
 const id = "student-123";
 const [s, score] = await Promise.all([
 StudentService.getProfile(id),
 TrustScoreService.getScore(id)
 ]);
 
 setCandidates([{ ...s, score }]);
 setLoading(false);
 }
 load();
 }, []);

 const handleSearch = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSearching(true);
 setTimeout(() => setIsSearching(false), 1000);
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
 <h1 className="text-3xl font-bold text-white tracking-tight">Talent Search</h1>
 <p className="text-muted-foreground mt-1">Discover verified candidates with high trust scores.</p>
 </div>
 </div>

 <Card className="surface-panel ">
 <CardContent className="p-4 md:p-6">
 <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
 <div className="relative flex-1">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
 <Input 
 placeholder="Search by role, skill, or university..." 
 className="pl-10 h-12 bg-background/50 text-white focus-visible:ring-primary text-base"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 />
 </div>
 <div className="flex gap-4">
 <Button type="button" variant="outline" className="h-12 bg-background/50 hover:bg-white/5 text-white">
 <Filter className="w-4 h-4 mr-2" />
 Filters
 </Button>
 <Button type="submit" className="h-12 bg-primary hover:bg-primary/90 text-white px-8">
 Search
 </Button>
 </div>
 </form>

 <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/30">
 <span className="text-sm text-muted-foreground flex items-center mr-2">Suggested:</span>
 {['React', 'Machine Learning', 'IIT Bombay', 'Frontend', 'Trust Score > 80'].map(tag => (
 <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-muted-foreground cursor-pointer border-white/10 transition-colors">
 {tag}
 </Badge>
 ))}
 </div>
 </CardContent>
 </Card>

 <div className="space-y-6 relative">
 {isSearching && (
 <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
 <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
 </div>
 )}

 <div className="flex justify-between items-center">
 <h2 className="text-xl font-semibold text-white">Search Results</h2>
 <span className="text-sm text-muted-foreground">Showing 1 top match</span>
 </div>

 {/* Candidate List */}
 {candidates.map((candidate) => (
 <Card key={candidate.id} className="surface-panel hover: transition-colors">
 <CardContent className="p-6">
 <div className="flex flex-col md:flex-row gap-6">
 <div className="shrink-0 flex flex-col items-center gap-3">
 <Avatar className="w-20 h-20 border-2 border-background shadow-lg">
 <AvatarImage src={candidate.avatar} alt={candidate.name} />
 <AvatarFallback className="bg-secondary text-white text-xl">{(candidate.name || "CD").substring(0, 2).toUpperCase()}</AvatarFallback>
 </Avatar>
 </div>

 <div className="flex-1 space-y-4">
 <div className="flex justify-between items-start gap-4">
 <div>
 <div className="flex items-center gap-3">
 <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
 <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
 <ShieldCheck className="w-3 h-3 mr-1" />
 Verified
 </Badge>
 </div>
 <p className="text-primary font-medium mt-1">{candidate.major}</p>
 
 <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
 <span className="flex items-center gap-1">
 <GraduationCap className="w-4 h-4" /> {candidate.university}
 </span>
 <span className="flex items-center gap-1">
 <MapPin className="w-4 h-4" /> India
 </span>
 </div>
 </div>
 
 <div className="flex flex-col items-end gap-2">
 <div className=" border px-4 py-2 rounded-lg flex flex-col items-center gap-1 shadow-sm">
 <span className="text-xs text-primary font-semibold uppercase tracking-wider">Trust Score</span>
 <span className="text-2xl font-bold text-white leading-none">{candidate.score.total}</span>
 </div>
 <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
 <Bookmark className="w-5 h-5" />
 </Button>
 </div>
 </div>

 <div>
 <p className="text-sm text-muted-foreground font-medium mb-2">Verified Skills</p>
 <div className="flex flex-wrap gap-2">
 {candidate.skills.map((skill: string) => (
 <Badge key={skill} variant="secondary" className="bg-white/5 text-white border-white/10">
 {skill}
 </Badge>
 ))}
 </div>
 </div>
 </div>

 <div className="shrink-0 flex items-end md:items-center border-t md:border-t-0 md:border-l border-border/30 pt-4 md:pt-0 md:pl-6 mt-4 md:mt-0">
 <Link href={`/recruiter/candidate/${candidate.id}`}>
 <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white">
 View Passport <ArrowUpRight className="w-4 h-4 ml-2" />
 </Button>
 </Link>
 </div>
 </div>
 </CardContent>
 </Card>
 ))}
 </div>
 </div>
 );
}
