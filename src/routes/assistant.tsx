import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  FileText,
  CalendarDays,
  Search,
  MessageSquare,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  buildEmailPrompt,
  buildHelpdeskPrompt,
  buildMeetingPrompt,
  buildPlannerPrompt,
  buildResearchPrompt,
} from "@/lib/prompts";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI-Powered Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "A prompt-engineering workspace for daily admin workflows: client emails, meeting summaries, 5-day task plans, verified research and IT helpdesk triage.",
      },
      { property: "og:title", content: "AI-Powered Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "Engineer structured, guardrailed AI prompts for emails, meeting minutes, planning, research and internal IT support.",
      },
    ],
  }),
  component: AssistantWorkspace,
});

type TabId = "email" | "meeting" | "planner" | "research" | "helpdesk";

const tabs: Array<{
  id: TabId;
  label: string;
  icon: React.ElementType;
  emoji: string;
  blurb: string;
}> = [
  {
    id: "email",
    label: "Email Generator",
    icon: Mail,
    emoji: "✉️",
    blurb: "Turn an awkward delay into an accountable, empathetic client email under 150 words.",
  },
  {
    id: "meeting",
    label: "Meeting Summarizer",
    icon: FileText,
    emoji: "📝",
    blurb: "Convert a raw transcript into a 3-sentence summary, decisions and owned action items.",
  },
  {
    id: "planner",
    label: "Task Planner",
    icon: CalendarDays,
    emoji: "📅",
    blurb: "Sequence one objective into a dependency-aware 5-day linear schedule.",
  },
  {
    id: "research",
    label: "Research Assistant",
    icon: Search,
    emoji: "🔍",
    blurb: "Compare platforms under strict evidence rules — unproven cells return “Data Unavailable”.",
  },
  {
    id: "helpdesk",
    label: "Helpdesk Chatbot",
    icon: MessageSquare,
    emoji: "💬",
    blurb: "Triage a workspace issue as an internal IT agent that diagnoses before it prescribes.",
  },
];

function Field({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function OutputPanel({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (!value) {
    return (
      <div className="card-exec flex min-h-56 flex-col items-center justify-center gap-2 p-8 text-center">
        <Sparkles className="h-6 w-6 text-primary" aria-hidden="true" />
        <p className="font-semibold">Your engineered prompt appears here</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Fill in the fields on the left, then run the generator. You can copy the full prompt into
          any AI assistant.
        </p>
      </div>
    );
  }

  return (
    <div className="card-exec overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold">Engineered prompt</p>
          <p className="text-xs text-muted-foreground">
            {value.split(/\s+/).length} words · review before sending
          </p>
        </div>
        <Button size="sm" onClick={copy} aria-live="polite">
          {copied ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" /> Copy to Clipboard
            </>
          )}
        </Button>
      </div>
      <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap p-4 text-sm leading-relaxed text-foreground">
        {value}
      </pre>
    </div>
  );
}

function EmailTab({ onGenerate }: { onGenerate: (v: string) => void }) {
  const [client, setClient] = useState("");
  const [project, setProject] = useState("");
  const [reason, setReason] = useState("");

  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(buildEmailPrompt({ client, project, reason }));
      }}
    >
      <Field label="Client name" htmlFor="client">
        <Input
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          placeholder="e.g. Mara Primary School"
        />
      </Field>
      <Field label="Project name" htmlFor="project">
        <Input
          id="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="e.g. Q3 enrolment reporting pack"
        />
      </Field>
      <Field
        label="Reason for delay"
        htmlFor="reason"
        hint="Describe the real cause in one or two lines — the prompt will not invent details."
      >
        <Textarea
          id="reason"
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="e.g. Supplier data arrived three days late, so the reconciliation could not start on schedule."
        />
      </Field>
      <Button type="submit" size="lg">
        Engineer Prompt
      </Button>
    </form>
  );
}

function MeetingTab({ onGenerate }: { onGenerate: (v: string) => void }) {
  const [transcript, setTranscript] = useState("");
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(buildMeetingPrompt(transcript));
      }}
    >
      <Field
        label="Meeting transcript"
        htmlFor="transcript"
        hint="Remove names and personal client records before pasting anything sensitive."
      >
        <Textarea
          id="transcript"
          rows={14}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste the full meeting transcript or your rough notes here…"
        />
      </Field>
      <Button type="submit" size="lg">
        Summarize Meeting
      </Button>
    </form>
  );
}

function PlannerTab({ onGenerate }: { onGenerate: (v: string) => void }) {
  const [objective, setObjective] = useState("");
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(buildPlannerPrompt(objective));
      }}
    >
      <Field
        label="Main business objective"
        htmlFor="objective"
        hint="One outcome, stated as a result — not a list of tasks."
      >
        <Textarea
          id="objective"
          rows={5}
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder="e.g. Move all learner attendance records onto the new admin system by Friday."
        />
      </Field>
      <Button type="submit" size="lg">
        Build 5-Day Plan
      </Button>
    </form>
  );
}

function ResearchTab({ onGenerate }: { onGenerate: (v: string) => void }) {
  const [subjects, setSubjects] = useState("");
  const [criteria, setCriteria] = useState("");
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(buildResearchPrompt({ subjects, criteria }));
      }}
    >
      <Field label="Platforms or competitors to compare" htmlFor="subjects">
        <Input
          id="subjects"
          value={subjects}
          onChange={(e) => setSubjects(e.target.value)}
          placeholder="e.g. Asana vs Monday.com vs Trello"
        />
      </Field>
      <Field
        label="Comparison criteria"
        htmlFor="criteria"
        hint="Anything the model cannot prove will be returned as “Data Unavailable”."
      >
        <Textarea
          id="criteria"
          rows={4}
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          placeholder="e.g. pricing per seat, integrations with Outlook, onboarding time, support hours"
        />
      </Field>
      <Button type="submit" size="lg">
        Engineer Research Prompt
      </Button>
    </form>
  );
}

function HelpdeskTab({ onGenerate }: { onGenerate: (v: string) => void }) {
  const [issue, setIssue] = useState("");
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        onGenerate(buildHelpdeskPrompt(issue));
      }}
    >
      <Field
        label="Technical workspace issue"
        htmlFor="issue"
        hint="Never include passwords or one-time codes — the prompt explicitly forbids requesting them."
      >
        <Textarea
          id="issue"
          rows={6}
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="e.g. Outlook keeps asking me to sign in again every few minutes on the office laptop."
        />
      </Field>
      <Button type="submit" size="lg">
        Start IT Triage
      </Button>
    </form>
  );
}

function Guardrails() {
  const items = [
    {
      title: "Data privacy protection",
      body: "Never paste personal client records, ID numbers, learner details, banking data or credentials into a prompt. Anonymise names and use role labels such as “Client A” instead.",
    },
    {
      title: "Verification protocols",
      body: "Every summary, plan and comparison is manually audited against the source material before it is shared. Unverifiable claims must read “Data Unavailable” rather than a confident guess.",
    },
    {
      title: "Output transparency",
      body: "AI-assisted drafts are labelled as drafts, a named human owner signs off before anything reaches a client, and interpretation is always separated from sourced fact.",
    },
  ];

  return (
    <section
      aria-labelledby="guardrails-heading"
      className="card-exec mt-10 border-primary/25 p-6 sm:p-8"
    >
      <h2 id="guardrails-heading" className="flex items-center gap-2 text-lg font-semibold">
        <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
        🔒 Responsible AI Guardrails &amp; Ethical Policies
      </h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {items.map((i) => (
          <li key={i.title} className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm font-semibold">{i.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AssistantWorkspace() {
  const [active, setActive] = useState<TabId>("email");
  const [output, setOutput] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const current = tabs.find((t) => t.id === active)!;

  function select(id: TabId) {
    setActive(id);
    setOutput("");
    setNavOpen(false);
  }

  const panels: Record<TabId, React.ReactNode> = {
    email: <EmailTab onGenerate={setOutput} />,
    meeting: <MeetingTab onGenerate={setOutput} />,
    planner: <PlannerTab onGenerate={setOutput} />,
    research: <ResearchTab onGenerate={setOutput} />,
    helpdesk: <HelpdeskTab onGenerate={setOutput} />,
  };

  const nav = (
    <nav aria-label="Workspace tabs" className="grid gap-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => select(t.id)}
          aria-current={active === t.id ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
            active === t.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
        >
          <t.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="theme-exec min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold leading-tight sm:text-base">
                AI-Powered Workplace Productivity Assistant
              </p>
              <p className="text-xs text-muted-foreground">
                Prompt engineering for daily administrative workflows
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? "Close workspace menu" : "Open workspace menu"}
            aria-expanded={navOpen}
            className="rounded-lg border border-border p-2 lg:hidden"
          >
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {navOpen && (
          <div className="border-t border-border bg-card px-4 py-3 lg:hidden">{nav}</div>
        )}
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:py-10">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="card-exec sticky top-24 bg-sidebar p-3">
            <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </p>
            {nav}
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="card-exec p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {current.emoji} Module
            </p>
            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{current.label}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {current.blurb}
            </p>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section aria-label={`${current.label} inputs`} className="card-exec p-6">
              {panels[active]}
            </section>
            <section aria-label="Generated prompt">
              <OutputPanel value={output} />
            </section>
          </div>

          <Guardrails />
        </main>
      </div>
    </div>
  );
}
