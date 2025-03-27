import bcrypt from "bcryptjs";

const verifyPassword = async (inputPassword, storedHash) => {
    try {
        return await bcrypt.compare(inputPassword, storedHash);
    }
    catch(error) {
        console.log(error);
        throw error;
    }
};

export default verifyPassword;