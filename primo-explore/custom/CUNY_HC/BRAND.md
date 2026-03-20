# Hunter College & Centro

**Primo view code**: `CUNY_HC`
**OneSearch**: <https://cuny-hc.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_HC:CUNY_HC>
**Campus website**: <https://www.hunter.cuny.edu/>

A liberal arts college on the Upper East Side of Manhattan. Includes Centro de Estudios Puertorriqueños.

---

## Brand / Identity Guide

- [Hunter College Visual Identity](https://www.hunter.cuny.edu/kb/category/resources/identity/)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing/campus-identity/HC-Visual-Identity-Standards_2016.pdf)

> Current primary (#5f259f) and secondary (#ffc72a) are an exact match to Hunter's official brand colors. Great brand alignment!


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| Hunter Purple | Primary | `#5f259f` | PMS 267 C | 9.33:1  |
| Hunter Gold | Secondary | `#ffc72a` | PMS 123 C | 1.56:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#5f259f",
  "secondary": "#ffc72a",
  "backgroundColor": "#ffffff",
  "links": "#4343b9",
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
| `primary (as text)` | `#5f259f` | 9.33:1 | PASS |
| `secondary (as button text)` | `#ffc72a` | 1.56:1 | **FAIL** |
| `links` | `#4343b9` | 7.66:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#ffc72a` (1.56:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #ffc72a: verify or replace `#ffc72a` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
