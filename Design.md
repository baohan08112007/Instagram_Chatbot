---
version: alpha
name: Instagram-design-analysis
description: An exact interpretation of Instagram's design language — a photo-first social platform whose surface is near-invisible by design, with absolute white chrome, hairline gray borders, and a single distinctive accent: the warm gradient brand mark that rings every Story avatar. Every design decision serves one purpose — get out of the way of the content.

colors:
  primary: "#0095f6"
  on-primary: "#ffffff"
  primary-hover: "#1877f2"
  brand-gradient: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"
  ink: "#262626"
  body: "#8e8e8e"
  mute: "#c7c7c7"
  canvas: "#ffffff"
  canvas-soft: "#fafafa"
  border: "#dbdbdb"
  border-strong: "#a8a8a8"
  destructive: "#ed4956"
  success: "#78de45"
  link: "#00376b"
  on-dark: "#ffffff"
  overlay: "rgba(0, 0, 0, 0.6)"

typography:
  title-lg:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 300
    lineHeight: "32px"
    letterSpacing: 0
  title-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: "26px"
    letterSpacing: 0
  title-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: 0
  body-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "18px"
    letterSpacing: 0
  body-md-strong:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "18px"
    letterSpacing: 0
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: 0
  body-sm-strong:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: 0
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "14px"
    letterSpacing: 0
    color: "{colors.body}"
  caption-strong:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "14px"
    letterSpacing: 0
  username:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "18px"
    letterSpacing: 0
  button-md:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "18px"
    letterSpacing: 0
  button-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: 0
  input:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "18px"
    letterSpacing: 0

rounded:
  none: "0px"
  xs: "2px"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  pill: "26px"
  avatar: "50%"
  story-ring: "50%"
  input: "3px"

spacing:
  xxs: "2px"
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "40px"

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderBottom: "1px solid {colors.border}"
    typography: "{typography.title-sm}"
    height: "54px"
    padding: "0 {spacing.lg}"

  nav-bar-icon:
    color: "{colors.ink}"
    size: "24px"

  tab-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderTop: "1px solid {colors.border}"
    typography: "{typography.caption}"
    height: "44px"

  story-avatar-ring:
    size: "66px"
    borderWidth: "2px"
    borderColor: "{colors.brand-gradient}"
    innerAvatarSize: "58px"
    innerBorder: "2px solid {colors.canvas}"

  story-avatar-ring-seen:
    borderColor: "{colors.border}"
    size: "66px"

  story-username:
    typography: "{typography.caption}"
    textColor: "{colors.ink}"
    maxWidth: "74px"

  post-image:
    aspectRatio: "1:1 or 4:5"
    width: "100%"
    rounded: "{rounded.none}"
    border: "1px solid {colors.border}"  # only when image bg ≈ canvas

  action-bar:
    padding: "{spacing.xs} {spacing.lg}"
    iconSize: "24px"
    iconGap: "{spacing.lg}"
    iconColor: "{colors.ink}"

  action-bar-icon:
    color: "{colors.ink}"
    size: "24px"
    hover: "opacity 0.5"

  action-bar-icon-liked:
    color: "{colors.destructive}"
    size: "24px"
    animation: "scale(1.2) ease-out 0.2s"

  caption-block:
    padding: "{spacing.sm} {spacing.lg}"
    typography: "{typography.body-md}"
    textColor: "{colors.ink}"

  caption-username:
    typography: "{typography.username}"
    textColor: "{colors.ink}"

  caption-text:
    typography: "{typography.body-md}"
    textColor: "{colors.ink}"

  caption-more:
    typography: "{typography.body-md}"
    textColor: "{colors.body}"

  comment-thread:
    padding: "0 {spacing.lg}"
    typography: "{typography.body-sm}"
    textColor: "{colors.body}"

  timestamp:
    typography: "{typography.caption}"
    textColor: "{colors.body}"
    textTransform: "uppercase"
    padding: "{spacing.xs} {spacing.lg}"

  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"
    hover: "{colors.primary-hover}"
    disabled: "rgba(0, 149, 246, 0.3)"

  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"

  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"

  text-input:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    borderFocusColor: "{colors.border-strong}"
    typography: "{typography.input}"
    rounded: "{rounded.input}"
    padding: "{spacing.sm} {spacing.sm}"

  search-input:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm} {spacing.lg}"
    iconColor: "{colors.body}"

  avatar:
    rounded: "{rounded.avatar}"
    border: "1px solid {colors.border}"

  avatar-sm:
    size: "22px"
    rounded: "{rounded.avatar}"

  avatar-md:
    size: "32px"
    rounded: "{rounded.avatar}"

  avatar-lg:
    size: "56px"
    rounded: "{rounded.avatar}"

  avatar-xl:
    size: "77px"
    rounded: "{rounded.avatar}"

  avatar-profile:
    size: "150px"
    rounded: "{rounded.avatar}"
    border: "1px solid {colors.border}"

  card-feed:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    border: "1px solid {colors.border}"
    marginBottom: "{spacing.md}"

  card-sidebar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"

  card-dm-thread:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.sm} {spacing.xl}"
    hoverBackground: "{colors.canvas-soft}"

  card-dm-thread-active:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"

  card-dm-message-sent:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg} {spacing.md}"
    typography: "{typography.body-md}"

  card-dm-message-received:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg} {spacing.md}"
    typography: "{typography.body-md}"
    border: "1px solid {colors.border}"

  badge-notification:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    size: "18px"
    rounded: "{rounded.avatar}"

  badge-verified:
    color: "{colors.primary}"
    size: "14px"

  divider:
    borderTop: "1px solid {colors.border}"
    margin: "{spacing.xs} 0"

  modal-overlay:
    backgroundColor: "{colors.overlay}"

  modal-card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"

  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"

  chip-tag:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xxs} {spacing.sm}"

  profile-grid:
    gap: "3px"
    aspectRatio: "1:1"
    rounded: "{rounded.none}"

  profile-grid-overlay:
    backgroundColor: "{colors.overlay}"
    iconColor: "{colors.on-dark}"

  skeleton-loader:
    backgroundColor: "{colors.canvas-soft}"
    rounded: "{rounded.sm}"
    animation: "pulse 1.5s ease-in-out infinite"

  login-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.xs}"
    padding: "{spacing.3xl} {spacing.4xl}"
    maxWidth: "350px"

  login-divider-text:
    typography: "{typography.caption}"
    textColor: "{colors.body}"
    line: "1px solid {colors.border}"

  # ─── Examples (illustrative) — auto-derived ───

  ex-feed-post:
    description: "Full-width feed post card — edge-to-edge image, action bar below, caption block, comment preview, timestamp."
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.none}"
    imageAspectRatio: "1:1"

  ex-story-item:
    description: "Story ring avatar with gradient border, seen/unseen state switch."
    size: "{components.story-avatar-ring.size}"
    borderColor: "{colors.brand-gradient}"
    innerAvatarSize: "{components.story-avatar-ring.innerAvatarSize}"

  ex-dm-bubble-sent:
    description: "Sent message bubble — primary blue background with white text, rounded corners with tail."
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg} {spacing.md}"

  ex-dm-bubble-received:
    description: "Received message bubble — soft gray background with dark text, 1px hairline border."
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg} {spacing.md}"
    border: "1px solid {colors.border}"

  ex-profile-header:
    description: "Profile header — large circular avatar, username + stats row (posts/followers/following), bio block, action buttons."
    avatarSize: "150px"
    statTypography: "{typography.body-md-strong}"
    bioTypography: "{typography.body-md}"

  ex-explore-grid:
    description: "Explore grid — 3-up mosaic of 1:1 thumbnails with 3px gap, no rounded corners, hover overlay on desktop."
    gap: "3px"
    aspectRatio: "1:1"
    hoverOverlay: "{colors.overlay}"

  ex-post-detail-modal:
    description: "Post detail modal — left: full-height image carousel, right: header + comments + action bar + comment input. Desktop-only."
    layout: "side-by-side"
    leftBackground: "{colors.ink}"
    rightBackground: "{colors.canvas}"
    rightWidth: "400px"

  ex-auth-card:
    description: "Login / sign-up card — centered white card with 1px border, brand logo at top, input fields, primary blue button."
    backgroundColor: "{colors.canvas}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.xs}"
    maxWidth: "350px"
    padding: "{spacing.3xl} {spacing.4xl}"

  ex-empty-state:
    description: "Empty state with centered camera-outline icon, headline, and subtext — used for no-posts, no-notifications, no-DMs."
    iconColor: "{colors.ink}"
    headlineTypography: "{typography.title-sm}"
    bodyTypography: "{typography.body-md}"
    textColor: "{colors.body}"

  ex-toast:
    description: "Toast notification — dark pill floating at bottom-center, white text, auto-dismiss."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.md}"
    padding: "{spacing.md} {spacing.lg}"
    typography: "{typography.body-md}"

  ex-skeleton-feed:
    description: "Skeleton loading state for feed — gray placeholder rectangles pulsing at 1.5s infinite."
    backgroundColor: "{colors.canvas-soft}"
    rounded: "{rounded.sm}"
    animation: "pulse"

  ex-confirm-dialog:
    description: "iOS-style action sheet — white card with stacked text-only rows, destructive action in red at bottom."
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    destructiveColor: "{colors.destructive}"

---

## Overview

Instagram is a photo-first social platform and its design surface serves that single truth: the chrome must disappear. Every surface is absolute white (`{colors.canvas}` `#ffffff`) or near-white (`{colors.canvas-soft}` `#fafafa`), every border is a 1 px hairline in `{colors.border}` `#dbdbdb`, and text stays at a tight 14 px system font — because the content owns the entire visual weight. The only decorative colour that appears across the surface is the warm gradient brand mark (`{colors.brand-gradient}` — orange → pink → purple) that rings every unseen Story avatar. There is no second accent, no decorative drop shadow, no colour wash over the feed.

Type is the quietest possible system voice. Instagram uses the native OS system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`) at exactly two core sizes: 14 px for body/usernames and 12 px for captions/metadata. The only differentiation is weight — 600 for usernames and button labels, 400 for body text, 300 for the rare large title. The brand does not use a custom face, display type, serif, or mono companion. The font stack IS the brand's typographic decision: it loads instantly, reads natively on every device, and never competes with the photography.

Every interactive target renders as a system-native shape: buttons at `{rounded.md}` 8 px, inputs at `{rounded.input}` 3 px, and avatars at `{rounded.avatar}` 50 % — perfectly circular. The feed itself uses `{rounded.none}` 0 px on every post card so the image runs edge-to-edge across the full viewport width. Story avatar rings (`{components.story-avatar-ring}`) are 66 px circles with a 2 px gradient border and a 2 px white inner collar — the most decorated element in the entire system and the only place the brand gradient appears as surface chrome.

**Key Characteristics:**
- A single brand gradient `{colors.brand-gradient}` (orange → pink → purple, 45°) used exclusively for unseen Story rings. No other surface element uses this gradient.
- Primary blue `{colors.primary}` (`#0095f6`) for all conversion targets: Log In, Sign Up, Follow, Send. Blue is the action colour; the gradient is the brand colour.
- The feed post is the atomic design unit: full-bleed image → action bar (Like/Comment/Share/Save icons at 24 px, 16 px gap) → caption block (username bold 600 + body 400) → comment preview → timestamp at 12 px gray uppercase.
- No rounded corners on any feed or profile content card. `{rounded.none}` 0 px is deliberate — edge-to-edge means the photo is the frame.
- 1 px `{colors.border}` hairlines on every container that needs separation. No drop shadows. No elevation depth beyond border lines.
- System font stack throughout — no custom faces, no display weights, no typographic personality beyond weight differentiation.
- The Story tray is the only animated decorative surface: a horizontal scroll of 66 px gradient-ringed circles with 12 px username captions below. Seen Stories collapse the gradient to `{colors.border}` gray.
- Dark UI elements (modal overlays, toasts) use `{colors.overlay}` at 60 % black or `{colors.ink}` `#262626` for pill surfaces. No true dark-mode palette.

## Colors

### Brand & Accent
- **Instagram Blue** (`{colors.primary}` — `#0095f6`): The single action accent. Every primary button, Send button, Follow button, and active link. Never used as a decorative fill — reserved for conversion targets and interactive affordances.
- **Instagram Blue Hover** (`{colors.primary-hover}` — `#1877f2`): The darker pressed state for primary buttons.
- **Brand Gradient** (`{colors.brand-gradient}` — `linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)`): The warm orange-to-purple gradient. Used ONLY for unseen Story rings. Never applied to buttons, backgrounds, or text.

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): Absolute white. The default background for all content surfaces — feed, profile, search, post detail.
- **Canvas Soft** (`{colors.canvas-soft}` — `#fafafa`): Near-white tint. Used for input backgrounds, DM received-bubble fill, skeleton loaders, and sidebar hover states.

### Text
- **Ink** (`{colors.ink}` — `#262626`): Near-black. Every headline, username, body paragraph, and interactive icon.
- **Body** (`{colors.body}` — `#8e8e8e`): Secondary gray. Captions, timestamps, comment metadata, placeholder text, "View all X comments" links.
- **Mute** (`{colors.mute}` — `#c7c7c7`): The lightest gray. Input placeholder text, disabled button labels, seen-story rings.

### Border
- **Border** (`{colors.border}` — `#dbdbdb`): The universal hairline. Card separators, input borders, image outlines (when image edge blends with canvas), divider lines.
- **Border Strong** (`{colors.border-strong}` — `#a8a8a8`): Focus-state border on inputs, avatar borders on profile.

### Link
- **Link** (`{colors.link}` — `#00376b`): Dark blue. Used exclusively for in-body @mentions and #hashtag links — NOT for buttons or navigation. This is the text-link colour, distinct from the primary action blue.

### Semantic
- **Destructive** (`{colors.destructive}` — `#ed4956`): Red. Unlike-button active state, delete confirmations, unfollow warnings, notification badges.
- **Success** (`{colors.success}` — `#78de45`): Green. Active dot indicator, "Following" confirmation check.
- **Overlay** (`{colors.overlay}` — `rgba(0, 0, 0, 0.6)`): 60 % black scrim. Modal backdrops, post-detail image background, profile-grid hover overlay.

### Dark Surface
- **On Dark** (`{colors.on-dark}` — `#ffffff`): White text and icons on dark scrims, toasts, and post-detail image backgrounds.

## Typography

### Font Family
A single system-native font stack: **-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif**. The brand deliberately uses the OS system font — it loads at zero network cost, renders with native hinting on every device, and guarantees that the chrome never overshadows the photography. There is no custom face, no serif companion, no mono.

The system font covers weights 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), and 700 (Bold). Instagram uses exactly three: 300 for large titles, 400 for body, 600 for usernames and button labels.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.title-lg}` | 28px | 300 | 32px | 0 | Profile page "username" heading, the only light-weight display. |
| `{typography.title-md}` | 22px | 400 | 26px | 0 | DM thread titles, setting headers. Rare. |
| `{typography.title-sm}` | 16px | 600 | 24px | 0 | Modal titles, nav bar logo text, section headers. |
| `{typography.body-md}` | 14px | 400 | 18px | 0 | The default body. Caption text, comment body, DM message text, bio copy. |
| `{typography.body-md-strong}` | 14px | 600 | 18px | 0 | Post like count, follower count, stat numbers, DM sender name. |
| `{typography.body-sm}` | 12px | 400 | 16px | 0 | Profile bio metadata, "Suggested for you" headers. |
| `{typography.body-sm-strong}` | 12px | 600 | 16px | 0 | Comment username (in-thread), "Follow" button label (small variant). |
| `{typography.caption}` | 12px | 400 | 14px | 0 | Timestamps, "View all N comments", location tags, Story usernames, footer links. |
| `{typography.caption-strong}` | 12px | 600 | 14px | 0 | "Liked by X and Y others" — the bold part of the like attribution. |
| `{typography.username}` | 14px | 600 | 18px | 0 | Feed-post username in caption block. The most common bold-use in the system. |
| `{typography.button-md}` | 14px | 600 | 18px | 0 | All primary and secondary button labels. |
| `{typography.button-sm}` | 12px | 600 | 16px | 0 | Compact button labels (Follow/Unfollow pill in sidebar suggestions). |
| `{typography.input}` | 12px | 400 | 18px | 0 | Input field text (search, comment, login form). |

### Principles
- **14 px body is the backbone.** Every paragraph, every caption, every DM bubble runs at 14 px. The system does not scale body up or down — it stays fixed.
- **Weight 600 = emphasis.** Usernames, button labels, stat numbers. Bold is the only typographic emphasis mechanism — no italic, no underline, no colour change in running text.
- **Weight 300 = the one exception.** The 28 px light title on profile pages is the only lightweight display in the system. It signals "this is a user's space" — calmer, personal, distinct from the feed's utilitarian 14 px.
- **System font only.** No fallback chain beyond OS-native faces. The brand's typographic identity is its absence of typographic identity.

### Note on Font Substitutes
The system font stack is inherently cross-platform. Open-source equivalents:
- **Inter** at weights 300/400/600 with `font-feature-settings: "cv10"` (for period) is the closest free web match.
- **Geist** (Vercel's system-ui clone) at weights 300/400/600 mirrors the native rendering nearly pixel-for-pixel.

## Layout

### Spacing System
- **Base unit**: 4 px. All spacing tokens are multiples of 4.
- **Tokens**: `{spacing.xxs}` 2 px · `{spacing.xs}` 4 px · `{spacing.sm}` 8 px · `{spacing.md}` 12 px · `{spacing.lg}` 16 px · `{spacing.xl}` 20 px · `{spacing.2xl}` 24 px · `{spacing.3xl}` 32 px · `{spacing.4xl}` 40 px.
- **Feed post padding**: Action bar uses `{spacing.lg}` 16 px horizontal padding. Caption block same.
- **Card gap**: Feed posts are separated by `{spacing.md}` 12 px gap (visually a 1 px border line between them).
- **Story tray padding**: Horizontal `{spacing.lg}` 16 px left/right with `{spacing.sm}` 8 px gap between story rings.
- **Icon spacing**: Action bar icons (Like, Comment, Share, Save) use `{spacing.lg}` 16 px gap.

### Grid & Container
- **Mobile feed**: Full-bleed single-column. Posts span `width: 100%` with no border radius. Content IS the container.
- **Desktop feed**: Centered 470 px wide feed column, flanked by sidebar (suggestions) on the right, blank space on the left. Sidebar is ~320 px.
- **Desktop max-width**: The full layout caps around 935 px (feed + sidebar), centred horizontally.
- **Profile grid**: 3-up square thumbnails with 3 px gap. No rounded corners.
- **Explore grid**: 3-up mosaic of 1:1 thumbnails with 3 px gap.
- **DM panel**: Left thread list (350 px) + right message pane (flex remainder). Thread rows are 72 px tall.

### Whitespace Philosophy
Instagram's whitespace is minimalist to the point of austerity. The feed has no interior padding — posts touch the viewport edges. The only breathing room is the 12 px gap between posts (a hairline border) and the 16 px horizontal inset of the action bar and caption block. On desktop, the feed column is centered with generous side gutters that are simply empty canvas. The message: look at the photo, not the frame.

### Responsive Strategy

#### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 640px | Single-column feed. Full-bleed posts. Bottom tab bar replaces top nav. Story tray at top. |
| Tablet | 640–1023px | Single-column feed. Top nav bar visible. Sidebar hidden. |
| Desktop | ≥ 1024px | Two-column: 470 px feed + 320 px sidebar. Top nav bar. Post-detail opens as side-by-side modal. |

#### Touch Targets
- Action bar icons: 24 × 24 px with ~8 px invisible padding → effective touch area ~40 × 40 px. Comfortably meet WCAG AA.
- Story rings: 66 px diameter. Easy tap target at any screen size.
- Buttons: 36 px minimum height (8 px vertical padding + 18 px line-height + 8 px). Meets WCAG AAA.
- Tab bar icons: 44 px total bar height, icons ~22 px with generous tap area.

#### Collapsing Strategy
- **Tab bar (mobile)**: Replaces top nav at < 640 px. Fixed to bottom. 5 tabs: Home, Explore, Reels, Shop, Profile.
- **Sidebar (desktop)**: Hidden entirely at < 1024 px. Profile and navigation collapse into the mobile bottom-tab pattern.
- **Story tray**: Always present at top of feed. Collapses to a single row of circles at all breakpoints; overflows horizontally with native scroll.

#### Image Behavior
- **Feed post**: Full-width at all breakpoints, 1:1 or 4:5 aspect ratio. Portrait images crop to 4:5 max; landscape images pillarbox to 1:1.
- **Story**: 9:16 portrait, full-bleed on mobile. On desktop, centered with dark scrim background.
- **Profile avatar**: 150 px circle on profile page, 77 px on post-detail header, 32 px in feed caption, 22 px in comment threads.
- **Explore thumbnails**: 1:1 squares, edge-to-edge in a 3-up grid.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. | Default for feed posts — the image itself creates the visual boundary. |
| Level 1 — Hairline | 1 px solid `{colors.border}`. | Card separators, input borders, DM bubble outlines, profile avatar outlines. Every container boundary. |
| Level 2 — Scrim | `{colors.overlay}` 60 % black backdrop. | Modal backdrops, post-detail image backgrounds, loading overlays. |

Instagram does not use drop shadows. Depth comes from: (1) the contrast between the pure-white surface and the photography, (2) the 1 px hairline border on containers that need explicit separation, and (3) the dark overlay scrim for modal contexts. There is no z-index shadow layering. The design is intentionally flat.

### Decorative Depth
- **Story gradient ring**: The 2 px `{colors.brand-gradient}` ring around unseen Story avatars is the only decorative surface treatment in the entire system. It creates a subtle "glow" effect that draws the eye to new content without any shadow or elevation cue.
- **Hover overlays**: On desktop, hovering an Explore thumbnail or profile grid item shows a dark scrim with icon + count overlay. This is the only interactive depth cue — it signals "this is tappable/pressable."

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Feed posts, profile grid thumbnails, Explore grid thumbnails, card containers. Edge-to-edge is the default. |
| `{rounded.xs}` | 2px | Login card border (nearly square, just softened 2 px). |
| `{rounded.sm}` | 4px | Chip tags, skeleton-loader bars, small inline labels. |
| `{rounded.md}` | 8px | Primary and secondary buttons. The standard interactive shape. |
| `{rounded.lg}` | 12px | Modal cards, action sheets, confirm dialogs. |
| `{rounded.xl}` | 16px | DM message bubbles. Rounded enough to read as "chat" but not pill-shaped. |
| `{rounded.pill}` | 26px | "Following" status pill button, small toggle chips. |
| `{rounded.avatar}` | 50% | All avatars — 22 px to 150 px. Perfect circles. |
| `{rounded.story-ring}` | 50% | Story avatar rings. Perfect circles at 66 px. |
| `{rounded.input}` | 3px | Text input fields, search bar. Slightly rounded but reads as rectangular. |

### Image Geometry
- **Feed post**: 1:1 (square) default, 4:5 (portrait) maximum, 1.91:1 (landscape) minimum. No rounded corners — the image bleeds to the container edge.
- **Story**: 9:16 portrait, full-bleed on mobile. On desktop, centered in a dark-scrim viewport.
- **Profile avatar**: Perfect circle at all sizes. 1 px `{colors.border}` outline.
- **Story ring**: 66 px outer circle (gradient), 58 px inner circle (avatar), 2 px white collar between them.

## Components

### Navigation

**`nav-bar`** — the white top nav, fixed at 54 px height.
- Background `{colors.canvas}`, bottom border 1 px `{colors.border}`. Layout: Instagram wordmark/logo left, search input center, icon row right (Home, DM, New Post, Explore, Activity, Profile). Icons at 24 px in `{colors.ink}`. Profile icon is a 24 px circular avatar.

**`nav-bar-icon`** — 24 px SVG icons in `{colors.ink}`.
- Standard icon set: Home (house), DM (speech-bubble), New Post (plus-in-square), Explore (compass), Activity (heart), Profile (avatar circle).

**`tab-bar`** — the bottom tab bar on mobile (< 640 px).
- Background `{colors.canvas}`, top border 1 px `{colors.border}`, height 44 px. 5 tabs: Home, Explore, Reels, Shop, Profile. Active state: filled icon variant. Inactive: outlined icon. Labels in `{typography.caption}`.

### Story System

**`story-avatar-ring`** — the unseen Story indicator, Instagram's signature UI element.
- 66 × 66 px circle rendered with `{colors.brand-gradient}` as a 2 px ring. Inner avatar is 58 px with a 2 px white (`{colors.canvas}`) collar separating it from the gradient. Username below in `{typography.caption}` at `{colors.ink}`, max 74 px wide with ellipsis overflow.

**`story-avatar-ring-seen`** — the seen Story state.
- Same 66 px circle but the gradient collapses to `{colors.border}` `#dbdbdb` gray. The gradient IS the unseen signal.

### Feed Post

**`card-feed`** — the atomic feed unit.
- Background `{colors.canvas}`, 1 px `{colors.border}` border, `{rounded.none}` 0 px. Structure: header (32 px avatar + username, 12 px padding) → image (1:1 or 4:5, full-bleed) → action bar (24 px icons, 16 px gap) → like count in `{typography.body-md-strong}` → caption block → comment preview → timestamp.

**`post-image`** — the content image.
- Full container width. 1:1 or 4:5 aspect ratio. `{rounded.none}` 0 px. When image background ≈ `{colors.canvas}`, a 1 px `{colors.border}` border is added so the image edge remains visible.

**`action-bar`** — the Like/Comment/Share/Save row below the post image.
- 24 px icons in `{colors.ink}`, 16 px gap between each. Like icon fills to `{colors.destructive}` red with a scale(1.2) ease-out animation on tap. Save icon pins right. Layout: 3 icons left (Like, Comment, Share), 1 icon right (Save).

**`action-bar-icon-liked`** — the active Like state.
- Filled heart icon in `{colors.destructive}` `#ed4956` with a brief scale-pop animation (0.2s ease-out).

**`caption-block`** — the caption area below the action bar.
- Padding `{spacing.sm} {spacing.lg}`. Username in `{typography.username}` (14 px, 600 weight) inline with body text in `{typography.body-md}` (14 px, 400 weight). "more" overflow link in `{colors.body}` gray.

**`timestamp`** — the post timestamp.
- `{typography.caption}` at `{colors.body}` gray, uppercase. Below the caption block with `{spacing.xs}` 4 px padding above.

### Comments

**`comment-thread`** — inline comment preview below the caption.
- Username in `{typography.body-sm-strong}`, body in `{typography.body-sm}`, color `{colors.body}`. "View all N comments" link in `{typography.caption}` at `{colors.body}`.

### Avatars

**`avatar`** — the universal user avatar.
- Perfect circle (`{rounded.avatar}` 50%), 1 px `{colors.border}` outline. Size variants: `avatar-sm` 22 px (comment threads), `avatar-md` 32 px (feed post header, DM thread list), `avatar-lg` 56 px (sidebar suggestions), `avatar-xl` 77 px (post-detail header), `avatar-profile` 150 px (profile page).

### Buttons

**`button-primary`** — the blue action button.
- Background `{colors.primary}` `#0095f6`, text `{colors.on-primary}` white, label in `{typography.button-md}` (14 px, 600), padding `{spacing.sm} {spacing.lg}`, shape `{rounded.md}` 8 px. Hover darkens to `{colors.primary-hover}` `#1877f2`. Disabled state: 30 % opacity on the blue fill.

**`button-secondary`** — the transparent blue text button.
- Background transparent, text `{colors.primary}`, label in `{typography.button-md}`, no border. Used for "Log In" (alternate), "See All", "Follow" (small variant).

**`button-ghost`** — the transparent dark text button.
- Background transparent, text `{colors.ink}`, label in `{typography.button-md}`. Used for "Cancel", "Not Now", "Skip".

### Inputs

**`text-input`** — the standard form input.
- Background `{colors.canvas-soft}` `#fafafa`, text `{colors.ink}`, 1 px `{colors.border}` border (focus: `{colors.border-strong}`), typography `{typography.input}` (12 px, 400), padding `{spacing.sm}` 8 px, shape `{rounded.input}` 3 px.

**`search-input`** — the search bar variant.
- Background `{colors.canvas-soft}`, placeholder text in `{colors.body}`, typography `{typography.body-md}` (14 px), padding `{spacing.sm} {spacing.lg}`, shape `{rounded.md}` 8 px. Search icon at left in `{colors.body}`, clear (×) icon at right when text present.

### Direct Messages

**`card-dm-thread`** — the DM thread list item.
- Background `{colors.canvas}`, padding `{spacing.sm} {spacing.xl}`, 32 px circular avatar left, sender name + message preview right. Hover background `{colors.canvas-soft}`. Active thread background `{colors.canvas-soft}`.

**`card-dm-message-sent`** — the sent message bubble.
- Background `{colors.primary}`, text `{colors.on-primary}`, shape `{rounded.xl}` 16 px, padding `{spacing.lg}` 16 px horizontal, `{spacing.md}` 12 px vertical. Typography `{typography.body-md}`. Right-aligned in the message pane.

**`card-dm-message-received`** — the received message bubble.
- Background `{colors.canvas-soft}`, text `{colors.ink}`, shape `{rounded.xl}` 16 px, 1 px `{colors.border}` outline. Same padding and typography as sent bubble. Left-aligned.

### Profile

**`profile-header`** — the profile page header.
- 150 px circular avatar left, username + stats row (Posts / Followers / Following) right. Stat numbers in `{typography.body-md-strong}`, labels in `{typography.body-md}`. Bio block below in `{typography.body-md}`. Action buttons below bio. Grid/Reels tabs below buttons.

**`profile-grid`** — the 3-up post grid.
- 1:1 square thumbnails with 3 px gap. `{rounded.none}` 0 px. Hover overlay (desktop): `{colors.overlay}` scrim with centered Like/Comment count icons in white.

### Modals & Overlays

**`modal-overlay`** — the dark backdrop scrim.
- `{colors.overlay}` rgba(0, 0, 0, 0.6) across the full viewport. Click-to-dismiss.

**`modal-card`** — the modal surface.
- Background `{colors.canvas}`, shape `{rounded.md}` 12 px, padding `{spacing.lg}`.

**`ex-post-detail-modal`** — the post detail side-by-side layout.
- Desktop: left pane = full-height image on `{colors.ink}` black background, right pane = 400 px white card with header + scrollable comments + action bar + add-comment input. Mobile: full-screen image carousel with overlay sheet.

### Feedback & Status

**`toast`** — the dark notification pill.
- Background `{colors.ink}` `#262626`, text `{colors.on-dark}` white, label in `{typography.body-md}`, shape `{rounded.md}` 8 px, padding `{spacing.md} {spacing.lg}`. Centered at bottom of screen, auto-dismiss after 3s.

**`badge-notification`** — the red notification dot.
- Background `{colors.destructive}`, 18 px circle, white text (count or empty dot). Positioned at top-right of icon. `{rounded.avatar}` 50%.

**`badge-verified`** — the blue verified checkmark.
- `{colors.primary}` icon, 14 px, placed inline after username.

**`skeleton-loader`** — the content placeholder.
- `{colors.canvas-soft}` gray bar with `{rounded.sm}` 4 px, pulsing opacity animation (1.5s ease-in-out infinite). Used for feed posts, profile grid, DM threads during loading.

### Login

**`login-card`** — the authentication card.
- Background `{colors.canvas}`, 1 px `{colors.border}` border, shape `{rounded.xs}` 2 px, padding `{spacing.3xl} {spacing.4xl}`, max-width 350 px, centered in viewport. Contains: Instagram logo → input fields → primary button → divider with "OR" caption → Facebook login link → "Forgot password?" → "Create new account" secondary link.

### Examples (illustrative)

> Each `ex-*` entry references brand-native primitives so downstream consumers re-skin the same surface consistently.

**`ex-feed-post`** — Full-width feed post card.
- Edge-to-edge image (1:1), action bar, caption block, comment preview, timestamp.

**`ex-story-item`** — Story ring avatar with unseen/seen gradient state switch.

**`ex-dm-bubble-sent`** — Sent DM bubble — blue fill, white text, 16 px rounded corners.

**`ex-dm-bubble-received`** — Received DM bubble — soft gray fill, dark text, 1 px hairline border.

**`ex-profile-header`** — Profile header — 150 px avatar, username, stats row, bio, action buttons.

**`ex-explore-grid`** — 3-up mosaic of 1:1 thumbnails, 3 px gap, hover overlay.

**`ex-post-detail-modal`** — Side-by-side post detail on desktop, full-screen on mobile.

**`ex-auth-card`** — Login/sign-up card — 350 px white card, 1 px border, 2 px rounded edges.

**`ex-empty-state`** — Centered camera-icon + headline + subtext for empty states.

**`ex-toast`** — Dark pill toast floating at bottom-center, auto-dismiss.

**`ex-skeleton-feed`** — Gray pulsing placeholder rectangles for loading feed.

**`ex-confirm-dialog`** — iOS-style action sheet with stacked rows, destructive action in red.

## Do's and Don'ts

### Do
- Set the feed post `{rounded.none}` 0 px. The image owns the edge. Never frame content with card radius.
- Use `{colors.primary}` blue `#0095f6` exclusively for action targets: Follow, Send, Log In, Sign Up. One colour, one purpose.
- Ring unseen Stories with `{colors.brand-gradient}` — it is the only decorative surface treatment in the system. Never use the gradient elsewhere.
- Render avatars as perfect circles (`{rounded.avatar}` 50%) with a 1 px `{colors.border}` hairline. Every avatar, every size.
- Stick to 14 px for all body and caption text. The system's consistency comes from its refusal to scale type.
- Use 1 px `{colors.border}` `#dbdbdb` hairlines — not shadows — for every container boundary.
- Let the system font stack load natively. The brand has no custom face and that IS the brand decision.

### Don't
- Don't put rounded corners on feed posts or profile grid thumbnails. `{rounded.none}` 0 px is non-negotiable.
- Don't use the brand gradient on buttons, backgrounds, or text. It belongs exclusively to unseen Story rings.
- Don't add drop shadows. The Instagram surface uses border hairlines exclusively for separation.
- Don't use `{colors.primary}` blue as a decorative fill, background wash, or icon tint outside of interactive targets.
- Don't introduce a second accent colour. Blue + gradient + red (destructive only) + grayscale.
- Don't change the font stack. System font only. No custom faces, no serifs, no display weights beyond 300 for the profile title.
- Don't use heavy borders. 1 px `{colors.border}` is the maximum weight for any divider or outline.
- Don't centre-align body text. Left-aligned, 14 px, 400 weight, neutral tracking — the content speaks.
