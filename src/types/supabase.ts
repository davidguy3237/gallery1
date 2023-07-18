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
      comments: {
        Row: {
          body: string
          created_at: string
          dislikes: number
          id: number
          likes: number
          post_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          created_at?: string
          dislikes?: number
          id?: never
          likes?: number
          post_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          dislikes?: number
          id?: never
          likes?: number
          post_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      person_tags: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      post_person_tags: {
        Row: {
          created_at: string
          id: number
          post_id: string
          tag_id: number
        }
        Insert: {
          created_at?: string
          id?: never
          post_id: string
          tag_id: number
        }
        Update: {
          created_at?: string
          id?: never
          post_id?: string
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_person_tags_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_person_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "person_tags"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          body: string | null
          created_at: string | null
          id: string
          original_date: string | null
          source: string | null
          thumbnail_url: string
          title: string | null
          updated_at: string | null
          url: string
          user_id: string
          views: number
        }
        Insert: {
          body?: string | null
          created_at?: string | null
          id?: string
          original_date?: string | null
          source?: string | null
          thumbnail_url: string
          title?: string | null
          updated_at?: string | null
          url: string
          user_id: string
          views?: number
        }
        Update: {
          body?: string | null
          created_at?: string | null
          id?: string
          original_date?: string | null
          source?: string | null
          thumbnail_url?: string
          title?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
