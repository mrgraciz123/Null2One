"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "https://github.com/mrgraciz123/Null2One/blob/master/public/assets/logo.png";
import { 
 ShieldCheck, 
 ArrowRight, 
 CheckCircle2, 
 FileText, 
 Briefcase, 
 Code,
 Activity,
 Fingerprint,
 Lock,
 Database,
 Network
} from "lucide-react";
import Link from "next/link";

export default function Home() {
 return (
 <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
 
 {/* MINIMALIST HEADER */}
 <header className="sticky top-0 z-50 bg-background border-b border-border">
 <div className="container mx-auto px-6 h-14 flex justify-between items-center">
 <div className="flex items-center gap-3">
 <Image
  src={logo}
  alt="AscendID"
  width={24}
  height={24}
  className="rounded-sm"
/>
 <span className="text-sm font-semibold tracking-wide text-foreground font-heading">
 AscendID
 </span>
 </div>
 <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
 <Link href="#infrastructure" className="hover:text-white transition-colors">Infrastructure</Link>
 <Link href="#telemetry" className="hover:text-white transition-colors">Telemetry</Link>
 <Link href="#network" className="hover:text-white transition-colors">Network</Link>
 </nav>
 <div className="flex items-center gap-3">
 <Link href="/auth/login">
 <span className="text-xs font-medium text-muted-foreground hover:text-white transition-colors cursor-pointer mr-2">Log In</span>
 </Link>
 <Link href="/auth/signup">
 <Button className="bg-primary hover:bg-primary/90 text-white font-medium h-8 px-4 text-xs rounded shadow-none">
 Get Started
 </Button>
 </Link>
 </div>
 </div>
 </header>

 <main className="flex-1 flex flex-col items-center">
 
 {/* HERO SECTION - HIGH CONTRAST */}
 <section className="w-full max-w-[1400px] px-4 md:px-8 pt-20 pb-16">
 <div className="max-w-3xl mb-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 bg-trust/10 border border-trust/20 rounded text-trust text-xs font-bold uppercase tracking-widest mb-6">
 <Activity className="w-3.5 h-3.5" /> India's Talent Infrastructure
 </div>
 <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] font-heading mb-6">
 The CIBIL Score <br />
 <span className="text-muted-foreground">For Human Potential.</span>
 </h1>
 <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
 AscendID is a national-scale trust infrastructure. Connect your academic identity, aggregate your verified records, and generate a mathematically proven Trust Score that top recruiters rely on.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 auto-rows-auto md:auto-rows-[280px]">
 
 {/* CARD 1: DIGITAL PASSPORT */}
 <div className="md:col-span-8 md:row-span-2 surface-panel p-6 lg:p-10 flex flex-col">
 <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
 <div className="flex items-center gap-2">
 <Fingerprint className="w-4 h-4 text-primary" />
 <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Verified Identity Node</span>
 </div>
 <div className="flex items-center gap-2 px-2 py-1 bg-success/10 border border-success/20 rounded text-success text-[10px] font-mono font-bold uppercase">
 ACTIVE
 </div>
 </div>

 <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1">
 {/* Profile Meta */}
 <div className="flex flex-col items-start gap-4 z-10 min-w-[200px]">
 <div className="w-24 h-24 bg-background border border-border p-1">
 <img src="https://i.pravatar.cc/150?u=aditya" alt="Aditya Sharma" className="w-full h-full object-cover grayscale" />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-white tracking-tight font-heading">Aditya Sharma</h2>
 <p className="text-xs text-muted-foreground font-mono mt-1">ID: ASC-8472-9X</p>
 </div>
 <div className="w-full flex justify-between items-center text-sm border-t border-border pt-3 mt-2">
 <span className="text-muted-foreground text-xs uppercase font-bold">Clearance</span>
 <span className="text-white font-mono font-bold">Level 4</span>
 </div>
 </div>

 {/* Telemetry Data */}
 <div className="flex-1 flex flex-col justify-between gap-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-background border border-border p-4">
 <div className="flex items-center gap-2 mb-4">
 <FileText className="w-3.5 h-3.5 text-muted-foreground" />
 <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Academics</span>
 </div>
 <div className="space-y-3">
 <div className="flex justify-between items-center border-b border-border pb-2">
 <span className="text-sm text-white font-medium">B.Tech CS</span>
 <CheckCircle2 className="w-3.5 h-3.5 text-success" />
 </div>
 <div className="flex justify-between items-center">
 <span className="text-sm text-white font-medium">Class 12 (94%)</span>
 <CheckCircle2 className="w-3.5 h-3.5 text-success" />
 </div>
 </div>
 </div>
 <div className="bg-background border border-border p-4">
 <div className="flex items-center gap-2 mb-4">
 <Code className="w-3.5 h-3.5 text-muted-foreground" />
 <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Technical</span>
 </div>
 <div className="space-y-3">
 <div className="flex justify-between items-center border-b border-border pb-2">
 <span className="text-sm text-white font-medium">SIH Winner '23</span>
 <CheckCircle2 className="w-3.5 h-3.5 text-success" />
 </div>
 <div className="flex justify-between items-center">
 <span className="text-sm text-white font-medium">AWS Solutions Arch</span>
 <CheckCircle2 className="w-3.5 h-3.5 text-success" />
 </div>
 </div>
 </div>
 </div>

 <div className="bg-background border border-border p-4 flex-1">
 <div className="flex items-center gap-2 mb-4">
 <Briefcase className="w-3.5 h-3.5 text-muted-foreground" />
 <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Verified Ledger</span>
 </div>
 <div className="space-y-4">
 <div className="flex justify-between items-center">
 <div>
 <p className="text-sm text-white font-bold">SDE Intern</p>
 <p className="text-[10px] text-muted-foreground font-mono mt-1">ZOMATO • 0x8f...4a2b</p>
 </div>
 <span className="text-xs text-success font-bold uppercase">Verified</span>
 </div>
 <div className="w-full h-px bg-border" />
 <div className="flex justify-between items-center">
 <div>
 <p className="text-sm text-white font-bold">Research Asst.</p>
 <p className="text-[10px] text-muted-foreground font-mono mt-1">IIT BOMBAY • 0x3e...9c1f</p>
 </div>
 <span className="text-xs text-success font-bold uppercase">Verified</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* CARD 2: TRUST ENGINE */}
 <div className="md:col-span-4 md:row-span-2 surface-panel p-6 lg:p-8 flex flex-col">
 <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
 <div className="flex items-center gap-2">
 <Activity className="w-4 h-4 text-trust" />
 <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Trust Engine</span>
 </div>
 </div>

 <div className="flex flex-col items-center justify-center py-6 mb-6">
 <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-2">Aggregate Score</span>
 <div className="text-7xl font-bold text-trust tracking-tighter">
 844
 </div>
 <div className="mt-4 px-3 py-1 bg-success/10 border border-success/20 rounded text-success text-[10px] font-bold uppercase tracking-wider">
 Top 2% Nationally
 </div>
 </div>

 <div className="flex-1 flex flex-col gap-4 justify-center mt-4">
 {[
 { label: "Academics", value: 98, color: "bg-success" },
 { label: "Projects", value: 85, color: "bg-primary" },
 { label: "Experience", value: 92, color: "bg-trust" },
 ].map((stat, i) => (
 <div key={i} className="w-full">
 <div className="flex justify-between items-end mb-1.5">
 <span className="text-[10px] text-muted-foreground font-bold uppercase">{stat.label}</span>
 <span className="text-xs text-white font-mono font-bold">{stat.value}%</span>
 </div>
 <div className="w-full h-1 bg-background overflow-hidden border border-border">
 <div className={`h-full ${stat.color}`} style={{ width: `${stat.value}%` }} />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* CARD 3: RECRUITER MATCH */}
 <div className="md:col-span-6 surface-panel p-6 lg:p-8 flex flex-col justify-between">
 <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
 <div className="flex items-center gap-2">
 <Database className="w-4 h-4 text-primary" />
 <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Opportunity Radar</span>
 </div>
 </div>
 
 <div className="flex flex-col gap-3">
 <div className="flex items-center justify-between p-4 bg-background border border-border hover:border-primary/50 transition-colors cursor-pointer">
 <div>
 <p className="text-sm font-bold text-white uppercase tracking-wide">Google STEP Internship</p>
 <p className="text-[10px] text-success font-mono mt-1">Match: 96% • Score \u003E 800 req.</p>
 </div>
 <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase bg-primary text-white border-none rounded-sm">Apply</Button>
 </div>
 <div className="flex items-center justify-between p-4 bg-background border border-border opacity-70">
 <div>
 <p className="text-sm font-bold text-white uppercase tracking-wide">Jio GenNext Fellowship</p>
 <p className="text-[10px] text-muted-foreground font-mono mt-1">Match: 88% • Projects verified</p>
 </div>
 <span className="text-[10px] font-bold uppercase text-muted-foreground">Queued</span>
 </div>
 </div>
 </div>

 {/* CARD 4: LEDGER LOGS */}
 <div className="md:col-span-6 surface-panel p-6 lg:p-8 flex flex-col justify-between">
 <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
 <div className="flex items-center gap-2">
 <Lock className="w-4 h-4 text-secondary" />
 <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Network Ledger</span>
 </div>
 </div>
 
 <div className="flex-1 bg-background border border-border p-4 overflow-hidden relative font-mono text-[10px] sm:text-[11px] text-muted-foreground space-y-2 leading-relaxed">
 <p><span className="text-secondary font-bold">REQ</span> Verify doc_id: CBSE_12_2022</p>
 <p><span className="text-primary font-bold">API</span> Handshake with DigiLocker Gateway</p>
 <p><span className="text-success font-bold">OK</span> Signature matched: 0x9F2B1C</p>
 <p className="text-white"><span className="text-trust font-bold">ADD</span> Record committed to Aditya's passport.</p>
 <p><span className="text-primary font-bold">SYS</span> Recalculating Trust Score &rarr; 844</p>
 </div>
 </div>

 </div>
 </section>

 {/* VALUE PROP */}
 <section id="infrastructure" className="w-full bg-background border-t border-b border-border py-24 mt-12">
 <div className="container mx-auto px-6 max-w-6xl">
 <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
 <div className="border-l border-border pl-6">
 <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">The National Trust Layer</h3>
 <p className="text-sm text-muted-foreground leading-relaxed">
 UPI solved payments. DigiLocker solved documents. AscendID solves talent. We provide the strict cryptographic infrastructure to instantly verify a student's entire academic and professional history.
 </p>
 </div>
 <div className="border-l border-border pl-6">
 <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Eradicating Friction</h3>
 <p className="text-sm text-muted-foreground leading-relaxed">
 Stop uploading the same marksheets. Connect your academic identity once, generate your CIBIL Score for Talent, and let top recruiters discover your mathematically proven merit.
 </p>
 </div>
 <div className="border-l border-border pl-6">
 <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide">Fairer Opportunity</h3>
 <p className="text-sm text-muted-foreground leading-relaxed">
 Opportunity distribution should be based on verified truth, not formatting. Our engine guarantees that talent meets the right scholarships and jobs based purely on hard data.
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="w-full py-32 text-center bg-card border-b border-border">
 <h2 className="text-3xl font-bold text-white mb-8 font-heading uppercase tracking-wide">Establish Your Identity</h2>
 <Link href="/auth/signup">
 <Button className="bg-white text-black hover:bg-gray-200 h-12 px-8 text-sm font-bold uppercase tracking-widest rounded shadow-none">
 Initialize Account
 </Button>
 </Link>
 </section>

 </main>

 {/* MINIMAL FOOTER */}
 <footer className="py-8 bg-background">
 <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-2">
 <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">AscendID Infrastructure</span>
 </div>
 <div className="flex gap-6 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
 <Link href="#" className="hover:text-white transition-colors">Protocol</Link>
 <Link href="#" className="hover:text-white transition-colors">Security</Link>
 </div>
 </div>
 </footer>
 </div>
 );
}
