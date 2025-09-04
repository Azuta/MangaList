export default function createSlug(name: string) {
  return encodeURIComponent(
    name
      .toLowerCase()
      .normalize("NFD")               // elimina acentos
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")           // espacios → guiones
      .replace(/[^a-z0-9-]/g, "")     // caracteres especiales
  );
}