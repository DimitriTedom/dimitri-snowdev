# SnowDev — Flow & Keyframe Generation Prompts

> Production pipeline using **Keyframe-to-Video Interpolation**:
> 1. Generate **Start Keyframe** + **End Keyframe** images (via Grok or Flow Image).
> 2. Feed both into **Google Flow (Veo3.1 Fast)** as Start/End images to ensure 100% deterministic control over the crystal geometry, the "SV" logomark, and the motion trajectory.
> 3. Visuals are timed and choreographed to align with our future **Thunder & Electrical Sound Design** loop.

---

## 🖼️ KEYFRAME 1 (START IMAGE) — Top Entry
### "The Raw Obsidian Shard Descending"
- **Tool:** Grok (Image Generation) or Flow Image
- **Aspect Ratio:** 16:9 (or 4:3)
- **Output path:** `dimitri-snowdev/public/keyframes/sv-crystal-start.png`

```
Cinematic concept art shot. A raw, dark angular obsidian crystal shard entering
from the very top of the frame into an empty, pitch-black void (#060618). The
crystal is positioned high, near the top edge, small in scale, partially cut off
by the upper frame. Surface is dark smoked quartz and raw glass facets with sharp
geometric edges. Subtle faint violet edge rim lighting (#5e17eb) catching the
top facets. Faint cold blue atmospheric haze and subtle floating microscopic
dust motes in the darkness. No text, no symbols, clean unetched surface. Dark tech
minimal luxury aesthetic, 8k resolution, octane render style, ultra-high detail.
```

---

## 🖼️ KEYFRAME 2 (END IMAGE) — Final Crystallized Mark
### "The Crystallized Superimposed 'SV' Monogram Core"
- **Tool:** Grok (Image Generation), Midjourney, or Flow Image
- **Reference Image (Crucial):** Attach `dimitri-snowdev/public/brand/snowdev-logo-transparent.png` as an image reference / prompt input!
- **Aspect Ratio:** 16:9 (or 4:3)
- **Output path:** `dimitri-snowdev/public/keyframes/sv-crystal-end.png`

> 💡 **Why previous renders failed:** Text-only AI models parse "SV" as two separate letters side by side ("S" then "V"). The true SnowDev brand is a **superimposed interlocking monogram** — the "V" forms a sharp downward chevron, and the "S" is woven directly through it, looping around its diagonals into a single intertwined cipher.

```
Cinematic macro shot. A large, perfectly centered angular dark crystal shard
floating stationary in deep black space (#060618). Flat geometric facets catch
internal light. Across the glassy surface, frozen glowing violet circuit traces
and binary code glyphs are permanently etched like electric frost.

In the exact center core of the crystal, a single superimposed interlocking
monogram cipher of the letters "S" and "V" is deeply engraved (matching reference
logo). The letter "V" is a sharp symmetrical downward chevron, and the letter "S"
is intertwined and woven directly through the "V", passing through its diagonal
arms and looping around the bottom to form a unified, single interlocking emblem.
NOT two letters side-by-side. One singular intertwined "SV" monogram emblem
glowing intensely with deep violet-purple neon light (#5e17eb, #ae6bf6).

Volumetric caustic rays and bright violet prism lens flares scatter outward from
the intertwined emblem into the surrounding darkness. Precise architectural luxury tech,
high contrast, clean geometric curves, octane render, 8k resolution.
```

---

## 🎬 VIDEO 1 — Flow Interpolation (Start Image → End Image)
### "The Frozen Code Crystal — Descent & Thunder Crystallization"
- **Tool:** Google Flow (Veo3.1 Fast)
- **Mode:** Image-to-Video with **Start Keyframe** (`sv-crystal-start.png`) + **End Keyframe** (`sv-crystal-end.png`)
- **Duration:** 6 seconds · 4K · High Motion Fidelity
- **Output path:** `dimitri-snowdev/public/videos/sv-crystal-raw.mp4`

```
Smooth cinematic macro transition. Using the start image (crystal entering from
top) and end image (crystal centered with the glowing superimposed "SV" interlocking emblem).

The dark crystal shard descends smoothly from top of frame toward the exact center,
scaling from small to full hero size. As it reaches center, electric violet
frost and glowing circuit lines rapidly crawl across the facets like lightning
crackling under ice. At the final beat, the internal core ignites into the
superimposed interlocking "SV" emblem, pulsing once with an explosive emission of
violet caustic light and volumetric rays that ripple across the surrounding void.

Camera is locked-off with smooth slow zoom-out. Motion is heavy, steady, and
deliberate. Cinematic tech luxury, high contrast, zero camera shake.
```

---

## ⚡ Future Sound Design Blueprint (Choreographed to Visuals)

> While audio implementation will follow later, the visual animation above is strictly choreographed to align with this 3-phase soundscape (matching Trionn's signature thunder/ambient energy):

| Timeline | Visual Action | Sound Cue to Match |
|---|---|---|
| **0.0s – 2.0s** | Crystal enters from top void | **Deep atmospheric drone**: Sub-bass hum (40Hz), low rumbling wind void |
| **2.0s – 4.5s** | Code traces crawl across facets | **Electrical frost sizzle**: Crisp ionized static, ice crackling, high-frequency glitch clicks |
| **4.5s – 6.0s** | "SV" core locks & pulses caustic rays | **Seismic Thunder Strike**: Low-end thunder boom with rolling sub-bass impact and long reverb decay |

---

## 🖼️ SVG ACCENT ICONS (Grok Prompts)

### Icon A — Full Stack Web Engineering ("Architecture Topology")
- **Tool:** Grok Image → Vectorizer.ai → `/public/icons/icon-fullstack.svg`
```
Minimal geometric line-art icon. A square grid of nodes interconnected
by thin lines forming a web architecture topology diagram. 3x3 grid
of dots, each connected by straight lines to neighbors. Clean vector
line art. Pure white strokes on pure black background. No fills.
Stroke weight: 2px. Sharp, precise, technical. Isolated on solid black.
Render at 512x512px.
```

### Icon B — AI Engineering & Automation ("Neural Network")
- **Tool:** Grok Image → Vectorizer.ai → `/public/icons/icon-ai.svg`
```
Minimal geometric line-art icon. A feedforward neural network diagram
with 3 vertical layers: 4 input nodes (left), 3 hidden nodes (center),
2 output nodes (right). All nodes are small open circles. All inter-layer
connections are thin straight lines. Pure white lines and circles on pure
black background. No fills. Stroke weight: 2px. Clean, technical.
Render at 512x512px.
```

### Icon C — Cloud Architecture & DevOps ("Infrastructure Topology")
- **Tool:** Grok Image → Vectorizer.ai → `/public/icons/icon-cloud.svg`
```
Minimal geometric line-art icon. Three concentric hexagons of increasing
size, centered. From the center hexagon, 6 thin radial lines extend
outward to the corners of the largest hexagon, like spokes of a wheel.
Clean vector line art. Pure white strokes on pure black background.
No fills. Stroke weight: 2px. Precise, architectural.
Render at 512x512px.
```

---

## 🛠️ Frame Extraction Commands (Run after Flow video is exported)

```bash
cd "d:/SnowDev/Documents/dimitri-snowdev-v2/dimitri-snowdev"

# Extract 30fps WebP frames
ffmpeg -i public/videos/sv-crystal-raw.mp4 -vf "fps=30,scale=1366:-1" -q:v 3 public/frames/sv/%04d.webp

# Verify ~180 frames extracted
ls public/frames/sv/ | Measure-Object | Select-Object Count
```
