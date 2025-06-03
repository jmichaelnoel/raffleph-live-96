export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_config: {
        Row: {
          config_key: string
          config_value: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_sessions: {
        Row: {
          created_at: string | null
          expires_at: string
          id: string
          ip_address: unknown | null
          session_token: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          id?: string
          ip_address?: unknown | null
          session_token: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          id?: string
          ip_address?: unknown | null
          session_token?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      approved_raffles: {
        Row: {
          betting_cost: number
          category: string
          convertible_to_cash: boolean | null
          created_at: string | null
          description: string
          end_date: string
          entries_left: number | null
          external_join_url: string
          featured: boolean | null
          id: string
          image_url: string | null
          location: string | null
          organization: string
          organizer_facebook_url: string
          prize: number
          submission_id: string | null
          title: string
          updated_at: string | null
          winning_percentage: number | null
        }
        Insert: {
          betting_cost?: number
          category: string
          convertible_to_cash?: boolean | null
          created_at?: string | null
          description: string
          end_date: string
          entries_left?: number | null
          external_join_url: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string | null
          organization: string
          organizer_facebook_url: string
          prize: number
          submission_id?: string | null
          title: string
          updated_at?: string | null
          winning_percentage?: number | null
        }
        Update: {
          betting_cost?: number
          category?: string
          convertible_to_cash?: boolean | null
          created_at?: string | null
          description?: string
          end_date?: string
          entries_left?: number | null
          external_join_url?: string
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string | null
          organization?: string
          organizer_facebook_url?: string
          prize?: number
          submission_id?: string | null
          title?: string
          updated_at?: string | null
          winning_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "approved_raffles_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "raffle_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      raffle_submissions: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          approved_by: string | null
          betting_cost: number | null
          bundle_pricing: Json | null
          category: string
          convertible_to_cash: boolean | null
          created_at: string | null
          description: string
          draw_date: string | null
          entries_left: number | null
          id: string
          image_url: string | null
          location: string | null
          organization: string | null
          organizer_facebook_url: string | null
          prize: number
          raffle_details_url: string | null
          slot_inquiry_url: string | null
          status: Database["public"]["Enums"]["approval_status"] | null
          submitted_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          betting_cost?: number | null
          bundle_pricing?: Json | null
          category: string
          convertible_to_cash?: boolean | null
          created_at?: string | null
          description: string
          draw_date?: string | null
          entries_left?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          organization?: string | null
          organizer_facebook_url?: string | null
          prize: number
          raffle_details_url?: string | null
          slot_inquiry_url?: string | null
          status?: Database["public"]["Enums"]["approval_status"] | null
          submitted_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          approved_by?: string | null
          betting_cost?: number | null
          bundle_pricing?: Json | null
          category?: string
          convertible_to_cash?: boolean | null
          created_at?: string | null
          description?: string
          draw_date?: string | null
          entries_left?: number | null
          id?: string
          image_url?: string | null
          location?: string | null
          organization?: string | null
          organizer_facebook_url?: string | null
          prize?: number
          raffle_details_url?: string | null
          slot_inquiry_url?: string | null
          status?: Database["public"]["Enums"]["approval_status"] | null
          submitted_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_session: {
        Args: { password: string; ip_addr?: unknown; user_agent_str?: string }
        Returns: {
          success: boolean
          session_token: string
          expires_at: string
        }[]
      }
      create_admin_user: {
        Args: { admin_user_id: string }
        Returns: boolean
      }
      get_audit_logs: {
        Args: { session_token: string; limit_count?: number }
        Returns: {
          id: string
          action: string
          table_name: string
          record_id: string
          old_values: Json
          new_values: Json
          ip_address: unknown
          user_agent: string
          created_at: string
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      log_audit_event: {
        Args:
          | {
              p_action: string
              p_table_name?: string
              p_record_id?: string
              p_old_values?: Json
              p_new_values?: Json
            }
          | {
              p_action: string
              p_table_name?: string
              p_record_id?: string
              p_old_values?: Json
              p_new_values?: Json
              p_session_token?: string
              p_ip_address?: unknown
              p_user_agent?: string
            }
        Returns: string
      }
      toggle_raffle_featured: {
        Args: { raffle_id: string; featured_status: boolean }
        Returns: boolean
      }
      update_admin_password: {
        Args: { current_password: string; new_password: string }
        Returns: boolean
      }
      validate_admin_password: {
        Args: { password_input: string }
        Returns: boolean
      }
      validate_admin_session: {
        Args: { session_token: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      approval_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      approval_status: ["pending", "approved", "rejected"],
    },
  },
} as const
