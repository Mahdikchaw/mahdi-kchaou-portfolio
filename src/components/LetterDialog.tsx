import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";
import type { Reference } from "@/data/profile";

/** Accessible letter viewer: focus-trapped, Esc to close, scroll-locked.
 *  Inline iframe on capable viewports; always offers download + open-in-tab. */
export function LetterDialog({
  reference,
  onClose,
}: {
  reference: Reference | null;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!reference) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [reference, onClose]);

  return createPortal(
    <AnimatePresence>
      {reference && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-abyss/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${reference.kind} from ${reference.author}, ${reference.org}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="panel relative flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* header */}
            <div className="flex items-start justify-between gap-4 border-b border-line p-5">
              <div>
                <p className="eyebrow text-current">{reference.kind}</p>
                <p className="mt-1.5 font-display text-base font-semibold text-foam">
                  {reference.author}
                  <span className="font-sans font-normal text-mist"> · {reference.org}</span>
                </p>
                <p className="font-mono text-xs text-mist-dim">{reference.context}</p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close letter"
                className="shrink-0 rounded-lg border border-line p-2 text-mist transition-colors hover:border-ocean hover:text-foam"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* document */}
            <div className="relative min-h-0 flex-1 bg-abyss">
              <iframe
                src={`${reference.pdf}#view=FitH`}
                title={`Letter from ${reference.author}`}
                className="h-full w-full"
              />
            </div>

            {/* actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line p-4">
              <span className="font-mono text-xs text-mist-dim">
                signed original · verify the quote yourself
              </span>
              <div className="flex gap-2">
                <a
                  href={reference.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line-bright px-3.5 py-2 text-sm font-medium text-foam transition-colors hover:border-ocean hover:text-current"
                >
                  <ExternalLink className="h-4 w-4" /> Open in new tab
                </a>
                <a
                  href={reference.pdf}
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-foam px-3.5 py-2 text-sm font-semibold text-abyss transition-transform hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4" /> Download
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
