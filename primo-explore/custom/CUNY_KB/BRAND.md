# Kingsborough Community College

**Primo view code**: `CUNY_KB`
**OneSearch**: <https://cuny-kb.primo.exlibrisgroup.com/>
**Campus website**: <https://www.kbcc.cuny.edu/>

A community college in Manhattan Beach, Brooklyn, with a maritime focus.

---

## Brand / Identity Guide

- [KCC Communications and Marketing](https://www.kbcc.cuny.edu/CommunicationsandMarketing/)

> No dedicated public brand guide PDF found for Kingsborough. Contact the KCC Communications and Marketing office for official color specifications. The current navy (#002c73) and orange (#ff4e00) are a classic academic palette.


## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._

---

## Current `colors.json.txt`

```json
{
  "primary": "#002c73",
  "secondary": "#ff4e00",
  "backgroundColor": "#ffffff",
  "links": "#3966bf",
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
| `primary (as text)` | `#002c73` | 13.06:1 | PASS |
| `secondary (as button text)` | `#ff4e00` | 3.31:1 | PASS (large text only) |
| `links` | `#3966bf` | 5.49:1 | PASS |

> All key colors meet WCAG 2.1 AA contrast requirements on the white background. Still verify secondary color usage in context.

### Issues to fix

- **secondary** `#ff4e00` (orange, 3.31:1) does not meet 4.5:1 AA for normal text when used as button/link text on white. It narrowly passes 3:1 for large text only.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- No critical WCAG failures detected. Run a full audit with an automated tool (e.g., [axe](https://www.deque.com/axe/), [WAVE](https://wave.webaim.org/)) against the live Primo page to catch component-level issues.
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
