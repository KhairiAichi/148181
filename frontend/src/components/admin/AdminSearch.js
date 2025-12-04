
export default function AdminSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder= "Rechercher par nom, email ou rôle"
        
      
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 20, width: 300, padding: 5 }}
    />
  );
}
