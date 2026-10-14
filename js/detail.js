const SUPABASE_URL = "https://ktzxeqvrliqauctlbajt.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0enhlcXZybGlxYXVjdGxiYWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMDI0MDYsImV4cCI6MjEwNzU3ODQwNn0.j5m4E_V_qySuVayJCkR3j_2b8wL3cIqKMT_XNHJl8Os";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const productId = new URLSearchParams(window.location.search).get("id");

async function loadProduct() {
  const { data: product } = await supabaseClient
    .from("product").select("*, category(category_name)")
    .eq("product_id", productId).single();
  if (!product) {
    document.getElementById("detail").innerHTML = "<p>Product not found.</p>";
    return;
  }
  document.getElementById("detail").innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>AED ${product.price}</p>
    <p>Category: ${product.category.category_name}</p>`;
}
loadProduct();