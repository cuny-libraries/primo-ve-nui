# The City College of New York

**Primo view code**: `CUNY_CC`
**OneSearch**: <https://cuny-cc.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_CC:CUNY_CC>
**Campus website**: <https://www.ccny.cuny.edu/>

The flagship college of CUNY, located in Hamilton Heights, Manhattan. Includes the Division of Science and Innovation (DSI).

---

## Brand / Identity Guide

- [CCNY Logos and Branding](https://www.ccny.cuny.edu/communications-marketing/logosbranding)
- [Brand Guide PDF](https://www.ccny.cuny.edu/sites/default/files/2025-03/CCNY-Style-Guide.pdf)

> CCNY's official colors are purple and gray. The current primary (#77787C) is a flat gray, not CCNY purple. This is both a WCAG issue AND a brand misalignment.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| CCNY Purple | Primary | `#5b2d8e` | PMS 267 C | 9.50:1  |
| CCNY Gray | Secondary | `#808080` | PMS 425 C (85% black in CMYK) | 3.95:1 *(large text only)* |

---

## Current `colors.json.txt`

```json
{
  "primary": "#77787C",
  "secondary": "#7D5CC6",
  "backgroundColor": "#ffffff",
  "links": "#7D5CC6",
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
| `primary (as text)` | `#77787C` | 4.41:1 | PASS (large text only) |
| `secondary (as button text)` | `#7D5CC6` | 4.98:1 | PASS |
| `links` | `#7D5CC6` | 4.98:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - primary `#77787C` (4.41:1)

### Issues to fix

- **primary** `#77787C` (4.41:1) narrowly fails the 4.5:1 AA threshold for normal text. More critically, it does not reflect CCNY's official purple. Switching to the brand purple (#5b2d8e, 9.33:1) would fix both issues.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #77787C: verify or replace `#77787C` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
