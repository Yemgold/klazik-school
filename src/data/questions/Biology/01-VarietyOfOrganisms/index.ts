



import type { ArenaQuestion } from "@/components/arena/Arena";

/* -------------------------------------------------------------------------- */
/* BIOLOGY — VARIETY OF ORGANISMS                                             */
/* -------------------------------------------------------------------------- */

export const varietyOfOrganismsQuestions: ArenaQuestion[] = [
  {
    id: "biology-variety-001",

    question:
      "Which of the following characteristics is common to all living organisms?",

    options: [
      {
        id: "A",
        text: "Ability to move from one place to another",
      },
      {
        id: "B",
        text: "Ability to respire",
      },
      {
        id: "C",
        text: "Ability to produce flowers",
      },
      {
        id: "D",
        text: "Ability to make their own food",
      },
    ],

    correctAnswer: "B",

    explanation: {
      intro:
        "Respiration is a fundamental life process carried out by all living organisms to release energy from food.",

      steps: [
        "All living organisms require energy to carry out their life processes.",
        "Respiration is the process through which energy is released from food.",
        "Plants, animals, fungi and microorganisms all carry out respiration.",
        "Not all organisms can move from one place to another.",
        "Not all organisms produce flowers or manufacture their own food.",
        "Therefore, the correct answer is the ability to respire.",
      ],
    },
  },

  {
    id: "biology-variety-002",

    question:
      "Which of the following groups consists entirely of vertebrates?",

    options: [
      {
        id: "A",
        text: "Fish, birds and mammals",
      },
      {
        id: "B",
        text: "Insects, fish and reptiles",
      },
      {
        id: "C",
        text: "Molluscs, birds and mammals",
      },
      {
        id: "D",
        text: "Worms, amphibians and reptiles",
      },
    ],

    correctAnswer: "A",

    explanation: {
      intro:
        "Vertebrates are animals that possess a backbone or vertebral column.",

      steps: [
        "Fish possess a vertebral column.",
        "Birds possess a vertebral column.",
        "Mammals possess a vertebral column.",
        "Insects, molluscs and worms are invertebrates.",
        "Therefore, fish, birds and mammals are entirely vertebrate groups.",
      ],
    },
  },

  {
    id: "biology-variety-003",

    question:
      "Which of the following organisms belongs to the kingdom Fungi?",

    options: [
      {
        id: "A",
        text: "Amoeba",
      },
      {
        id: "B",
        text: "Mushroom",
      },
      {
        id: "C",
        text: "Paramecium",
      },
      {
        id: "D",
        text: "Spirogyra",
      },
    ],

    correctAnswer: "B",

    explanation: {
      intro:
        "Mushrooms are fungi and have characteristics that distinguish them from plants and animals.",

      steps: [
        "Mushrooms belong to the kingdom Fungi.",
        "Fungi do not contain chlorophyll and therefore cannot manufacture food by photosynthesis.",
        "Amoeba and Paramecium are protozoans.",
        "Spirogyra is a photosynthetic alga.",
        "Therefore, the correct answer is Mushroom.",
      ],
    },
  },

  {
    id: "biology-variety-004",

    question:
      "Which of the following features distinguishes mammals from other vertebrates?",

    options: [
      {
        id: "A",
        text: "Presence of a backbone",
      },
      {
        id: "B",
        text: "Presence of lungs",
      },
      {
        id: "C",
        text: "Presence of mammary glands",
      },
      {
        id: "D",
        text: "Ability to reproduce",
      },
    ],

    correctAnswer: "C",

    explanation: {
      intro:
        "Mammary glands are a characteristic feature of mammals and are used to produce milk for feeding their young.",

      steps: [
        "Mammals are vertebrates, so they possess a backbone.",
        "Many other vertebrates also have lungs.",
        "All living organisms reproduce in some form.",
        "Mammary glands are a defining characteristic of mammals.",
        "Therefore, the correct answer is the presence of mammary glands.",
      ],
    },
  },

  {
    id: "biology-variety-005",

    question:
      "Which of the following organisms is classified as a monocotyledonous plant?",

    options: [
      {
        id: "A",
        text: "Bean",
      },
      {
        id: "B",
        text: "Maize",
      },
      {
        id: "C",
        text: "Groundnut",
      },
      {
        id: "D",
        text: "Mango",
      },
    ],

    correctAnswer: "B",

    explanation: {
      intro:
        "Monocotyledonous plants have one cotyledon in their seeds, and maize is a common example.",

      steps: [
        "Monocotyledons possess one cotyledon in the seed.",
        "Maize is a monocotyledonous plant.",
        "Bean, groundnut and mango are dicotyledonous plants.",
        "Therefore, the correct answer is Maize.",
      ],
    },
  },

  {
    id: "biology-variety-006",

    question:
      "Which of the following characteristics is used to distinguish plants from animals?",

    options: [
      {
        id: "A",
        text: "Respiration",
      },
      {
        id: "B",
        text: "Growth",
      },
      {
        id: "C",
        text: "Photosynthesis",
      },
      {
        id: "D",
        text: "Excretion",
      },
    ],

    correctAnswer: "C",

    explanation: {
      intro:
        "Photosynthesis is a major characteristic of green plants because they contain chlorophyll and can manufacture their own food.",

      steps: [
        "Plants containing chlorophyll can manufacture food through photosynthesis.",
        "Animals cannot manufacture their own food through photosynthesis.",
        "Both plants and animals respire, grow and excrete waste.",
        "Therefore, photosynthesis is the correct answer.",
      ],
    },
  },

  {
    id: "biology-variety-007",

    question:
      "Which of the following organisms is a prokaryote?",

    options: [
      {
        id: "A",
        text: "Bacterium",
      },
      {
        id: "B",
        text: "Amoeba",
      },
      {
        id: "C",
        text: "Yeast",
      },
      {
        id: "D",
        text: "Paramecium",
      },
    ],

    correctAnswer: "A",

    explanation: {
      intro:
        "Bacteria are prokaryotic organisms because their cells lack a membrane-bound nucleus.",

      steps: [
        "Prokaryotic cells do not have a true membrane-bound nucleus.",
        "Bacteria are prokaryotic organisms.",
        "Amoeba and Paramecium are eukaryotic organisms.",
        "Yeast is also a eukaryotic organism.",
        "Therefore, the correct answer is Bacterium.",
      ],
    },
  },

  {
    id: "biology-variety-008",

    question:
      "Which of the following groups contains only invertebrates?",

    options: [
      {
        id: "A",
        text: "Earthworm, snail and cockroach",
      },
      {
        id: "B",
        text: "Frog, lizard and earthworm",
      },
      {
        id: "C",
        text: "Fish, snail and crab",
      },
      {
        id: "D",
        text: "Bird, butterfly and snail",
      },
    ],

    correctAnswer: "A",

    explanation: {
      intro:
        "Invertebrates are animals that do not possess a vertebral column.",

      steps: [
        "Earthworms do not have a backbone.",
        "Snails do not have a backbone.",
        "Cockroaches do not have a backbone.",
        "Frogs, lizards, fish and birds are vertebrates.",
        "Therefore, earthworm, snail and cockroach are all invertebrates.",
      ],
    },
  },

  {
    id: "biology-variety-009",

    question:
      "Which of the following is an example of an organism that reproduces mainly by binary fission?",

    options: [
      {
        id: "A",
        text: "Amoeba",
      },
      {
        id: "B",
        text: "Mango",
      },
      {
        id: "C",
        text: "Frog",
      },
      {
        id: "D",
        text: "Grasshopper",
      },
    ],

    correctAnswer: "A",

    explanation: {
      intro:
        "Binary fission is an asexual reproductive process in which one organism divides into two daughter organisms.",

      steps: [
        "Binary fission is common in many unicellular organisms.",
        "Amoeba reproduces asexually by binary fission.",
        "The parent cell divides to form two daughter cells.",
        "Mango, frog and grasshopper reproduce through sexual processes.",
        "Therefore, the correct answer is Amoeba.",
      ],
    },
  },

  {
    id: "biology-variety-010",

    question:
      "Which of the following groups contains organisms that are all classified as mammals?",

    options: [
      {
        id: "A",
        text: "Whale, bat and dolphin",
      },
      {
        id: "B",
        text: "Whale, shark and dolphin",
      },
      {
        id: "C",
        text: "Bat, eagle and rat",
      },
      {
        id: "D",
        text: "Dolphin, crocodile and whale",
      },
    ],

    correctAnswer: "A",

    explanation: {
      intro:
        "Whales, bats and dolphins are mammals even though some of them live in water or fly.",

      steps: [
        "Whales are aquatic mammals.",
        "Dolphins are aquatic mammals.",
        "Bats are mammals capable of true flight.",
        "Sharks are fish, while crocodiles are reptiles and eagles are birds.",
        "Therefore, whale, bat and dolphin are all mammals.",
      ],
    },
  },
];

export default varietyOfOrganismsQuestions;