# UI Image Regeneration Design

Date: 2026-05-17
Project: Walker Blog
Status: approved for implementation planning

## 1. Goal

Regenerate high-fidelity concept UI images for all 11 implemented Walker Blog page classes using `gpt-image-2`.

The output set should preserve the current site structure and product identity while making each page image more polished for README, project documentation, and external presentation. The images are not intended to replace the live UI implementation; they are presentation assets derived from it.

## 2. Repository Context

Walker Blog is an Astro 6 Chinese personal site deployed on Vercel. The PRD defines it as a personal digital base for AI exploration, philosophy, life records, tools, information sources, ideas, and personal introduction.

The existing design language is:

- Off-white background with restrained contrast.
- Mint/cyan brand accents.
- Glass panels, soft shadows, and subtle depth.
- Chinese-first interface copy.
- Lucide-style icon language rather than emoji.
- A quiet AI knowledge-work product tone: useful, responsive, and not decorative for its own sake.
- Different content forms use different page structures: desktop/Bento for the home page, reading views for articles, cards for resources, a document-like layout for the toolkit, and an immersive full-screen about page.

Current image assets are limited to `public/images/avatar.jpg`, `public/images/hero-bg.png`, video files, and small SVG assets. There is no complete UI image set for documentation.

## 3. Documentation And Usage Needs

The regenerated UI images should support these use cases:

- README/project front: one or more strong images that quickly show what Walker Blog is.
- PRD and design documentation: page-specific visuals that explain implemented routes and interaction surfaces.
- Portfolio or social sharing: polished concept images that look intentional without becoming generic marketing posters.
- Future design comparison: source screenshots, prompts, and final files should be traceable.

Because the images may be embedded in docs, each final asset should be named by route purpose rather than by timestamp.

## 4. Scope

Generate one final image for each of these 11 page classes:

| Slug | Route | Purpose |
| --- | --- | --- |
| `home` | `/` | Personal desktop and Bento entry surface |
| `posts` | `/posts` | Unified article archive |
| `post-detail` | `/posts/[slug]` | Long-form reading system |
| `ai-learn` | `/ai/learn` | AI learning article entry |
| `ai-sources` | `/ai/sources` | Information sources and communities |
| `ai-toolkit` | `/ai/toolkit` | Tools, skills, models, and workflow reference |
| `ai-ideas` | `/ai/ideas` | AI ideas and claimable project list |
| `explore` | `/explore` | AI resource master-detail library |
| `explore-detail` | `/explore/[slug]` | Single resource detail page |
| `about` | `/about` | Personal introduction and site story |
| `not-found` | `/404` | 404 recovery state |

Out of scope:

- Changing live UI components or page behavior.
- Adding new routes or content entries only for the image task.
- Replacing `avatar.jpg`, videos, favicon, or cursor assets.
- Producing social platform-specific crops unless requested later.

## 5. Recommended Workflow

Use the hybrid production workflow:

1. Run the site locally.
2. Capture source screenshots for all 11 route classes.
3. Analyze each screenshot against the PRD, page source, and global style tokens.
4. Create a shared visual system prompt plus route-specific prompts.
5. Generate high-fidelity concept UI images with `gpt-image-2`.
6. Review each output for route recognizability, style consistency, text quality, and absence of artifacts.
7. Save final images and a manifest in the workspace.

This workflow is preferred over prompt-only generation because it keeps the generated images anchored to real pages. It is preferred over simple screenshot enhancement because it allows better visual polish while still preserving page identity.

## 6. Visual Direction

The images should read as a coherent product set:

- Background: warm off-white, very light neutral surfaces, no dark-blue or purple-dominant theme.
- Accent: mint green and cyan as the primary energetic colors; coral may appear sparingly for status or contrast.
- Material: translucent panels, soft inner highlights, delicate borders, and restrained shadows.
- Layout: keep page-specific structures visible. Do not flatten every page into the same dashboard composition.
- Typography: Chinese UI labels should look clean and plausible. Avoid relying on tiny exact text where image generation may distort characters.
- Iconography: Lucide-like line icons. No emoji as semantic icons.
- Mood: calm, crafted, technical-humanist, practical.

Avoid:

- Generic SaaS landing-page hero composition.
- Overly glossy 3D device mockups.
- Random brand names, watermarks, fake app logos, or unrelated products.
- Heavy purple/blue gradients, decorative blobs, or poster-only effects.
- Dark blurred backgrounds that obscure the actual interface.

## 7. Output Locations

Final presentation assets:

```text
public/images/ui-generated/
  home.png
  posts.png
  post-detail.png
  ai-learn.png
  ai-sources.png
  ai-toolkit.png
  ai-ideas.png
  explore.png
  explore-detail.png
  about.png
  not-found.png
```

Supporting implementation artifacts:

```text
docs/ui-image-generation/
  source-screenshots/
  manifest.md
  prompts.md
```

The final images belong under `public/images/ui-generated/` so they can be referenced from README and docs with stable paths. Source screenshots and prompts belong under docs because they explain how the images were produced.

## 8. Route-Specific Notes

- `home`: emphasize the draggable Bento desktop composition, profile, dock showcase, recent traces, widgets, search affordance, and like counter.
- `posts`: emphasize archive structure, year/date grouping, tags, and the unified content entrance.
- `post-detail`: emphasize three-column reading layout, article body, navigation, table of contents, and reading comfort.
- `ai-learn`: emphasize focused learning entries and article cards rather than decoration.
- `ai-sources`: emphasize resource discovery, search, tag filtering, and source/community cards.
- `ai-toolkit`: emphasize document-like density, column structure, workflow sections, and practical tool references.
- `ai-ideas`: because the current content set has few or no real idea entries, represent the intended empty or early-stage idea board without inventing unrelated projects.
- `explore`: emphasize master-detail navigation and resource list selection.
- `explore-detail`: emphasize one selected resource, metadata, description, and outbound action.
- `about`: emphasize immersive identity, video hero feel, avatar/profile, skills, social links, and site story.
- `not-found`: emphasize recoverability, return-home action, and consistent icon language.

## 9. Validation

Before claiming completion:

- Confirm all 11 final PNG files exist.
- Confirm each final image maps clearly to its route class.
- Confirm source screenshots and prompt/manifest files exist.
- Inspect outputs for obvious broken UI text, watermarks, unrelated brands, and inconsistent visual language.
- If the repo changes any docs that reference the new images, run the relevant formatting or build checks for those docs/pages.

Known risk:

Image models can distort small text, especially Chinese text. Prompts should prioritize faithful layout, representative labels, and visual hierarchy over exact small-copy reproduction. Exact product claims should remain in text docs, not baked into generated pixels.

## 10. Implementation Entry Point

After this design is reviewed, create an implementation plan that covers:

- Local route capture setup.
- Screenshot naming.
- Prompt generation.
- Image generation mode.
- Output inspection and iteration rules.
- Final manifest and file placement.
