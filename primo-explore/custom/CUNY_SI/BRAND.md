# College of Staten Island

**Primo view code**: `CUNY_SI`
**OneSearch**: <https://cuny-si.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_SI:CUNY_SI>
**Campus website**: <https://www.csi.cuny.edu/>

A liberal arts college on a 204-acre campus in Willowbrook, Staten Island.

---

## Brand / Identity Guide

- [CSI Visual Identity Manual](https://www.csi.cuny.edu/about-csi/news-communications/)
- [Brand Guide PDF](https://www.cuny.edu/wp-content/uploads/sites/4/page-assets/about/administration/offices/communications-marketing/services/marketing-branding/downloads/cuny-colleges/CSI-Identity-Manual.pdf)

> Consult the CSI Visual Identity Manual PDF for official color specifications. The current primary (#53626e, blue-gray) and secondary (#83c8ef, light blue) reflect a cool academic palette.


## Official Brand Colors

_Official hex values not yet confirmed. See brand guide link above for Pantone/CMYK specs._

---

## Current `colors.json.txt`

```json
{
  "primary": "#53626e",
  "secondary": "#83c8ef",
  "backgroundColor": "#ffffff",
  "links": "#0000ff",
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
| `primary (as text)` | `#53626e` | 6.29:1 | PASS |
| `secondary (as button text)` | `#83c8ef` | 1.83:1 | **FAIL** |
| `links` | `#0000ff` | 8.59:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#83c8ef` (1.83:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #83c8ef: verify or replace `#83c8ef` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
