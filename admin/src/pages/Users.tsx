import { useCallback, useEffect, useState } from 'react';
import DataTable, { Column } from '../components/DataTable';
import FormModal from '../components/FormModal';
import { api } from '../services/api';
import type { User, UserRole } from '../types';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  role: 'murid' as UserRole,
  year: undefined as number | undefined,
};

const roleLabels: Record<UserRole, string> = {
  murid: 'Murid',
  parent: 'Ibu Bapa',
  teacher: 'Guru',
  admin: 'Pentadbir',
};

const roleColors: Record<UserRole, string> = {
  murid: 'green',
  parent: 'purple',
  teacher: 'blue',
  admin: 'orange',
};

export default function Users() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await api.users.getAll());
      setError('');
    } catch {
      setError('Gagal memuatkan pengguna.');
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

  function openEdit(item: User) {
    setEditing(item);
    setForm({
      name: item.name,
      email: item.email,
      password: '',
      role: item.role,
      year: item.year,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    const payload: Partial<User> & { password?: string } = {
      name: form.name,
      email: form.email,
      role: form.role,
      year: form.role === 'murid' ? form.year : undefined,
    };
    if (form.password) {
      payload.password = form.password;
    }
    try {
      if (editing) {
        await api.users.update(editing.id, payload);
      } else {
        if (!form.password) {
          setError('Kata laluan diperlukan untuk pengguna baharu.');
          setSaving(false);
          return;
        }
        await api.users.create({ ...payload, password: form.password });
      }
      setModalOpen(false);
      setError('');
      await load();
    } catch {
      setError('Gagal menyimpan pengguna.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Padam pengguna ini?')) return;
    try {
      await api.users.delete(id);
      await load();
    } catch {
      setError('Gagal memadam pengguna.');
    }
  }

  const columns: Column<User>[] = [
    { key: 'name', header: 'Nama' },
    { key: 'email', header: 'E-mel' },
    {
      key: 'role',
      header: 'Peranan',
      render: (r) => (
        <span className={`badge-tag ${roleColors[r.role]}`}>{roleLabels[r.role]}</span>
      ),
    },
    {
      key: 'year',
      header: 'Tahun',
      render: (r) => (r.year ? `Tahun ${r.year}` : '-'),
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
        <h2>Pengguna</h2>
        <p>Urus akaun murid, guru, ibu bapa dan pentadbir</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="page-actions">
        <span>{items.length} pengguna</span>
        <button type="button" className="btn btn-primary" onClick={openCreate}>
          + Tambah Pengguna
        </button>
      </div>

      <DataTable columns={columns} data={items} loading={loading} emptyMessage="Tiada pengguna" />

      <FormModal
        title={editing ? 'Edit Pengguna' : 'Tambah Pengguna'}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <div className="form-group">
          <label>Nama</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>E-mel</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Kata Laluan {editing && '(kosongkan jika tidak berubah)'}</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required={!editing}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Peranan</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
            >
              <option value="murid">Murid</option>
              <option value="parent">Ibu Bapa</option>
              <option value="teacher">Guru</option>
              <option value="admin">Pentadbir</option>
            </select>
          </div>
          {form.role === 'murid' && (
            <div className="form-group">
              <label>Tahun</label>
              <select
                value={form.year ?? ''}
                onChange={(e) =>
                  setForm({ ...form, year: e.target.value ? Number(e.target.value) : undefined })
                }
              >
                <option value="">Pilih tahun</option>
                {[1, 2, 3, 4, 5, 6].map((y) => (
                  <option key={y} value={y}>
                    Tahun {y}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </FormModal>
    </div>
  );
}