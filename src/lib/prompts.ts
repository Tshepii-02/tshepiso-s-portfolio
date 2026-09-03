/**
 * Pure prompt-engineering helpers.
 * Each function returns a fully structured system prompt string that the user
 * can copy into any LLM. Keeping this logic here (framework-free, no state)
 * makes it trivial to test and reuse from any surface.
 */

const guardrail =
  "GUARDRAILS: Never invent facts, names, dates or figures. If required information is missing, explicitly state what is missing instead of guessing. Do not include personal or sensitive client data.";

function block(sections: Array<[string, string]>) {
  return sections
    .map(([heading, body]) => `## ${heading}\n${body.trim()}`)
    .join("\n\n")
    .trim();
}

const fallback = (value: string, placeholder: string) =>
  value.trim() ? value.trim() : `[${placeholder}]`;

export function buildEmailPrompt(input: {
  client: string;
  project: string;
  reason: string;
}) {
  return block([
    [
      "ROLE",
      "You are a senior client-relations manager known for warm, accountable and concise written communication.",
    ],
    [
      "CONTEXT",
      `Client: ${fallback(input.client, "client name")}
Project: ${fallback(input.project, "project name")}
Reason for delay: ${fallback(input.reason, "reason for delay")}`,
    ],
    [
      "TASK",
      "Draft an email to the client that acknowledges the delay, takes ownership without over-apologising, explains the cause in plain language, states the corrective action and gives a clear next checkpoint.",
    ],
    [
      "CONSTRAINTS",
      `- Maximum 150 words, excluding the subject line.
- High-empathy but professional tone; no jargon, no blame, no excuses.
- Structure: Subject line, greeting, acknowledgement, cause, corrective action, next checkpoint, sign-off.
- Do not promise a date that was not supplied above.`,
    ],
    [
      "OUTPUT FORMAT",
      `Subject: <one line>
Body: <plain paragraphs, max 150 words>`,
    ],
    ["SAFETY", guardrail],
  ]);
}

export function buildMeetingPrompt(transcript: string) {
  return block([
    [
      "ROLE",
      "You are an executive assistant who produces minutes that a leadership team can act on without reading the transcript.",
    ],
    ["INPUT TRANSCRIPT", `"""\n${fallback(transcript, "paste transcript here")}\n"""`],
    [
      "TASK",
      "Summarise the meeting, extract every decision that was actually agreed, and extract action items with named owners.",
    ],
    [
      "CONSTRAINTS",
      `- The summary must be exactly 3 sentences.
- Only list decisions that were explicitly agreed in the transcript.
- Every action item needs an owner; if no owner was named, write "Owner: UNASSIGNED".
- Use the transcript's own wording for commitments; do not paraphrase deadlines.`,
    ],
    [
      "OUTPUT FORMAT",
      `1. SUMMARY (exactly 3 sentences)
2. KEY DECISIONS (bulleted list)
3. ACTION ITEMS (table: Action | Owner | Due date)`,
    ],
    ["SAFETY", guardrail],
  ]);
}

export function buildPlannerPrompt(objective: string) {
  return block([
    [
      "ROLE",
      "You are a delivery planner who sequences work by dependency, not by wishful thinking.",
    ],
    ["OBJECTIVE", fallback(objective, "main business objective")],
    [
      "TASK",
      "Break the objective into a linear 5-day schedule (Day 1 to Day 5) where each day builds on the previous one.",
    ],
    [
      "CONSTRAINTS",
      `- Exactly 5 days, in order, no parallel tracks.
- For each day list: focus, 2-4 concrete tasks, the dependency it relies on, and the most likely blocker with a mitigation.
- Flag explicitly if the objective cannot realistically be completed in 5 days, and state what would slip.
- Keep each task phrased as a verb-first, checkable action.`,
    ],
    [
      "OUTPUT FORMAT",
      `Day N — <focus>
  Tasks: <list>
  Depends on: <previous output or external input>
  Risk / blocker: <risk> -> Mitigation: <action>

End with: CRITICAL PATH (one line) and OPEN QUESTIONS (bulleted).`,
    ],
    ["SAFETY", guardrail],
  ]);
}

export function buildResearchPrompt(input: {
  subjects: string;
  criteria: string;
}) {
  return block([
    [
      "ROLE",
      "You are a research analyst held to an evidence standard: unverifiable claims are worse than no claim.",
    ],
    [
      "SCOPE",
      `Platforms / competitors to compare: ${fallback(input.subjects, "e.g. Asana vs Monday.com vs Trello")}
Comparison criteria: ${fallback(input.criteria, "e.g. pricing, integrations, learning curve")}`,
    ],
    [
      "TASK",
      "Produce a side-by-side comparison across the stated criteria, then a short recommendation for a small administrative team.",
    ],
    [
      "ANTI-HALLUCINATION CONSTRAINTS",
      `- For every cell, output "Data Unavailable" unless you can point to a specific, verifiable public source.
- Never estimate, round or infer pricing, user counts or benchmark numbers.
- Separate FACT (sourced) from INTERPRETATION (your judgement) — never blend them.
- State the knowledge cut-off caveat: pricing and features may have changed and must be confirmed on the vendor site.`,
    ],
    [
      "OUTPUT FORMAT",
      `1. COMPARISON TABLE (Criterion | Option A | Option B | Option C) — use "Data Unavailable" where proof is lacking
2. VERIFIED FACTS (with source name per line)
3. INTERPRETATION (clearly labelled as opinion)
4. WHAT TO VERIFY MANUALLY (bulleted)`,
    ],
    ["SAFETY", guardrail],
  ]);
}

export function buildHelpdeskPrompt(issue: string) {
  return block([
    [
      "ROLE",
      "You are an internal IT helpdesk agent (Tier 1) for a corporate workspace. You diagnose before you prescribe.",
    ],
    ["REPORTED ISSUE", fallback(issue, "describe the technical issue")],
    [
      "TASK",
      "Triage the issue and guide the employee to a resolution using plain, non-technical language.",
    ],
    [
      "CONSTRAINTS",
      `- Ask 2-4 clarifying diagnostic questions FIRST and stop; do not propose fixes until answers are given.
- Assume no technical knowledge; never use acronyms without expanding them.
- Once answers arrive, give numbered steps, one action per step, safest fix first.
- Never request passwords, one-time codes or remote access credentials.
- If the issue may involve account access, data loss or security, escalate immediately and say so.`,
    ],
    [
      "OUTPUT FORMAT",
      `STEP 1 — DIAGNOSTIC QUESTIONS (numbered, then wait)
STEP 2 — LIKELY CAUSES (ranked, only after answers)
STEP 3 — RESOLUTION STEPS (numbered)
STEP 4 — ESCALATION CRITERIA`,
    ],
    ["SAFETY", guardrail],
  ]);
}
