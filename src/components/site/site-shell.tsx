import type { ReactNode } from "react";
import { SystemSidebar } from "./system-sidebar";
import { CommandBar } from "./command-bar";
import { HudWidget } from "./hud-widget";
import { CursorGlow } from "./cursor-glow";
import { ResumeProvider } from "./resume-modal";

/**
 * The persistent "system terminal" chrome: icon rail on the left,
 * command bar on top, radial HUD bottom-right. Wraps every page.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ResumeProvider>
      <div className="relative min-h-screen">
        <CursorGlow />
        <SystemSidebar />
        <div className="md:pl-[76px] lg:pl-[210px]">
          <CommandBar />
          <main className="relative z-10 pb-28 md:pb-0">{children}</main>
        </div>
        <HudWidget />
      </div>
    </ResumeProvider>
  );
}
