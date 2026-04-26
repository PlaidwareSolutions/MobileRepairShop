import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SavedReplies } from "./SavedReplies";
import { findUnfilledPlaceholders, type PlaceholderValues } from "./placeholders";

export type ComposerMode = "email" | "sms";

export type ComposerInitial = {
  to: string;
  subject?: string;
  body: string;
};

export type ComposerProps = {
  open: boolean;
  mode: ComposerMode;
  initial: ComposerInitial;
  fromLabel: string;
  password: string;
  leadType: string;
  placeholderValues?: PlaceholderValues;
  onClose: () => void;
  onSend: (payload: { to: string; subject?: string; body: string }) => Promise<void>;
};

export function Composer({
  open,
  mode,
  initial,
  fromLabel,
  password,
  leadType,
  placeholderValues,
  onClose,
  onSend,
}: ComposerProps) {
  const [to, setTo] = useState(initial.to);
  const [subject, setSubject] = useState(initial.subject ?? "");
  const [body, setBody] = useState(initial.body);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTo(initial.to);
      setSubject(initial.subject ?? "");
      setBody(initial.body);
      setError(null);
      setSending(false);
    }
  }, [open, initial.to, initial.subject, initial.body]);

  const unfilledPlaceholders = useMemo(
    () =>
      findUnfilledPlaceholders(
        mode === "email" ? subject : null,
        body,
      ),
    [mode, subject, body],
  );
  const hasUnfilledPlaceholders = unfilledPlaceholders.length > 0;

  async function handleSend() {
    setError(null);
    setSending(true);
    try {
      await onSend({
        to,
        subject: mode === "email" ? subject : undefined,
        body,
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Send failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-zinc-950 border-2 border-zinc-800 text-white max-w-xl rounded-none" data-testid="composer-modal">
        <DialogHeader>
          <DialogTitle className="font-black uppercase tracking-widest text-white">
            {mode === "email" ? "Send Email" : "Send SMS"}
          </DialogTitle>
        </DialogHeader>
        <div className="text-xs uppercase tracking-widest text-zinc-500 -mt-2 mb-2">
          From: <span className="text-zinc-300">{fromLabel}</span>
        </div>
        <div className="space-y-3">
          <SavedReplies
            password={password}
            channel={mode}
            leadType={leadType}
            placeholderValues={placeholderValues}
            onApply={(tpl) => {
              if (mode === "email" && tpl.subject) setSubject(tpl.subject);
              setBody(tpl.body);
            }}
          />
          <div>
            <Label htmlFor="composer-to" className="font-black uppercase text-xs tracking-widest text-zinc-300">
              To
            </Label>
            <Input
              id="composer-to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-11 text-white"
              data-testid="composer-to"
            />
          </div>
          {mode === "email" && (
            <div>
              <Label htmlFor="composer-subject" className="font-black uppercase text-xs tracking-widest text-zinc-300">
                Subject
              </Label>
              <Input
                id="composer-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 h-11 text-white"
                data-testid="composer-subject"
              />
            </div>
          )}
          <div>
            <Label htmlFor="composer-body" className="font-black uppercase text-xs tracking-widest text-zinc-300">
              {mode === "email" ? "Message" : `Body (${body.length}/1600)`}
            </Label>
            <Textarea
              id="composer-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={mode === "email" ? 10 : 5}
              maxLength={mode === "email" ? 20000 : 1600}
              className="rounded-none bg-black border-2 border-zinc-700 focus:border-red-500 text-white"
              data-testid="composer-body"
            />
          </div>
          {hasUnfilledPlaceholders && (
            <div
              className="bg-yellow-400 text-black px-4 py-3 font-black uppercase text-xs tracking-widest border-2 border-yellow-600"
              data-testid="composer-placeholder-warning"
              role="alert"
            >
              <div>Unfilled placeholders</div>
              <div className="mt-1 font-mono normal-case tracking-normal text-sm break-all">
                {unfilledPlaceholders.map((k) => `{{${k}}}`).join(", ")}
              </div>
              <div className="mt-1 normal-case tracking-normal text-xs font-bold">
                Fix or remove these tokens before sending.
              </div>
            </div>
          )}
          {error && (
            <div className="bg-red-500 text-white px-4 py-3 font-black uppercase text-sm" data-testid="composer-error">
              {error}
            </div>
          )}
          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none border-2 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-900 font-black uppercase tracking-widest"
              data-testid="composer-cancel"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSend}
              disabled={
                sending ||
                !to ||
                (!body && !(mode === "email" && subject)) ||
                hasUnfilledPlaceholders
              }
              title={
                hasUnfilledPlaceholders
                  ? `Unfilled placeholders: ${unfilledPlaceholders
                      .map((k) => `{{${k}}}`)
                      .join(", ")}`
                  : undefined
              }
              className="rounded-none bg-red-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest"
              data-testid="composer-send"
            >
              {sending ? "Sending..." : `Send ${mode === "email" ? "Email" : "SMS"}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
