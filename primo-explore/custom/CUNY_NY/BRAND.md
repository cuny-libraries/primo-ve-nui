# New York City College of Technology (CityTech)

**Primo view code**: `CUNY_NY`
**OneSearch**: <https://cuny-ny.primo.exlibrisgroup.com/>
**Campus website**: <https://www.citytech.cuny.edu/>

A technology and applied sciences college in Downtown Brooklyn.

---

## Brand / Identity Guide

- [CityTech Branding](https://www.citytech.cuny.edu/citytechbranding/)
- [Brand Guide PDF](https://www.citytech.cuny.edu/citytechbranding/CityTechIDbook.pdf)

> CityTech's official colors are navy blue and orange. The current primary (#214971) is a medium blue — lighter than the official PMS 280 C navy. Secondary (#F6B72B, gold) diverges from the official orange. Aligning to navy + orange would better represent the CityTech brand.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| CityTech Blue | Primary | `#003087` | PMS 280 C | 11.85:1  |
| CityTech Orange | Secondary | `#e35205` | PMS 152 C | 3.84:1 *(large text only)* |

---

## Current `colors.json.txt`

```json
{
  "primary": "#214971",
  "secondary": "#F6B72B",
  "backgroundColor": "#ffffff",
  "links": "#296196",
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
| `primary (as text)` | `#214971` | 9.31:1 | PASS |
| `secondary (as button text)` | `#F6B72B` | 1.79:1 | **FAIL** |
| `links` | `#296196` | 6.47:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#F6B72B` (1.79:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #F6B72B: verify or replace `#F6B72B` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
