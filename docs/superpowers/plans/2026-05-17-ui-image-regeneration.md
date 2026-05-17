# UI Image Regeneration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce 11 high-fidelity `gpt-image-2` concept UI images for the Walker Blog page classes defined in the approved design spec.

**Architecture:** This is an asset-production workflow, not a live UI refactor. The implementation captures real local route screenshots, uses those screenshots as edit references for `gpt-image-2`, saves final presentation images under `public/images/ui-generated/`, and records reproducible prompts plus a manifest under `docs/ui-image-generation/`.

**Tech Stack:** Astro dev server, PowerShell, Playwright CLI via `npx`, Python fallback image generation CLI at `C:\Users\Administrator\.codex\skills\.system\imagegen\scripts\image_gen.py`, OpenAI `gpt-image-2`.

---

## File Structure

- Create: `docs/ui-image-generation/routes.json`  
  Route inventory and screenshot metadata for the 11 page classes.
- Create: `docs/ui-image-generation/source-screenshots/*.png`  
  Local source screenshots used as image-edit references.
- Create: `docs/ui-image-generation/prompts/*.txt`  
  One CLI-ready prompt file per final image.
- Create: `docs/ui-image-generation/prompts.md`  
  Human-readable prompt log with shared style contract and route-specific intent.
- Create: `docs/ui-image-generation/manifest.md`  
  Final route-to-asset manifest, generation settings, and validation notes.
- Create: `public/images/ui-generated/*.png`  
  The final 11 presentation images.

No live `src/` UI files should be modified for this task.

## Task 1: Prepare Generation Inventory

**Files:**
- Create: `docs/ui-image-generation/routes.json`
- Create directory: `docs/ui-image-generation/source-screenshots/`
- Create directory: `docs/ui-image-generation/prompts/`
- Create directory: `public/images/ui-generated/`

- [ ] **Step 1: Create output directories**

Run:

```powershell
New-Item -ItemType Directory -Force -Path docs\ui-image-generation\source-screenshots | Out-Null
New-Item -ItemType Directory -Force -Path docs\ui-image-generation\prompts | Out-Null
New-Item -ItemType Directory -Force -Path public\images\ui-generated | Out-Null
```

Expected: command exits with code `0`.

- [ ] **Step 2: Write the route inventory**

Create `docs/ui-image-generation/routes.json` with this exact content:

```json
[
  {
    "slug": "home",
    "route": "/",
    "url": "http://127.0.0.1:4321/",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/home.png",
    "promptFile": "docs/ui-image-generation/prompts/home.txt",
    "finalImage": "public/images/ui-generated/home.png",
    "purpose": "Personal desktop and Bento entry surface"
  },
  {
    "slug": "posts",
    "route": "/posts",
    "url": "http://127.0.0.1:4321/posts",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/posts.png",
    "promptFile": "docs/ui-image-generation/prompts/posts.txt",
    "finalImage": "public/images/ui-generated/posts.png",
    "purpose": "Unified article archive"
  },
  {
    "slug": "post-detail",
    "route": "/posts/[slug]",
    "url": "http://127.0.0.1:4321/posts/ai-design-workflow",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/post-detail.png",
    "promptFile": "docs/ui-image-generation/prompts/post-detail.txt",
    "finalImage": "public/images/ui-generated/post-detail.png",
    "purpose": "Long-form reading system"
  },
  {
    "slug": "ai-learn",
    "route": "/ai/learn",
    "url": "http://127.0.0.1:4321/ai/learn",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/ai-learn.png",
    "promptFile": "docs/ui-image-generation/prompts/ai-learn.txt",
    "finalImage": "public/images/ui-generated/ai-learn.png",
    "purpose": "AI learning article entry"
  },
  {
    "slug": "ai-sources",
    "route": "/ai/sources",
    "url": "http://127.0.0.1:4321/ai/sources",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/ai-sources.png",
    "promptFile": "docs/ui-image-generation/prompts/ai-sources.txt",
    "finalImage": "public/images/ui-generated/ai-sources.png",
    "purpose": "Information sources and communities"
  },
  {
    "slug": "ai-toolkit",
    "route": "/ai/toolkit",
    "url": "http://127.0.0.1:4321/ai/toolkit",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/ai-toolkit.png",
    "promptFile": "docs/ui-image-generation/prompts/ai-toolkit.txt",
    "finalImage": "public/images/ui-generated/ai-toolkit.png",
    "purpose": "Tools, skills, models, and workflow reference"
  },
  {
    "slug": "ai-ideas",
    "route": "/ai/ideas",
    "url": "http://127.0.0.1:4321/ai/ideas",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/ai-ideas.png",
    "promptFile": "docs/ui-image-generation/prompts/ai-ideas.txt",
    "finalImage": "public/images/ui-generated/ai-ideas.png",
    "purpose": "AI ideas and claimable project list"
  },
  {
    "slug": "explore",
    "route": "/explore",
    "url": "http://127.0.0.1:4321/explore",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/explore.png",
    "promptFile": "docs/ui-image-generation/prompts/explore.txt",
    "finalImage": "public/images/ui-generated/explore.png",
    "purpose": "AI resource master-detail library"
  },
  {
    "slug": "explore-detail",
    "route": "/explore/[slug]",
    "url": "http://127.0.0.1:4321/explore/claude-code",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/explore-detail.png",
    "promptFile": "docs/ui-image-generation/prompts/explore-detail.txt",
    "finalImage": "public/images/ui-generated/explore-detail.png",
    "purpose": "Single resource detail page"
  },
  {
    "slug": "about",
    "route": "/about",
    "url": "http://127.0.0.1:4321/about",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/about.png",
    "promptFile": "docs/ui-image-generation/prompts/about.txt",
    "finalImage": "public/images/ui-generated/about.png",
    "purpose": "Personal introduction and site story"
  },
  {
    "slug": "not-found",
    "route": "/404",
    "url": "http://127.0.0.1:4321/404",
    "sourceScreenshot": "docs/ui-image-generation/source-screenshots/not-found.png",
    "promptFile": "docs/ui-image-generation/prompts/not-found.txt",
    "finalImage": "public/images/ui-generated/not-found.png",
    "purpose": "404 recovery state"
  }
]
```

- [ ] **Step 3: Verify the route inventory is valid JSON**

Run:

```powershell
Get-Content -Raw docs\ui-image-generation\routes.json | ConvertFrom-Json | Measure-Object
```

Expected: `Count` is `11`.

- [ ] **Step 4: Commit the inventory**

Run:

```powershell
git add docs/ui-image-generation/routes.json
git commit -m "docs: add ui image route inventory"
```

Expected: commit succeeds and includes only `docs/ui-image-generation/routes.json`.

## Task 2: Capture Source Screenshots

**Files:**
- Create: `docs/ui-image-generation/source-screenshots/home.png`
- Create: `docs/ui-image-generation/source-screenshots/posts.png`
- Create: `docs/ui-image-generation/source-screenshots/post-detail.png`
- Create: `docs/ui-image-generation/source-screenshots/ai-learn.png`
- Create: `docs/ui-image-generation/source-screenshots/ai-sources.png`
- Create: `docs/ui-image-generation/source-screenshots/ai-toolkit.png`
- Create: `docs/ui-image-generation/source-screenshots/ai-ideas.png`
- Create: `docs/ui-image-generation/source-screenshots/explore.png`
- Create: `docs/ui-image-generation/source-screenshots/explore-detail.png`
- Create: `docs/ui-image-generation/source-screenshots/about.png`
- Create: `docs/ui-image-generation/source-screenshots/not-found.png`

- [ ] **Step 1: Start the Astro dev server on a fixed port**

Run:

```powershell
$log = Join-Path (Get-Location) ".tmp-dev-ui-image-generation.log"
$err = Join-Path (Get-Location) ".tmp-dev-ui-image-generation.err.log"
$p = Start-Process -FilePath npm.cmd -ArgumentList @("run","dev","--","--host","127.0.0.1","--port","4321") -WorkingDirectory (Get-Location) -WindowStyle Hidden -RedirectStandardOutput $log -RedirectStandardError $err -PassThru
Set-Content -Path ".tmp-dev-ui-image-generation.pid" -Value $p.Id
```

Expected: command exits with code `0` and writes `.tmp-dev-ui-image-generation.pid`.

- [ ] **Step 2: Verify the dev server responds**

Run:

```powershell
for ($i = 0; $i -lt 60; $i++) {
  try {
    $r = Invoke-WebRequest -UseBasicParsing http://127.0.0.1:4321/
    if ($r.StatusCode -eq 200) { "ready"; break }
  } catch {
    Start-Sleep -Seconds 1
  }
}
```

Expected: output includes `ready`.

- [ ] **Step 3: Install Playwright Chromium for screenshot capture**

Run:

```powershell
npx -y playwright@1.56.1 install chromium
```

Expected: command exits with code `0`. If Chromium is already installed, Playwright reports no work or completes successfully.

- [ ] **Step 4: Capture all 11 screenshots**

Run:

```powershell
$routes = Get-Content -Raw docs\ui-image-generation\routes.json | ConvertFrom-Json
foreach ($route in $routes) {
  npx -y playwright@1.56.1 screenshot --wait-for-timeout=2500 --viewport-size=1440,1080 $route.url $route.sourceScreenshot
  if ($LASTEXITCODE -ne 0) { throw "Screenshot failed for $($route.slug)" }
}
```

Expected: command exits with code `0` and writes 11 PNG files under `docs/ui-image-generation/source-screenshots/`.

- [ ] **Step 5: Verify all screenshots exist**

Run:

```powershell
$routes = Get-Content -Raw docs\ui-image-generation\routes.json | ConvertFrom-Json
$missing = $routes | Where-Object { -not (Test-Path $_.sourceScreenshot) }
if ($missing) { $missing | Format-Table slug, sourceScreenshot; exit 1 }
Get-ChildItem docs\ui-image-generation\source-screenshots\*.png | Measure-Object
```

Expected: `Count` is `11`.

- [ ] **Step 6: Commit source screenshots**

Run:

```powershell
git add docs/ui-image-generation/source-screenshots
git commit -m "docs: capture ui source screenshots"
```

Expected: commit succeeds and includes 11 screenshot PNG files.

## Task 3: Write Image Prompts

**Files:**
- Create: `docs/ui-image-generation/prompts/home.txt`
- Create: `docs/ui-image-generation/prompts/posts.txt`
- Create: `docs/ui-image-generation/prompts/post-detail.txt`
- Create: `docs/ui-image-generation/prompts/ai-learn.txt`
- Create: `docs/ui-image-generation/prompts/ai-sources.txt`
- Create: `docs/ui-image-generation/prompts/ai-toolkit.txt`
- Create: `docs/ui-image-generation/prompts/ai-ideas.txt`
- Create: `docs/ui-image-generation/prompts/explore.txt`
- Create: `docs/ui-image-generation/prompts/explore-detail.txt`
- Create: `docs/ui-image-generation/prompts/about.txt`
- Create: `docs/ui-image-generation/prompts/not-found.txt`
- Create: `docs/ui-image-generation/prompts.md`

- [ ] **Step 1: Create the shared prompt header**

Use this shared header at the start of every prompt file:

```text
Use case: ui-mockup
Asset type: high-fidelity concept UI image for Walker Blog project documentation
Input image role: source screenshot that anchors the real route layout and content hierarchy
Primary request: regenerate the provided Walker Blog page as a polished high-fidelity concept UI image while preserving the route-specific structure.
Style/medium: refined web application UI mockup, Chinese-first personal knowledge site, not a marketing poster
Composition/framing: landscape 1536x1024 documentation image, browser-like page crop, interface fills the frame with comfortable margins
Lighting/mood: calm daylight, soft glass material depth, subtle shadows, restrained but crafted
Color palette: warm off-white background, mint green and cyan accents, dark teal-gray text, tiny coral accents only where useful
Materials/textures: translucent glass panels, fine borders, soft inner highlights, crisp Lucide-like line icons
Text: preserve only short representative Chinese labels where legible; do not invent long claims
Constraints: preserve the source page layout intent, route identity, and information hierarchy; keep UI realistic and readable; no emoji as semantic icons
Avoid: watermark, fake brand names, irrelevant products, dark blue/purple gradient dominance, decorative blobs, device mockup frames, broken navigation, random English filler text
```

- [ ] **Step 2: Write route-specific prompt files**

Create each `docs/ui-image-generation/prompts/<slug>.txt` by combining the shared header with the matching route-specific block below:

```text
Route focus for home:
Emphasize the draggable Bento desktop composition, Walker profile card, dock showcase, greeting/about card, recent traces, random recommendation, navigation console, calendar widget, music player, search affordance, and like counter. Keep the feeling of a personal digital desktop rather than a landing page.
```

```text
Route focus for posts:
Emphasize a unified article archive with left navigation, page heading, year/date organization, article cards, category labels, and tag rhythm. Make the archive feel dense enough for repeated reading but not like an admin dashboard.
```

```text
Route focus for post-detail:
Emphasize the long-form reading system: left article navigation, central article document, metadata, title, prose blocks, resource/video affordances if visible, and right table of contents. Prioritize reading comfort and stable hierarchy.
```

```text
Route focus for ai-learn:
Emphasize focused AI learning entries and article cards. The page should feel like a curated learning path for AI practice, with restrained surfaces and clear scanability.
```

```text
Route focus for ai-sources:
Emphasize information source and community discovery: search, tag filtering, source cards, category badges, and compact descriptions. Keep the page practical and resource-oriented.
```

```text
Route focus for ai-toolkit:
Emphasize a document-like toolkit surface with tools, skills, model roles, workflow sections, and adjustable-column information density. It should feel like a practical operating manual, not a card gallery.
```

```text
Route focus for ai-ideas:
Emphasize an early-stage idea board for AI projects, including open/completed status language and claimable concept slots. If the source screenshot shows an empty state, represent that intentionally without inventing unrelated projects.
```

```text
Route focus for explore:
Emphasize the AI resource library master-detail layout, left-side resource list, selected state, category grouping, and an empty or initial detail region. Make the selection affordance and library structure clear.
```

```text
Route focus for explore-detail:
Emphasize a selected AI resource detail page, including the resource card, metadata, rating, tags, description, and outbound action. Preserve the master-detail Dock layout.
```

```text
Route focus for about:
Emphasize the immersive personal identity page: video-hero feeling, Walker identity, avatar/profile, skill cards, social links, site story, and page like counter. Keep it personal and cinematic without turning it into a generic creator landing page.
```

```text
Route focus for not-found:
Emphasize a 404 recovery state with consistent Walker Blog styling, Lucide-like icon language, calm empty-state layout, and a clear return-home action. It should feel like part of the product system.
```

- [ ] **Step 3: Write the human-readable prompt log**

Create `docs/ui-image-generation/prompts.md` with:

```markdown
# UI Image Generation Prompts

Generation model: `gpt-image-2`
Output size: `1536x1024`
Quality: `high`
Mode: screenshot-informed image edit

All prompt files in `docs/ui-image-generation/prompts/` share the same visual contract:

- Preserve the real route layout and information hierarchy from the source screenshot.
- Use Walker Blog's warm off-white, mint/cyan, glass-panel visual system.
- Keep the interface Chinese-first and Lucide-like.
- Generate polished concept UI images for documentation, not live UI replacements.
- Avoid watermarks, fake brands, generic SaaS hero art, decorative blobs, and unrelated objects.

Route prompt files:

| Slug | Prompt file | Source screenshot | Final image |
| --- | --- | --- | --- |
| `home` | `docs/ui-image-generation/prompts/home.txt` | `docs/ui-image-generation/source-screenshots/home.png` | `public/images/ui-generated/home.png` |
| `posts` | `docs/ui-image-generation/prompts/posts.txt` | `docs/ui-image-generation/source-screenshots/posts.png` | `public/images/ui-generated/posts.png` |
| `post-detail` | `docs/ui-image-generation/prompts/post-detail.txt` | `docs/ui-image-generation/source-screenshots/post-detail.png` | `public/images/ui-generated/post-detail.png` |
| `ai-learn` | `docs/ui-image-generation/prompts/ai-learn.txt` | `docs/ui-image-generation/source-screenshots/ai-learn.png` | `public/images/ui-generated/ai-learn.png` |
| `ai-sources` | `docs/ui-image-generation/prompts/ai-sources.txt` | `docs/ui-image-generation/source-screenshots/ai-sources.png` | `public/images/ui-generated/ai-sources.png` |
| `ai-toolkit` | `docs/ui-image-generation/prompts/ai-toolkit.txt` | `docs/ui-image-generation/source-screenshots/ai-toolkit.png` | `public/images/ui-generated/ai-toolkit.png` |
| `ai-ideas` | `docs/ui-image-generation/prompts/ai-ideas.txt` | `docs/ui-image-generation/source-screenshots/ai-ideas.png` | `public/images/ui-generated/ai-ideas.png` |
| `explore` | `docs/ui-image-generation/prompts/explore.txt` | `docs/ui-image-generation/source-screenshots/explore.png` | `public/images/ui-generated/explore.png` |
| `explore-detail` | `docs/ui-image-generation/prompts/explore-detail.txt` | `docs/ui-image-generation/source-screenshots/explore-detail.png` | `public/images/ui-generated/explore-detail.png` |
| `about` | `docs/ui-image-generation/prompts/about.txt` | `docs/ui-image-generation/source-screenshots/about.png` | `public/images/ui-generated/about.png` |
| `not-found` | `docs/ui-image-generation/prompts/not-found.txt` | `docs/ui-image-generation/source-screenshots/not-found.png` | `public/images/ui-generated/not-found.png` |
```

- [ ] **Step 4: Verify all prompt files exist**

Run:

```powershell
$routes = Get-Content -Raw docs\ui-image-generation\routes.json | ConvertFrom-Json
$missing = $routes | Where-Object { -not (Test-Path $_.promptFile) }
if ($missing) { $missing | Format-Table slug, promptFile; exit 1 }
Test-Path docs\ui-image-generation\prompts.md
```

Expected: final line is `True`.

- [ ] **Step 5: Commit prompts**

Run:

```powershell
git add docs/ui-image-generation/prompts docs/ui-image-generation/prompts.md
git commit -m "docs: add ui image generation prompts"
```

Expected: commit succeeds and includes the 11 prompt files plus `prompts.md`.

## Task 4: Generate Final UI Images

**Files:**
- Create: `public/images/ui-generated/home.png`
- Create: `public/images/ui-generated/posts.png`
- Create: `public/images/ui-generated/post-detail.png`
- Create: `public/images/ui-generated/ai-learn.png`
- Create: `public/images/ui-generated/ai-sources.png`
- Create: `public/images/ui-generated/ai-toolkit.png`
- Create: `public/images/ui-generated/ai-ideas.png`
- Create: `public/images/ui-generated/explore.png`
- Create: `public/images/ui-generated/explore-detail.png`
- Create: `public/images/ui-generated/about.png`
- Create: `public/images/ui-generated/not-found.png`

- [ ] **Step 1: Verify API environment**

Run:

```powershell
if (-not $env:OPENAI_API_KEY) { throw "OPENAI_API_KEY is not set. Ask the user to set it locally, then rerun this step." }
python -c "import openai; print('openai-python-ready')"
```

Expected: output includes `openai-python-ready`. If the Python package is missing, run:

```powershell
python -m pip install openai pillow
```

Then rerun the verification command.

- [ ] **Step 2: Dry-run one image command**

Run:

```powershell
python "C:\Users\Administrator\.codex\skills\.system\imagegen\scripts\image_gen.py" edit --model gpt-image-2 --quality high --size 1536x1024 --output-format png --image "docs\ui-image-generation\source-screenshots\home.png" --prompt-file "docs\ui-image-generation\prompts\home.txt" --out "public\images\ui-generated\home.png" --dry-run
```

Expected: command prints the resolved request parameters and does not create `public/images/ui-generated/home.png`.

- [ ] **Step 3: Generate all 11 final images**

Run:

```powershell
$routes = Get-Content -Raw docs\ui-image-generation\routes.json | ConvertFrom-Json
foreach ($route in $routes) {
  python "C:\Users\Administrator\.codex\skills\.system\imagegen\scripts\image_gen.py" edit `
    --model gpt-image-2 `
    --quality high `
    --size 1536x1024 `
    --output-format png `
    --image $route.sourceScreenshot `
    --prompt-file $route.promptFile `
    --out $route.finalImage `
    --force
  if ($LASTEXITCODE -ne 0) { throw "Image generation failed for $($route.slug)" }
}
```

Expected: command exits with code `0` and writes 11 PNG files under `public/images/ui-generated/`.

- [ ] **Step 4: Verify all final images exist and are valid PNGs**

Run:

```powershell
@'
from pathlib import Path
from PIL import Image

expected = [
    "home", "posts", "post-detail", "ai-learn", "ai-sources",
    "ai-toolkit", "ai-ideas", "explore", "explore-detail",
    "about", "not-found"
]

for slug in expected:
    path = Path("public/images/ui-generated") / f"{slug}.png"
    if not path.exists():
        raise SystemExit(f"missing: {path}")
    with Image.open(path) as image:
        if image.format != "PNG":
            raise SystemExit(f"not png: {path}")
        width, height = image.size
        if width < 1024 or height < 768:
            raise SystemExit(f"too small: {path} {width}x{height}")
        print(f"{slug}: {width}x{height}")
'@ | python -
```

Expected: output lists all 11 slugs with dimensions, and the command exits with code `0`.

- [ ] **Step 5: Inspect final images visually**

Open or inspect each final image:

```powershell
Get-ChildItem public\images\ui-generated\*.png | Select-Object Name,Length | Format-Table -AutoSize
```

Expected: 11 files are listed. During visual inspection, reject and regenerate any image with a watermark, unrelated brand, clearly broken UI structure, dark/purple-dominant theme, unreadable primary labels, or route identity mismatch.

- [ ] **Step 6: Commit final images**

Run:

```powershell
git add public/images/ui-generated
git commit -m "assets: generate ui presentation images"
```

Expected: commit succeeds and includes 11 final PNG files.

## Task 5: Write Manifest And Final Verification

**Files:**
- Create: `docs/ui-image-generation/manifest.md`

- [ ] **Step 1: Write the manifest**

Create `docs/ui-image-generation/manifest.md` with:

```markdown
# UI Image Generation Manifest

Date: 2026-05-17
Model: `gpt-image-2`
Mode: screenshot-informed image edit
Quality: `high`
Output size: `1536x1024`

## Source And Output Map

| Slug | Route | Source screenshot | Prompt | Final image |
| --- | --- | --- | --- | --- |
| `home` | `/` | `docs/ui-image-generation/source-screenshots/home.png` | `docs/ui-image-generation/prompts/home.txt` | `public/images/ui-generated/home.png` |
| `posts` | `/posts` | `docs/ui-image-generation/source-screenshots/posts.png` | `docs/ui-image-generation/prompts/posts.txt` | `public/images/ui-generated/posts.png` |
| `post-detail` | `/posts/ai-design-workflow` | `docs/ui-image-generation/source-screenshots/post-detail.png` | `docs/ui-image-generation/prompts/post-detail.txt` | `public/images/ui-generated/post-detail.png` |
| `ai-learn` | `/ai/learn` | `docs/ui-image-generation/source-screenshots/ai-learn.png` | `docs/ui-image-generation/prompts/ai-learn.txt` | `public/images/ui-generated/ai-learn.png` |
| `ai-sources` | `/ai/sources` | `docs/ui-image-generation/source-screenshots/ai-sources.png` | `docs/ui-image-generation/prompts/ai-sources.txt` | `public/images/ui-generated/ai-sources.png` |
| `ai-toolkit` | `/ai/toolkit` | `docs/ui-image-generation/source-screenshots/ai-toolkit.png` | `docs/ui-image-generation/prompts/ai-toolkit.txt` | `public/images/ui-generated/ai-toolkit.png` |
| `ai-ideas` | `/ai/ideas` | `docs/ui-image-generation/source-screenshots/ai-ideas.png` | `docs/ui-image-generation/prompts/ai-ideas.txt` | `public/images/ui-generated/ai-ideas.png` |
| `explore` | `/explore` | `docs/ui-image-generation/source-screenshots/explore.png` | `docs/ui-image-generation/prompts/explore.txt` | `public/images/ui-generated/explore.png` |
| `explore-detail` | `/explore/claude-code` | `docs/ui-image-generation/source-screenshots/explore-detail.png` | `docs/ui-image-generation/prompts/explore-detail.txt` | `public/images/ui-generated/explore-detail.png` |
| `about` | `/about` | `docs/ui-image-generation/source-screenshots/about.png` | `docs/ui-image-generation/prompts/about.txt` | `public/images/ui-generated/about.png` |
| `not-found` | `/404` | `docs/ui-image-generation/source-screenshots/not-found.png` | `docs/ui-image-generation/prompts/not-found.txt` | `public/images/ui-generated/not-found.png` |

## Validation Checklist

- All 11 final PNG files exist under `public/images/ui-generated/`.
- All 11 source screenshots exist under `docs/ui-image-generation/source-screenshots/`.
- Every final image clearly maps to the intended route class.
- The set keeps the Walker Blog off-white, mint/cyan, glass-panel visual language.
- No final image contains a watermark, unrelated brand, generic device mockup, or route identity mismatch.
- Small generated text is used only as representative interface copy, not as a source of exact product claims.
```

- [ ] **Step 2: Verify the final file counts**

Run:

```powershell
(Get-ChildItem docs\ui-image-generation\source-screenshots\*.png | Measure-Object).Count
(Get-ChildItem public\images\ui-generated\*.png | Measure-Object).Count
(Get-ChildItem docs\ui-image-generation\prompts\*.txt | Measure-Object).Count
```

Expected:

```text
11
11
11
```

- [ ] **Step 3: Run the Astro validation commands**

Run:

```powershell
npx astro check
npm run build
```

Expected:

- `npx astro check` exits with code `0`.
- `npm run build` exits with code `0`.

- [ ] **Step 4: Stop the dev server if it is still running**

Run:

```powershell
if (Test-Path ".tmp-dev-ui-image-generation.pid") {
  $pidValue = Get-Content ".tmp-dev-ui-image-generation.pid"
  Stop-Process -Id $pidValue -ErrorAction SilentlyContinue
}
```

Expected: command exits with code `0`.

- [ ] **Step 5: Commit manifest and final docs**

Run:

```powershell
git add docs/ui-image-generation/manifest.md
git commit -m "docs: add ui image generation manifest"
```

Expected: commit succeeds and includes `docs/ui-image-generation/manifest.md`.

- [ ] **Step 6: Report final assets**

In the final response, list:

- The 11 final files under `public/images/ui-generated/`.
- The prompt log at `docs/ui-image-generation/prompts.md`.
- The manifest at `docs/ui-image-generation/manifest.md`.
- The validation commands run and whether they passed.
