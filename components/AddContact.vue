    <template> 
      <div>
        <h2>Ajouter un contact</h2>
        <form @submit.prevent = "addContact">
        <label for="firstName">Prénom :</label>
        <input type="text" id="firstName" v-model="newContact.firstName" required>
        <label for="lastName">Nom :</label>
        <input type="text" id="lastName" v-model="newContact.lastName" required>
        <label for="phone">Téléphone :</label>
        <input type="tel" id="phone" v-model="newContact.phone" required>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="newContact.email" required>
        <label for="birthdate">Date de naissance :</label>
        <input type="date" id="birthdate" v-model="newContact.birthdate" required>
        <button type="submit">Ajouter</button>
        </form>
      </div>
    </template>
    <script>
      
      module.exports = {
    data() {
      return {
        newContact: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        }
      };
    },
    methods: {
        isBirthday(birthdate) {
            const birthdateObj = new Date(birthdate);
            return (
              birthdateObj.getDate() === this.today.getDate() &&
              birthdateObj.getMonth() === this.today.getMonth()
            );
          },
      addContact() {
        this.$emit('add-contact', this.newContact);
        this.newContact = { firstName: '', lastName: '', phone: '', email: '' };
      }
    }
  };
  </script>
