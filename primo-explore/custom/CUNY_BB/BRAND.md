# Baruch College

**Primo view code**: `CUNY_BB`
**OneSearch**: <https://cuny-bb.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_BB:CUNY_BB>
**Campus website**: <https://www.baruch.cuny.edu/>

Bernard M. Baruch College, a business-focused liberal arts college in Midtown Manhattan.

---

## Brand / Identity Guide

- [Baruch Brand Identity Guidelines](https://toolkit.baruch.cuny.edu/reputation-management-toolkit/logos/)
- [Brand Guide PDF](https://toolkit.baruch.cuny.edu/wp-content/uploads/sites/11/2022/08/Final-BrandIdentityGuidelines.pdf)

> Baruch uses CUNY Blue as its primary color per the brand guidelines. The current primary (#085394) is close but slightly lighter than the official Baruch Blue (#05336b).


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| Baruch Blue | Primary | `#05336b` | PMS 288 C | 12.41:1  |
| Baruch Gold | Secondary | `#ffb81c` | PMS 124 C | 1.73:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#085394",
  "secondary": "#A9CDD6",
  "backgroundColor": "#ffffff",
  "links": "#0a437a",
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
| `primary (as text)` | `#085394` | 7.85:1 | PASS |
| `secondary (as button text)` | `#A9CDD6` | 1.69:1 | **FAIL** |
| `links` | `#0a437a` | 10.02:1 | PASS |

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
