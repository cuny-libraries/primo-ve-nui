# Brooklyn College

**Primo view code**: `CUNY_BC`
**OneSearch**: <https://cuny-bc.primo.exlibrisgroup.com/>
**Campus website**: <https://www.brooklyn.cuny.edu/>

A liberal arts and sciences college in Flatbush, Brooklyn.

---

## Brand / Identity Guide

- [Brooklyn College Visual Identity](http://www.brooklyn.cuny.edu/web/news/communications/identity.php)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/BRKL_IdentityManual_20131.pdf)

> Current primary (#7b2240) matches official maroon. Secondary (#FAD129) is a brighter gold — the official PMS 7406 C converts to approximately #F5A800. Consider updating secondary for closer brand alignment.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| Brooklyn Maroon | Primary | `#7b2240` | PMS 208 C | 9.79:1  |
| Brooklyn Gold | Secondary | `#f5a800` | PMS 7406 C | 2.00:1 **FAIL** |
| Warm Gray | Neutral | `#a89f8c` | Warm Gray 9 C | 2.62:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#7b2240",
  "secondary": "#FAD129",
  "backgroundColor": "#ffffff",
  "links": "#7b2240",
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
| `primary (as text)` | `#7b2240` | 9.79:1 | PASS |
| `secondary (as button text)` | `#FAD129` | 1.48:1 | **FAIL** |
| `links` | `#7b2240` | 9.79:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#FAD129` (1.48:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #FAD129: verify or replace `#FAD129` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
