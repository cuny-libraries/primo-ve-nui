# Bronx Community College

**Primo view code**: `CUNY_BX`
**OneSearch**: <https://cuny-bx.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_BX:CUNY_BX>
**Campus website**: <https://www.bcc.cuny.edu/>

A community college in the University Heights neighborhood of the Bronx.

---

## Brand / Identity Guide

- [BCC Visual Identity & Resources](https://www.bcc.cuny.edu/about-bcc/communications-and-marketing/visual-identity-elements-resources/)

> Current primary (#0e754b) appears to match BCC's green identity. Verify against the latest brand guide PDF on their communications page.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| BCC Green | Primary | `#0e754b` | — | 5.73:1  |

---

## Current `colors.json.txt`

```json
{
  "primary": "#0e754b",
  "secondary": "#A9CDD6",
  "backgroundColor": "#ffffff",
  "links": "#5C92BD",
  "warning": "#ff6347",
  "positive": "#0f7d00",
  "negative": "#808080",
  "notice": "#e08303"
}
```

---

## WCAG 2.1 AA Compliance

**Minimum ratios**: 4.5:1 for normal text, 3:1 for large text (18pt / 14pt bold) and UI components.

| Color role | Current hex | Contrast on white | Status |
|------------|-------------|-------------------|--------|
| `primary (as text)` | `#0e754b` | 5.73:1 | PASS |
| `secondary (as button text)` | `#A9CDD6` | 1.69:1 | **FAIL** |
| `links` | `#5C92BD` | 3.33:1 | PASS (large text only) |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - links `#5C92BD` (3.33:1)
> - secondary `#A9CDD6` (1.69:1, fails even for large text)

### Issues to fix

- **links** `#5C92BD` (3.33:1 on white) fails WCAG AA minimum of 4.5:1. Change to a darker accessible blue, e.g. `#1a6a9e` (5.06:1) or `#0a5a8e` (5.8:1).

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #5C92BD: verify or replace `#5C92BD` with an accessible alternative that also aligns with official brand colors
- [ ] Fix #A9CDD6: verify or replace `#A9CDD6` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
