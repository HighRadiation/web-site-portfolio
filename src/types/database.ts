export interface Profile {
  id: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  website: string | null;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  live_link: string | null;
  github_link: string | null;
  technologies: string[] | null;
  created_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  proficiency: number | null;
  category: string | null;
  created_at: string;
}
