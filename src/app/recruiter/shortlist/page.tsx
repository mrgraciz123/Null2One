"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Users } from "lucide-react";

export default function ShortlistPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-8 h-8 text-primary" />
            Candidate Shortlist
          </h1>
          <p className="text-muted-foreground mt-1">Review and manage candidates you've saved.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="surface-panel ">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Saved Profiles
            </CardTitle>
            <CardDescription>Your shortlisted talent pool.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-12 text-muted-foreground bg-background/30 rounded-xl border border-border/30 border-dashed">
              <Bookmark className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
              <p>You haven't shortlisted any candidates yet. Browse the Talent Search to find matches.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
