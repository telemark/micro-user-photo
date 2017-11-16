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

## Store bilder

BIG=`find . -name '*' -size +600k`
for i in $BIG; do
  convert -resize 800x600 $i $i
done

## Konvertere til png
for i in *.BMP; do
  convert $i `basename $i .BMP`.png
done

for i in *.bmp; do
  convert $i `basename $i .bmp`.png
done
