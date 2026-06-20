"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Briefcase } from "lucide-react";

export default function OrganizationPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            My Organization
          </h1>
          <p className="text-muted-foreground mt-1">Manage your company profile and team members.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="surface-panel ">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Team Management
            </CardTitle>
            <CardDescription>Invite recruiters and manage roles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-12 text-muted-foreground bg-background/30 rounded-xl border border-border/30 border-dashed">
              <Briefcase className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
              <p>Organization management features will be available soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
