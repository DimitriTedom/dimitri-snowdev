export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string | null
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          provider: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          provider?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          provider?: string | null
          title?: string
        }
        Relationships: []
      }
      ai_chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          messages: Json | null
          persona_ref: string | null
          session_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          messages?: Json | null
          persona_ref?: string | null
          session_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          messages?: Json | null
          persona_ref?: string | null
          session_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          cover_url: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          mdx_path: string | null
          persona_id: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          mdx_path?: string | null
          persona_id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          mdx_path?: string | null
          persona_id?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          persona_ref: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          persona_ref?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          persona_ref?: string | null
          status?: string | null
        }
        Relationships: []
      }
      cv_templates: {
        Row: {
          custom_sections: Json | null
          highlighted_achievements: string[] | null
          highlighted_projects: string[] | null
          highlighted_skills: string[] | null
          id: string
          objective: string | null
          persona_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          custom_sections?: Json | null
          highlighted_achievements?: string[] | null
          highlighted_projects?: string[] | null
          highlighted_skills?: string[] | null
          id?: string
          objective?: string | null
          persona_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          custom_sections?: Json | null
          highlighted_achievements?: string[] | null
          highlighted_projects?: string[] | null
          highlighted_skills?: string[] | null
          id?: string
          objective?: string | null
          persona_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cv_templates_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: true
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
        ]
      }
      experience_personas: {
        Row: {
          experience_id: string
          persona_id: string
        }
        Insert: {
          experience_id: string
          persona_id: string
        }
        Update: {
          experience_id?: string
          persona_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "experience_personas_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_personas_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string
          created_at: string | null
          description: string | null
          duration: string
          end_date: string | null
          id: string
          position: string
          skills: string[] | null
          sort_order: number | null
          start_date: string | null
          type: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description?: string | null
          duration: string
          end_date?: string | null
          id?: string
          position: string
          skills?: string[] | null
          sort_order?: number | null
          start_date?: string | null
          type?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string | null
          duration?: string
          end_date?: string | null
          id?: string
          position?: string
          skills?: string[] | null
          sort_order?: number | null
          start_date?: string | null
          type?: string | null
        }
        Relationships: []
      }
      personas: {
        Row: {
          accent_color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          theme_config: Json | null
        }
        Insert: {
          accent_color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          theme_config?: Json | null
        }
        Update: {
          accent_color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          theme_config?: Json | null
        }
        Relationships: []
      }
      project_personas: {
        Row: {
          persona_id: string
          project_id: string
          relevance: number | null
        }
        Insert: {
          persona_id: string
          project_id: string
          relevance?: number | null
        }
        Update: {
          persona_id?: string
          project_id?: string
          relevance?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_personas_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_personas_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          case_study: string | null
          category: string
          challenge: string | null
          code_url: string | null
          created_at: string | null
          date: string | null
          demo_url: string | null
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          image_url_2: string | null
          image_url_3: string | null
          is_published: boolean | null
          result: string | null
          slug: string
          solution: string | null
          sort_order: number | null
          tags: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          case_study?: string | null
          category: string
          challenge?: string | null
          code_url?: string | null
          created_at?: string | null
          date?: string | null
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          image_url_2?: string | null
          image_url_3?: string | null
          is_published?: boolean | null
          result?: string | null
          slug: string
          solution?: string | null
          sort_order?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          case_study?: string | null
          category?: string
          challenge?: string | null
          code_url?: string | null
          created_at?: string | null
          date?: string | null
          demo_url?: string | null
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          image_url_2?: string | null
          image_url_3?: string | null
          is_published?: boolean | null
          result?: string | null
          slug?: string
          solution?: string | null
          sort_order?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          is_active: boolean | null
          persona_id: string | null
          price_label: string | null
          sort_order: number | null
          title: string
        }
        Insert: {
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          persona_id?: string | null
          price_label?: string | null
          sort_order?: number | null
          title: string
        }
        Update: {
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          persona_id?: string | null
          price_label?: string | null
          sort_order?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_personas: {
        Row: {
          persona_id: string
          skill_id: string
        }
        Insert: {
          persona_id: string
          skill_id: string
        }
        Update: {
          persona_id?: string
          skill_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_personas_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_personas_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          icon_slug: string | null
          id: string
          name: string
          proficiency: number | null
          sort_order: number | null
        }
        Insert: {
          category: string
          icon_slug?: string | null
          id?: string
          name: string
          proficiency?: number | null
          sort_order?: number | null
        }
        Update: {
          category?: string
          icon_slug?: string | null
          id?: string
          name?: string
          proficiency?: number | null
          sort_order?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          persona_id: string | null
          position: string | null
          rating: number | null
        }
        Insert: {
          author: string
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          persona_id?: string | null
          position?: string | null
          rating?: number | null
        }
        Update: {
          author?: string
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          persona_id?: string | null
          position?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

