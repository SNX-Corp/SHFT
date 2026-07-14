---
name: design-system
description: >-
  Malhar's default frontend stack and CTRC design system — the reference for
  building or styling ANY user interface. Fire whenever he asks to build, style,
  or improve a UI: "build me a page / dashboard / app / component", "make this
  look good", "make it look professional / clean / polished", "clean up the
  design", "style this", a technical or canvas tool, or a Remotion video. Covers
  stack choices (shadcn / Tailwind / Lucide / Inter), the type scale, neutral +
  accent color system, component patterns (buttons, cards, tables, sidebar),
  technical-webapp patterns, code-quality standards, and the copy-the-best
  reference library. Load this BEFORE writing the first line of frontend code.
---

# Malhar's Design System & Frontend Standards

Act as a senior frontend engineer. Copy the best (Vercel, Linear, Notion, Stripe, Figma), invent the rest. Prefer composition over configuration. No over-engineered abstractions, no premature optimization. Every pixel earns its place.

## Remotion — Programmatic Video Creation

You can create videos and animations using **Remotion** (React + TypeScript for video).

### When to Use Remotion

- Marketing videos (product demos, explainers)
- Data visualizations (animated charts, dashboards)
- Social media content (auto-generated videos)
- Onboarding sequences
- Video-based reports
- Animated presentations

### Remotion Capabilities

```typescript
// Videos are React components
import { useCurrentFrame, interpolate, spring } from 'remotion'

// Full access to:
- All of CSS (Tailwind works!)
- Canvas & WebGL
- SVG animations
- Framer Motion
- Your design system
- Data-driven content
```

### Remotion Project Structure

When user requests video/animation:
1. Create `remotion/` directory in project root
2. Use your standard React stack (TypeScript, Tailwind, Lucide icons)
3. Apply design system (Inter font, color palette, component patterns)
4. Render programmatically or export MP4

**Key Insight**: Videos are just React components that know their frame number. Use `interpolate()` for smooth animations, `spring()` for natural motion.

---

## Default Frontend Stack

Unless the project specifies otherwise or uses a different framework, use this stack:

| Layer | Choice | Notes |
|-------|--------|-------|
| **Components** | shadcn/ui | Copy-paste, fully owned |
| **Styling** | Tailwind CSS v3+ | Utility-first, co-located |
| **Icons** | Lucide React | `lucide-react` package |
| **Font** | Inter (Google Fonts) | Weights: 400, 500, 600, 700, 800, 900 |
| **Animations** | CSS transitions (default) + Framer Motion (when needed) | 150ms standard, 100ms fast |
| **Charts** | shadcn Charts (Recharts) | For dashboards/analytics |
| **Forms** | react-hook-form + zod | Validation built in |
| **Utilities** | clsx + tailwind-merge (`cn()`) | Always use `cn()` for conditional classes |
| **Video/Animation** | Remotion | Programmatic video with React |

---

## Design System — Based on CTRC Dashboard

This is the reference design language to use as a starting point on all projects. **Colors are project-specific** (defined per-project in CLAUDE.md or on first prompt). Everything else is default.

### Typography

**Font:** `Inter` — import from Google Fonts, all weights 400–900.

```css
font-family: 'Inter', sans-serif;
```

| Use Case | Size | Weight | Letter Spacing | Transform |
|----------|------|--------|----------------|-----------|
| Page title | 22px | 800–900 | -0.02em | — |
| Section header | 14px | 700 | — | — |
| Section label | 10px | 600 | 0.1em | uppercase |
| Nav item | 13.5px | 500 | — | — |
| Button text | 13px | 600 | — | — |
| Body text | 13px | 400 | — | — |
| Stat value (big number) | 28px | 900 | -0.03em | — |
| Stat label | 10px | 700 | 0.05em | uppercase |
| Table header | 11px | 700 | 0.06em | uppercase |
| Table cell | 13px | 400 | — | — |
| Badge text | 10.5px | 700 | 0.03em | uppercase |
| Small/meta | 11.5px | 500 | — | — |

### Spacing & Layout

```
Border radius:
  --radius:    10px   (cards, containers, inputs)
  --radius-sm:  6px   (buttons, badges, small elements)
  --radius-full: 99px (pills, avatars)

Shadows:
  --shadow:    0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)  (default cards)
  --shadow-md: 0 4px 12px rgba(0,0,0,.10)                             (elevated/hover)

Sidebar width: 240px (fixed)
Topbar: sticky, z-50
Grid gap: 14–20px
```

### Color Palette (Project-Specific — Set Per Project)

The brand/accent color changes per project. The **neutral scale** below is fixed and should always be used.

**Fixed Neutral Scale:**
```
--white:   #FFFFFF
--black:   #171717   ← Dark sidebar, primary text
--black-2: #262626   ← Hover states on dark
--black-3: #404040   ← Secondary dark elements
--gray-1:  #737373   ← Secondary text
--gray-2:  #A3A3A3   ← Tertiary text, muted
--gray-3:  #D4D4D4   ← Borders, dividers
--gray-4:  #F5F5F5   ← Page background, table headers, subtle fills
```

**Status/Semantic Colors (always fixed):**
```
Red (urgent/error):   #EF4444 on #FEF2F2 bg  |  dark text: #DC2626
Green (success):      #22C55E on #F0FDF4 bg  |  dark text: #15803D
Amber (warning):      #F59E0B on #FFFBEB bg  |  dark text: #D97706
Blue (info):          #3B82F6 on #EFF6FF bg  |  dark text: #2563EB
```

**Project Accent Color:** Defined in each project's CLAUDE.md. Example:
```
CTRC Dashboard:   --accent: #F5D000  (yellow)  --accent-dim: #C8AA00  --accent-bg: #FFFBDC
BettrRefer:       --accent: #2563EB  (blue)    --accent-dim: #1D4ED8  --accent-bg: #EFF6FF
```

### Component Patterns

#### Buttons
```
Primary:  accent color bg, dark text, opacity .88 on hover, scale(.97) on active
Outline:  transparent bg, gray-3 border → gray-2 on hover, black-3 text
Ghost:    transparent bg, gray-1 text → gray-4 bg + black text on hover
Icon-only: ghost style, square, 32–34px
Sizing:   padding 7px 14px, font-size 13px, font-weight 600, radius-sm (6px)
```

#### Badges
```
Structure: inline-flex, 10.5px, 700 weight, 2px 8px padding, 4px radius, uppercase
Red:    #FEF2F2 bg / #DC2626 text
Yellow: accent-bg / amber dark text
Green:  #F0FDF4 bg / #15803D text
Black:  #171717 bg / #FFFFFF text
Gray:   #D4D4D4 bg / #404040 text
Blue:   #EFF6FF bg / #2563EB text
```

#### Cards
```
bg: white, border: 1px gray-3, radius: 10px, padding: 16–20px
shadow: --shadow, hover: --shadow-md (transition .15s)
card-header: flex, space-between, title (14px 700) + optional "View all →" link
Accent top border: 3px solid [color] on accent variant cards
```

#### Sidebar
```
Width: 240px, fixed position, full height
bg: --black (#171717)
Nav items: 13.5px, 500 weight, gray-2 text → white on hover (bg: black-2)
Active item: white text, accent color left border or bg indicator
Nav badge: small circular badge for counts
Section labels: 10px, 700, uppercase, gray-1, letter-spacing 0.1em
```

#### Topbar
```
sticky top-0, z-50, white bg, gray-3 border-bottom
Height: ~52–56px, padding 0 20px
Left: page title (22px, 800 weight)
Right: action buttons + notification bell + avatar
```

#### Tables
```
thead: gray-4 bg, 11px 700 uppercase gray-1 text, letter-spacing 0.06em
tbody tr: gray-3 border-bottom, hover: gray-4 bg
td: 13px, 400 weight, padding 10–12px 14px
Wrap in .table-wrap with overflow-x: auto
```

#### Stat Cards
```
Grid: 6-col on wide, 3-col on 1200px, 2-col on 768px
Structure: label (gray-1, 10px uppercase) → value (28px 900) → meta (11.5px gray-1)
Optional icon: top-right, gray-2 color
Accent variant: 3px top border in accent color
```

#### Avatars
```
Circle, 26–36px, 10–12px 700 text initials
Background: unique color per person (generate from name hash)
```

### Animations & Transitions

```css
/* Standard interactive elements */
transition: background .15s, color .15s;
transition: box-shadow .15s;
transition: opacity .15s, transform .1s;

/* Button press */
:active { transform: scale(.97); }

/* No heavy animations by default — clean, fast, functional */
/* Add Framer Motion only when transition communicates meaning */
```

### Layout Patterns

```
App shell:   Fixed sidebar (240px) + sticky topbar + scrollable main content
Main:        margin-left: 240px, padding: 20–28px
Two-column:  grid 1fr 320px, gap 20px (main content + side panel)
Stat grid:   repeat(6, 1fr) → repeat(3) at 1200px → repeat(2) at 768px
Cards grid:  repeat(auto-fill, minmax(280px, 1fr))
```

---

## Technical Webapp Patterns (For Internal/Specialist Tools)

When building **technical tools** (robotics strategy, CAD viewers, simulation interfaces, data annotation, scouting apps):

**Use the same CTRC design system as your foundation** + add these specialized interaction patterns.

### When to Use Technical Patterns

- Internal tools for technical users (engineers, scouts, analysts)
- Specialist interfaces requiring precision interaction
- Apps with canvas/drawing/annotation features
- Strategy planning and visualization tools
- Real-time data manipulation interfaces

**Keep the CTRC design system:**
- Same typography scale
- Same color system (neutral scale + project accent)
- Same button/card/badge styles
- Same sidebar/topbar layout
- Same Tailwind + shadcn/ui stack

**Add these technical interaction patterns:**

---

### 1. Interactive Canvas Component

For drawing, annotation, field visualization, or any freeform interaction:

```tsx
// components/InteractiveCanvas.tsx
interface CanvasProps {
  width: number
  height: number
  backgroundImage?: string
  mode: 'draw' | 'erase' | 'select'
  onPathComplete?: (path: Point[]) => void
}

export function InteractiveCanvas({ ... }: CanvasProps) {
  return (
    <div className="relative border rounded-lg overflow-hidden bg-background">
      {/* Background layer (field, grid, reference image) */}
      <div className="absolute inset-0">
        {backgroundImage && <img src={backgroundImage} className="w-full h-full" />}
      </div>

      {/* Canvas drawing layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        width={width}
        height={height}
      />

      {/* UI overlays (markers, labels, etc.) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* SVG overlays here */}
      </div>
    </div>
  )
}
```

**Key patterns:**
- Layer background → canvas → overlays
- Use Canvas API for drawing (better performance than SVG for freeform)
- Use SVG for static/structured elements (scalable, precise)
- Pointer-events-none on overlays so drawing isn't blocked

---

### 2. Drawing Toolbar

Inline tool palette with clear active states:

```tsx
// components/DrawingToolbar.tsx
export function DrawingToolbar({ mode, onModeChange, brushSize, onBrushChange }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-background border rounded-lg">
      {/* Tool buttons */}
      <Button
        variant={mode === 'draw' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('draw')}
      >
        <Pencil size={14} />
        Draw
      </Button>

      <Button
        variant={mode === 'erase' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onModeChange('erase')}
      >
        <Eraser size={14} />
        Erase
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Action buttons */}
      <Button variant="ghost" size="sm" onClick={handleUndo}>
        <Undo size={14} />
        Undo
      </Button>

      <Button variant="outline" size="sm" onClick={handleClear}>
        <Trash2 size={14} />
        Clear
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Brush size */}
      <Select value={brushSize} onValueChange={onBrushChange}>
        <SelectTrigger className="w-28 h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="small">Small</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="large">Large</SelectItem>
        </SelectContent>
      </Select>

      {/* Fullscreen toggle */}
      <Button variant="ghost" size="icon" className="ml-auto">
        <Maximize2 size={14} />
      </Button>
    </div>
  )
}
```

**Key principles:**
- Active tool highlighted with `default` variant
- Inactive tools use `ghost` variant
- Group related actions with separators
- Keep everything visible (no nested menus)
- Icon + label for clarity

---

### 3. Playback Controls

For animation replay, path simulation, or time-based data:

```tsx
// components/PlaybackControls.tsx
export function PlaybackControls({
  isPlaying,
  onPlay,
  onPause,
  onRestart,
  speed,
  onSpeedChange
}) {
  return (
    <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
      {/* Play/Pause */}
      <Button
        variant="ghost"
        size="sm"
        onClick={isPlaying ? onPause : onPlay}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        {isPlaying ? 'Pause' : 'Play'}
      </Button>

      {/* Restart */}
      <Button variant="ghost" size="sm" onClick={onRestart}>
        <RotateCcw size={14} />
        Restart
      </Button>

      <Separator orientation="vertical" className="h-6" />

      {/* Speed controls */}
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground mr-2">Speed:</span>
        {[0.5, 1, 2].map(s => (
          <Button
            key={s}
            variant={speed === s ? 'default' : 'ghost'}
            size="sm"
            className="w-12"
            onClick={() => onSpeedChange(s)}
          >
            {s}x
          </Button>
        ))}
      </div>
    </div>
  )
}
```

---

### 4. Phase/Mode Tabs

For switching between game phases, workflow stages, or tool modes:

```tsx
// components/PhaseTabs.tsx
export function PhaseTabs({ phases, activePhase, onChange }) {
  return (
    <div className="flex gap-2 border-b">
      {phases.map(phase => (
        <button
          key={phase.id}
          className={cn(
            "px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px",
            activePhase === phase.id
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          )}
          onClick={() => onChange(phase.id)}
        >
          {phase.label}
        </button>
      ))}
    </div>
  )
}
```

**Alternative pill-style:**
```tsx
<div className="inline-flex bg-muted rounded-lg p-1 gap-1">
  {phases.map(phase => (
    <button
      key={phase.id}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
        activePhase === phase.id
          ? "bg-background shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => onChange(phase.id)}
    >
      {phase.label}
    </button>
  ))}
</div>
```

---

### 5. Legend/Key Component

For explaining visual elements in technical diagrams:

```tsx
// components/Legend.tsx
export function Legend({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3 bg-muted/20 rounded-lg border text-xs">
      <span className="font-semibold text-muted-foreground uppercase tracking-wide">
        Key:
      </span>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className="w-3 h-3 rounded-sm flex-shrink-0"
            style={{
              backgroundColor: item.color,
              border: item.outline ? `2px solid ${item.color}` : undefined,
              backgroundColor: item.outline ? 'transparent' : item.color
            }}
          />
          <span className="text-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
```

---

### 6. Status Indicator Bar

For showing current selection, active tool state, or context info:

```tsx
// components/StatusBar.tsx
export function StatusBar({ message, tool, coordinates }) {
  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-muted/30 border-t text-xs">
      <span className="text-muted-foreground">{message}</span>

      <div className="flex items-center gap-4">
        {tool && (
          <span className="text-foreground font-medium">
            Tool: <span className="text-primary">{tool}</span>
          </span>
        )}

        {coordinates && (
          <span className="text-muted-foreground font-mono">
            X: {coordinates.x} Y: {coordinates.y}
          </span>
        )}
      </div>
    </div>
  )
}
```

---

### 7. Collapsible Sidebar for Technical Apps

Use shadcn/ui Sidebar component with collapsible sections:

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

export function TechnicalSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/"><Home size={16} />Home</a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Collapsible section */}
            <Collapsible>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Settings size={16} />
                  Settings
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenu className="pl-4">
                  <SidebarMenuItem>
                    <SidebarMenuButton>Preferences</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Users</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

---

### 8. Keyboard Shortcuts Display

Show available shortcuts in tooltips or help panel:

```tsx
// components/KeyboardShortcut.tsx
export function KeyboardShortcut({ keys, description }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-sm text-muted-foreground">{description}</span>
      <div className="flex gap-1">
        {keys.map((key, i) => (
          <kbd
            key={i}
            className="px-2 py-0.5 text-xs font-mono bg-muted border rounded"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  )
}

// Usage
<KeyboardShortcut keys={['Cmd', 'Z']} description="Undo" />
<KeyboardShortcut keys={['D']} description="Draw mode" />
<KeyboardShortcut keys={['E']} description="Erase mode" />
```

---

### Technical Patterns Best Practices

**1. Always show current state**
- Active tool highlighted
- Current mode visible
- Selection clearly indicated

**2. Keep controls accessible**
- Don't hide in nested menus
- Use keyboard shortcuts
- Provide visual feedback on hover/active

**3. Performance matters**
- Use Canvas for drawing (not SVG)
- Debounce expensive operations
- Lazy load heavy components

**4. Precision is key**
- Show coordinates/measurements
- Grid snap options
- Zoom controls for fine detail

**5. Save user work**
- Auto-save drafts
- Export functionality
- Undo/redo always available

---

### Example: Complete Strategy Canvas Component

```tsx
// components/StrategyCanvas.tsx
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Pencil, Eraser, Undo, Trash2, Play, Pause, RotateCcw, Maximize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StrategyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<'draw' | 'erase'>('draw')
  const [brushSize, setBrushSize] = useState('medium')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [phase, setPhase] = useState('autonomous')

  const phases = [
    { id: 'autonomous', label: 'Autonomous' },
    { id: 'teleop', label: 'Teleop' },
    { id: 'endgame', label: 'Endgame' }
  ]

  return (
    <div className="space-y-4">
      {/* Phase tabs */}
      <div className="inline-flex bg-muted rounded-lg p-1 gap-1">
        {phases.map(p => (
          <button
            key={p.id}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              phase === p.id
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setPhase(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 p-2 bg-background border rounded-lg">
        <Button
          variant={mode === 'draw' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('draw')}
        >
          <Pencil size={14} />
          Draw
        </Button>

        <Button
          variant={mode === 'erase' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('erase')}
        >
          <Eraser size={14} />
          Erase
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm">
          <Undo size={14} />
          Undo
        </Button>

        <Button variant="outline" size="sm">
          <Trash2 size={14} />
          Clear
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Select value={brushSize} onValueChange={setBrushSize}>
          <SelectTrigger className="w-28 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="default"
          size="sm"
          className="ml-auto"
        >
          Save autonomous
        </Button>

        <Button variant="ghost" size="icon">
          <Maximize2 size={14} />
        </Button>
      </div>

      {/* Playback controls */}
      <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
        <span className="text-xs text-muted-foreground">No auto path selected</span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          Play
        </Button>

        <Button variant="ghost" size="sm">
          <RotateCcw size={14} />
          Restart
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          {[0.5, 1, 2].map(s => (
            <Button
              key={s}
              variant={speed === s ? 'default' : 'ghost'}
              size="sm"
              className="w-12"
              onClick={() => setSpeed(s)}
            >
              {s}x
            </Button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative border rounded-lg overflow-hidden bg-green-50">
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair"
          width={1280}
          height={640}
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 p-3 bg-muted/20 rounded-lg border text-xs">
        <span className="font-semibold text-muted-foreground uppercase tracking-wide">Key:</span>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 border-2 border-foreground" style={{ borderRadius: '50%' }} />
          <span>Slot 1: triangle</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-foreground" />
          <span>Slot 2: circle</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-foreground" />
          <span>Slot 3: square</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-foreground" />
          <span>Filled = shooting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 border-2 border-foreground bg-transparent" />
          <span>Outline = passing</span>
        </div>
      </div>
    </div>
  )
}
```

---

### Reference: FRC Maneuver

**Source:** https://www.frc-maneuver.com/match-strategy

**What to steal:**
- Clean toolbar with inline controls
- Pill-style phase tabs
- Playback controls for animation
- Canvas drawing layer system
- Legend component at bottom
- Status indicators
- Fullscreen toggle
- Keyboard shortcut support

**Tech stack they use:**
- React + Vite
- shadcn/ui + Radix UI
- Tailwind CSS
- Lucide icons
- Canvas API for drawing
- Same foundation as CTRC Dashboard

---

## Icon Usage (Lucide)

```tsx
// React/Next.js
import { LayoutDashboard, Users, Trophy, Settings } from 'lucide-react'

// Size conventions
// Nav icons:    16x16
// Button icons: 14x14
// Stat icons:   20x20
// Empty states: 40x40

<LayoutDashboard size={16} className="text-gray-400" />
```

---

## Code Quality Standards

### Component Structure
```tsx
// Always:
// 1. Types at top
// 2. Component function with clear props
// 3. cn() for conditional classes
// 4. Logical grouping of JSX

import { cn } from '@/lib/utils'

interface CardProps {
  title: string
  accent?: 'yellow' | 'red' | 'black'
  className?: string
  children: React.NodeNode
}

export function Card({ title, accent, className, children }: CardProps) {
  return (
    <div className={cn(
      'bg-white border border-gray-200 rounded-[10px] p-5 shadow-sm',
      accent === 'yellow' && 'border-t-[3px] border-t-yellow-400',
      accent === 'red'    && 'border-t-[3px] border-t-red-500',
      accent === 'black'  && 'border-t-[3px] border-t-neutral-900',
      className
    )}>
      {children}
    </div>
  )
}
```

### File Structure (Next.js App Router)
```
src/
  app/               # Pages (route segments)
  components/
    ui/              # shadcn primitives
    [feature]/       # Feature-specific components
  lib/
    utils.ts         # cn(), formatters, helpers
  hooks/             # Custom hooks
  types/             # Shared TypeScript types
```

### Naming
```
Components:  PascalCase   (ReferralCard.tsx)
Hooks:       camelCase    (useReferrals.ts)
Utils:       camelCase    (formatDate.ts)
CSS vars:    kebab-case   (--accent-color)
Constants:   UPPER_SNAKE  (MAX_FILE_SIZE)
```

---

## Malhar's liked components (Vengence UI, July 2026)

Install pattern: `npx shadcn@latest add https://www.vengenceui.com/r/<name>.json`
General likes to reach for on future projects: diagonal-carousel,
expandable-bento-grid, staggered-grid, testimonials-card, cursor-card,
magnetic-spotlight-marquee. (Dash-specific picks — glass-dock,
line-hover-link, aurora-hero, liquid-metal — live in SNX-Dash's
docs/UPGRADE-PLAN.md.)

---

## "Copy the Best" Reference Library

When building common UI patterns, reference and adapt from:

| Pattern | Steal From |
|---------|-----------|
| Dashboard layout | Linear, Vercel dashboard |
| Data tables | Notion, Airtable |
| Command palette | Linear (⌘K), Raycast |
| Forms | Stripe onboarding |
| Empty states | GitHub, Linear |
| Loading states | Vercel deploy, Stripe |
| Notifications | Linear, Slack |
| Auth pages | Vercel, Supabase |
| Settings | Vercel, Notion |
| Onboarding | Loom, Figma |
| Pricing | Vercel, Resend |
| Landing page | Resend, Raycast |
| Animated videos | Remotion showcase |

**Process:** Screenshot it → extract the pattern → rebuild cleanly in our stack.

### Using MCP Servers for "Copy the Best"

```
1. Find inspiration (Linear, Vercel, etc.)
2. Use Playwright MCP → Screenshot the pattern
3. Use Google Stitch MCP → Generate initial UI design
4. Implement with your design system
5. Refine and ship
```

---

## Per-Project Color Setup

At the start of any new UI project, define:

```md
## Project: [Name]
--accent:      [hex]   ← Primary brand color
--accent-dim:  [hex]   ← 15% darker variant
--accent-bg:   [hex]   ← 5% opacity tint for backgrounds
--accent-text: [hex]   ← Text color on accent bg (if not --black)
```

Example (BettrRefer):
```
--accent:      #2563EB   (blue — clinical trust)
--accent-dim:  #1D4ED8
--accent-bg:   #EFF6FF
--accent-text: #1E40AF
```

---

## What NOT to Do

- Never use `<div>` when a semantic element works (`<button>`, `<nav>`, `<section>`)
- Never hardcode colors inline — always use CSS vars or Tailwind tokens
- Never skip loading/error/empty states — they're part of the feature
- Never build a custom dropdown/modal/tooltip from scratch — use shadcn
- Never use `!important` — fix the specificity instead
- Never leave console.log in committed code
- Never use `any` in TypeScript — type it properly or use `unknown`
- Never add dependencies without checking if the standard lib handles it
