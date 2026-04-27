import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  adminCreateReplyTemplate,
  adminDeleteReplyTemplate,
  adminListReplyTemplates,
  adminReorderReplyTemplates,
  adminUpdateReplyTemplate,
  type ReplyTemplate,
} from "@/lib/api";
import type { LeadType } from "./types";
import {
  applyPlaceholders,
  findUnfilledPlaceholders,
  placeholderKeysForScope,
  type PlaceholderValues,
} from "./placeholders";

const LEAD_TYPE_LABEL: Record<string, string> = {
  "repair-quote": "Repair Quote",
  "sell-phone": "Sell Phone",
  appointment: "Appointment",
  contact: "Contact",
  reservation: "Reservation",
};

const LEAD_TYPE_OPTIONS: { value: ""; label: string }[] | { value: string; label: string }[] = [
  { value: "", label: "Any lead type" },
  { value: "repair-quote", label: "Repair Quote" },
  { value: "sell-phone", label: "Sell Phone" },
  { value: "appointment", label: "Appointment" },
  { value: "contact", label: "Contact" },
  { value: "reservation", label: "Reservation" },
];

export type SavedRepliesProps = {
  password: string;
  channel: "email" | "sms";
  leadType: LeadType | string;
  placeholderValues?: PlaceholderValues;
  onApply: (tpl: { subject: string | null; body: string }) => void;
};

type EditState =
  | { mode: "list" }
  | { mode: "new" }
  | { mode: "edit"; id: number };

export function SavedReplies({
  password,
  channel,
  leadType,
  placeholderValues,
  onApply,
}: SavedRepliesProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"pick" | "manage">("pick");
  const [edit, setEdit] = useState<EditState>({ mode: "list" });
  const [items, setItems] = useState<ReplyTemplate[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for new/edit
  const [name, setName] = useState("");
  const [scope, setScope] = useState<string>(leadType);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const formSubjectRef = useRef<HTMLInputElement>(null);
  const formBodyRef = useRef<HTMLTextAreaElement>(null);
  const [formLastFocused, setFormLastFocused] = useState<"subject" | "body">(
    "body",
  );

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await adminListReplyTemplates(password);
      setItems(res.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && items === null) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Templates that match this composer (channel match; leadType null = applies to all)
  const matching = useMemo(() => {
    if (!items) return [];
    return items
      .filter(
        (t) =>
          t.channel === channel &&
          (t.leadType == null || t.leadType === leadType),
      )
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  }, [items, channel, leadType]);

  // For the manage tab, show all so admin can see/edit everything regardless of current scope.
  const allForChannel = useMemo(() => {
    if (!items) return [];
    return items
      .filter((t) => t.channel === channel)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
  }, [items, channel]);

  function startNew() {
    setEdit({ mode: "new" });
    setName("");
    setScope(leadType);
    setSubject("");
    setBody("");
    setError(null);
    setFormLastFocused(channel === "email" ? "subject" : "body");
  }

  function startEdit(t: ReplyTemplate) {
    setEdit({ mode: "edit", id: t.id });
    setName(t.name);
    setScope(t.leadType ?? "");
    setSubject(t.subject ?? "");
    setBody(t.body);
    setError(null);
    setFormLastFocused(channel === "email" ? "subject" : "body");
  }

  function insertFormPlaceholder(key: string) {
    const token = `{{${key}}}`;
    const target =
      channel === "email" && formLastFocused === "subject" ? "subject" : "body";
    if (target === "subject") {
      const el = formSubjectRef.current;
      const start = el?.selectionStart ?? subject.length;
      const end = el?.selectionEnd ?? subject.length;
      const next = subject.slice(0, start) + token + subject.slice(end);
      setSubject(next);
      requestAnimationFrame(() => {
        const node = formSubjectRef.current;
        if (!node) return;
        node.focus();
        const pos = start + token.length;
        node.setSelectionRange(pos, pos);
      });
    } else {
      const el = formBodyRef.current;
      const start = el?.selectionStart ?? body.length;
      const end = el?.selectionEnd ?? body.length;
      const next = body.slice(0, start) + token + body.slice(end);
      setBody(next);
      requestAnimationFrame(() => {
        const node = formBodyRef.current;
        if (!node) return;
        node.focus();
        const pos = start + token.length;
        node.setSelectionRange(pos, pos);
      });
    }
  }

  async function saveForm() {
    if (!name.trim() || !body.trim()) {
      setError("Name and body are required");
      return;
    }
    if (unknownKeys.length > 0) {
      const list = unknownKeys.map((k) => `{{${k}}}`).join(", ");
      const ok = confirm(
        `This reply contains unknown placeholders that won't be filled in: ${list}.\n\nThey'll be sent literally to the customer. Save anyway?`,
      );
      if (!ok) return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: name.trim(),
        channel,
        leadType: scope ? scope : null,
        subject: channel === "email" ? (subject.trim() || null) : null,
        body,
      };
      if (edit.mode === "new") {
        await adminCreateReplyTemplate(password, payload);
      } else if (edit.mode === "edit") {
        await adminUpdateReplyTemplate(password, edit.id, payload);
      }
      await load();
      setEdit({ mode: "list" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!confirm("Delete this saved reply?")) return;
    setError(null);
    try {
      await adminDeleteReplyTemplate(password, id);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function move(id: number, direction: -1 | 1) {
    if (!items) return;
    // Reorder within the current channel only — the server keeps cross-channel
    // ordering stable by pushing unsubmitted ids to the end.
    const channelItems = items
      .filter((t) => t.channel === channel)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
    const idx = channelItems.findIndex((t) => t.id === id);
    if (idx === -1) return;
    const target = idx + direction;
    if (target < 0 || target >= channelItems.length) return;
    const reordered = channelItems.slice();
    const [moved] = reordered.splice(idx, 1);
    reordered.splice(target, 0, moved);

    // Optimistic update so arrows feel snappy even on slow links.
    const prev = items;
    const reorderedIds = new Set(reordered.map((t) => t.id));
    const optimistic = items.map((t) => {
      if (!reorderedIds.has(t.id)) return t;
      const newIdx = reordered.findIndex((r) => r.id === t.id);
      return { ...t, sortOrder: (newIdx + 1) * 10 };
    });
    setItems(optimistic);
    setError(null);
    try {
      await adminReorderReplyTemplates(password, reordered.map((t) => t.id));
      await load();
    } catch (e) {
      setItems(prev);
      setError(e instanceof Error ? e.message : "Reorder failed");
    }
  }

  function applyTemplate(t: ReplyTemplate) {
    const values = placeholderValues ?? {};
    onApply({
      subject: t.subject == null ? null : applyPlaceholders(t.subject, values),
      body: applyPlaceholders(t.body, values),
    });
    setOpen(false);
  }

  const hintKeys = useMemo(() => placeholderKeysForScope(scope), [scope]);

  // Find any {{...}} tokens in the saved-reply form that aren't valid for the
  // current scope. We check subject + body together so admins catch typos in
  // either field before the reply is ever applied to a real lead.
  const unknownKeys = useMemo(() => {
    const validSet = new Set(hintKeys);
    const tokens = findUnfilledPlaceholders(
      channel === "email" ? subject : null,
      body,
    );
    return tokens.filter((k) => !validSet.has(k));
  }, [hintKeys, subject, body, channel]);

  return (
    <div className="border-2 border-zinc-300 bg-zinc-100" data-testid="saved-replies">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          setView("pick");
          setEdit({ mode: "list" });
        }}
        className="w-full flex items-center justify-between px-3 py-2 font-black uppercase text-xs tracking-widest text-zinc-800 hover:bg-zinc-200"
        data-testid="saved-replies-toggle"
      >
        <span>
          Saved Replies{" "}
          {items && (
            <span className="text-zinc-500 font-normal">({matching.length})</span>
          )}
        </span>
        <span className="text-zinc-500">{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <div className="border-t-2 border-zinc-300 p-3 space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setView("pick")}
              className={`px-2 py-1 font-black uppercase text-[10px] tracking-widest border-2 ${
                view === "pick"
                  ? "bg-white text-black border-white"
                  : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-white"
              }`}
              data-testid="saved-replies-tab-pick"
            >
              Pick
            </button>
            <button
              type="button"
              onClick={() => {
                setView("manage");
                setEdit({ mode: "list" });
              }}
              className={`px-2 py-1 font-black uppercase text-[10px] tracking-widest border-2 ${
                view === "manage"
                  ? "bg-white text-black border-white"
                  : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-white"
              }`}
              data-testid="saved-replies-tab-manage"
            >
              Manage
            </button>
            {view === "manage" && edit.mode === "list" && (
              <Button
                type="button"
                onClick={startNew}
                className="ml-auto rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest text-[10px] h-7 px-2"
                data-testid="saved-replies-new"
              >
                + New
              </Button>
            )}
          </div>

          {error && (
            <div
              className="bg-red-500 text-zinc-900 px-3 py-2 font-black uppercase text-xs"
              data-testid="saved-replies-error"
            >
              {error}
            </div>
          )}

          {loading && (
            <div className="text-xs uppercase tracking-widest text-zinc-500">
              Loading…
            </div>
          )}

          {view === "pick" && !loading && (
            <div className="space-y-2 max-h-56 overflow-auto" data-testid="saved-replies-pick-list">
              {matching.length === 0 && (
                <div className="text-xs uppercase tracking-widest text-zinc-500">
                  No saved {channel} replies
                  {leadType ? ` for ${LEAD_TYPE_LABEL[leadType] ?? leadType}` : ""}.
                  Switch to Manage to add one.
                </div>
              )}
              {matching.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => applyTemplate(t)}
                  className="w-full text-left bg-white border-2 border-zinc-300 hover:border-red-500 px-3 py-2"
                  data-testid={`saved-replies-apply-${t.id}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black uppercase text-xs tracking-widest text-zinc-900">
                      {t.name}
                    </span>
                    <span className="px-1.5 py-0.5 font-black uppercase text-[9px] tracking-widest bg-zinc-200 text-zinc-700">
                      {t.leadType ? LEAD_TYPE_LABEL[t.leadType] ?? t.leadType : "ANY"}
                    </span>
                  </div>
                  {t.subject && (
                    <div className="text-[11px] text-zinc-600 mt-1 truncate">
                      {t.subject}
                    </div>
                  )}
                  <div className="text-[11px] text-zinc-500 mt-1 line-clamp-2 whitespace-pre-wrap">
                    {t.body.replace(/<[^>]+>/g, " ").slice(0, 140)}
                  </div>
                </button>
              ))}
            </div>
          )}

          {view === "manage" && !loading && edit.mode === "list" && (
            <div className="space-y-2 max-h-56 overflow-auto" data-testid="saved-replies-manage-list">
              {allForChannel.length === 0 && (
                <div className="text-xs uppercase tracking-widest text-zinc-500">
                  No saved {channel} replies yet.
                </div>
              )}
              {allForChannel.map((t, idx) => (
                <div
                  key={t.id}
                  className="bg-white border-2 border-zinc-300 px-3 py-2"
                  data-testid={`saved-replies-row-${t.id}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black uppercase text-xs tracking-widest text-zinc-900">
                      {t.name}
                    </span>
                    <span className="px-1.5 py-0.5 font-black uppercase text-[9px] tracking-widest bg-zinc-200 text-zinc-700">
                      {t.leadType ? LEAD_TYPE_LABEL[t.leadType] ?? t.leadType : "ANY"}
                    </span>
                    <div className="ml-auto flex gap-1">
                      <button
                        type="button"
                        onClick={() => move(t.id, -1)}
                        disabled={idx === 0}
                        aria-label="Move up"
                        title="Move up"
                        className="px-2 py-1 font-black uppercase text-[10px] tracking-widest border-2 bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-zinc-300"
                        data-testid={`saved-replies-move-up-${t.id}`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => move(t.id, 1)}
                        disabled={idx === allForChannel.length - 1}
                        aria-label="Move down"
                        title="Move down"
                        className="px-2 py-1 font-black uppercase text-[10px] tracking-widest border-2 bg-zinc-100 border-zinc-300 text-zinc-700 hover:border-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-zinc-300"
                        data-testid={`saved-replies-move-down-${t.id}`}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(t)}
                        className="px-2 py-1 font-black uppercase text-[10px] tracking-widest border-2 bg-zinc-100 border-zinc-300 text-red-500 hover:border-red-500"
                        data-testid={`saved-replies-edit-${t.id}`}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(t.id)}
                        className="px-2 py-1 font-black uppercase text-[10px] tracking-widest border-2 bg-zinc-100 border-zinc-300 text-red-400 hover:border-red-400"
                        data-testid={`saved-replies-delete-${t.id}`}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "manage" && (edit.mode === "new" || edit.mode === "edit") && (
            <div className="space-y-2" data-testid="saved-replies-form">
              <div>
                <Label
                  htmlFor="tpl-name"
                  className="font-black uppercase text-[10px] tracking-widest text-zinc-700"
                >
                  Name
                </Label>
                <Input
                  id="tpl-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Quote ready"
                  className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-9 text-zinc-900"
                  data-testid="saved-replies-form-name"
                />
              </div>
              <div>
                <Label
                  htmlFor="tpl-scope"
                  className="font-black uppercase text-[10px] tracking-widest text-zinc-700"
                >
                  Scope (lead type)
                </Label>
                <select
                  id="tpl-scope"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-9 text-zinc-900 px-2"
                  data-testid="saved-replies-form-scope"
                >
                  {LEAD_TYPE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="bg-white border-2 border-zinc-300 px-3 py-2"
                data-testid="saved-replies-form-placeholder-hint"
              >
                <div className="font-black uppercase text-[10px] tracking-widest text-zinc-600 mb-1">
                  Insert placeholder
                  <span className="ml-2 text-zinc-600 font-normal normal-case tracking-normal">
                    into{" "}
                    {channel === "email" && formLastFocused === "subject"
                      ? "Subject"
                      : "Body"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {hintKeys.map((k) => (
                    <button
                      key={k}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => insertFormPlaceholder(k)}
                      className="px-1.5 py-0.5 bg-zinc-100 border border-zinc-300 hover:border-red-500 text-[11px] text-zinc-800 font-mono"
                      data-testid={`saved-replies-form-placeholder-${k}`}
                    >{`{{${k}}}`}</button>
                  ))}
                </div>
                <div className="text-[10px] text-zinc-500 mt-1">
                  Click a token to insert it at the cursor of the focused field.
                  Filled in from the lead when you apply this reply.
                </div>
              </div>
              {unknownKeys.length > 0 && (
                <div
                  className="bg-red-500 text-black px-3 py-2 border-2 border-red-500"
                  data-testid="saved-replies-form-unknown-placeholders"
                >
                  <div className="font-black uppercase text-[10px] tracking-widest mb-1">
                    Unknown placeholders
                  </div>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {unknownKeys.map((k) => (
                      <code
                        key={k}
                        className="px-1.5 py-0.5 bg-white text-red-500 text-[11px] font-mono"
                        data-testid={`saved-replies-form-unknown-${k}`}
                      >{`{{${k}}}`}</code>
                    ))}
                  </div>
                  <div className="text-[10px]">
                    These won't be filled in — check for typos against the available placeholders above.
                  </div>
                </div>
              )}
              {channel === "email" && (
                <div>
                  <Label
                    htmlFor="tpl-subject"
                    className="font-black uppercase text-[10px] tracking-widest text-zinc-700"
                  >
                    Subject (optional)
                  </Label>
                  <Input
                    id="tpl-subject"
                    ref={formSubjectRef}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onFocus={() => setFormLastFocused("subject")}
                    className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 h-9 text-zinc-900"
                    data-testid="saved-replies-form-subject"
                  />
                </div>
              )}
              <div>
                <Label
                  htmlFor="tpl-body"
                  className="font-black uppercase text-[10px] tracking-widest text-zinc-700"
                >
                  Body
                </Label>
                <Textarea
                  id="tpl-body"
                  ref={formBodyRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  onFocus={() => setFormLastFocused("body")}
                  rows={5}
                  className="rounded-none bg-white border-2 border-zinc-300 focus:border-red-500 text-zinc-900"
                  data-testid="saved-replies-form-body"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEdit({ mode: "list" })}
                  className="rounded-none border-2 border-zinc-300 bg-transparent text-zinc-700 hover:bg-zinc-100 font-black uppercase tracking-widest text-[10px] h-8 px-3"
                  data-testid="saved-replies-form-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={saveForm}
                  disabled={saving || !name || !body}
                  className="rounded-none bg-red-500 hover:bg-white hover:text-black text-zinc-900 font-black uppercase tracking-widest text-[10px] h-8 px-3"
                  data-testid="saved-replies-form-save"
                >
                  {saving ? "Saving…" : edit.mode === "new" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
