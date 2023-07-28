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
    }
    Views: {
      bookmark_tags_all: {
        Row: {
          name: string | null
        }
        Relationships: []
      }
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
