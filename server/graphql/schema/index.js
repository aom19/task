const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Partner {
    _id:ID!
    name: String!
    email: String!
    description: String!

  }
  
  input PartnerInput {
    name: String!
    email: String!
    description: String!

  }

type RootQuery{
    partners : [Partner!]!
    
    
}

type RootMutation{
   createPartner(partnerInput : PartnerInput) :Partner
    deletePartner(partnerId : ID!) : Partner
    editPartner(partnerId : ID! , partnerInput : PartnerInput) : Partner

}

schema {
    query:RootQuery
    mutation: RootMutation
}
`);
