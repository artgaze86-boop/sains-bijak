import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { Topic } from '../types';

const emptyForm: Omit<Topic, 'id'> = {
  title: '',
  description: '',
  year: 1,
  icon: '📖',
  order: 1,
};

export default function Topics() {
  const [items, setItems] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Topic | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.topics.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan topik.');
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

  function openEdit(item: Topic) {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      year: item.year,
      icon: item.icon,
      order: item.order,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing) {
        await api.topics.update(editing.id, form);
      } else {
        await api.topics.create(form);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan topik.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam topik ini?')) return;
    try {
      await api.topics.delete(id);
      await load();
    } catch {
      setError('Gagal memadam topik.');
    }
  }

  const columns: Column<Topic>[] = [
    { key: 'icon', header: 'Ikon' },
    { key: 'title', header: 'Tajuk' },
    { key: 'year', header: 'Tahun', render: (r) => `Tahun ${r.year}` },
    { key: 'order', header: 'Susunan' },
    {
      key: 'description',
      header: 'Penerangan',
      render: (r) => (r.description.length > 60 ? `${r.description.slice(0, 60)}...` : r.description),
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
        <h2>Topik</h2>
        <p>Urus topik pembelajaran sains</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} topik</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Topik
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada topik" />

      <FormModal
        title={editing ? 'Edit Topik' : 'Tambah Topik'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <div className="form-row">
          <div className="form-group">
            <label>Tahun</label>
            <select
              value={form.year}
              onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
            >
              {[1, 2, 3, 4, 5, 6].map((y) => (
                <option key={y} value={y}>
                  Tahun {y}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Susunan</label>
            <input
              type="number"
              min={1}
              value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Ikon (emoji)</label>
          <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
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
          <label>Penerangan</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
      </FormModal>
    </div>
  );
}