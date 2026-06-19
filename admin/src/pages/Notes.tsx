import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { Note } from '../types';

const emptyForm: Omit<Note, 'id'> = {
  topicId: '',
  title: '',
  content: '',
  keyPoints: [],
  funFact: '',
  imageUrl: '',
};

function linesToArray(text: string): string[] {
  return text.split('\n').map((s) => s.trim()).filter(Boolean);
}

function arrayToLines(arr: string[]): string {
  return arr.join('\n');
}

export default function Notes() {
  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [keyPointsText, setKeyPointsText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.notes.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan nota.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setKeyPointsText('');
    setModalOpen(true);
  }

  function openEdit(item: Note) {
    setEditing(item);
    setForm({
      topicId: item.topicId,
      title: item.title,
      content: item.content,
      keyPoints: item.keyPoints,
      funFact: item.funFact,
      imageUrl: item.imageUrl ?? '',
    });
    setKeyPointsText(arrayToLines(item.keyPoints));
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = { ...form, keyPoints: linesToArray(keyPointsText) };
    try {
      if (editing) {
        await api.notes.update(editing.id, payload);
      } else {
        await api.notes.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan nota.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam nota ini?')) return;
    try {
      await api.notes.delete(id);
      await load();
    } catch {
      setError('Gagal memadam nota.');
    }
  }

  const columns: Column<Note>[] = [
    { key: 'title', header: 'Tajuk' },
    { key: 'topicId', header: 'ID Topik' },
    {
      key: 'keyPoints',
      header: 'Poin Utama',
      render: (r) => `${r.keyPoints.length} poin`,
    },
    {
      key: 'content',
      header: 'Kandungan',
      render: (r) => (r.content.length > 50 ? `${r.content.slice(0, 50)}...` : r.content),
    },
    {
      key: 'actions',
      header: 'Tindakan',
      render: (r) => (
        <div className="table-actions">
          <button type="button" className="btn btn-accent btn-sm" onClick={() => openEdit(r)}>
            Edit
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>
            Padam
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h2>Nota</h2>
        <p>Urus nota pembelajaran untuk setiap topik</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} nota</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Nota
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada nota" />

      <FormModal
        title={editing ? 'Edit Nota' : 'Tambah Nota'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
        large
      >
        <div className="form-group">
          <label>ID Topik</label>
          <input
            value={form.topicId}
            onChange={(e) => setForm({ ...form, topicId: e.target.value })}
            placeholder="t1-y1"
            required
          />
        </div>
        <div className="form-group">
          <label>Tajuk</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Kandungan</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={5}
          />
        </div>
        <div className="form-group">
          <label>Poin Utama (satu baris satu poin)</label>
          <textarea
            value={keyPointsText}
            onChange={(e) => setKeyPointsText(e.target.value)}
            rows={4}
          />
        </div>
        <div className="form-group">
          <label>Fakta Menarik</label>
          <input
            value={form.funFact}
            onChange={(e) => setForm({ ...form, funFact: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>URL Gambar (pilihan)</label>
          <input
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </div>
      </FormModal>
    </div>
  );
}