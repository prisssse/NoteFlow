import { useEffect, useRef } from "react";
import { Accidental, Formatter, Renderer, Stave, StaveNote, Voice } from "vexflow";

interface StaffNoteProps {
  vexflowKey: string;
  clef: "treble" | "bass";
}

export function StaffNote({ vexflowKey, clef }: StaffNoteProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    container.innerHTML = "";
    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(320, 160);
    const context = renderer.getContext();
    context.setFillStyle("#f8fafc");

    const stave = new Stave(10, 30, 300);
    stave.addClef(clef);
    stave.setContext(context).draw();

    const note = new StaveNote({ clef, keys: [vexflowKey], duration: "q" });
    const accidental = vexflowKey.includes("#")
      ? "#"
      : vexflowKey.includes("b")
        ? "b"
        : null;
    if (accidental) {
      note.addAccidental(0, new Accidental(accidental));
    }

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables([note]);

    new Formatter().joinVoices([voice]).format([voice], 200);
    voice.draw(context, stave);
  }, [vexflowKey, clef]);

  return <div ref={containerRef} className="w-full" />;
}
