# Abbr

Die **Abbr**-Komponente implementiert den HTML-Tag `abbr` um eine Abkürzung darzustellen. Optional kann ein Label übergeben werden, das in Klammern nach der Abkürzung angezeigt wird.

## Konstruktion

### Code

```html
<p>Ich <KolAbbr _label="zum Beispiel">z. B.</KolAbbr> bin eine Abkürzung mit Label.</p>
<p>Ich <KolAbbr>z. B.</KolAbbr> bin eine Abkürzung ohne Label.</p>
```

### Beispiel

<p>Ich <KolAbbr _label="zum Beispiel">z. B.</KolAbbr> bin eine Abkürzung mit Label.</p>
<p>Ich <KolAbbr>z. B.</KolAbbr> bin eine Abkürzung ohne Label.</p>

## Verwendung

### Angabe der Beschreibung zur Abkürzung

Der Begriff bzw. die Erklärung wird über das Attribut **`_label`** übergeben, die Abkürzung bzw. der erklärungswürdige Begriff kommt zwischen die Tags im HTML.

## Links und Referenzen

- <kol-link _href="https://developer.mozilla.org/de/docs/Web/HTML/Element/abbr" _target="_blank"></kol-link>

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description                                                                                                        | Type                  | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------ | --------------------- | ----------- |
| `_label` | `_label`  | Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). | `string \| undefined` | `undefined` |

## Slots

| Slot | Description                    |
| ---- | ------------------------------ |
|      | The abbreviation (short form). |

---
