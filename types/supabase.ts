export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favs: {
        Row: {
          created_at: string | null
          id: number
          link: string | null
          tags: string[] | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          link?: string | null
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          link?: string | null
          tags?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          created_at: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
