import type { Database } from './supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Skill = Database['public']['Tables']['skills']['Row'];
export type TimelineItem = Database['public']['Tables']['timeline']['Row'];
export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
