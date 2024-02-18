interface TeamMember {
  name: string;
  role: string;
  bio: string;
  contributions: string[];
  link: string;
  imageTag: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Denis Shchegolenkov',
    role: 'Team Lead',
    bio: "As a student, I worked as a graphic designer for an agency, crafting solutions in the realm of visual communication. I have experience working as an automation systems engineer. Now I'm fervently dedicated to frontend development because I aspire to craft interfaces that are both aesthetically pleasing and highly functional, ultimately enhancing the user experience. Frontend development affords me the opportunity to leverage my design expertise and seamlessly integrate it with my keen interest in technologies",
    contributions: [
      'Login Page',
      'Detailed Product Page',
      'Basket Page',
      'Not Found Page',
      'Team Management',
    ],
    link: 'shchegolenkov',
    imageTag: 'den',
  },
  {
    name: 'Aliaksey Mialiokhin',
    role: 'Frontend Developer',
    bio: "Since the moment a computer entered into my life,  I've been involved in front-end development. I created my first website around 2007 using Microsoft Office FrontPage. It became my hobby throughout my life. After working as a geodesist engineer for 8 years, I decided to make my hobby as profession.",
    contributions: ['Registration Page', 'Profile Page', 'Commercetools Integration'],
    link: 'Mialiokhin',
    imageTag: 'aliaksey',
  },
  {
    name: 'Gleb Elenev',
    role: 'Frontend Developer',
    bio: '28 y.o. mechanical design engineer dreaming to become frontend developer.',
    contributions: [
      'Main Page',
      'Catalog Page',
      'About us Page',
      'Development Environment Configuration',
    ],
    link: 'gl-el',
    imageTag: 'gleb',
  },
];
