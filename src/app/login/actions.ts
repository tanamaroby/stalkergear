'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { LoginFormData } from '@/lib/types/login'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: LoginFormData) {
    const supabase = createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.email,
        password: formData.password,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return 1
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
