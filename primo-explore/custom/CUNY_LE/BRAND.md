# Lehman College

**Primo view code**: `CUNY_LE`
**OneSearch**: <https://cuny-le.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_LE:CUNY_LE>
**Campus website**: <https://www.lehman.cuny.edu/>

A liberal arts college in the Bedford Park neighborhood of the Bronx.

---

## Brand / Identity Guide

- [Lehman College — Communications](https://www.lehman.cuny.edu/communications/)

> Lehman's official identity colors are cardinal red and white. The current primary (#06284e, dark navy) and secondary (#84BD00, green) do not reflect Lehman's official palette — this appears to be a significant brand misalignment.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| Lehman Cardinal Red | Primary | `#c8102e` | PMS 186 C | 5.88:1  |
| Lehman White | Secondary | `#ffffff` | — | 1.00:1 **FAIL** |

---

## Current `colors.json.txt`

```json
{
  "primary": "#06284e",
  "secondary": "#84BD00",
  "backgroundColor": "#ffffff",
  "links": "#0a407d",
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
| `primary (as text)` | `#06284e` | 14.78:1 | PASS |
| `secondary (as button text)` | `#84BD00` | 2.27:1 | **FAIL** |
| `links` | `#0a407d` | 10.28:1 | PASS |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - secondary `#84BD00` (2.27:1, fails even for large text)


> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #84BD00: verify or replace `#84BD00` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
