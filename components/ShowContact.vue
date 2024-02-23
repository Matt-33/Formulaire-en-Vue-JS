  <template>
    <div>
    <h2>Liste des contacts</h2>
    <table class="contacts-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Téléphone</th>
          <th>Email</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(contact, index) in contacts" :key="index">
            <td v-if="editIndex !== index">{{ contact.lastName }}</td>
            <td v-else><input v-model="editedContact.lastName"></td>

            <td v-if="editIndex !== index">{{ contact.firstName }}</td>
            <td v-else><input v-model="editedContact.firstName"></td>

            <td v-if="editIndex !== index">{{ contact.phone }}</td>
            <td v-else><input v-model="editedContact.phone"></td>

            <td v-if="editIndex !== index">{{ contact.email }}</td>
            <td v-else><input v-model="editedContact.email"></td>

            <td>
            <span v-if="editIndex === index" @click="saveEdit" class="modify-button">Valider</span>
            <span v-else @click="editContact(index)" class="modify-button">Modifier</span>
          </td>
          <td><span @click="confirmDeleteContact(index)" class="delete-button">Supprimer</span></td>
          </tr>
        </tbody>
      </table>

      <div v-if="showConfirmation" class="confirmation">
        <p>Voulez-vous vraiment supprimer ce contact ?</p>
        <button @click="cancelDeletion">Annuler</button>
        <button @click="deleteConfirmedContact">Confirmer</button>
      </div>
    </div>
  </template>



<script>
module.exports = {
    props: ['contacts'],
    data() {
        return {
          editIndex: -1, 
          editedContact: {
          firstName: '',
          lastName: '',
            phone: '',
            email: ''
          },
          showConfirmation: false,
      contactToDeleteIndex: -1
        };
      },
    methods: {
      editContact(index) {
        this.editIndex = index;
        this.editedContact = { ...this.contacts[index] }; 
      },
      saveEdit() {
        if (this.editIndex !== -1) {
          this.contacts[this.editIndex] = { ...this.editedContact };
          this.editIndex = -1;
          this.saveChanges (this.contacts);
        }
    },
    confirmDeleteContact(index) {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?");
        if (confirmation) {
          this.deleteContact(index);
        }
      },

      deleteContact(index) {
        
        if (index !== -1) {
          this.contacts.splice(index, 1);
          this.saveChanges(this.contacts); // Mettre à jour la liste de contacts dans le localStorage
        }
      },

      cancelDeletion() {
        this.showConfirmation = false;
        this.contactToDeleteIndex = -1;
      },

      deleteConfirmedContact() {
      if (this.contactToDeleteIndex !== -1) {
        this.contacts.splice(this.contactToDeleteIndex, 1);
        this.saveChanges(this.contacts);
        this.cancelDeletion();
      }
    },
    saveChanges(updatedContacts) {
        this.$emit('save-changes', updatedContacts);
      }
 }
};
  </script>
