# Queens College

**Primo view code**: `CUNY_QC`
**OneSearch**: <https://cuny-qc.primo.exlibrisgroup.com/discovery/search?vid=01CUNY_QC:CUNY_QC>
**Campus website**: <https://www.qc.cuny.edu/>

A liberal arts college in Flushing, Queens.

---

## Brand / Identity Guide

- [Queens College Brand Graphics Guidelines](https://www.qc.cuny.edu/communications/)
- [Brand Guide PDF](https://www.qc.cuny.edu/communications/wp-content/uploads/sites/21/2022/07/QC_BGG_Public.pdf)

> Queens College's official identity is red and black. The current primary (#494949, dark gray) and links (#5C92BD, light blue) do not reflect Queens College's brand colors — this is a significant misalignment.


## Official Brand Colors

| Name | Role | Hex | Pantone | Contrast on white |
|------|------|-----|---------|-------------------|
| QC Red | Primary | `#e71939` | PMS 711 C | 4.57:1  |
| QC Black | Secondary | `#231f20` | Black | 16.30:1  |

---

## Current `colors.json.txt`

```json
{
  "primary": "#494949",
  "secondary": "#ffffff",
  "backgroundColor": "#ffffff",
  "links": "#5C92BD",
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
| `primary (as text)` | `#494949` | 9.00:1 | PASS |
| `secondary (as button text)` | `#ffffff` | 1.00:1 | **FAIL** |
| `links` | `#5C92BD` | 3.33:1 | PASS (large text only) |

> **Action required**: The following colors fail WCAG 2.1 AA (4.5:1 for normal text) against the white background:
>
> - links `#5C92BD` (3.33:1)
> - secondary `#ffffff` (1.00:1, fails even for large text)

### Issues to fix

- **secondary** `#ffffff` (1.00:1) is white on white — completely invisible. This must be changed.
- **links** `#5C92BD` (3.33:1) fails AA for normal text.

> **Note on secondary color**: The secondary color is used as button text (`.md-button.md-secondary`) on a transparent/white background. Yellow, gold, and light accent colors almost always fail 4.5:1 on white. If the secondary is used only as a background fill with white text on top, ensure _white-on-secondary_ contrast meets 4.5:1 instead.

---

## Recommendations

- [ ] Fix #5C92BD: verify or replace `#5C92BD` with an accessible alternative that also aligns with official brand colors
- [ ] Fix #ffffff: verify or replace `#ffffff` with an accessible alternative that also aligns with official brand colors
- [ ] Verify secondary color in actual usage context (button text vs. fill background)
- [ ] Run [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) or [axe DevTools](https://www.deque.com/axe/) against the live Primo page
- [ ] Check focus indicator contrast (WCAG 2.1 SC 1.4.11 — 3:1 minimum for non-text contrast)
- [ ] Confirm all images in `img/` have appropriate alt text in HTML templates
