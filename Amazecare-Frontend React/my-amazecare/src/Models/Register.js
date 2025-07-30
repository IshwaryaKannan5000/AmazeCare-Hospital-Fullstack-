export class RegisterModel {
    fullName = "";
    email = "";
    password = "";
    contactNo = "";
    gender = "";
    dateOfBirth = "";  // ISO format: "YYYY-MM-DDTHH:mm:ss.sssZ"

    constructor(
        fullName = "",
        email = "",
        password = "",
        contactNo = "",
        gender = "",
        dateOfBirth = ""
    ) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.contactNo = contactNo;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
    }
}
