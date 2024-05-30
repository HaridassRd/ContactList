import React, { useState, useEffect } from "react";

const ContactList = () => {
  const [editData, setEditData] = useState({});
  const [contacts, setContacts] = useState([
    { id: 1, name: "Hari", gender: "Male", type: "Business" },
    { id: 2, name: "Sree", gender: "Female", type: "Personal" },
    { id: 3, name: "Dev", gender: "Male", type: "Business" },
    { id: 4, name: "Ran", gender: "Female", type: "Personal" },
  ]);

  const [newContact, setNewContact] = useState({
    name: "",
    gender: "Male",
    type: "Business",
  });

  const [editingContactId, setEditingContactId] = useState(null);

  useEffect(() => {
    setNewContact((prevState) => ({
      ...prevState,
      name: editData.length ? editData[0].name : "",
      gender: editData.length ? editData[0].gender : "Male",
      type: editData.length ? editData[0].type : "Business",
    }));
  }, [editData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const addContact = (e) => {
    e.preventDefault();
    setContacts([...contacts, { id: contacts.length + 1, ...newContact }]);
    setNewContact({ name: "", gender: "Male", type: "Business" });
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContact = (id) => {
    setEditData(contacts.filter((contact) => contact.id === id));
    setEditingContactId(id);
  };

  const updateContact = (e) => {
    e.preventDefault();
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === editingContactId) {
        return { ...contact, ...newContact };
      }
      return contact;
    });
    setContacts(updatedContacts);
    setEditData({});
    setEditingContactId(null);
  };

  const maleContacts = contacts.filter(
    (contact) => contact.gender === "Male"
  ).length;
  const femaleContacts = contacts.length - maleContacts;

  const personalContacts = contacts.filter(
    (contact) => contact.type === "Personal"
  ).length;
  const businessContacts = contacts.length - personalContacts;

  return (
    <div className="contact-list-container">
      <h1>Contact List</h1>
      <div className="contact-list">
        <div className="contacts">
          <h2>Contacts:</h2>
          {contacts && contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <span className="list">
                    {contact.name} - {contact.gender}, {contact.type}{" "}
                  </span>
                  <span className="btn">
                    <button
                      className="edit-btn"
                      onClick={() => editContact(contact.id)}
                      disabled={editingContactId === contact.id}
                    >
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteContact(contact.id)}>
                      Delete
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="add-contact">
          <h2 >{editingContactId ? "Update Contact:" : "Add Contact:"}</h2>
          <div className="add">
            <form
              onSubmit={(e) =>
                editingContactId ? updateContact(e) : addContact(e)
              }
              style={{ height: "100%" }}
            >
              <div className="create-contact">
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="common"
                  required
                />
                <select
                  name="gender"
                  value={newContact.gender}
                  onChange={handleChange}
                  className="common"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select
                  name="type"
                  value={newContact.type}
                  onChange={handleChange}
                  className="common"
                >
                  <option value="Business">Business</option>
                  <option value="Personal">Personal</option>
                </select>
                <button type="submit" className="common add-btn">
                  {editingContactId ? "Update Contact" : "Add Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="statistics">
        <h2>Contact Statistics:</h2>
        <div className="total-list">
          <p>Male Contacts: {maleContacts}</p>
          <p>Female Contacts: {femaleContacts}</p>
          <p>Personal Contacts: {personalContacts}</p>
          <p>Business Contacts: {businessContacts}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactList;
