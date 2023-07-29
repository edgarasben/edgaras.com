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
      articles: {
        Row: {
          created_at: string | null
          markdown: string
          slug: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          markdown: string
          slug: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          markdown?: string
          slug?: string
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string | null
          id: number
          link: string
          tags: string[] | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          link: string
          tags?: string[] | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          link?: string
          tags?: string[] | null
          title?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          created_at: string
          id: string
          markdown: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          markdown: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          markdown?: string
          status?: string
        }
        Relationships: []
      }
    }
    Views: {
      bookmark_tags_all: {
        Row: {
          count: number | null
          name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_random_19_digit_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
