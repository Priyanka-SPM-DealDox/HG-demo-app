const Accounts = require('../models/accountsModel');
const Opportunities = require('../models/opportunityModel');
const Quotes = require("../models/quotesModel");

const getQuoteGridData = async (req, res) => {
  let admin_id, people_id;
 
  if (req.user.admin_id) {
    // If req.user.admin_id is not empty
    admin_id = req.user.admin_id;
    people_id = req.user._id;
  } else {
    // If req.user.admin_id is empty
    admin_id = req.user._id;
    people_id = null;
  }

  try {
    const accounts_data = await Accounts.aggregate([
      {
        $match: {
          admin_id: admin_id,
        },
      },
      {
        $lookup: {
          from: 'dd_opportunities',
          localField: '_id',
          foreignField: 'account_Id',
          as: 'Opportunities',
        },
      },
      {
        $lookup: {
          from: 'dd_quotes',
          let: { account_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$account_id', '$$account_id'],
                },
              },
            },
          ],
          as: 'Quotes',
        },
      },
    ]);

    if (!accounts_data || accounts_data.length === 0) {
      res.status(200).json({ status: "Failed", message: "Account Data Not Found" });
    } else {
      // Now, for each Opportunities document, include Quotes array
      const result = accounts_data.map(account => {
        const opportunitiesWithQuotes = account.Opportunities.map(opportunity => {
          // Filter quotes for each opportunity based on opportunity_id
          const quotes = account.Quotes.filter(quote => quote.opportunity_id === String(opportunity._id));
          return { ...opportunity, Quotes: quotes };
        });

        return { ...account, Opportunities: opportunitiesWithQuotes };
      });

      res.status(200).json({ data: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
};
const getRecentOpportunitiesData = async (req, res) => {
  const admin_id = req.user._id;

  try {
    const recentOpportunities = await Opportunities.find({ admin_id })
      .sort([
        ['modifiedAt', -1], // Sort by modifiedAt in descending order
        ['createdAt', -1], // Then sort by createdAt in descending order
      ])
      .limit(3); // Adjust the limit as needed

    if (!recentOpportunities || recentOpportunities.length === 0) {
      res.status(200).json({ status: "Failed", message: "Recent Opportunities Not Found" });
    } else {
      // Extract account IDs from recent opportunities
      const accountIds = recentOpportunities.map(opportunity => opportunity.account_Id);

      // Fetch account data for the extracted account IDs
      const recentAccounts = await Accounts.find({ _id: { $in: accountIds } });

      // Combine recent opportunities with their respective account data
      const result = recentOpportunities.map(opportunity => {
        const account = recentAccounts.find(account => String(account._id) === String(opportunity.account_Id));
        return {
          ...opportunity.toObject(),
          Account: account ? account.toObject() : null,
        };
      });

      res.status(200).json({ data: result });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed" });
  }
};
const getRecentQuotesData = async (req, res) => {
    let user_id, people_id;
 
    if (req.user.admin_id) {
      // If req.user.admin_id is not empty
      user_id = req.user.admin_id;
      people_id = req.user._id;
    } else {
      // If req.user.admin_id is empty
      user_id = req.user._id;
      people_id = null;
    }

  try {
    // Get recent quotes, sorting by modifiedAt and createdAt in descending order
    const recentQuotes = await Quotes.find({ user_id : user_id })
      .sort([
        ['modifiedAt', -1], // Sort by modifiedAt in descending order
        ['createdAt', -1],  // Then sort by createdAt in descending order
      ])
      .limit(3);  // Adjust the limit as needed;

    // Extract opportunity IDs
    const opportunityIds = recentQuotes.map(quote => quote.opportunity_id);

    // Get opportunities related to recent quotes
    const recentOpportunities = await Opportunities.find({ _id: { $in: opportunityIds } });

    // Extract account IDs
    const accountIds = recentOpportunities.map(opportunity => opportunity.account_Id);

    // Get accounts related to recent opportunities
    const recentAccounts = await Accounts.find({ _id: { $in: accountIds } });

    // Organize data into the desired format
    const result = recentQuotes.map(quote => {
      const opportunity = recentOpportunities.find(opportunity => String(opportunity._id) === String(quote.opportunity_id));
      const account = recentAccounts.find(account => String(account._id) === String(opportunity.account_Id));

      return {
        ...quote.toObject(),
        Opportunity: opportunity ? opportunity.toObject() : null,
        Account: account ? account.toObject() : null,
      };
    });

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed' });
  }
};
module.exports = { getQuoteGridData,getRecentOpportunitiesData,getRecentQuotesData };
