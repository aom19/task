const moongoose = require("mongoose");
const Partner = require("../../models/partner");
const { transformPartner } = require("./merge");

module.exports = {
  partners: async () => {
    try {
      const partners = await Partner.find();
      return partners?.map((partner) => {
        return transformPartner(partner);
      });
    } catch (err) {
      throw err;
    }
  },
  createPartner: async (args) => {
    const partner = new Partner({
      name: args.partnerInput.name,
      email: args.partnerInput.email,
      description: args.partnerInput.description,
    });

    let createdPartner;

    try {
      const result = await partner.save();
      createdPartner = transformPartner(result);

      return createdPartner;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deletePartner: async (args) => {
    try {
      await Partner.deleteOne({ _id: args.partnerId });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  editPartner: async (args) => {
    try {
      console.log(args.partnerId);
      return Partner.findByIdAndUpdate(
        { _id: args.partnerId },
        {
          name: args.partnerInput.name,
          email: args.partnerInput.email,
          description: args.partnerInput.description,
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
