# SnowDev — Flow & Image Generation Prompts
> All prompts for **Google Flow (Veo3.1 Fast)** and **Grok (image generation)**
> Save outputs to the paths listed under each prompt.

---

## 🎬 VIDEO 1 — Main Services Section Animation
### "The Frozen Code Crystal — SV Logomark"
**Tool:** Google Flow (Veo3.1 Fast)
**Settings:** 6 seconds · 4K · No dialogue · Cinematic
**Output path:** `dimitri-snowdev/public/videos/sv-crystal-raw.mp4`

```
Cinematic macro shot. A translucent, dark angular crystal shard floats in
a void of deep black space. The camera slowly zooms out as the crystal
descends from the top of frame, scaling from near-invisible to full size.
The crystal surface is rough-cut, like a raw gemstone, with flat geometric
facets. Glowing violet-purple circuit traces, binary fragments, and thin
code characters crawl and freeze across the crystal faces like frost
forming on glass — they crystallize progressively from edges toward center.
At the crystal core, the traces converge into a glowing "SV" letterform
made of light — it pulses once with deep violet-purple radiance
(#5e17eb color). The crystal catches internal light, scattering cool
blue-violet caustic rays into the surrounding darkness. The overall mood
is cold, precise, architectural. No humans. No voiceover. Dark atmospheric
ambience only. Duration: 6 seconds. Style: cinematic high-contrast,
minimal, tech luxury. Slow motion, no camera shake, locked-off shot.
```

### After generating — extract frames:
```bash
ffmpeg -i sv-crystal-raw.mp4 -vf "fps=30,scale=1366:-1" -q:v 3 dimitri-snowdev/public/frames/sv/%04d.webp
```
→ This creates ~180 WebP frames in `/public/frames/sv/` (0001.webp → 0180.webp)

---

## 🎬 VIDEO 2 — Fallback / Loop (optional)
### "SV Crystal Ambient Idle Loop"
**Tool:** Google Flow (Veo3.1 Fast)
**Settings:** 4 seconds · 4K · Loop-able · No dialogue
**Output path:** `dimitri-snowdev/public/videos/sv-crystal-loop.mp4`

```
Seamless looping ambient shot. A dark angular crystal shard with a
violet-glowing "SV" letterform etched at its core. The crystal gently
rotates 10 degrees left-right in a slow pendulum motion. Violet caustic
light pulses softly from within. Circuit trace details on the facets
shimmer faintly. Background: pure black void with subtle blue-violet
atmospheric mist. No motion change. Perfectly loop-able. Style: cinematic
dark luxury, minimal, 4K, slow motion.
```

---

## 🖼️ ICON A — Full Stack Web Engineering
### "Architecture Topology Icon"
**Tool:** Grok Image Generation (or Flow image)
**Output path:** `dimitri-snowdev/public/icons/icon-fullstack-raw.png`
**After:** Convert to SVG via Vectorizer.ai → save as `icon-fullstack.svg`

```
Minimal geometric line-art icon. A square grid of nodes interconnected
by thin lines forming a web architecture topology diagram. 3x3 grid
of dots, each connected by straight lines to neighbors. Clean vector
line art. Pure white strokes on pure black background. No fills.
Stroke weight: 2px. Sharp, precise, technical. Isolated on solid black.
No gradients. No shadows. Pure geometric minimal icon style.
Render at 512x512px.
```

---

## 🖼️ ICON B — AI Engineering & Automation
### "Neural Network Icon"
**Tool:** Grok Image Generation (or Flow image)
**Output path:** `dimitri-snowdev/public/icons/icon-ai-raw.png`
**After:** Convert to SVG via Vectorizer.ai → save as `icon-ai.svg`

```
Minimal geometric line-art icon. A feedforward neural network diagram
with 3 vertical layers: 4 input nodes (left), 3 hidden nodes (center),
2 output nodes (right). All nodes are small open circles. All inter-layer
connections are thin straight lines. Pure white lines and circles on pure
black background. No fills. Stroke weight: 2px. Clean, technical,
mathematical. Isolated on solid black. No gradients. No text.
Render at 512x512px.
```

---

## 🖼️ ICON C — Cloud Architecture & DevOps
### "Infrastructure Topology Icon"
**Tool:** Grok Image Generation (or Flow image)
**Output path:** `dimitri-snowdev/public/icons/icon-cloud-raw.png`
**After:** Convert to SVG via Vectorizer.ai → save as `icon-cloud.svg`

```
Minimal geometric line-art icon. Three concentric hexagons of increasing
size, centered. From the center hexagon, 6 thin radial lines extend
outward to the corners of the largest hexagon, like spokes of a wheel
within the hexagonal structure. Clean vector line art. Pure white strokes
on pure black background. No fills. Stroke weight: 2px. Precise,
architectural, infrastructure-topology feel. Isolated on solid black.
No gradients. No text. Render at 512x512px.
```

---

## 📋 Asset Checklist

| Asset | Tool | Status | Output Path |
|---|---|---|---|
| SV Crystal main video | Flow Veo3.1 Fast | ⬜ Pending | `/public/videos/sv-crystal-raw.mp4` |
| SV Crystal loop video | Flow Veo3.1 Fast | ⬜ Optional | `/public/videos/sv-crystal-loop.mp4` |
| Frame extraction | ffmpeg terminal | ⬜ After video | `/public/frames/sv/*.webp` |
| Icon A — Fullstack | Grok Image | ⬜ Pending | `/public/icons/icon-fullstack.svg` |
| Icon B — AI | Grok Image | ⬜ Pending | `/public/icons/icon-ai.svg` |
| Icon C — Cloud | Grok Image | ⬜ Pending | `/public/icons/icon-cloud.svg` |

---

## 🛠️ Frame Extraction Commands (run after Flow video is ready)

```bash
# Navigate to project root
cd "d:/SnowDev/Documents/dimitri-snowdev-v2/dimitri-snowdev"

# Extract 30fps WebP frames from the main video
ffmpeg -i public/videos/sv-crystal-raw.mp4 -vf "fps=30,scale=1366:-1" -q:v 3 public/frames/sv/%04d.webp

# Check frame count
ls public/frames/sv/ | Measure-Object | Select-Object Count
# Expected: ~180 frames for a 6-second 30fps video
```

---

## 🎨 Brand Colors Reference (for Flow prompts)

| Token | Hex | Usage |
|---|---|---|
| Accent Primary | `#5e17eb` | SV glow, circuit traces, icon tint |
| Accent Light | `#ae6bf6` | Caustic light scatter, hover states |
| Accent Secondary | `#5930d4` | Deep violet shadows |
| Background | `#060618` | Video background, void |
| Background Base | `#090c1a` | Section backgrounds |
