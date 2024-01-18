interface CategoryType {
  [key: number]: {
    id: number
    title: string
    childIds: number[]
  }
}

export const initialCategories: CategoryType = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: [1, 18, 50, 64],
  },
  1: {
    id: 1,
    title: 'Makeup',
    childIds: [2, 8, 13],
  },
  2: {
    id: 2,
    title: 'Face',
    childIds: [3, 4, 5, 6, 7],
  },
  3: {
    id: 3,
    title: 'Cushion',
    childIds: [],
  },
  4: {
    id: 4,
    title: 'Foundation',
    childIds: [],
  },
  5: {
    id: 5,
    title: 'Loose Powder',
    childIds: [],
  },
  6: {
    id: 6,
    title: 'Bronzer',
    childIds: [],
  },
  7: {
    id: 7,
    title: 'Highlighter',
    childIds: [],
  },
  8: {
    id: 8,
    title: 'Eyes',
    childIds: [9, 10, 11, 12],
  },
  9: {
    id: 9,
    title: 'Eyebrows',
    childIds: [],
  },
  10: {
    id: 10,
    title: 'Eyeshadows',
    childIds: [11, 12, 13, 14, 15, 16, 17, 18],
  },
  11: {
    id: 11,
    title: 'Eyeliner',
    childIds: [],
  },
  12: {
    id: 12,
    title: 'Mascara',
    childIds: [],
  },
  13: {
    id: 13,
    title: 'Lips',
    childIds: [14, 15, 16, 17],
  },
  14: {
    id: 14,
    title: 'Lipstick',
    childIds: [],
  },
  15: {
    id: 15,
    title: 'Lip Cream',
    childIds: [],
  },
  16: {
    id: 16,
    title: 'Lip Liner',
    childIds: [],
  },
  17: {
    id: 17,
    title: 'Lip Tint',
    childIds: [],
  },
  18: {
    id: 18,
    title: 'Skin Care',
    childIds: [19, 22, 26, 34],
  },
  19: {
    id: 19,
    title: 'Eye Care',
    childIds: [20, 21],
  },
  20: {
    id: 20,
    title: 'Eye Serum',
    childIds: [],
  },
  21: {
    id: 21,
    title: 'Eye Mask',
    childIds: [],
  },
  22: {
    id: 22,
    title: 'Lip Care',
    childIds: [23, 24, 25],
  },
  23: {
    id: 23,
    title: 'Lip Balm',
    childIds: [],
  },
  24: {
    id: 24,
    title: 'Lip Mask',
    childIds: [],
  },
  25: {
    id: 25,
    title: 'Lip Scrub',
    childIds: [],
  },
  26: {
    id: 26,
    title: 'Treatment',
    childIds: [27, 28, 29, 30, 31, 32, 33],
  },
  27: {
    id: 27,
    title: 'Acne / Pimple Patch',
    childIds: [],
  },
  28: {
    id: 28,
    title: 'Toner',
    childIds: [],
  },
  29: {
    id: 29,
    title: 'Essence',
    childIds: [],
  },
  30: {
    id: 30,
    title: 'Face Serum',
    childIds: [],
  },
  31: {
    id: 31,
    title: 'Booster',
    childIds: [],
  },
  32: {
    id: 32,
    title: 'Ampoule',
    childIds: [],
  },
  33: {
    id: 33,
    title: 'Nose Pack',
    childIds: [],
  },
  34: {
    id: 34,
    title: 'Cleanser',
    childIds: [35, 36, 37, 38, 39, 40, 41, 42, 43],
  },
  35: {
    id: 35,
    title: 'Face Wash',
    childIds: [],
  },
  36: {
    id: 36,
    title: 'Makeup Remover',
    childIds: [],
  },
  37: {
    id: 37,
    title: 'Cleasing Oil',
    childIds: [],
  },
  38: {
    id: 38,
    title: 'Cleansing Balm',
    childIds: [],
  },
  39: {
    id: 40,
    title: 'Cleansing Cream',
    childIds: [],
  },
  40: {
    id: 40,
    title: 'Cleansing Gel',
    childIds: [],
  },
  41: {
    id: 41,
    title: 'Scrub & Exfoliator',
    childIds: [],
  },
  42: {
    id: 42,
    title: 'Micellar Water',
    childIds: [],
  },
  43: {
    id: 43,
    title: 'Peeling',
    childIds: [],
  },
  44: {
    id: 44,
    title: 'Face Mask',
    childIds: [45, 46, 47, 48, 49],
  },
  45: {
    id: 45,
    title: 'Sheet Mask',
    childIds: [],
  },
  46: {
    id: 46,
    title: 'Clay Mask',
    childIds: [],
  },
  47: {
    id: 47,
    title: 'Wash Off Mask',
    childIds: [],
  },
  48: {
    id: 48,
    title: 'Peel Off Mask',
    childIds: [],
  },
  49: {
    id: 49,
    title: 'Sleeping Mask',
    childIds: [],
  },
  50: {
    id: 50,
    title: 'Bath & Body',
    childIds: [51, 54, 58],
  },
  51: {
    id: 51,
    title: 'Sun Care',
    childIds: [52, 53],
  },
  52: {
    id: 52,
    title: 'Body Sunscreen',
    childIds: [],
  },
  53: {
    id: 53,
    title: 'Body Sun Care',
    childIds: [],
  },
  54: {
    id: 54,
    title: 'Body Cleanser',
    childIds: [55, 56, 57],
  },
  55: {
    id: 55,
    title: 'Body Wash',
    childIds: [],
  },
  56: {
    id: 56,
    title: 'Body Scrub & Exfoliants',
    childIds: [],
  },
  57: {
    id: 57,
    title: 'Hand Wash',
    childIds: [],
  },
  58: {
    id: 58,
    title: 'Body Care',
    childIds: [59, 60, 61, 62, 63],
  },
  59: {
    id: 59,
    title: 'Deodorant',
    childIds: [],
  },
  60: {
    id: 60,
    title: 'Body Lotion / Body Serum',
    childIds: [],
  },
  61: {
    id: 61,
    title: 'Body Oil',
    childIds: [],
  },
  62: {
    id: 62,
    title: 'Body Butter & Cream',
    childIds: [],
  },
  63: {
    id: 63,
    title: 'Hand & Foot Cream',
    childIds: [],
  },
  64: {
    id: 64,
    title: 'Fragrance',
    childIds: [65, 70],
  },
  65: {
    id: 65,
    title: 'Body Fragrance',
    childIds: [66, 67, 68, 69],
  },
  66: {
    id: 66,
    title: 'Eau De Parfum',
    childIds: [],
  },
  67: {
    id: 67,
    title: 'Eau De Toilette',
    childIds: [],
  },
  68: {
    id: 68,
    title: 'Body Mist',
    childIds: [],
  },
  69: {
    id: 69,
    title: 'Perfume Oil',
    childIds: [],
  },
  70: {
    id: 70,
    title: 'Home Fragrance',
    childIds: [71, 72, 73, 74],
  },
  71: {
    id: 71,
    title: 'Essential Oil',
    childIds: [],
  },
  72: {
    id: 72,
    title: 'Aromatherapy',
    childIds: [],
  },
  73: {
    id: 73,
    title: 'Room Spray',
    childIds: [],
  },
  74: {
    id: 74,
    title: 'Scented Candles And Reed Diffuser',
    childIds: [],
  },
}
