
import { supabase } from "@/integrations/supabase/client";
import { Tutorial, Category, Tag } from '@/types';

export const getAllTutorials = async (): Promise<Tutorial[]> => {
  const { data, error } = await supabase
    .from('tutorials')
    .select('*');
  
  if (error) {
    console.error('Error fetching tutorials:', error);
    return [];
  }
  
  return data as Tutorial[];
};

export const getTutorialBySlug = async (slug: string): Promise<Tutorial | undefined> => {
  const { data, error } = await supabase
    .from('tutorials')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching tutorial by slug:', error);
    return undefined;
  }
  
  return data as Tutorial;
};

export const getTutorialsByCategory = async (category: Category): Promise<Tutorial[]> => {
  const { data, error } = await supabase
    .from('tutorials')
    .select('*')
    .eq('category', category);
  
  if (error) {
    console.error('Error fetching tutorials by category:', error);
    return [];
  }
  
  return data as Tutorial[];
};

export const getTutorialsByTag = async (tag: Tag): Promise<Tutorial[]> => {
  const { data, error } = await supabase
    .from('tutorials')
    .select('*')
    .filter('tags', 'cs', `{${tag}}`);
  
  if (error) {
    console.error('Error fetching tutorials by tag:', error);
    return [];
  }
  
  return data as Tutorial[];
};

export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('tutorials')
    .select('category');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  const categories = [...new Set(data.map(item => item.category))];
  return categories as Category[];
};

export const getAllTags = async (): Promise<Tag[]> => {
  const { data, error } = await supabase
    .from('tutorials')
    .select('tags');
  
  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
  
  const allTags = data.flatMap(item => item.tags);
  return [...new Set(allTags)] as Tag[];
};

export const searchTutorials = async (query: string): Promise<Tutorial[]> => {
  const lowerCaseQuery = query.toLowerCase();
  
  const { data, error } = await supabase
    .from('tutorials')
    .select('*')
    .or(`title.ilike.%${lowerCaseQuery}%,description.ilike.%${lowerCaseQuery}%,category.ilike.%${lowerCaseQuery}%`);
  
  if (error) {
    console.error('Error searching tutorials:', error);
    return [];
  }
  
  return data as Tutorial[];
};

// Fallback mock data for development in case the database is not available
export const tutorials: Tutorial[] = [
  {
    id: '1',
    slug: 'cozy-granny-square-blanket',
    title: 'Cozy Granny Square Blanket',
    description: 'A classic granny square blanket perfect for beginners. This project uses basic stitches to create a warm and colorful throw.',
    materials: [
      'Worsted weight yarn in 5 colors',
      '5.0mm crochet hook',
      'Yarn needle',
      'Scissors'
    ],
    instructions: [
      'Chain 4 and join with a slip stitch to form a ring.',
      'Round 1: Ch 3 (counts as dc), work 2 dc in ring, ch 2, [3 dc in ring, ch 2] 3 times, join with sl st to top of beginning ch-3.',
      'Round 2: Sl st to next dc and into ch-2 space, ch 3 (counts as dc), work (2 dc, ch 2, 3 dc) in same ch-2 space, ch 1, [(3 dc, ch 2, 3 dc) in next ch-2 space, ch 1] 3 times, join with sl st to top of beginning ch-3.',
      'Continue pattern for desired size, changing colors as preferred.',
      'Join squares using slip stitch or preferred joining method.',
      'Add border if desired.'
    ],
    category: 'Blankets',
    tags: ['Beginner', 'Home', 'Colorful'],
    image: '/placeholder.svg',
    createdAt: '2023-04-15'
  },
  {
    id: '2',
    slug: 'amigurumi-bunny',
    title: 'Sweet Amigurumi Bunny',
    description: 'Create an adorable stuffed bunny with this intermediate amigurumi pattern. Perfect for gifts or nursery decor.',
    materials: [
      'Sport weight yarn in main color and accent color',
      '3.5mm crochet hook',
      'Fiberfill stuffing',
      'Safety eyes (6mm)',
      'Yarn needle',
      'Stitch markers',
      'Scissors'
    ],
    instructions: [
      'Head: Start with a magic ring.',
      'Round 1: 6 sc in magic ring (6)',
      'Round 2: Inc in each st around (12)',
      'Round 3: [Sc in next st, inc in next st] 6 times (18)',
      'Round 4: [Sc in next 2 sts, inc in next st] 6 times (24)',
      'Round 5: [Sc in next 3 sts, inc in next st] 6 times (30)',
      'Round 6-10: Sc in each st around (30)',
      'Round 11: [Sc in next 3 sts, dec] 6 times (24)',
      'Round 12: [Sc in next 2 sts, dec] 6 times (18)',
      'Insert safety eyes between rounds 7 and 8, about 6 stitches apart.',
      'Round 13: [Sc in next st, dec] 6 times (12)',
      'Stuff the head firmly.',
      'Round 14: Dec 6 times (6)',
      'Fasten off, leaving a tail for sewing.',
      'Continue with body, ears, arms, and legs following the same pattern technique.'
    ],
    category: 'Amigurumi',
    tags: ['Intermediate', 'Toys', 'Gift'],
    image: '/placeholder.svg',
    createdAt: '2023-05-22'
  },
  {
    id: '3',
    slug: 'market-mesh-bag',
    title: 'Eco-Friendly Market Mesh Bag',
    description: 'A stylish and sustainable mesh bag perfect for farmers markets or beach trips. This bag is lightweight yet strong.',
    materials: [
      'Cotton yarn (approx. 250g)',
      '4.5mm crochet hook',
      'Stitch markers',
      'Yarn needle'
    ],
    instructions: [
      'Chain 35 and join with a slip stitch to form a ring (base of bag).',
      'Round 1: Ch 1, sc in each ch around, join with sl st to first sc (35 sc).',
      'Round 2: Ch 1, sc in each sc around, join with sl st to first sc (35 sc).',
      'Round 3: Ch 1, sc in same st, *ch 3, skip 2 sts, sc in next st; repeat from * around, ending with ch 3, join with sl st to first sc.',
      'Round 4: Ch 1, sc in first sc, *3 sc in ch-3 space, sc in next sc; repeat from * around, join with sl st to first sc.',
      'Round 5: Ch 1, sc in same st, *ch 3, skip 2 sts, sc in next st; repeat from * around, ending with ch 3, join with sl st to first sc.',
      'Continue alternating rounds 4 and 5 until bag reaches desired height (approximately 20-25 rounds).',
      'For handles: Ch 35, skip 17 sts, sl st into 18th st, ch 35, sl st back to beginning.',
      'Work sc around each handle chain for stability.',
      'Fasten off and weave in ends.'
    ],
    category: 'Bags',
    tags: ['Intermediate', 'Eco-friendly', 'Home'],
    image: '/placeholder.svg',
    createdAt: '2023-06-10'
  },
  {
    id: '4',
    slug: 'waffle-stitch-dishcloth',
    title: 'Textured Waffle Stitch Dishcloth',
    description: 'Learn the popular waffle stitch with this practical dishcloth pattern. The textured pattern is perfect for scrubbing dishes.',
    materials: [
      '100% cotton yarn',
      '4.5mm crochet hook',
      'Yarn needle'
    ],
    instructions: [
      'Ch 31 (or any multiple of 3 + 1).',
      'Row 1: Dc in 4th ch from hook and in each ch across. (29 dc)',
      'Row 2: Ch 1, sc in same st, *skip 1 dc, 3 dc in next dc, skip 1 dc, sc in next dc; repeat from * across to last 2 sts, skip 1 dc, dc in top of turning ch. Turn.',
      'Row 3: Ch 3 (counts as dc), dc in each dc and sc across. Turn.',
      'Row 4: Ch 1, sc in first st, *skip 1 dc, 3 dc in next dc, skip 1 dc, sc in next dc; repeat from * across to end, working last sc in top of turning ch. Turn.',
      'Repeat Rows 3-4 until dishcloth is square (approximately 10-12 pattern repeats).',
      'Fasten off and weave in ends.'
    ],
    category: 'Coasters',
    tags: ['Beginner', 'Home', 'Quick'],
    image: '/placeholder.svg',
    createdAt: '2023-07-05'
  },
  {
    id: '5',
    slug: 'cable-knit-beanie',
    title: 'Cabled Winter Beanie',
    description: 'A cozy cabled beanie perfect for cold weather. This pattern features beautiful texture and a comfortable fit.',
    materials: [
      'Worsted weight yarn (100g)',
      '5.0mm crochet hook',
      '6.0mm crochet hook',
      'Stitch markers',
      'Yarn needle',
      'Faux fur pom-pom (optional)'
    ],
    instructions: [
      'With 5.0mm hook, ch 8, join with sl st to form ring.',
      'Round 1: Ch 3 (counts as dc), 15 dc in ring, join with sl st to top of ch-3. (16 dc)',
      'Round 2: Ch 3, dc in same st, 2 dc in each st around, join with sl st to top of ch-3. (32 dc)',
      'Round 3: Ch 3, dc in next st, *2 dc in next st, dc in next st; repeat from * around, join with sl st to top of ch-3. (48 dc)',
      'Round 4: Ch 3, dc in each st around, join with sl st to top of ch-3.',
      'Round 5-6: Repeat Round 4.',
      'Switch to 6.0mm hook.',
      'Round 7 (Cable Round): Ch 3, *fpdc around next st, bpdc around next st; repeat from * around, join with sl st to top of ch-3.',
      'Rounds 8-16: Repeat Round 7.',
      'Switch back to 5.0mm hook.',
      'Round 17: Ch 3, *dc2tog, dc in next 4 sts; repeat from * around, join with sl st to top of ch-3.',
      'Round 18: Ch 3, *dc2tog, dc in next 3 sts; repeat from * around, join with sl st to top of ch-3.',
      'Round 19: Ch 3, *dc2tog, dc in next 2 sts; repeat from * around, join with sl st to top of ch-3.',
      'Round 20: Ch 3, *dc2tog, dc in next st; repeat from * around, join with sl st to top of ch-3.',
      'Round 21: Ch 3, *dc2tog; repeat from * around, join with sl st to top of ch-3.',
      'Fasten off, leaving long tail for sewing.',
      'Thread tail through remaining stitches and pull tight to close.',
      'Attach pom-pom if desired.'
    ],
    category: 'Hats',
    tags: ['Intermediate', 'Apparel', 'Seasonal'],
    image: '/placeholder.svg',
    createdAt: '2023-08-12'
  },
  {
    id: '6',
    slug: 'modern-wall-hanging',
    title: 'Modern Macramé-Inspired Wall Hanging',
    description: 'Create a trendy wall hanging combining crochet and macramé techniques. Perfect for adding texture to any room.',
    materials: [
      'Bulky weight cotton yarn in main color',
      'Bulky weight cotton yarn in 2-3 accent colors',
      '8.0mm crochet hook',
      'Wooden dowel (30-40cm length)',
      'Yarn needle',
      'Scissors'
    ],
    instructions: [
      'For the base: With main color, ch 40.',
      'Row 1: Sc in 2nd ch from hook and in each ch across. (39 sc)',
      'Row 2: Ch 1, turn, sc in each sc across.',
      'Rows 3-5: Repeat Row 2.',
      'Row 6: Ch 1, turn, *sc in next 3 sts, ch 5, skip 5 sts; repeat from * across, ending with sc in last 4 sts.',
      'Rows 7-9: Ch 1, turn, sc in each sc and ch across.',
      'Row 10-12: Repeat Row 2.',
      'Fasten off leaving long tail.',
      'For fringe: Cut 40 strands of yarn in various colors, each 50cm long.',
      'Fold each strand in half and use crochet hook to pull folded end through bottom edge of wall hanging, creating a loop.',
      'Pull loose ends through loop and tighten to secure.',
      'Trim fringe to desired length, creating a diagonal or V-shape if desired.',
      'Attach dowel by folding top edge over dowel and sewing in place.',
      'Add hanging cord to dowel ends.'
    ],
    category: 'Decor',
    tags: ['Intermediate', 'Home', 'Colorful'],
    image: '/placeholder.svg',
    createdAt: '2023-09-03'
  }
];
