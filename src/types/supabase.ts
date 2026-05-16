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

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '12';
  };
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          bio: string | null;
          bio_tr: string | null;
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
          bio_tr?: string | null;
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
          bio_tr?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          website?: string | null;
          updated_at?: string;
          is_admin?: boolean;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          title_tr: string | null;
          description: string | null;
          description_tr: string | null;
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
          title_tr?: string | null;
          description?: string | null;
          description_tr?: string | null;
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
          title_tr?: string | null;
          description?: string | null;
          description_tr?: string | null;
          image_url?: string | null;
          live_link?: string | null;
          github_link?: string | null;
          technologies?: string[] | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'projects_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: 'skills_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      timeline: {
        Row: {
          id: string;
          user_id: string | null;
          role: string;
          role_tr: string | null;
          company: string;
          company_tr: string | null;
          date: string;
          description: string | null;
          description_tr: string | null;
          type: 'experience' | 'education';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          role: string;
          role_tr?: string | null;
          company: string;
          company_tr?: string | null;
          date: string;
          description?: string | null;
          description_tr?: string | null;
          type: 'experience' | 'education';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          role?: string;
          role_tr?: string | null;
          company?: string;
          company_tr?: string | null;
          date?: string;
          description?: string | null;
          description_tr?: string | null;
          type?: 'experience' | 'education';
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'timeline_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
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
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
