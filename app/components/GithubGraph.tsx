"use client";

import { GitHubCalendar } from "react-github-calendar";

export function GithubGraph() {
    return (
        <div className="flex w-full justify-center text-xs">
            <GitHubCalendar
                username="PythonHacker24"
                colorScheme="light"
                blockSize={10}
                blockMargin={4}
                fontSize={12}
            />
        </div>
    );
}
