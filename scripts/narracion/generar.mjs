// Genera public/audio/narracion-forzes.mp3 con ElevenLabs (se corre una sola vez, local).
// La clave NO vive en el repo: se lee de la variable ELEVENLABS_API_KEY o de un
// archivo .env externo indicado con ENV_FILE (por ejemplo el de private_forzes).
//
// Uso:
//   node scripts/narracion/generar.mjs --voces              # lista voces en español (México)
//   ENV_FILE=C:\ruta\supabase.env.txt node scripts/narracion/generar.mjs --voz <VOICE_ID>
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

function leerClave() {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY.trim();
  const file = process.env.ENV_FILE;
  if (!file) throw new Error("Falta ELEVENLABS_API_KEY o ENV_FILE");
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*ELEVENLABS_API_KEY\s*=\s*["']?([^"'\s]+)/);
    if (m) return m[1];
  }
  throw new Error(`ELEVENLABS_API_KEY no está en ${file}`);
}

const key = leerClave();
const api = "https://api.elevenlabs.io";

if (args.includes("--voces")) {
  const url = `${api}/v1/shared-voices?page_size=30&language=es&accent=mexican&sort=usage_character_count_1y`;
  const res = await fetch(url, { headers: { "xi-api-key": key } });
  if (!res.ok) throw new Error(`Voces: ${res.status} ${await res.text()}`);
  const { voices = [] } = await res.json();
  for (const v of voices) {
    console.log([v.voice_id, v.name, v.gender, v.age, v.accent, v.use_case, v.category].join(" | "));
  }
  process.exit(0);
}

const voiceId = arg("--voz") || process.env.ELEVENLABS_VOICE_ID;
if (!voiceId) throw new Error("Indica la voz con --voz <VOICE_ID> (usa --voces para listarlas)");

const text = readFileSync(join(here, "guion.txt"), "utf8").trim();
const res = await fetch(`${api}/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
  method: "POST",
  headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
  body: JSON.stringify({
    text,
    model_id: arg("--modelo") || "eleven_multilingual_v2",
    voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true },
  }),
});
if (!res.ok) throw new Error(`TTS: ${res.status} ${await res.text()}`);

const out = join(root, "public", "audio", "narracion-forzes.mp3");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, Buffer.from(await res.arrayBuffer()));
console.log(`Listo: ${out} (${text.length} caracteres)`);
