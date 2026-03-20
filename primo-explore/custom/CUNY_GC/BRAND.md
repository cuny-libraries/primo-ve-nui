# CUNY Graduate Center

**Primo view code**: `CUNY_GC`
**OneSearch**: <https://cuny-gc.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_GC:CUNY_GC>
**Campus website**: <https://www.gc.cuny.edu/>

CUNY's doctoral and advanced research hub, located in Midtown Manhattan.

---

## Brand / Identity Guide

- [Graduate Center Brand Guide](https://www.gc.cuny.edu/communications-and-marketing/resources-and-services/brand-guide)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-and-branding/download/cuny-colleges/CUNY_Graduate_Center_Identity_Guidelines_Online.pdf)

> Current primary (#005daa) and links (#005daa) appear to match the Graduate Center's blue identity. Verify gold secondary usage context for WCAG compliance.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| GC Blue | Primary | `#005daa` | — | 6.67:1  |
| CUNY Gold | Secondary | `#ffb81c` | PMS 124 C | 1.73:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#005daa",
  "secondary": "#FFB81C",
  "backgroundColor": "#ffffff",
  "links": "#005daa",
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
| `primary (as text)` | `#005daa` | 6.67:1 | PASS |
| `secondary (as button text)` | `#FFB81C` | 1.73:1 | **FAIL** |
| `links` | `#005daa` | 6.67:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#FFB81C` (1.73:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #FFB81C: verify or replace `#FFB81C` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
