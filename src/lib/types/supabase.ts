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
      User: {
        Row: {
          "active?": boolean | null
          "alumni?": boolean | null
          alumnized_at: string | null
          anonymize_date: string | null
          correction_point: number | null
          created_at: string | null
          data_erasure_date: string | null
          displayname: string | null
          email: string | null
          first_name: string | null
          id: number
          image: Json | null
          kind: string | null
          last_name: string | null
          location: string | null
          login: string | null
          phone: string | null
          pool_month: string | null
          pool_year: string | null
          "staff?": boolean | null
          updated_at: string | null
          url: string | null
          usual_first_name: string | null
          usual_full_name: string | null
          wallet: number | null
        }
        Insert: {
          "active?"?: boolean | null
          "alumni?"?: boolean | null
          alumnized_at?: string | null
          anonymize_date?: string | null
          correction_point?: number | null
          created_at?: string | null
          data_erasure_date?: string | null
          displayname?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          image?: Json | null
          kind?: string | null
          last_name?: string | null
          location?: string | null
          login?: string | null
          phone?: string | null
          pool_month?: string | null
          pool_year?: string | null
          "staff?"?: boolean | null
          updated_at?: string | null
          url?: string | null
          usual_first_name?: string | null
          usual_full_name?: string | null
          wallet?: number | null
        }
        Update: {
          "active?"?: boolean | null
          "alumni?"?: boolean | null
          alumnized_at?: string | null
          anonymize_date?: string | null
          correction_point?: number | null
          created_at?: string | null
          data_erasure_date?: string | null
          displayname?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          image?: Json | null
          kind?: string | null
          last_name?: string | null
          location?: string | null
          login?: string | null
          phone?: string | null
          pool_month?: string | null
          pool_year?: string | null
          "staff?"?: boolean | null
          updated_at?: string | null
          url?: string | null
          usual_first_name?: string | null
          usual_full_name?: string | null
          wallet?: number | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
