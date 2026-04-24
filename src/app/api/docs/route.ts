import { NextResponse } from 'next/server'
import openapiSpec from '@/lib/swagger/openapi.json'

export async function GET() {
  return NextResponse.json(openapiSpec)
}
