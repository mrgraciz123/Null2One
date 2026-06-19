"use client";

import { LayoutDashboard, ShieldCheck, FileUp, TrendingUp, Sparkles, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const navItems = [
 { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
 { name: "Digital Passport", href: "/student/passport", icon: ShieldCheck },
 { name: "Proof Vault", href: "/student/proof-vault", icon: FileUp },
 { name: "Trust Engine", href: "/student/trust-engine", icon: TrendingUp },
 { name: "Opportunity Hub", href: "/student/opportunities", icon: Sparkles },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
 const pathname = usePathname();
 const router = useRouter();
 const [isSidebarOpen, setSidebarOpen] = useState(false);
 const { currentUser, logout, loading } = useAuth();

 useEffect(() => {
   if (!loading && !currentUser) {
     router.push("/auth/login");
   }
 }, [currentUser, loading, router]);

 const handleLogout = async () => {
   try {
     await logout();
     router.push("/auth/login");
   } catch (error) {
     console.error("Logout failed:", error);
     alert("Failed to sign out. Please try again.");
   }
 };

 return (
 <div className="min-h-screen bg-background flex flex-col md:flex-row">
 {/* Mobile Header */}
 <div className="md:hidden flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur z-20">
 <Link href="/student/dashboard" className="flex items-center gap-2">
 <Image src="/assets/logo.png" alt="AscendID Logo" width={24} height={24} className="object-contain" />
 <span className="font-bold text-white">AscendID</span>
 </Link>
 <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!isSidebarOpen)}>
 <Menu className="w-6 h-6 text-white" />
 </Button>
 </div>

 {/* Sidebar */}
 <aside className={`
 fixed inset-y-0 left-0 z-30 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex flex-col
 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
 `}>
 <div className="p-6 hidden md:flex items-center gap-2">
 <Image src="/assets/logo.png" alt="AscendID Logo" width={32} height={32} className="object-contain" />
 <span className="text-xl font-bold tracking-tight text-white">AscendID</span>
 </div>

 <div className="flex-1 px-4 py-6 md:py-2 space-y-1 overflow-y-auto mt-4">
 {navItems.map((item) => {
 const isActive = pathname === item.href;
 const Icon = item.icon;
 return (
 <Link
 key={item.name}
 href={item.href}
 className={`
 flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium
 ${isActive 
 ? 'bg-primary/20 text-primary border ' 
 : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
 `}
 onClick={() => setSidebarOpen(false)}
 >
 <Icon className="w-5 h-5" />
 {item.name}
 </Link>
 );
 })}
 </div>

 <div className="p-4 border-t space-y-1">
 <Link
 href="/student/settings"
 className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white"
 >
 <Settings className="w-5 h-5" />
 Settings
 </Link>
 <button
 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-red-400 hover:bg-red-400/10"
 onClick={handleLogout}
 >
 <LogOut className="w-5 h-5" />
 Sign Out
 </button>
 </div>
 </aside>

 {/* Mobile Overlay */}
 {isSidebarOpen && (
 <div 
 className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
 onClick={() => setSidebarOpen(false)}
 />
 )}

 {/* Main Content Area */}
 <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
 {/* Abstract Background Elements */}
 <div className="absolute top-0 right-0 w-1/2 h-[300px] blur-[120px] rounded-full pointer-events-none" />
 
 <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
 {children}
 </div>
 </main>
 </div>
 );
}
