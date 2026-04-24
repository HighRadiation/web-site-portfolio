/*
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Skill } from '@/types/database'

export async function GET() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('proficiency', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Group by category
  const groupedSkills = (data as Skill[]).reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return NextResponse.json(groupedSkills)
}
*/

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data, error } = await supabase.from('skills').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
