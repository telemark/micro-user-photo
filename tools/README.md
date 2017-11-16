# Step 0
Hent Fil - dataoverføring - Eksport - Bildenavn til fotograf
Felter med i uttak: Skole, Personnr, Bildefilnavn


```
Enhet PersonID  Bildenavn
PORVS 01010082111 KIOEFX.BMP
PORVS 01010092222 KIODQM.BMP
```

Endre headere til: Enhet = unitId, PersonId = id, Bildenavn = filename

Konverter csv til json ved filnavn step0.json

# Step 1

Henter brukernavn til elev fra buddy.

# Step 2

Hent bilder fra extens. Lag mappe for hver `unitId` under `images/`. Kopier inn bilder fra extens

Kjør step2
