'use client';

import { useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { IconUpload } from './icons';

interface ProjectImageUploadProps {
  name: string;
  labels: {
    label: string;
    hint: string;
    chooseFile: string;
    uploading: string;
    remove: string;
  };
}

const BUCKET = 'project-images';
const MAX_BYTES = 2 * 1024 * 1024;

export const ProjectImageUpload = ({
  name,
  labels,
}: ProjectImageUploadProps): React.JSX.Element => {
  const [url, setUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function upload(file: File): Promise<void> {
    setError(null);
    if (file.size > MAX_BYTES) {
      setError('File too large (max 2 MB)');
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const ext = file.name.split('.').pop() ?? 'png';
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (e) {
      setError((e as Error).message ?? 'Upload failed');
    } finally {
      setBusy(false);
    }
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0];
    if (file) void upload(file);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void upload(file);
  }

  return (
    <>
      <div
        className={`dropzone${dragging ? ' dragging' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
      >
        {url ? (
          <img src={url} alt="" className="preview" />
        ) : (
          <span className="icon">
            <IconUpload />
          </span>
        )}
        <div style={{ flex: 1 }}>
          <div className="lab">
            {busy ? labels.uploading : url ? new URL(url).pathname.split('/').pop() : labels.label}
          </div>
          <div className="hint">{labels.hint}</div>
          {error && <div className="form-error">{error}</div>}
        </div>
        {url ? (
          <button
            type="button"
            className="btn sm"
            onClick={(e) => {
              e.stopPropagation();
              setUrl('');
            }}
          >
            {labels.remove}
          </button>
        ) : (
          <button
            type="button"
            className="btn sm"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            {labels.chooseFile}
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onPick}
          style={{ display: 'none' }}
        />
      </div>
      <input type="hidden" name={name} value={url} />
    </>
  );
};
