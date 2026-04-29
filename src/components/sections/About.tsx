import { createClient } from '@/lib/supabase/server';
import { Skill } from '@/types/database';
import { AboutSectionClient } from './AboutSectionClient';

export const AboutSection = async (): Promise<React.JSX.Element> => {
  const supabase = await createClient();
  const { data: skillsData } = await supabase.from('skills').select('*').order('created_at');

  const skills = skillsData || [];

  // Group skills by category
  const groupedSkills = skills.reduce((acc: Record<string, string[]>, skill: Skill) => {
    const category = skill.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.name);
    return acc;
  }, {});

  const categories = Object.keys(groupedSkills);

  return <AboutSectionClient categories={categories} groupedSkills={groupedSkills} />;
};
