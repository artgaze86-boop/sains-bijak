import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { Experiment } from '../types';

const emptyForm: Omit<Experiment, 'id'> = {
  topicId: '',
  title: '',
  description: '',
  materials: [],
  steps: [],
  safetyTips: [],
  funFact: '',
};

function linesToArray(text: string): string[] {
  return text.split('\n').map((s) => s.trim()).filter(Boolean);
}

export default function Experiments() {
  const [items, setItems] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Experiment | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [materialsText, setMaterialsText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [safetyText, setSafetyText] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.experiments.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan eksperimen.');
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
    setMaterialsText('');
    setStepsText('');
    setSafetyText('');
    setModalOpen(true);
  }

  function openEdit(item: Experiment) {
    setEditing(item);
    setForm({
      topicId: item.topicId,
      title: item.title,
      description: item.description,
      materials: item.materials,
      steps: item.steps,
      safetyTips: item.safetyTips,
      funFact: item.funFact,
    });
    setMaterialsText(item.materials.join('\n'));
    setStepsText(item.steps.join('\n'));
    setSafetyText(item.safetyTips.join('\n'));
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      materials: linesToArray(materialsText),
      steps: linesToArray(stepsText),
      safetyTips: linesToArray(safetyText),
    };
    try {
      if (editing) {
        await api.experiments.update(editing.id, payload);
      } else {
        await api.experiments.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch {
      setError('Gagal menyimpan eksperimen.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam eksperimen ini?')) return;
    try {
      await api.experiments.delete(id);
      await load();
    } catch {
      setError('Gagal memadam eksperimen.');
    }
  }

  const columns: Column<Experiment>[] = [
    { key: 'title', header: 'Tajuk' },
    { key: 'topicId', header: 'ID Topik' },
    {
      key: 'materials',
      header: 'Bahan',
      render: (r) => `${r.materials.length} item`,
    },
    {
      key: 'steps',
      header: 'Langkah',
      render: (r) => `${r.steps.length} langkah`,
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
        <h2>Eksperimen</h2>
        <p>Urus aktiviti eksperimen sains</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} eksperimen</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Eksperimen
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada eksperimen" />

      <FormModal
        title={editing ? 'Edit Eksperimen' : 'Tambah Eksperimen'}
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
          <label>Penerangan</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Bahan (satu baris satu item)</label>
          <textarea value={materialsText} onChange={(e) => setMaterialsText(e.target.value)} rows={3} />
        </div>
        <div className="form-group">
          <label>Langkah-langkah (satu baris satu langkah)</label>
          <textarea value={stepsText} onChange={(e) => setStepsText(e.target.value)} rows={4} />
        </div>
        <div className="form-group">
          <label>Tips Keselamatan (satu baris satu tip)</label>
          <textarea value={safetyText} onChange={(e) => setSafetyText(e.target.value)} rows={3} />
        </div>
        <div className="form-group">
          <label>Fakta Menarik</label>
          <input
            value={form.funFact}
            onChange={(e) => setForm({ ...form, funFact: e.target.value })}
          />
        </div>
      </FormModal>
    </div>
  );
}