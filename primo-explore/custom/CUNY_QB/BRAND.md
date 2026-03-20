# Queensborough Community College

**Primo view code**: `CUNY_QB`
**OneSearch**: <https://cuny-qb.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_QB:CUNY_QB>
**Campus website**: <https://www.qcc.cuny.edu/>

A community college in Bayside, Queens.

---

## Brand / Identity Guide

- [QCC Identity Standards](https://www.qcc.cuny.edu/communications/)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/QCCIdentityStandards.pdf)

> Consult the QCC Identity Standards PDF for official color specifications.


## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._

---

## Current `colors.json.txt`

```json
{
  "primary": "#00306d",
  "secondary": "#f6b72b",
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
| `primary (as text)` | `#00306d` | 12.78:1 | PASS |
| `secondary (as button text)` | `#f6b72b` | 1.79:1 | **FAIL** |
| `links` | `#5C92BD` | 3.33:1 | PASS (large text only) |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - links `#5C92BD` (3.33:1)
> - secondary `#f6b72b` (1.79:1, fails even for large text)

### Issues to fix

- **links** `#5C92BD` (medium blue, 3.33:1) fails AA for normal text. Replace with a darker accessible blue, e.g. `#1a5f8a` (5.3:1).

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #5C92BD: verify or replace `#5C92BD` with an accessible alternative that also aligns with official brand colors
- [ ] Fix #f6b72b: verify or replace `#f6b72b` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
