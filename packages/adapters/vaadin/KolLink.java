package de.itzbund.oss.kolibri.components;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;

/**
 * Die **Link**-Komponente rendert einen auf Barrierefreiheit optimierten Link, der als Text, als Icon oder auch in Kombination ausgegeben werden kann.

Beachten Sie, dass die Komponente automatisch ein Padding links und rechts zum umgebenden Text erzeugt. Sie kann daher im Fließtext ohne
Eingabe von Leerzeichen eingefügt werden. Zusätzliche Leerzeichen vergrößern den Abstand zum umgebenden Text.
 */

@Tag("kol-link")
@NpmPackage(value = "@public-ui/components", version = "1.6.0-rc.1")
@JsModule("@public-ui/components/dist/components/kol-link")
public class KolLink extends Component {
	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaControls(final Optional<String> value) {
		getElement().setProperty("_aria-controls", value);
	}

	/**
	 * Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaControls() {
		return getElement().getProperty("_aria-controls", null);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaCurrent(final Optional<String> value) {
		getElement().setProperty("_aria-current", value);
	}

	/**
	 * Gibt an, welchen aktuellen Auswahlstatus der Link hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaCurrent() {
		return getElement().getProperty("_aria-current", null);
	}

	/**
	 * Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaExpanded(final Optional<String> value) {
		getElement().setProperty("_aria-expanded", value);
	}

	/**
	 * Gibt an, ob durch den Link etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaExpanded() {
		return getElement().getProperty("_aria-expanded", null);
	}

	/**
	 * Gibt einen beschreibenden Text des Links an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaLabel(final Optional<String> value) {
		getElement().setProperty("_aria-label", value);
	}

	/**
	 * Gibt einen beschreibenden Text des Links an.  (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaLabel() {
		return getElement().getProperty("_aria-label", null);
	}

	/**
	 * Gibt an, ob der Link gerade ausgewählt ist. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @param value Optional<String>
	 */
	public void setAriaSelected(final Optional<String> value) {
		getElement().setProperty("_aria-selected", value);
	}

	/**
	 * Gibt an, ob der Link gerade ausgewählt ist. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getAriaSelected() {
		return getElement().getProperty("_aria-selected", null);
	}

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 *
	 * @param value Optional<String>
	 */
	public void setDisabled(final Optional<String> value) {
		getElement().setProperty("_disabled", value);
	}

	/**
	 * Gibt an, ob der Link deaktiviert ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDisabled() {
		return getElement().getProperty("_disabled", null);
	}

	/**
	 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
	 *
	 * @param value Optional<String>
	 */
	public void setDownload(final Optional<String> value) {
		getElement().setProperty("_download", value);
	}

	/**
	 * Teilt dem Browser mit, dass sich hinter dem Link eine Datei befindet. Setzt optional den Dateinamen.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getDownload() {
		return getElement().getProperty("_download", null);
	}

	/**
	 * Gibt die Ziel-Url des Links an.
	 *
	 * @param value String
	 */
	public void setHref(final Optional<String> value) {
		getElement().setProperty("_href", value);
	}

	/**
	 * Gibt die Ziel-Url des Links an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getHref() {
		return getElement().getProperty("_href", null);
	}

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 *
	 * @param value Optional<String>
	 */
	public void setIcon(final Optional<String> value) {
		getElement().setProperty("_icon", value);
	}

	/**
	 * Iconklasse (z.B.: "codicon codicon-home")
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIcon() {
		return getElement().getProperty("_icon", null);
	}

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setIconAlign(final Optional<String> value) {
		getElement().setProperty("_icon-align", value);
	}

	/**
	 * Gibt an, ob das Icon entweder links oder rechts dargestellt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconAlign() {
		return getElement().getProperty("_icon-align", null);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @param value Optional<String>
	 */
	public void setIconOnly(final Optional<String> value) {
		getElement().setProperty("_icon-only", value);
	}

	/**
	 * Gibt an, ob nur das Icon angezeigt wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getIconOnly() {
		return getElement().getProperty("_icon-only", null);
	}

	/**
	 * Setzt den sichtbaren Text des Elements.
	 *
	 * @param value String
	 */
	public void setLabel(final Optional<String> value) {
		getElement().setProperty("_label", value);
	}

	/**
	 * Setzt den sichtbaren Text des Elements.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getLabel() {
		return getElement().getProperty("_label", null);
	}

	/**
	 * Gibt an, welche Rolle das Element hat.
	 *
	 * @param value Optional<String>
	 */
	public void setRole(final Optional<String> value) {
		getElement().setProperty("_role", value);
	}

	/**
	 * Gibt an, welche Rolle das Element hat.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getRole() {
		return getElement().getProperty("_role", null);
	}

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @param value Optional<String>
	 */
	public void setSelector(final Optional<String> value) {
		getElement().setProperty("_selector", value);
	}

	/**
	 * Gibt die ID eines DOM-Elements, zu dem gesprungen werden soll, aus.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getSelector() {
		return getElement().getProperty("_selector", null);
	}

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @param value Optional<String>
	 */
	public void setStealth(final Optional<String> value) {
		getElement().setProperty("_stealth", value);
	}

	/**
	 * Gibt an, ob der Link nur beim Fokus sichtbar ist.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getStealth() {
		return getElement().getProperty("_stealth", null);
	}

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @param value Optional<String>
	 */
	public void setTabIndex(final Optional<String> value) {
		getElement().setProperty("_tab-index", value);
	}

	/**
	 * Gibt an, welchen Tab-Index der Button hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTabIndex() {
		return getElement().getProperty("_tab-index", null);
	}

	/**
	 * Gibt an wo der Link geöffnet werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setTarget(final Optional<String> value) {
		getElement().setProperty("_target", value);
	}

	/**
	 * Gibt an wo der Link geöffnet werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTarget() {
		return getElement().getProperty("_target", null);
	}

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 *
	 * @param value Optional<String>
	 */
	public void setTargetDescription(final Optional<String> value) {
		getElement().setProperty("_target-description", value);
	}

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTargetDescription() {
		return getElement().getProperty("_target-description", null);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @param value Optional<String>
	 */
	public void setTooltipAlign(final Optional<String> value) {
		getElement().setProperty("_tooltip-align", value);
	}

	/**
	 * Gibt an, ob der Tooltip entweder oben, rechts, unten oder links angezeigt werden soll.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getTooltipAlign() {
		return getElement().getProperty("_tooltip-align", null);
	}

	/**
	 * Gibt den Verwendungsfall des Links an.
	 *
	 * @param value Optional<String>
	 */
	public void setUseCase(final Optional<String> value) {
		getElement().setProperty("_use-case", value);
	}

	/**
	 * Gibt den Verwendungsfall des Links an.
	 *
	 * @return Optional<String>
	 */
	public Optional<String> getUseCase() {
		return getElement().getProperty("_use-case", null);
	}
}
