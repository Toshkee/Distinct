// Portfolio from distinct.co.me/en/portfolio. `cat` drives the filter chips.
export const projects = [
  { name: 'One&Only Portonovi', img: 'one-and-only.png', tags: ['Graphic Design'] },
  { name: 'Jumeirah Marsa Al Arab', img: 'jumeirah.jpg', tags: ['Graphic Design'] },
  { name: 'Habitat Montenegro', img: 'habitat-montenegro.png', tags: ['Digital Transformation', 'Organisational Design', 'Operations Consulting', 'Accounting'] },
  { name: 'Oblun Eco Resort', img: 'oblun.png', tags: ['Branding', 'Digital Marketing', 'Photography', 'Accounting'] },
  { name: 'Doding', img: 'doding.png', tags: ['Digital Transformation', 'Operations Consulting', 'Digital Marketing', 'Photography'] },
  { name: 'Habitat Flowers & Gifts', img: 'habitat-flowers.png', tags: ['Branding', 'Marketing Plan and Strategy', 'Digital Marketing', 'Photography'] },
  { name: 'Forza Porto', img: 'forza-porto.png', tags: ['Digital Marketing', 'Photography', 'Graphic Design'] },
  { name: 'Sofa Bed', img: 'sofa-bed.png', tags: ['Digital Transformation', 'Organisational Design', 'Branding', 'Accounting'] },
  { name: 'Forza Hotels', img: 'forza-hotels.jpg', tags: ['Digital Marketing', 'Photography'] },
  { name: 'ASYS', img: 'asys.png', tags: ['Visual Identity', 'Website'] },
  { name: 'Authentic Luxury', img: 'authentic-luxury.jpg', tags: ['Visual Identity'] },
  { name: 'iCentar', img: 'icentar.png', tags: ['Event Management'] },
  { name: 'Pamico', img: 'pamico.jpg', tags: ['Company Registration', 'Accounting', 'Operations Consulting', 'Visual Identity'] },
  { name: 'One Design', img: 'one-design.png', tags: ['Accounting', 'Operations Consulting', 'Photography'] },
  { name: 'Bond Up Shanghai', img: 'bond-up.png', tags: ['Visual Identity'] },
  { name: 'Cosmonauts', img: 'cosmonauts.png', tags: ['Visual Identity'] },
  { name: 'Jobzilla', img: 'jobzilla.png', tags: ['Social Media Strategy'] },
  { name: 'PHCI Doktorica Mica', img: 'phci.png', tags: ['Financial Modeling', 'Operations Consulting', 'Accounting'] },
  { name: 'AAL Ana Đukanović', img: 'aal-ana.png', tags: ['Business Analysis', 'Accounting', 'Tax Advisory'] },
  { name: 'AAL Mitar Šušić', img: 'aal-mitar.png', tags: ['Visual Identity'] },
  { name: 'Mirvel Company', img: 'mirvel.jpg', tags: ['Accounting', 'Operations Consulting'] },
];

const CATEGORY = {
  finance: ['Accounting', 'Tax Advisory', 'Financial Modeling', 'Company Registration'],
  marketing: ['Graphic Design', 'Digital Marketing', 'Photography', 'Branding', 'Marketing Plan and Strategy', 'Visual Identity', 'Website', 'Event Management', 'Social Media Strategy'],
  consulting: ['Digital Transformation', 'Organisational Design', 'Operations Consulting', 'Business Analysis'],
};

export const categoriesOf = (p) => Object.keys(CATEGORY).filter((c) => p.tags.some((t) => CATEGORY[c].includes(t)));
