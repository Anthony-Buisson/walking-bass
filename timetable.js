// Shared by the timetable and the map: the line-up and the time-of-day logic (18h00 – 05h00, midnight wrap).
// Timetable transcribed from the official flyer. Times are "HH:MM"; slots past midnight belong to the same night.
const STAGES = { arcane: "Arcane", station: "Station" };
const ARTISTS = {
  "Tremplin": { tags: ["Scène tremplin", "Talents locaux"] },
  "Insane Creatures": { tags: ["Industrial Techno", "Dark Techno", "EBM"] },
  "Medusa": { tags: ["Hard Techno", "Acid Techno", "Hard Trance"] },
  "Mandragora": { tags: ["Futureprog", "Psytrance", "Tech House"] },
  "Creeds": { tags: ["Hard Techno", "Reverse Bass", "Hard Trance"] },
  "Vladimir Cauchemar": { tags: ["Electro", "Trap", "Rave Techno"] },
  "LESSSS": { tags: ["Schranz", "Industrial Techno", "Hard Techno"] },
  "Onlynumbers": { tags: ["Hard Techno", "Industrial Techno"] },
  "Lil Texas": { tags: ["Texcore", "Gabber", "Frenchcore"] },
  "Unicorn on K": { tags: ["Uptempo", "Hardcore"] },
  "GEA": { tags: ["Hard Techno"] },
  "Mara": { tags: ["Industrial Techno", "Dark Techno"] },
  "AJJA": { tags: ["Psytrance", "Full-On"] },
  "Gonzi": { tags: ["Psytrance", "Hard Techno", "Hard Dance", "Hardcore"] },
  "FLKN": { tags: ["Hard Techno"] },
  "Samuel Moriero": { tags: ["Hard Techno", "Dark Techno"] },
  "Vortek's B2B Omaks": { tags: ["Hardcore Techno", "Hard Techno", "Acid Techno"], members: "Vortek's et Omaks en back to back" },
  "Dual Damage": { tags: ["Raw Hardstyle", "Hardstyle"] },
  "Yoshiko": { tags: ["Hardcore", "Hardstyle", "Techno"] }
};
const SLOTS = [
  ["arcane", "Tremplin", "18:00", "19:30"],
  ["arcane", "Insane Creatures", "19:30", "20:30"],
  ["arcane", "Medusa", "20:30", "21:30"],
  ["arcane", "Mandragora", "21:30", "22:30"],
  ["arcane", "Creeds", "22:30", "23:30"],
  ["arcane", "Vladimir Cauchemar", "23:30", "01:00"],
  ["arcane", "LESSSS", "01:00", "02:00"],
  ["arcane", "Onlynumbers", "02:00", "03:00"],
  ["arcane", "Lil Texas", "03:00", "04:00"],
  ["arcane", "Unicorn on K", "04:00", "05:00"],
  ["station", "Tremplin", "18:00", "19:30"],
  ["station", "GEA", "19:30", "20:30"],
  ["station", "Mara", "20:30", "21:30"],
  ["station", "AJJA", "21:30", "22:30"],
  ["station", "Gonzi", "22:30", "23:30"],
  ["station", "FLKN", "23:30", "00:30"],
  ["station", "Samuel Moriero", "00:30", "01:30"],
  ["station", "Vortek's B2B Omaks", "01:30", "03:00"],
  ["station", "Dual Damage", "03:00", "04:00"],
  ["station", "Yoshiko", "04:00", "05:00"]
];

const DAY_START = 18 * 60;          // 18h00
const SPAN = 11 * 60;               // until 05h00
const STEP = 30;                    // one grid row = 30 min

// Minutes elapsed since 18h00, wrapping past midnight (01h00 -> 420).
const offset = hhmm => { const [h, m] = hhmm.split(":").map(Number); return ((h * 60 + m) - DAY_START + 1440) % 1440; };
const fmt = hhmm => hhmm.replace(":", "h");
const slots = SLOTS.map(([stage, name, start, end], i) => ({ id: i, stage, name, start, end, s: offset(start), e: offset(end) }));

// --- time source: the device clock ---
function nowMinutes() {
  const d = new Date();
  return offset(`${d.getHours()}:${d.getMinutes()}`) + d.getSeconds() / 60;
}
const live = m => m >= 0 && m < SPAN;
const status = (slot, m) => !live(m) ? "off" : m >= slot.e ? "past" : m >= slot.s ? "now" : "next";

function untilText(mins) {
  mins = Math.max(1, Math.round(mins));
  const h = Math.floor(mins / 60), m = mins % 60;
  return h ? `${h}h${String(m).padStart(2, "0")}` : `${m} min`;
}
