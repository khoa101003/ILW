import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let winter
let user
let currentUser
let connn
export default class winterDAO {
  static async injectDB(conn) {
    connn = conn
    /*if (winter) {
      return
    }
    try {
      winter = await conn.db("winter").collection("image")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }*/
    if (user) {
      return
    }
    try {
      user = await conn.db("winter").collection("user")
      console.log("Inject complete");
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addwinter(url, username) {
    try {
      winter = await connn.db("user").collection(username);
      const winterDoc = {
        url: url,
      }
      console.log("adding")
      console.log(url);
      return await winter.insertOne(winterDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getrandomwinter(username) {
    try {
      // Get the total count of documents in the collection
      winter = await connn.db("user").collection(username);
      const count = await winter.countDocuments();

      if (count == 0) {
        return null;
      }
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * count);

      // Skip to the random document and retrieve it
      const randomDoc = await winter.findOne({}, { skip: randomIndex });

      // Return the URL of the random document
      console.log(randomDoc.url);
      return randomDoc ? randomDoc.url : null;
    } catch (e) {
      console.error(`Unable to get random winter image: ${e}`);
      return { error: e };
    }
  }

  static async deletewinter(winterUrl, username) {

    try {
      winter = await connn.db("user").collection(username);
      const deleteResponse = await winter.deleteOne({
        url: winterUrl,
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }
  static async login(username, password) {
    try {
      const loginRes = await user.findOne({
        username: username,
        password: password
      });

      if (!loginRes) {
        return Promise.resolve({ success: false, message: "User not found" });
      }

      if (username === loginRes.username && password === loginRes.password) {
        try {
          return Promise.resolve({ success: true, message: "Login successful" });
        } catch (e) {
          console.error(`Unable to establish collection handles in userDAO: ${e}`);
          return Promise.resolve({ success: false, message: "Database error" });
        }
      } else {
        return Promise.resolve({ success: false, message: "Invalid credentials" });
      }
    } catch (e) {
      console.error(`Unable to login: ${e}`);
      return Promise.reject({ success: false, message: "Login error", error: e });
    }
  }
  static async logout() {
    try {
      winter = null;
      return Promise.resolve({ success: true, message: "Logout successful" });
    } catch (e) {
      console.error(`Unable to logout: ${e}`);
      return Promise.reject({ success: false, message: "Logout error", error: e });
    }
  }
  static async register(username, password) {
    try {
      const userExists = await user.findOne({ username: username });
      if (userExists) {
        return Promise.resolve({ success: false, message: "User already exists" });
      }
      const registerRes = await user.insertOne({
        username: username,
        password: password
      });
      return Promise.resolve({ success: true, message: "Register successful" });
    } catch (e) {
      console.error(`Unable to register: ${e}`);
      return Promise.reject({ success: false, message: "Register error", error: e });
    }
  }
  /* static async getReviewsByMovieId(movieId) {
     try {
       const cursor = await reviews.find({ movieId: parseInt(movieId) })
       return cursor.toArray()
     } catch (e) {
       console.error(`Unable to get review: ${e}`)
       return { error: e }
     }
   }*/
}