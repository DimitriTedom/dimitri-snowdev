import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, service, company, message, termsAccepted } = body

    if (!name || !email || !message || !termsAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Try saving to Supabase if configured, otherwise succeed gracefully
    try {
      const supabase = await createSupabaseServerClient()
      if (supabase) {
        await supabase.from('contacts').insert({
          name,
          email,
          company: company || null,
          service: service || 'General Inquiry',
          message,
          status: 'new',
          created_at: new Date().toISOString(),
        })
      }
    } catch (dbErr) {
      console.warn('[contact/route] Supabase insert skipped/failed:', dbErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! I will get back to you shortly.',
    })
  } catch (err) {
    console.error('[contact/route] Error handling contact form:', err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
