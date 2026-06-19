import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { FlashCard } from '../types';

const emptyForm: Omit<FlashCard, 'id'> = {
  topicId: '',
  front: '',
  back: '',
  emoji: '🃏',
};

export default function Flashcards() {
  const [items, setItems] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FlashCard | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.flashcards.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan kad imbas.');
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
    setModalOpen(true);
  }

  function openEdit(item: FlashCard) {
    setEditing(item);
    setForm({
      topicId: item.topicId,
      front: item.front,
      back: item.back,
      emoji: item.emoji,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing) {
        await api.flashcards.update(editing.id, form);
      } else {
        await api.flashcards.create(form);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan kad imbas.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam kad imbas ini?')) return;
    try {
      await api.flashcards.delete(id);
      await load();
    } catch {
      setError('Gagal memadam kad imbas.');
    }
  }

  const columns: Column<FlashCard>[] = [
    { key: 'emoji', header: 'Emoji' },
    { key: 'front', header: 'Depan' },
    { key: 'back', header: 'Belakang' },
    { key: 'topicId', header: 'ID Topik' },
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
        <h2>Kad Imbas</h2>
        <p>Urus kad imbas untuk ulangkaji</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} kad</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Kad
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada kad imbas" />

      <FormModal
        title={editing ? 'Edit Kad Imbas' : 'Tambah Kad Imbas'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <div className="form-group">
          <label>ID Topik</label>
          <input
            value={form.topicId}
            onChange={(e) => setForm({ ...form, topicId: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Emoji</label>
          <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Depan (soalan/istilah)</label>
          <input
            value={form.front}
            onChange={(e) => setForm({ ...form, front: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Belakang (jawapan/definisi)</label>
          <textarea
            value={form.back}
            onChange={(e) => setForm({ ...form, back: e.target.value })}
            required
          />
        </div>
      </FormModal>
    </div>
  );
}