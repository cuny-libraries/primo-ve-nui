# John Jay College of Criminal Justice

**Primo view code**: `CUNY_JJ`
**OneSearch**: <https://cuny-jj.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_JJ:CUNY_JJ>
**Campus website**: <https://www.jjay.cuny.edu/>

A liberal arts college specializing in criminal justice and public service, located in Midtown Manhattan.

---

## Brand / Identity Guide

- [John Jay Branding Guidelines](https://www.jjay.cuny.edu/about/governance-senior-leadership/marketing-communications/branding-guidelines-logos)
- [Brand Guide PDF](https://www.jjay.cuny.edu/sites/default/files/2023-09/JJC-Branding-Guidelines-2023.pdf)

> The 2023 brand guide uses a dark navy blue (PMS 2768 U, ~#003a70) as the primary identity color. The current primary (#218994, teal) does not match — this is both a WCAG issue and a brand misalignment.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| JJC Dark Blue | Primary | `#003a70` | PMS 2768 U | 11.42:1  |

---

## Current `colors.json.txt`

```json
{
  "primary": "#218994",
  "secondary": "#0c1e38",
  "backgroundColor": "#ffffff",
  "links": "#214f94",
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
| `primary (as text)` | `#218994` | 4.14:1 | PASS (large text only) |
| `secondary (as button text)` | `#0c1e38` | 16.69:1 | PASS |
| `links` | `#214f94` | 8.04:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - primary `#218994` (4.14:1)

### Issues to fix

- **primary** `#218994` (teal, 4.14:1) fails AA for normal text. More critically, it does not match JJC's official dark blue brand identity. Update to a dark blue: the official PMS 2768 U (~#003a70, 14.5:1) would pass with a very high ratio.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #218994: verify or replace `#218994` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
