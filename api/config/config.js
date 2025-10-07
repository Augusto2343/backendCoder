import "dotenv/config";

export default {
    MONGO_URL:process.env.MONGO_URL,
    PORT:process.env.PORT || 8080,
    SECRET_KEY:process.env.SECRET_KEY,
    FRONT_API_URL:process.env.FRONT_API_URL
}