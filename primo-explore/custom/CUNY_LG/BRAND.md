# LaGuardia Community College

**Primo view code**: `CUNY_LG`
**OneSearch**: <https://cuny-lg.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_LG:CUNY_LG>
**Campus website**: <https://www.laguardia.edu/>

A community college in Long Island City, Queens, named for Mayor Fiorello La Guardia.

---

## Brand / Identity Guide

- [LaGuardia Brand Book](https://www.laguardia.edu/marketing/)
- [Brand Guide PDF](https://www.laguardia.edu/wp-content/uploads/2024/02/full-visual-id-branding.pdf)

> Current primary (#C4262E) closely matches LaGuardia's red identity. Verify exact shade against the 2024 brand book PDF.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| LaGuardia Red | Primary | `#c4282a` | — | 5.70:1  |

---

## Current `colors.json.txt`

```json
{
  "primary": "#C4262E",
  "secondary": "#C2C2A0",
  "backgroundColor": "#ffffff",
  "links": "#2a7ab0",
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
| `primary (as text)` | `#C4262E` | 5.73:1 | PASS |
| `secondary (as button text)` | `#C2C2A0` | 1.82:1 | **FAIL** |
| `links` | `#2a7ab0` | 4.66:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#C2C2A0` (1.82:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #C2C2A0: verify or replace `#C2C2A0` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
