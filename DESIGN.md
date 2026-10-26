---
name: Toby Retallick
description: A personal portfolio set as a well-set handout, with a serif reading column and facts in the margin.
colors:
  blue-black-ink: '#1d3a6b'
  warm-white-paper: '#fcfbf8'
  paper-shade: '#f5f5f3'
  press-black: '#22201d'
  pencil-grey: '#5c5a56'
  hairline: '#d8d8d4'
  control-grey: '#767676'
  correction-red: '#a3262a'
  confirmed-green: '#1e6b45'
  night-paper: '#151515'
  night-paper-shade: '#1e1e1d'
  night-ink: '#e8e6e1'
  night-pencil: '#a8a6a1'
  night-blue-ink: '#9fbbe8'
  night-hairline: '#3a3a38'
  night-control: '#8a8a87'
  night-correction: '#f08a8a'
  night-confirmed: '#7cc79d'
typography:
  display:
    fontFamily: "'Literata Variable', 'Literata', Georgia, 'Times New Roman', serif"
    fontSize: '2.75rem'
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: '-0.01em'
  headline:
    fontFamily: "'Literata Variable', 'Literata', Georgia, 'Times New Roman', serif"
    fontSize: '1.625rem'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Literata Variable', 'Literata', Georgia, 'Times New Roman', serif"
    fontSize: '1.25rem'
    fontWeight: 400
    lineHeight: 1.6
  title:
    fontFamily: "'Literata Variable', 'Literata', Georgia, 'Times New Roman', serif"
    fontSize: '1.25rem'
    fontWeight: 600
    lineHeight: 1.6
  label:
    fontFamily: "'Atkinson Hyperlegible Next Variable', 'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: '0'
spacing:
  '1': '0.25rem'
  '2': '0.5rem'
  '3': '0.75rem'
  '4': '1rem'
  '6': '1.5rem'
  '8': '2rem'
  '12': '3rem'
  '16': '4rem'
  '24': '6rem'
  '32': '8rem'
components:
  button-primary:
    backgroundColor: '{colors.press-black}'
    textColor: '{colors.warm-white-paper}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.75rem 1.5rem'
  button-primary-hover:
    backgroundColor: '{colors.blue-black-ink}'
    textColor: '{colors.warm-white-paper}'
  button-secondary:
    backgroundColor: '{colors.warm-white-paper}'
    textColor: '{colors.press-black}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.75rem 1.5rem'
  link:
    textColor: '{colors.blue-black-ink}'
  input:
    backgroundColor: '{colors.warm-white-paper}'
    textColor: '{colors.press-black}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0.5rem 0.75rem'
  tag:
    textColor: '{colors.pencil-grey}'
    typography: '{typography.label}'
    rounded: '{rounded.none}'
    padding: '0 0.5rem'
---

# Design System: Toby Retallick

## Overview

**Creative North Star: "The Well-Set Handout"**

Every page is a well-set handout. A calm serif reading column carries the story, and the facts sit beside it in a margin, like sidenotes in a scholarly handout. The mood is calm, plain and exact. The system owes its plainness and respect for the reader to GOV.UK, but it uses none of GOV.UK's look. The goal is the comfort of reading on an e-reader, on desktop and on a phone.

Density is low. One reading column of about 34em carries the text, and nothing competes with it. Ink sits on paper with hairline rules between parts. There are no boxes, no shadows, no rounded corners and no gradients. Depth comes from type, space and rules, not from surfaces.

The system refuses the portfolio defaults: a hero banner, a grid of project cards, and badges. Layouts are left-aligned and text-led. A visual anti-reference is the first GOV.UK-patterned build, which the owner rejected as too close a copy: no yellow-and-black focus bar, no black service strip, no crown and no Transport font.

**Key Characteristics:**

- One serif reading column, about 65 to 70 characters wide.
- A margin of notes beside the column on wide screens, folded under the title on phones.
- Warm white paper and near-black ink, with one accent: blue-black ink.
- A true night page in dark mode, chosen by the device or by the header switch.
- Hairline rules, square corners, no shadows.

## Colors

Ink on warm paper, with one blue-black ink for anything the reader can act on.

### Primary

- **Blue-Black Ink** (`blue-black-ink`; `night-blue-ink` at night): the only accent. It marks links in text, the focus ring, the current nav item's underline, text selection, availability notes, the left rule of a pull quote and the hover state of the primary button. It reads as fountain-pen ink, not as an interface blue.

### Neutral

- **Warm White Paper** (`warm-white-paper`; `night-paper` at night): the page. Every surface is this paper. There are no tinted panels.
- **Paper Shade** (`paper-shade`; `night-paper-shade`): the faint background behind inline code. Use it for nothing larger.
- **Press Black** (`press-black`; `night-ink`): body text, headings, and the fill of the primary button.
- **Pencil Grey** (`pencil-grey`; `night-pencil`): subtitles, metadata lines, margin-note content, hints and tags.
- **Hairline** (`hairline`; `night-hairline`): every rule and divider, and the border of tags and the theme switch.
- **Control Grey** (`control-grey`; `night-control`): the border of form fields and the secondary button. It meets the 3:1 contrast that controls need.

### Status

- **Correction Red** (`correction-red`; `night-correction`): form errors and the error summary rule only.
- **Confirmed Green** (`confirmed-green`; `night-confirmed`): a sent-message confirmation only.

### Named Rules

**The One Ink Rule.** Blue-black ink is the only accent. If an element is not a link, a focus ring, a current-page marker, an availability note or a pull-quote rule, it is not blue.

**The Paper Is the Surface Rule.** Every block sits on the page paper. Separate parts with a hairline rule or space, never with a tinted box.

**The Semantic Token Rule.** Components use only the semantic tokens (`bg`, `text`, `text-secondary`, `accent`, `link`, `rule`, `control`, `focus`, `error`, `success`). The raw paper and ink values change with the theme. Components never name them.

## Typography

**Display Font:** Literata Variable (with Georgia and Times New Roman)
**Body Font:** Literata Variable (with Georgia and Times New Roman)
**Label Font:** Atkinson Hyperlegible Next Variable (with system-ui)

**Character:** Literata is a book face made for screen reading. It carries headings and prose, and its italic sets subtitles and quotes. Atkinson Hyperlegible Next is a plain, very legible sans for the interface: navigation, buttons, labels, metadata and margin notes. The pairing reads as a printed page with a clear set of labels.

### Hierarchy

Four roles. Each one is smaller on phones and grows at 48rem.

- **Display** (Literata 400, 2rem on phones to 2.75rem, line height 1.2, tracking -0.01em): the page H1 only.
- **Headline** (Literata 600, 1.375rem to 1.625rem, line height 1.3): H2 section headings.
- **Title** (Literata 600, body size, line height 1.6): H3 headings and case study titles in lists.
- **Body** (Literata 400, 1.125rem to 1.25rem, line height 1.6): prose, in a 34em measure. Italic in Pencil Grey for subtitles.
- **Label** (Atkinson 400 or 600, 0.9375rem to 1rem, line height 1.5): interface text, margin notes, metadata lines, buttons and form labels. Margin-note labels are semibold in Press Black, and their content is regular in Pencil Grey.

Headings use balanced wrapping. Paragraphs, list items and quotes use pretty wrapping and hanging punctuation. Dates and table figures use tabular numerals.

### Named Rules

**The Two Faces Rule.** Literata is for reading. Atkinson is for the interface. A margin note, a button or a metadata line is never set in Literata, and prose is never set in Atkinson.

**The Quiet Margin Rule.** Nothing in the margin is set larger than body text. Margin notes are smaller and quieter than the reading column, in the Label role. A quote that needs heading size belongs in the reading column, not the margin.

**The Weight Ceiling Rule.** The H1 is regular weight (400). Semibold (600) is the heaviest weight in normal use. Size, not weight, makes the title.

## Layout

The page container is 72rem wide, centred, with a side gutter of 1rem on phones and 2rem from 48rem.

The signature is the handout grid. From 64rem it has two tracks: a reading column of up to 34em, then a 16rem margin, with at least a 3rem gap. The margin sits flush with the page's right edge, in line with the header's theme switch. The title starts the reading column, and the margin notes start level with the title. When a page has a lead section, it sits between the title and the body, and the margin spans all three rows. Below 64rem the grid is one column: the title, the lead, then the notes (after a hairline rule), then the body. A page with a byline hides its notes below 64rem instead, and shows the byline above the title. On Home the notes are sticky from 64rem: they stay in view, 3rem from the top, as the reader scrolls.

Vertical rhythm uses a 4px base (keys 1 to 32). Typical gaps: 0.5rem inside a group, 1.5rem between groups, 3rem between sections, and 3rem to 4rem above and below the page body.

Single-column pages, such as forms, use a narrow 28rem container. The site is checked at 360px, 768px and 1280px.

### Named Rules

**The Measure Rule.** Running text never exceeds the 34em reading measure. Wide screens get more margin, not longer lines.

## Elevation & Depth

The system is flat. There are no shadow tokens and no shadows anywhere. Depth and grouping come from hairline rules, white space, type size and the left indent of quotes and callouts. The one raised-looking element is the solid Press Black primary button, and it is flat too.

### Named Rules

**The Flat Page Rule.** Nothing floats above the paper. If something needs to stand apart, give it a rule, an indent or more space.

## Shapes

Every corner is square. There are no radius tokens. Lines are the only shapes: a 1px hairline for rules and quiet borders, and a 2px line for emphasis (a pull quote's left rule, the current nav underline, an error summary's top rule and an error field's border). The focus ring is a 3px Blue-Black Ink outline, 3px from the element.

The headshot is the only photograph. It is a square crop with no frame or border.

## Components

The components are plain and printed. Controls look set in type, not built as widgets.

### Buttons

- **Shape:** square corners, a 1px border, padding of 0.75rem by 1.5rem, Atkinson semibold.
- **Primary:** Press Black fill and border with paper-coloured text. On hover the fill and border change to Blue-Black Ink over 150ms.
- **Secondary:** paper fill, Press Black text and a Control Grey border. On hover the border darkens to Press Black.
- **Focus:** the global 3px Blue-Black Ink outline.
- **Disabled:** half opacity and a not-allowed cursor.

### Links

- **In text:** Blue-Black Ink, always underlined with a 1px line, offset 4px. On hover the underline thickens to 2px.
- **Quiet (navigation):** Press Black, no underline until hover. The current page carries a 2px Blue-Black Ink underline.
- **External:** same tab, with `rel="external"`. A link that must open a new tab says so in its accessible name.

### Inputs / Fields

- **Style:** square corners, a 1px Control Grey border on paper, padding of 0.5rem by 0.75rem, Atkinson text.
- **Labels and hints:** a semibold label above, then a hint in Pencil Grey.
- **Error:** a semibold Correction Red message above the field and a 2px Correction Red border. An error summary at the top of the form lists every error, links each one to its field and takes focus on load.

### Tags

- **Style:** Atkinson Label text in Pencil Grey, a 1px hairline border, square corners, 0.5rem side padding. Tags label facts. They are never buttons or filters.

### Navigation

- **Style:** a top line with a bottom hairline. The name sits on the left in Atkinson semibold. The nav links and the theme switch sit on the right.
- **Phones:** the nav wraps onto its own row under the name and the theme switch.
- **Theme switch:** one square button with a hairline border and a sun or moon icon. It follows the device until pressed, then remembers the choice.

### Margin Note (signature component)

A short semibold label in Press Black and its content in Pencil Grey, both in the Label role. Notes stack in the margin with 1rem between them. Typical notes: availability, based in, how to get in touch, and a case study's client, role, team and stack.

### Byline

On phones and tablets only, the home page opens with a byline above the H1: a small square headshot (4.5rem) beside the name in Atkinson semibold, the availability as a link to LinkedIn, and the location in Pencil Grey. It replaces the margin notes below 64rem, so the visitor sees who this is, when they are free and how to act on the first screen.

### Pull Quote

Literata italic with a 2px Blue-Black Ink rule on the left, and a credit in Atkinson below: an optional logo, the name in semibold, the role in Pencil Grey, and a source link. Under the Quiet Margin Rule, a pull quote at heading size goes in the reading column.

### Case Study Entry

A hairline rule above, the title as a Title-size link, a one-line summary in Body, and a metadata line in Pencil Grey Label text (sector, role, dates and the first three stack items). There are no cards, images or badges.

## Do's and Don'ts

### Do:

- **Do** keep running text inside the 34em measure.
- **Do** put facts (availability, location, contact, role, stack) in margin notes, set in the Label role.
- **Do** use Blue-Black Ink only for links, focus, the current page and the pull-quote rule.
- **Do** separate parts with a hairline rule or space.
- **Do** keep every corner square and every surface flat.
- **Do** use only semantic colour tokens and the spacing scale in components.
- **Do** check every change in light and dark, at 360px, 768px and 1280px.

### Don't:

- **Don't** set anything in the margin larger than body text.
- **Don't** add shadows, gradients, rounded corners, glass effects or tinted panels.
- **Don't** use cards, badges, a hero banner or a centred hero.
- **Don't** use emoji icons, stock illustrations or animated decoration.
- **Don't** use GOV.UK's look: no yellow-and-black focus bar, no black service strip, no crown and no Transport font.
- **Don't** add a second accent colour.
- **Don't** set prose in Atkinson or interface text in Literata.
