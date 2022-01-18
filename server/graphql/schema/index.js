const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Partner {
    _id:ID!
    name: String!
    email: String!
    description: String!
    partnerImage: String!
    

  }
  type AuthData{
    userId: ID!
    token : String!
    tokenExpiration : Int!
    email:String!
    
}

type User{
  _id : ID!
  email:String!
  password :String!
}

input UserInput{
  email:String!
  password:String!
 

}
  
  input PartnerInput {
    name: String!
    email: String!
    description: String!
    partnerImage: String!

  }

type RootQuery{
    partners : [Partner!]!
    login(email :String! , password :String! ) : AuthData!
    
    
}

type RootMutation{
   createPartner(partnerInput : PartnerInput) :Partner
    deletePartner(partnerId : ID!) : Partner
    editPartner(partnerId : ID! , partnerInput : PartnerInput) : Partner
    createUser(userInput : UserInput):User

}

schema {
    query:RootQuery
    mutation: RootMutation
}
`);
