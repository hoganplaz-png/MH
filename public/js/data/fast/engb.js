/* ⏱ 10-minute fast notes · English B HL (format: see js/fastnotes.js).
   Cantonese explanations + the exact English phrases you should write. */
(function () {
  "use strict";
  const CRIT = ["table", ["Paper 1 criterion", "Marks", "考官睇咩"], [
    ["A: Language", "12", "vocabulary range + complex structures + accuracy（錯唔阻意思）"],
    ["B: Message", "12", "ideas relevant, developed（有例子）, organised（段落 + cohesive devices）"],
    ["C: Conceptual understanding", "6", "text type conventions + register + tone 啱 audience / context / purpose"],
  ]];

  IB.addFast({
    "engb-1": {
      title: "Identities · Vocab · Model phrases · Paper 1 angles",
      intro: "Theme 1：lifestyles, health and well-being, beliefs and values, subcultures, language and identity。",
      parts: [
        {
          h: "Theme map 主題範圍", min: 2,
          blocks: [
            ["key", "Identities = <b>我係邊個 + 點樣表達自己</b>。Paper 1 題目通常：social media 同 self-image、mental health、heritage language、subcultures、sleep / diet / burnout。"],
            ["table", ["Recommended topic", "常見題目角度", "Must-use vocab"], [
              ["Lifestyles", "screen time, sleep, fast food", "sedentary, balanced lifestyle, work-life balance"],
              ["Health and well-being", "exam stress, mental health", "well-being, burnout, anxiety, to seek help"],
              ["Beliefs and values", "what matters to teens", "integrity, values, to stand up for"],
              ["Subcultures", "gamers, skaters, K-pop fandom", "subculture, sense of belonging, to fit in / stand out"],
              ["Language and identity", "bilingual, accent, mother tongue", "heritage language, mother tongue, assimilation"],
            ]],
            ["rhyme", "口訣 1", "身心信圈話（Lifestyle 身、Health 心、Beliefs 信、Subculture 圈、Language 話）", "五個 recommended topics，一句記晒。"],
          ],
        },
        {
          h: "Vocab bank 高分字", min: 2,
          blocks: [
            ["table", ["普通講法 ❌", "升級 ✅", "例句"], [
              ["feel bad about yourself", "erode one's self-esteem", "Filtered images can quietly <b>erode teenagers' self-esteem</b>."],
              ["copy others", "succumb to peer pressure", "Many students <b>succumb to peer pressure</b> to look perfect."],
              ["be yourself", "stay true to oneself / authenticity", "Online, <b>authenticity</b> is rarer than it should be."],
              ["very tired", "burnt out / exhausted", "Without rest, high achievers risk <b>burnout</b>."],
              ["lose your language", "lose touch with one's roots", "Abandoning Cantonese meant <b>losing touch with my roots</b>."],
            ]],
            ["rhyme", "口訣 2", "一個字換三個字，分數即刻升", "Criterion A 睇 range：唔好成篇 good / bad / very。"],
          ],
        },
        {
          h: "Model phrases + plan 模板", min: 2.5,
          blocks: [
            ["eg", "Blog（for teenagers）：the pressure to look perfect online。點起頭？", [
              "Title：<b>“Behind the Filter: Why Your Feed Isn't Real Life”</b> + date + by-line",
              "Hook（anecdote）：“Last month I deleted 300 photos. Here's why.”",
              "Body：cause（comparison culture）→ effect（self-esteem, sleep）→ tips（numbered list）",
              "Ending：“What's your experience? Let me know in the comments below!” → Criterion C 即刻見到 blog conventions",
            ]],
            ["note", "萬用句：<b>“It is no exaggeration to say that…”</b> · <b>“Far from being harmless, …”</b> · <b>“What many fail to realise is that…”</b> · <b>“Rather than…, we should…”</b>"],
            ["trap", [
              "寫「identity in general」離題 → Criterion B 冇得高分；要答<b>題目指定</b>嘅 audience 同 purpose。",
              "Blog 寫到好似 essay（冇 title、冇 direct address）→ Criterion C 扣分。",
              "Mental health 題唔好亂作 statistics；寫 “a recent survey suggested…” 都要合理。",
            ]],
          ],
        },
      ],
      summary: ["身心信圈話：五個 topics", "一個字換三個字", "Personal angle（anecdote）+ broader angle（fact / expert）", "Blog：title、date、you、comment invitation", "答題目指定 audience，唔好寫 general essay"],
      practice: [
        { q: "Give two Theme 1 recommended topics.", m: 2, a: "Any two of: <b>lifestyles; health and well-being; beliefs and values; subcultures; language and identity</b>." },
        { q: "Upgrade: “Social media makes teens feel bad.”", m: 2, a: "e.g. “<b>Constant comparison with filtered images can erode teenagers' self-esteem.</b>” [1 precise vocab, 1 accurate complex structure]" },
        { q: "Give three blog conventions you should show in the first and last lines.", m: 3, a: "Title/catchy heading; date/by-line; direct address/informal engaging voice; invitation to comment（any 3）." },
        { q: "What does “to fit in” mean? Use it in a sentence.", m: 2, a: "To be accepted as part of a group; e.g. “<b>I changed my accent to fit in.</b>”" },
      ],
    },

    "engb-2": {
      title: "Experiences · Narrative & reflective writing",
      intro: "Theme 2：leisure activities, holidays and travel, life stories, rites of passage, customs and traditions, migration。",
      parts: [
        {
          h: "Theme map", min: 2,
          blocks: [
            ["table", ["Topic", "常見題目", "Vocab"], [
              ["Leisure activities", "hobbies vs screens", "pastime, to unwind, extracurricular"],
              ["Holidays and travel", "gap year, overtourism, volunteering abroad", "broaden one's horizons, eye-opening, overtourism"],
              ["Life stories", "a person who inspired you", "turning point, to overcome adversity"],
              ["Rites of passage", "graduation, 18th birthday", "milestone, coming of age"],
              ["Customs and traditions", "festivals, dying traditions", "passed down, heritage, to preserve"],
              ["Migration", "moving abroad, refugees", "culture shock, homesick, to settle in, integrate"],
            ]],
            ["rhyme", "口訣 1", "玩遊人生禮俗移", "Leisure 玩、travel 遊、life stories 人生、rites 禮、customs 俗、migration 移。"],
          ],
        },
        {
          h: "Describe → Feel → Reflect", min: 2.5,
          blocks: [
            ["key", "Experiences 題最多 <b>diary / blog / personal letter / travel article</b>。高分一定要有 <b>reflection</b>：唔止講發生咩事，要講你學到咩、點改變咗你。"],
            ["rhyme", "口訣 2", "見、感、悟", "見（sensory detail）→ 感（emotions）→ 悟（what I learned）。淨係講故 = Criterion B 中段。"],
            ["table", ["Stage", "Model phrase"], [
              ["Describe", "“The scent of incense hung in the air as drums echoed through the narrow streets.”"],
              ["Feel", "“I was overwhelmed — part of me wanted to run, part of me wanted to stay forever.”"],
              ["Reflect", "“Looking back, I realise that…” · “It was then that I understood…” · “The experience taught me that…”"],
            ]],
            ["eg", "Diary：first week in a new country。點樣 show 時態？", [
              "Past simple 講事：“On Monday I <b>got</b> lost on the metro.”",
              "Past perfect 講背景：“I <b>had</b> never <b>felt</b> so alone.”",
              "Present 講反思：“Now I <b>realise</b> that asking for help is not a weakness.”",
            ]],
          ],
        },
        {
          h: "失分位 + useful structures", min: 1.5,
          blocks: [
            ["trap", [
              "Diary 開頭要 date（+ “Dear diary” optional），結尾唔使 “Yours sincerely”。",
              "Travel blog 唔好變旅遊 brochure：要 first person、個人感受。",
              "時態亂跳（past ↔ present）係 Criterion A 最常見錯。",
            ]],
            ["note", "Complex structures：<b>“Had I known how cold it would be, I would have packed…”</b> · <b>“Not until I left home did I appreciate…”</b> · <b>“What struck me most was…”</b>"],
          ],
        },
      ],
      summary: ["玩遊人生禮俗移", "見、感、悟：一定要 reflect", "Past simple 講事，past perfect 講背景，present 講反思", "Diary 有 date，blog 有 title + comments", "Inversion：Not until… did I…"],
      practice: [
        { q: "What is a “rite of passage”? Give one example.", m: 2, a: "A ceremony/event marking an important stage of life; e.g. <b>graduation / coming-of-age ceremony</b>." },
        { q: "Rewrite with inversion: “I only appreciated my family when I left home.”", m: 2, a: "“<b>Only when I left home did I appreciate my family.</b>” / “Not until I left home did I appreciate…”" },
        { q: "Name three features a diary entry should show.", m: 3, a: "Date (+ optional Dear diary); first person/personal informal register; emotions + reflection（also past tenses with reflective present）." },
        { q: "Why do purely narrative answers rarely reach the top band for Criterion B?", m: 2, a: "Ideas are not <b>developed</b> — no reflection / significance / insight, so the message is less purposeful." },
      ],
    },

    "engb-3": {
      title: "Human ingenuity · Tech, media & the arts",
      intro: "Theme 3：entertainment, artistic expressions, communication and media, technology, scientific innovation。",
      parts: [
        {
          h: "Theme map + vocab", min: 2.5,
          blocks: [
            ["table", ["Topic", "Hot issue", "Vocab"], [
              ["Entertainment", "streaming, gaming", "binge-watch, immersive, addictive"],
              ["Artistic expressions", "street art, should schools fund arts", "to convey, thought-provoking, self-expression"],
              ["Communication and media", "fake news, influencers", "misinformation, echo chamber, clickbait, media literacy"],
              ["Technology", "AI, phones in class, privacy", "algorithm, data privacy, automation, double-edged sword"],
              ["Scientific innovation", "medicine, space, gene editing", "breakthrough, cutting-edge, ethical dilemma"],
            ]],
            ["rhyme", "口訣 1", "玩藝傳科技", "Entertainment 玩、Arts 藝、Communication/media 傳、Scientific innovation 科、Technology 技。"],
          ],
        },
        {
          h: "Balanced argument 模板", min: 2.5,
          blocks: [
            ["key", "Tech 題十居其九係<b>爭議題</b>（AI homework ban、phones at school）。要 <b>clear stance + counter-argument + rebuttal</b>。"],
            ["rhyme", "口訣 2", "立、證、讓、反、呼", "立場 → 證據 → 讓步（admittedly）→ 反駁（however）→ 呼籲（call to action）。"],
            ["table", ["Move", "Model phrase"], [
              ["Stance", "“I firmly believe that a total ban would do more harm than good.”"],
              ["Concede", "“Admittedly, AI tools can be misused to cheat.”"],
              ["Rebut", "“However, banning them outright ignores…” / “This argument overlooks the fact that…”"],
              ["Evaluate", "“On balance, the benefits clearly outweigh the risks, provided that…”"],
              ["Call to action", "“It is time for our school to embrace, not fear, innovation.”"],
            ]],
          ],
        },
        {
          h: "Review & 失分位", min: 2,
          blocks: [
            ["note", "Review conventions：title / headline · details of the work（title, director, platform）· brief summary <b>no spoilers</b> · evaluation（strengths/weaknesses）· rating / recommendation（“Four stars — a must-watch for…”）"],
            ["trap", [
              "用太多 technical jargon 而用錯 → Criterion A 扣分；用你識用嘅字。",
              "Review 寫成 plot summary → Criterion B/C 低；要 evaluate。",
              "Opinion column 冇 counter-argument → 論證唔夠 developed。",
            ]],
          ],
        },
      ],
      summary: ["玩藝傳科技", "立、證、讓、反、呼", "Admittedly… However…", "On balance, … provided that…", "Review = evaluate，唔係 retell"],
      practice: [
        { q: "Define “echo chamber” in one sentence.", m: 1, a: "An online environment where people only meet opinions that <b>reinforce their own</b> beliefs." },
        { q: "Write a concession + rebuttal pair about phones in class.", m: 2, a: "e.g. “<b>Admittedly</b>, phones can distract students. <b>However</b>, a total ban ignores their value as research tools.”" },
        { q: "List four conventions of a review.", m: 4, a: "Title; details of the work; short summary without spoilers; evaluation; rating/recommendation（any 4）." },
        { q: "Which linking phrase introduces a final judgement?", m: 1, a: "“<b>On balance</b> / All things considered / Ultimately…”" },
      ],
    },

    "engb-4": {
      title: "Social organization · Community, school & work",
      intro: "Theme 4：social relationships, community, social engagement, education, the working world, law and order。",
      parts: [
        {
          h: "Theme map + vocab", min: 2.5,
          blocks: [
            ["table", ["Topic", "常見題目", "Vocab"], [
              ["Social relationships", "generation gap, friendship online", "to bond, generation gap, to drift apart"],
              ["Community", "lonely elderly, neighbourhood", "community spirit, social cohesion, isolated"],
              ["Social engagement", "volunteering, activism", "civic duty, grassroots, to make a difference"],
              ["Education", "homework, exams, compulsory service", "rote learning, holistic, well-rounded"],
              ["The working world", "remote work, part-time jobs", "gig economy, work experience, job security"],
              ["Law and order", "curfews, school rules, cyberbullying", "to enforce, deterrent, to crack down on"],
            ]],
            ["rhyme", "口訣 1", "人區參教工法", "Relationships 人、community 區、engagement 參、education 教、working world 工、law 法。"],
          ],
        },
        {
          h: "Proposal / report 格式", min: 3,
          blocks: [
            ["key", "Social organization 好多時叫你寫 <b>proposal</b>（to principal / council）或 <b>report</b>。Criterion C 靠<b>格式 + objective register</b>。"],
            ["table", ["", "Proposal", "Report"], [
              ["Heading", "To / From / Date / Subject 或 title", "Title + (To / From / Date)"],
              ["目的", "建議做新嘢（future）", "報告調查結果（past findings）"],
              ["Sections", "Introduction · Background · Proposal · Benefits · (Budget) · Conclusion", "Introduction/Purpose · Method · Findings · Conclusions · Recommendations"],
              ["語氣", "persuasive but formal", "impersonal, objective（passive）"],
            ]],
            ["rhyme", "口訣 2", "提案講將來，報告講做過", "Proposal：“It is proposed that…” Report：“A survey was conducted among 120 students…”"],
            ["note", "Model phrases：<b>“The purpose of this proposal is to…”</b> · <b>“It is recommended that the scheme (should) be piloted…”</b> · <b>“As shown by the survey, 68% of respondents…”</b> · <b>“I trust that you will give this proposal careful consideration.”</b>"],
          ],
        },
        {
          h: "失分位", min: 1,
          blocks: [
            ["trap", [
              "Proposal 冇 headings、寫到似 essay → Criterion C 好難過 3。",
              "Report 用 “I think” / contractions → register 唔一致。",
              "Interview 要 Q&A 格式 + intro of interviewee，唔好寫成 article。",
            ]],
          ],
        },
      ],
      summary: ["人區參教工法", "提案講將來，報告講做過", "To / From / Date / Subject", "It is recommended that…", "Report 用 passive + data"],
      practice: [
        { q: "Name four headings you would use in a proposal.", m: 4, a: "Introduction; Background/The problem; Proposal/Recommendations; Benefits; Budget; Conclusion（any 4）." },
        { q: "Rewrite objectively for a report: “We asked loads of students and most hated the canteen food.”", m: 2, a: "“<b>A survey of 100 students was conducted; the majority (62%) expressed dissatisfaction with the canteen food.</b>”" },
        { q: "What is the gig economy?", m: 1, a: "A labour market of <b>short-term, freelance or flexible</b> jobs." },
        { q: "Choose: “It is recommended that every student ___ ten hours of service.” (completes / complete)", m: 1, a: "<b>complete</b>（subjunctive after “recommended that”）; “should complete” also correct." },
      ],
    },

    "engb-5": {
      title: "Sharing the planet · Environment, rights & globalization",
      intro: "Theme 5：the environment, human rights, peace and conflict, equality, globalization, ethics, urban and rural environment。",
      parts: [
        {
          h: "Theme map + vocab", min: 2.5,
          blocks: [
            ["table", ["Topic", "常見題目", "Vocab"], [
              ["The environment", "plastic, climate, fast fashion", "sustainability, carbon footprint, single-use, biodiversity"],
              ["Human rights", "child labour, freedom of speech", "to violate, fundamental rights, exploitation"],
              ["Peace and conflict", "refugees, bullying as conflict", "displaced, reconciliation, to resolve"],
              ["Equality", "gender pay gap, access to education", "discrimination, inclusive, level playing field"],
              ["Globalization", "global brands, cultural loss", "homogenisation, interconnected, multinational"],
              ["Ethics", "animal testing, fair trade", "ethical consumer, moral obligation"],
              ["Urban and rural environment", "city vs countryside, housing", "urban sprawl, green space, rural depopulation"],
            ]],
            ["rhyme", "口訣 1", "環權和平、全球道德、城鄉", "七個 topics：environment, rights, peace, equality（平）, globalization, ethics, urban/rural。"],
          ],
        },
        {
          h: "Persuasive 模板（speech / leaflet）", min: 3,
          blocks: [
            ["rhyme", "口訣 2", "問題、影響、方法、呼籲", "Problem → impact → solutions → call to action。"],
            ["table", ["Device", "例子"], [
              ["Rhetorical question", "“How many more summers like this can we afford?”"],
              ["Inclusive pronoun", "“<b>We</b> are not powerless; <b>our</b> choices add up.”"],
              ["Tricolon", "“Refuse, reduce, reuse.”"],
              ["Statistic（合理）", "“Every minute, the equivalent of a rubbish truck of plastic enters the ocean.”"],
              ["Imperative call to action", "“Bring your own bottle. Sign the petition. Start today.”"],
            ]],
            ["eg", "Leaflet for a school campaign 嘅 layout？", [
              "Catchy title + slogan：“Ditch the Disposable!”",
              "Headings：The problem · Why it matters · What you can do",
              "Bullet points + short facts；結尾 contact details / date of event",
            ]],
          ],
        },
        {
          h: "失分位", min: 1,
          blocks: [
            ["trap", [
              "Lists of facts 冇 develop（點解重要？對讀者有咩影響？）。",
              "Speech 冇 greeting / thanks → Criterion C。",
              "亂作誇張數字（“99% of fish are dead”）→ 損 credibility。",
            ]],
          ],
        },
      ],
      summary: ["環權和平、全球道德、城鄉", "問題、影響、方法、呼籲", "We / our：inclusive", "Tricolon + rhetorical question", "Leaflet：slogan、headings、bullets、contact"],
      practice: [
        { q: "Define “carbon footprint”.", m: 1, a: "Total greenhouse gas emissions caused by a <b>person, product or organisation</b>." },
        { q: "Write a tricolon call to action for a climate speech.", m: 2, a: "e.g. “<b>Walk more, waste less, speak up.</b>” [1 three parallel parts, 1 imperative/persuasive]" },
        { q: "List four layout features of a leaflet.", m: 4, a: "Title/slogan; headings; bullet points; short sections; contact details/call to action; (reference to images)（any 4）." },
        { q: "Give two Theme 5 recommended topics.", m: 2, a: "Any two of: environment, human rights, peace and conflict, equality, globalization, ethics, urban and rural environment." },
      ],
    },

    "engb-6": {
      title: "Personal & professional text types · Conventions",
      intro: "Criterion C（6 分）= 你有冇寫啱 text type。呢頁係格式速查。",
      parts: [
        {
          h: "Personal texts", min: 2.5,
          blocks: [
            ["table", ["Text type", "開頭", "結尾", "Register"], [
              ["Informal letter / email", "Dear Sam, / Hi Sam,", "Best wishes / Love / Take care, + name", "contractions, questions to reader"],
              ["Diary / journal", "Date (+ Dear diary)", "reflection / hope", "intimate, emotional, first person"],
              ["Blog (personal)", "Title + date + name", "invite comments", "informal-engaging, direct address"],
            ]],
            ["rhyme", "口訣 1", "朋友信要問候，日記要心事", "Informal letter 要有 personal questions（“How did your exams go?”）；diary 要 emotions + reflection。"],
          ],
        },
        {
          h: "Professional texts", min: 3,
          blocks: [
            ["table", ["Text type", "Must include"], [
              ["Formal letter", "Addresses + date; Dear Sir or Madam / Dear Mr Lee; purpose in para 1; Yours faithfully / sincerely + full name"],
              ["Formal email", "Subject line; Dear…; clear purpose; polite request; Kind regards + name"],
              ["Proposal", "To/From/Date/Subject; headings; recommendations; request approval"],
              ["Report", "Title; purpose; findings; conclusions; recommendations; impersonal"],
              ["Questionnaire / survey", "Title, purpose/intro, clear numbered questions, thanks"],
            ]],
            ["rhyme", "口訣 2", "唔識名 faithfully，識名 sincerely", "Dear Sir or Madam → Yours faithfully；Dear Ms Chan → Yours sincerely。"],
            ["note", "Formal 開頭：<b>“I am writing to express my concern about…”</b> · 要求：<b>“I would be grateful if you could…”</b> · 結尾：<b>“I look forward to hearing from you.”</b>"],
          ],
        },
        {
          h: "失分位", min: 1,
          blocks: [
            ["trap", [
              "“Dear Sir or Madam … Yours sincerely” 撈亂。",
              "Formal text 用 contractions（I'm, don't）或 slang。",
              "Email 冇 subject line；formal letter 冇講 purpose 喺第一段。",
              "Register 中途轉（開頭 formal、後面 “guys”）→ C 最多 3–4。",
            ]],
          ],
        },
      ],
      summary: ["唔識名 faithfully，識名 sincerely", "朋友信要問候，日記要心事", "第一段講 purpose", "Formal：冇 contractions、冇 slang", "格式喺頭五行已經要見到"],
      practice: [
        { q: "Correct the closing: “Dear Sir or Madam … Yours sincerely, Ka Ho”.", m: 1, a: "<b>Yours faithfully</b>（+ full name）." },
        { q: "Write a formal opening sentence for a complaint email.", m: 1, a: "“<b>I am writing to complain about the service I received on 4 May.</b>”" },
        { q: "Give three differences between an informal and a formal letter.", m: 3, a: "Greeting/closing; contractions/slang vs none; personal questions/chatty tone vs clear purpose and objective tone; addresses/date in formal（any 3）." },
        { q: "Which text type uses To/From/Date/Subject?", m: 1, a: "<b>Proposal</b>（also memo/report）." },
      ],
    },

    "engb-7": {
      title: "Mass media text types · Article, speech, review, interview",
      intro: "Mass media = 寫俾公眾睇：article, opinion column, speech, review, interview, brochure/leaflet, news report, web page。",
      parts: [
        {
          h: "Conventions 速查", min: 3,
          blocks: [
            ["table", ["Text type", "一眼見到嘅 features"], [
              ["Article / feature", "Headline, sub-heading, by-line, lead paragraph, subheadings, quotes"],
              ["Opinion column / editorial", "Headline, clear stance, persuasive devices, counter-argument"],
              ["News report", "Headline, who/what/when/where/why in para 1, third person, quotes, past tense"],
              ["Speech / talk", "Greeting, signposting, rhetorical questions, direct address, call to action, thanks"],
              ["Review", "Details of work, no-spoiler summary, evaluation, rating"],
              ["Interview", "Intro of interviewee, Q/A with names or initials, spoken register, closing"],
              ["Brochure / leaflet", "Title/slogan, headings, bullet points, contact details"],
            ]],
            ["rhyme", "口訣 1", "報紙有頭有名，演講有招呼有多謝", "Article：headline + by-line；speech：greeting + thanks。"],
          ],
        },
        {
          h: "Persuasive devices", min: 2,
          blocks: [
            ["key", "<b>AFOREST</b>：Alliteration · Facts · Opinions · Rhetorical questions · Emotive language · Statistics · Triples（tricolon）"],
            ["note", "Speech 開頭：<b>“Good morning, Principal, teachers and fellow students. Have you ever wondered…?”</b><br>Signposting：<b>“Let me begin with… Moving on to… Finally…”</b><br>結尾：<b>“So I urge each of you to… Thank you for listening.”</b>"],
          ],
        },
        {
          h: "Interview & 失分位", min: 2,
          blocks: [
            ["eg", "Interview 點開？", [
              "Headline + intro：“Seventeen-year-old Mei Lin turned an empty car park into a community garden. We asked her how.”",
              "<b>Q:</b> What inspired you? <b>ML:</b> Honestly, it was frustration…（spoken register OK）",
              "Closing：thank the interviewee / final advice",
            ]],
            ["trap", [
              "Speech 寫到似 essay（冇 audience awareness）。",
              "News report 加個人意見 → 應該 objective。",
              "Article 冇 headline / by-line → Criterion C 即刻低。",
            ]],
          ],
        },
      ],
      summary: ["報紙有頭有名，演講有招呼有多謝", "AFOREST", "News report 客觀，opinion column 有立場", "Interview：intro + Q/A + closing", "Signpost：Let me begin… Finally…"],
      practice: [
        { q: "Name two features that distinguish a speech from an article.", m: 2, a: "Greeting the audience; direct address/rhetorical questions; signposting for listeners; thanks at end（any 2）." },
        { q: "“Reduce, reuse, recycle” is an example of which device?", m: 1, a: "<b>Tricolon</b>（triple）。" },
        { q: "What should the first paragraph of a news report contain?", m: 2, a: "The key facts: <b>who, what, when, where</b>（and why/how）." },
        { q: "Why does a by-line matter in an article?", m: 1, a: "It names the writer → <b>shows the text type / gives credibility</b>." },
      ],
    },

    "engb-8": {
      title: "Paper 1 · Choosing, planning & the three criteria",
      intro: "HL Paper 1：1h30，三題揀一，450–600 words，30 分（25%）。",
      parts: [
        {
          h: "Criteria 點拎分", min: 2.5,
          blocks: [
            CRIT,
            ["rhyme", "口訣 1", "A 字句，B 內容，C 格式", "A = language；B = message；C = conceptual understanding（text type + register）。"],
          ],
        },
        {
          h: "90 分鐘時間表", min: 2,
          blocks: [
            ["table", ["時間", "做咩"], [
              ["0–10 min", "讀三題；圈 <b>text type, audience, purpose, context</b>；揀有 ideas + 識格式嗰題"],
              ["10–15 min", "Plan：4–6 段，每段一個 idea + 例子；寫低 5 個高分字 + 3 個 complex structures"],
              ["15–75 min", "寫（約 500–550 字最穩陣）"],
              ["75–90 min", "Proofread：tense, agreement, articles, spelling"],
            ]],
            ["rhyme", "口訣 2", "圈四樣：類、人、目、境", "Text type 類、audience 人、purpose 目、context 境。"],
          ],
        },
        {
          h: "Upgrade 句子", min: 2,
          blocks: [
            ["eg", "Upgrade：“Tourism is good but it makes problems.”", [
              "Concession：“<b>While</b> tourism brings undeniable economic benefits, …”",
              "Precise vocab：“…it also <b>places considerable pressure on</b> local infrastructure.”",
              "→ “While tourism brings undeniable economic benefits, it also places considerable pressure on local infrastructure.”",
            ]],
            ["trap", [
              "少過 450 字 → message 唔夠 develop；寫太長 → 錯誤多、焦點散，又食咗 proofread 時間。",
              "揀咗題但寫錯 text type（叫 proposal 你寫 article）→ C 大扣。",
              "背咗嘅範文硬塞 → 唔切題，B 低。",
            ]],
          ],
        },
      ],
      summary: ["A 字句，B 內容，C 格式（12 / 12 / 6）", "圈四樣：類、人、目、境", "10 min plan，15 min 檢查", "While…, … ：concession 一句升級", "450–600，唔好多唔好少"],
      practice: [
        { q: "State the three Paper 1 criteria and their marks.", m: 3, a: "A Language <b>12</b>; B Message <b>12</b>; C Conceptual understanding <b>6</b>." },
        { q: "What four things should you identify in a task before planning?", m: 2, a: "<b>Text type, audience, purpose, context</b>（4 correct = 2, 2–3 correct = 1）." },
        { q: "Upgrade: “Many students use phones and it is bad for sleep.”", m: 2, a: "e.g. “<b>Late-night phone use, which is widespread among students, significantly disrupts sleep patterns.</b>”" },
        { q: "What is the HL Paper 1 word range?", m: 1, a: "<b>450–600 words</b>." },
      ],
    },

    "engb-9": {
      title: "Paper 2 · Reading & listening question types",
      intro: "HL Paper 2：Listening 1h（25 分）+ Reading 1h（40 分）= 65 分，50%。",
      parts: [
        {
          h: "題型速查", min: 3,
          blocks: [
            ["table", ["題型", "點答", "失分位"], [
              ["True / False + justification", "T 或 F + <b>最短</b>證明嘅原文", "淨係 T/F 冇分；兩樣都要啱"],
              ["Short answer", "簡短，lift 原文 OK", "抄成段、加錯資料"],
              ["Word / phrase meaning", "搵同 word class 嘅字", "名詞答動詞"],
              ["Reference（“it / they refers to”）", "向前搵最近 match 嘅 noun", "答錯 noun（單複數唔夾）"],
              ["Gap fill / sentence completion", "答案要合文法、合字數", "改咗原字形式"],
              ["Matching / multiple choice", "排除法", "睇到一個 keyword 就揀"],
            ]],
            ["rhyme", "口訣 1", "真假要證據，越短越安全", "Justification 抄 key phrase，唔好抄成段（多咗錯資料會冇分）。"],
          ],
        },
        {
          h: "Listening 技巧", min: 2,
          blocks: [
            ["key", "三段 audio，<b>每段播兩次</b>。答案順序出現；拼錯如果意思清楚通常照收。"],
            ["rhyme", "口訣 2", "聽前估，第一次寫，第二次補", "Reading time 圈 keywords + 估答案類型（數字？地點？名字？）。"],
          ],
        },
        {
          h: "Worked example", min: 1.5,
          blocks: [
            ["eg", "Text：“Most visitors come for the beaches, but locals will tell you the real treasure is the market that opens at 5 a.m., long before the tourists wake up.” T/F：Tourists usually visit the early market.", [
              "Answer：<b>False</b>",
              "Justification：<b>“long before the tourists wake up”</b>（短、準）",
            ]],
          ],
        },
      ],
      summary: ["真假要證據，越短越安全", "Reference：向前搵 noun", "Word meaning：word class 要夾", "聽前估，第一次寫，第二次補", "答晒每一題，冇倒扣"],
      practice: [
        { q: "In a true/false question, what earns the mark?", m: 1, a: "<b>Both</b> the correct T/F <b>and</b> a correct justification." },
        { q: "Text: “The museum reopened in May. It now has a rooftop garden.” What does “It” refer to?", m: 1, a: "<b>The museum</b>." },
        { q: "Text: “Volunteers were thrilled with the turnout.” Find a word meaning “very pleased”.", m: 1, a: "<b>thrilled</b>." },
        { q: "How many marks are the HL listening and reading sections worth?", m: 2, a: "Listening <b>25</b>; reading <b>40</b>（total 65）." },
      ],
    },

    "engb-10": {
      title: "HL Individual oral · Literary extract + conversation",
      intro: "IO：20 min prep + 12–15 min，30 分（25%）。Extract ≤300 字，來自你讀過嘅兩本 literary works 之一，老師揀。",
      parts: [
        {
          h: "結構 + 時間", min: 2,
          blocks: [
            ["table", ["Stage", "Time", "做咩"], [
              ["Preparation", "20 min", "讀 extract；寫最多 <b>10 bullet points</b>"],
              ["Presentation", "3–4 min", "context → 內容 → techniques + quotes → link to a theme → personal response"],
              ["Discussion of extract", "4–5 min", "答老師追問，expand"],
              ["General conversation", "5–6 min", "至少一個<b>其他</b> course theme"],
            ]],
            ["rhyme", "口訣 1", "背、事、技、題、我", "Background/context → 發生咩事 → techniques → link to theme → 我嘅 response。"],
          ],
        },
        {
          h: "Criteria", min: 1.5,
          blocks: [
            ["table", ["Criterion", "Marks", "重點"], [
              ["A: Language", "12", "range + accuracy + fluency / pronunciation"],
              ["B1: Message — literary extract", "6", "relevant, detailed analysis of the extract，唔係 retell plot"],
              ["B2: Message — conversation", "6", "relevant, developed answers in discussion + conversation"],
              ["C: Interactive skills — communication", "6", "understand + respond + sustain conversation"],
            ]],
          ],
        },
        {
          h: "Model phrases", min: 2.5,
          blocks: [
            ["note", "開場：<b>“This extract comes from chapter 3 of…, just after…”</b><br>分析：<b>“The writer uses contrast/imagery to convey…”</b> · <b>“The repetition of ‘…’ suggests…”</b><br>連 theme：<b>“This links to the theme of Experiences, particularly migration, because…”</b><br>互動：<b>“That's an interesting question — I'd say…”</b> · <b>“Could you rephrase that, please?”</b> · <b>“From my own experience…”</b>"],
            ["trap", [
              "淨係講故（plot summary）→ B1 低。",
              "背咗成篇 → C 低（唔自然、唔互動）。",
              "General conversation 答一兩個字 → B2/C 低；每答 = 立場 + 原因 + 例子。",
            ]],
          ],
        },
      ],
      summary: ["背、事、技、題、我", "3–4 / 4–5 / 5–6 分鐘", "最多 10 bullet points", "A 12 + B1 6 + B2 6 + C 6 = 30", "答 = 立場 + 原因 + 例子"],
      practice: [
        { q: "List the stages of the HL IO with timings.", m: 4, a: "Prep 20 min; presentation <b>3–4</b>; discussion of extract <b>4–5</b>; general conversation <b>5–6</b>." },
        { q: "How many bullet points of notes may you use?", m: 1, a: "<b>Up to 10</b>." },
        { q: "What is assessed in B1?", m: 1, a: "Message on the <b>literary extract</b>: relevance and development of the presentation/analysis." },
        { q: "Give a phrase to ask for clarification.", m: 1, a: "“<b>Could you rephrase that, please?</b>” / “Do you mean…?”" },
      ],
    },

    "engb-11": {
      title: "Grammar for Criterion A · Structures & common errors",
      intro: "Criterion A：range（complex structures）+ accuracy。準過勁。",
      parts: [
        {
          h: "Complex structures", min: 3,
          blocks: [
            ["table", ["Structure", "Pattern", "Example"], [
              ["2nd conditional", "If + past, would + V", "If I <b>were</b> the principal, I <b>would</b> ban…"],
              ["3rd conditional", "If + had p.p., would have p.p.", "If they <b>had listened</b>, it <b>would have</b> worked."],
              ["Inversion", "Neg. adverbial + aux + S", "<b>Never have I</b> seen… · <b>Not only does</b> it…"],
              ["Passive", "be + p.p.", "A survey <b>was conducted</b>…"],
              ["Non-defining relative", ", which / who …,", "The scheme, <b>which</b> began in 2023, …"],
              ["Cleft", "What… is…", "<b>What worries me most is</b>…"],
            ]],
            ["rhyme", "口訣 1", "倒裝要助動，條件要對位", "Inversion 一定有 do/have/can；conditional 前後時態要配。"],
          ],
        },
        {
          h: "常見錯誤", min: 2.5,
          blocks: [
            ["table", ["❌", "✅", "Rule"], [
              ["I am agree", "I agree", "agree 係動詞"],
              ["informations / advices", "information / advice", "uncountable"],
              ["people is", "people are", "people 係複數"],
              ["since 3 years", "for 3 years", "since + 時間點；for + 時段"],
              ["despite of", "despite / in spite of", ""],
              ["He suggested me to go", "He suggested (that) I go", "suggest + that clause / -ing"],
              ["discuss about", "discuss", "discuss 直接接 object"],
            ]],
            ["rhyme", "口訣 2", "信息勸告冇 s，人哋永遠係 are", "information, advice, equipment, research, homework 都冇 s。"],
          ],
        },
        {
          h: "Proofread checklist", min: 1,
          blocks: [
            ["trap", ["Tense 一致（past story 唔好突然 present）。", "Subject–verb agreement（he does / they do）。", "Articles：a / an / the。", "冇把握嘅 complex structure 唔好用 — 錯咗反而扣 A。"]],
          ],
        },
      ],
      summary: ["倒裝要助動，條件要對位", "信息勸告冇 s，人哋永遠係 are", "since 時間點，for 時段", "Passive 用喺 report / formal", "準過勁"],
      practice: [
        { q: "Correct: “I am agree that peoples needs more informations.”", m: 3, a: "“<b>I agree that people need more information.</b>”" },
        { q: "Complete: “If they ___ (heed) the warning, the accident would not have happened.”", m: 1, a: "<b>had heeded</b>." },
        { q: "Rewrite with inversion: “The plan saves money and it also reduces waste.”", m: 2, a: "“<b>Not only does the plan save money, but it also reduces waste.</b>”" },
        { q: "Make passive: “The committee will announce the results tomorrow.”", m: 2, a: "“<b>The results will be announced (by the committee) tomorrow.</b>”" },
      ],
    },
  });
})();
