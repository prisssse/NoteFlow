export interface MidiInputDevice {
  id: string;
  name: string;
}

export class MidiService {
  private access: MIDIAccess | null = null;
  private selectedInput: MIDIInput | null = null;

  get isSupported(): boolean {
    return typeof navigator !== "undefined" && "requestMIDIAccess" in navigator;
  }

  async init(): Promise<void> {
    if (!this.isSupported) {
      return;
    }
    this.access = await navigator.requestMIDIAccess();
  }

  listInputs(): MidiInputDevice[] {
    if (!this.access) {
      return [];
    }
    return Array.from(this.access.inputs.values()).map((input) => ({
      id: input.id,
      name: input.name ?? "MIDI Input"
    }));
  }

  selectInput(id: string) {
    if (!this.access) {
      return;
    }
    const input = this.access.inputs.get(id) ?? null;
    if (this.selectedInput) {
      this.selectedInput.onmidimessage = null;
    }
    this.selectedInput = input;
  }

  onNoteOn(cb: (midi: number, velocity: number) => void): () => void {
    const input = this.selectedInput;
    if (!input) {
      return () => undefined;
    }
    const handler = (event: MIDIMessageEvent) => {
      const [status, midi, velocity] = event.data;
      const command = status & 0xf0;
      if (command === 0x90 && velocity > 0) {
        cb(midi, velocity);
      }
    };
    input.onmidimessage = handler;
    return () => {
      if (input.onmidimessage === handler) {
        input.onmidimessage = null;
      }
    };
  }
}
