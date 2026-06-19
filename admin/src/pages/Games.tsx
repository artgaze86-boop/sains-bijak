import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { Game } from '../types';

const emptyForm: Omit<Game, 'id'> = {
  title: '',
  description: '',
  type: 'match',
  topicId: '',
  year: undefined,
};

const gameTypeLabels: Record<Game['type'], string> = {
  match: 'Padanan',
  sort: 'Susun',
  speed_quiz: 'Kuiz Pantas',
};

export default function Games() {
  const [items, setItems] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Game | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.games.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan permainan.');
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

  function openEdit(item: Game) {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      type: item.type,
      topicId: item.topicId ?? '',
      year: item.year,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      topicId: form.topicId || undefined,
      year: form.year || undefined,
    };
    try {
      if (editing) {
        await api.games.update(editing.id, payload);
      } else {
        await api.games.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan permainan.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam permainan ini?')) return;
    try {
      await api.games.delete(id);
      await load();
    } catch {
      setError('Gagal memadam permainan.');
    }
  }

  const columns: Column<Game>[] = [
    { key: 'title', header: 'Tajuk' },
    {
      key: 'type',
      header: 'Jenis',
      render: (r) => (
        <span className="badge-tag blue">{gameTypeLabels[r.type]}</span>
      ),
    },
    { key: 'topicId', header: 'ID Topik', render: (r) => r.topicId ?? '-' },
    { key: 'year', header: 'Tahun', render: (r) => (r.year ? `Tahun ${r.year}` : '-') },
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
        <h2>Permainan</h2>
        <p>Urus permainan pembelajaran interaktif</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} permainan</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Permainan
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada permainan" />

      <FormModal
        title={editing ? 'Edit Permainan' : 'Tambah Permainan'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
      >
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
        <div className="form-row">
          <div className="form-group">
            <label>Jenis Permainan</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as Game['type'] })}
            >
              <option value="match">Padanan</option>
              <option value="sort">Susun</option>
              <option value="speed_quiz">Kuiz Pantas</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tahun (pilihan)</label>
            <select
              value={form.year ?? ''}
              onChange={(e) =>
                setForm({ ...form, year: e.target.value ? Number(e.target.value) : undefined })
              }
            >
              <option value="">Semua</option>
              {[1, 2, 3, 4, 5, 6].map((y) => (
                <option key={y} value={y}>
                  Tahun {y}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>ID Topik (pilihan)</label>
          <input
            value={form.topicId}
            onChange={(e) => setForm({ ...form, topicId: e.target.value })}
          />
        </div>
      </FormModal>
    </div>
  );
}