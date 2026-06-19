import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { YearLevel } from '../types';

const emptyForm: Omit<YearLevel, 'id'> = {
  year: 1,
  title: '',
  description: '',
  icon: '📚',
  color: '#4CAF50',
  active: true,
};

export default function YearLevels() {
  const [items, setItems] = useState<YearLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<YearLevel | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.yearLevels.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan tahun darjah.');
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

  function openEdit(item: YearLevel) {
    setEditing(item);
    setForm({
      year: item.year,
      title: item.title,
      description: item.description,
      icon: item.icon,
      color: item.color,
      active: item.active,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing) {
        await api.yearLevels.update(editing.id, form);
      } else {
        await api.yearLevels.create(form);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan tahun darjah.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam tahun darjah ini?')) return;
    try {
      await api.yearLevels.delete(id);
      await load();
    } catch {
      setError('Gagal memadam tahun darjah.');
    }
  }

  const columns: Column<YearLevel>[] = [
    { key: 'year', header: 'Tahun', render: (r) => `Tahun ${r.year}` },
    { key: 'icon', header: 'Ikon' },
    { key: 'title', header: 'Tajuk' },
    { key: 'description', header: 'Penerangan' },
    {
      key: 'active',
      header: 'Status',
      render: (r) => (
        <span className={`badge-tag ${r.active ? 'green' : 'orange'}`}>
          {r.active ? 'Aktif' : 'Tidak Aktif'}
        </span>
      ),
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
        <h2>Tahun Darjah</h2>
        <p>Urus tahap tahun 1 hingga 6</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} rekod</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Tahun
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada tahun darjah" />

      <FormModal
        title={editing ? 'Edit Tahun Darjah' : 'Tambah Tahun Darjah'}
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
            <label>Ikon (emoji)</label>
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label>Tajuk</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Contoh: Sains Tahun 1"
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
        <div className="form-row">
          <div className="form-group">
            <label>Warna</label>
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select
              value={form.active ? 'true' : 'false'}
              onChange={(e) => setForm({ ...form, active: e.target.value === 'true' })}
            >
              <option value="true">Aktif</option>
              <option value="false">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </FormModal>
    </div>
  );
}