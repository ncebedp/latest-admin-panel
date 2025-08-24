import {jwtDecode} from 'jwt-decode';

const decode_token = (token) => {
    if (token) {
        try {
            const decoded = jwtDecode(token);
            const exp = new Date(decoded.exp * 1000);
            if (new Date() > exp) {
                localStorage.removeItem('newsToken');
                return "";
            }
            else{
                return decoded;
            }
        } catch (error) {
            return error.message;
        }
    }
    else{
        return "";
    }
}

export default decode_token;