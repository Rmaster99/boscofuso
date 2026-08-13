# Boscofuso — revisione pre-pubblicazione

Data: 13 agosto 2026

## Interventi effettuati

- SEO tecnica centralizzata in `src/layouts/BaseLayout.astro`:
  - canonical assoluto;
  - `hreflang` IT / EN + `x-default`;
  - meta description e robots;
  - Open Graph;
  - Twitter Card;
  - favicon e theme color.
- Titoli e meta description riscritti pagina per pagina in IT e EN.
- `astro.config.mjs` impostato con dominio canonico `https://www.boscofuso.com` e trailing slash coerente.
- Creato `public/sitemap.xml` con 12 URL indicizzabili e relazioni hreflang.
- Creato `public/robots.txt` con riferimento alla sitemap.
- Privacy IT/EN impostate `noindex,follow` e escluse dalla sitemap.
- PDF da colorare esclusi dall'indice tramite `X-Robots-Tag: noindex` in `public/_headers`.
- Rimosse 8 vecchie pagine libro placeholder “in costruzione / in progress”.
- Creato `public/_redirects` per:
  - `/` -> `/it/` (301);
  - vecchi URL delle pagine libro -> pagina libri corretta.
- Corretto il titolo Vol. 1 nel sito: `Le origini di Boscofuso` / `The Origins of Boscofuso`.
- Corretti piccoli errori di spaziatura nel testo della prima descrizione libro e nel footer.
- Ottimizzato il logo dell'header con output WebP e dimensioni responsive, senza modificare il logo del footer.
- Nascosti i pulsanti store senza URL (in particolare Kobo), così il sito pubblico non mostra controlli disabilitati o “in arrivo”.
- Aggiunto `.node-version` con Node 22.12.0 per rendere il build Cloudflare più prevedibile.

## Controlli eseguiti sul sorgente

- Tutti gli import relativi usati dai file Astro puntano a file esistenti.
- Tutti i 15 PDF della sezione da colorare sono presenti in `public/downloads/da-colorare/`.
- Le 5 hero sono presenti.
- Le copertine e le tre preview dei 4 libri Boscofuso sono presenti.
- Gli asset dei personaggi, dei luoghi e degli 8 libri Happy Edy sono presenti.
- Non risultano più pagine pubbliche con testo “in costruzione / in progress”.
- `sitemap.xml` validata come XML.

## Prima del deploy

Sul PC locale eseguire:

```cmd
npm install
npm run build
npm run preview
```

Controllare in preview almeno:

- `/it/`
- `/en/`
- `/it/libri/`
- `/en/books/`
- `/it/mondo-di-boscofuso/`
- `/it/personaggi/`
- `/it/da-colorare/`
- `/it/happy-edy/`
- `/it/privacy/`
- `/sitemap.xml`
- `/robots.txt`

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node: `22.12.0` (letto da `.node-version`)
- Dominio canonico previsto: `www.boscofuso.com`

Dopo il deploy impostare il redirect permanente da `boscofuso.com` a `www.boscofuso.com` e, se il progetto resta raggiungibile dal sottodominio `*.pages.dev`, reindirizzare anche quello al dominio canonico.

## Google Search Console

Dopo che il dominio definitivo risponde correttamente:

1. creare/verificare la proprietà dominio `boscofuso.com`;
2. inviare `https://www.boscofuso.com/sitemap.xml`;
3. ispezionare e richiedere l'indicizzazione almeno di `/it/`, `/en/`, `/it/libri/`, `/it/mondo-di-boscofuso/`, `/it/personaggi/` e `/it/da-colorare/`;
4. controllare dopo qualche giorno Pagine, Sitemap e indicizzazione.
