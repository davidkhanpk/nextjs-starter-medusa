import React from "react";
import { PuckRenderer } from "../puck/PuckRenderer";
import { PuckPageData } from "../puck/data";

export interface TemplateRendererProps {
  page: PuckPageData;
  children?: React.ReactNode;
}

/**
 * Dual Rendering System
 * Routes to correct renderer based on template editorType
 */
export function TemplateRenderer({ page, children }: TemplateRendererProps) {
  // If page uses Puck editor, render with Puck
  if (page.editorType === "PUCK" && page.puckData) {
    return <PuckRenderer data={page.puckData} templateType={page.templateType} />;
  }
  
  // If page uses zone-based editor, render with existing system
  if (page.editorType === "ZONE_BASED" && page.zoneData) {
    return <ZoneBasedRenderer data={page.zoneData} templateType={page.templateType} />;
  }
  
  // Fallback: render children or nothing
  return <>{children}</>;
}

/**
 * Zone-Based Renderer
 * Renders pages built with the existing zone-based template system
 */
function ZoneBasedRenderer({ data, templateType }: { data: any; templateType: string }) {
  // This is a placeholder - the actual zone-based renderer
  // should be imported from the existing implementation
  
  // For now, render a message
  return (
    <div className="zone-based-renderer">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Zone-Based Template
          </h3>
          <p className="text-yellow-800">
            This page uses the zone-based template system. Integrate with your existing
            zone-based renderer here.
          </p>
          <div className="mt-4 text-xs font-mono text-yellow-700">
            Template Type: {templateType}
          </div>
        </div>
      </div>
    </div>
  );
}
