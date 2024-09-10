import winterDAO from "../winterDAO/winterDAO.js"

export default class winterController {
  static async apiPostwinter(req, res, next) {
    try {
      const url = req.body.url
      const reviewResponse = await winterDAO.addwinter(
        url, req.body.username
      )
      //console.log("winterController url: " + url);
      //console.log(req.url);
      //console.log(req.body.url);
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  static async apiGetrandomwinter(req, res, next) {
    try {
      console.log("in randomwinter");
      let winter = await winterDAO.getrandomwinter(req.params.username)
      if (winter == null) {
        res.status(404).json({ error: "Not found", url: null })
        return
      }
      console.log("username: " + req.params.username);
      console.log("randomwinter: " + winter);
      res.json({ url: winter })
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e, url: null })
    }
  }
  static async apiDeletewinter(req, res, next) {
    try {
      console.log("delete: " + req.body.url)
      const deleteRes = await winterDAO.deletewinter(req.body.url, req.body.username);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiLogin(req, res, next) {
    try {
      console.log("in apiLogin");
      const username = req.body.username;
      const password = req.body.password;
      const loginRes = await winterDAO.login(username, password);
      console.log(username + " " + password);
      if (loginRes.success) {
        res.status(200).json({ status: "success" })
      } else {
        res.status(401).json({ error: "Invalid username or password" })
      }
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiLogout(req, res, next) {
    try {
      const logoutRes = await winterDAO.logout();
      res.status(200).json({ status: "success" })
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiRegister(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const registerRes = await winterDAO.register(username, password);
      if (registerRes.success) {
        res.status(200).json({ status: "success" })
      } else {
        res.status(401).json({ error: "User already exists" })
      }
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}