import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { Quiz, QuizQuestion } from '../types';

const emptyForm: Omit<Quiz, 'id'> = {
  topicId: '',
  title: '',
  questions: [],
  timeLimit: undefined,
};

const sampleQuestion: QuizQuestion = {
  id: 'q1',
  type: 'multiple_choice',
  question: 'Soalan contoh?',
  options: ['Pilihan A', 'Pilihan B', 'Pilihan C'],
  correctAnswer: 'Pilihan A',
  explanation: 'Penjelasan jawapan.',
  points: 10,
};

export default function Quizzes() {
  const [items, setItems] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Quiz | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [questionsJson, setQuestionsJson] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.quizzes.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan kuiz.');
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
    setQuestionsJson(JSON.stringify([sampleQuestion], null, 2));
    setModalOpen(true);
  }

  function openEdit(item: Quiz) {
    setEditing(item);
    setForm({
      topicId: item.topicId,
      title: item.title,
      questions: item.questions,
      timeLimit: item.timeLimit,
    });
    setQuestionsJson(JSON.stringify(item.questions, null, 2));
    setModalOpen(true);
  }

  async function handleSave() {
    let questions: QuizQuestion[];
    try {
      questions = JSON.parse(questionsJson) as QuizQuestion[];
      if (!Array.isArray(questions)) throw new Error('Bukan array');
    } catch {
      setError('Format soalan JSON tidak sah.');
      return;
    }

    setSaving(true);
    const payload = { ...form, questions };
    try {
      if (editing) {
        await api.quizzes.update(editing.id, payload);
      } else {
        await api.quizzes.create(payload);
      }
      setModalOpen(false);
      setError('');
      await load();
    } catch {
      setError('Gagal menyimpan kuiz.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam kuiz ini?')) return;
    try {
      await api.quizzes.delete(id);
      await load();
    } catch {
      setError('Gagal memadam kuiz.');
    }
  }

  const columns: Column<Quiz>[] = [
    { key: 'title', header: 'Tajuk' },
    { key: 'topicId', header: 'ID Topik' },
    {
      key: 'questions',
      header: 'Soalan',
      render: (r) => `${r.questions.length} soalan`,
    },
    {
      key: 'timeLimit',
      header: 'Had Masa',
      render: (r) => (r.timeLimit ? `${r.timeLimit} saat` : '-'),
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
        <h2>Kuiz</h2>
        <p>Urus kuiz dan soalan untuk setiap topik</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} kuiz</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Kuiz
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada kuiz" />

      <FormModal
        title={editing ? 'Edit Kuiz' : 'Tambah Kuiz'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
        large
      >
        <div className="form-row">
          <div className="form-group">
            <label>ID Topik</label>
            <input
              value={form.topicId}
              onChange={(e) => setForm({ ...form, topicId: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Had Masa (saat, pilihan)</label>
            <input
              type="number"
              min={0}
              value={form.timeLimit ?? ''}
              onChange={(e) =>
                setForm({
                  ...form,
                  timeLimit: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </div>
        </div>
        <div className="form-group">
          <label>Tajuk Kuiz</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Soalan (JSON)</label>
          <textarea
            value={questionsJson}
            onChange={(e) => setQuestionsJson(e.target.value)}
            rows={14}
            style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
          />
          <p className="form-hint">
            Jenis soalan: multiple_choice, true_false, fill_blank, matching, ordering
          </p>
        </div>
      </FormModal>
    </div>
  );
}