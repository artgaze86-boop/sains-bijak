import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { Badge } from '../types';

const emptyForm: Omit<Badge, 'id'> = {
  name: '',
  description: '',
  icon: '🏅',
  topicId: '',
  criteria: '',
};

export default function Badges() {
  const [items, setItems] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Badge | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.badges.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan lencana.');
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

  function openEdit(item: Badge) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      icon: item.icon,
      topicId: item.topicId ?? '',
      criteria: item.criteria ?? '',
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      topicId: form.topicId || undefined,
      criteria: form.criteria || undefined,
    };
    try {
      if (editing) {
        await api.badges.update(editing.id, payload);
      } else {
        await api.badges.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan lencana.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam lencana ini?')) return;
    try {
      await api.badges.delete(id);
      await load();
    } catch {
      setError('Gagal memadam lencana.');
    }
  }

  const columns: Column<Badge>[] = [
    { key: 'icon', header: 'Ikon' },
    { key: 'name', header: 'Nama' },
    {
      key: 'description',
      header: 'Penerangan',
      render: (r) => (r.description.length > 50 ? `${r.description.slice(0, 50)}...` : r.description),
    },
    { key: 'topicId', header: 'ID Topik', render: (r) => r.topicId ?? '-' },
    { key: 'criteria', header: 'Kriteria', render: (r) => r.criteria ?? '-' },
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
        <h2>Lencana</h2>
        <p>Urus lencana pencapaian murid</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} lencana</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Lencana
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada lencana" />

      <FormModal
        title={editing ? 'Edit Lencana' : 'Tambah Lencana'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <div className="form-group">
          <label>Ikon (emoji)</label>
          <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Nama</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Penerangan</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>ID Topik (pilihan)</label>
          <input
            value={form.topicId}
            onChange={(e) => setForm({ ...form, topicId: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Kriteria Perolehan</label>
          <input
            value={form.criteria}
            onChange={(e) => setForm({ ...form, criteria: e.target.value })}
            placeholder="Contoh: Selesaikan kuiz dengan 80% skor"
          />
        </div>
      </FormModal>
    </div>
  );
}