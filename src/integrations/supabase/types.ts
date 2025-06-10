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
      bundle_pricing: {
        Row: {
          created_at: string
          id: string
          price: number
          raffle_id: string
          slots: number
        }
        Insert: {
          created_at?: string
          id?: string
          price: number
          raffle_id: string
          slots: number
        }
        Update: {
          created_at?: string
          id?: string
          price?: number
          raffle_id?: string
          slots?: number
        }
        Relationships: [
          {
            foreignKeyName: "bundle_pricing_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
        ]
      }
      consolation_prizes: {
        Row: {
          created_at: string
          id: string
          images: string[] | null
          is_cash: boolean | null
          raffle_id: string
          title: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          images?: string[] | null
          is_cash?: boolean | null
          raffle_id: string
          title: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          images?: string[] | null
          is_cash?: boolean | null
          raffle_id?: string
          title?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "consolation_prizes_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
        ]
      }
      raffles: {
        Row: {
          approved: boolean | null
          batch_number: string | null
          buying_slots_url: string
          category: Database["public"]["Enums"]["raffle_category"]
          convertible_to_cash: boolean | null
          cost_per_slot: number
          created_at: string
          description: string
          draw_date: string | null
          facebook_page_url: string
          grand_prize: string
          grand_prize_images: string[] | null
          grand_prize_value: number
          id: string
          organization_name: string
          raffle_link: string
          slug: string
          title: string
          total_slots: number
          updated_at: string
        }
        Insert: {
          approved?: boolean | null
          batch_number?: string | null
          buying_slots_url: string
          category: Database["public"]["Enums"]["raffle_category"]
          convertible_to_cash?: boolean | null
          cost_per_slot: number
          created_at?: string
          description: string
          draw_date?: string | null
          facebook_page_url: string
          grand_prize: string
          grand_prize_images?: string[] | null
          grand_prize_value: number
          id?: string
          organization_name: string
          raffle_link: string
          slug: string
          title: string
          total_slots: number
          updated_at?: string
        }
        Update: {
          approved?: boolean | null
          batch_number?: string | null
          buying_slots_url?: string
          category?: Database["public"]["Enums"]["raffle_category"]
          convertible_to_cash?: boolean | null
          cost_per_slot?: number
          created_at?: string
          description?: string
          draw_date?: string | null
          facebook_page_url?: string
          grand_prize?: string
          grand_prize_images?: string[] | null
          grand_prize_value?: number
          id?: string
          organization_name?: string
          raffle_link?: string
          slug?: string
          title?: string
          total_slots?: number
          updated_at?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          created_at: string
          default_social_image: string | null
          favicon_url: string | null
          id: string
          og_site_name: string | null
          site_description: string | null
          site_title: string | null
          theme_color: string | null
          twitter_handle: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_social_image?: string | null
          favicon_url?: string | null
          id?: string
          og_site_name?: string | null
          site_description?: string | null
          site_title?: string | null
          theme_color?: string | null
          twitter_handle?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_social_image?: string | null
          favicon_url?: string | null
          id?: string
          og_site_name?: string | null
          site_description?: string | null
          site_title?: string | null
          theme_color?: string | null
          twitter_handle?: string | null
          updated_at?: string
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
      raffle_category: "Cars" | "Motorcycle" | "Gadgets" | "Cash"
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
      raffle_category: ["Cars", "Motorcycle", "Gadgets", "Cash"],
    },
  },
} as const
