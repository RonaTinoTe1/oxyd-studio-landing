# OXYD Studio — Brand Guidelines
> Version 2.0 — Mars 2026

---

## 1. Identité

**Nom** : OXYD Studio
**Tagline** : *Votre business. Un cerveau. Des bras.*
**Positioning** : Studio d'automatisation IA pour PME — OXYD construit l'infrastructure agentique à la place du client. Pas de l'accompagnement, pas du conseil. On construit.

**Ce qu'on fait :**
- Chatbots & agents IA sur mesure
- Workflows agentiques d'automatisation
- Infrastructures personnalisées (CRM, ops, lead gen, SAV…)
- Intégrations IA dans les outils existants

**Ce qu'on n'est pas :**
- Une agence de conseil IA
- Un outil SaaS en self-service
- Un concurrent de Make / Zapier

**Personnalité de marque :**
- Sérieux — pas de blague, résultats avant tout
- Moderne — langue de l'IA, pas du "digital"
- Efficace — phrases courtes, preuves concrètes
- Audacieux — on parle en résultats, pas en features

---

## 2. Slogan

### Principal
> **Votre business. Un cerveau. Des bras.**

**Pourquoi ça marche :**
- "Votre business" → on parle du client, pas de la techno
- "Un cerveau" → l'intelligence agentique (décisions, analyse, orchestration)
- "Des bras" → l'exécution (OXYD construit, le client dirige)
- Pas un seul mot de jargon IA recyclé

### Variantes (usage secondaire)
- *Ce que vous faites en une heure, fait en une seconde.*
- *L'IA qui ne dort jamais.*
- *Pendant que vous lisez ça, on pourrait l'automatiser.*
- *Votre concurrent n'attend pas. Vous non plus.*

---

## 3. Logo

### Concept
Le logo OXYD s'inspire du **tableau périodique des éléments chimiques**.
- "Ox" = symbole chimique (clin d'œil à oxydation, transformation)
- Numéro atomique : **8** (oxygène)
- Masse atomique : **15.999**
- Le cadre carré reprend la structure des cartes d'éléments
- O orange + x blanc = dualité (intelligence agentique + exécution)

### Fichiers disponibles

| Fichier | Usage | Fond |
|---------|-------|------|
| `svg/icon-dark.svg` | Logo principal — avatar, réseaux sociaux, app icon | Noir |
| `svg/icon-light.svg` | Logo sur fond clair | Blanc |
| `svg/logo-horizontal-dark.svg` | Logo + wordmark complet | Noir |
| `svg/favicon.svg` | Favicon site web (32×32) | Noir |

### Règles logo
- **Ne jamais** changer les couleurs du logo
- **Ne jamais** déformer, étirer ou faire pivoter
- **Espace minimum** autour du logo : 1× la hauteur de l'icône sur tous les côtés
- **Taille minimum** : 80px de large pour le logo complet, 24px pour l'icône seule
- Sur fond clair : utiliser `icon-light.svg` uniquement (fond blanc, texte #0A0A0A)
- Sur fond sombre : utiliser `icon-dark.svg` (fond #0A0A0A, bordure #F4511E)

### Polices du logo
- Symbol (O, x) : **Space Grotesk 800**
- Labels techniques (8, 15.999, OXYD) : **JetBrains Mono 500**

---

## 4. Couleurs

### Primaires
| Nom | Hex | Usage |
|-----|-----|-------|
| **Orange Oxyd** | `#F4511E` | CTAs, accents, icônes actives, lettre O du logo |
| **Noir profond** | `#0A0A0A` | Fond principal |
| **Off-white** | `#FAFAFA` | Texte principal sur fond sombre, lettre x du logo |

### Secondaires
| Nom | Hex | Usage |
|-----|-----|-------|
| **Gris foncé** | `#141414` | Cartes, surfaces élevées |
| **Gris subtle** | `#1A1A1A` | Hover states, séparations |
| **Gris border** | `#2A2A2A` | Bordures, dividers |
| **Gris border fort** | `#333333` | Bordures accentuées, taglines |
| **Texte muted** | `#6B7280` | Descriptions, labels secondaires |

### Variables CSS
```css
:root {
  --bg: #0A0A0A;
  --bg-subtle: #141414;
  --bg-muted: #1A1A1A;
  --border: #2A2A2A;
  --border-strong: #333333;
  --text: #FAFAFA;
  --text-muted: #6B7280;
  --accent: #F4511E;
  --radius: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
}
```

---

## 5. Typographie

### Display / Titres
**Police** : Space Grotesk (Google Fonts)
**Poids** : 700–800
**Tracking** : `-0.03em` à `-0.04em`
**Line-height** : `1.1` pour les gros titres
**Import** : `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800`

### Corps / Interface
**Police** : Inter (Google Fonts) ou system-ui
**Poids** : 400 (normal), 500 (medium)
**Tracking** : `0`
**Line-height** : `1.6`–`1.7`
**Taille** : 15–16px

### Mono / Labels techniques
**Police** : JetBrains Mono (Google Fonts)
**Poids** : 400–500
**Usage** : Timestamps, badges, code, données chiffrées
**Import** : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500`

### Échelle typographique
| Élément | Taille | Poids | Tracking |
|---------|--------|-------|---------|
| H1 hero | 64–80px | 800 | -0.04em |
| H2 section | 40–52px | 700 | -0.03em |
| H3 card | 20–24px | 700 | -0.02em |
| Body | 15–16px | 400 | 0 |
| Small / label | 11–13px | 500 | +0.02em |

---

## 6. Copywriting

### Règles d'or
1. **Phrases courtes.** Jamais de subordonnées inutiles.
2. **Chiffres concrets** : `17h économisées`, `10 jours`, jamais `beaucoup` ou `rapidement`.
3. **Vouvoiement** (dirigeants PME, 30–55 ans)
4. **Résultats avant tout** : feature → bénéfice → transformation business
5. **Jamais de jargon** sans explication : si tu dis "agent IA", tu dis en 5 mots ce qu'il fait.
6. **Pain points concrets** : parler de ce que le client ressent, pas de ce qu'on a construit.

### Vocabulaire autorisé
- Agent, cerveau, bras, exécution, automatisation, infrastructure
- Business, revenus, temps, opérations, équipe
- Construit, livré, déployé, opérationnel

### Vocabulaire interdit
- Révolutionnaire, disruptif, game-changer, innovant (mots creux)
- Solutions, synergies, valeur ajoutée (corporate vide)
- Facile, simple, rapide (sans chiffres qui le prouvent)

### Ton par contexte
| Contexte | Ton |
|----------|-----|
| Hero / accroche | Direct, audacieux, pas d'hésitation |
| Description service | Factuel, bénéfice immédiat, sans jargon |
| Social proof | Chiffres + transformation, jamais flou |
| Objection handling | Transparent, honnête, pas défensif |
| CTA | Verbe d'action + bénéfice ("Obtenir un diagnostic") |

---

## 7. Iconographie

**Style** : Line icons, stroke 1.5–2px, sans fill
**Taille std** : 20×20px (inline), 24×24px (standalone)
**Source recommandée** : Lucide Icons, Heroicons (outline)
**Couleur** : `#FAFAFA` ou `#F4511E` (jamais d'autres couleurs)

---

## 8. UI Components

### Boutons
- **Primary** : fond `#F4511E`, texte `#FAFAFA`, border-radius 100px (pill)
- **Secondary** : fond transparent, border `1px solid #2A2A2A`, texte `#FAFAFA`
- **Padding** : `12px 24px` (normal), `14px 28px` (hero)
- Magnetic hover effect sur les boutons primaires

### Cartes
- **Fond** : `#141414`
- **Bordure** : `1px solid #2A2A2A`
- **Radius** : `18px`
- Spotlight effect (lumière CSS qui suit le curseur)

### Formulaires
- **Inputs** : fond `#141414`, border `1px solid #2A2A2A`, focus ring `#F4511E`
- Validation inline, immédiate
- Submit : bouton primary full-width

---

## 9. Assets réseaux sociaux

### Photo de profil (1:1 — 400×400px minimum)
Utiliser `svg/icon-dark.svg` — fond noir, icône élément chimique

### Bannière LinkedIn (1584×396px)
Fond `#0A0A0A`, tagline centrale "Votre business. Un cerveau. Des bras."
Logo en haut à gauche, couleur accent `#F4511E`

### Bio Instagram / LinkedIn
```
Studio d'automatisation IA pour PME.
On construit l'IA qu'on vous a promise.
→ oxyd.studio
```

---

## 10. Don't

- ❌ Fond blanc avec texte orange (illisible et cheap)
- ❌ Gradients arc-en-ciel ou purple-to-blue (cliché SaaS)
- ❌ Stock photos de bureau ou équipe souriante
- ❌ Animations lentes (> 600ms) ou décoratives sans sens
- ❌ Plusieurs polices display différentes dans la même page
- ❌ Logo modifié, retourné ou coloré différemment
- ❌ "Révolutionnaire", "disruptif", "game-changer"
- ❌ Jargon IA sans explication : "LLM", "RAG", "fine-tuning" seuls

---

## 11. Pour une autre IA

Si tu génères du contenu pour OXYD Studio, retiens :
- Nom : **OXYD Studio** (toujours en majuscules)
- Tagline : **"Votre business. Un cerveau. Des bras."**
- Couleur principale : **#F4511E** (orange vif)
- Fond : **#0A0A0A** (noir profond)
- Texte : **#FAFAFA** (blanc cassé)
- Polices : **Space Grotesk 800** (titres), **Inter** (corps), **JetBrains Mono** (technique)
- Ton : direct, sans jargon, résultats concrets, vouvoiement, phrases courtes
- On vend : infrastructure agentique IA pour PME — **on construit**, le client dirige
- On ne vend pas : conseil, formation, SaaS, outils en self-service

*Mis à jour : mars 2026*
