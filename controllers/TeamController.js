const viewPath = 'teams';
const Team = require('../models/Team');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
    const teams = await Team
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});

  
    res.status(200).json(teams);
  } catch (error) {    
    res.status(400).json({message: "There was an issue displaying teams"})
  }
};

exports.show = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
    .populate('user');
    res.status(200).json(team);
  } catch (error) {   
    res.status(400).json({message:"There was an issue getting this team"})
  }
};

exports.new = (req, res) => {
 res.render(`${viewPath}/new`,{
   pageTitle: 'New Team'
 })
};

exports.create = async (req, res) => {
  try{
    const {user: email} = req.session.passport;
    const user = await User.findOne({email: email});
    const team = await Team.create({user: user._id, ...req.body});

    res.status(200).json(team);
} catch (error){     
      res.status(400).json({message: "There was an issue creating your team"})
  }
};

exports.edit = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.render(`${viewPath}/edit`, {
      pageTitle: team.teamName,
      formData: team
    });
  } catch (error) {
    req.flash('danger', `There was an error accessing this team: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let team = await Team.findById(req.body.id);
    if (!team) throw new Error('Team could not be found');

    const attributes = {user: user._id, ...req.body};
    await Team.validate(attributes);
    await Team.findByIdAndUpdate(attributes.id, attributes);

    req.flash('success', 'The team was updated successfully');
    res.status(200).json(team);
  } catch (error) {
    req.flash('danger', `There was an error updating this team: ${error}`);
    res.status(400).json({message: "There was an issue updating this team"});
  }
};

exports.delete = async (req, res) => {
  try {
    console.log(req.body);
    await Team.deleteOne({_id: req.body.id});
    res.status(200).json({message: "team deleted"});
  } catch (error) {   
    res.status(400).json({message: "There was an issue deleting this team"});
  }
};