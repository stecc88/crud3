import Client from "../models/Client.js";

export async function getClients(req, res) {
  const clients = await Client.find({ owner: req.user.id })
    .sort({ createdAt: -1 });
  res.json(clients);
}

export async function createClient(req, res) {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({ message: "All fields required" });

  const client = await Client.create({
    name,
    email,
    phone,
    owner: req.user.id,
  });

  res.status(201).json(client);
}

export async function updateClient(req, res) {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Not found" });
  if (client.owner.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  Object.assign(client, req.body);
  await client.save();

  res.json(client);
}

export async function deleteClient(req, res) {
  const client = await Client.findById(req.params.id);
  if (!client) return res.status(404).json({ message: "Not found" });
  if (client.owner.toString() !== req.user.id)
    return res.status(403).json({ message: "Forbidden" });

  await client.deleteOne();
  res.json({ message: "Deleted" });
}
