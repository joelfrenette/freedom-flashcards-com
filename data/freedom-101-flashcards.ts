export interface Flashcard {
  id: number
  title: string
  claim: string
  truth: string
  sources: Array<{
    name: string
    url: string
  }>
}

export const allFreedom101Flashcards: Flashcard[] = [
  {
    id: 1,
    title: "Life, Liberty, and the Pursuit of Happiness",
    claim: "What does this famous phrase from the Declaration of Independence mean?",
    truth:
      "This means every person is born with three basic rights that can't be taken away: (1) Life - the right to live, (2) Liberty - the right to be free, and (3) Pursuit of Happiness - the right to make your own choices to find happiness. The government's job is to protect these rights, not give them to you.",
    sources: [
      {
        name: "Declaration of Independence",
        url: "https://www.archives.gov/founding-docs/declaration-transcript",
      },
      {
        name: "Natural Rights Explained",
        url: "https://www.heritage.org/american-founders/report/natural-law-natural-rights-and-american-constitutionalism",
      },
    ],
  },
  {
    id: 2,
    title: "We the People",
    claim: "Why does the Constitution start with 'We the People'?",
    truth:
      "These three words mean that the government gets its power from regular citizens, not from a king or queen. The people are in charge and the government works for them. It's like saying 'We're the boss' - the government has to listen to us.",
    sources: [
      {
        name: "U.S. Constitution Preamble",
        url: "https://www.archives.gov/founding-docs/constitution-transcript",
      },
      {
        name: "Popular Sovereignty Explained",
        url: "https://www.heritage.org/constitution/#!/preamble",
      },
    ],
  },
  {
    id: 3,
    title: "Freedom of Speech",
    claim: "What does the First Amendment protect?",
    truth:
      "The First Amendment protects five important freedoms: (1) You can say what you think, (2) You can practice any religion or no religion, (3) Newspapers can print the truth, (4) You can gather peacefully with others, and (5) You can ask the government to fix problems. These are the first freedoms because they're so important.",
    sources: [
      {
        name: "First Amendment Text",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
      {
        name: "Bill of Rights Overview",
        url: "https://www.archives.gov/founding-docs/bill-of-rights-transcript",
      },
    ],
  },
  {
    id: 4,
    title: "The Right to Bear Arms",
    claim: "What does the Second Amendment mean?",
    truth:
      "The Second Amendment says Americans have the right to own guns. The founders believed people needed to protect themselves, their families, and their freedom. It's like having a lock on your door - you hope you never need it, but it's there to keep you safe.",
    sources: [
      {
        name: "Second Amendment Text",
        url: "https://www.law.cornell.edu/constitution/second_amendment",
      },
      {
        name: "Second Amendment Explained",
        url: "https://www.heritage.org/constitution/#!/amendments/2",
      },
    ],
  },
  {
    id: 5,
    title: "Checks and Balances",
    claim: "What are checks and balances?",
    truth:
      "Checks and balances means each part of government (President, Congress, and Courts) can stop the others from becoming too powerful. It's like rock-paper-scissors - no one part always wins. This keeps anyone from becoming like a king and bossing everyone around.",
    sources: [
      {
        name: "Separation of Powers",
        url: "https://www.heritage.org/constitution/#!/articles/1",
      },
      {
        name: "Checks and Balances Explained",
        url: "https://www.whitehouse.gov/about-the-white-house/our-government/the-constitution/",
      },
    ],
  },
  {
    id: 6,
    title: "Give Me Liberty or Give Me Death",
    claim: "What did Patrick Henry mean by this famous quote?",
    truth:
      "Patrick Henry was saying that freedom is so important, he'd rather die than live without it. He was telling Americans that being free is worth fighting for, even if it's dangerous. Some things are more important than being safe - like being free.",
    sources: [
      {
        name: "Patrick Henry Speech",
        url: "https://www.history.com/topics/american-revolution/patrick-henry",
      },
      {
        name: "Liberty or Death Speech Context",
        url: "https://www.colonial williamsburg.org/learn/deep-dives/give-me-liberty-or-give-me-death/",
      },
    ],
  },
  {
    id: 7,
    title: "Innocent Until Proven Guilty",
    claim: "What does this principle mean?",
    truth:
      "This means if someone says you did something wrong, they have to prove it - you don't have to prove you're innocent. It's like being called 'it' in tag - someone has to actually tag you, you're not 'it' just because they said so. The government must prove guilt beyond a reasonable doubt.",
    sources: [
      {
        name: "Fifth Amendment Due Process",
        url: "https://www.law.cornell.edu/constitution/fifth_amendment",
      },
      {
        name: "Presumption of Innocence",
        url: "https://www.heritage.org/constitution/amendments/5",
      },
    ],
  },
  {
    id: 8,
    title: "No Taxation Without Representation",
    claim: "Why was this phrase important to America's founding?",
    truth:
      "This means the government can't take your money in taxes unless you have a say in how it's spent. England was taxing Americans but Americans couldn't vote for English leaders. It's like your parents taking your allowance but not letting you help decide family rules.",
    sources: [
      {
        name: "Colonial Taxation",
        url: "https://www.history.com/topics/american-revolution/no-taxation-without-representation",
      },
      {
        name: "Road to Revolution",
        url: "https://www.mountvernon.org/library/digitalhistory/digital-encyclopedia/article/no-taxation-without-representation/",
      },
    ],
  },
  {
    id: 9,
    title: "Federalism",
    claim: "What is federalism?",
    truth:
      "Federalism means power is shared between the national government and state governments. Some things the whole country does together (like having an army), but states can make their own rules about other things (like driving ages). It's like having family rules for everyone, but you can decorate your own room how you want.",
    sources: [
      {
        name: "Tenth Amendment",
        url: "https://www.law.cornell.edu/constitution/tenth_amendment",
      },
      {
        name: "Federalism Explained",
        url: "https://www.heritage.org/constitution/#!/articles/1",
      },
    ],
  },
  {
    id: 10,
    title: "Right to Remain Silent",
    claim: "Why do you have the right not to talk to police?",
    truth:
      "The Fifth Amendment says you can't be forced to say things that might get you in trouble. You have the right to stay quiet until you have a lawyer to help you. This protects innocent people from being tricked into saying something wrong.",
    sources: [
      {
        name: "Fifth Amendment Rights",
        url: "https://www.law.cornell.edu/constitution/fifth_amendment",
      },
      {
        name: "Miranda Rights",
        url: "https://www.uscourts.gov/about-federal-courts/educational-resources/about-educational-outreach/activity-resources/what-does",
      },
    ],
  },
  {
    id: 11,
    title: "Trial by Jury",
    claim: "Why is a jury trial important?",
    truth:
      "A jury is a group of regular people (not government workers) who decide if someone broke the law. This means the government can't just punish whoever it wants - regular citizens have to agree you did something wrong. It's like having your classmates decide if you broke a rule, not just the teacher.",
    sources: [
      {
        name: "Sixth Amendment",
        url: "https://www.law.cornell.edu/constitution/sixth_amendment",
      },
      {
        name: "Jury Trial Rights",
        url: "https://www.uscourts.gov/services-forms/jury-service/about-jury-service",
      },
    ],
  },
  {
    id: 12,
    title: "Freedom of Religion",
    claim: "What does freedom of religion really mean?",
    truth:
      "Freedom of religion means two things: (1) The government can't tell you what to believe or make an official religion, and (2) You're free to practice any religion you choose, or no religion at all. You can't be punished for your beliefs.",
    sources: [
      {
        name: "First Amendment Religious Freedom",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
      {
        name: "Establishment Clause",
        url: "https://www.heritage.org/constitution/#!/amendments/1/essays/138/establishment-of-religion",
      },
    ],
  },
  {
    id: 13,
    title: "All Men Are Created Equal",
    claim: "What does this phrase from the Declaration mean?",
    truth:
      "This means every person is born with the same value and deserves the same rights. No one is born better than anyone else. A president's kid and a farmer's kid both have the same rights. It doesn't mean we're all the same, but we all deserve equal treatment under the law.",
    sources: [
      {
        name: "Declaration of Independence",
        url: "https://www.archives.gov/founding-docs/declaration-transcript",
      },
      {
        name: "Equality and Natural Rights",
        url: "https://www.heritage.org/american-founders/report/equality-and-american-founding",
      },
    ],
  },
  {
    id: 14,
    title: "Private Property Rights",
    claim: "Why are property rights important?",
    truth:
      "Property rights mean what you earn or own is yours - not the government's. The government can't just take your stuff without paying you fairly for it (Fifth Amendment). If you work hard and buy something, it belongs to you. This encourages people to work hard and build things.",
    sources: [
      {
        name: "Fifth Amendment Takings Clause",
        url: "https://www.law.cornell.edu/constitution/fifth_amendment",
      },
      {
        name: "Property Rights Foundation",
        url: "https://www.heritage.org/markets-and-finance/report/the-link-between-property-rights-and-prosperity",
      },
    ],
  },
  {
    id: 15,
    title: "Consent of the Governed",
    claim: "What does consent of the governed mean?",
    truth:
      "This means the government only has power because the people agree to give it that power. If most people don't like what the government is doing, they can vote for different leaders. The government needs the people's permission to be in charge - like how a teacher needs the principal's permission to be in charge of a class.",
    sources: [
      {
        name: "Declaration Principles",
        url: "https://www.archives.gov/founding-docs/declaration-transcript",
      },
      {
        name: "Consent of the Governed",
        url: "https://www.heritage.org/american-founders/report/the-declaration-independence-and-consent-governed",
      },
    ],
  },
  {
    id: 16,
    title: "Freedom of the Press",
    claim: "Why is freedom of the press protected?",
    truth:
      "A free press means newspapers and reporters can tell the truth about what the government is doing, even if the government doesn't like it. This helps keep leaders honest because everyone can see what they're doing. It's like having someone watch the babysitter to make sure they're doing a good job.",
    sources: [
      {
        name: "First Amendment Press Freedom",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
      {
        name: "Press Freedom Importance",
        url: "https://www.heritage.org/the-constitution/report/freedom-press",
      },
    ],
  },
  {
    id: 17,
    title: "Limited Government",
    claim: "What does limited government mean?",
    truth:
      "Limited government means the government can only do certain things that are written in the Constitution. It can't do whatever it wants. The Constitution is like a rulebook that the government has to follow, just like you have to follow rules. If it's not in the rulebook, the government can't do it.",
    sources: [
      {
        name: "Constitutional Limits",
        url: "https://www.heritage.org/constitution/#!/articles/1",
      },
      {
        name: "Limited Government Principle",
        url: "https://www.cato.org/policy-analysis/limited-government-basics",
      },
    ],
  },
  {
    id: 18,
    title: "The Magna Carta",
    claim: "What is the Magna Carta and why does it matter?",
    truth:
      "The Magna Carta was a document from England in 1215 that said even the king has to follow the law. Before this, kings could do whatever they wanted. It was the first time in history that said leaders aren't above the law. This idea helped create America's Constitution 500 years later.",
    sources: [
      {
        name: "Magna Carta History",
        url: "https://www.archives.gov/exhibits/featured-documents/magna-carta",
      },
      {
        name: "Magna Carta Influence on America",
        url: "https://www.heritage.org/political-process/report/magna-carta-and-the-rule-law",
      },
    ],
  },
  {
    id: 19,
    title: "Marbury v. Madison",
    claim: "Why is this court case important?",
    truth:
      "This 1803 case established that the Supreme Court can decide if laws go against the Constitution. If a law breaks the Constitution's rules, the Court can say 'no, you can't do that.' It's like having a referee in sports who can call a foul. This is called 'judicial review.'",
    sources: [
      {
        name: "Marbury v. Madison Case",
        url: "https://www.supremecourt.gov/about/constitutional.aspx",
      },
      {
        name: "Judicial Review Explained",
        url: "https://www.heritage.org/courts/report/marbury-v-madison-and-judicial-review",
      },
    ],
  },
  {
    id: 20,
    title: "Right to a Speedy Trial",
    claim: "Why can't the government just hold you in jail forever?",
    truth:
      "The Sixth Amendment says if you're accused of a crime, you get a trial quickly. The government can't just lock you up for years without proving you did something wrong. This protects innocent people from sitting in jail forever waiting. Justice delayed is justice denied.",
    sources: [
      {
        name: "Sixth Amendment Rights",
        url: "https://www.law.cornell.edu/constitution/sixth_amendment",
      },
      {
        name: "Speedy Trial Protections",
        url: "https://www.heritage.org/constitution/#!/amendments/6/essays/157/speedy-trial",
      },
    ],
  },
  {
    id: 21,
    title: "Federalist Paper No. 10",
    claim: "What did James Madison teach us about democracy?",
    truth:
      "Madison explained that in a big country with lots of different people and opinions, no one group can take over easily. Having many different groups and states is actually good - it prevents any one group from becoming too powerful. It's like having lots of players on different teams instead of one bully controlling the whole playground.",
    sources: [
      {
        name: "Federalist No. 10 Text",
        url: "https://guides.loc.gov/federalist-papers/text-1-10#s-lg-box-wrapper-25493273",
      },
      {
        name: "Federalist No. 10 Explained",
        url: "https://www.heritage.org/american-founders/report/federalist-no-10",
      },
    ],
  },
  {
    id: 22,
    title: "Separation of Church and State",
    claim: "What does separation of church and state mean?",
    truth:
      "This means the government can't force a religion on people, and religions can't control the government. They stay separate. You're free to practice your religion, but the government can't make laws that force everyone to follow one religion. It protects both religious freedom and government from religious control.",
    sources: [
      {
        name: "Establishment Clause",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
      {
        name: "Religious Liberty",
        url: "https://www.heritage.org/religious-liberty/report/the-first-amendment-and-religious-liberty",
      },
    ],
  },
  {
    id: 23,
    title: "Brown v. Board of Education",
    claim: "What did this Supreme Court case do?",
    truth:
      "In 1954, the Supreme Court said that separating kids in schools by race is wrong and against the Constitution. 'Separate but equal' is never truly equal. This case helped end segregation and proved that all people deserve equal treatment. It showed that the Constitution protects everyone's rights.",
    sources: [
      {
        name: "Brown v. Board Case",
        url: "https://www.uscourts.gov/educational-resources/educational-activities/history-brown-v-board-education-re-enactment",
      },
      {
        name: "Desegregation History",
        url: "https://www.archives.gov/education/lessons/brown-v-board",
      },
    ],
  },
  {
    id: 24,
    title: "The Electoral College",
    claim: "Why don't we just count all the votes for President?",
    truth:
      "The Electoral College makes sure that small states still have a voice in choosing the President. Without it, candidates would only campaign in big cities and ignore rural areas. It's like making sure every state gets a turn picking the class activity, not just the biggest classes.",
    sources: [
      {
        name: "Electoral College Purpose",
        url: "https://www.archives.gov/electoral-college/about",
      },
      {
        name: "Why Electoral College Matters",
        url: "https://www.heritage.org/election-integrity/report/the-electoral-college-why-it-matters",
      },
    ],
  },
  {
    id: 25,
    title: "Right to Assemble",
    claim: "Can the government stop you from gathering with friends?",
    truth:
      "The First Amendment protects your right to peacefully gather with other people. You can protest, have meetings, or join groups. The government can't stop you from gathering just because they don't like your message. As long as you're peaceful, you can meet with others to share ideas.",
    sources: [
      {
        name: "First Amendment Assembly",
        url: "https://www.law.cornell.edu/constitution/first_amendment",
      },
      {
        name: "Right to Assembly Explained",
        url: "https://www.heritage.org/constitution/#!/amendments/1/essays/140/assembly-and-petition",
      },
    ],
  },
]
