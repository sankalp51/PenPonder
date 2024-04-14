class DataValidation {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    isValidEmail() {
        if (!this.email) return false;
        const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(this.email);
        return isValid;
    }

    isValidPassword() {
        if (!this.password || this.password.length < 8) return false;
        return true;
    }
    
}

module.exports = DataValidation;