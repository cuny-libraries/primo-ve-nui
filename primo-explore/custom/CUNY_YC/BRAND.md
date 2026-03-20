# York College

**Primo view code**: `CUNY_YC`
**OneSearch**: <https://cuny-yc.primo.exlibrisgroup.com/>
**Campus website**: <https://www.york.cuny.edu/>

A liberal arts college in Jamaica, Queens.

---

## Brand / Identity Guide

- [York College Branding Guide](https://www.york.cuny.edu/communications)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-and-branding/download/cuny-colleges/york_branding_guide-cobranding-rev2.pdfv)

> Current primary (#e22b2e) and secondary (#2e3233) closely reflect York's red and dark identity. Links (#b11116) is a darker red — verify it meets AA at 7.09:1 on white (it does).


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| York Red | Primary | `#e22b2e` | — | 4.55:1  |
| York Dark | Secondary | `#2e3233` | — | 12.96:1  |

---

## Current `colors.json.txt`

```json
{
  "primary": "#e22b2e",
  "secondary": "#2e3233",
  "backgroundColor": "#ffffff",
  "links": "#b11116",
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
| `primary (as text)` | `#e22b2e` | 4.55:1 | PASS |
| `secondary (as button text)` | `#2e3233` | 12.96:1 | PASS |
| `links` | `#b11116` | 7.09:1 | PASS |

> All key colors meet WCAG 2.1 AA contrast requirements on the white background. Still verify secondary color usage in context.


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- No critical WCAG failures detected. Run a full audit with an automated tool (e.g., [axe](https://www.deque.com/axe/), [WAVE](https://wave.webaim.org/)) against the live Primo page to catch component-level issues.
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
