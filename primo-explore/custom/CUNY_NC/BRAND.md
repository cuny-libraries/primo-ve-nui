# Guttman Community College

**Primo view code**: `CUNY_NC`
**OneSearch**: <https://cuny-nc.primo.exlibrisgroup.com/>
**Campus website**: <https://guttman.cuny.edu/>

Stella and Charles Guttman Community College in Midtown Manhattan, CUNY's newest community college.

---

## Brand / Identity Guide

- [Guttman Identity Standards Manual](https://guttman.cuny.edu/)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing/campus-identity/Guttman_Identity_Standards_Manual.pdf)

> The Guttman Identity Standards Manual PDF contains official color specs. The current primary (#0c2255, dark navy) and secondary (#F26822, orange) appear to reflect a CUNY Network palette rather than Guttman's own identity (sky blue and red). Verify against the manual.


## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._

---

## Current `colors.json.txt`

```json
{
  "primary": "#0c2255",
  "secondary": "#F26822",
  "backgroundColor": "#ffffff",
  "links": "#1B75BC",
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
| `primary (as text)` | `#0c2255` | 15.27:1 | PASS |
| `secondary (as button text)` | `#F26822` | 3.10:1 | PASS (large text only) |
| `links` | `#1B75BC` | 4.86:1 | PASS |

> All key colors meet WCAG 2.1 AA contrast requirements on the white background. Still verify secondary color usage in context.

### Issues to fix

- **secondary** `#F26822` (orange, 3.10:1) fails AA for normal text when used as button text on white.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- No critical WCAG failures detected. Run a full audit with an automated tool (e.g., [axe](https://www.deque.com/axe/), [WAVE](https://wave.webaim.org/)) against the live Primo page to catch component-level issues.
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
