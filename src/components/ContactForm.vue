<template>
  <v-form ref="form" v-model="valid">
    <v-row class="pa-10 form-cont" justify="center" align-content="center">
      <v-col>
        <v-text-field 
        v-model="senderEmail" 
        label="Email"
        :rules="emailRules"
        required
        >
        </v-text-field>
        <v-text-field 
        v-model="subject" 
        label="Subject"
        :rules="subjectRules"
        required
        >
        </v-text-field>
        <v-textarea
        class="mt-2"
        solo
        name="input-7-4"
        v-model="emailBody" 
        label="Send a message!"
        :rules="bodyRules"
        required
        counter
        no-resize
        ></v-textarea>
        <v-btn class="mr-4" @click="sendEmail">Send</v-btn>
        <v-btn class="mr-4" @click="cancel">Cancel</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>

  export default {
    name: 'ContactForm',
    props:{
      recipient:{
        type: String,
        required: true
      },
    },

    data: () => ({
      valid: false,
      senderEmail: "",
      subject: "",
      emailBody: "",
      bodyRules: [
        v => !!v || 'Body is required',
        v => v.length <= 250 || 'Body must be less than 250 characters',
      ],
      subjectRules: [
        v => v.length <= 30 || 'Subject must be less than 30 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
    }),

    methods: {
      sendEmail(){
        this.$refs.form.validate()
        if(!this.valid) return;
        var link = `mailto:${this.recipient}`
        + "?cc="
        + "&subject=" + "Game Hub Contact: " + encodeURIComponent(this.subject)
        + "&body=" + encodeURIComponent(this.emailBody);
      
        window.location.href = link;
        this.$emit("cancelContact");
      },
      cancel(){
        this.senderEmail = "";
        this.subject = "";
        this.emailBody = "";
        this.$emit("cancelContact");
      }
    }
  }
</script>

<style lang="less">
.form-cont{
    background: radial-gradient(circle, var(--main-color) 0%, rgba(18,76,144,1) 100%);
}
.v-input{  
    font-family: cursive !important;
    font-weight: 500 !important;
    color: var(--text-color) !important;
}
</style>
