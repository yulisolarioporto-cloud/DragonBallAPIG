document.getElementById("mostrar").addEventListener("click", async () => {
  const raza = document.getElementById("raza").value;

  const res = await fetch("https://dragonball-api.com/api/characters");
  const data = await res.json();

  console.log(data);
});