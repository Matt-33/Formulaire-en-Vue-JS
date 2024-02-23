
new Vue({
    el: '#app',
    components: {
      AddContact: httpVueLoader('./components/AddContact.vue'),
      ShowContact : httpVueLoader('./components/ShowContact.vue'),
    },
    data() {
      return {
        contacts: []
    };
},
    mounted() {
    this.loadContacts();
},
methods: {
    loadContacts() {
    const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
      this.contacts = JSON.parse(savedContacts);
        }
    },

    save() {
        localStorage.setItem('contacts', JSON.stringify(this.contacts));
     },
    addNewContact(newContact) {
        this.contacts.push(newContact);
        this.save();
    },
    saveChanges(updatedContacts) {
        this.contacts = updatedContacts;
        this.save();
    }
},
template: `
  <div>
    <add-contact :contacts="contacts" @add-contact="addNewContact"></add-contact>
    <show-contact :contacts="contacts"></show-contact>
  </div>
`
});