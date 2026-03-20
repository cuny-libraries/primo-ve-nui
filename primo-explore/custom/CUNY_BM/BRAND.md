# Borough of Manhattan Community College

**Primo view code**: `CUNY_BM`
**OneSearch**: <https://cuny-bm.primo.exlibrisgroup.com/>
**Campus website**: <https://www.bmcc.cuny.edu/>

BMCC is the largest community college in the CUNY system, located in Lower Manhattan.

---

## Brand / Identity Guide

- [BMCC Brand Guidelines](https://www.bmcc.cuny.edu/about-bmcc/public-affairs/brand-guidelines/)
- [Colors Page](https://www.bmcc.cuny.edu/about-bmcc/public-affairs/brand-guidelines/graphic-style-guidelines/colors/)

> Current primary (#0051bc) is slightly off from official BMCC Blue (#0058A4). Consider updating to the exact brand color. Secondary (#A9CDD6) is light blue, not the official orange — likely a deliberate choice for web contrast, but diverges from brand.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| BMCC Blue | Primary | `#0058A4` | PMS 293 C | 7.16:1  |
| BMCC Orange | Secondary | `#FF6600` | PMS 021 C | 2.94:1 **FAIL** |
| Light Yellow | Accent | `#F6EB61` | PMS 100 C | 1.24:1 **FAIL** |
| Gray | Neutral | `#B2B4B2` | PMS 421 C | 2.09:1 **FAIL** |
| Light Blue | Accent | `#9BCBEB` | PMS 291 C | 1.73:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#0051bc",
  "secondary": "#A9CDD6",
  "backgroundColor": "#ffffff",
  "links": "#0051bb",
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
| `primary (as text)` | `#0051bc` | 7.23:1 | PASS |
| `secondary (as button text)` | `#A9CDD6` | 1.69:1 | **FAIL** |
| `links` | `#0051bb` | 7.26:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#A9CDD6` (1.69:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #A9CDD6: verify or replace `#A9CDD6` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
