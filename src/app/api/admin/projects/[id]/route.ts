import { NextResponse, NextRequest } from 'next/server';
import { requireAdminApi } from '@/lib/auth';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  const { supabase, user } = auth;

  const { error } = await supabase.from('projects').delete().eq('id', id).eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Project deleted successfully' });
}
