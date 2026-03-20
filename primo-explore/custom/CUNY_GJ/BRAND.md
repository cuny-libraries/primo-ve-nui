# Craig Newmark Graduate School of Journalism at CUNY

**Primo view code**: `CUNY_GJ`
**OneSearch**: <https://cuny-gj.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_GJ:CUNY_GJ>
**Campus website**: <https://journalism.cuny.edu/>

A graduate journalism school located in Midtown Manhattan.

---

## Brand / Identity Guide

- [CUNY Journalism — Communications/Branding](https://journalism.cuny.edu/about/communications/)

> No publicly available brand guide PDF found. The school uses a dark charcoal/black with orange accents in its web identity. Contact journalism.cuny.edu communications for official specifications.


## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._

---

## Current `colors.json.txt`

```json
{
  "primary": "#373737",
  "secondary": "#fe8807",
  "backgroundColor": "#ffffff",
  "links": "#fe8807",
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
| `primary (as text)` | `#373737` | 11.90:1 | PASS |
| `secondary (as button text)` | `#fe8807` | 2.40:1 | **FAIL** |
| `links` | `#fe8807` | 2.40:1 | **FAIL** |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - links `#fe8807` (2.40:1)
> - secondary `#fe8807` (2.40:1, fails even for large text)

### Issues to fix

- **secondary** `#fe8807` (orange, 2.40:1) fails AA badly when used as button text on white.
- **links** `#fe8807` (2.40:1) fails AA for hyperlink text on white. This is a critical accessibility issue. Replace with a dark enough orange/amber, e.g. `#a85400` (7.1:1), or use the dark primary (#373737, 11.90:1) for links.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #fe8807: verify or replace `#fe8807` with an accessible alternative that also aligns with official brand colors
- [ ] Fix #fe8807: verify or replace `#fe8807` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
