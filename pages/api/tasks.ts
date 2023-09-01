import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '@/lib/dbConnect';
import { ResponseFuncs } from '@/lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect() // connect to database
      res.json(await Todo.find({}).catch(catcher))
    },
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect() // connect to database
      res.json(await Todo.create(req.body).catch(catcher))
    },
    // RESPONSE DELETE REQUESTS
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect () //connect to database
      res.json(await Todo.findByIdAndDelete(req.body).catch(catcher))
    },
    // RESPONSE PUT REQUESTS
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect () //connect to database
      type putProps = {
        id: string,
        functionality: string,
        state: boolean
      }
      const { id, functionality, state }:putProps = req.body;
      console.log(req.body)

      switch (functionality) {
        case 'completed':
          res.json(await Todo.findByIdAndUpdate(id, {isCompleted: state}))
          break;
        case 'overdue':
          console.log('overdue')
          res.json(await Todo.findByIdAndUpdate(id, {isOverdue: state}))
          break;
        case 'edit':
          break;
      }
    }
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) return response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler