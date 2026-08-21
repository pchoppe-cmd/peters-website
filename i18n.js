// Lightweight i18n: language dictionary + apply logic + switcher wiring.
// Language choice persists via localStorage so it carries across pages.

const I18N = {
  en: {
    nav_scrambler: "Word Scrambler",
    nav_currency: "Currency Converter",
    nav_measurement: "Unit Converter",
    nav_back: "Back to site",

    scrambler_badge: "Word Scrambler",
    scrambler_title: "Find valid words from your letters",
    scrambler_subtitle: "Type in a jumble of letters and find every valid word you can make from them.",
    scrambler_letters_label: "Letters",
    scrambler_letters_placeholder: "e.g. taencri",
    scrambler_find_words: "Find words",
    scrambler_hint: "Letters only, spaces are ignored. Case doesn't matter.",
    scrambler_min_length: "Minimum word length",
    scrambler_max_length: "Maximum word length",
    opt_1_letter: "1 letter",
    opt_n_letters: "{n} letters",
    scrambler_error_no_letters: "Please enter some letters (a-z only).",
    scrambler_error_too_long: "That's a lot of letters — try 24 or fewer.",
    scrambler_error_min_max: "Minimum word length can't be greater than maximum word length.",
    scrambler_no_words: "No valid words found for those letters.",
    scrambler_word_found_singular: "1 word found",
    scrambler_words_found: "{n} words found",

    currency_badge: "Currency Converter",
    currency_title: "Convert between currencies",
    currency_subtitle: "Live exchange rates, updated daily.",
    label_amount: "Amount",
    label_from: "From",
    label_to: "To",
    currency_swap_title: "Swap currencies",
    currency_converting: "Converting…",
    currency_same: "Same currency — rate is 1:1",
    currency_rate_as_of: "rates as of",
    currency_error_fetch: "Could not fetch exchange rates. Check your internet connection and try again.",

    measurement_badge: "Unit Converter",
    measurement_title: "Convert measurements",
    measurement_subtitle: "Length, weight, temperature and volume — e.g. litres to gallons.",
    label_value: "Value",
    measurement_swap_title: "Swap units",
    measurement_same_unit: "Same unit — value is unchanged",
    cat_length: "Length",
    cat_weight: "Weight",
    cat_temperature: "Temperature",
    cat_volume: "Volume",
    cat_speed: "Speed",

    footer_tagline: "Built for all people of the internet · word list: ENABLE1 (~172,000 words) · currency rates via frankfurter.app",
    footer_privacy: "Privacy Policy",
    footer_about: "About",

    about_badge: "About",
    about_title: "About this site",
    about_subtitle: "A handful of small, free tools in one place.",
    about_intro: "This site brings together three simple, everyday tools: a Word Scrambler for finding valid words from a jumble of letters, a Currency Converter with live exchange rates, and a Unit Converter for length, weight, temperature and volume. No sign-up, no accounts — just open the page and use whichever tool you need.",
    about_why_heading: "Why it exists",
    about_why_text: "It started as a small personal project — a single page with a few genuinely useful tools, built to be fast, free, and free of clutter.",
    about_built_heading: "How it's built",
    about_built_html: "Plain HTML, CSS, and JavaScript — no frameworks, no tracking scripts, no build step. The Word Scrambler runs entirely offline using a ~172,000-word dictionary (ENABLE1). The Currency Converter fetches live rates from the free <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a> API.",
    about_feedback_heading: "Feedback",
    about_feedback_html: "Spotted a bug or have an idea for another tool? Get in touch at <a href=\"mailto:pchoppetech@gmail.com\">pchoppetech@gmail.com</a>.",

    privacy_badge: "Legal",
    privacy_title: "Privacy Policy",
    privacy_last_updated: "Last updated: 20 August 2026",
    privacy_intro: "This page explains what happens to your data when you use this website. In short: this site does not require an account, does not collect personal information through forms, and does not store anything about you on a server.",
    privacy_collect_heading: "Information this site collects",
    privacy_collect_text: "None of the tools on this site ask you to create an account, log in, or submit personal details. Anything you type — letters for the Word Scrambler, amounts for the Currency Converter, values for the Unit Converter — is processed in your own browser and is not sent to us or stored anywhere.",
    privacy_third_heading: "Third-party services",
    privacy_third_text1_html: "The Currency Converter fetches live exchange rates from <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a>, a free public API. Only the currency codes and amount you enter are sent in that request — no personal information is included or required.",
    privacy_third_text2_html: "If this site displays advertising (e.g. via Google AdSense), the ad provider may use cookies or similar technology to serve and measure ads, which can include collecting information about your device and browsing activity across sites. You can control this through your browser settings or via <a href=\"https://adssettings.google.com\" target=\"_blank\" rel=\"noopener\">Google's Ads Settings</a>.",
    privacy_cookies_heading: "Cookies",
    privacy_cookies_text: "This site itself does not set cookies. If advertising is enabled, the ad provider may set cookies as described above.",
    privacy_children_heading: "Children's privacy",
    privacy_children_text: "This site is not directed at children and does not knowingly collect information from anyone.",
    privacy_changes_heading: "Changes to this policy",
    privacy_changes_text: "This policy may be updated from time to time, for example if advertising or analytics are added to the site. Changes will be posted on this page.",
    privacy_contact_heading: "Contact",
    privacy_contact_html: "Questions about this policy can be sent to <a href=\"mailto:pchoppe@icloud.com\">pchoppe@icloud.com</a>.",
  },

  de: {
    nav_scrambler: "Buchstabensalat",
    nav_currency: "Währungsrechner",
    nav_measurement: "Einheitenumrechner",
    nav_back: "Zurück zur Seite",

    scrambler_badge: "Buchstabensalat",
    scrambler_title: "Finde gültige Wörter aus deinen Buchstaben",
    scrambler_subtitle: "Gib ein Buchstabenwirrwarr ein und finde jedes gültige Wort, das sich daraus bilden lässt.",
    scrambler_letters_label: "Buchstaben",
    scrambler_letters_placeholder: "z. B. taencri",
    scrambler_find_words: "Wörter finden",
    scrambler_hint: "Nur Buchstaben, Leerzeichen werden ignoriert. Groß-/Kleinschreibung ist egal.",
    scrambler_min_length: "Minimale Wortlänge",
    scrambler_max_length: "Maximale Wortlänge",
    opt_1_letter: "1 Buchstabe",
    opt_n_letters: "{n} Buchstaben",
    scrambler_error_no_letters: "Bitte gib ein paar Buchstaben ein (nur a-z).",
    scrambler_error_too_long: "Das sind sehr viele Buchstaben — versuche es mit 24 oder weniger.",
    scrambler_error_min_max: "Die minimale Wortlänge darf nicht größer als die maximale sein.",
    scrambler_no_words: "Keine gültigen Wörter für diese Buchstaben gefunden.",
    scrambler_word_found_singular: "1 Wort gefunden",
    scrambler_words_found: "{n} Wörter gefunden",

    currency_badge: "Währungsrechner",
    currency_title: "Währungen umrechnen",
    currency_subtitle: "Aktuelle Wechselkurse, täglich aktualisiert.",
    label_amount: "Betrag",
    label_from: "Von",
    label_to: "In",
    currency_swap_title: "Währungen tauschen",
    currency_converting: "Wird umgerechnet…",
    currency_same: "Gleiche Währung — Kurs ist 1:1",
    currency_rate_as_of: "Kurse vom",
    currency_error_fetch: "Wechselkurse konnten nicht abgerufen werden. Bitte Internetverbindung prüfen und erneut versuchen.",

    measurement_badge: "Einheitenumrechner",
    measurement_title: "Maßeinheiten umrechnen",
    measurement_subtitle: "Länge, Gewicht, Temperatur und Volumen — z. B. Liter in Gallonen.",
    label_value: "Wert",
    measurement_swap_title: "Einheiten tauschen",
    measurement_same_unit: "Gleiche Einheit — Wert bleibt unverändert",
    cat_length: "Länge",
    cat_weight: "Gewicht",
    cat_temperature: "Temperatur",
    cat_volume: "Volumen",
    cat_speed: "Geschwindigkeit",

    footer_tagline: "Für alle Menschen im Internet gemacht · Wortliste: ENABLE1 (~172.000 Wörter) · Wechselkurse via frankfurter.app",
    footer_privacy: "Datenschutz",
    footer_about: "Über uns",

    about_badge: "Über uns",
    about_title: "Über diese Seite",
    about_subtitle: "Ein paar kleine, kostenlose Tools an einem Ort.",
    about_intro: "Diese Seite vereint drei einfache Alltagswerkzeuge: einen Buchstabensalat zum Finden gültiger Wörter aus einem Buchstabenwirrwarr, einen Währungsrechner mit aktuellen Wechselkursen und einen Einheitenumrechner für Länge, Gewicht, Temperatur und Volumen. Keine Anmeldung, kein Konto — einfach die Seite öffnen und das gewünschte Tool nutzen.",
    about_why_heading: "Warum es das gibt",
    about_why_text: "Es begann als kleines persönliches Projekt — eine einzige Seite mit ein paar wirklich nützlichen Tools, schnell, kostenlos und ohne Schnickschnack.",
    about_built_heading: "Wie es gebaut ist",
    about_built_html: "Reines HTML, CSS und JavaScript — keine Frameworks, keine Tracking-Skripte, kein Build-Prozess. Der Buchstabensalat läuft komplett offline mit einem Wörterbuch aus rund 172.000 Wörtern (ENABLE1). Der Währungsrechner ruft aktuelle Kurse über die kostenlose <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a>-API ab.",
    about_feedback_heading: "Feedback",
    about_feedback_html: "Einen Fehler gefunden oder eine Idee für ein weiteres Tool? Melde dich unter <a href=\"mailto:pchoppetech@gmail.com\">pchoppetech@gmail.com</a>.",

    privacy_badge: "Rechtliches",
    privacy_title: "Datenschutzerklärung",
    privacy_last_updated: "Zuletzt aktualisiert: 20. August 2026",
    privacy_intro: "Diese Seite erklärt, was mit deinen Daten passiert, wenn du diese Website nutzt. Kurz gesagt: Diese Seite benötigt kein Konto, sammelt keine persönlichen Daten über Formulare und speichert nichts über dich auf einem Server.",
    privacy_collect_heading: "Welche Informationen diese Seite sammelt",
    privacy_collect_text: "Keines der Tools auf dieser Seite verlangt ein Konto, ein Login oder persönliche Angaben. Alles, was du eingibst — Buchstaben für den Buchstabensalat, Beträge für den Währungsrechner, Werte für den Einheitenumrechner — wird in deinem eigenen Browser verarbeitet und weder an uns gesendet noch irgendwo gespeichert.",
    privacy_third_heading: "Dienste von Drittanbietern",
    privacy_third_text1_html: "Der Währungsrechner ruft aktuelle Wechselkurse von <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a> ab, einer kostenlosen öffentlichen API. Dabei werden nur die Währungscodes und der eingegebene Betrag übertragen — keine persönlichen Daten sind enthalten oder erforderlich.",
    privacy_third_text2_html: "Falls diese Seite Werbung anzeigt (z. B. über Google AdSense), kann der Werbeanbieter Cookies oder ähnliche Technologien verwenden, um Anzeigen auszuliefern und zu messen. Dabei können Informationen über dein Gerät und dein Surfverhalten auf verschiedenen Seiten erfasst werden. Du kannst dies über deine Browsereinstellungen oder über die <a href=\"https://adssettings.google.com\" target=\"_blank\" rel=\"noopener\">Google-Anzeigeneinstellungen</a> steuern.",
    privacy_cookies_heading: "Cookies",
    privacy_cookies_text: "Diese Seite selbst setzt keine Cookies. Falls Werbung aktiviert ist, kann der Werbeanbieter wie oben beschrieben Cookies setzen.",
    privacy_children_heading: "Datenschutz für Kinder",
    privacy_children_text: "Diese Seite richtet sich nicht an Kinder und sammelt wissentlich keine Informationen von ihnen.",
    privacy_changes_heading: "Änderungen dieser Richtlinie",
    privacy_changes_text: "Diese Richtlinie kann von Zeit zu Zeit aktualisiert werden, zum Beispiel wenn Werbung oder Analysetools hinzugefügt werden. Änderungen werden auf dieser Seite veröffentlicht.",
    privacy_contact_heading: "Kontakt",
    privacy_contact_html: "Fragen zu dieser Richtlinie können an <a href=\"mailto:pchoppe@icloud.com\">pchoppe@icloud.com</a> gesendet werden.",
  },

  fr: {
    nav_scrambler: "Anagrammeur",
    nav_currency: "Convertisseur de devises",
    nav_measurement: "Convertisseur d'unités",
    nav_back: "Retour au site",

    scrambler_badge: "Anagrammeur",
    scrambler_title: "Trouvez des mots valides à partir de vos lettres",
    scrambler_subtitle: "Entrez un mélange de lettres et trouvez tous les mots valides que vous pouvez former.",
    scrambler_letters_label: "Lettres",
    scrambler_letters_placeholder: "ex. taencri",
    scrambler_find_words: "Trouver des mots",
    scrambler_hint: "Lettres uniquement, les espaces sont ignorés. La casse n'a pas d'importance.",
    scrambler_min_length: "Longueur minimale du mot",
    scrambler_max_length: "Longueur maximale du mot",
    opt_1_letter: "1 lettre",
    opt_n_letters: "{n} lettres",
    scrambler_error_no_letters: "Veuillez saisir des lettres (a-z uniquement).",
    scrambler_error_too_long: "Cela fait beaucoup de lettres — essayez avec 24 ou moins.",
    scrambler_error_min_max: "La longueur minimale ne peut pas être supérieure à la longueur maximale.",
    scrambler_no_words: "Aucun mot valide trouvé pour ces lettres.",
    scrambler_word_found_singular: "1 mot trouvé",
    scrambler_words_found: "{n} mots trouvés",

    currency_badge: "Convertisseur de devises",
    currency_title: "Convertir entre devises",
    currency_subtitle: "Taux de change en direct, mis à jour quotidiennement.",
    label_amount: "Montant",
    label_from: "De",
    label_to: "Vers",
    currency_swap_title: "Inverser les devises",
    currency_converting: "Conversion en cours…",
    currency_same: "Même devise — taux de 1:1",
    currency_rate_as_of: "taux au",
    currency_error_fetch: "Impossible de récupérer les taux de change. Vérifiez votre connexion internet et réessayez.",

    measurement_badge: "Convertisseur d'unités",
    measurement_title: "Convertir des mesures",
    measurement_subtitle: "Longueur, poids, température et volume — ex. litres en gallons.",
    label_value: "Valeur",
    measurement_swap_title: "Inverser les unités",
    measurement_same_unit: "Même unité — valeur inchangée",
    cat_length: "Longueur",
    cat_weight: "Poids",
    cat_temperature: "Température",
    cat_volume: "Volume",
    cat_speed: "Vitesse",

    footer_tagline: "Conçu pour tous les internautes · liste de mots : ENABLE1 (~172 000 mots) · taux de change via frankfurter.app",
    footer_privacy: "Politique de confidentialité",
    footer_about: "À propos",

    about_badge: "À propos",
    about_title: "À propos de ce site",
    about_subtitle: "Quelques petits outils gratuits réunis au même endroit.",
    about_intro: "Ce site réunit trois outils simples du quotidien : un Anagrammeur pour trouver des mots valides à partir d'un mélange de lettres, un Convertisseur de devises avec des taux en direct, et un Convertisseur d'unités pour la longueur, le poids, la température et le volume. Pas d'inscription, pas de compte — ouvrez simplement la page et utilisez l'outil dont vous avez besoin.",
    about_why_heading: "Pourquoi ce site existe",
    about_why_text: "Tout a commencé comme un petit projet personnel — une seule page avec quelques outils vraiment utiles, conçue pour être rapide, gratuite et sans fioritures.",
    about_built_heading: "Comment il est construit",
    about_built_html: "Simple HTML, CSS et JavaScript — sans frameworks, sans scripts de suivi, sans étape de build. L'Anagrammeur fonctionne entièrement hors ligne grâce à un dictionnaire d'environ 172 000 mots (ENABLE1). Le Convertisseur de devises récupère les taux en direct via l'API gratuite <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a>.",
    about_feedback_heading: "Retour d'expérience",
    about_feedback_html: "Vous avez trouvé un bug ou une idée pour un autre outil ? Contactez-nous à <a href=\"mailto:pchoppetech@gmail.com\">pchoppetech@gmail.com</a>.",

    privacy_badge: "Mentions légales",
    privacy_title: "Politique de confidentialité",
    privacy_last_updated: "Dernière mise à jour : 20 août 2026",
    privacy_intro: "Cette page explique ce qu'il advient de vos données lorsque vous utilisez ce site. En résumé : ce site ne nécessite pas de compte, ne collecte aucune information personnelle via des formulaires et ne stocke rien vous concernant sur un serveur.",
    privacy_collect_heading: "Informations collectées par ce site",
    privacy_collect_text: "Aucun des outils de ce site ne vous demande de créer un compte, de vous connecter ou de fournir des informations personnelles. Tout ce que vous saisissez — lettres pour l'Anagrammeur, montants pour le Convertisseur de devises, valeurs pour le Convertisseur d'unités — est traité dans votre propre navigateur et n'est ni envoyé ni stocké nulle part.",
    privacy_third_heading: "Services tiers",
    privacy_third_text1_html: "Le Convertisseur de devises récupère les taux de change en direct depuis <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a>, une API publique gratuite. Seuls les codes de devises et le montant que vous saisissez sont envoyés dans cette requête — aucune information personnelle n'est incluse ni requise.",
    privacy_third_text2_html: "Si ce site affiche de la publicité (par exemple via Google AdSense), le fournisseur publicitaire peut utiliser des cookies ou des technologies similaires pour diffuser et mesurer les annonces, ce qui peut inclure la collecte d'informations sur votre appareil et votre activité de navigation sur différents sites. Vous pouvez contrôler cela via les paramètres de votre navigateur ou via les <a href=\"https://adssettings.google.com\" target=\"_blank\" rel=\"noopener\">paramètres publicitaires de Google</a>.",
    privacy_cookies_heading: "Cookies",
    privacy_cookies_text: "Ce site lui-même ne dépose pas de cookies. Si la publicité est activée, le fournisseur publicitaire peut déposer des cookies comme décrit ci-dessus.",
    privacy_children_heading: "Confidentialité des enfants",
    privacy_children_text: "Ce site ne s'adresse pas aux enfants et ne collecte sciemment aucune information les concernant.",
    privacy_changes_heading: "Modifications de cette politique",
    privacy_changes_text: "Cette politique peut être mise à jour de temps à autre, par exemple si de la publicité ou des outils d'analyse sont ajoutés au site. Les modifications seront publiées sur cette page.",
    privacy_contact_heading: "Contact",
    privacy_contact_html: "Les questions concernant cette politique peuvent être envoyées à <a href=\"mailto:pchoppe@icloud.com\">pchoppe@icloud.com</a>.",
  },

  es: {
    nav_scrambler: "Sopa de letras",
    nav_currency: "Conversor de divisas",
    nav_measurement: "Conversor de unidades",
    nav_back: "Volver al sitio",

    scrambler_badge: "Sopa de letras",
    scrambler_title: "Encuentra palabras válidas con tus letras",
    scrambler_subtitle: "Introduce una mezcla de letras y encuentra todas las palabras válidas que puedas formar.",
    scrambler_letters_label: "Letras",
    scrambler_letters_placeholder: "ej. taencri",
    scrambler_find_words: "Buscar palabras",
    scrambler_hint: "Solo letras, los espacios se ignoran. No importan mayúsculas ni minúsculas.",
    scrambler_min_length: "Longitud mínima de palabra",
    scrambler_max_length: "Longitud máxima de palabra",
    opt_1_letter: "1 letra",
    opt_n_letters: "{n} letras",
    scrambler_error_no_letters: "Introduce algunas letras (solo a-z).",
    scrambler_error_too_long: "Son muchas letras — prueba con 24 o menos.",
    scrambler_error_min_max: "La longitud mínima no puede ser mayor que la máxima.",
    scrambler_no_words: "No se encontraron palabras válidas con esas letras.",
    scrambler_word_found_singular: "1 palabra encontrada",
    scrambler_words_found: "{n} palabras encontradas",

    currency_badge: "Conversor de divisas",
    currency_title: "Convertir entre divisas",
    currency_subtitle: "Tipos de cambio en vivo, actualizados a diario.",
    label_amount: "Importe",
    label_from: "De",
    label_to: "A",
    currency_swap_title: "Intercambiar divisas",
    currency_converting: "Convirtiendo…",
    currency_same: "Misma divisa — tipo de cambio 1:1",
    currency_rate_as_of: "tipos a fecha de",
    currency_error_fetch: "No se pudieron obtener los tipos de cambio. Comprueba tu conexión a internet e inténtalo de nuevo.",

    measurement_badge: "Conversor de unidades",
    measurement_title: "Convertir medidas",
    measurement_subtitle: "Longitud, peso, temperatura y volumen — ej. litros a galones.",
    label_value: "Valor",
    measurement_swap_title: "Intercambiar unidades",
    measurement_same_unit: "Misma unidad — el valor no cambia",
    cat_length: "Longitud",
    cat_weight: "Peso",
    cat_temperature: "Temperatura",
    cat_volume: "Volumen",
    cat_speed: "Velocidad",

    footer_tagline: "Creado para toda la gente de internet · lista de palabras: ENABLE1 (~172.000 palabras) · tipos de cambio vía frankfurter.app",
    footer_privacy: "Política de privacidad",
    footer_about: "Acerca de",

    about_badge: "Acerca de",
    about_title: "Sobre este sitio",
    about_subtitle: "Un puñado de herramientas pequeñas y gratuitas en un solo lugar.",
    about_intro: "Este sitio reúne tres herramientas sencillas del día a día: una Sopa de letras para encontrar palabras válidas a partir de una mezcla de letras, un Conversor de divisas con tipos de cambio en vivo, y un Conversor de unidades para longitud, peso, temperatura y volumen. Sin registro, sin cuentas — simplemente abre la página y usa la herramienta que necesites.",
    about_why_heading: "Por qué existe",
    about_why_text: "Empezó como un pequeño proyecto personal — una sola página con algunas herramientas realmente útiles, pensada para ser rápida, gratuita y sin complicaciones.",
    about_built_heading: "Cómo está construido",
    about_built_html: "HTML, CSS y JavaScript sencillos — sin frameworks, sin scripts de seguimiento, sin proceso de compilación. La Sopa de letras funciona completamente sin conexión usando un diccionario de unas 172.000 palabras (ENABLE1). El Conversor de divisas obtiene tipos de cambio en vivo de la API gratuita <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a>.",
    about_feedback_heading: "Comentarios",
    about_feedback_html: "¿Encontraste un error o tienes una idea para otra herramienta? Escríbenos a <a href=\"mailto:pchoppetech@gmail.com\">pchoppetech@gmail.com</a>.",

    privacy_badge: "Legal",
    privacy_title: "Política de privacidad",
    privacy_last_updated: "Última actualización: 20 de agosto de 2026",
    privacy_intro: "Esta página explica qué ocurre con tus datos cuando usas este sitio web. En resumen: este sitio no requiere una cuenta, no recopila información personal mediante formularios y no almacena nada sobre ti en un servidor.",
    privacy_collect_heading: "Información que recopila este sitio",
    privacy_collect_text: "Ninguna de las herramientas de este sitio te pide crear una cuenta, iniciar sesión o enviar datos personales. Todo lo que escribes — letras para la Sopa de letras, importes para el Conversor de divisas, valores para el Conversor de unidades — se procesa en tu propio navegador y no se nos envía ni se almacena en ningún lugar.",
    privacy_third_heading: "Servicios de terceros",
    privacy_third_text1_html: "El Conversor de divisas obtiene tipos de cambio en vivo de <a href=\"https://frankfurter.dev\" target=\"_blank\" rel=\"noopener\">frankfurter.dev</a>, una API pública gratuita. En esa solicitud solo se envían los códigos de divisa y el importe introducido — no se incluye ni se requiere información personal.",
    privacy_third_text2_html: "Si este sitio muestra publicidad (por ejemplo, a través de Google AdSense), el proveedor de anuncios puede usar cookies o tecnologías similares para mostrar y medir anuncios, lo que puede incluir la recopilación de información sobre tu dispositivo y tu actividad de navegación en distintos sitios. Puedes controlar esto a través de la configuración de tu navegador o de la <a href=\"https://adssettings.google.com\" target=\"_blank\" rel=\"noopener\">configuración de anuncios de Google</a>.",
    privacy_cookies_heading: "Cookies",
    privacy_cookies_text: "Este sitio en sí no utiliza cookies. Si la publicidad está activada, el proveedor de anuncios puede usar cookies como se describe arriba.",
    privacy_children_heading: "Privacidad de los menores",
    privacy_children_text: "Este sitio no está dirigido a menores y no recopila información de ellos de forma consciente.",
    privacy_changes_heading: "Cambios en esta política",
    privacy_changes_text: "Esta política puede actualizarse ocasionalmente, por ejemplo si se añade publicidad o herramientas de análisis al sitio. Los cambios se publicarán en esta página.",
    privacy_contact_heading: "Contacto",
    privacy_contact_html: "Las preguntas sobre esta política pueden enviarse a <a href=\"mailto:pchoppe@icloud.com\">pchoppe@icloud.com</a>.",
  },
};

const LANG_KEY = 'sd_lang';

window.getLang = function () {
  return localStorage.getItem(LANG_KEY) || 'en';
};

window.t = function (key, params) {
  const lang = window.getLang();
  const dict = I18N[lang] || I18N.en;
  let str = dict[key] != null ? dict[key] : (I18N.en[key] || key);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replace(`{${k}}`, v);
    }
  }
  return str;
};

function applyTranslations(lang) {
  const dict = I18N[lang] || I18N.en;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] != null) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] != null) el.placeholder = dict[key];
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (dict[key] != null) el.title = dict[key];
  });

  document.querySelectorAll('#min-length option, #max-length option').forEach((opt) => {
    const n = parseInt(opt.value, 10);
    opt.textContent = n === 1 ? dict.opt_1_letter : dict.opt_n_letters.replace('{n}', n);
  });

  document.documentElement.lang = lang;

  document.querySelectorAll('.lang-switch button').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
}

function initLangSwitch() {
  const switcher = document.querySelector('.lang-switch');
  if (!switcher) return;
  switcher.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-lang]');
    if (!btn) return;
    const lang = btn.dataset.lang;
    localStorage.setItem(LANG_KEY, lang);
    applyTranslations(lang);
    window.dispatchEvent(new CustomEvent('sd-lang-change', { detail: lang }));
  });
}

// This script is loaded at the bottom of <body>, so the DOM is already
// parsed — no need to wait for DOMContentLoaded.
applyTranslations(window.getLang());
initLangSwitch();
