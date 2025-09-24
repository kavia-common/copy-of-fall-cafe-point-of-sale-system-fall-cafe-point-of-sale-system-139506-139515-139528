import React, { useEffect, useState } from 'react';
import { fetchMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../services/api';
import MenuForm from '../components/Menu/MenuForm';
import MenuTable from '../components/Menu/MenuTable';

// PUBLIC_INTERFACE
export default function MenuPage() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => setItems(await fetchMenu());

  useEffect(() => { load(); }, []);

  const save = async (item) => {
    if (item.id) await updateMenuItem(item);
    else await createMenuItem(item);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (window.confirm('Delete this item?')) {
      await deleteMenuItem(id);
      load();
    }
  };

  return (
    <div className="row" style={{ alignItems: 'flex-start' }}>
      <div className="col" style={{ flex: '1 1 45%' }}>
        <MenuForm initial={editing} onSave={save} onCancel={() => setEditing(null)} />
      </div>
      <div className="col" style={{ flex: '1 1 55%' }}>
        <MenuTable items={items} onEdit={setEditing} onDelete={remove} />
      </div>
    </div>
  );
}
