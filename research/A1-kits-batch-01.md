# A1 — Kit facts, batch 01

Shirts: argentina-1930, uruguay-1930, czechoslovakia-1934, italy-1934, hungary-1938, italy-1938, brazil-1950, uruguay-1950, hungary-1954, west-germany-1954

Method notes (for Claude when plugging in):
- "worn_in_final" colours were checked against two independent reconstructions: the Historical Football Kits (HFK) illustration for that exact final, and the kit graphic in the Wikipedia article about the final. Both are reconstructions from black-and-white photographs, so exact shades (and especially shorts colours) carry some uncertainty.
- "debut" for pre-1960 national-team shirts refers to the first match in that colour/design, because individual shirt models of the era were not documented as separate releases. Where even that cannot be sourced, it is null.
- Manufacturers before the 1960s were rarely recorded; null means no reliable source was found.

```json
[
  {
    "id": "argentina-1930",
    "manufacturer": null,
    "debut": {
      "value": "Light blue and white striped design first worn v South Africa, Buenos Aires, 9 July 1906 (design debut, not this specific garment)",
      "source": "https://en.wikipedia.org/wiki/Argentina_national_football_team#Kit"
    },
    "story": {
      "value": "By 1930 Argentina had already worn vertical light blue and white stripes for more than two decades, and they kept them for the first World Cup final even though their hosts also played in sky blue. The two shirts were told apart mainly by Argentina's stripes and laced collar against Uruguay's plain celeste. The final is better remembered for a row over the ball: FIFA ruled that each side would supply the ball for one half, and Argentina led 2-1 at the interval with their own.",
      "sources": [
        "https://en.wikipedia.org/wiki/Argentina_national_football_team#Kit",
        "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1930/1930-knock-out-stage.html",
        "https://en.wikipedia.org/wiki/1930_FIFA_World_Cup_final"
      ]
    },
    "worn_in_final": {
      "colours": "light blue and white vertical striped shirt with laced collar, dark (grey or black) shorts, black socks with light blue and white tops",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1930/1930-knock-out-stage.html"
    },
    "notes": "Shorts colour uncertain: HFK draws them dark grey and Wikipedia's kit graphic uses grey (999999); black-and-white photographs make this hard to confirm. No manufacturer recorded."
  },
  {
    "id": "uruguay-1930",
    "manufacturer": null,
    "debut": {
      "value": "Sky blue (celeste) shirt first worn v Argentina, Montevideo, 15 August 1910 (Copa Lipton; colour debut, not this specific garment)",
      "source": "https://en.wikipedia.org/wiki/Uruguay_national_football_team"
    },
    "story": {
      "value": "Uruguay adopted sky blue in 1910 as a tribute to River Plate F.C. of Montevideo, and the colour gave the team its nickname, La Celeste. The shirt worn when they won the first World Cup was plain cotton with a laced, round collar, a detail confirmed by Héctor Scarone's 1930 shirt, which is kept in a Uruguayan museum.",
      "sources": [
        "https://en.wikipedia.org/wiki/Uruguay_national_football_team",
        "https://www.historicalkits.co.uk/Articles/Updates-2014.html"
      ]
    },
    "worn_in_final": {
      "colours": "plain sky blue shirt with white laced round collar, black shorts, black socks with sky blue tops",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1930/1930-knock-out-stage.html"
    },
    "notes": "A shirt once said to be José Nasazzi's 1930 final shirt was challenged by a researcher, who dated it to around 1939; Scarone's museum shirt is considered more reliable (HFK updates 2014). No manufacturer recorded."
  },
  {
    "id": "czechoslovakia-1934",
    "manufacturer": null,
    "debut": null,
    "story": {
      "value": "Czechoslovakia reached the 1934 final in red shirts, white shorts and blue socks, the colours of the national flag, with the Bohemian lion crest on the chest. The same red, white and blue combination remained their first-choice kit for decades. They led the final until nine minutes from time before losing in extra time.",
      "sources": [
        "https://en.wikipedia.org/wiki/Czechoslovakia_national_football_team",
        "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1934/1934.html"
      ]
    },
    "worn_in_final": {
      "colours": "red shirt with lion crest, white shorts, blue socks with white hoops at the top",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1934/1934.html"
    },
    "notes": "Wikipedia's kit history lists red/white/blue as the home kit for 1934-1976 but gives no first-match date for it. HFK titles its illustration 'red kit'. No manufacturer recorded (Adidas only from 1976)."
  },
  {
    "id": "italy-1934",
    "manufacturer": null,
    "debut": {
      "value": "Blue (Savoy azure) shirt first worn v Hungary, Milan, 6 January 1911 (colour debut, not this specific garment)",
      "source": "https://en.wikipedia.org/wiki/Italy_national_football_team"
    },
    "story": {
      "value": "Italy's blue comes from the royal House of Savoy, whose blue-bordered arms featured on the flag of the Kingdom of Italy, and the team had worn it since 1911. In the early 1930s the shirt carried the Savoy cross badge. Italy won the 1934 final at home in Rome in this blue shirt, with white shorts and black socks.",
      "sources": [
        "https://en.wikipedia.org/wiki/Italy_national_football_team",
        "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1934/1934.html"
      ]
    },
    "worn_in_final": {
      "colours": "blue V-neck shirt with Savoy cross badge, white shorts, black socks with blue band",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1934/1934.html"
    },
    "notes": "The exact shade is uncertain; HFK draws a lighter blue for 1934 than for 1938. No manufacturer recorded."
  },
  {
    "id": "hungary-1938",
    "manufacturer": null,
    "debut": null,
    "story": {
      "value": "Hungary's kit is built from the national flag: cherry red shirts, white shorts and green socks, with the national coat of arms worn on the left of the chest over the heart. In the 1938 final they wore this traditional combination against Italy's blue and lost 4-2 in Paris.",
      "sources": [
        "https://en.wikipedia.org/wiki/Hungary_national_football_team",
        "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1938/1938.html"
      ]
    },
    "worn_in_final": {
      "colours": "dark cherry red shirt with national coat of arms, white shorts, green socks with red and white tops",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1938/1938.html"
    },
    "notes": "Wikipedia lists the kit supplier for 1902-1976 as 'in-house' (made for the federation, no named brand), so manufacturer is null."
  },
  {
    "id": "italy-1938",
    "manufacturer": null,
    "debut": null,
    "story": {
      "value": "Italy's 1938 campaign is remembered for a different shirt: in the quarter-final against hosts France, whose blue clashed with theirs, Italy wore all black, the colour of the Fascist Blackshirts, rather than their white change kit. For the final against Hungary they were back in blue, and they retained the title with a 4-2 win. Whether Mussolini personally ordered the black kit is not settled.",
      "sources": [
        "https://en.wikipedia.org/wiki/Italy_national_football_team",
        "https://www.bbc.com/sport/football/63873325",
        "https://apnews.com/world-cup-with-war-looming-italy-dons-black-in-1938-e9e5d3fa06444c53bb40296c0bd0ae98"
      ]
    },
    "worn_in_final": {
      "colours": "blue V-neck shirt with Savoy cross badge, white shorts, black socks with blue band",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1938/1938.html"
    },
    "notes": "Sources disagree on whether Mussolini directly ordered the black shirts: AP says it is unclear; BBC says it was 'on orders from above'. Some secondary sites wrongly claim Italy wore black in the final; HFK and Wikipedia both show blue. The black kit itself first appeared on 17 February 1935 v France in Rome (Wikipedia)."
  },
  {
    "id": "brazil-1950",
    "manufacturer": null,
    "debut": null,
    "story": {
      "value": "Brazil played the deciding match of 1950 in their original colours of white shirts with blue collars. After the shock defeat to Uruguay at the Maracanã, the white kit was criticised as unpatriotic, and in 1953 the newspaper Correio da Manhã ran a design competition for a kit using the flag's colours. The winner, Aldyr Garcia Schlee, created the yellow and green shirt first worn in March 1954, so this was effectively the last great match of Brazil in white.",
      "sources": [
        "https://en.wikipedia.org/wiki/Uruguay_v_Brazil_(1950_FIFA_World_Cup)",
        "https://www.theguardian.com/sport/2009/mar/14/brazil-wear-yellow-first-time",
        "https://www.bbc.co.uk/news/magazine-27809268"
      ]
    },
    "worn_in_final": {
      "colours": "white shirt with blue collar and cuff trim, white shorts with blue side stripe, white socks with blue hoops",
      "home_or_change": "home",
      "source": "https://en.wikipedia.org/wiki/Uruguay_v_Brazil_(1950_FIFA_World_Cup)"
    },
    "notes": "1950 had no single final; this was the deciding match of the final group (16 July 1950). Wikipedia's kit-supplier table lists 'None' for 1908-1954. Shorts and socks details are from the HFK illustration on https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1950/1950-group-final.html; Wikipedia's graphic shows plain white shorts and socks."
  },
  {
    "id": "uruguay-1950",
    "manufacturer": null,
    "debut": null,
    "story": {
      "value": "Uruguay won the 'Maracanazo' in the same celeste they had worn since 1910, paired with black shorts and socks. The kit's continuity meant that both of Uruguay's World Cup titles, twenty years apart, were won in essentially the same colours. It is now remembered as the shirt of Obdulio Varela and Alcides Ghiggia, whose 79th-minute winner silenced a crowd of about 200,000.",
      "sources": [
        "https://en.wikipedia.org/wiki/Uruguay_national_football_team",
        "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1950/1950-group-final.html"
      ]
    },
    "worn_in_final": {
      "colours": "plain sky blue shirt with white V-neck trim, black shorts, black socks with sky blue tops",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1950/1950-group-final.html"
    },
    "notes": "Deciding match of the final group, not a formal final. Attendance is often given as about 200,000 (HFK), with unofficial estimates of 210,000. HFK's illustration for this match is the generic Uruguay 1950 kit. No manufacturer recorded."
  },
  {
    "id": "hungary-1954",
    "manufacturer": null,
    "debut": null,
    "story": {
      "value": "The cherry red shirt of Hungary's 'Golden Team' became one of the most recognisable kits of the 1950s, worn by Puskás and Kocsis during an unbeaten run of 31 matches that ended in the 1954 final. The shirt carried the national coat of arms of the time on the chest. Hungary's federation still refers back to it: a modern Adidas kit was launched as a nod to the cherry red worn by the Aranycsapat.",
      "sources": [
        "https://en.wikipedia.org/wiki/Hungary_national_football_team",
        "https://en.mlsz.hu/hir/new-hungary-national-team-kit-launched-for-euro-qualifiers"
      ]
    },
    "worn_in_final": {
      "colours": "cherry red V-neck shirt with national coat of arms, white shorts, green socks with red and white tops",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1954/1954-knock-out-stages.html"
    },
    "notes": "Kit supplier listed as 'in-house' for 1902-1976 (Wikipedia), so manufacturer is null. The badge shown by HFK is the communist-era coat of arms; Claude should not claim a specific emblem design without checking a photograph."
  },
  {
    "id": "west-germany-1954",
    "manufacturer": {
      "value": "Leuzela",
      "source": "https://en.wikipedia.org/wiki/Germany_national_football_team"
    },
    "debut": null,
    "story": {
      "value": "West Germany won the 'Miracle of Bern' in a plain white shirt with a black collar and cuffs, black shorts and the DFB eagle on the chest. The white and black colours come from the flag of Prussia. The kit itself was simple; the decisive equipment was Adi Dassler's boots with screw-in studs, which suited the rain-soaked Wankdorf pitch.",
      "sources": [
        "https://en.wikipedia.org/wiki/Germany_national_football_team",
        "https://en.wikipedia.org/wiki/1954_FIFA_World_Cup_final",
        "https://www.dw.com/en/nike-over-adidas-german-footballs-monumental-switch/a-68642683"
      ]
    },
    "worn_in_final": {
      "colours": "white shirt with black round collar and black cuffs, DFB eagle badge, black shorts, white socks with black tops",
      "home_or_change": "home",
      "source": "https://www.historicalkits.co.uk/international/tournaments/fifa-world-cup/1954/1954-knock-out-stages.html"
    },
    "notes": "CONFLICT on manufacturer: Wikipedia's kit-supplier table says Germany wore Leuzela kits from 1950-1964, including the 1954 World Cup, but the same article says the Adidas sponsorship began in 1954, and several retail sites call this an Adidas shirt. Adidas's 1954 role is documented for boots (DW, Wikipedia). Treat Leuzela as the best-supported answer, not certain. Socks: HFK shows white with black tops; Wikipedia's graphic shows black."
  }
]
```
