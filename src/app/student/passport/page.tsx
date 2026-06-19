"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Share2, MapPin, GraduationCap, Calendar, Download, ExternalLink, QrCode, Loader2, CheckCircle2, User, Building2, Clock } from "lucide-react";
import { StudentService } from "@/services/student";
import { AchievementService } from "@/services/achievement";
import { TrustScoreService } from "@/services/trust-score";
import { useAuth } from "@/context/AuthContext";

export default function PassportPage() {
 const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [trustScore, setTrustScore] = useState<any>(null);

 const { currentUser } = useAuth();

 useEffect(() => {
 async function load() {
 if (!currentUser) return;
 const uid = currentUser.uid;
 const [s, rec, ach, score] = await Promise.all([
 StudentService.getProfile(uid),
 StudentService.getAcademicRecords(uid),
 AchievementService.getAchievements(uid),
 TrustScoreService.getScore(uid)
 ]);
 setStudent(s);
 setRecords(rec);
 setAchievements(ach);
 setTrustScore(score);
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

 const verifiedAchievements = achievements.filter(a => a.verified);
 const pendingAchievements = achievements.filter(a => !a.verified);

 return (
 <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
 <div>
 <h1 className="text-3xl font-bold text-white tracking-tight">Digital Passport</h1>
 <p className="text-muted-foreground mt-1">Your verified professional identity.</p>
 </div>
 <div className="flex gap-2">
 <Button variant="outline" className=" text-white bg-background/50 hover:bg-white/5 shadow-md">
 <Download className="w-4 h-4 mr-2" />
 Save to Apple Wallet
 </Button>
 <Button className="bg-primary hover:bg-primary/90 text-white ">
 <Share2 className="w-4 h-4 mr-2" />
 Public Link
 </Button>
 </div>
 </div>

 {/* Main Profile Header - Wallet Style */}
 <Card className="surface-panel relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
 
 <CardContent className="p-8">
 <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
 <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
 <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
 <AvatarImage src={student.avatar} alt={student.name} />
 <AvatarFallback className="text-4xl bg-secondary">{student.name.substring(0, 2)}</AvatarFallback>
 </Avatar>
 
 <div className="space-y-2">
  <h1 className="text-4xl font-black text-white tracking-tight">{student.name}</h1>
  <div className="flex flex-wrap gap-2 text-sm">
  <Badge className="bg-primary/20 text-primary border-primary/30"><User className="w-3 h-3 mr-1" /> DID: {student.id}</Badge>
  <Badge className="bg-white/10 text-white border-white/20"><Building2 className="w-3 h-3 mr-1" /> {student.institution}</Badge>
  </div>
  </div>
 </div>

 <div className="flex flex-row md:flex-col gap-6 w-full md:w-auto mt-6 md:mt-0 items-center border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-8">
 <div className="flex flex-col items-center justify-center">
 <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Trust Score</span>
 <span className="text-5xl font-bold text-white mt-1 drop-shadow-md">{trustScore.total}</span>
 </div>
 <div className="w-24 h-24 bg-white p-2 rounded-lg shadow-lg shrink-0 flex items-center justify-center">
 <QrCode className="w-full h-full text-black" />
 </div>
 </div>
 </div>
 </CardContent>
 </Card>

 <Tabs defaultValue="academics" className="w-full">
 <TabsList className="w-full md:w-auto grid grid-cols-3 md:inline-flex bg-background/50 border h-12">
 <TabsTrigger value="academics" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-10">
 Academics ({records.length})
 </TabsTrigger>
 <TabsTrigger value="verified" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary h-10">
 Experiences ({verifiedAchievements.length})
 </TabsTrigger>
 <TabsTrigger value="pending" className="data-[state=active]:bg-white/10 data-[state=active]:text-white h-10">
 Pending ({pendingAchievements.length})
 </TabsTrigger>
 </TabsList>
 
 <TabsContent value="academics" className="mt-6 space-y-4">
 <div className="bg-green-500/5 border border-green-500/20 p-4 rounded-xl flex items-start gap-3 mb-6">
 <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
 <p className="text-sm text-green-400/90 leading-relaxed">
 These records are cryptographically verified directly from Government of India&apos;s DigiLocker APIs. They cannot be tampered with.
 </p>
 </div>
 <div className="grid gap-4 md:grid-cols-2">
 {records.map(record => (
  <div key={record.id} className="flex justify-between items-center p-3 rounded-lg bg-background/50 border border-border/30">
  <div>
  <p className="font-semibold text-white">{record.type}</p>
  <p className="text-xs text-muted-foreground">{record.board} • {record.year}</p>
  </div>
  <div className="text-right">
  <p className="font-bold text-primary">{record.score}</p>
  <p className="text-[10px] text-green-400 flex items-center justify-end mt-1 uppercase tracking-widest font-semibold">
  <CheckCircle2 className="w-3 h-3 mr-1" /> {record.verifiedBy}
  </p>
  </div>
  </div>
  ))}
 </div>
 </TabsContent>

 <TabsContent value="verified" className="mt-6 space-y-4">
 {verifiedAchievements.map(ach => (
 <Card key={ach.id} className="surface-panel hover: transition-colors">
 <CardContent className="p-6">
 <div className="flex flex-col md:flex-row justify-between gap-4">
 <div className="flex-1 space-y-2">
 <div className="flex items-center gap-3">
  <h3 className="text-xl font-semibold text-white">{ach.title}</h3>
  <Badge className=" text-primary ">{ach.type}</Badge>
  </div>
  <p className="text-muted-foreground">{ach.issuer} • {new Date(ach.date).toLocaleDateString()}</p>
  <p className="text-white mt-4 bg-white/5 p-4 rounded-lg border border-white/10">
 {ach.impact}
 </p>
 </div>
 <div className="flex flex-col items-end gap-4 min-w-[150px]">
 <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full text-sm font-medium border border-green-500/20">
 <ShieldCheck className="w-4 h-4" />
 Verified
 </div>
 <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
 View Proof <ExternalLink className="w-4 h-4 ml-2" />
 </Button>
 </div>
 </div>
 </CardContent>
 </Card>
 ))}
 </TabsContent>

 <TabsContent value="pending" className="mt-6 space-y-4">
 {achievements.map(ach => (
  <div key={ach.id} className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/30 relative overflow-hidden group">
 <div className="flex flex-col md:flex-row justify-between gap-4">
 <div className="flex-1 space-y-2">
 <div className="flex items-center gap-3">
 <h3 className="text-xl font-semibold text-white">{ach.title}</h3>
 <Badge variant="outline" className="border-border text-muted-foreground">{ach.type}</Badge>
 </div>
 <p className="text-muted-foreground">{ach.issuer} • {new Date(ach.date).toLocaleDateString()}</p>
 <p className="text-muted-foreground mt-4 bg-background p-4 rounded-lg border border-border/30">
 {ach.impact}
 </p>
 </div>
 <div className="flex flex-col items-end gap-4 min-w-[150px]">
 <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-full text-sm font-medium border border-amber-500/20">
 <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
 In Review
 </div>
 </div>
 </div>
 </div>
 ))}
 {pendingAchievements.length === 0 && (
 <div className="text-center py-12 text-muted-foreground bg-background/30 rounded-xl border border-border/30 border-dashed">
 <Clock className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
 <p>No pending achievements in review.</p>
 </div>
 )}
 </TabsContent>
 </Tabs>
 </div>
 );
}
