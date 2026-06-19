"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, CheckCircle2, ShieldAlert, FileText, ArrowRight } from "lucide-react";
import { StudentService } from "@/services/student";
import { useAuth } from "@/context/AuthContext";

export function DigiLockerConnect({ onComplete }: { onComplete: () => void }) {
 const [step, setStep] = useState<"initial" | "connecting" | "importing" | "success">("initial");
 const { currentUser } = useAuth();

 const handleConnect = async () => {
 if (!currentUser) return;
 setStep("connecting");
 await StudentService.connectDigiLocker(currentUser.uid);
 setStep("importing");
 
 // Simulate importing academic records
 setTimeout(() => {
 setStep("success");
 setTimeout(onComplete, 2000);
 }, 2500);
 };

 if (step === "success") {
 return (
 <Card className="surface-panel border-green-500/30 bg-green-500/5">
 <CardContent className="p-8 flex flex-col items-center justify-center text-center space-y-4">
 <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
 <CheckCircle2 className="w-8 h-8 text-green-400" />
 </div>
 <div>
 <h3 className="text-xl font-bold text-white">DigiLocker Connected</h3>
 <p className="text-muted-foreground mt-2">Academic records imported and verified successfully.</p>
 </div>
 </CardContent>
 </Card>
 );
 }

 return (
 <Card className="surface-panel relative overflow-hidden">
 <div className="absolute -right-10 -top-10 opacity-10">
 <ShieldAlert className="w-40 h-40 text-primary" />
 </div>
 <CardHeader>
 <CardTitle className="text-xl text-white flex items-center gap-2">
 Connect Academic Identity
 </CardTitle>
 <CardDescription>
 Establish a secure link with your institution and DigiLocker to sync your academic records automatically.
 </CardDescription>
 </CardHeader>
 <CardContent>
 {step === "initial" ? (
 <div className="space-y-6">
 <div className="flex gap-4 items-center p-4 rounded-xl bg-background/50 border border-border/30">
 <FileText className="w-8 h-8 text-indigo-400 shrink-0" />
 <div className="text-sm text-muted-foreground">
 <span className="text-white font-medium block">Supported Documents:</span>
 Class 10 Marksheet, Class 12 Marksheet, Degree Certificates, Transfer Certificates.
 </div>
 </div>
 <Button 
 onClick={handleConnect}
 className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg "
 >
 Continue to Institution Login <ArrowRight className="w-5 h-5 ml-2" />
 </Button>
 </div>
 ) : (
 <div className="flex flex-col items-center justify-center py-8 space-y-6">
 <div className="relative">
 <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
 <div className="w-20 h-20 rounded-full flex items-center justify-center">
 <Loader2 className="w-8 h-8 text-primary animate-pulse" />
 </div>
 </div>
 <div className="text-center">
 <h3 className="text-lg font-semibold text-white">
 {step === "connecting" ? "Establishing Secure Link..." : "Syncing Academic Ledger..."}
 </h3>
 <p className="text-sm text-muted-foreground mt-1 animate-pulse">
 Verifying institutional cryptographic signatures
 </p>
 </div>
 </div>
 )}
 </CardContent>
 </Card>
 );
}
