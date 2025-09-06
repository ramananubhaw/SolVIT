import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

export default hashPassword;
