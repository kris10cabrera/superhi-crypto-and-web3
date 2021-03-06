// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { web3 } from '../../lib/web3'
import MarkdownIt from 'markdown-it';

// make a new markdown renderer
const markdown = new MarkdownIt()

// a list of 3 answers by default
// usually this would come from a database
// but to keep things simple, we're setting it here
const answers = [
  `That's fantastic work for a beginner! [Arteza](#) have great sculpting tools that you may want to check out!`,
  `From the looks of the clay, it could be a touch dry. 
  
  Maybe consider a _slight_ bit more water on your hands while you shape and you may find that a little easier.`,
  `I disagree with reply #3, I think the clay looks fine, no more water needed. `
].map(a => markdown.render(a))


// what happens when we ask for /api/answers
export default function handler(req, res) {
  // if sent via a form, e.g. the reply form
  if (req.method === "POST") {
    
    const { signedMessage, confirmationMessage, account, reply="", questionId=1 } = req.body

    if (signedMessage !== null && confirmationMessage !== null && account !== null) {
      // get account from the confirmation message
      // and signed message
      const recoveredAccount = web3.eth.accounts.recover(confirmationMessage, signedMessage)

      // check if account is same
      if (account.toLowerCase() === recoveredAccount.toLowerCase()) {  
        // yep, so render reply
        // you would usually save to a database here
        let newReply = markdown.render(reply)
        
        // return all good
        res
          .status(200)
          .json({ account, reply: newReply, questionId, answerId: 3 })
      } else {  
        // incorrect account
        res
          .status(401)
          .json({ error: "incorrect account" })
      }
    } else {
      // need to sign that message!
      res
        .status(401)
        .json({ error: "need to sign message" })
    }
  } else {
    // if fetched normally using fetch()
    const data = [
      { questionId: 1, answerId: 1, reply: answers[0], account: "0xDf7C7f491f26D35fCca74F6Fbd6b5FE437cc24C7" },
      { questionId: 1, answerId: 2, reply: answers[1], account: "0xb25bf3990c5a274a758a2a3a4cc90b3e407eaaf4" },
      { questionId: 1, answerId: 3, reply: answers[2], account: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65" }
    ]
  
    res
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ answers: data })
  }
}
