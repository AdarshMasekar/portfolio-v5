"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceItemProps {
    title: string;
    role: string;
    children: React.ReactNode;
    collapsible?: boolean;
    link?: string;
    collapsedHeight?: string;
}

export function ExperienceItem({ title, role, children, collapsible = false, link, collapsedHeight = "max-h-20" }: ExperienceItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group">
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-black">{title}</span>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 underline underline-offset-2 hover:text-black"
                        >
                            link
                        </a>
                    )}
                </div>
                <span className="text-sm text-gray-400">{role}</span>
            </div>

            <div className={`relative max-w-xl text-sm leading-relaxed text-gray-500 transition-all duration-300 ${!isExpanded && collapsible ? `${collapsedHeight} overflow-hidden` : ""}`}>
                {children}
                {collapsible && !isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                )}
            </div>

            {collapsible && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-black"
                >
                    {isExpanded ? (
                        <>
                            View Less <ChevronUp className="h-3 w-3" />
                        </>
                    ) : (
                        <>
                            View More <ChevronDown className="h-3 w-3" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
