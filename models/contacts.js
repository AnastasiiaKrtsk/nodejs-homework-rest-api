import { promises as fs } from "fs";
import path from "path";
import detectEncoding from "detect-file-encoding-and-language";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");

//*getALL
export async function listContacts() {
  const { encoding } = await detectEncoding(contactsPath);
  const data = await fs.readFile(contactsPath, encoding);
  return JSON.parse(data);
}

//*byID
export async function getContactById(id) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id) || null;
}

//*remove
export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) return null;

  const [removedContact] = contacts.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

//*add
export async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
