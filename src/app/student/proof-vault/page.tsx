"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileUp, Loader2, CheckCircle2 } from "lucide-react";

export default function ProofVaultPage() {
 const [isUploading, setIsUploading] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);

 const handleUpload = (e: React.FormEvent) => {
 e.preventDefault();
 setIsUploading(true);
 // Mock upload delay
 setTimeout(() => {
 setIsUploading(false);
 setIsSuccess(true);
 setTimeout(() => setIsSuccess(false), 3000);
 }, 2000);
 };

 return (
 <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
 <div>
 <h1 className="text-3xl font-bold text-white tracking-tight">Proof Vault</h1>
 <p className="text-muted-foreground mt-1">Upload and secure your professional achievements for verification.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <Card className="surface-panel md:col-span-2">
 <CardHeader>
 <CardTitle className="text-xl text-white">New Achievement</CardTitle>
 <CardDescription>Submit a new certificate, project, or experience.</CardDescription>
 </CardHeader>
 <form onSubmit={handleUpload}>
 <CardContent className="space-y-6">
 <div className="space-y-2">
 <Label htmlFor="title" className="text-muted-foreground">Achievement Title</Label>
 <Input id="title" placeholder="e.g. AWS Certified Solutions Architect" required className="bg-background/50 text-white" />
 </div>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label htmlFor="type" className="text-muted-foreground">Type</Label>
 <select id="type" className="flex h-10 w-full items-center justify-between rounded-md border bg-background/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50">
 <option value="Certificate">Certificate</option>
 <option value="Internship">Internship</option>
 <option value="Project">Project</option>
 <option value="Hackathon">Hackathon</option>
 </select>
 </div>
 <div className="space-y-2">
 <Label htmlFor="issuer" className="text-muted-foreground">Issuer / Organization</Label>
 <Input id="issuer" placeholder="e.g. Amazon Web Services" required className="bg-background/50 text-white" />
 </div>
 </div>

 <div className="space-y-2">
 <Label htmlFor="impact" className="text-muted-foreground">Impact / Description</Label>
 <textarea id="impact" className="flex min-h-[80px] w-full rounded-md border bg-background/50 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="Briefly describe what you did..." required />
 </div>

 <div className="space-y-2">
 <Label className="text-muted-foreground">Cryptographic Proof (Document/URL)</Label>
 <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center bg-background/30 hover:bg-white/5 transition-colors cursor-pointer">
 <FileUp className="w-8 h-8 text-muted-foreground mb-4" />
 <p className="text-sm text-white font-medium">Click to upload or drag and drop</p>
 <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG or Blockchain TX hash (max. 10MB)</p>
 </div>
 </div>
 </CardContent>
 <CardFooter>
 <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12" disabled={isUploading || isSuccess}>
 {isUploading ? (
 <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Securing Proof...</>
 ) : isSuccess ? (
 <><CheckCircle2 className="mr-2 h-5 w-5" /> Submitted for Verification</>
 ) : (
 <><Upload className="mr-2 h-5 w-5" /> Submit to Vault</>
 )}
 </Button>
 </CardFooter>
 </form>
 </Card>

 <div className="space-y-6">
 <Card className="surface-panel ">
 <CardHeader>
 <CardTitle className="text-lg text-white">How Verification Works</CardTitle>
 </CardHeader>
 <CardContent className="space-y-4 text-sm text-muted-foreground">
 <div className="flex gap-3">
 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border ">1</div>
 <p>Upload your document, URL, or transaction hash.</p>
 </div>
 <div className="flex gap-3">
 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border ">2</div>
 <p>AscendID&apos;s Trust Engine validates the authenticity with the issuer.</p>
 </div>
 <div className="flex gap-3">
 <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 border ">3</div>
 <p>Once verified, your Trust Score increases and it appears on your Passport.</p>
 </div>
 </CardContent>
 </Card>
 </div>
 </div>
 </div>
 );
}
