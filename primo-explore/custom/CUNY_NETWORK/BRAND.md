# CUNY Network (Consortium)

**Primo view code**: `CUNY_NETWORK`
**OneSearch**: <https://cuny-network.primo.exlibrisgroup.com/>
**Campus website**: <https://www.cuny.edu/>

Consortium-level Primo view used for cross-campus searching. Shares the CUNY system-wide color palette.

---

## Brand / Identity Guide

- [CUNY University Identity](https://www.cuny.edu/about/administration/offices/communications-marketing/university-identity/)

> The network view uses CUNY system-wide colors. Current primary (#0c2255) is a darker navy than the official CUNY Blue (#0033a1). Both pass WCAG AA for text.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| CUNY Blue | Primary | `#0033a1` | PMS 286 C | 10.56:1  |
| CUNY Gold | Secondary | `#ffb81c` | PMS 124 C | 1.73:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#0c2255",
  "secondary": "#FFB81C",
  "backgroundColor": "#ffffff",
  "links": "#1D3A83",
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
| `primary (as text)` | `#0c2255` | 15.27:1 | PASS |
| `secondary (as button text)` | `#FFB81C` | 1.73:1 | **FAIL** |
| `links` | `#1D3A83` | 10.58:1 | PASS |

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
