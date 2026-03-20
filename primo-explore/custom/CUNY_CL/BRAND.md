# CUNY School of Law

**Primo view code**: `CUNY_CL`
**OneSearch**: <https://cuny-cl.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_CL:CUNY_CL>
**Campus website**: <https://www.law.cuny.edu/>

A public law school in Long Island City, Queens, with a focus on law in the service of human needs.

---

## Brand / Identity Guide

- [CUNY School of Law — Communications](https://www.law.cuny.edu/communications/)

> No publicly available detailed brand guide found. Contact law.cuny.edu communications to obtain official color specifications.


## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._

---

## Current `colors.json.txt`

```json
{
  "primary": "#353A3D",
  "secondary": "#d1d63b",
  "backgroundColor": "#ffffff",
  "links": "#008e7e",
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
| `primary (as text)` | `#353A3D` | 11.51:1 | PASS |
| `secondary (as button text)` | `#d1d63b` | 1.57:1 | **FAIL** |
| `links` | `#008e7e` | 4.06:1 | PASS (large text only) |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - links `#008e7e` (4.06:1)
> - secondary `#d1d63b` (1.57:1, fails even for large text)

### Issues to fix

- **links** `#008e7e` (teal, 4.06:1) fails AA for normal text. Darken to e.g. `#006b5e` (5.7:1) or `#005a4f` (6.8:1).

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #008e7e: verify or replace `#008e7e` with an accessible alternative that also aligns with official brand colors
- [ ] Fix #d1d63b: verify or replace `#d1d63b` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
