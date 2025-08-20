import fetch from "node-fetch";   // Make sure you did: npm install node-fetch

const API_URL = "http://20.244.56.144/evaluation-service/logs";

// Your JWT access token
   const AUTH_TOKEN =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiaGFyYXRoa3VyYXNhQGdtYWlsLmNvbSIsImV4cCI6MTc1NTY3NDI5OSwiaWF0IjoxNzU1NjczMzk5LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiOTQ0MDNhMTMtMDEzZS00ZDlmLWJiYmQtOTEzZTFhZjg0MTY4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYmhhcmF0aCBzYWkiLCJzdWIiOiJmZWRlNjYxNC1mNTgzLTQyYjctOTY1ZS02Yjk5MzBhNDNmZjcifSwiZW1haWwiOiJiaGFyYXRoa3VyYXNhQGdtYWlsLmNvbSIsIm5hbWUiOiJiaGFyYXRoIHNhaSIsInJvbGxObyI6IjIyYTUxYTA1ZjciLCJhY2Nlc3NDb2RlIjoiV3FVeFRYIiwiY2xpZW50SUQiOiJmZWRlNjYxNC1mNTgzLTQyYjctOTY1ZS02Yjk5MzBhNDNmZjciLCJjbGllbnRTZWNyZXQiOiJSRmtHWWNDZ05ZcWVmWE1OIn0.Lc9EkI7J0lSuT6w1nbqbl6uY7DWneQkkf_FsoOQ3iV4";

// Allowed values
const STACKS = ["backend", "frontend"];
const LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];
const COMMON_PACKAGES = ["auth", "config", "middleware", "utils"];

function validateInputs(stack, level, pkg) {
    if (!STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
    if (!LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);

    let validPackages = [...COMMON_PACKAGES];
    if (stack === "backend") validPackages.push(...BACKEND_PACKAGES);
    if (stack === "frontend") validPackages.push(...FRONTEND_PACKAGES);

    if (!validPackages.includes(pkg)) throw new Error(`Invalid package: ${pkg}`);
}

export async function Log(stack, level, pkg, message) {
    try {
        validateInputs(stack, level, pkg);

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${AUTH_TOKEN}`   // ✅ fixed
            },
            body: JSON.stringify({ stack, level, package: pkg, message })
        });

        const data = await response.json();
        console.log("Log Response:", data);

        return data;
    } catch (error) {
        console.error("Logging Failed:", error.message);
        return { error: error.message };
    }
}

// Example usage
Log("backend", "error", "handler", "received string, expected bool");
Log("backend", "fatal", "db", "Critical database connection failure.");
