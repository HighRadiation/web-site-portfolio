// Generated equivalent of `supabase gen types typescript`.
// Until the Supabase CLI can run against a linked project here, this file is
// hand-written from the migrations under `supabase/migrations/`.
// Keep it in sync by running `npm run db:types` when migrations change.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          email: string | null;
          website: string | null;
          updated_at: string;
          is_admin: boolean;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          website?: string | null;
          updated_at?: string;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          website?: string | null;
          updated_at?: string;
          is_admin?: boolean;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          live_link: string | null;
          github_link: string | null;
          technologies: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          live_link?: string | null;
          github_link?: string | null;
          technologies?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          live_link?: string | null;
          github_link?: string | null;
          technologies?: string[] | null;
          created_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          proficiency: number | null;
          category: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          proficiency?: number | null;
          category?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          proficiency?: number | null;
          category?: string | null;
          created_at?: string;
        };
      };
      timeline: {
        Row: {
          id: string;
          user_id: string | null;
          role: string;
          company: string;
          date: string;
          description: string | null;
          type: 'experience' | 'education';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          role: string;
          company: string;
          date: string;
          description?: string | null;
          type: 'experience' | 'education';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          role?: string;
          company?: string;
          date?: string;
          description?: string | null;
          type?: 'experience' | 'education';
          created_at?: string;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
          read: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          created_at?: string;
          read?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          created_at?: string;
          read?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
