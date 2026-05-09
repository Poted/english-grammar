import { useState } from "react";

const GROUPS = [
  { id: "czasy", label: "CZASY", color: "#2DD4BF" },
  { id: "struktury", label: "STRUKTURY", color: "#F59E0B" },
  { id: "zdania", label: "ZDANIA", color: "#F472B6" },
  { id: "formy", label: "FORMY", color: "#A78BFA" },
];

const TOPICS = [
  // â”€â”€â”€ CZASY â”€â”€â”€
  {
    id: "tenses", group: "czasy", title: "12 CzasĂłw", color: "#2DD4BF", icon: "â�ą",
    intro: "KaĹźdy czas = group (Simple/Continuous/Perfect/Perfect Cont.) Ă— czas (Present/Past/Future).",
    data: [
      { group: "PRESENT", color: "#2DD4BF", items: [
        { name: "Present Simple", formula: "do/does", when: "Fakty, nawyki, rutyna", ex: "She works every day.", neg: "She doesn't work.", tip: "3os.lp â†’ +s/es: he works, she goes" },
        { name: "Present Continuous", formula: "am/is/are + -ing", when: "Dzieje siÄ™ TERAZ", ex: "She is working now.", neg: "She isn't working.", tip: null },
        { name: "Present Perfect", formula: "have/has + pp", when: "PrzeszĹ‚oĹ›Ä‡ poĹ‚Ä…czona z teraĹşniejszoĹ›ciÄ…", ex: "She has finished.", neg: "She hasn't finished.", tip: "Nie mĂłwisz KIEDY â€” jeĹ›li podajesz czas â†’ Past Simple" },
        { name: "Present Perfect Cont.", formula: "have/has been + -ing", when: "Trwa od przeszĹ‚oĹ›ci do teraz", ex: "She has been working for 3h.", neg: "She hasn't been working.", tip: null },
      ]},
      { group: "PAST", color: "#F472B6", items: [
        { name: "Past Simple", formula: "did / -ed / nieregularne", when: "ZakoĹ„czone w przeszĹ‚oĹ›ci (wiesz kiedy)", ex: "She worked yesterday.", neg: "She didn't work.", tip: "Yesterday, ago, last year â†’ zawsze Past Simple" },
        { name: "Past Continuous", formula: "was/were + -ing", when: "TrwaĹ‚o w konkretnym momencie", ex: "She was working at 8pm.", neg: "She wasn't working.", tip: null },
        { name: "Past Perfect", formula: "had + pp", when: "WczeĹ›niej niĹź inne zdarzenie w przeszĹ‚oĹ›ci", ex: "She had left before he arrived.", neg: "She hadn't left.", tip: "PrzeszĹ‚oĹ›Ä‡ w przeszĹ‚oĹ›ci" },
        { name: "Past Perfect Cont.", formula: "had been + -ing", when: "TrwaĹ‚o zanim coĹ› innego siÄ™ wydarzyĹ‚o", ex: "She had been working for hours when he called.", neg: "She hadn't been working.", tip: null },
      ]},
      { group: "FUTURE", color: "#A78BFA", items: [
        { name: "Future Simple (will)", formula: "will + infinitive", when: "Spontaniczne decyzje, przepowiednie, obietnice", ex: "She will call you.", neg: "She won't call.", tip: "Decyzja podjÄ™ta W MOMENCIE mĂłwienia" },
        { name: "Be going to", formula: "am/is/are going to + inf", when: "Zaplanowane zamierzenia, wyraĹşne oznaki", ex: "She is going to quit.", neg: "She isn't going to quit.", tip: "Plan istnieje zanim zaczniesz mĂłwiÄ‡" },
        { name: "Future Continuous", formula: "will be + -ing", when: "BÄ™dzie trwaĹ‚o w konkretnym momencie", ex: "She will be working at noon.", neg: "She won't be working.", tip: null },
        { name: "Future Perfect", formula: "will have + pp", when: "ZakoĹ„czy siÄ™ PRZED konkretnym momentem", ex: "She will have finished by Friday.", neg: "She won't have finished.", tip: "Do piÄ…tku juĹź skoĹ„czy" },
      ]},
    ]
  },

  // â”€â”€â”€ STRUKTURY â”€â”€â”€
  {
    id: "modals", group: "struktury", title: "Modal Verbs", color: "#F59E0B", icon: "â—ˆ",
    intro: "Po modal verb zawsze goĹ‚e infinitive â€” bez 'to', bez -s, bez -ed.",
    data: [
      { group: "MOĹťLIWOĹšÄ† / ZDOLNOĹšÄ†", items: [
        { word: "can", meaning: "mogÄ™, umiem (teraz)", ex: "I can swim.", tip: null },
        { word: "could", meaning: "mogĹ‚em / grzeczna proĹ›ba", ex: "Could you help me?", tip: "PrzeszĹ‚oĹ›Ä‡ CAN lub uprzejma proĹ›ba" },
        { word: "be able to", meaning: "byĹ‚em w stanie (konkretna sytuacja)", ex: "I was able to escape.", tip: "could = ogĂłlna umiejÄ™tnoĹ›Ä‡ / was able to = konkretna chwila" },
      ]},
      { group: "OBOWIÄ„ZEK", items: [
        { word: "must", meaning: "muszÄ™ (wewnÄ™trzne przekonanie)", ex: "You must stop smoking.", tip: null },
        { word: "have to", meaning: "muszÄ™ (zewnÄ™trzny przymus)", ex: "I have to work tomorrow.", tip: "must = sam tak uwaĹźam / have to = ktoĹ›/coĹ› mnie zmusza" },
        { word: "should / ought to", meaning: "powinienem (rada)", ex: "You should see a doctor.", tip: "ought to = bardziej formalne" },
      ]},
      { group: "ZAKAZ / BRAK KONIECZNOĹšCI", items: [
        { word: "mustn't", meaning: "nie wolno (zakaz!)", ex: "You mustn't drive drunk.", tip: "UWAGA: mustn't â‰  don't have to" },
        { word: "don't have to", meaning: "nie musisz (ale moĹźesz)", ex: "You don't have to come.", tip: "Brak obowiÄ…zku, nie zakaz" },
      ]},
      { group: "PRZYPUSZCZENIE", items: [
        { word: "must", meaning: "na pewno (pewnoĹ›Ä‡)", ex: "She must be tired.", tip: null },
        { word: "might / may", meaning: "moĹźe, byÄ‡ moĹźe (~50%)", ex: "It might rain.", tip: "might = trochÄ™ mniej pewne niĹź may" },
        { word: "can't", meaning: "na pewno nie (niemoĹźliwe)", ex: "That can't be true.", tip: null },
        { word: "would", meaning: "chciaĹ‚bym / warunek", ex: "I would like a coffee.", tip: "would like = grzeczniejsze 'want'" },
      ]},
    ]
  },
  {
    id: "conditionals", group: "struktury", title: "Conditionals", color: "#34D399", icon: "â—‡",
    intro: "4 typy. Naucz siÄ™ wzoru, nie tĹ‚umaczenia.",
    data: [
      { type: "0", name: "Zero Conditional", when: "Prawa, fakty zawsze prawdziwe", formula: "If + Pres. Simple â†’ Pres. Simple", ex: "If you heat water, it boils.", pl: "JeĹ›li podgrzejesz wodÄ™, gotuje siÄ™.", tip: "MoĹźna zastÄ…piÄ‡ 'if' przez 'when'." },
      { type: "1", name: "First Conditional", when: "Realna moĹźliwoĹ›Ä‡ w przyszĹ‚oĹ›ci", formula: "If + Pres. Simple â†’ will + inf", ex: "If it rains, I will stay home.", pl: "JeĹ›li bÄ™dzie padaÄ‡, zostanÄ™ w domu.", tip: "NIE pisz 'if it will rain'." },
      { type: "2", name: "Second Conditional", when: "Nierealna sytuacja TERAZ lub w przyszĹ‚oĹ›ci", formula: "If + Past Simple â†’ would + inf", ex: "If I had a million, I would travel.", pl: "Gdybym miaĹ‚ milion, podrĂłĹźowaĹ‚bym.", tip: "'If I were you' (nie 'was') â€” was jest potoczne." },
      { type: "3", name: "Third Conditional", when: "Nierealna sytuacja w PRZESZĹ�OĹšCI â€” za pĂłĹşno", formula: "If + Past Perfect â†’ would have + pp", ex: "If I had studied, I would have passed.", pl: "Gdybym siÄ™ uczyĹ‚, zdaĹ‚bym.", tip: "Ĺťal za przeszĹ‚oĹ›ciÄ…. Nie da siÄ™ zmieniÄ‡." },
    ]
  },
  {
    id: "passive", group: "struktury", title: "Passive Voice", color: "#60A5FA", icon: "â—Ť",
    intro: "Gdy niewaĹźne/nieznane kto zrobiĹ‚. Schemat: be (w odpowiednim czasie) + past participle.",
    data: [
      { tense: "Present Simple", formula: "am/is/are + pp", active: "They make cars here.", passive: "Cars are made here." },
      { tense: "Past Simple", formula: "was/were + pp", active: "Someone stole my wallet.", passive: "My wallet was stolen." },
      { tense: "Present Continuous", formula: "am/is/are being + pp", active: "They are building a bridge.", passive: "A bridge is being built." },
      { tense: "Past Continuous", formula: "was/were being + pp", active: "They were filming it.", passive: "It was being filmed." },
      { tense: "Present Perfect", formula: "have/has been + pp", active: "They have finished it.", passive: "It has been finished." },
      { tense: "Past Perfect", formula: "had been + pp", active: "They had delivered it.", passive: "It had been delivered." },
      { tense: "Future (will)", formula: "will be + pp", active: "They will announce it.", passive: "It will be announced." },
      { tense: "Modal verbs", formula: "modal + be + pp", active: "You must sign this.", passive: "This must be signed." },
    ]
  },
  {
    id: "reported", group: "struktury", title: "Reported Speech", color: "#FB923C", icon: "â��",
    intro: 'Przekazujesz co ktoĹ› powiedziaĹ‚ â€” czasy cofajÄ… siÄ™ o jeden poziom wstecz.',
    data: {
      shifts: [
        { from: "Present Simple", to: "Past Simple", ex1: '"I work here."', ex2: "He said he worked there." },
        { from: "Present Continuous", to: "Past Continuous", ex1: '"I am working."', ex2: "She said she was working." },
        { from: "Present Perfect", to: "Past Perfect", ex1: '"I have finished."', ex2: "He said he had finished." },
        { from: "Past Simple", to: "Past Perfect", ex1: '"I called you."', ex2: "She said she had called me." },
        { from: "will", to: "would", ex1: '"I will help."', ex2: "He said he would help." },
        { from: "can", to: "could", ex1: '"I can swim."', ex2: "She said she could swim." },
        { from: "must", to: "had to", ex1: '"I must go."', ex2: "He said he had to go." },
      ],
      other: [
        { label: "Zaimki", rule: "I â†’ he/she, my â†’ his/her", ex: '"I lost my keys." â†’ He said he had lost his keys.' },
        { label: "Czas/miejsce", rule: "now â†’ then, here â†’ there, today â†’ that day, tomorrow â†’ the next day", ex: '"Call me tomorrow." â†’ She said to call her the next day.' },
        { label: "Pytania", rule: "Szyk zdania oznajmujÄ…cego! Bez do/does/did.", ex: '"Where do you live?" â†’ He asked where I lived.' },
        { label: "Polecenia", rule: "tell sb + to / not to", ex: '"Close the door." â†’ She told me to close the door.' },
      ],
      tip: "Nie cofasz czasu gdy: mĂłwisz o staĹ‚ej prawdzie (He said the Earth is round), lub sytuacja nadal aktualna."
    }
  },
  {
    id: "relative", group: "struktury", title: "Relative Clauses", color: "#E879F9", icon: "âŠ‚",
    intro: "Zdania dodajÄ…ce informacjÄ™ o rzeczowniku. Klucz: wĹ‚aĹ›ciwy zaimek + wiedza o przecinku.",
    data: {
      pronouns: [
        { word: "who", use: "osoby", ex: "The man who called you is waiting." },
        { word: "which", use: "rzeczy, zwierzÄ™ta", ex: "The book which I read was great." },
        { word: "that", use: "osoby i rzeczy (definiujÄ…ce)", ex: "The car that I bought is red.", tip: "Nie po przecinku, nie po przyimku" },
        { word: "whose", use: "przynaleĹźnoĹ›Ä‡ (czyj)", ex: "The girl whose bag was stolen called police." },
        { word: "where", use: "miejsce", ex: "The city where I was born is small." },
        { word: "when", use: "czas", ex: "I remember the day when we met." },
      ],
      types: [
        { name: "DefiniujÄ…ce (bez przecinka)", desc: "NiezbÄ™dne â€” bez niego nie wiadomo o kim mĂłwisz. MoĹźna uĹźyÄ‡ who/which/that.", ex: "The woman who lives next door is a nurse.", tip: "UsuĹ„ zdanie â†’ brak sensu." },
        { name: "NiedefiniujÄ…ce (z przecinkiem)", desc: "Dodatkowa info â€” zdanie ma sens bez niego. Tylko who/which, NIE that.", ex: "My sister, who lives in London, is a doctor.", tip: "Zawsze przecinki po obu stronach." },
      ],
      tip: "MoĹźesz opuĹ›ciÄ‡ who/which/that gdy jest OBIEKTEM:\n'The book (that) I read' âœ“ â€” ale 'The man who called me' â†’ nie moĹźna opuĹ›ciÄ‡ (who = podmiot)"
    }
  },

  // â”€â”€â”€ ZDANIA â”€â”€â”€
  {
    id: "questions", group: "zdania", title: "Pytania", color: "#F472B6", icon: "?",
    intro: "W pytaniach szyk siÄ™ odwraca. Kluczowe: zawsze uĹźywaj operatora (do/does/did/is/have...).",
    data: {
      types: [
        { name: "Yes/No questions", formula: "Operator + podmiot + czasownik?", items: [
          { ex: "Do you work here?", note: "Present Simple" },
          { ex: "Are you coming?", note: "Present Continuous" },
          { ex: "Did she call?", note: "Past Simple" },
          { ex: "Have you eaten?", note: "Present Perfect" },
          { ex: "Will he come?", note: "Future" },
        ]},
        { name: "Wh- questions", formula: "Wh- + operator + podmiot + czasownik?", items: [
          { ex: "Where do you live?", note: "NIE: Where you live?" },
          { ex: "What did she say?", note: "NIE: What she said?" },
          { ex: "When will you come?", note: null },
          { ex: "How long have you been here?", note: null },
        ]},
        { name: "Subject questions", formula: "Who/What + czasownik? (BEZ inwersji!)", items: [
          { ex: "Who called you? (not: Who did call you?)", note: "Who = podmiot â†’ brak inwersji" },
          { ex: "What happened?", note: "What = podmiot â†’ brak inwersji" },
          { ex: "How many people came?", note: "How many people = podmiot" },
        ]},
        { name: "Pytania poĹ›rednie", formula: "Can you tell me + where/if/whether + szyk oznajmujÄ…cy", items: [
          { ex: "Can you tell me where he lives?", note: "NIE: ...where does he live?" },
          { ex: "I don't know if she is coming.", note: "if/whether = czy" },
          { ex: "Do you know what time it is?", note: "Szyk zdania, nie pytania!" },
        ]},
      ]
    }
  },
  {
    id: "tags", group: "zdania", title: "Question Tags", color: "#FB923C", icon: "â†Š",
    intro: "Zdanie twierdzÄ…ce â†’ tag przeczÄ…cy | Zdanie przeczÄ…ce â†’ tag twierdzÄ…cy.",
    data: {
      basic: [
        { s: "She is tired,", t: "isn't she?", n: "is â†’ isn't" },
        { s: "They are coming,", t: "aren't they?", n: "are â†’ aren't" },
        { s: "He works here,", t: "doesn't he?", n: "works â†’ doesn't" },
        { s: "You saw him,", t: "didn't you?", n: "saw â†’ didn't" },
        { s: "She will come,", t: "won't she?", n: "will â†’ won't" },
        { s: "They have finished,", t: "haven't they?", n: "have â†’ haven't" },
        { s: "He can swim,", t: "can't he?", n: "can â†’ can't" },
        { s: "She isn't happy,", t: "is she?", n: "przeczÄ…ce â†’ twierdzÄ…cy" },
        { s: "They don't know,", t: "do they?", n: "przeczÄ…ce â†’ twierdzÄ…cy" },
      ],
      exceptions: [
        { s: "I am right,", t: "aren't I?", n: "WyjÄ…tek â€” nie 'amn't I'" },
        { s: "Let's go,", t: "shall we?", n: "Specjalny tag dla Let's" },
        { s: "Nobody called,", t: "did they?", n: "Zaimki nieokreĹ›lone â†’ they" },
        { s: "There is a problem,", t: "isn't there?", n: "There â†’ there" },
      ],
      intonation: [
        { arrow: "â†˜ opadajÄ…ca", meaning: "Wiem odpowiedĹş, szukam potwierdzenia", ex: "Nice day, isn't it? â†˜" },
        { arrow: "â†— rosnÄ…ca", meaning: "NaprawdÄ™ pytam â€” nie jestem pewien", ex: "You've met her, haven't you? â†—" },
      ]
    }
  },
  {
    id: "linking", group: "zdania", title: "Linking Words", color: "#34D399", icon: "âŸś",
    intro: "SĹ‚owa Ĺ‚Ä…czÄ…ce zdania i myĹ›li. Klucz do pĹ‚ynnego, zaawansowanego angielskiego.",
    data: [
      { group: "DODATEK (i, rĂłwnieĹź, ponadto)", color: "#34D399", items: [
        { word: "and", use: "proste Ĺ‚Ä…czenie", ex: "She works and studies." },
        { word: "also / too / as well", use: "teĹź, rĂłwnieĹź", ex: "I also speak French. / I speak French too." },
        { word: "moreover / furthermore", use: "ponadto, co wiÄ™cej (formalne)", ex: "Moreover, the results were excellent." },
        { word: "in addition (to)", use: "dodatkowo", ex: "In addition to Spanish, she speaks Italian." },
        { word: "not only... but also", use: "nie tylko... ale takĹźe", ex: "Not only is she smart, but she's also kind." },
      ]},
      { group: "KONTRAST (ale, jednak, chociaĹź)", color: "#F472B6", items: [
        { word: "but", use: "ale (proste)", ex: "I wanted to go, but I was tired." },
        { word: "however", use: "jednak (nowe zdanie)", ex: "It was expensive. However, I bought it." },
        { word: "although / even though", use: "chociaĹź (w zdaniu)", ex: "Although it was raining, we went out." },
        { word: "despite / in spite of", use: "mimo (+ -ing lub rzeczownik)", ex: "Despite the rain, we went out." },
        { word: "whereas / while", use: "podczas gdy, natomiast", ex: "She likes coffee, whereas I prefer tea." },
        { word: "nevertheless / nonetheless", use: "niemniej jednak (formalne)", ex: "It was risky. Nevertheless, we tried." },
      ]},
      { group: "WYNIK / SKUTEK (wiÄ™c, dlatego)", color: "#F59E0B", items: [
        { word: "so", use: "wiÄ™c, dlatego (potoczne)", ex: "It was late, so I left." },
        { word: "therefore", use: "dlatego teĹź (formalne)", ex: "Therefore, we decided to cancel." },
        { word: "as a result / consequently", use: "w rezultacie, wskutek tego", ex: "As a result, sales increased." },
        { word: "that's why", use: "dlatego wĹ‚aĹ›nie", ex: "That's why I told you." },
      ]},
      { group: "POWĂ“D / PRZYCZYNA (bo, poniewaĹź)", color: "#60A5FA", items: [
        { word: "because", use: "poniewaĹź (w zdaniu)", ex: "I left because I was tired." },
        { word: "since / as", use: "poniewaĹź (bardziej formalne)", ex: "Since it was late, I left." },
        { word: "due to / owing to", use: "z powodu (+ rzeczownik/-ing)", ex: "Due to bad weather, the flight was delayed." },
        { word: "because of", use: "z powodu (+ rzeczownik/-ing)", ex: "Because of the rain, we stayed inside." },
      ]},
      { group: "WARUNEK (jeĹ›li, chyba Ĺźe)", color: "#A78BFA", items: [
        { word: "if", use: "jeĹ›li", ex: "If you study, you'll pass." },
        { word: "unless", use: "chyba Ĺźe, jeĹ›li nie", ex: "Unless you hurry, you'll be late." },
        { word: "provided that / as long as", use: "pod warunkiem Ĺźe", ex: "You can go, as long as you call me." },
        { word: "in case", use: "na wypadek gdyby", ex: "Take an umbrella in case it rains." },
      ]},
    ]
  },
  {
    id: "wish", group: "zdania", title: "Wish / If only", color: "#E879F9", icon: "âœŚ",
    intro: "WyraĹźanie Ĺźalu i niespeĹ‚nionych ĹźyczeĹ„. Wish dziaĹ‚a jak conditionals â€” czas cofa siÄ™ wstecz.",
    data: [
      { type: "Wish + Past Simple", when: "Ĺťyczenie o TERAĹšNIEJSZOĹšCI (nierealne)", ex: "I wish I knew the answer.", pl: "Szkoda, Ĺźe nie znam odpowiedzi.", tip: "NIE 'I wish I know' â€” zawsze Past Simple dla teraĹşniejszoĹ›ci" },
      { type: "Wish + Past Perfect", when: "Ĺťal za PRZESZĹ�OĹšCIÄ„ (za pĂłĹşno)", ex: "I wish I had studied harder.", pl: "Szkoda, Ĺźe nie uczyĹ‚em siÄ™ bardziej.", tip: "Nie moĹźna zmieniÄ‡ â€” ĹźaĹ‚ujesz przeszĹ‚oĹ›ci" },
      { type: "Wish + would", when: "Irytacja / chÄ™Ä‡ zmiany czyjego zachowania", ex: "I wish you would stop talking.", pl: "ĹťyczÄ™ sobie, ĹźebyĹ› przestaĹ‚ mĂłwiÄ‡.", tip: "NIE uĹźywaj wish + would dla siebie samego" },
      { type: "If only", when: "Silniejsze 'wish' â€” emocje", ex: "If only I had more time!", pl: "Gdybym tylko miaĹ‚ wiÄ™cej czasu!", tip: "If only = wish ale z mocniejszym Ĺ‚adunkiem emocjonalnym" },
      { type: "I'd rather", when: "WolaĹ‚bym (Ĺźyczenie o czyjĹ› zachowaniu)", ex: "I'd rather you didn't smoke here.", pl: "WolaĹ‚bym, ĹźebyĹ› tu nie paliĹ‚.", tip: "I'd rather + Past Simple (dla teraĹşniejszoĹ›ci/przyszĹ‚oĹ›ci)" },
      { type: "It's (high) time", when: "Czas juĹź najwyĹźszy Ĺźeby...", ex: "It's high time you got a job.", pl: "NajwyĹźszy czas ĹźebyĹ› znalazĹ‚ pracÄ™.", tip: "It's time + Past Simple â€” ten sam trick co wish" },
    ]
  },

  // â”€â”€â”€ FORMY â”€â”€â”€
  {
    id: "gerund", group: "formy", title: "Gerund vs Inf.", color: "#60A5FA", icon: "Ăˇ",
    intro: "Po jednych czasownikach idzie -ing, po innych 'to'. Nie ma reguĹ‚y â€” jest lista.",
    data: {
      ing: {
        hint: "Wzorzec: emocje, lubienie, koĹ„czenie, unikanie",
        list: [
          { v: "enjoy", ex: "I enjoy swimming." }, { v: "finish", ex: "I finished reading." },
          { v: "avoid", ex: "Avoid making mistakes." }, { v: "mind", ex: "Do you mind waiting?" },
          { v: "miss", ex: "I miss seeing you." }, { v: "keep", ex: "Keep trying." },
          { v: "deny", ex: "He denied stealing it." }, { v: "suggest", ex: "She suggested going out." },
          { v: "risk", ex: "Don't risk losing it." }, { v: "consider", ex: "Consider applying." },
          { v: "give up", ex: "He gave up smoking." }, { v: "can't help", ex: "I can't help laughing." },
        ]
      },
      inf: {
        hint: "Wzorzec: chÄ™ci, plany, decyzje, prĂłby",
        list: [
          { v: "want", ex: "I want to go." }, { v: "need", ex: "I need to sleep." },
          { v: "decide", ex: "She decided to quit." }, { v: "hope", ex: "I hope to see you." },
          { v: "plan", ex: "They plan to travel." }, { v: "promise", ex: "He promised to help." },
          { v: "refuse", ex: "She refused to sign." }, { v: "manage", ex: "I managed to escape." },
          { v: "agree", ex: "We agreed to meet." }, { v: "seem", ex: "He seems to know." },
          { v: "expect", ex: "I expect to hear soon." }, { v: "pretend", ex: "She pretended to sleep." },
        ]
      },
      both: [
        { v: "remember", ing: "I remember meeting her. (pamiÄ™tam to zdarzenie)", inf: "Remember to call me. (nie zapomnij)" },
        { v: "stop", ing: "I stopped smoking. (rzuciĹ‚em palenie)", inf: "I stopped to smoke. (zatrzymaĹ‚em siÄ™ zapaliÄ‡)" },
        { v: "try", ing: "Try adding salt. (eksperymentuj)", inf: "I tried to open it. (staraĹ‚em siÄ™)" },
        { v: "like/love/hate", ing: "I like swimming. (bez rĂłĹźnicy)", inf: "I like to swim. (bez rĂłĹźnicy)" },
      ],
      tip: "Po przyimkach ZAWSZE -ing:\nI'm good at cooking. / She left without saying goodbye."
    }
  },
  {
    id: "articles", group: "formy", title: "Przedimki", color: "#F59E0B", icon: "Aa",
    intro: "Polacy majÄ… z tym najwiÄ™kszy problem â€” w polskim przedimkĂłw nie ma.",
    data: [
      { rule: "A / AN", color: "#F59E0B", when: "Pierwszy raz wspominasz. Jeden z wielu. Nie wiadomo ktĂłry.", items: [
        { ex: "I saw a dog.", n: "JakiĹ› pies â€” pierwszy raz." },
        { ex: "She is a doctor.", n: "Jeden z wielu lekarzy." },
        { ex: "I need a pen.", n: "Jakikolwiek dĹ‚ugopis." },
      ], tip: "A + spĂłĹ‚gĹ‚oska: a car, a book\nAn + samogĹ‚oska: an apple, an hour (h nieme!)" },
      { rule: "THE", color: "#34D399", when: "Oboje wiecie o czym mĂłwisz. Jedyny. Wspomniany wczeĹ›niej.", items: [
        { ex: "I saw a dog. The dog was black.", n: "JuĹź wiemy o ktĂłrym psie." },
        { ex: "The sun, the moon, the Earth.", n: "Jedyne w swoim rodzaju." },
        { ex: "Close the door.", n: "Oboje wiemy ktĂłre drzwi." },
        { ex: "The best, the first, the only.", n: "Przed superlatywami â€” zawsze THE." },
      ], tip: null },
      { rule: "âˆ… (brak)", color: "#A78BFA", when: "Rzeczowniki niepoliczalne i liczba mnoga w sensie ogĂłlnym.", items: [
        { ex: "I love music.", n: "Muzyka w ogĂłle." },
        { ex: "Dogs are loyal.", n: "Psy w ogĂłle." },
        { ex: "I go to school / work / bed.", n: "StaĹ‚e frazy â€” bez the!" },
      ], tip: "go to school (uczÄ™ siÄ™) vs go to THE school (jadÄ™ po kogoĹ›)" },
    ]
  },
  {
    id: "quantifiers", group: "formy", title: "Quantifiers", color: "#34D399", icon: "#",
    intro: "Some/any, much/many, few/little â€” zaleĹźy od policzalnoĹ›ci i typu zdania.",
    data: [
      { group: "SOME / ANY", color: "#34D399", items: [
        { word: "some", use: "zdania twierdzÄ…ce, oferty i proĹ›by", ex: "I have some money. / Would you like some tea?" },
        { word: "any", use: "zdania przeczÄ…ce i pytajÄ…ce", ex: "I don't have any money. / Do you have any questions?" },
        { word: "any (= kaĹźdy)", use: "zdania twierdzÄ…ce w znaczeniu 'jakikolwiek'", ex: "Any doctor will tell you the same.", tip: "Tu any = kaĹźdy, nie 'jakiĹ›'" },
      ]},
      { group: "MUCH / MANY / A LOT OF", color: "#F59E0B", items: [
        { word: "much", use: "niepoliczalne (pytania, przeczenia)", ex: "How much time do you have? / Not much." },
        { word: "many", use: "policzalne (pytania, przeczenia)", ex: "How many people came? / Not many." },
        { word: "a lot of / lots of", use: "policzalne i niepoliczalne (twierdzenia)", ex: "I have a lot of friends. / a lot of time." },
        { word: "plenty of", use: "duĹźo, mnĂłstwo (zawsze pozytywne)", ex: "There's plenty of food." },
      ]},
      { group: "FEW / LITTLE (maĹ‚o â€” negatywne)", color: "#F472B6", items: [
        { word: "few", use: "maĹ‚o (policzalne) â€” prawie nie ma", ex: "Few people know this. (maĹ‚o kto wie)" },
        { word: "little", use: "maĹ‚o (niepoliczalne) â€” prawie nie ma", ex: "I have little money. (prawie nie mam)" },
      ]},
      { group: "A FEW / A LITTLE (trochÄ™ â€” pozytywne)", color: "#60A5FA", items: [
        { word: "a few", use: "kilka, trochÄ™ (policzalne) â€” wystarczy", ex: "I have a few friends. (mam kilku przyjaciĂłĹ‚)" },
        { word: "a little", use: "trochÄ™ (niepoliczalne) â€” wystarczy", ex: "I have a little time. (mam chwilÄ™)" },
      ]},
      { group: "TOO / ENOUGH", color: "#A78BFA", items: [
        { word: "too + adj/adv", use: "za bardzo (negatywne)", ex: "It's too hot to eat." },
        { word: "too much/many", use: "za duĹźo", ex: "There's too much noise. / too many people." },
        { word: "enough + noun", use: "wystarczajÄ…co duĹźo", ex: "I don't have enough money." },
        { word: "adj + enough", use: "wystarczajÄ…co (po przymiotniku)", ex: "She is old enough to vote." },
      ]},
    ]
  },
  {
    id: "prepositions", group: "formy", title: "Przyimki", color: "#A78BFA", icon: "â†’",
    intro: "In/at/on â€” zaleĹźy od kontekstu. Zasada ogĂłlna: im bardziej ogĂłlne, tym 'in'; im bardziej konkretne/punktowe, tym 'at'.",
    data: {
      time: [
        { prep: "IN", use: "miesiÄ…ce, lata, pory roku, dĹ‚ugie okresy", items: ["in January", "in 2024", "in summer", "in the morning / afternoon / evening", "in the 20th century"] },
        { prep: "ON", use: "dni tygodnia, daty, konkretne dni", items: ["on Monday", "on 5th March", "on Christmas Day", "on my birthday", "on weekdays"] },
        { prep: "AT", use: "godziny, konkretne pory, okresy Ĺ›wiÄ…teczne", items: ["at 8pm", "at noon / midnight", "at night", "at the weekend (BrE)", "at Christmas (czas Ĺ›wiÄ…t)"] },
      ],
      place: [
        { prep: "IN", use: "zamkniÄ™ta przestrzeĹ„, miasto, kraj", items: ["in the room", "in London", "in Poland", "in the car", "in bed"] },
        { prep: "ON", use: "powierzchnia, piÄ™tro, transport publiczny", items: ["on the table", "on the floor", "on the 3rd floor", "on the bus/train/plane"] },
        { prep: "AT", use: "konkretne miejsce/punkt, adres", items: ["at the bus stop", "at school / work / home", "at 5 Baker Street", "at the top / bottom"] },
      ],
      common: [
        { phrase: "interested IN", phrase2: "good AT", phrase3: "afraid OF" },
        { phrase: "dependent ON", phrase2: "responsible FOR", phrase3: "different FROM" },
        { phrase: "arrive AT (budynek)", phrase2: "arrive IN (miasto)", phrase3: "listen TO" },
        { phrase: "wait FOR", phrase2: "apply FOR", phrase3: "consist OF" },
      ]
    }
  },
  {
    id: "usedto", group: "formy", title: "Used to / Would", color: "#FB923C", icon: "â†ş",
    intro: "WyraĹźanie przeszĹ‚ych nawykĂłw i stanĂłw ktĂłre juĹź nie istniejÄ….",
    data: [
      { form: "used to + infinitive", when: "Dawny nawyk LUB stan ktĂłry juĹź nie istnieje (trwaĹ‚y)", ex: "I used to smoke. (ale rzuciĹ‚em)\nShe used to be shy. (stan â€” byĹ‚, ale juĹź nie jest)", tip: "MoĹźesz uĹźywaÄ‡ dla nawykĂłw I STANĂ“W. Pytanie: Did you use to...? (nie 'used to'?')" },
      { form: "would + infinitive", when: "PowtarzajÄ…ce siÄ™ czynnoĹ›ci w przeszĹ‚oĹ›ci (NIE stany)", ex: "Every Sunday we would go to the park.\nHe would always bring flowers.", tip: "NIE uĹźywaj 'would' dla stanĂłw: She would be shy âœ— â†’ She used to be shy âœ“" },
      { form: "be used to + -ing", when: "ByÄ‡ przyzwyczajonym do czegoĹ› (TERAZ)", ex: "I'm used to waking up early. (jestem przyzwyczajony)\nShe isn't used to the cold.", tip: "Be used to = jestem przyzwyczajony. MoĹźe byÄ‡ w kaĹźdym czasie: I was used to it." },
      { form: "get used to + -ing", when: "PrzyzwyczajaÄ‡ siÄ™ do czegoĹ› (PROCES)", ex: "I'm getting used to the new job.\nYou'll get used to it.", tip: "Get used to = przyzwyczajam siÄ™ (trwa). Be used to = juĹź jestem przyzwyczajony." },
    ]
  },
  {
    id: "comparatives", group: "formy", title: "Comparatives", color: "#E879F9", icon: "â‰ˇ",
    intro: "Stopniowanie przymiotnikĂłw. Dwa wzorce: krĂłtkie sĹ‚owa (-er/-est), dĹ‚ugie sĹ‚owa (more/most).",
    data: {
      rules: [
        { type: "KrĂłtkie (1 sylaba)", comp: "-er", super: "-est", items: ["tall â†’ taller â†’ the tallest", "fast â†’ faster â†’ the fastest", "big â†’ bigger â†’ the biggest (podwĂłjna spĂłĹ‚gĹ‚oska)"] },
        { type: "KoĹ„czy siÄ™ na -y", comp: "-ier", super: "-iest", items: ["happy â†’ happier â†’ the happiest", "easy â†’ easier â†’ the easiest", "heavy â†’ heavier â†’ the heaviest"] },
        { type: "DĹ‚ugie (2+ sylaby)", comp: "more + adj", super: "most + adj", items: ["beautiful â†’ more beautiful â†’ the most beautiful", "expensive â†’ more expensive â†’ the most expensive", "interesting â†’ more interesting â†’ the most interesting"] },
        { type: "Nieregularne", comp: "â€”", super: "â€”", items: ["good â†’ better â†’ the best", "bad â†’ worse â†’ the worst", "far â†’ farther/further â†’ the farthest/furthest", "little â†’ less â†’ the least", "many/much â†’ more â†’ the most"] },
      ],
      structures: [
        { name: "PorĂłwnanie rĂłwne", formula: "as + adj + as", ex: "She is as tall as her brother." },
        { name: "PorĂłwnanie nierĂłwne", formula: "not as + adj + as", ex: "This film is not as good as the book." },
        { name: "Wzmocnienie", formula: "much / far / a lot + comparative", ex: "He is much taller. / It's far more expensive." },
        { name: "PodwĂłjny komparatyw", formula: "the + comp, the + comp", ex: "The more you practice, the better you get." },
        { name: "Coraz + comp", formula: "comparative and comparative", ex: "It's getting colder and colder." },
      ]
    }
  },
];

// â”€â”€â”€ COMPONENTS â”€â”€â”€

const colors = { czasy: "#2DD4BF", struktury: "#F59E0B", zdania: "#F472B6", formy: "#A78BFA" };
const BG = "#0a0a0f", CARD = "#0f0f18", CARD2 = "#141420", BORDER = "#1e1e2e";

const s = {
  mono: (color = "#ccc", size = 13) => ({ fontFamily: "monospace", color, fontSize: size }),
  label: (color) => ({ fontSize: 10, letterSpacing: "0.2em", color: color + "88", fontFamily: "monospace", marginBottom: 10 }),
  note: (color) => ({ fontSize: 12, color: "#666", borderLeft: `2px solid ${color}44`, paddingLeft: 10, fontStyle: "italic", lineHeight: 1.6, marginTop: 8, whiteSpace: "pre-line" }),
  exBox: { background: "#0a0a14", borderRadius: 7, padding: "9px 12px", fontFamily: "monospace", fontSize: 13 },
};

function Intro({ text, color }) {
  return <div style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.6, background: "#0f0f1a", padding: "10px 12px", borderRadius: 8, borderLeft: `3px solid ${color}`, fontStyle: "italic" }}>{text}</div>;
}

function Card({ id, open, setOpen, header, color, children }) {
  const isOpen = open === id;
  return (
    <div onClick={() => setOpen(isOpen ? null : id)} style={{ background: isOpen ? CARD2 : CARD, border: `1px solid ${isOpen ? color + "55" : BORDER}`, borderRadius: 9, padding: "11px 14px", marginBottom: 6, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {header}
        <span style={{ color, opacity: 0.5, fontSize: 18, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 8 }}>+</span>
      </div>
      {isOpen && <div style={{ marginTop: 11, borderTop: `1px solid ${BORDER}`, paddingTop: 11 }}>{children}</div>}
    </div>
  );
}

// â”€â”€â”€ TOPIC RENDERERS â”€â”€â”€

function TensesTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((group) => (
        <div key={group.group} style={{ marginBottom: 20 }}>
          <div style={s.label(group.color)}>{group.group}</div>
          {group.items.map((t, i) => (
            <Card key={i} id={`t-${group.group}-${i}`} open={open} setOpen={setOpen} color={group.color}
              header={<div><div style={{ fontSize: 14, fontWeight: "bold", color: "#ccc", marginBottom: 3 }}>{t.name}</div><code style={{ ...s.mono("#555", 11), background: "#0a0a14", padding: "2px 7px", borderRadius: 4 }}>{t.formula}</code></div>}>
              <div style={{ fontSize: 13, color: "#aaa", marginBottom: 8 }}><span style={{ color: group.color }}>Kiedy? </span>{t.when}</div>
              <div style={s.exBox}><div style={{ color: "#7ec8a0", marginBottom: 4 }}>âœ“ {t.ex}</div><div style={{ color: "#e87070" }}>âœ— {t.neg}</div></div>
              {t.tip && <div style={s.note(group.color)}>đŸ’Ą {t.tip}</div>}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function ModalsTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 18 }}>
          <div style={s.label(topic.color)}>{group.group}</div>
          {group.items.map((item, ii) => (
            <Card key={ii} id={`m-${gi}-${ii}`} open={open} setOpen={setOpen} color={topic.color}
              header={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ ...s.mono(topic.color, 14), fontWeight: "bold" }}>{item.word}</span><span style={{ fontSize: 12, color: "#666" }}>â€” {item.meaning}</span></div>}>
              <div style={{ ...s.mono("#7ec8a0"), marginBottom: item.tip ? 8 : 0 }}>âœ“ {item.ex}</div>
              {item.tip && <div style={s.note(topic.color)}>đŸ’Ą {item.tip}</div>}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function ConditionalsTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((item, i) => (
        <Card key={i} id={`c-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div><div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ background: topic.color, color: "#000", fontSize: 10, fontWeight: "bold", padding: "2px 7px", borderRadius: 20, fontFamily: "monospace" }}>TYPE {item.type}</span><span style={{ fontSize: 14, fontWeight: "bold", color: "#ccc" }}>{item.name}</span></div><code style={{ ...s.mono("#555", 11), background: "#0a0a14", padding: "2px 7px", borderRadius: 4 }}>{item.formula}</code></div>}>
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 10 }}><span style={{ color: topic.color }}>Kiedy? </span>{item.when}</div>
          <div style={s.exBox}><div style={{ color: "#7ec8a0", marginBottom: 4 }}>EN: {item.ex}</div><div style={{ color: "#888" }}>PL: {item.pl}</div></div>
          {item.tip && <div style={s.note(topic.color)}>đŸ’Ą {item.tip}</div>}
        </Card>
      ))}
    </div>
  );
}

function PassiveTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((row, i) => (
        <Card key={i} id={`p-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 13, fontWeight: "bold", color: "#ccc" }}>{row.tense}</span><code style={{ ...s.mono("#555", 11), background: "#0a0a14", padding: "2px 6px", borderRadius: 4 }}>{row.formula}</code></div>}>
          <div style={s.exBox}><div style={{ color: "#888", marginBottom: 4 }}>ACTIVE: {row.active}</div><div style={{ color: "#7ec8a0" }}>PASSIVE: {row.passive}</div></div>
        </Card>
      ))}
      <div style={{ marginTop: 12, background: "#0f0f1a", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${topic.color}` }}>
        <div style={s.label(topic.color)}>KIEDY UĹťYWAÄ†?</div>
        {[["Nie wiadomo kto zrobiĹ‚","My car was stolen."],["NiewaĹźne kto zrobiĹ‚","The email was sent."],["Styl formalny","Mistakes were made."],["'By' gdy waĹźne kto","It was written by Tolkien."]].map(([w,e]) => (
          <div key={w} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 12 }}><span style={{ color: topic.color, opacity: 0.6 }}>â†’</span><div><span style={{ color: "#888" }}>{w}: </span><span style={{ ...s.mono("#ccc", 12) }}>{e}</span></div></div>
        ))}
      </div>
    </div>
  );
}

function ReportedTopic({ topic, open, setOpen }) {
  const c = topic.data;
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      <div style={s.label(topic.color)}>COFANIE CZASĂ“W</div>
      {c.shifts.map((row, i) => (
        <Card key={i} id={`rs-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={s.mono("#888")}>{row.from} â†’</span><span style={s.mono(topic.color)}>{row.to}</span></div>}>
          <div style={s.exBox}><div style={{ color: "#888", marginBottom: 4 }}>DIRECT: {row.ex1}</div><div style={{ color: "#7ec8a0" }}>REPORTED: {row.ex2}</div></div>
        </Card>
      ))}
      <div style={{ ...s.label(topic.color), marginTop: 16 }}>INNE ZMIANY</div>
      {c.other.map((item, i) => (
        <Card key={`ro-${i}`} id={`ro-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<span style={{ fontSize: 14, fontWeight: "bold", color: "#ccc" }}>{item.label}</span>}>
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 8 }}>{item.rule}</div>
          <div style={{ ...s.mono("#7ec8a0") }}>{item.ex}</div>
        </Card>
      ))}
      <div style={s.note(topic.color)}>đŸ’Ą {c.tip}</div>
    </div>
  );
}

function RelativeTopic({ topic, open, setOpen }) {
  const c = topic.data;
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      <div style={s.label(topic.color)}>ZAIMKI WZGLÄ˜DNE</div>
      {c.pronouns.map((p, i) => (
        <Card key={i} id={`rl-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ ...s.mono(topic.color, 15), fontWeight: "bold" }}>{p.word}</span><span style={{ fontSize: 12, color: "#666" }}>â€” {p.use}</span></div>}>
          <div style={{ ...s.mono("#7ec8a0"), marginBottom: p.tip ? 8 : 0 }}>âœ“ {p.ex}</div>
          {p.tip && <div style={s.note(topic.color)}>đŸ’Ą {p.tip}</div>}
        </Card>
      ))}
      <div style={{ ...s.label(topic.color), marginTop: 16 }}>DEFINIUJÄ„CE vs NIEDEFINIUJÄ„CE</div>
      {c.types.map((t, i) => (
        <Card key={`rt-${i}`} id={`rt-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<span style={{ fontSize: 13, fontWeight: "bold", color: "#ccc" }}>{t.name}</span>}>
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 8, lineHeight: 1.5 }}>{t.desc}</div>
          <div style={{ ...s.mono("#7ec8a0") }}>{t.ex}</div>
          <div style={s.note(topic.color)}>đŸ’Ą {t.tip}</div>
        </Card>
      ))}
      <div style={s.note(topic.color)}>đŸ’Ą {c.tip}</div>
    </div>
  );
}

function QuestionsTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.types.map((type, ti) => (
        <div key={ti} style={{ marginBottom: 18 }}>
          <div style={s.label(topic.color)}>{type.name}</div>
          <div style={{ background: "#0f0f1a", borderRadius: 7, padding: "6px 10px", marginBottom: 8, fontSize: 12 }}>
            <span style={{ color: topic.color }}>Schemat: </span><span style={s.mono("#888", 12)}>{type.formula}</span>
          </div>
          {type.items.map((item, ii) => (
            <div key={ii} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 13px", marginBottom: 5 }}>
              <div style={s.mono("#7ec8a0")}>{item.ex}</div>
              {item.note && <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>{item.note}</div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TagsTopic({ topic, open, setOpen }) {
  const c = topic.data;
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "10px 12px", marginBottom: 14, borderLeft: `3px solid ${topic.color}`, fontSize: 13, color: "#aaa" }}>
        <span style={{ color: topic.color }}>Zasada: </span>{c.rule}
      </div>
      <div style={s.label(topic.color)}>PODSTAWOWE</div>
      {c.basic.map((row, i) => (
        <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 13px", marginBottom: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={s.mono("#888")}>{row.s} <span style={{ color: topic.color }}>{row.t}</span></span>
          <span style={{ fontSize: 11, color: "#444" }}>{row.n}</span>
        </div>
      ))}
      <div style={{ ...s.label(topic.color), marginTop: 14 }}>WYJÄ„TKI</div>
      {c.exceptions.map((row, i) => (
        <Card key={`ti-${i}`} id={`ti-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<span style={s.mono("#ccc")}>{row.s} <span style={{ color: topic.color }}>{row.t}</span></span>}>
          <div style={{ fontSize: 13, color: "#aaa" }}>{row.n}</div>
        </Card>
      ))}
      <div style={{ ...s.label(topic.color), marginTop: 14 }}>INTONACJA</div>
      {c.intonation.map((row, i) => (
        <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "11px 13px", marginBottom: 6 }}>
          <div style={{ fontSize: 13, color: topic.color, fontWeight: "bold", marginBottom: 3 }}>{row.arrow}</div>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 5 }}>{row.meaning}</div>
          <div style={s.mono("#7ec8a0")}>{row.ex}</div>
        </div>
      ))}
    </div>
  );
}

function LinkingTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 20 }}>
          <div style={s.label(group.color)}>{group.group}</div>
          {group.items.map((item, ii) => (
            <Card key={ii} id={`lw-${gi}-${ii}`} open={open} setOpen={setOpen} color={group.color}
              header={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ ...s.mono(group.color, 13), fontWeight: "bold" }}>{item.word}</span><span style={{ fontSize: 11, color: "#555" }}>â€” {item.use}</span></div>}>
              <div style={s.mono("#7ec8a0")}>{item.ex}</div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function WishTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((item, i) => (
        <Card key={i} id={`w-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div><div style={{ fontSize: 13, fontWeight: "bold", color: topic.color, marginBottom: 3 }}>{item.type}</div><div style={{ fontSize: 12, color: "#666" }}>{item.when}</div></div>}>
          <div style={s.exBox}>
            {item.ex.split("\n").map((line, li) => <div key={li} style={{ color: "#7ec8a0", marginBottom: li < item.ex.split("\n").length - 1 ? 3 : 0 }}>{line}</div>)}
          </div>
          {item.tip && <div style={s.note(topic.color)}>đŸ’Ą {item.tip}</div>}
        </Card>
      ))}
    </div>
  );
}

function GerundTopic({ topic, open, setOpen }) {
  const c = topic.data;
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {[{ d: c.ing, id: "gi", suffix: "-ING", color: "#60A5FA" }, { d: c.inf, id: "gf", suffix: "TO", color: "#34D399" }].map(({ d, id, suffix, color }) => (
        <div key={id} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: "bold", color, background: color + "18", padding: "2px 8px", borderRadius: 4 }}>{suffix}</span>
            <span style={{ fontSize: 11, color: "#555" }}>{d.hint}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
            {d.list.map((item, i) => (
              <Card key={i} id={`${id}-${i}`} open={open} setOpen={setOpen} color={color}
                header={<span style={s.mono(color)}>{item.v}</span>}>
                <span style={s.mono("#7ec8a0")}>{item.ex}</span>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <div style={{ ...s.label(topic.color), marginTop: 4 }}>OBA MOĹťLIWE â€” ZMIENIA ZNACZENIE</div>
      {c.both.map((item, i) => (
        <Card key={`gb-${i}`} id={`gb-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<span style={{ ...s.mono(topic.color, 14), fontWeight: "bold" }}>{item.v}</span>}>
          <div style={s.exBox}><div style={{ color: "#60A5FA", marginBottom: 4 }}>{item.ing}</div><div style={{ color: "#34D399" }}>{item.inf}</div></div>
        </Card>
      ))}
      <div style={s.note(topic.color)}>đŸ’Ą {c.tip}</div>
    </div>
  );
}

function ArticlesTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((block, bi) => (
        <Card key={bi} id={`a-${bi}`} open={open} setOpen={setOpen} color={block.color}
          header={<div><div style={{ fontFamily: "monospace", fontSize: 17, fontWeight: "bold", color: block.color, marginBottom: 3 }}>{block.rule}</div><div style={{ fontSize: 12, color: "#666" }}>{block.when}</div></div>}>
          {block.items.map((item, ii) => (
            <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <span style={{ color: "#7ec8a0", fontFamily: "monospace" }}>âœ“</span>
              <div><span style={s.mono("#ccc")}>{item.ex}</span><span style={{ fontSize: 11, color: "#555", marginLeft: 8 }}>â€” {item.n}</span></div>
            </div>
          ))}
          {block.tip && <div style={s.note(block.color)}>đŸ’Ą {block.tip}</div>}
        </Card>
      ))}
    </div>
  );
}

function QuantifiersTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 18 }}>
          <div style={s.label(group.color)}>{group.group}</div>
          {group.items.map((item, ii) => (
            <Card key={ii} id={`q-${gi}-${ii}`} open={open} setOpen={setOpen} color={group.color}
              header={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ ...s.mono(group.color, 13), fontWeight: "bold" }}>{item.word}</span><span style={{ fontSize: 11, color: "#555" }}>â€” {item.use}</span></div>}>
              <div style={s.mono("#7ec8a0")}>{item.ex}</div>
              {item.tip && <div style={s.note(group.color)}>đŸ’Ą {item.tip}</div>}
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function PrepositionsTopic({ topic, open, setOpen }) {
  const c = topic.data;
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {[{ label: "CZAS", data: c.time }, { label: "MIEJSCE", data: c.place }].map(({ label, data }) => (
        <div key={label} style={{ marginBottom: 20 }}>
          <div style={s.label(topic.color)}>{label}</div>
          {data.map((row, i) => (
            <Card key={i} id={`prep-${label}-${i}`} open={open} setOpen={setOpen} color={topic.color}
              header={<div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ fontFamily: "monospace", fontSize: 16, fontWeight: "bold", color: topic.color }}>{row.prep}</span><span style={{ fontSize: 12, color: "#666" }}>{row.use}</span></div>}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {row.items.map(item => <span key={item} style={{ ...s.mono("#7ec8a0", 12), background: "#0a0a14", padding: "3px 8px", borderRadius: 5 }}>{item}</span>)}
              </div>
            </Card>
          ))}
        </div>
      ))}
      <div style={s.label(topic.color)}>CZÄ˜STE ZWROTY Z PRZYIMKAMI</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5 }}>
        {c.common.flatMap(r => [r.phrase, r.phrase2, r.phrase3]).filter(Boolean).map((ph, i) => {
          const [verb, prep] = ph.split(" ");
          return <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 7, padding: "8px 10px", fontSize: 12, fontFamily: "monospace" }}><span style={{ color: "#ccc" }}>{verb} </span><span style={{ color: topic.color }}>{prep}</span></div>;
        })}
      </div>
    </div>
  );
}

function UsedToTopic({ topic, open, setOpen }) {
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      {topic.data.map((item, i) => (
        <Card key={i} id={`u-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div><div style={{ ...s.mono(topic.color, 13), fontWeight: "bold", marginBottom: 3 }}>{item.form}</div><div style={{ fontSize: 12, color: "#666" }}>{item.when}</div></div>}>
          <div style={s.exBox}>
            {item.ex.split("\n").map((line, li) => <div key={li} style={{ color: "#7ec8a0", marginBottom: li < item.ex.split("\n").length - 1 ? 4 : 0 }}>{line}</div>)}
          </div>
          <div style={s.note(topic.color)}>đŸ’Ą {item.tip}</div>
        </Card>
      ))}
    </div>
  );
}

function ComparativesTopic({ topic, open, setOpen }) {
  const c = topic.data;
  return (
    <div>
      <Intro text={topic.intro} color={topic.color} />
      <div style={s.label(topic.color)}>TWORZENIE FORM</div>
      {c.rules.map((row, i) => (
        <Card key={i} id={`comp-${i}`} open={open} setOpen={setOpen} color={topic.color}
          header={<div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 13, fontWeight: "bold", color: "#ccc" }}>{row.type}</span></div>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {row.items.map(item => <div key={item} style={{ ...s.mono("#7ec8a0"), background: "#0a0a14", padding: "5px 10px", borderRadius: 6 }}>{item}</div>)}
          </div>
        </Card>
      ))}
      <div style={{ ...s.label(topic.color), marginTop: 16 }}>STRUKTURY Z KOMPARATYWAMI</div>
      {c.structures.map((row, i) => (
        <div key={i} style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "10px 13px", marginBottom: 6 }}>
          <div style={{ fontSize: 12, color: topic.color, marginBottom: 4, fontWeight: "bold" }}>{row.name}</div>
          <div style={{ ...s.mono("#888", 12), marginBottom: 5 }}>{row.formula}</div>
          <div style={s.mono("#7ec8a0")}>{row.ex}</div>
        </div>
      ))}
    </div>
  );
}

const RENDERERS = {
  tenses: TensesTopic, modals: ModalsTopic, conditionals: ConditionalsTopic,
  passive: PassiveTopic, reported: ReportedTopic, relative: RelativeTopic,
  questions: QuestionsTopic, tags: TagsTopic, linking: LinkingTopic, wish: WishTopic,
  gerund: GerundTopic, articles: ArticlesTopic, quantifiers: QuantifiersTopic,
  prepositions: PrepositionsTopic, usedto: UsedToTopic, comparatives: ComparativesTopic,
};

// â”€â”€â”€ APP â”€â”€â”€

export default function App() {
  const [activeGroup, setActiveGroup] = useState("czasy");
  const [activeTopic, setActiveTopic] = useState("tenses");
  const [open, setOpen] = useState(null);

  const groupTopics = TOPICS.filter(t => t.group === activeGroup);
  const topic = TOPICS.find(t => t.id === activeTopic);
  const Renderer = RENDERERS[activeTopic];

  const switchGroup = (gid) => {
    setActiveGroup(gid);
    const first = TOPICS.find(t => t.group === gid);
    if (first) { setActiveTopic(first.id); setOpen(null); }
  };

  const switchTopic = (tid) => { setActiveTopic(tid); setOpen(null); };

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Georgia', serif", padding: "20px 16px 60px", color: "#e8e8f0" }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#444", fontFamily: "monospace", marginBottom: 6 }}>KOMPLETNY KURS GRAMATYKI</div>
          <h1 style={{ fontSize: 24, fontWeight: "normal", margin: 0, color: "#fff", letterSpacing: "-0.5px" }}>English Grammar Master</h1>
          <div style={{ fontSize: 11, color: "#444", marginTop: 6, fontFamily: "monospace" }}>16 tematĂłw Âˇ kliknij aby rozwinÄ…Ä‡</div>
        </div>

        {/* Group nav */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 14 }}>
          {GROUPS.map(g => (
            <button key={g.id} onClick={() => switchGroup(g.id)} style={{ background: activeGroup === g.id ? g.color + "18" : "#0f0f18", border: `1px solid ${activeGroup === g.id ? g.color + "66" : BORDER}`, borderRadius: 8, padding: "9px 4px", cursor: "pointer", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: activeGroup === g.id ? g.color : "#555", fontFamily: "monospace", letterSpacing: "0.1em" }}>{g.label}</div>
            </button>
          ))}
        </div>

        {/* Topic pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {groupTopics.map(t => (
            <button key={t.id} onClick={() => switchTopic(t.id)} style={{ background: activeTopic === t.id ? t.color + "22" : "#0f0f18", border: `1px solid ${activeTopic === t.id ? t.color + "77" : BORDER}`, borderRadius: 20, padding: "6px 13px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 12 }}>{t.icon}</span>
              <span style={{ fontSize: 11, color: activeTopic === t.id ? t.color : "#777", fontFamily: "monospace" }}>{t.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: "normal", margin: 0, color: topic.color }}>{topic.title}</h2>
            <span style={{ fontSize: 12, color: "#555" }}>{topic.subtitle}</span>
          </div>
          {Renderer && <Renderer topic={topic} open={open} setOpen={setOpen} />}
        </div>

      </div>
    </div>
  );
}